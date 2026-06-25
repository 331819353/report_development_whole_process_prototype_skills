<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ReportTemplateNav } from '../../report-template-assets/types';
import type { DashboardWidgetActionEvent } from '../../types/actions';
import type { DashboardFilterScope } from '../../types/data-source';
import WidgetRenderer from '../WidgetRenderer.vue';
import type { RegisteredWidgetConfig, WidgetAuxMetric, WidgetContext, WidgetTitlePillOption } from '../types';

export interface TemplateGallerySection {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  nav: ReportTemplateNav;
}

interface LayoutBlock {
  id: string;
  label: string;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

interface RenderSection extends TemplateGallerySection {
  rows: string[];
  blocks: LayoutBlock[];
  height: number;
}

const props = withDefaults(
  defineProps<{
    sections: TemplateGallerySection[];
    rowHeight: number;
    contentWidth: number;
    activeFilters?: Record<string, string>;
  }>(),
  {
    activeFilters: () => ({}),
  },
);

const emit = defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const emptyGridMarks = new Set(['.', ' ']);
const titlePillSelections = ref<Record<string, string>>({});

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

const renderSections = computed<RenderSection[]>(() =>
  props.sections
    .map((section) => {
      const rows = normalizeLayoutRows(section.nav.layoutRows);

      return {
        ...section,
        rows,
        blocks: buildLayoutBlocks(rows),
        height: rows.length * Math.max(props.rowHeight, 1),
      };
    })
    .filter((section) => section.blocks.length > 0),
);

const normalizeScope = (scope?: DashboardFilterScope) => {
  if (!scope) {
    return [];
  }

  return Array.isArray(scope) ? scope : [scope];
};

const getWidgetForBlock = (section: TemplateGallerySection, blockId: string): RegisteredWidgetConfig | undefined =>
  section.nav.widgets?.[blockId];

const hasWidgetForBlock = (section: TemplateGallerySection, blockId: string) => Boolean(getWidgetForBlock(section, blockId));

const isLayoutTemplateWidget = (widget?: RegisteredWidgetConfig) => Boolean(widget?.type.match(/^Span\d{2}x\d{2}Layout$/));

const isLayoutTemplateBlock = (section: TemplateGallerySection, blockId: string) =>
  isLayoutTemplateWidget(getWidgetForBlock(section, blockId));

const isComponentContentAreaSection = (section: TemplateGallerySection) =>
  section.title === '组件内容区模板' || section.id.includes('component-content-area-template');

const getWidgetBlockTitle = (section: TemplateGallerySection, blockId: string) => {
  const widget = getWidgetForBlock(section, blockId);

  if (!widget) {
    return '';
  }

  const propTitle = widget.props && 'title' in widget.props ? widget.props.title : '';

  for (const value of [widget.displayTitle, widget.title, propTitle, blockId]) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return blockId;
};

const getWidgetTitlePills = (section: TemplateGallerySection, blockId: string): WidgetTitlePillOption[] =>
  (getWidgetForBlock(section, blockId)?.titlePills ?? [])
    .filter((pill) => pill.id.trim() && pill.label.trim())
    .slice(0, 3);

const hasWidgetTitlePills = (section: TemplateGallerySection, blockId: string) => getWidgetTitlePills(section, blockId).length > 0;

const getWidgetBodySummary = (section: TemplateGallerySection, blockId: string) =>
  getWidgetForBlock(section, blockId)?.bodySummary?.trim() ?? '';

const hasWidgetBodySummary = (section: TemplateGallerySection, blockId: string) => Boolean(getWidgetBodySummary(section, blockId));

const getBlockColumnSpan = (block: LayoutBlock) => Math.max(block.columnEnd - block.columnStart, 1);

const isUnitAuxMetric = (metric: WidgetAuxMetric) => metric.label.trim() === '单位';

const getAuxMetricLimit = (columnSpan: number) => (columnSpan < 2 ? 0 : 2 + Math.max(columnSpan - 2, 0) * 3);

const getWidgetAuxMetrics = (section: TemplateGallerySection, blockId: string, columnSpan: number): WidgetAuxMetric[] => {
  const metrics = getWidgetForBlock(section, blockId)?.auxMetrics?.filter((metric) => metric.label.trim()) ?? [];
  const unitMetrics = metrics.filter(isUnitAuxMetric);
  const unitMetric = unitMetrics[unitMetrics.length - 1];
  const nonUnitMetrics = metrics.filter((metric) => !isUnitAuxMetric(metric)).slice(0, getAuxMetricLimit(columnSpan));

  return unitMetric ? [...nonUnitMetrics, unitMetric] : nonUnitMetrics;
};

const hasWidgetAuxMetrics = (section: TemplateGallerySection, block: LayoutBlock) =>
  getWidgetAuxMetrics(section, block.label, getBlockColumnSpan(block)).length > 0;

const getAuxMetricSectionStyle = (section: TemplateGallerySection, block: LayoutBlock): Record<string, string> => {
  const columnSpan = getBlockColumnSpan(block);
  const metrics = getWidgetAuxMetrics(section, block.label, columnSpan);
  const style: Record<string, string> = {
    '--aux-metric-count': String(metrics.length),
  };

  if (isLayoutTemplateBlock(section, block.label) && metrics.length === 2) {
    style['--aux-metric-columns'] = `minmax(0, ${Math.max(columnSpan - 1, 1)}fr) minmax(0, 1fr)`;
  }

  return style;
};

const getSelectionKey = (section: TemplateGallerySection, blockId: string) => `${section.id}:${blockId}`;

const getActiveTitlePillId = (section: TemplateGallerySection, blockId: string) => {
  const pills = getWidgetTitlePills(section, blockId);

  if (pills.length === 0) {
    return '';
  }

  const activeId = titlePillSelections.value[getSelectionKey(section, blockId)];

  if (pills.some((pill) => pill.id === activeId && !pill.disabled)) {
    return activeId;
  }

  return pills.find((pill) => !pill.disabled)?.id ?? pills[0].id;
};

const setActiveTitlePill = (section: TemplateGallerySection, blockId: string, pill: WidgetTitlePillOption) => {
  if (pill.disabled) {
    return;
  }

  titlePillSelections.value = {
    ...titlePillSelections.value,
    [getSelectionKey(section, blockId)]: pill.id,
  };
};

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getWeightedTextLength = (value: string) =>
  Array.from(value.trim()).reduce((total, char) => total + (/[\u4e00-\u9fff]/.test(char) ? 1 : 0.58), 0);

const getBlockContentWidth = (block: LayoutBlock) => {
  const columnWidth = Math.max(props.contentWidth, 1) / 12;

  return columnWidth * getBlockColumnSpan(block) - 6;
};

const getTitlePillFontSize = (section: TemplateGallerySection, block: LayoutBlock, pill: WidgetTitlePillOption) => {
  const pillCount = Math.max(getWidgetTitlePills(section, block.label).length, 1);
  const titlePadding = 12;
  const titleColumnGap = 8;
  const pillGroupPadding = 4;
  const rightColumnWidth = Math.max((getBlockContentWidth(block) - titlePadding - titleColumnGap) / 3, 1);
  const buttonWidth = Math.max((rightColumnWidth - pillGroupPadding) / pillCount, 1);
  const labelLength = Math.max(getWeightedTextLength(pill.label), 1);
  const computedSize = (buttonWidth - 4) / (labelLength * 1.04);

  return Math.round(clampNumber(computedSize, 9, 12) * 10) / 10;
};

const getSectionGridStyle = (section: RenderSection) => ({
  height: `${section.height}px`,
  gridTemplateRows: `repeat(${section.rows.length}, ${Math.max(props.rowHeight, 1)}px)`,
});

const getWidgetContext = (section: TemplateGallerySection, blockId: string, widget?: RegisteredWidgetConfig): WidgetContext => ({
  area: 'page',
  navId: section.nav.id,
  navLabel: section.nav.label,
  blockId: `${section.id}:${blockId}`,
  filters: props.activeFilters,
  allFilters: props.activeFilters,
  filterScope: normalizeScope(widget?.filterScope),
  localFilters: {},
  localFilterConfigs: widget?.localFilters ?? [],
  getLocalFilterOptions: () => [],
  setLocalFilter: () => undefined,
  clearLocalFilters: () => undefined,
});

const handleWidgetAction = (section: TemplateGallerySection, blockId: string, event: DashboardWidgetActionEvent) => {
  emit('dashboard-action', {
    name: event.name,
    payload: {
      ...(event.payload ?? {}),
      sourceNavId: section.nav.id,
      sourceNavLabel: section.nav.label,
      sourceBlockId: blockId,
    },
  });
};
</script>

<template>
  <section class="template-gallery-dashboard" aria-label="报表模板资产总览">
    <section v-for="section in renderSections" :key="section.id" class="template-gallery-section">
      <header class="template-gallery-section-header">
        <div>
          <span v-if="section.badge">{{ section.badge }}</span>
          <strong>{{ section.title }}</strong>
        </div>
        <p v-if="section.subtitle">{{ section.subtitle }}</p>
      </header>

