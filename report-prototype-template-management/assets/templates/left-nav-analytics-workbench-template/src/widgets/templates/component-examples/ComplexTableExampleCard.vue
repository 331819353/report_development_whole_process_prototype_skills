<script setup lang="ts">
import { computed } from 'vue';
import S2ReportTableWidget from '../../components/S2ReportTableWidget.vue';
import type { WidgetContext } from '../../types';

type ComplexTableExampleAlign = 'left' | 'center' | 'right';
type ComplexTableExampleFormatter = 'text' | 'number' | 'currency' | 'percent' | 'duration' | 'status';

interface ComplexTableExampleColumn {
  key: string;
  label: string;
  field?: string;
  children?: ComplexTableExampleColumn[];
  width?: number;
  minWidth?: number;
  align?: ComplexTableExampleAlign;
  fixed?: 'left' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  unit?: string;
  definition?: string;
  formula?: string;
  formatter?: ComplexTableExampleFormatter;
  priority?: number;
  ellipsis?: boolean;
  locked?: boolean;
}

interface ComplexTableExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface ComplexTableExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface ComplexTableExampleLayoutConfig {
  paddingPx?: number;
  gapPx?: number;
  titleHeightPx?: number;
  auxHeightPx?: number;
}

interface ComplexTableExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface ComplexTableExampleTableConfig {
  pageSize?: number;
  rowHeightPx?: number;
  headerHeightPx?: number;
  rowHeaderWidthPx?: number;
  measureColumnWidthPx?: number;
}

interface ComplexTableExampleToneConfig {
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  text?: string;
  unit?: string;
}

interface ComplexTableExampleCardConfig {
  title?: ComplexTableExampleTitleConfig;
  layout?: ComplexTableExampleLayoutConfig;
  aux?: ComplexTableExampleAuxConfig;
  table?: ComplexTableExampleTableConfig;
  tones?: ComplexTableExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  rowKey?: string;
  rows?: Record<string, unknown>[];
  columnTree?: ComplexTableExampleColumn[];
  auxMetrics?: ComplexTableExampleAuxMetric[];
  config?: ComplexTableExampleCardConfig;
}

const props = defineProps<Props>();

const text = {
  title: '复杂表卡片',
  unit: '单位：万元',
  totalRows: '行数',
  revenue: '收入',
  warning: '预警',
  regions: '大区',
};

const defaultRows: Record<string, unknown>[] = [
  { recordId: 'R-2401', region: '华东', channel: '线上直营', revenue: 326.8, revenueYoY: 12.6, grossMargin: 28.4, orderCount: 18420, fulfillmentRate: 97.8, avgDelivery: 1.8, complaintRate: 0.26, stockRisk: '低', overdueAmount: 18.6, status: '健康', owner: '王晶', nextAction: '保持补货节奏' },
  { recordId: 'R-2402', region: '华东', channel: '经销商', revenue: 218.4, revenueYoY: 8.1, grossMargin: 24.7, orderCount: 12680, fulfillmentRate: 94.6, avgDelivery: 2.4, complaintRate: 0.48, stockRisk: '中', overdueAmount: 42.3, status: '关注', owner: '刘敏', nextAction: '复核账期额度' },
  { recordId: 'R-2403', region: '华南', channel: '门店', revenue: 176.2, revenueYoY: -3.5, grossMargin: 21.9, orderCount: 9360, fulfillmentRate: 91.2, avgDelivery: 2.9, complaintRate: 0.66, stockRisk: '高', overdueAmount: 68.7, status: '预警', owner: '陈卓', nextAction: '启动库存清理' },
  { recordId: 'R-2404', region: '华南', channel: '线上直营', revenue: 298.1, revenueYoY: 15.4, grossMargin: 29.6, orderCount: 16240, fulfillmentRate: 98.4, avgDelivery: 1.6, complaintRate: 0.21, stockRisk: '低', overdueAmount: 12.4, status: '健康', owner: '周琳', nextAction: '扩大投放样本' },
  { recordId: 'R-2405', region: '华北', channel: '经销商', revenue: 154.7, revenueYoY: 5.2, grossMargin: 22.8, orderCount: 8120, fulfillmentRate: 93.1, avgDelivery: 2.7, complaintRate: 0.53, stockRisk: '中', overdueAmount: 51.9, status: '关注', owner: '赵岩', nextAction: '压降慢动销' },
  { recordId: 'R-2406', region: '华北', channel: '门店', revenue: 132.5, revenueYoY: -6.8, grossMargin: 19.6, orderCount: 7040, fulfillmentRate: 89.7, avgDelivery: 3.2, complaintRate: 0.82, stockRisk: '高', overdueAmount: 73.5, status: '预警', owner: '孙悦', nextAction: '补齐服务工单' },
];

