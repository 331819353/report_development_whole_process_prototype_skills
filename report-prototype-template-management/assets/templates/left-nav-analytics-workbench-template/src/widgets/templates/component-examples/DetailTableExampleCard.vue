<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from '@lucide/vue';
import {
  CellType,
  TableSheet,
  type CustomTreeNode,
  type RawData,
  type S2DataConfig,
  type S2Options,
  type S2Theme,
} from '@antv/s2';
import '@antv/s2/dist/s2.min.css';
import type { WidgetContext } from '../../types';

type DetailTableExampleAlign = 'left' | 'center' | 'right';
type DetailTableExampleFormatter = 'text' | 'number' | 'currency' | 'percent' | 'status' | 'date';

interface DetailTableExampleColumn {
  key: string;
  label: string;
  field?: string;
  width?: number;
  align?: DetailTableExampleAlign;
  formatter?: DetailTableExampleFormatter;
  unit?: string;
  priority?: number;
  fixed?: 'left' | 'right';
  definition?: string;
}

interface DetailTableExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface DetailTableExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface DetailTableExampleLayoutConfig {
  paddingPx?: number;
  gapPx?: number;
  titleHeightPx?: number;
  auxHeightPx?: number;
  toolbarHeightPx?: number;
  footerHeightPx?: number;
  minSheetHeightPx?: number;
}

interface DetailTableExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface DetailTableExampleTableConfig {
  frozenColCount?: number;
  pageSize?: number;
  rowHeightPx?: number;
  headerHeightPx?: number;
  compactMinWidthPx?: number;
  compactExtraWidthPx?: number;
  minColumnWidthPx?: number;
  maxVisibleColumns?: number;
}

interface DetailTableExampleToneConfig {
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  axis?: string;
  text?: string;
  unit?: string;
}

