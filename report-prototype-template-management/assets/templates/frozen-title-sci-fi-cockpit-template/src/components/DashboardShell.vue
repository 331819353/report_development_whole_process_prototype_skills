<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { Component } from 'vue';
import {
  BarChart3,
  Download,
  Factory,
  Funnel,
  Gauge,
  Maximize2,
  Menu,
  Network,
  RefreshCw,
  Settings,
} from '@lucide/vue';
import { customActionRegistry } from '../actions/registry';
import { resolveDataSource } from '../dataSources/registry';
import type {
  DashboardActionConfig,
  DashboardExpressionValue,
  DashboardWidgetActionEvent,
} from '../types/actions';
import type { DashboardFilterScope } from '../types/data-source';
import type { DashboardConfig, DashboardFilterGroup, DashboardFilterOption, NavItem, ThemeMode } from '../types/dashboard';
import { resolveDashboardParams, resolveDashboardValue } from '../utils/dashboardExpressions';
import WidgetRenderer from '../widgets/WidgetRenderer.vue';
import {
  applyWidgetLocalFilters,
  getLocalFilterOptionsFromRows,
  getWidgetLocalFilterConfigs,
  resolveWidgetLocalFilterValues,
} from '../widgets/localFilters';
import type {
  RegisteredWidgetConfig,
  WidgetContext,
  WidgetLocalFilterConfig,
  WidgetTitlePillOption,
} from '../widgets/types';

const props = defineProps<{
  config: DashboardConfig;
}>();

interface LayoutBlock {
  id: string;
  label: string;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}


interface WidgetActionRuntime {
  event: DashboardWidgetActionEvent;
  widget: RegisteredWidgetConfig;
  context: WidgetContext;
}

interface ActiveTitlePillRuntime extends Record<string, unknown> {
  id: string;
  label: string;
  value?: unknown;
  params?: Record<string, unknown>;
  filters?: Record<string, unknown>;
  props?: Record<string, unknown>;
  dataBinding?: RegisteredWidgetConfig['dataBinding'];
}

interface LayoutComponentSlotConfig {
  id: string;
  templateSlotId?: string;
  label?: string;
  regionKey?: string;
  componentExampleId?: string;
  data?: RegisteredWidgetConfig['data'];
  dataBinding?: RegisteredWidgetConfig['dataBinding'];
  filterScope?: DashboardFilterScope;
  actions?: RegisteredWidgetConfig['actions'];
  widget?: RegisteredWidgetConfig;
}

