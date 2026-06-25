<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Download, Maximize2, RefreshCw, SlidersHorizontal } from '@lucide/vue';
import { customActionRegistry } from '../actions/registry';
import { resolveDataSource } from '../dataSources/registry';
import { getTemplateGallerySections, isTemplateAssetGalleryNav } from '../report-template-assets';
import type { DashboardActionConfig, DashboardExpressionValue, DashboardWidgetActionEvent } from '../types/actions';
import type { DashboardFilterScope } from '../types/data-source';
import type {
  DashboardConfig,
  DashboardFilterGroup,
  DashboardFilterOption,
  DashboardPageConfig,
  ThemeMode,
} from '../types/dashboard';
import { resolveDashboardParams, resolveDashboardValue } from '../utils/dashboardExpressions';
import TemplateGalleryDashboard from '../widgets/galleries/TemplateGalleryDashboard.vue';
import type { TemplateGallerySection } from '../widgets/galleries/TemplateGalleryDashboard.vue';
import WidgetRenderer from '../widgets/WidgetRenderer.vue';
import {
  applyWidgetLocalFilters,
  getLocalFilterOptionsFromRows,
  getWidgetLocalFilterConfigs,
  resolveWidgetLocalFilterValues,
} from '../widgets/localFilters';
import type {
  RegisteredWidgetConfig,
  WidgetAuxMetric,
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

interface BlockState {
  kind: 'unbound' | 'empty';
  label?: string;
  title: string;
  message?: string;
}

interface PersistedDashboardState {
  filters?: Record<string, string>;
  topbarNavId?: string;
  scrollX?: number;
  scrollY?: number;
}

const emptyGridMarks = new Set(['.', ' ']);
const fallbackPageId = 'single-page';
const dashboardStateStorageKey = 'topbar-light-scroll-dashboard:runtime-state';
const topbarNavItems = computed(() => props.config.screen.topbarNav ?? []);

const getStaticFilterOptions = (group: DashboardFilterGroup) => group.options ?? [];

const getDefaultFiltersFromGroups = (groups: DashboardFilterGroup[]) =>
  Object.fromEntries(groups.map((group) => [group.id, group.defaultValue ?? '']));

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

const getDefaultTopbarNavId = () => props.config.screen.defaultTopbarNavId ?? topbarNavItems.value[0]?.id ?? fallbackPageId;

const isKnownTopbarNavId = (navId?: string) =>
  Boolean(navId && (props.config.pages?.[navId] || topbarNavItems.value.some((item) => item.id === navId)));

const getInitialTopbarNavId = () => {
  if (isKnownTopbarNavId(persistedDashboardState.topbarNavId)) {
    return persistedDashboardState.topbarNavId as string;
  }

  return getDefaultTopbarNavId();
};

const getInitialFilters = () =>
  Object.fromEntries(
    props.config.filters.map((group) => [
      group.id,
      persistedDashboardState.filters?.[group.id] ?? defaultFilters[group.id] ?? '',
    ]),
  );

const getInitialTheme = (): ThemeMode => props.config.screen.defaultTheme;

const activeTopbarNavId = ref(getInitialTopbarNavId());
const activeFilters = ref<Record<string, string>>(getInitialFilters());
const filterOptionMap = ref<Record<string, DashboardFilterOption[]>>({});
const widgetDataMap = ref<Record<string, unknown[]>>({});
const titlePillSelections = ref<Record<string, string>>({});
const localWidgetFilters = ref<Record<string, Record<string, string>>>({});
const isFiltersOpen = ref(props.config.screen.defaultFiltersOpen);
const theme = ref<ThemeMode>(getInitialTheme());
const viewportScale = ref(1);
const viewportOffsetX = ref(0);
const viewportOffsetY = ref(0);
const scrollViewportRef = ref<HTMLElement | null>(null);
const isScrollbarsActive = ref(false);
const pageScrollX = ref(0);
const scrollTargets: EventTarget[] = [];
let scrollbarsHideTimer: number | undefined;

const activeTopbarNavItem = computed(() => topbarNavItems.value.find((item) => item.id === activeTopbarNavId.value));
const activePageId = computed(() => (props.config.pages?.[activeTopbarNavId.value] ? activeTopbarNavId.value : fallbackPageId));
const activePage = computed<DashboardPageConfig>(() => props.config.pages?.[activeTopbarNavId.value] ?? props.config.page);
const activePageLabel = computed(() => activeTopbarNavItem.value?.label ?? props.config.screen.title);
const layoutRows = computed(() => normalizeLayoutRows(activePage.value.layoutRows));
const layoutColumnCount = computed(() => Math.max(...layoutRows.value.map((row) => Array.from(row).length), 1));
const layoutRowCount = computed(() => Math.max(layoutRows.value.length, 1));
const layoutBlocks = computed<LayoutBlock[]>(() => buildLayoutBlocks(layoutRows.value));
const contentRowHeight = computed(() => Math.max(props.config.screen.grid.rowHeight ?? 1, 1));
const contentWidth = computed(() => Math.max(props.config.screen.layout.designWidth, 1));
const contentAreaHeight = computed(() => props.config.screen.grid.contentEndY - props.config.screen.grid.contentStartY);
const contentGridHeight = computed(
  () => layoutRowCount.value * contentRowHeight.value + Math.max(layoutRowCount.value - 1, 0) * props.config.screen.layout.contentGap,
);
const canvasHeight = computed(() => contentAreaHeight.value);
const isTemplateGalleryDashboard = computed(() => isTemplateAssetGalleryNav(activeTopbarNavId.value));
const templateGallerySections = computed<TemplateGallerySection[]>(() =>
  getTemplateGallerySections(props.config, activeTopbarNavId.value),
);
const appStyle = computed(() => ({
  '--page-background-image': props.config.assets.backgroundSrc
    ? `url("${props.config.assets.backgroundSrc}")`
    : 'none',
  '--design-width': `${props.config.screen.layout.designWidth}px`,
  '--design-height': `${props.config.screen.layout.designHeight}px`,
  '--topbar-height': `${props.config.screen.layout.topbarHeight}px`,
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

const getWidgetForBlock = (blockId: string): RegisteredWidgetConfig | undefined => activePage.value.widgets?.[blockId];

const hasWidgetForBlock = (blockId: string) => Boolean(getWidgetForBlock(blockId));

const isLayoutTemplateWidget = (widget?: RegisteredWidgetConfig) => Boolean(widget?.type.match(/^Span\d{2}x\d{2}Layout$/));

const isLayoutTemplateBlock = (blockId: string) => isLayoutTemplateWidget(getWidgetForBlock(blockId));

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
    .filter((pill) => pill.id.trim() && pill.label.trim())
    .slice(0, 3);

const hasWidgetTitlePills = (blockId: string) => getWidgetTitlePills(blockId).length > 0;

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getWeightedTextLength = (value: string) =>
  Array.from(value.trim()).reduce((total, char) => total + (/[\u4e00-\u9fff]/.test(char) ? 1 : 0.58), 0);

const getBlockColumnSpan = (block: LayoutBlock) => Math.max(block.columnEnd - block.columnStart, 1);

const getBlockContentWidth = (block: LayoutBlock) => {
  const columnWidth = Math.max(props.config.screen.layout.designWidth, 1) / Math.max(layoutColumnCount.value, 1);

  return columnWidth * getBlockColumnSpan(block) - props.config.screen.grid.cellPadding * 2;
};

const getTitlePillFontSize = (block: LayoutBlock, pill: WidgetTitlePillOption) => {
  const pillCount = Math.max(getWidgetTitlePills(block.label).length, 1);
  const titlePadding = 12;
  const titleColumnGap = 8;
  const pillGroupPadding = 4;
  const rightColumnWidth = Math.max((getBlockContentWidth(block) - titlePadding - titleColumnGap) / 3, 1);
  const buttonWidth = Math.max((rightColumnWidth - pillGroupPadding) / pillCount, 1);
  const labelLength = Math.max(getWeightedTextLength(pill.label), 1);
  const computedSize = (buttonWidth - 4) / (labelLength * 1.04);

  return Math.round(clampNumber(computedSize, 9, 12) * 10) / 10;
};

const getWidgetBodySummary = (blockId: string) => getWidgetForBlock(blockId)?.bodySummary?.trim() ?? '';

const hasWidgetBodySummary = (blockId: string) => Boolean(getWidgetBodySummary(blockId));

const isUnitAuxMetric = (metric: WidgetAuxMetric) => metric.label.trim() === '单位';

const getAuxMetricLimit = (columnSpan: number) => (columnSpan < 2 ? 0 : 2 + Math.max(columnSpan - 2, 0) * 3);

const getWidgetAuxMetrics = (blockId: string, columnSpan: number): WidgetAuxMetric[] => {
  const metrics = getWidgetForBlock(blockId)?.auxMetrics?.filter((metric) => metric.label.trim()) ?? [];
  const unitMetrics = metrics.filter(isUnitAuxMetric);
  const unitMetric = unitMetrics[unitMetrics.length - 1];
  const nonUnitMetrics = metrics.filter((metric) => !isUnitAuxMetric(metric)).slice(0, getAuxMetricLimit(columnSpan));

  return unitMetric ? [...nonUnitMetrics, unitMetric] : nonUnitMetrics;
};

const hasWidgetAuxMetrics = (block: LayoutBlock) => getWidgetAuxMetrics(block.label, getBlockColumnSpan(block)).length > 0;

const getAuxMetricSectionStyle = (block: LayoutBlock): Record<string, string> => {
  const columnSpan = getBlockColumnSpan(block);
  const metrics = getWidgetAuxMetrics(block.label, columnSpan);
  const style: Record<string, string> = {
    '--aux-metric-count': String(metrics.length),
  };

  if (isLayoutTemplateBlock(block.label) && metrics.length === 2) {
    style['--aux-metric-columns'] = `minmax(0, ${Math.max(columnSpan - 1, 1)}fr) minmax(0, 1fr)`;
  }

  return style;
};

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

const setActiveTitlePill = (blockId: string, pill: WidgetTitlePillOption) => {
  if (pill.disabled) {
    return;
  }

  titlePillSelections.value = {
    ...titlePillSelections.value,
    [getWidgetInstanceKey(blockId)]: pill.id,
  };
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

const getWidgetDataKey = (ownerId: string, blockId: string) => `page:${ownerId}:${blockId}`;

const getWidgetOwnerId = () => activePageId.value;

const getWidgetInstanceKey = (blockId: string) => getWidgetDataKey(getWidgetOwnerId(), blockId);

const getRawWidgetDataForBlock = (blockId: string) => widgetDataMap.value[getWidgetInstanceKey(blockId)] ?? [];

const getBlockState = (blockId: string): BlockState | null => {
  const widget = getWidgetForBlock(blockId);

  if (!widget) {
    return {
      kind: 'unbound',
      label: activePageLabel.value,
      title: '建设中',
      message: `已预留 ${blockId} 模块位。`,
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

const getWidgetContext = (blockId: string, widget = getWidgetForBlock(blockId)): WidgetContext => ({
  area: 'page',
  navId: activePageId.value,
  navLabel: activePageLabel.value,
  blockId,
  filters: getScopedFilters(widget),
  allFilters: activeFilters.value,
  filterScope: getWidgetFilterScope(widget),
  localFilters: getLocalWidgetFilterValues(blockId, widget),
  localFilterConfigs: getWidgetLocalFilterConfigs(widget),
  getLocalFilterOptions: getLocalFilterOptions(blockId),
  setLocalFilter: (filterId, value) => setLocalWidgetFilter(blockId, filterId, value),
  clearLocalFilters: () => clearLocalWidgetFilters(blockId, widget),
});

const getWidgetDataForBlock = (blockId: string) => {
  const widget = getWidgetForBlock(blockId);

  return applyWidgetLocalFilters(getRawWidgetDataForBlock(blockId), widget, getLocalWidgetFilterValues(blockId, widget));
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
) => {
  const key = getWidgetDataKey(ownerId, blockId);

  if (!widget.data) {
    return [key, [] as unknown[]] as const;
  }

  try {
    const params = resolveDashboardParams(widget.data.params, {
      filters: context.filters,
      context: context as unknown as Record<string, unknown>,
      params: {},
    });
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
  const ownerId = activePageId.value;

  Object.entries(activePage.value.widgets ?? {}).forEach(([blockId, widget]) => {
    if (!widget) {
      return;
    }

    jobs.push(resolveWidgetData(ownerId, blockId, widget, getWidgetContext(blockId, widget)));
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
  isFiltersOpen.value = false;
};

const toggleFiltersPanel = () => {
  isFiltersOpen.value = !isFiltersOpen.value;
};

const setActiveTopbarNav = (navId: string) => {
  if (activeTopbarNavId.value === navId) {
    return;
  }

  activeTopbarNavId.value = navId;
  widgetDataMap.value = {};
  closePanels();
  window.scrollTo(window.scrollX, 0);
  syncPageScroll();
};


const persistDashboardState = () => {
  try {
    sessionStorage.setItem(
      dashboardStateStorageKey,
      JSON.stringify({
        filters: activeFilters.value,
        topbarNavId: activeTopbarNavId.value,
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
    ...(runtime.event.payload ?? {}),
  },
  filters: activeFilters.value,
  context: runtime.context as unknown as Record<string, unknown>
});

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

const handleWidgetAction = async (blockId: string, event: DashboardWidgetActionEvent) => {
  const widget = getWidgetForBlock(blockId);

  if (!widget) {
    return;
  }

  const actionConfig = widget.actions?.[event.name];
  const actions = Array.isArray(actionConfig) ? actionConfig : actionConfig ? [actionConfig] : [];
  const runtime = {
    event,
    widget,
    context: getWidgetContext(blockId, widget),
  };

  if (actions.length === 0) {
    await runDashboardAction({ type: event.name }, runtime);
    return;
  }

  for (const action of actions) {
    await runDashboardAction(action, runtime);
  }
};

const handleTemplateGalleryAction = async (event: DashboardWidgetActionEvent) => {
  const customHandler = customActionRegistry[event.name] ?? customActionRegistry.dashboardAction;

  if (!customHandler) {
    return;
  }

  await customHandler({
    action: { type: event.name },
    event,
    context: getWidgetContext(''),
    filters: activeFilters.value,
    controls: {
      print: printDashboard,
      fullscreen: toggleFullscreen,
      refresh: refreshDashboard,
    },
  });
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
  topbarNavItems,
  () => {
    if (!isKnownTopbarNavId(activeTopbarNavId.value)) {
      activeTopbarNavId.value = getDefaultTopbarNavId();
    }
  },
  { deep: true },
);


watch(
  () => activePage.value,
  () => {
    void loadWidgetData();
  },
  { deep: true, immediate: true },
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
    class="dashboard-app"
    :class="[`theme-${theme}`, { 'filters-open': isFiltersOpen }]"
    :style="appStyle"
  >
    <div class="dashboard-background" aria-hidden="true"></div>

    <section class="dashboard-shell">
      <header class="topbar">
        <div class="topbar-brand" @click.stop>
          <div class="topbar-logo" :aria-label="config.assets.logoAlt" role="img">
            <img :src="config.assets.logoSrc" :alt="config.assets.logoAlt" />
          </div>
          <h1 class="topbar-title">
            <span class="topbar-title-text">{{ config.screen.title }}</span>
          </h1>
        </div>

        <nav v-if="topbarNavItems.length > 0" class="topbar-nav" aria-label="主导航" @click.stop>
          <button
            v-for="item in topbarNavItems"
            :key="item.id"
            class="topbar-nav-item"
            :class="{ active: activeTopbarNavId === item.id }"
            type="button"
            :aria-pressed="activeTopbarNavId === item.id"
            @click="setActiveTopbarNav(item.id)"
          >
            {{ item.label }}
          </button>
        </nav>

        <div class="topbar-actions topbar-actions-right" @click.stop>
          <button
            class="topbar-button"
            type="button"
            :aria-label="config.screen.controls.refresh"
            :title="config.screen.controls.refresh"
            @click.stop="refreshDashboard"
          >
            <RefreshCw :size="18" />
          </button>
          <button
            class="topbar-button"
            type="button"
            :aria-label="config.screen.controls.filters"
            :title="config.screen.controls.filters"
            @click.stop="toggleFiltersPanel"
          >
            <SlidersHorizontal :size="18" />
          </button>
          <button
            class="topbar-button"
            type="button"
            :aria-label="config.screen.controls.download"
            :title="config.screen.controls.download"
            @click.stop="printDashboard"
          >
            <Download :size="18" />
          </button>
          <button
            class="topbar-button"
            type="button"
            :aria-label="config.screen.controls.fullscreen"
            :title="config.screen.controls.fullscreen"
            @click.stop="toggleFullscreen"
          >
            <Maximize2 :size="18" />
          </button>
        </div>
      </header>

      <button
        v-if="isFiltersOpen"
        class="panel-dismiss-layer"
        type="button"
        aria-label="关闭筛选项"
        @click="closePanels"
      ></button>

      <aside
        class="filter-panel"
        :class="{ open: isFiltersOpen }"
        :aria-label="config.screen.filterTitle"
        @click.stop
      >
        <header class="filter-panel-header">
          <div>
            <span>FILTER</span>
            <strong>{{ config.screen.filterTitle }}</strong>
          </div>
          <button class="filter-close" type="button" aria-label="关闭筛选项" @click="closePanels">×</button>
        </header>

        <section class="filter-panel-body">
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
        </section>

        <footer class="filter-panel-footer">
          <button type="button" @click="resetFilters">重置</button>
          <button type="button" @click="closePanels">应用</button>
        </footer>
      </aside>

      <section class="canvas-shell">
        <TemplateGalleryDashboard
          v-if="isTemplateGalleryDashboard"
          :sections="templateGallerySections"
          :row-height="contentRowHeight"
          :content-width="contentWidth"
          :active-filters="activeFilters"
          @dashboard-action="handleTemplateGalleryAction"
        />
        <section v-else class="placeholder-grid" :aria-label="`${activePageLabel} ${layoutColumnCount}乘${layoutRowCount}内容占位区`">
          <div
            v-for="block in layoutBlocks"
            :key="`${activePageId}:${block.id}`"
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
              }"
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
                  'has-aux-metrics': hasWidgetAuxMetrics(block),
                  'has-body-summary': hasWidgetBodySummary(block.label),
                }"
              >
                <section
                  v-if="hasWidgetAuxMetrics(block)"
                  class="placeholder-cell-body-section placeholder-cell-body-section-1"
                  :style="getAuxMetricSectionStyle(block)"
                  aria-label="2-1 附加信息区与 2-2 单位区"
                >
                  <span
                    v-for="metric in getWidgetAuxMetrics(block.label, getBlockColumnSpan(block))"
                    :key="metric.label"
                    class="placeholder-cell-aux-metric"
                  >
                    <span class="placeholder-cell-aux-label">{{ metric.label }}</span>
                    <strong v-if="metric.value" class="placeholder-cell-aux-value">{{ metric.value }}</strong>
                  </span>
                </section>
                <section class="placeholder-cell-body-section placeholder-cell-body-section-2" aria-label="3 组件区">
                  <WidgetRenderer
                    :context="getWidgetContext(block.label)"
                    :data="getWidgetDataForBlock(block.label)"
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
  </div>
</template>