const defaultColumnTree: ComplexTableExampleColumn[] = [
  { key: 'region', label: '大区', field: 'region', width: 70, fixed: 'left', align: 'center', filterable: true, definition: '一级区域维度', formatter: 'text', locked: true },
  { key: 'channel', label: '渠道', field: 'channel', width: 96, fixed: 'left', align: 'left', filterable: true, definition: '经营渠道或门店类型', formatter: 'text', locked: true },
  {
    key: 'performance',
    label: '经营表现',
    children: [
      { key: 'revenue', label: '收入', field: 'revenue', width: 86, align: 'right', sortable: true, unit: '万元', definition: '本期确认收入', formula: 'SUM(revenue)', formatter: 'currency' },
      { key: 'revenueYoY', label: '同比', field: 'revenueYoY', width: 72, align: 'right', sortable: true, unit: '%', definition: '较去年同期收入增幅', formula: '(本期-同期)/同期', formatter: 'percent' },
      { key: 'grossMargin', label: '毛利率', field: 'grossMargin', width: 78, align: 'right', sortable: true, unit: '%', definition: '毛利额/收入', formula: 'grossProfit / revenue', formatter: 'percent' },
    ],
  },
  {
    key: 'quality',
    label: '履约质量',
    children: [
      { key: 'fulfillmentRate', label: '履约率', field: 'fulfillmentRate', width: 78, align: 'right', sortable: true, unit: '%', definition: '按时履约订单占比', formula: 'onTimeOrders / totalOrders', formatter: 'percent' },
      { key: 'avgDelivery', label: '交付时长', field: 'avgDelivery', width: 86, align: 'right', sortable: true, unit: '天', definition: '平均交付时长', formatter: 'duration' },
      { key: 'complaintRate', label: '投诉率', field: 'complaintRate', width: 78, align: 'right', sortable: true, unit: '%', definition: '投诉工单/订单', formula: 'complaints / totalOrders', formatter: 'percent' },
    ],
  },
  {
    key: 'risk',
    label: '风险预警',
    children: [
      { key: 'stockRisk', label: '库存风险', field: 'stockRisk', width: 82, align: 'center', filterable: true, definition: '慢动销与缺货综合等级', formatter: 'text' },
      { key: 'overdueAmount', label: '逾期金额', field: 'overdueAmount', width: 90, align: 'right', sortable: true, unit: '万元', definition: '超过账期未回款金额', formatter: 'currency' },
      { key: 'status', label: '状态', field: 'status', width: 76, align: 'center', filterable: true, definition: '健康、关注、预警三类状态', formatter: 'status' },
    ],
  },
  {
    key: 'action',
    label: '动作建议',
    children: [
      { key: 'owner', label: '负责人', field: 'owner', width: 76, align: 'center', definition: '当前跟进责任人', formatter: 'text' },
      { key: 'nextAction', label: '下一步', field: 'nextAction', minWidth: 120, align: 'left', definition: '建议动作', formatter: 'text', ellipsis: true },
    ],
  },
];

const defaultTitleConfig: Required<ComplexTableExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<ComplexTableExampleLayoutConfig> = {
  paddingPx: 5,
  gapPx: 2,
  titleHeightPx: 20,
  auxHeightPx: 34,
};

const defaultAuxConfig: Required<ComplexTableExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
  labelFontSizePx: 9,
  valueFontSizePx: 12,
  labelColor: '#6b7c93',
  valueColor: '#0057d9',
};