interface DetailTableExampleCardConfig {
  title?: DetailTableExampleTitleConfig;
  layout?: DetailTableExampleLayoutConfig;
  aux?: DetailTableExampleAuxConfig;
  table?: DetailTableExampleTableConfig;
  tones?: DetailTableExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  rowKey?: string;
  rows?: Record<string, unknown>[];
  columns?: DetailTableExampleColumn[];
  auxMetrics?: DetailTableExampleAuxMetric[];
  config?: DetailTableExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const sheetRef = ref<HTMLDivElement | null>(null);
const rootSize = ref({ width: 0, height: 0 });
const sheetSize = ref({ width: 0, height: 0 });
const s2Instance = shallowRef<TableSheet | null>(null);
const renderError = ref('');
const searchKeyword = ref('');
const selectedStatuses = ref<string[]>([]);
const currentPage = ref(1);
const jumpPageInput = ref('1');
let resizeObserver: ResizeObserver | null = null;
let renderTimer: number | null = null;

const text = {
  title: '\u660e\u7ec6\u8868\u5361\u7247',
  unit: '\u5355\u4f4d\uff1a\u4e07\u5143',
  totalRows: '\u884c\u6570',
  amount: '\u91d1\u989d',
  warning: '\u9884\u8b66',
  owner: '\u8d23\u4efb\u4eba',
  search: '\u641c\u7d22',
  searchPlaceholder: '\u8f93\u5165\u5173\u952e\u5b57',
  filter: '\u7b5b\u9009',
  allStatus: '\u5168\u90e8\u72b6\u6001',
  noData: '\u6682\u65e0\u660e\u7ec6\u6570\u636e',
  noMatch: '\u6682\u65e0\u5339\u914d\u6570\u636e',
  renderFailed: '\u8868\u683c\u6e32\u67d3\u5931\u8d25',
  prevPage: '\u4e0a\u4e00\u9875',
  nextPage: '\u4e0b\u4e00\u9875',
  jump: '\u8df3\u8f6c',
};

const defaultRows: Record<string, unknown>[] = [
  { orderId: 'SO-240601', customer: '\u534e\u4e1c\u76f4\u8425\u5ba2\u6237', region: '\u534e\u4e1c', channel: '\u7ebf\u4e0a', category: '\u51b0\u7bb1', amount: 128.6, margin: 27.8, status: '\u5df2\u5b8c\u6210', owner: '\u738b\u6676' },
  { orderId: 'SO-240602', customer: '\u534e\u5357\u95e8\u5e97\u5ba2\u6237', region: '\u534e\u5357', channel: '\u95e8\u5e97', category: '\u6d17\u8863\u673a', amount: 96.4, margin: 23.1, status: '\u8fdb\u884c\u4e2d', owner: '\u5468\u7433' },
  { orderId: 'SO-240603', customer: '\u5317\u533a\u7ecf\u9500\u5546 A', region: '\u534e\u5317', channel: '\u7ecf\u9500', category: '\u7a7a\u8c03', amount: 74.2, margin: 19.5, status: '\u5173\u6ce8', owner: '\u8d75\u5ca9' },
  { orderId: 'SO-240604', customer: '\u6d77\u5916\u76f4\u8425\u7f51\u70b9', region: '\u6d77\u5916', channel: '\u7ebf\u4e0a', category: '\u53a8\u7535', amount: 83.8, margin: 25.4, status: '\u8fdb\u884c\u4e2d', owner: '\u4f55\u5609' },
  { orderId: 'SO-240605', customer: '\u534e\u4e1c\u7ecf\u9500\u5546 B', region: '\u534e\u4e1c', channel: '\u7ecf\u9500', category: '\u70ed\u6c34\u5668', amount: 66.9, margin: 20.2, status: '\u9884\u8b66', owner: '\u5218\u654f' },
  { orderId: 'SO-240606', customer: '\u534e\u5317\u533a\u57df\u95e8\u5e97', region: '\u534e\u5317', channel: '\u95e8\u5e97', category: '\u51b0\u7bb1', amount: 58.1, margin: 18.7, status: '\u9884\u8b66', owner: '\u5b59\u60a6' },
  { orderId: 'SO-240607', customer: '\u6d77\u5916\u7ecf\u9500\u5546 C', region: '\u6d77\u5916', channel: '\u7ecf\u9500', category: '\u7a7a\u8c03', amount: 102.5, margin: 22.6, status: '\u5df2\u5b8c\u6210', owner: '\u6797\u53ef' },
  { orderId: 'SO-240608', customer: '\u534e\u5357\u76f4\u8425\u7f51\u70b9', region: '\u534e\u5357', channel: '\u7ebf\u4e0a', category: '\u6d17\u8863\u673a', amount: 118.9, margin: 28.6, status: '\u5df2\u5b8c\u6210', owner: '\u9648\u5353' },
];

const defaultColumns: DetailTableExampleColumn[] = [
  { key: 'orderId', label: '\u5355\u53f7', width: 88, align: 'center', fixed: 'left', formatter: 'text', priority: 1 },
  { key: 'customer', label: '\u5ba2\u6237', width: 118, align: 'left', fixed: 'left', formatter: 'text', priority: 1 },
  { key: 'region', label: '\u5927\u533a', width: 64, align: 'center', formatter: 'text', priority: 2 },
  { key: 'channel', label: '\u6e20\u9053', width: 68, align: 'center', formatter: 'text', priority: 2 },
  { key: 'category', label: '\u54c1\u7c7b', width: 72, align: 'center', formatter: 'text', priority: 3 },
  { key: 'amount', label: '\u91d1\u989d', width: 78, align: 'right', formatter: 'currency', unit: '\u4e07', priority: 1 },
  { key: 'margin', label: '\u6bdb\u5229\u7387', width: 76, align: 'right', formatter: 'percent', unit: '%', priority: 2 },
  { key: 'status', label: '\u72b6\u6001', width: 72, align: 'center', formatter: 'status', priority: 1 },
  { key: 'owner', label: '\u8d1f\u8d23\u4eba', width: 72, align: 'center', formatter: 'text', priority: 3 },
];

const defaultTitleConfig: Required<DetailTableExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<DetailTableExampleLayoutConfig> = {
  paddingPx: 5,
  gapPx: 2,
  titleHeightPx: 20,
  auxHeightPx: 34,
  toolbarHeightPx: 24,
  footerHeightPx: 22,
  minSheetHeightPx: 72,
};

const defaultAuxConfig: Required<DetailTableExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
  labelFontSizePx: 9,
  valueFontSizePx: 12,
  labelColor: '#6b7c93',
  valueColor: '#0057d9',
};

const defaultTableConfig: Required<DetailTableExampleTableConfig> = {
  frozenColCount: 1,
  pageSize: 6,
  rowHeightPx: 22,
  headerHeightPx: 24,
  compactMinWidthPx: 56,
  compactExtraWidthPx: 6,
  minColumnWidthPx: 52,
  maxVisibleColumns: 9,
};

const defaultToneConfig: Required<DetailTableExampleToneConfig> = {
  primary: '#0057d9',
  success: '#00a870',
  warning: '#f59e0b',
  danger: '#d93025',
  axis: '#7a8aa0',
  text: '#15304f',
  unit: '#667085',
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

const clampNumber = (value: unknown, min: number, max: number, fallback: number) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return Math.min(Math.max(numberValue, min), max);
};

const title = computed(() => props.title?.trim() || text.title);
const unit = computed(() => props.unit?.trim() || text.unit);
const rowKey = computed(() => props.rowKey?.trim() || 'orderId');