      <section
        class="template-gallery-grid"
        :style="getSectionGridStyle(section)"
        :aria-label="`${section.title}内容占位区`"
      >
        <div
          v-for="block in section.blocks"
          :key="`${section.id}-${block.id}`"
          class="placeholder-cell"
          :style="{
            gridColumn: `${block.columnStart} / ${block.columnEnd}`,
            gridRow: `${block.rowStart} / ${block.rowEnd}`,
          }"
          :aria-label="`${section.title}-${block.label}`"
        >
          <div
            class="placeholder-cell-inner"
            :class="{
              'is-layout-template-block': isLayoutTemplateBlock(section, block.label),
              'is-component-content-area-template': isComponentContentAreaSection(section),
            }"
          >
            <div
              v-if="!isComponentContentAreaSection(section)"
              class="placeholder-cell-top placeholder-cell-title"
              :class="{ 'has-title-pills': hasWidgetTitlePills(section, block.label) }"
            >
              <span v-if="hasWidgetForBlock(section, block.label)" class="placeholder-cell-title-main">
                <span class="placeholder-cell-title-text">{{ getWidgetBlockTitle(section, block.label) }}</span>
                <span class="placeholder-cell-title-meteor" aria-hidden="true"></span>
              </span>
              <div
                v-if="hasWidgetTitlePills(section, block.label)"
                class="placeholder-cell-pill-group"
                role="group"
                :aria-label="`${getWidgetBlockTitle(section, block.label)}切换`"
              >
                <button
                  v-for="pill in getWidgetTitlePills(section, block.label)"
                  :key="pill.id"
                  type="button"
                  class="placeholder-cell-pill-button"
                  :class="{ active: getActiveTitlePillId(section, block.label) === pill.id }"
                  :style="{ '--pill-font-size': `${getTitlePillFontSize(section, block, pill)}px` }"
                  :disabled="pill.disabled"
                  :aria-pressed="getActiveTitlePillId(section, block.label) === pill.id"
                  @click="setActiveTitlePill(section, block.label, pill)"
                >
                  {{ pill.label }}
                </button>
              </div>
            </div>

            <div
              class="placeholder-cell-body"
              :class="{
                'is-component-content-area-body': isComponentContentAreaSection(section),
                'has-aux-metrics': hasWidgetAuxMetrics(section, block),
                'has-body-summary': hasWidgetBodySummary(section, block.label),
              }"
            >
              <section
                v-if="hasWidgetAuxMetrics(section, block)"
                class="placeholder-cell-body-section placeholder-cell-body-section-1"
                :style="getAuxMetricSectionStyle(section, block)"
                aria-label="2-1 附加信息区与 2-2 单位区"
              >
                <span
                  v-for="metric in getWidgetAuxMetrics(section, block.label, getBlockColumnSpan(block))"
                  :key="metric.label"
                  class="placeholder-cell-aux-metric"
                >
                  <span class="placeholder-cell-aux-label">{{ metric.label }}</span>
                  <strong v-if="metric.value" class="placeholder-cell-aux-value">{{ metric.value }}</strong>
                </span>
              </section>

              <section class="placeholder-cell-body-section placeholder-cell-body-section-2" aria-label="3 组件区">
                <WidgetRenderer
                  :context="getWidgetContext(section, block.label, getWidgetForBlock(section, block.label))"
                  :data="[]"
                  :widget="getWidgetForBlock(section, block.label)"
                  @dashboard-action="handleWidgetAction(section, block.label, $event)"
                />
              </section>

              <section
                v-if="hasWidgetBodySummary(section, block.label)"
                class="placeholder-cell-body-section placeholder-cell-body-section-3"
                aria-label="4 说明区"
              >
                <p class="placeholder-cell-summary-text">
                  {{ getWidgetBodySummary(section, block.label) }}
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<style scoped>
.template-gallery-dashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0 3px 12px;
  background:
    radial-gradient(circle at 82% 8%, rgba(0, 74, 198, 0.08), transparent 28%),
    linear-gradient(180deg, rgba(247, 250, 255, 0.82), rgba(238, 244, 251, 0.54));
}