interface DashboardInteractionOverlay {
  type: 'drawer' | 'modal' | 'popup';
  title: string;
  action: Record<string, unknown>;
  target?: unknown;
  event: DashboardWidgetActionEvent;
  context: WidgetContext;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

interface BlockState {
  kind: 'unbound' | 'empty';
  label?: string;
  title: string;
  message?: string;
}

interface PersistedDashboardState {
  navId?: string;
  filters?: Record<string, string>;
  theme?: ThemeMode;
  scrollX?: number;
  scrollY?: number;
}

const iconMap: Record<NavItem['icon'], Component> = {
  Gauge,
  Factory,
  BarChart3,
  Network,
  Settings,
};

const emptyGridMarks = new Set(['.', ' ']);

const getStaticFilterOptions = (group: DashboardFilterGroup) => group.options ?? [];

const getDefaultFiltersFromGroups = (groups: DashboardFilterGroup[]) =>
  Object.fromEntries(groups.map((group) => [group.id, group.defaultValue ?? '']));

const dashboardStateStorageKey = 'frozen-title-sci-fi-cockpit:runtime-state';

const readPersistedDashboardState = (): PersistedDashboardState => {
  try {
    return JSON.parse(sessionStorage.getItem(dashboardStateStorageKey) ?? '{}') as PersistedDashboardState;
  } catch {
    return {};
  }
};

const normalizeScope = (scope?: DashboardFilterScope) => {
  if (!scope) {
    return [];
  }

  return Array.isArray(scope) ? scope : [scope];
};

const normalizeLayoutRows = (rows?: string[]) => {
  const configuredRows = rows?.filter((row) => row.length > 0) ?? [];

  return configuredRows.length > 0 ? configuredRows : ['A'];
};

const buildLayoutBlocks = (rowsToBuild: string[]) => {
  const cells = new Map<string, string>();

  rowsToBuild.forEach((row, rowIndex) => {
    Array.from(row).forEach((label, columnIndex) => {
      if (!emptyGridMarks.has(label)) {
        cells.set(`${rowIndex}:${columnIndex}`, label);
      }
    });
  });

  const visited = new Set<string>();
  const blocks: LayoutBlock[] = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const toKey = (row: number, column: number) => `${row}:${column}`;

  cells.forEach((label, cellKey) => {
    if (visited.has(cellKey)) {
      return;
    }

    const queue = [cellKey];
    const component: Array<[number, number]> = [];
    visited.add(cellKey);

    while (queue.length > 0) {
      const currentKey = queue.shift();

      if (!currentKey) {
        continue;
      }

      const [row, column] = currentKey.split(':').map(Number);
      component.push([row, column]);

      directions.forEach(([rowOffset, columnOffset]) => {
        const nextKey = toKey(row + rowOffset, column + columnOffset);

        if (!visited.has(nextKey) && cells.get(nextKey) === label) {
          visited.add(nextKey);
          queue.push(nextKey);
        }
      });
    }

    const rows = component.map(([row]) => row);
    const columns = component.map(([, column]) => column);
    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minColumn = Math.min(...columns);
    const maxColumn = Math.max(...columns);
    const isRectangle = component.length === (maxRow - minRow + 1) * (maxColumn - minColumn + 1);

    if (isRectangle) {
      blocks.push({
        id: `${label}-${minRow}-${minColumn}`,
        label,
        columnStart: minColumn + 1,
        columnEnd: maxColumn + 2,
        rowStart: minRow + 1,
        rowEnd: maxRow + 2,
      });
      return;
    }

    component.forEach(([row, column]) => {
      blocks.push({
        id: `${label}-${row}-${column}`,
        label,
        columnStart: column + 1,
        columnEnd: column + 2,
        rowStart: row + 1,
        rowEnd: row + 2,
      });
    });
  });

  return blocks;
};

const persistedDashboardState = readPersistedDashboardState();
const defaultFilters = getDefaultFiltersFromGroups(props.config.filters);

const getInitialNavId = () => {
  if (persistedDashboardState.navId && props.config.nav.some((item) => item.id === persistedDashboardState.navId)) {
    return persistedDashboardState.navId;
  }

  return props.config.nav[0]?.id ?? '';
};

const getInitialFilters = () =>
  Object.fromEntries(
    props.config.filters.map((group) => [
      group.id,
      persistedDashboardState.filters?.[group.id] ?? defaultFilters[group.id] ?? '',
    ]),
  );

const getInitialTheme = (): ThemeMode => props.config.screen.defaultTheme;

const activeNavId = ref(getInitialNavId());
const activeFilters = ref<Record<string, string>>(getInitialFilters());
const filterOptionMap = ref<Record<string, DashboardFilterOption[]>>({});
const widgetDataMap = ref<Record<string, unknown[]>>({});
const interactionOverlay = ref<DashboardInteractionOverlay | null>(null);
const titlePillSelections = ref<Record<string, string>>({});
const localWidgetFilters = ref<Record<string, Record<string, string>>>({});
const isNavOpen = ref(props.config.screen.defaultNavOpen);
const isFiltersOpen = ref(props.config.screen.defaultFiltersOpen);
const theme = ref<ThemeMode>(getInitialTheme());
const viewportScale = ref(1);
const viewportOffsetX = ref(0);
const viewportOffsetY = ref(0);
const scrollViewportRef = ref<HTMLElement | null>(null);
const isScrollbarsActive = ref(false);
const pageScrollX = ref(0);
const openPanelStyle = {
  opacity: '1',
  pointerEvents: 'auto',
  transform: 'translateX(0)',
} as const;
const scrollTargets: EventTarget[] = [];
let scrollbarsHideTimer: number | undefined;

const activeNavItem = computed(() => props.config.nav.find((item) => item.id === activeNavId.value) ?? props.config.nav[0]);
const layoutRows = computed(() => normalizeLayoutRows(activeNavItem.value?.layoutRows));
const layoutColumnCount = computed(() => Math.max(...layoutRows.value.map((row) => Array.from(row).length), 1));
const layoutRowCount = computed(() => Math.max(layoutRows.value.length, 1));
const layoutBlocks = computed<LayoutBlock[]>(() => buildLayoutBlocks(layoutRows.value));
const isInteractionDrawerOpen = computed({
  get: () => interactionOverlay.value?.type === 'drawer',
  set: (open: boolean) => {
    if (!open && interactionOverlay.value?.type === 'drawer') {
      interactionOverlay.value = null;
    }
  },
});
const isInteractionDialogOpen = computed({
  get: () => Boolean(interactionOverlay.value && interactionOverlay.value.type !== 'drawer'),
  set: (open: boolean) => {
    if (!open && interactionOverlay.value && interactionOverlay.value.type !== 'drawer') {
      interactionOverlay.value = null;
    }
  },
});
const interactionOverlayEntries = computed(() => {
  const overlay = interactionOverlay.value;

  if (!overlay) {
    return [];
  }

  const context = overlay.context as Record<string, unknown>;
  const entries: Record<string, unknown> = {
    event: overlay.event.name,
    blockId: context.blockId,
    slotId: context.sourceSlotId,
    target: overlay.target,
    query: overlay.query,
    params: overlay.params,
  };

  return Object.entries(entries).filter(([, value]) => value !== undefined && value !== null && value !== '');
});
const titleRenderedWidth = computed(() => props.config.screen.layout.titleBackgroundWidth);
const titleScale = computed(() => titleRenderedWidth.value / props.config.screen.layout.titleBackgroundWidth);
const titleBackgroundRenderedHeight = computed(
  () => props.config.screen.layout.titleBackgroundHeight * titleScale.value,
);
const titleRenderedHeight = computed(() => props.config.screen.layout.titleVisibleHeight * titleScale.value);
const titleBackgroundOffsetY = computed(() => -(props.config.screen.layout.titleVisibleTop * titleScale.value));
const contentRowHeight = computed(() => Math.max(props.config.screen.grid.rowHeight ?? 1, 1));
const contentWidth = computed(() => Math.max(props.config.screen.layout.designWidth, 1));
const designHeight = computed(() => Math.max(props.config.screen.layout.designHeight, 1));
const contentAreaHeight = computed(() => props.config.screen.grid.contentEndY - props.config.screen.grid.contentStartY);
const contentGridHeight = computed(
  () => layoutRowCount.value * contentRowHeight.value + Math.max(layoutRowCount.value - 1, 0) * props.config.screen.layout.contentGap,
);
const contentNaturalHeight = computed(() => contentGridHeight.value);
const canvasHeight = computed(() => Math.max(contentAreaHeight.value, contentNaturalHeight.value));
const pageHeight = computed(() => Math.max(designHeight.value, props.config.screen.grid.contentStartY + canvasHeight.value));
const appStyle = computed(() => ({
  '--page-background-image': `url("${props.config.assets.backgroundSrc}")`,
  '--title-background-image': `url("${props.config.assets.titleBackgroundSrc}")`,
  '--design-width': `${props.config.screen.layout.designWidth}px`,
  '--design-height': `${designHeight.value}px`,
  '--page-height': `${pageHeight.value}px`,
  '--title-background-width': `${props.config.screen.layout.titleBackgroundWidth}px`,
  '--title-background-height': `${props.config.screen.layout.titleBackgroundHeight}px`,
  '--title-current-width': `${titleRenderedWidth.value}px`,
  '--title-current-height': `${titleRenderedHeight.value}px`,
  '--title-background-current-height': `${titleBackgroundRenderedHeight.value}px`,
  '--title-background-offset-y': `${titleBackgroundOffsetY.value}px`,
  '--title-offset-y': `${props.config.screen.layout.titleOffsetY}px`,
  '--control-height': `${props.config.screen.layout.controlSize}px`,
  '--control-logo-width': `${props.config.screen.layout.controlLogoWidth}px`,
  '--control-logo-offset-x': `${props.config.screen.layout.controlLogoOffsetX}px`,
  '--control-logo-lift': `${props.config.screen.layout.controlLogoLift}px`,
  '--control-icon-width': `${props.config.screen.layout.controlIconWidth}px`,
  '--control-gap': `${props.config.screen.layout.controlGroupGap}px`,
  '--control-bottom': `${props.config.screen.layout.controlBottom}px`,
  '--control-inset': `${props.config.screen.layout.controlInset}px`,
  '--background-tile-width': `${props.config.screen.layout.backgroundTileWidth}px`,
  '--background-tile-height': `${props.config.screen.layout.backgroundTileHeight}px`,
  '--content-gap': `${props.config.screen.layout.contentGap}px`,
  '--grid-columns': String(layoutColumnCount.value),
  '--grid-rows': String(layoutRowCount.value),
  '--content-start-y': `${props.config.screen.grid.contentStartY}px`,
  '--content-end-y': `${props.config.screen.grid.contentEndY}px`,
  '--content-row-height': `${contentRowHeight.value}px`,
  '--content-grid-height': `${contentGridHeight.value}px`,
  '--canvas-height': `${canvasHeight.value}px`,
  '--cell-padding': `${props.config.screen.grid.cellPadding}px`,
  '--cell-inner-background': props.config.screen.grid.innerBackgroundColor,
  '--title-dominant-color': props.config.screen.grid.dominantTitleColor,
  '--page-scroll-x': `${pageScrollX.value}px`,
  '--viewport-scale': String(viewportScale.value),
  '--viewport-offset-x': `${viewportOffsetX.value}px`,
  '--viewport-offset-y': `${viewportOffsetY.value}px`,
}));

let filterLoadToken = 0;
let widgetDataLoadToken = 0;
let hasInitializedFilters = false;

const setNav = (id: string) => {
  if (props.config.nav.some((item) => item.id === id)) {
    activeNavId.value = id;
  }
};

const getWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined => activeNavItem.value?.widgets?.[blockId];

const getLayoutComponentSlots = (widget?: RegisteredWidgetConfig): LayoutComponentSlotConfig[] => {
  const slots = widget?.props?.componentSlots;

  return Array.isArray(slots) ? slots as LayoutComponentSlotConfig[] : [];
};

const getComponentSlotWidget = (slot?: LayoutComponentSlotConfig): RegisteredWidgetConfig | undefined => {
  if (!slot) {
    return undefined;
  }

  if (slot.widget) {
    return {
      ...slot.widget,
      data: slot.widget.data ?? slot.data,
      dataBinding: slot.widget.dataBinding ?? slot.dataBinding,
      filterScope: slot.widget.filterScope ?? slot.filterScope,
      actions: slot.widget.actions ?? slot.actions,
    };
  }

  if (!slot.data && !slot.actions && !slot.filterScope && !slot.dataBinding) {
    return undefined;
  }

  return {
    type: 'BaseLayoutSpan',
    visualType: 'other',
    dataPolicy: slot.data ? 'external' : 'static',
    props: {},
    data: slot.data,
    dataBinding: slot.dataBinding,
    filterScope: slot.filterScope,
    actions: slot.actions,
  } as RegisteredWidgetConfig;
};

const hasWidgetForBlock = (blockId: string) => Boolean(getWidgetForBlock(blockId));

const isLayoutTemplateWidget = (widget?: RegisteredWidgetConfig) => widget?.type === 'BaseLayoutSpan';

const isLayoutTemplateBlock = (blockId: string) => isLayoutTemplateWidget(getWidgetForBlock(blockId));

const getWidgetProps = (blockId: string) => (getWidgetForBlock(blockId)?.props ?? {}) as Record<string, unknown>;

const isAutoComponentSlotBlock = (blockId: string) => getWidgetProps(blockId).autoComponentSlots === true;

const getWidgetBlockTitle = (blockId: string) => {
  const widget = getWidgetForBlock(blockId);
  if (!widget) {
    return '';
  }

  const propTitle = widget?.props && 'title' in widget.props ? widget.props.title : '';

  for (const value of [widget.displayTitle, widget.title, propTitle, blockId]) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return blockId;
};

const getWidgetTitlePills = (blockId: string): WidgetTitlePillOption[] =>
  (getWidgetForBlock(blockId)?.titlePills ?? [])
    .filter((pill) => !pill.hidden && pill.id.trim() && pill.label.trim());

const hasWidgetTitlePills = (blockId: string) => getWidgetTitlePills(blockId).length > 0;

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getWeightedTextLength = (value: string) =>
  Array.from(value.trim()).reduce((total, char) => total + (/[\u4e00-\u9fff]/.test(char) ? 1 : 0.58), 0);

const getBlockColumnSpan = (block: LayoutBlock) => Math.max(block.columnEnd - block.columnStart, 1);

const getBlockRowSpan = (block: LayoutBlock) => Math.max(block.rowEnd - block.rowStart, 1);

const getPlaceholderCellInnerStyle = (block: LayoutBlock): Record<string, string> => {
  const columnSpan = getBlockColumnSpan(block);
  const rowSpan = getBlockRowSpan(block);
  const style: Record<string, string> = {
    '--block-column-span': String(columnSpan),
    '--block-row-span': String(rowSpan),
  };

  style['--block-summary-row-size'] = '1fr';
  style['--block-component-row-size'] = `${Math.max(rowSpan, 1)}fr`;

  return style;
};

const getBlockContentWidth = (block: LayoutBlock) => {
  const columnWidth = Math.max(props.config.screen.layout.designWidth, 1) / Math.max(layoutColumnCount.value, 1);

  return columnWidth * getBlockColumnSpan(block) - props.config.screen.grid.cellPadding * 2;
};

const getTitlePillFontSize = (block: LayoutBlock, pill: WidgetTitlePillOption) => {
  const pillCount = Math.max(getWidgetTitlePills(block.label).length, 1);
  const titlePadding = 12;
  const titleColumnGap = 8;
  const pillGroupPadding = 4;
  const pillGap = 2;
  const pillGroupMaxWidth = Math.max((getBlockContentWidth(block) - titlePadding - titleColumnGap) * (2 / 3), 1);
  const buttonWidth = Math.max((pillGroupMaxWidth - pillGroupPadding - Math.max(pillCount - 1, 0) * pillGap) / pillCount, 1);
  const labelLength = Math.max(getWeightedTextLength(pill.label), 1);
  const computedSize = (buttonWidth - 4) / (labelLength * 1.04);

  return Math.round(clampNumber(computedSize, 9, 12) * 10) / 10;
};

const getWidgetBodySummary = (blockId: string) => getWidgetForBlock(blockId)?.bodySummary?.trim() ?? '';

const hasWidgetBodySummary = (blockId: string) => Boolean(getWidgetBodySummary(blockId));

const getActiveTitlePillId = (blockId: string) => {
  const pills = getWidgetTitlePills(blockId);

  if (pills.length === 0) {
    return '';
  }

  const activeId = titlePillSelections.value[getWidgetInstanceKey(blockId)];

  if (pills.some((pill) => pill.id === activeId && !pill.disabled)) {
    return activeId;
  }

  return pills.find((pill) => !pill.disabled)?.id ?? pills[0].id;
};

const getActiveTitlePill = (blockId: string) => {
  const pills = getWidgetTitlePills(blockId);
  const activeId = getActiveTitlePillId(blockId);

  return pills.find((pill) => pill.id === activeId && !pill.disabled) ?? pills.find((pill) => !pill.disabled) ?? pills[0];
};

const toRuntimeRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};