const defaultTableConfig: Required<ComplexTableExampleTableConfig> = {
  pageSize: 5,
  rowHeightPx: 24,
  headerHeightPx: 24,
  rowHeaderWidthPx: 82,
  measureColumnWidthPx: 88,
};

const defaultToneConfig: Required<ComplexTableExampleToneConfig> = {
  primary: '#0057d9',
  success: '#00a870',
  warning: '#f59e0b',
  danger: '#d93025',
  text: '#15304f',
  unit: '#667085',
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

const clampNumber = (value: unknown, min: number, max: number, fallback: number) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? Math.min(Math.max(numberValue, min), max) : fallback;
};

const collectLeafColumns = (columns: ComplexTableExampleColumn[]): ComplexTableExampleColumn[] =>
  columns.flatMap((column) => column.children?.length ? collectLeafColumns(column.children) : [column]);

const getMaxDepth = (columns: ComplexTableExampleColumn[], depth = 1): number =>
  columns.reduce((maxDepth, column) => Math.max(maxDepth, column.children?.length ? getMaxDepth(column.children, depth + 1) : depth), depth);

const title = computed(() => props.title?.trim() || text.title);
const unit = computed(() => props.unit?.trim() || text.unit);
const rowKey = computed(() => props.rowKey?.trim() || 'recordId');

const resolvedTitle = computed<Required<ComplexTableExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<ComplexTableExampleLayoutConfig>>(() => ({
  ...defaultLayoutConfig,
  ...(props.config?.layout ?? {}),
  paddingPx: clampNumber(props.config?.layout?.paddingPx, 0, 24, defaultLayoutConfig.paddingPx),
  gapPx: clampNumber(props.config?.layout?.gapPx, 0, 16, defaultLayoutConfig.gapPx),
  titleHeightPx: clampNumber(props.config?.layout?.titleHeightPx, 16, 40, defaultLayoutConfig.titleHeightPx),
  auxHeightPx: clampNumber(props.config?.layout?.auxHeightPx, 0, 56, defaultLayoutConfig.auxHeightPx),
}));

const resolvedAux = computed<Required<ComplexTableExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 6, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedTable = computed<Required<ComplexTableExampleTableConfig>>(() => ({
  ...defaultTableConfig,
  ...(props.config?.table ?? {}),
  pageSize: Math.round(clampNumber(props.config?.table?.pageSize, 3, 12, defaultTableConfig.pageSize)),
  rowHeightPx: Math.round(clampNumber(props.config?.table?.rowHeightPx, 22, 30, defaultTableConfig.rowHeightPx)),
  headerHeightPx: Math.round(clampNumber(props.config?.table?.headerHeightPx, 22, 30, defaultTableConfig.headerHeightPx)),
  rowHeaderWidthPx: Math.round(clampNumber(props.config?.table?.rowHeaderWidthPx, 64, 140, defaultTableConfig.rowHeaderWidthPx)),
  measureColumnWidthPx: Math.round(clampNumber(props.config?.table?.measureColumnWidthPx, 72, 140, defaultTableConfig.measureColumnWidthPx)),
}));

const resolvedTones = computed<Required<ComplexTableExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const sourceRows = computed<Record<string, unknown>[]>(() => {
  if (props.rows?.length) {
    return props.rows;
  }

  const dataRows = (props.data ?? []).filter(isRecord);
  return dataRows.length ? dataRows : defaultRows;
});

const columnTree = computed<ComplexTableExampleColumn[]>(() =>
  props.columnTree?.length ? props.columnTree : defaultColumnTree,
);

const leafColumns = computed(() => collectLeafColumns(columnTree.value));

const numberFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });
const integerFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 });

const totalRevenue = computed(() =>
  sourceRows.value.reduce((sum, row) => {
    const numeric = Number(row.revenue ?? 0);
    return Number.isFinite(numeric) ? sum + numeric : sum;
  }, 0),
);

const warningCount = computed(() =>
  sourceRows.value.filter((row) => ['预警', '高'].includes(String(row.status ?? '')) || String(row.stockRisk ?? '') === '高').length,
);

const regionCount = computed(() =>
  new Set(sourceRows.value.map((row) => String(row.region ?? '')).filter(Boolean)).size,
);