const resolvedTitle = computed<Required<DetailTableExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<DetailTableExampleLayoutConfig>>(() => ({
  ...defaultLayoutConfig,
  ...(props.config?.layout ?? {}),
  paddingPx: clampNumber(props.config?.layout?.paddingPx, 0, 24, defaultLayoutConfig.paddingPx),
  gapPx: clampNumber(props.config?.layout?.gapPx, 0, 16, defaultLayoutConfig.gapPx),
  titleHeightPx: clampNumber(props.config?.layout?.titleHeightPx, 16, 40, defaultLayoutConfig.titleHeightPx),
  auxHeightPx: clampNumber(props.config?.layout?.auxHeightPx, 0, 56, defaultLayoutConfig.auxHeightPx),
  toolbarHeightPx: clampNumber(props.config?.layout?.toolbarHeightPx, 18, 36, defaultLayoutConfig.toolbarHeightPx),
  footerHeightPx: clampNumber(props.config?.layout?.footerHeightPx, 18, 36, defaultLayoutConfig.footerHeightPx),
  minSheetHeightPx: clampNumber(props.config?.layout?.minSheetHeightPx, 48, 160, defaultLayoutConfig.minSheetHeightPx),
}));

const resolvedAux = computed<Required<DetailTableExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 6, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedTable = computed<Required<DetailTableExampleTableConfig>>(() => ({
  ...defaultTableConfig,
  ...(props.config?.table ?? {}),
  frozenColCount: Math.round(clampNumber(props.config?.table?.frozenColCount, 0, 3, defaultTableConfig.frozenColCount)),
  pageSize: Math.round(clampNumber(props.config?.table?.pageSize, 3, 20, defaultTableConfig.pageSize)),
  rowHeightPx: Math.round(clampNumber(props.config?.table?.rowHeightPx, 18, 34, defaultTableConfig.rowHeightPx)),
  headerHeightPx: Math.round(clampNumber(props.config?.table?.headerHeightPx, 20, 38, defaultTableConfig.headerHeightPx)),
  compactMinWidthPx: Math.round(clampNumber(props.config?.table?.compactMinWidthPx, 42, 120, defaultTableConfig.compactMinWidthPx)),
  compactExtraWidthPx: Math.round(clampNumber(props.config?.table?.compactExtraWidthPx, 0, 18, defaultTableConfig.compactExtraWidthPx)),
  minColumnWidthPx: Math.round(clampNumber(props.config?.table?.minColumnWidthPx, 42, 120, defaultTableConfig.minColumnWidthPx)),
  maxVisibleColumns: Math.round(clampNumber(props.config?.table?.maxVisibleColumns, 3, 12, defaultTableConfig.maxVisibleColumns)),
}));

const resolvedTones = computed<Required<DetailTableExampleToneConfig>>(() => ({
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

const columns = computed<DetailTableExampleColumn[]>(() =>
  (props.columns?.length ? props.columns : defaultColumns)
    .slice()
    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
    .slice(0, resolvedTable.value.maxVisibleColumns),
);

const getColumnField = (column: DetailTableExampleColumn) => column.field ?? column.key;

const numberFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });
const integerFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 });

const formatValue = (value: unknown, column?: DetailTableExampleColumn) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numeric = Number(value);

  if (column?.formatter === 'currency' && Number.isFinite(numeric)) {
    return `${numberFormatter.format(numeric)}${column.unit ?? ''}`;
  }

  if (column?.formatter === 'percent' && Number.isFinite(numeric)) {
    return `${numberFormatter.format(numeric)}%`;
  }

  if (column?.formatter === 'number' && Number.isFinite(numeric)) {
    return integerFormatter.format(numeric);
  }

  return String(value);
};

const statusOptions = computed(() =>
  Array.from(new Set(sourceRows.value.map((row) => String(row.status ?? '').trim()).filter(Boolean))),
);

const searchableFields = computed(() => columns.value.map(getColumnField));

const filteredRows = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase();
  const statuses = selectedStatuses.value;

  return sourceRows.value.filter((row) => {
    const rowStatus = String(row.status ?? '');
    const matchesStatus = statuses.length === 0 || statuses.includes(rowStatus);

    if (!matchesStatus) {
      return false;
    }

    if (!keyword) {
      return true;
    }

    return searchableFields.value.some((field) =>
      String(row[field] ?? '').toLowerCase().includes(keyword),
    );
  });
});

const pageSize = computed(() => Math.max(1, resolvedTable.value.pageSize));

const pageCount = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize.value)));

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredRows.value.slice(start, start + pageSize.value);
});

const pageStart = computed(() => (filteredRows.value.length ? (currentPage.value - 1) * pageSize.value + 1 : 0));
const pageEnd = computed(() => Math.min(currentPage.value * pageSize.value, filteredRows.value.length));

const footerLabel = computed(() =>
  `\u7b2c ${currentPage.value}/${pageCount.value} \u9875 \u00b7 ${pageStart.value}-${pageEnd.value} / ${filteredRows.value.length} \u884c`,
);

const isFilterActive = computed(() => selectedStatuses.value.length > 0);
const canGoPrev = computed(() => currentPage.value > 1);
const canGoNext = computed(() => currentPage.value < pageCount.value);

const setCurrentPage = (page: number) => {
  const nextPage = Math.min(Math.max(Math.round(page) || 1, 1), pageCount.value);
  currentPage.value = nextPage;
  jumpPageInput.value = String(nextPage);
};

const resetToFirstPage = () => {
  setCurrentPage(1);
};