const toFilterValueMap = (values: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(values)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [
        key,
        value === null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value),
      ]),
  );

const createTitlePillContext = (
  blockId: string,
  source: {
    slotId?: string;
    slotLabel?: string;
    componentExampleId?: string;
  } | undefined,
  activeTitlePill?: ActiveTitlePillRuntime,
) => ({
  area: 'page' as const,
  navId: activeNavItem.value?.id ?? '',
  navLabel: activeNavItem.value?.label ?? '',
  blockId,
  sourceBlockId: blockId,
  sourceSlotId: source?.slotId,
  sourceSlotLabel: source?.slotLabel,
  sourceComponentExampleId: source?.componentExampleId,
  activeTitlePillId: activeTitlePill?.id,
  activeTitlePillLabel: activeTitlePill?.label,
  activeTitlePill,
});

const setActiveTitlePill = (blockId: string, pill: WidgetTitlePillOption) => {
  if (pill.disabled) {
    return;
  }

  titlePillSelections.value = {
    ...titlePillSelections.value,
    [getWidgetInstanceKey(blockId)]: pill.id,
  };
  void handleTitlePillActions(blockId, pill);
};

const isFilterVisibleForWidget = (group: DashboardFilterGroup, widget?: RegisteredWidgetConfig) => {
  const filterScopes = normalizeScope(group.scope);

  if (filterScopes.length === 0) {
    return true;
  }

  const widgetScopes = normalizeScope(widget?.filterScope);

  return widgetScopes.some((scope) => filterScopes.includes(scope));
};

const getScopedFilters = (widget?: RegisteredWidgetConfig) =>
  Object.fromEntries(
    props.config.filters
      .filter((group) => isFilterVisibleForWidget(group, widget))
      .map((group) => [group.id, activeFilters.value[group.id] ?? '']),
  );