.template-gallery-section {
  flex: 0 0 auto;
  min-width: 0;
}

.template-gallery-section + .template-gallery-section {
  margin-top: 12px;
}

.template-gallery-section-header {
  position: sticky;
  top: 0;
  z-index: 18;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  height: 42px;
  gap: 16px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(0, 74, 198, 0.12);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.92), rgba(240, 246, 253, 0.78)),
    rgba(247, 250, 255, 0.82);
  backdrop-filter: blur(16px) saturate(160%);
}

.template-gallery-section-header div {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  gap: 8px;
}

.template-gallery-section-header span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 9px;
  border: 1px solid rgba(0, 74, 198, 0.16);
  border-radius: 999px;
  color: var(--primary);
  background: rgba(0, 74, 198, 0.08);
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

.template-gallery-section-header strong {
  min-width: 0;
  overflow: hidden;
  color: var(--text-strong);
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.template-gallery-section-header p {
  max-width: 58%;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.template-gallery-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  width: 100%;
  min-width: 0;
}

.placeholder-cell-inner.is-component-content-area-template {
  grid-template-rows: minmax(0, 1fr);
  border: 0;
  background: transparent;
  box-shadow: none;
}

.placeholder-cell-inner.is-component-content-area-template .placeholder-cell-body {
  grid-template-rows: minmax(0, 1fr);
}

.placeholder-cell-inner.is-component-content-area-template .placeholder-cell-body-section-1,
.placeholder-cell-inner.is-component-content-area-template .placeholder-cell-body-section-3 {
  display: none;
}

.placeholder-cell-inner.is-component-content-area-template .placeholder-cell-body-section-2 {
  padding: 0;
}
</style>