const goPage = (direction: -1 | 1) => {
  setCurrentPage(currentPage.value + direction);
};

const jumpToPage = () => {
  setCurrentPage(Number(jumpPageInput.value));
};

const clearStatusFilters = () => {
  selectedStatuses.value = [];
  resetToFirstPage();
};

const totalAmount = computed(() =>
  sourceRows.value.reduce((sum, row) => {
    const numeric = Number(row.amount ?? 0);
    return Number.isFinite(numeric) ? sum + numeric : sum;
  }, 0),
);

const warningCount = computed(() =>
  sourceRows.value.filter((row) => ['\u9884\u8b66', '\u5173\u6ce8'].includes(String(row.status ?? ''))).length,
);

const ownerCount = computed(() =>
  new Set(sourceRows.value.map((row) => String(row.owner ?? '')).filter(Boolean)).size,
);

const defaultAuxMetrics = computed<DetailTableExampleAuxMetric[]>(() => [
  { label: text.totalRows, value: sourceRows.value.length, tone: 'neutral' },
  { label: text.amount, value: `${numberFormatter.format(totalAmount.value)}\u4e07`, tone: 'primary' },
  { label: text.warning, value: warningCount.value, tone: warningCount.value > 0 ? 'warning' : 'success' },
  { label: text.owner, value: ownerCount.value, tone: 'success' },
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

const hasSourceData = computed(() => sourceRows.value.length > 0 && columns.value.length > 0);
const hasRenderableData = computed(() => pagedRows.value.length > 0 && columns.value.length > 0);
const stateTitle = computed(() => (hasSourceData.value ? text.noMatch : text.noData));

const toCustomTreeNode = (column: DetailTableExampleColumn): CustomTreeNode => ({
  field: getColumnField(column),
  title: column.label,
  description: [column.definition, column.unit ? `\u5355\u4f4d\uff1a${column.unit}` : ''].filter(Boolean).join('\uff1b'),
});

const s2Meta = computed(() =>
  columns.value.map((column) => ({
    field: getColumnField(column),
    name: column.label,
    formatter: (value: unknown) => formatValue(value, column),
  })),
);

const getBaseColumnWidth = (column: DetailTableExampleColumn) =>
  Math.max(column.width ?? resolvedTable.value.compactMinWidthPx, resolvedTable.value.minColumnWidthPx);

const columnWidthMap = computed(() => {
  const tableColumns = columns.value;
  const baseWidths = tableColumns.map(getBaseColumnWidth);
  const totalBaseWidth = baseWidths.reduce((total, width) => total + width, 0);
  const targetWidth = Math.max(0, Math.floor(sheetSize.value.width) - 2);

  if (!tableColumns.length || targetWidth <= totalBaseWidth) {
    return tableColumns.reduce<Record<string, number>>((widthMap, column, index) => {
      widthMap[getColumnField(column)] = baseWidths[index];
      return widthMap;
    }, {});
  }

  let remainingWidth = targetWidth;

  return tableColumns.reduce<Record<string, number>>((widthMap, column, index) => {
    const isLast = index === tableColumns.length - 1;
    const nextWidth = isLast
      ? Math.max(baseWidths[index], remainingWidth)
      : Math.max(baseWidths[index], Math.floor(baseWidths[index] / totalBaseWidth * targetWidth));

    widthMap[getColumnField(column)] = nextWidth;
    remainingWidth -= nextWidth;
    return widthMap;
  }, {});
});

const s2DataConfig = computed<S2DataConfig>(() => ({
  data: pagedRows.value as RawData[],
  fields: {
    columns: columns.value.map(toCustomTreeNode),
  },
  meta: s2Meta.value,
}));

const s2Options = computed<S2Options>(() => ({
  width: Math.max(120, Math.floor(sheetSize.value.width)),
  height: Math.max(resolvedLayout.value.minSheetHeightPx, Math.floor(sheetSize.value.height)),
  hd: true,
  showDefaultHeaderActionIcon: false,
  tooltip: {
    enable: true,
    operation: {
      sort: true,
      tableSort: true,
      hiddenColumns: false,
    },
  },
  placeholder: {
    cell: '-',
    empty: {
      description: text.noData,
    },
  },
  frozen: {
    rowCount: 0,
    colCount: Math.min(resolvedTable.value.frozenColCount, columns.value.length),
    trailingColCount: 0,
  },
  style: {
    layoutWidthType: 'compact',
    compactMinWidth: resolvedTable.value.compactMinWidthPx,
    compactExtraWidth: resolvedTable.value.compactExtraWidthPx,
    colCell: {
      height: resolvedTable.value.headerHeightPx,
      widthByField: columnWidthMap.value,
      maxLines: 1,
      textOverflow: 'ellipsis',
    },
    dataCell: {
      height: resolvedTable.value.rowHeightPx,
      width: resolvedTable.value.compactMinWidthPx,
      maxLines: 1,
      textOverflow: 'ellipsis',
    },
  },
}));

const readThemeColor = (name: string, fallback: string) => {
  if (!rootRef.value) {
    return fallback;
  }

  return getComputedStyle(rootRef.value).getPropertyValue(name).trim() || fallback;
};

const s2Theme = computed<S2Theme>(() => ({
  background: {
    color: 'rgba(255, 255, 255, 0)',
  },
  splitLine: {
    horizontalBorderColor: readThemeColor('--detail-table-border-horizontal', 'rgba(0, 74, 198, 0.11)'),
    horizontalBorderWidth: 1,
    verticalBorderColor: readThemeColor('--detail-table-border-vertical', 'rgba(0, 74, 198, 0.08)'),
    verticalBorderWidth: 1,
    showShadow: false,
  },
  scrollBar: {
    size: 5,
    thumbColor: readThemeColor('--detail-table-scroll-thumb', 'rgba(0, 91, 216, 0.32)'),
    thumbHoverColor: readThemeColor('--detail-table-scroll-thumb-hover', 'rgba(0, 91, 216, 0.48)'),
    trackColor: readThemeColor('--detail-table-scroll-track', 'rgba(218, 234, 255, 0.48)'),
  },
  [CellType.COL_CELL]: {
    text: {
      fill: readThemeColor('--detail-table-header-text', '#113d75'),
      fontSize: 10,
      fontWeight: 800,
      textAlign: 'center',
      textBaseline: 'middle',
    },
    cell: {
      backgroundColor: readThemeColor('--detail-table-header-background', 'rgba(235, 244, 255, 0.96)'),
      horizontalBorderColor: readThemeColor('--detail-table-border-horizontal', 'rgba(0, 74, 198, 0.11)'),
      verticalBorderColor: readThemeColor('--detail-table-border-vertical', 'rgba(0, 74, 198, 0.08)'),
      padding: { top: 3, right: 5, bottom: 3, left: 5 },
    },
  },
  [CellType.DATA_CELL]: {
    text: {
      fill: readThemeColor('--detail-table-data-text', '#183552'),
      fontSize: 10,
      fontWeight: 650,
      textBaseline: 'middle',
    },
    cell: {
      backgroundColor: readThemeColor('--detail-table-data-background', 'rgba(255, 255, 255, 0.48)'),
      crossBackgroundColor: readThemeColor('--detail-table-data-cross-background', 'rgba(232, 242, 255, 0.34)'),
      horizontalBorderColor: readThemeColor('--detail-table-data-border-horizontal', 'rgba(0, 74, 198, 0.08)'),
      verticalBorderColor: readThemeColor('--detail-table-data-border-vertical', 'rgba(0, 74, 198, 0.06)'),
      padding: { top: 3, right: 5, bottom: 3, left: 5 },
      interactionState: {
        hover: { backgroundColor: readThemeColor('--detail-table-hover-background', '#e8f3ff'), backgroundOpacity: 0.82 },
        selected: { backgroundColor: readThemeColor('--detail-table-selected-background', '#d7eaff'), backgroundOpacity: 0.92 },
      },
    },
  },
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
    '--detail-table-card-padding': `${layout.paddingPx}px`,
    '--detail-table-card-gap': `${layout.gapPx}px`,
    '--detail-table-title-row': `${layout.titleHeightPx}px`,
    '--detail-table-aux-row': `${visibleAuxMetrics.value.length ? layout.auxHeightPx : 0}px`,
    '--detail-table-toolbar-row': `${layout.toolbarHeightPx}px`,
    '--detail-table-footer-row': `${layout.footerHeightPx}px`,
    '--detail-table-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--detail-table-title-font-size': `${titleConfig.fontSizePx}px`,
    '--detail-table-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--detail-table-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--detail-table-title-color': titleConfig.color || tones.text,
    '--detail-table-unit-color': titleConfig.unitColor || tones.unit,
    '--detail-table-primary': tones.primary,
    '--detail-table-primary-soft': 'rgba(0, 87, 217, 0.2)',
    '--detail-table-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--detail-table-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--detail-table-aux-label-color': auxConfig.labelColor,
    '--detail-table-aux-value-color': auxConfig.valueColor,
    '--detail-table-border-horizontal': 'rgba(0, 74, 198, 0.11)',
    '--detail-table-border-vertical': 'rgba(0, 74, 198, 0.08)',
    '--detail-table-header-text': '#113d75',
    '--detail-table-header-background': 'rgba(235, 244, 255, 0.96)',
    '--detail-table-data-text': '#183552',
    '--detail-table-data-background': 'rgba(255, 255, 255, 0.48)',
    '--detail-table-data-cross-background': 'rgba(232, 242, 255, 0.34)',
  };
});

const updateSize = () => {
  if (!rootRef.value) {
    return;
  }

  const rootRect = rootRef.value.getBoundingClientRect();
  const nextRootSize = {
    width: Math.round(rootRect.width),
    height: Math.round(rootRect.height),
  };

  if (nextRootSize.width !== rootSize.value.width || nextRootSize.height !== rootSize.value.height) {
    rootSize.value = nextRootSize;
  }

  const sheetRect = sheetRef.value?.getBoundingClientRect();
  const nextSheetSize = {
    width: Math.round(sheetRect?.width ?? 0),
    height: Math.round(sheetRect?.height ?? 0),
  };

  if (nextSheetSize.width !== sheetSize.value.width || nextSheetSize.height !== sheetSize.value.height) {
    sheetSize.value = nextSheetSize;
  }
};

const destroySheet = () => {
  s2Instance.value?.destroy();
  s2Instance.value = null;

  if (sheetRef.value) {
    sheetRef.value.innerHTML = '';
  }
};

const renderSheet = async () => {
  updateSize();

  if (!hasRenderableData.value || !sheetRef.value) {
    destroySheet();
    return;
  }

  if (sheetSize.value.width < 80 || sheetSize.value.height < 48) {
    return;
  }

  try {
    renderError.value = '';

    if (!s2Instance.value) {
      const sheet = new TableSheet(sheetRef.value, s2DataConfig.value, s2Options.value);
      sheet.setTheme(s2Theme.value);
      s2Instance.value = sheet;
      await sheet.render();
      return;
    }

    s2Instance.value.setDataCfg(s2DataConfig.value, true);
    s2Instance.value.setOptions(s2Options.value, true);
    s2Instance.value.changeSheetSize(s2Options.value.width, s2Options.value.height);
    s2Instance.value.setTheme(s2Theme.value);
    await s2Instance.value.render({
      reloadData: true,
      rebuildDataSet: true,
      rebuildHiddenColumnsDetail: true,
    });
  } catch (error) {
    renderError.value = error instanceof Error ? error.message : String(error);
  }
};

const queueRenderSheet = () => {
  if (renderTimer !== null) {
    window.clearTimeout(renderTimer);
  }

  renderTimer = window.setTimeout(async () => {
    renderTimer = null;
    await nextTick();
    await renderSheet();
  }, 0);
};

const renderSignature = computed(() => JSON.stringify({
  title: title.value,
  rows: pagedRows.value,
  columns: columns.value,
  search: searchKeyword.value,
  statuses: selectedStatuses.value,
  page: currentPage.value,
  width: sheetSize.value.width,
  height: sheetSize.value.height,
  table: resolvedTable.value,
}));

watch(searchKeyword, () => {
  resetToFirstPage();
});

watch(selectedStatuses, () => {
  resetToFirstPage();
}, { deep: true });

watch(statusOptions, (options) => {
  const allowedStatuses = new Set(options);
  const nextStatuses = selectedStatuses.value.filter((status) => allowedStatuses.has(status));

  if (nextStatuses.length !== selectedStatuses.value.length) {
    selectedStatuses.value = nextStatuses;
  }
});

watch(pageCount, () => {
  setCurrentPage(currentPage.value);
});

onMounted(() => {
  if (rootRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateSize();
      queueRenderSheet();
    });
    resizeObserver.observe(rootRef.value);
  }

  queueRenderSheet();
});