const getWidgetFilterScope = (widget?: RegisteredWidgetConfig) => normalizeScope(widget?.filterScope);

const getWidgetDataKey = (ownerId: string, blockId: string, slotId?: string) =>
  slotId ? `page:${ownerId}:${blockId}:slot:${slotId}` : `page:${ownerId}:${blockId}`;

const getWidgetOwnerId = () => activeNavItem.value?.id ?? '';

const getWidgetInstanceKey = (blockId: string, slotId?: string) => getWidgetDataKey(getWidgetOwnerId(), blockId, slotId);

const getRawWidgetDataForBlock = (blockId: string) => widgetDataMap.value[getWidgetInstanceKey(blockId)] ?? [];

const getBlockState = (blockId: string): BlockState | null => {
  const widget = getWidgetForBlock(blockId);

  if (!widget) {
    return {
      kind: 'unbound',
      title: '建设中',
    };
  }

  if (widget.data && getRawWidgetDataForBlock(blockId).length === 0) {
    return {
      kind: 'empty',
      label: '暂无数据',
      title: widget.emptyState?.title ?? '暂无数据',
      message: widget.emptyState?.message ?? '当前筛选条件或数据源没有返回可展示记录。',
    };
  }

  return null;
};

const getLocalWidgetFilterValues = (blockId: string, widget = getWidgetForBlock(blockId)) =>
  resolveWidgetLocalFilterValues(widget, localWidgetFilters.value[getWidgetInstanceKey(blockId)]);

const getLocalFilterOptions = (blockId: string) => (filter: WidgetLocalFilterConfig) =>
  getLocalFilterOptionsFromRows(getRawWidgetDataForBlock(blockId), filter);

const getWidgetContext = (
  blockId: string,
  widget = getWidgetForBlock(blockId),
  source?: {
    slotId?: string;
    slotLabel?: string;
    componentExampleId?: string;
  },
): WidgetContext => {
  const scopedFilters = getScopedFilters(widget);
  const activePill = getActiveTitlePill(blockId);
  const initialPillContext: ActiveTitlePillRuntime | undefined = activePill ? {
    id: activePill.id,
    label: activePill.label,
    value: activePill.value,
    params: activePill.params,
    filters: activePill.filters,
    props: activePill.props,
    dataBinding: activePill.dataBinding,
  } : undefined;
  const baseContext = createTitlePillContext(blockId, source, initialPillContext);
  const pillParams = resolveDashboardParams(activePill?.params, {
    filters: scopedFilters,
    context: baseContext,
    params: {},
  });
  const pillFilters = resolveDashboardParams(activePill?.filters, {
    filters: scopedFilters,
    context: baseContext,
    params: pillParams,
  });
  const activeTitlePill = initialPillContext ? {
    ...initialPillContext,
    value: resolveDashboardValue(activePill?.value, {
      filters: scopedFilters,
      context: baseContext,
      params: pillParams,
    }),
    params: pillParams,
    filters: pillFilters,
  } satisfies ActiveTitlePillRuntime : undefined;
  const contextBase = createTitlePillContext(blockId, source, activeTitlePill);

  return {
    ...contextBase,
    filters: {
      ...scopedFilters,
      ...toFilterValueMap(pillFilters),
    },
    allFilters: activeFilters.value,
    filterScope: getWidgetFilterScope(widget),
    localFilters: getLocalWidgetFilterValues(blockId, widget),
    localFilterConfigs: getWidgetLocalFilterConfigs(widget),
    getLocalFilterOptions: getLocalFilterOptions(blockId),
    setLocalFilter: (filterId, value) => setLocalWidgetFilter(blockId, filterId, value),
    clearLocalFilters: () => clearLocalWidgetFilters(blockId, widget),
  };
};

const getWidgetDataForBlock = (blockId: string) => {
  const widget = getWidgetForBlock(blockId);

  return applyWidgetLocalFilters(getRawWidgetDataForBlock(blockId), widget, getLocalWidgetFilterValues(blockId, widget));
};

const getSlotDataForBlock = (blockId: string) => {
  const widget = getWidgetForBlock(blockId);
  const ownerId = getWidgetOwnerId();

  return Object.fromEntries(
    getLayoutComponentSlots(widget).map((slot) => [
      slot.id,
      widgetDataMap.value[getWidgetDataKey(ownerId, blockId, slot.id)] ?? [],
    ]),
  );
};

const getSlotContextsForBlock = (blockId: string) => {
  const widget = getWidgetForBlock(blockId);

  return Object.fromEntries(
    getLayoutComponentSlots(widget).map((slot) => [
      slot.id,
      getWidgetContext(blockId, getComponentSlotWidget(slot) ?? widget, {
        slotId: slot.id,
        slotLabel: slot.label,
        componentExampleId: slot.componentExampleId,
      }),
    ]),
  );
};

const setLocalWidgetFilter = (blockId: string, filterId: string, optionId: string) => {
  if (!filterId) {
    return;
  }

  const key = getWidgetInstanceKey(blockId);
  const current = localWidgetFilters.value[key] ?? {};
  const nextValue = current[filterId] === optionId ? '' : optionId;

  localWidgetFilters.value = {
    ...localWidgetFilters.value,
    [key]: {
      ...current,
      [filterId]: nextValue,
    },
  };
};

const clearLocalWidgetFilters = (blockId: string, widget = getWidgetForBlock(blockId)) => {
  const filters = getWidgetLocalFilterConfigs(widget);

  if (filters.length === 0) {
    return;
  }

  localWidgetFilters.value = {
    ...localWidgetFilters.value,
    [getWidgetInstanceKey(blockId)]: Object.fromEntries(filters.map((filter) => [filter.id, ''])),
  };
};

const getFilterOptions = (group: DashboardFilterGroup) => filterOptionMap.value[group.id] ?? getStaticFilterOptions(group);

const getFiltersExcluding = (filterId: string) =>
  Object.fromEntries(Object.entries(activeFilters.value).filter(([id]) => id !== filterId));

const normalizeFilterOptions = (rows: unknown[], group: DashboardFilterGroup): DashboardFilterOption[] => {
  const labelField = group.source?.labelField ?? 'label';
  const valueField = group.source?.valueField ?? 'id';

  const toOptionalNumber = (value: unknown) => {
    const numberValue = Number(value);

    return Number.isFinite(numberValue) ? numberValue : undefined;
  };

  const toOptionalText = (value: unknown) =>
    value === undefined || value === null || value === '' ? undefined : String(value);

  const options: DashboardFilterOption[] = rows.flatMap((row) => {
    if (typeof row === 'string' || typeof row === 'number') {
      const value = String(row);
      return [{ id: value, label: value }];
    }

    if (!row || typeof row !== 'object') {
      return [];
    }

    const record = row as Record<string, unknown>;
    const id = record[valueField] ?? record.id ?? record.value;
    const label = record[labelField] ?? record.label ?? record.name ?? id;

    if (id === undefined || label === undefined) {
      return [];
    }

    return [
      {
        id: String(id),
        label: String(label),
        disabled: record.disabled === true,
        reason: toOptionalText(record.reason),
        count: toOptionalNumber(record.count),
        parentId: toOptionalText(record.parentId ?? record.parent_id),
        level: toOptionalNumber(record.level),
        sortOrder: toOptionalNumber(record.sortOrder ?? record.sort_order),
        permissionScope: toOptionalText(record.permissionScope ?? record.permission_scope),
        meta: record.meta && typeof record.meta === 'object' ? (record.meta as Record<string, unknown>) : undefined,
      },
    ];
  });

  return options.sort((left, right) => (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER));
};