const defaultAuxMetrics = computed<ComplexTableExampleAuxMetric[]>(() => [
  { label: text.totalRows, value: sourceRows.value.length, tone: 'neutral' },
  { label: text.revenue, value: `${numberFormatter.format(totalRevenue.value)}万`, tone: 'primary' },
  { label: text.warning, value: integerFormatter.format(warningCount.value), tone: warningCount.value > 0 ? 'warning' : 'success' },
  { label: text.regions, value: regionCount.value, tone: 'success' },
]);

const visibleAuxMetrics = computed(() => {
  if (!resolvedAux.value.visible) {
    return [];
  }

  const metrics = props.auxMetrics?.length ? props.auxMetrics : defaultAuxMetrics.value;
  return metrics
    .filter((metric) => metric.label.trim() || String(metric.value).trim())
    .slice(0, resolvedAux.value.maxItems);
});

const displayBudget = computed(() => ({
  visibleRowCount: resolvedTable.value.pageSize,
  rowHeightPx: resolvedTable.value.rowHeightPx,
  headerRowH: resolvedTable.value.headerHeightPx,
  rowHeaderW: resolvedTable.value.rowHeaderWidthPx,
  measureColumnW: resolvedTable.value.measureColumnWidthPx,
}));

const complexTableContract = computed(() => ({
  rowKey: rowKey.value,
  primaryKey: rowKey.value,
  rowGrain: 'region + channel',
  columnTree: 'nested grouped columns rendered by AntV S2 TableSheet',
  leafColumns: leafColumns.value.map((column) => column.field ?? column.key),
  spanRules: {
    maxDepth: getMaxDepth(columnTree.value),
    leafColumnCount: leafColumns.value.length,
    colSpan: 'parent colSpan = child leafColumnCount',
    rowSpan: 'leaf rowSpan fills maxDepth',
  },
  frozenColumns: leafColumns.value.filter((column) => column.locked || column.fixed === 'left').map((column) => column.label),
  states: ['loading', 'empty', 'error', 'noPermission'],
}));

const cardClasses = computed(() => ({
  'has-title': resolvedTitle.value.visible,
  'has-title-underline': resolvedTitle.value.underline,
  'has-aux': visibleAuxMetrics.value.length > 0,
}));

const cardStyle = computed(() => {
  const layout = resolvedLayout.value;
  const titleConfig = resolvedTitle.value;
  const auxConfig = resolvedAux.value;
  const tones = resolvedTones.value;

  return {
    '--complex-table-card-padding': `${layout.paddingPx}px`,
    '--complex-table-card-gap': `${layout.gapPx}px`,
    '--complex-table-title-row': `${layout.titleHeightPx}px`,
    '--complex-table-aux-row': `${visibleAuxMetrics.value.length ? layout.auxHeightPx : 0}px`,
    '--complex-table-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--complex-table-title-font-size': `${titleConfig.fontSizePx}px`,
    '--complex-table-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--complex-table-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--complex-table-title-color': titleConfig.color || tones.text,
    '--complex-table-unit-color': titleConfig.unitColor || tones.unit,
    '--complex-table-primary': tones.primary,
    '--complex-table-primary-soft': 'rgba(0, 87, 217, 0.2)',
    '--complex-table-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--complex-table-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--complex-table-aux-label-color': auxConfig.labelColor,
    '--complex-table-aux-value-color': auxConfig.valueColor,
  };
});
</script>

<template>
  <section
    class="complex-table-example-card"
    :class="cardClasses"
    :style="cardStyle"
    aria-label="Complex table card"
  >
    <header v-if="resolvedTitle.visible" class="complex-table-example-header">
      <div class="complex-table-example-title-wrap">
        <span class="complex-table-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="complex-table-example-unit">{{ unit }}</span>
    </header>

    <div v-if="visibleAuxMetrics.length" class="complex-table-example-aux" aria-label="Complex table metrics">
      <span
        v-for="metric in visibleAuxMetrics"
        :key="`${metric.label}:${metric.value}`"
        class="complex-table-example-aux-item"
        :class="`tone-${metric.tone ?? 'neutral'}`"
      >
        <em>{{ metric.label }}</em>
        <b>{{ metric.value }}</b>
      </span>
    </div>

    <div class="complex-table-example-body">
      <S2ReportTableWidget
        class="complex-table-example-widget"
        :context="context"
        variant="complex"
        :rows="sourceRows"
        :column-tree="columnTree"
        :row-key="rowKey"
        :display-budget="displayBudget"
        :complex-table-contract="complexTableContract"
        empty-text="暂无复杂表数据"
      />
    </div>
  </section>