watch(renderSignature, () => {
  queueRenderSheet();
}, { flush: 'post' });

onBeforeUnmount(() => {
  if (renderTimer !== null) {
    window.clearTimeout(renderTimer);
    renderTimer = null;
  }

  resizeObserver?.disconnect();
  resizeObserver = null;
  destroySheet();
});
</script>

<template>
  <section
    ref="rootRef"
    class="detail-table-example-card"
    :class="cardClasses"
    :style="cardStyle"
    aria-label="Detail table card"
  >
    <header v-if="resolvedTitle.visible" class="detail-table-example-header">
      <div class="detail-table-example-title-wrap">
        <span class="detail-table-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="detail-table-example-unit">{{ unit }}</span>
    </header>
    <div v-if="visibleAuxMetrics.length" class="detail-table-example-aux" aria-label="Detail table metrics">
      <span
        v-for="metric in visibleAuxMetrics"
        :key="`${metric.label}:${metric.value}`"
        class="detail-table-example-aux-item"
        :class="`tone-${metric.tone ?? 'neutral'}`"
      >
        <em>{{ metric.label }}</em>
        <b>{{ metric.value }}</b>
      </span>
    </div>
    <div class="detail-table-example-toolbar" aria-label="Detail table tools">
      <label class="detail-table-example-search">
        <Search :size="12" aria-hidden="true" />
        <input
          v-model="searchKeyword"
          type="search"
          :placeholder="text.searchPlaceholder"
          :aria-label="text.search"
        />
      </label>
      <details class="detail-table-example-filter">
        <summary
          class="detail-table-example-tool-button"
          :class="{ 'is-active': isFilterActive }"
          :aria-label="text.filter"
          :title="text.filter"
        >
          <SlidersHorizontal :size="12" aria-hidden="true" />
          <span>{{ text.filter }}</span>
          <b v-if="selectedStatuses.length">{{ selectedStatuses.length }}</b>
        </summary>
        <div class="detail-table-example-filter-panel">
          <label
            v-for="status in statusOptions"
            :key="status"
            class="detail-table-example-filter-option"
          >
            <input
              v-model="selectedStatuses"
              type="checkbox"
              :value="status"
            />
            <span>{{ status }}</span>
          </label>
          <button type="button" class="detail-table-example-filter-reset" @click="clearStatusFilters">
            {{ text.allStatus }}
          </button>
        </div>
      </details>
    </div>
    <div class="detail-table-example-sheet-pane">
      <div v-if="renderError" class="detail-table-example-state">
        <strong>{{ text.renderFailed }}</strong>
        <span>{{ renderError }}</span>
      </div>
      <div v-else-if="!hasRenderableData" class="detail-table-example-state">
        <strong>{{ stateTitle }}</strong>
      </div>
      <div v-show="hasRenderableData && !renderError" ref="sheetRef" class="detail-table-example-sheet" />
    </div>
    <footer class="detail-table-example-footer">
      <span class="detail-table-example-footer-text" :title="footerLabel">{{ footerLabel }}</span>
      <span class="detail-table-example-pager" aria-label="Detail table pagination">
        <button
          type="button"
          :disabled="!canGoPrev"
          :aria-label="text.prevPage"
          :title="text.prevPage"
          @click="goPage(-1)"
        >
          <ChevronLeft :size="12" aria-hidden="true" />
          <span>{{ text.prevPage }}</span>
        </button>
        <input
          v-model="jumpPageInput"
          type="number"
          min="1"
          :max="pageCount"
          :aria-label="text.jump"
          @keyup.enter="jumpToPage"
          @change="jumpToPage"
        />
        <button
          type="button"
          :disabled="!canGoNext"
          :aria-label="text.nextPage"
          :title="text.nextPage"
          @click="goPage(1)"
        >
          <ChevronRight :size="12" aria-hidden="true" />
          <span>{{ text.nextPage }}</span>
        </button>
      </span>
    </footer>
  </section>