const getFirstEnabledFilterOption = (group: DashboardFilterGroup) =>
  getFilterOptions(group).find((option) => !option.disabled);

const getValidDefaultFilterValue = (group: DashboardFilterGroup) => {
  const defaultValue = group.defaultValue ?? '';

  if (!defaultValue) {
    return '';
  }

  const options = getFilterOptions(group);

  if (options.length === 0) {
    return defaultValue;
  }

  return options.some((option) => option.id === defaultValue && !option.disabled) ? defaultValue : '';
};

const syncFilterSelections = () => {
  const nextFilters = { ...activeFilters.value };
  let changed = false;

  props.config.filters.forEach((group) => {
    const options = getFilterOptions(group);
    const selected = nextFilters[group.id];

    const enabledOptions = options.filter((option) => !option.disabled);

    if (enabledOptions.length === 0) {
      if (selected !== '') {
        nextFilters[group.id] = '';
        changed = true;
      }
      return;
    }

    if (selected === '') {
      return;
    }

    if (!options.some((option) => option.id === selected && !option.disabled)) {
      nextFilters[group.id] = getValidDefaultFilterValue(group);
      changed = true;
    }
  });

  if (changed) {
    activeFilters.value = nextFilters;
  }
};

const loadFilterOptions = async () => {
  const currentToken = ++filterLoadToken;
  const context = getWidgetContext('');
  const nextOptions: Record<string, DashboardFilterOption[]> = {};

  await Promise.all(
    props.config.filters.map(async (group) => {
      if (!group.source) {
        nextOptions[group.id] = getStaticFilterOptions(group);
        return;
      }

      try {
        const optionFilters = getFiltersExcluding(group.id);
        const params = resolveDashboardParams(group.source.params, {
          filters: activeFilters.value,
          context: context as unknown as Record<string, unknown>,
          params: {},
        });
        const rows = await resolveDataSource(group.source, {
          filters: optionFilters,
          allFilters: activeFilters.value,
          params,
          context: context as unknown as Record<string, unknown>,
          filterScope: normalizeScope(group.scope),
        });

        nextOptions[group.id] = normalizeFilterOptions(rows, group);
      } catch {
        nextOptions[group.id] = getStaticFilterOptions(group);
      }
    }),
  );

  if (currentToken !== filterLoadToken) {
    return;
  }

  filterOptionMap.value = nextOptions;
  syncFilterSelections();
};

const resolveWidgetData = async (
  ownerId: string,
  blockId: string,
  widget: RegisteredWidgetConfig,
  context: WidgetContext,
  slotId?: string,
) => {
  const key = getWidgetDataKey(ownerId, blockId, slotId);

  if (!widget.data) {
    return [key, [] as unknown[]] as const;
  }

  try {
    const pillParams = toRuntimeRecord(context.activeTitlePill?.params);
    const dataParams = resolveDashboardParams(widget.data.params, {
      filters: context.filters,
      context: context as unknown as Record<string, unknown>,
      params: pillParams,
    });
    const params = {
      ...dataParams,
      ...pillParams,
    };
    const rows = await resolveDataSource(widget.data, {
      filters: context.filters,
      allFilters: activeFilters.value,
      params,
      context: context as unknown as Record<string, unknown>,
      filterScope: context.filterScope ?? [],
    });

    return [key, rows] as const;
  } catch {
    return [key, [] as unknown[]] as const;
  }
};

const loadWidgetData = async () => {
  const currentToken = ++widgetDataLoadToken;
  const jobs: Array<Promise<readonly [string, unknown[]]>> = [];
  const navId = activeNavItem.value?.id ?? '';

  Object.entries(activeNavItem.value?.widgets ?? {}).forEach(([blockId, widget]) => {
    if (!widget) {
      return;
    }

    jobs.push(resolveWidgetData(navId, blockId, widget, getWidgetContext(blockId, widget)));

    getLayoutComponentSlots(widget).forEach((slot) => {
      const slotWidget = getComponentSlotWidget(slot);

      if (!slotWidget?.data) {
        return;
      }

      jobs.push(resolveWidgetData(
        navId,
        blockId,
        slotWidget,
        getWidgetContext(blockId, slotWidget, {
          slotId: slot.id,
          slotLabel: slot.label,
          componentExampleId: slot.componentExampleId,
        }),
        slot.id,
      ));
    });
  });
  const entries = await Promise.all(jobs);

  if (currentToken !== widgetDataLoadToken) {
    return;
  }

  widgetDataMap.value = Object.fromEntries(entries);
};

const setFilter = (groupId: string, optionId: string) => {
  const group = props.config.filters.find((item) => item.id === groupId);
  const option = group ? getFilterOptions(group).find((item) => item.id === optionId) : null;

  if (!group || option?.disabled) {
    return;
  }

  activeFilters.value = {
    ...activeFilters.value,
    [groupId]: activeFilters.value[groupId] === optionId ? '' : optionId,
  };
};

const resetFilters = () => {
  activeFilters.value = Object.fromEntries(
    props.config.filters.map((group) => [group.id, getValidDefaultFilterValue(group)]),
  );
};

const refreshDashboard = () => {
  persistDashboardState();
  window.location.reload();
};

const printDashboard = () => {
  window.print();
};

const updateViewportLayout = () => {
  viewportScale.value = 1;
  viewportOffsetX.value = 0;
  viewportOffsetY.value = 0;
  pageScrollX.value = 0;
};

const scheduleViewportLayoutUpdate = () => {
  window.requestAnimationFrame(updateViewportLayout);
};

const toggleFullscreen = async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
    scheduleViewportLayoutUpdate();
    return;
  }

  try {
    await document.documentElement.requestFullscreen();
  } finally {
    scheduleViewportLayoutUpdate();
  }
};

const closePanels = () => {
  isNavOpen.value = false;
  isFiltersOpen.value = false;
};

const toggleNavPanel = () => {
  const nextOpen = !isNavOpen.value;
  isNavOpen.value = nextOpen;

  if (nextOpen) {
    isFiltersOpen.value = false;
  }
};

const toggleFiltersPanel = () => {
  const nextOpen = !isFiltersOpen.value;
  isFiltersOpen.value = nextOpen;

  if (nextOpen) {
    isNavOpen.value = false;
  }
};

const persistDashboardState = () => {
  try {
    sessionStorage.setItem(
      dashboardStateStorageKey,
      JSON.stringify({
        navId: activeNavId.value,
        filters: activeFilters.value,
        theme: theme.value,
        scrollX: scrollViewportRef.value?.scrollLeft ?? window.scrollX,
        scrollY: scrollViewportRef.value?.scrollTop ?? window.scrollY,
      } satisfies PersistedDashboardState),
    );
  } catch {
    // sessionStorage may be blocked by the browser; refresh can still proceed safely.
  }
};