</template>

<style scoped>
.complex-table-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  container-type: size;
  display: grid;
  grid-template-rows:
    var(--complex-table-title-row)
    var(--complex-table-aux-row)
    minmax(0, 1fr);
  row-gap: var(--complex-table-card-gap);
  padding: var(--complex-table-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--complex-table-title-color);
}

.complex-table-example-card:not(.has-title) {
  grid-template-rows: var(--complex-table-aux-row) minmax(0, 1fr);
}

.complex-table-example-card:not(.has-aux) {
  grid-template-rows: var(--complex-table-title-row) minmax(0, 1fr);
}

.complex-table-example-card:not(.has-title):not(.has-aux) {
  grid-template-rows: minmax(0, 1fr);
}

.complex-table-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.complex-table-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.complex-table-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--complex-table-title-color);
  font-size: var(--complex-table-title-font-size);
  line-height: var(--complex-table-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.complex-table-example-card.has-title-underline .complex-table-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--complex-table-primary) 0%,
    var(--complex-table-primary-soft) 72%,
    transparent 100%
  );
}

.complex-table-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--complex-table-unit-color);
  font-size: var(--complex-table-unit-font-size);
  line-height: var(--complex-table-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.complex-table-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(var(--complex-table-aux-count), minmax(0, 1fr));
  align-items: center;
  column-gap: 4px;
  overflow: hidden;
}

.complex-table-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
  overflow: hidden;
}

.complex-table-example-aux-item em,
.complex-table-example-aux-item b {
  min-width: 0;
  max-width: 100%;
  font-style: normal;
  line-height: 1.08;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.complex-table-example-aux-item em {
  color: var(--complex-table-aux-label-color);
  font-size: var(--complex-table-aux-label-font-size);
  font-weight: 600;
}

.complex-table-example-aux-item b {
  color: var(--complex-table-aux-value-color);
  font-size: var(--complex-table-aux-value-font-size);
  font-weight: 800;
}

.complex-table-example-aux-item.tone-neutral b {
  color: #52677a;
}

.complex-table-example-aux-item.tone-success b {
  color: #12a867;
}

.complex-table-example-aux-item.tone-warning b {
  color: #e58a00;
}

.complex-table-example-aux-item.tone-danger b {
  color: #d93025;
}

.complex-table-example-body {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(0, 87, 217, 0.12);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.26);
}

.complex-table-example-widget {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

:deep(.s2-report-table-widget) {
  grid-template-rows: 22px minmax(0, 1fr) 20px;
  gap: 3px;
}

:deep(.s2-report-toolbar),
:deep(.s2-report-footer) {
  padding-right: 2px;
  padding-left: 2px;
  box-sizing: border-box;
  font-size: 10px;
}

:deep(.s2-report-search) {
  height: 20px;
}

:deep(.s2-report-tool-button),
:deep(.s2-report-pager button) {
  height: 20px;
  padding-right: 6px;
  padding-left: 6px;
}

:deep(.s2-report-sheet-shell) {
  border-radius: 2px;
  border-color: rgba(0, 87, 217, 0.1);
}

@container (max-width: 260px) {
  :deep(.s2-report-toolbar) {
    gap: 4px;
  }

  :deep(.s2-report-search) {
    width: min(132px, 72%);
    grid-template-columns: 0 minmax(56px, 1fr);
    padding-right: 6px;
    padding-left: 6px;
  }

  :deep(.s2-report-search span) {
    overflow: hidden;
  }

  :deep(.s2-report-tool-button) {
    width: 24px;
    padding: 0;
    overflow: hidden;
    color: transparent;
  }

  :deep(.s2-report-footer-text) {
    max-width: 72px;
  }

  :deep(.s2-report-pager button) {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