</template>

<style scoped>
.detail-table-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  container-type: size;
  display: grid;
  grid-template-rows:
    var(--detail-table-title-row)
    var(--detail-table-aux-row)
    var(--detail-table-toolbar-row)
    minmax(0, 1fr)
    var(--detail-table-footer-row);
  row-gap: var(--detail-table-card-gap);
  padding: var(--detail-table-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--detail-table-title-color);
}

.detail-table-example-card:not(.has-title) {
  grid-template-rows:
    var(--detail-table-aux-row)
    var(--detail-table-toolbar-row)
    minmax(0, 1fr)
    var(--detail-table-footer-row);
}

.detail-table-example-card:not(.has-aux) {
  grid-template-rows:
    var(--detail-table-title-row)
    var(--detail-table-toolbar-row)
    minmax(0, 1fr)
    var(--detail-table-footer-row);
}

.detail-table-example-card:not(.has-title):not(.has-aux) {
  grid-template-rows:
    var(--detail-table-toolbar-row)
    minmax(0, 1fr)
    var(--detail-table-footer-row);
}

.detail-table-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.detail-table-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.detail-table-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--detail-table-title-color);
  font-size: var(--detail-table-title-font-size);
  line-height: var(--detail-table-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.detail-table-example-card.has-title-underline .detail-table-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--detail-table-primary) 0%,
    var(--detail-table-primary-soft) 72%,
    transparent 100%
  );
}