const restorePersistedScroll = () => {
  if (typeof persistedDashboardState.scrollX !== 'number' && typeof persistedDashboardState.scrollY !== 'number') {
    return;
  }

  window.requestAnimationFrame(() => {
    const scrollLeft = persistedDashboardState.scrollX ?? 0;
    const scrollTop = persistedDashboardState.scrollY ?? 0;

    if (scrollViewportRef.value) {
      scrollViewportRef.value.scrollTo({ left: scrollLeft, top: scrollTop, behavior: 'auto' });
    } else {
      window.scrollTo(scrollLeft, scrollTop);
    }

    syncPageScroll();
  });
};

const buildActionScope = (runtime: WidgetActionRuntime) => ({
  event: {
    name: runtime.event.name,
    sourceBlockId: runtime.event.sourceBlockId ?? runtime.context.sourceBlockId ?? runtime.context.blockId,
    sourceSlotId: runtime.event.sourceSlotId ?? runtime.context.sourceSlotId,
    sourceSlotLabel: runtime.event.sourceSlotLabel ?? runtime.context.sourceSlotLabel,
    sourceComponentExampleId: runtime.event.sourceComponentExampleId ?? runtime.context.sourceComponentExampleId,
    ...(runtime.event.payload ?? {}),
  },
  filters: activeFilters.value,
  context: runtime.context as unknown as Record<string, unknown>
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const toActionRecord = (value: unknown): Record<string, unknown> => (isRecord(value) ? value : {});

const formatActionValue = (value: unknown) => {
  if (value === undefined || value === null || value === '') {
    return '-';
  }

  return typeof value === 'string' ? value : JSON.stringify(value);
};

const getActionTargetText = (target: unknown) => {
  if (typeof target === 'string' || typeof target === 'number') {
    return String(target);
  }

  if (!isRecord(target)) {
    return '';
  }

  for (const key of ['navId', 'pageId', 'route', 'url', 'id']) {
    const value = target[key];

    if (typeof value === 'string' || typeof value === 'number') {
      return String(value);
    }
  }

  return '';
};

const appendQueryParams = (target: string, query: Record<string, unknown>) => {
  if (!target || Object.keys(query).length === 0) {
    return target;
  }

  const url = new URL(target, window.location.href);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return target.startsWith('http') ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
};

const getActionTargetType = (action: DashboardActionConfig) => {
  if (action.targetType) {
    return action.targetType;
  }

  if (action.interactionType === 'jump') {
    return 'route';
  }

  if (action.interactionType === 'drilldown' || action.interactionType === 'drawer') {
    return 'drawer';
  }

  if (action.interactionType === 'modal') {
    return 'modal';
  }

  if (action.interactionType === 'popup') {
    return 'popover';
  }

  if (action.interactionType === 'crossFilter') {
    return 'cross-filter';
  }

  return undefined;
};

const applyCrossFilterAction = (values: Record<string, unknown>) => {
  const configuredFilterIds = new Set(props.config.filters.map((group) => group.id));
  const nextFilters = { ...activeFilters.value };

  Object.entries(values).forEach(([key, value]) => {
    if (!configuredFilterIds.has(key)) {
      return;
    }

    nextFilters[key] = value === undefined || value === null ? '' : String(value);
  });

  activeFilters.value = nextFilters;
};

const openInteractionOverlay = (
  type: DashboardInteractionOverlay['type'],
  action: DashboardActionConfig,
  runtime: WidgetActionRuntime,
  query: Record<string, unknown>,
  params: Record<string, unknown>,
) => {
  interactionOverlay.value = {
    type,
    title: String(action.meta && isRecord(action.meta) && action.meta.title ? action.meta.title : action.interactionId ?? runtime.event.name),
    action: action as unknown as Record<string, unknown>,
    target: getActionTargetText(action.target),
    event: runtime.event,
    context: runtime.context,
    query,
    params,
  };
};

const runBuiltinDashboardAction = async (action: DashboardActionConfig, runtime: WidgetActionRuntime) => {
  const targetType = getActionTargetType(action);
  const query = toActionRecord(action.query);
  const params = toActionRecord(action.params);

  if (targetType === 'fullscreen' || action.type === 'fullscreen') {
    await toggleFullscreen();
    return true;
  }

  if (targetType === 'export' || action.type === 'exportCurrentBlock') {
    printDashboard();
    return true;
  }

  if (action.type === 'refresh') {
    refreshDashboard();
    return true;
  }

  if (targetType === 'cross-filter') {
    applyCrossFilterAction({ ...params, ...query });
    return true;
  }

  const target = getActionTargetText(action.target);

  if (targetType === 'route') {
    if (props.config.nav.some((item) => item.id === target)) {
      setNav(target);
      return true;
    }

    if (target) {
      window.location.hash = appendQueryParams(target, query);
      return true;
    }
  }

  if (targetType === 'external' && target) {
    window.open(appendQueryParams(target, query), '_blank', 'noopener');
    return true;
  }

  if (targetType === 'drawer' || targetType === 'modal' || targetType === 'popover') {
    openInteractionOverlay(targetType === 'drawer' ? 'drawer' : targetType === 'modal' ? 'modal' : 'popup', action, runtime, query, params);
    return true;
  }

  return false;
};

const runDashboardAction = async (rawAction: DashboardActionConfig, runtime: WidgetActionRuntime) => {
  const action = resolveDashboardValue(
    rawAction as unknown as DashboardExpressionValue,
    buildActionScope(runtime),
  ) as DashboardActionConfig;

  const customHandler =
    customActionRegistry[action.type] ??
    customActionRegistry[runtime.event.name] ??
    customActionRegistry.dashboardAction;

  if (!customHandler) {
    await runBuiltinDashboardAction(action, runtime);
    return;
  }

  await customHandler({
    action,
    event: runtime.event,
    context: runtime.context,
    filters: activeFilters.value,
    controls: {
      print: printDashboard,
      fullscreen: toggleFullscreen,
      refresh: refreshDashboard,
    },
  });
};

const getWidgetActionRuntime = (blockId: string, event: DashboardWidgetActionEvent): WidgetActionRuntime | null => {
  const blockWidget = getWidgetForBlock(blockId);

  if (!blockWidget) {
    return null;
  }

  const sourceSlotId = event.sourceSlotId ?? (event.payload?.sourceSlotId as string | undefined);
  const sourceSlot = getLayoutComponentSlots(blockWidget).find((slot) => slot.id === sourceSlotId || slot.regionKey === sourceSlotId);
  const widget = getComponentSlotWidget(sourceSlot) ?? blockWidget;

  return {
    event: {
      ...event,
      sourceBlockId: event.sourceBlockId ?? blockId,
      sourceSlotId,
      sourceSlotLabel: event.sourceSlotLabel ?? sourceSlot?.label,
      sourceComponentExampleId: event.sourceComponentExampleId ?? sourceSlot?.componentExampleId,
    },
    widget,
    context: getWidgetContext(blockId, widget, sourceSlot ? {
      slotId: sourceSlot.id,
      slotLabel: sourceSlot.label,
      componentExampleId: sourceSlot.componentExampleId,
    } : undefined),
  };
};

const handleWidgetAction = async (blockId: string, event: DashboardWidgetActionEvent) => {
  const runtime = getWidgetActionRuntime(blockId, event);

  if (!runtime) {
    return;
  }

  const actionConfig = runtime.widget.actions?.[event.name];
  const actions = Array.isArray(actionConfig) ? actionConfig : actionConfig ? [actionConfig] : [];

  if (actions.length === 0) {
    await runDashboardAction({ type: event.name, sourceSlotId: runtime.context.sourceSlotId }, runtime);
    return;
  }

  for (const action of actions) {
    await runDashboardAction(action, runtime);
  }
};

const handleTitlePillActions = async (blockId: string, pill: WidgetTitlePillOption) => {
  const runtime = getWidgetActionRuntime(blockId, {
    name: 'titlePillChange',
    sourceBlockId: blockId,
    payload: {
      titlePillId: pill.id,
      titlePillLabel: pill.label,
      value: pill.value,
      params: pill.params,
      filters: pill.filters,
    },
  });

  if (!runtime) {
    return;
  }

  const actionConfig = pill.actions?.titlePillChange ?? pill.actions?.change ?? pill.actions?.click;
  const actions = Array.isArray(actionConfig) ? actionConfig : actionConfig ? [actionConfig] : [];

  for (const action of actions) {
    await runDashboardAction(action, runtime);
  }
};

const hideScrollbars = () => {
  window.clearTimeout(scrollbarsHideTimer);
  isScrollbarsActive.value = false;
};

const showScrollbarsTemporarily = () => {
  window.clearTimeout(scrollbarsHideTimer);
  isScrollbarsActive.value = true;
  scrollbarsHideTimer = window.setTimeout(() => {
    isScrollbarsActive.value = false;
  }, 1600);
};

const handleScrollViewportPointerMove = (event: PointerEvent) => {
  const viewport = scrollViewportRef.value;

  if (!viewport) {
    return;
  }

  const rect = viewport.getBoundingClientRect();
  const edgeSize = 42;
  const canScrollX = viewport.scrollWidth > viewport.clientWidth + 1;
  const canScrollY = viewport.scrollHeight > viewport.clientHeight + 1;
  const nearHorizontalEdge = event.clientX - rect.left <= edgeSize || rect.right - event.clientX <= edgeSize;
  const nearVerticalEdge = event.clientY - rect.top <= edgeSize || rect.bottom - event.clientY <= edgeSize;

  if ((canScrollX && nearHorizontalEdge) || (canScrollY && nearVerticalEdge)) {
    showScrollbarsTemporarily();
  }
};

const syncPageScroll = () => {
  pageScrollX.value = scrollViewportRef.value?.scrollLeft ?? 0;
};

onMounted(() => {
  updateViewportLayout();
  syncPageScroll();
  restorePersistedScroll();
  scrollTargets.push(window, document, document.documentElement, document.body);
  scrollTargets.forEach((target) => target.addEventListener('scroll', syncPageScroll, { passive: true }));
  window.addEventListener('resize', syncPageScroll);
  window.addEventListener('resize', updateViewportLayout);
  window.visualViewport?.addEventListener('resize', updateViewportLayout);
  document.addEventListener('fullscreenchange', updateViewportLayout);
});

onBeforeUnmount(() => {
  scrollTargets.forEach((target) => target.removeEventListener('scroll', syncPageScroll));
  scrollTargets.length = 0;
  window.removeEventListener('resize', syncPageScroll);
  window.removeEventListener('resize', updateViewportLayout);
  window.visualViewport?.removeEventListener('resize', updateViewportLayout);
  document.removeEventListener('fullscreenchange', updateViewportLayout);
  window.clearTimeout(scrollbarsHideTimer);
});

watch(
  theme,
  (value) => {
    document.documentElement.dataset.theme = value;
    document.documentElement.classList.toggle('dark', value === 'dark');
  },
  { immediate: true },
);

watch(
  () => props.config.filters,
  () => {
    if (hasInitializedFilters) {
      activeFilters.value = getDefaultFiltersFromGroups(props.config.filters);
    }

    hasInitializedFilters = true;
    void loadFilterOptions();
  },
  { deep: true, immediate: true },
);

watch(
  activeFilters,
  () => {
    void loadFilterOptions();
    void loadWidgetData();
  },
  { deep: true },
);

watch(
  titlePillSelections,
  () => {
    void loadWidgetData();
  },
  { deep: true },
);

watch(
  activeNavId,
  () => {
    void loadWidgetData();
  },
  { deep: true, immediate: true },
);

watch(
  () => props.config.nav,
  () => {
    void loadWidgetData();
  },
  { deep: true },
);
</script>

<template>
  <div
    ref="scrollViewportRef"
    class="dashboard-scroll-viewport"
    :class="{ 'show-scrollbars': isScrollbarsActive }"
    @pointermove="handleScrollViewportPointerMove"
    @pointerleave="hideScrollbars"
    @scroll="syncPageScroll"
  >
  <main
    class="cockpit-app"
    :class="[`theme-${theme}`, { 'nav-open': isNavOpen, 'filters-open': isFiltersOpen }]"
    :style="appStyle"
  >
    <div class="cockpit-background" aria-hidden="true"></div>

    <section class="cockpit-shell">
      <header class="cockpit-header">
        <div class="header-actions header-actions-left" @click.stop>
          <div class="title-logo-floating" :aria-label="config.assets.logoAlt" role="img">
            <img :src="config.assets.logoSrc" :alt="config.assets.logoAlt" />
          </div>
          <div v-if="activeNavItem" class="title-nav-current" :aria-label="activeNavItem.label">
            <component :is="iconMap[activeNavItem.icon]" :size="15" />
            <span>{{ activeNavItem.label }}</span>
          </div>
        </div>

        <div class="title-crown" :aria-label="config.screen.title">
          <h1>{{ config.screen.title }}</h1>
        </div>

        <div class="header-actions header-actions-right" @click.stop>
          <button
            class="title-tool title-tool-icon title-refresh-floating"
            type="button"
            :aria-label="config.screen.controls.refresh"
            :title="config.screen.controls.refresh"
            @click.stop="refreshDashboard"
          >
            <RefreshCw :size="14" />
          </button>
          <button
            class="title-tool title-tool-icon title-lower-shift-right"
            type="button"
            :aria-label="config.screen.controls.filters"
            :title="config.screen.controls.filters"
            @click.stop="toggleFiltersPanel"
          >
            <Funnel :size="16" />
          </button>
          <button
            class="title-tool title-tool-icon title-lower-shift-right"
            type="button"
            :aria-label="config.screen.controls.navigation"
            :title="config.screen.controls.navigation"
            @click.stop="toggleNavPanel"
          >
            <Menu :size="16" />
          </button>
          <button
            class="title-tool title-tool-icon title-download-floating"
            type="button"
            :aria-label="config.screen.controls.download"
            :title="config.screen.controls.download"
            @click.stop="printDashboard"
          >
            <Download :size="16" />
          </button>
          <button
            class="title-tool title-tool-logo title-fullscreen-floating"
            type="button"
            :aria-label="config.screen.controls.fullscreen"
            :title="config.screen.controls.fullscreen"
            @click.stop="toggleFullscreen"
          >
            <Maximize2 :size="14" />
          </button>
        </div>
      </header>

      <button
        v-if="isNavOpen || isFiltersOpen"
        class="panel-dismiss-layer"
        type="button"
        aria-label="关闭弹窗"
        @click="closePanels"
      ></button>

      <nav
        class="side-panel nav-panel"
        :class="{ open: isNavOpen }"
        :style="isNavOpen ? openPanelStyle : undefined"
        :aria-label="config.screen.navTitle"
        @click.stop
      >
        <p class="panel-title">{{ config.screen.navTitle }}</p>
        <button
          v-for="item in config.nav"
          :key="item.id"
          class="nav-item"
          :class="{ active: activeNavId === item.id }"
          type="button"
          @click="setNav(item.id)"
        >
          <component :is="iconMap[item.icon]" :size="19" />
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <aside
        class="side-panel filter-panel"
        :class="{ open: isFiltersOpen }"
        :style="isFiltersOpen ? openPanelStyle : undefined"
        :aria-label="config.screen.filterTitle"
        @click.stop
      >
        <p class="panel-title">{{ config.screen.filterTitle }}</p>
        <section v-for="group in config.filters" :key="group.id" class="filter-group">
          <p>{{ group.label }}</p>
          <div>
            <button
              v-for="option in getFilterOptions(group)"
              :key="option.id"
              class="filter-option"
              :class="{ active: activeFilters[group.id] === option.id }"
              type="button"
              :disabled="option.disabled"
              :title="option.reason ?? option.label"
              @click="setFilter(group.id, option.id)"
            >
              <span>{{ option.label }}</span>
              <em v-if="option.count !== undefined" class="filter-option-count">{{ option.count }}</em>
            </button>
            <span v-if="getFilterOptions(group).length === 0" class="filter-empty">暂无选项</span>
          </div>
        </section>
      </aside>

      <section class="canvas-shell">
        <section class="placeholder-grid" :aria-label="`${layoutColumnCount}乘${layoutRowCount}内容占位区`">
          <div
            v-for="block in layoutBlocks"
            :key="block.id"
            class="placeholder-cell"
            :style="{
              gridColumn: `${block.columnStart} / ${block.columnEnd}`,
              gridRow: `${block.rowStart} / ${block.rowEnd}`,
            }"
            :aria-label="block.label"
          >
            <div
              class="placeholder-cell-inner"
              :class="{
                'is-block-masked': getBlockState(block.label),
                'is-layout-template-block': isLayoutTemplateBlock(block.label),
                'is-auto-component-slots': isAutoComponentSlotBlock(block.label),
              }"
              :style="getPlaceholderCellInnerStyle(block)"
            >
              <div class="placeholder-cell-top placeholder-cell-title" :class="{ 'has-title-pills': hasWidgetTitlePills(block.label) }">
                <span v-if="hasWidgetForBlock(block.label)" class="placeholder-cell-title-main">
                  <span class="placeholder-cell-title-text">{{ getWidgetBlockTitle(block.label) }}</span>
                  <span class="placeholder-cell-title-meteor" aria-hidden="true"></span>
                </span>
                <div
                  v-if="hasWidgetTitlePills(block.label)"
                  class="placeholder-cell-pill-group"
                  role="group"
                  :aria-label="`${getWidgetBlockTitle(block.label)}切换`"
                >
                  <button
                    v-for="pill in getWidgetTitlePills(block.label)"
                    :key="pill.id"
                    type="button"
                    class="placeholder-cell-pill-button"
                    :class="{ active: getActiveTitlePillId(block.label) === pill.id }"
                    :style="{ '--pill-font-size': `${getTitlePillFontSize(block, pill)}px` }"
                    :title="pill.label"
                    :disabled="pill.disabled"
                    :aria-pressed="getActiveTitlePillId(block.label) === pill.id"
                    @click="setActiveTitlePill(block.label, pill)"
                  >
                    {{ pill.label }}
                  </button>
                </div>
              </div>
              <div
                class="placeholder-cell-body"
                :class="{
                  'has-body-summary': hasWidgetBodySummary(block.label),
                }"
              >
                <section class="placeholder-cell-body-section placeholder-cell-body-section-2" aria-label="3 组件区">
                  <WidgetRenderer
                    :block-size="{ cols: getBlockColumnSpan(block), rows: getBlockRowSpan(block) }"
                    :context="getWidgetContext(block.label)"
                    :data="getWidgetDataForBlock(block.label)"
                    :slot-contexts="getSlotContextsForBlock(block.label)"
                    :slot-data="getSlotDataForBlock(block.label)"
                    :widget="getWidgetForBlock(block.label)"
                    @dashboard-action="handleWidgetAction(block.label, $event)"
                  />
                </section>
                <section
                  v-if="hasWidgetBodySummary(block.label)"
                  class="placeholder-cell-body-section placeholder-cell-body-section-3"
                  aria-label="4 说明区"
                >
                  <p class="placeholder-cell-summary-text">{{ getWidgetBodySummary(block.label) }}</p>
                </section>
              </div>
              <div
                v-if="getBlockState(block.label)"
                class="placeholder-cell-mask"
                :class="`placeholder-cell-mask-${getBlockState(block.label)?.kind}`"
                aria-live="polite"
              >
                <span v-if="getBlockState(block.label)?.label" class="placeholder-cell-mask-badge">
                  {{ getBlockState(block.label)?.label }}
                </span>
                <strong>{{ getBlockState(block.label)?.title }}</strong>
                <p v-if="getBlockState(block.label)?.message">{{ getBlockState(block.label)?.message }}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  </main>
  <el-drawer
    v-model="isInteractionDrawerOpen"
    :title="interactionOverlay?.title"
    class="interaction-overlay-drawer"
    modal-class="interaction-overlay-scrim"
    size="42%"
    destroy-on-close
  >
    <section class="interaction-overlay-body">
      <div class="interaction-overlay-summary">
        <span class="interaction-overlay-kicker">下钻详情</span>
        <strong>{{ interactionOverlay?.event.name }}</strong>
        <p>基于当前筛选、分块和槽位上下文生成的经营明细。</p>
      </div>
      <dl class="interaction-overlay-list">
        <template v-for="[key, value] in interactionOverlayEntries" :key="key">
          <dt>{{ key }}</dt>
          <dd>{{ formatActionValue(value) }}</dd>
        </template>
      </dl>
    </section>
  </el-drawer>
  <el-dialog
    v-model="isInteractionDialogOpen"
    :title="interactionOverlay?.title"
    class="interaction-overlay-dialog"
    modal-class="interaction-overlay-scrim"
    width="640px"
    destroy-on-close
  >
    <section class="interaction-overlay-body">
      <div class="interaction-overlay-summary">
        <span class="interaction-overlay-kicker">{{ interactionOverlay?.type === 'popup' ? '辅助说明' : '对比弹窗' }}</span>
        <strong>{{ interactionOverlay?.event.name }}</strong>
        <p>展示当前组件触发的对比、说明和参数上下文。</p>
      </div>
      <dl class="interaction-overlay-list">
        <template v-for="[key, value] in interactionOverlayEntries" :key="key">
          <dt>{{ key }}</dt>
          <dd>{{ formatActionValue(value) }}</dd>
        </template>
      </dl>
    </section>
  </el-dialog>
  </div>
</template>