.detail-table-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--detail-table-unit-color);
  font-size: var(--detail-table-unit-font-size);
  line-height: var(--detail-table-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.detail-table-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(var(--detail-table-aux-count), minmax(0, 1fr));
  align-items: center;
  column-gap: 4px;
  overflow: hidden;
}

.detail-table-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
  overflow: hidden;
}

.detail-table-example-aux-item em,
.detail-table-example-aux-item b {
  min-width: 0;
  max-width: 100%;
  font-style: normal;
  line-height: 1.08;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.detail-table-example-aux-item em {
  color: var(--detail-table-aux-label-color);
  font-size: var(--detail-table-aux-label-font-size);
  font-weight: 600;
}

.detail-table-example-aux-item b {
  color: var(--detail-table-aux-value-color);
  font-size: var(--detail-table-aux-value-font-size);
  font-weight: 800;
}

.detail-table-example-aux-item.tone-neutral b {
  color: #52677a;
}

.detail-table-example-aux-item.tone-success b {
  color: #12a867;
}

.detail-table-example-aux-item.tone-warning b {
  color: #e58a00;
}

.detail-table-example-aux-item.tone-danger b {
  color: #d93025;
}

.detail-table-example-toolbar,
.detail-table-example-footer {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-items: center;
  column-gap: 5px;
  overflow: visible;
  color: rgba(22, 50, 82, 0.78);
  font-size: 10px;
  font-weight: 760;
  line-height: 1;
}

.detail-table-example-toolbar {
  grid-template-columns: minmax(0, 1fr) auto;
  position: relative;
  z-index: 2;
}

.detail-table-example-footer {
  grid-template-columns: minmax(0, 1fr) auto;
  z-index: 1;
}

.detail-table-example-search {
  min-width: 0;
  height: 20px;
  display: grid;
  grid-template-columns: 13px minmax(0, 1fr);
  align-items: center;
  column-gap: 3px;
  padding: 0 6px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid rgba(0, 87, 217, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
  color: #1d4f91;
}

.detail-table-example-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  padding: 0;
  color: #183552;
  background: transparent;
  font: inherit;
  font-weight: 720;
}

.detail-table-example-search input::placeholder {
  color: rgba(22, 50, 82, 0.4);
}

.detail-table-example-filter {
  position: relative;
  min-width: 0;
}

.detail-table-example-filter summary {
  list-style: none;
}

.detail-table-example-filter summary::-webkit-details-marker {
  display: none;
}

.detail-table-example-tool-button,
.detail-table-example-pager button,
.detail-table-example-filter-reset {
  min-width: 0;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 3px;
  padding: 0 6px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 87, 217, 0.18);
  border-radius: 999px;
  color: #0c4ca8;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(236, 245, 255, 0.76));
  box-shadow: 0 4px 10px rgba(0, 74, 198, 0.08);
  font: inherit;
  font-weight: 860;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.detail-table-example-tool-button.is-active,
.detail-table-example-filter[open] .detail-table-example-tool-button {
  color: #ffffff;
  border-color: rgba(0, 87, 217, 0.42);
  background: linear-gradient(135deg, #005bd8, #2b87ff);
}

.detail-table-example-tool-button b {
  min-width: 13px;
  height: 13px;
  display: inline-grid;
  place-items: center;
  border-radius: 999px;
  color: #0057d9;
  background: #ffffff;
  font-size: 8px;
  font-style: normal;
  font-weight: 900;
}

.detail-table-example-filter-panel {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 6;
  display: grid;
  width: min(180px, 78cqw);
  max-height: min(150px, 72cqh);
  padding: 7px;
  gap: 5px;
  overflow: auto;
  border: 1px solid rgba(0, 87, 217, 0.16);
  border-radius: 8px;
  background: rgba(250, 253, 255, 0.98);
  box-shadow: 0 14px 28px rgba(0, 54, 130, 0.16);
}

.detail-table-example-filter-option {
  min-width: 0;
  min-height: 18px;
  display: grid;
  grid-template-columns: 13px minmax(0, 1fr);
  align-items: center;
  column-gap: 5px;
  color: #1c3d63;
  font-size: 10px;
  font-weight: 760;
}

.detail-table-example-filter-option input {
  width: 12px;
  height: 12px;
  margin: 0;
  accent-color: #005bd8;
}

.detail-table-example-filter-option span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-table-example-filter-reset {
  justify-self: start;
  height: 18px;
  padding-right: 7px;
  padding-left: 7px;
  font-size: 10px;
}

.detail-table-example-sheet-pane {
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 87, 217, 0.12);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.26);
}

.detail-table-example-sheet {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.detail-table-example-state {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  padding: 8px;
  box-sizing: border-box;
  color: #667085;
  text-align: center;
  overflow: hidden;
}

.detail-table-example-state strong,
.detail-table-example-state span {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-table-example-state strong {
  color: #15304f;
  font-size: 12px;
  font-weight: 800;
}

.detail-table-example-state span {
  font-size: 10px;
  font-weight: 600;
}

.detail-table-example-footer-text {
  min-width: 0;
  overflow: hidden;
  color: rgba(22, 50, 82, 0.7);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-table-example-pager {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.detail-table-example-pager button {
  padding-right: 5px;
  padding-left: 5px;
}

.detail-table-example-pager button:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.detail-table-example-pager input {
  width: 34px;
  height: 20px;
  min-width: 0;
  padding: 0 3px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 87, 217, 0.16);
  border-radius: 999px;
  outline: 0;
  color: #183552;
  background: rgba(255, 255, 255, 0.68);
  font: inherit;
  font-weight: 800;
  text-align: center;
}

.detail-table-example-pager input::-webkit-outer-spin-button,
.detail-table-example-pager input::-webkit-inner-spin-button {
  margin: 0;
}

:deep(.antv-s2-container),
:deep(.s2-container) {
  width: 100% !important;
  height: 100% !important;
}

@container (max-width: 260px) {
  .detail-table-example-toolbar {
    column-gap: 4px;
  }

  .detail-table-example-search {
    padding-right: 5px;
    padding-left: 5px;
  }

  .detail-table-example-tool-button {
    width: 23px;
    padding: 0;
  }

  .detail-table-example-tool-button span {
    display: none;
  }

  .detail-table-example-footer {
    grid-template-columns: minmax(0, 1fr);
  }

  .detail-table-example-footer-text {
    display: none;
  }

  .detail-table-example-pager {
    justify-content: space-between;
    width: 100%;
  }

  .detail-table-example-pager button {
    width: 22px;
    padding: 0;
  }

  .detail-table-example-pager button span {
    display: none;
  }

  .detail-table-example-pager input {
    width: 31px;
  }
}
</style>
