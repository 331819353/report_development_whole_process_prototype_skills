<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
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
import type { DashboardWidgetActionEvent } from '../../types/actions';
import type { WidgetContext } from '../types';

type S2ReportVariant = 'pivot' | 'detail' | 'complex';
type ColumnAlign = 'left' | 'center' | 'right';
type ColumnFormatter = 'text' | 'number' | 'currency' | 'percent' | 'duration' | 'status' | 'operation';

interface S2MetaConfig {
  field: string;
  name: string;
  unit?: string;
}

interface S2ReportColumn {
  key: string;
  label: string;
  field?: string;
  children?: S2ReportColumn[];
  width?: number;
  minWidth?: number;
  align?: ColumnAlign;
  fixed?: 'left' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  unit?: string;
  definition?: string;
  formula?: string;
  formatter?: ColumnFormatter;
  priority?: number;
  ellipsis?: boolean;
  locked?: boolean;
}

interface S2ReportProps {
  context: WidgetContext;
  data?: unknown[];
  variant?: S2ReportVariant;
  rows?: Record<string, unknown>[];
  tableColumns?: S2ReportColumn[];
  columnTree?: S2ReportColumn[];
  rowFields?: string[];
  columnFields?: string[];
  valueFields?: string[];
  rawData?: Record<string, unknown>[];
  meta?: S2MetaConfig[];
  rowKey?: string;
  cornerText?: string;
  emptyText?: string;
  loading?: boolean;
  errorText?: string;
  noPermission?: boolean;
  pivotContract?: Record<string, unknown>;
  detailTableContract?: Record<string, unknown>;
  complexTableContract?: Record<string, unknown>;
  displayBudget?: Record<string, unknown>;
}

const props = defineProps<S2ReportProps>();

defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const sheetRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const s2Instance = shallowRef<TableSheet | null>(null);
const rootSize = ref({ width: 0, height: 0 });
const sheetSize = ref({ width: 0, height: 0 });
const keyword = ref('');
const currentPage = ref(1);
const selectedColumnKeys = ref<string[]>([]);
const renderError = ref('');
let resizeObserver: ResizeObserver | null = null;
let renderTimer: number | null = null;
let controlSyncTimer: number | null = null;

const numberFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });
const integerFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 });

const defaultPivotData: Record<string, unknown>[] = [
  { region: '华东', channel: '线上直营', quarter: 'Q1', sales: 2180, margin: 630 },
  { region: '华东', channel: '线上直营', quarter: 'Q2', sales: 2460, margin: 718 },
  { region: '华东', channel: '经销商', quarter: 'Q1', sales: 1660, margin: 402 },
  { region: '华东', channel: '经销商', quarter: 'Q2', sales: 1820, margin: 454 },
  { region: '华南', channel: '线上直营', quarter: 'Q1', sales: 1940, margin: 566 },
  { region: '华南', channel: '线上直营', quarter: 'Q2', sales: 2320, margin: 690 },
  { region: '华南', channel: '门店', quarter: 'Q1', sales: 1490, margin: 361 },
  { region: '华南', channel: '门店', quarter: 'Q2', sales: 1710, margin: 421 },
  { region: '华北', channel: '经销商', quarter: 'Q1', sales: 1260, margin: 282 },
  { region: '华北', channel: '经销商', quarter: 'Q2', sales: 1540, margin: 348 },
  { region: '华北', channel: '门店', quarter: 'Q1', sales: 1180, margin: 251 },
  { region: '华北', channel: '门店', quarter: 'Q2', sales: 1320, margin: 295 },
  { region: '海外', channel: '线上直营', quarter: 'Q1', sales: 1740, margin: 472 },
  { region: '海外', channel: '线上直营', quarter: 'Q2', sales: 2090, margin: 601 },
  { region: '海外', channel: '经销商', quarter: 'Q1', sales: 1510, margin: 356 },
  { region: '海外', channel: '经销商', quarter: 'Q2', sales: 1840, margin: 446 },
];

const defaultPivotMeta: S2MetaConfig[] = [
  { field: 'region', name: '大区' },
  { field: 'channel', name: '渠道' },
  { field: 'quarter', name: '季度' },
  { field: 'sales', name: '销售额', unit: '万元' },
  { field: 'margin', name: '毛利额', unit: '万元' },
];

const defaultDetailRows: Record<string, unknown>[] = [
  { orderId: 'SO-240601', customerName: '海尔智家旗舰店', region: '华东', channel: '线上直营', productLine: '冰箱', amount: 128.6, grossMargin: 27.8, status: '已完成', owner: '王晶', updatedAt: '06-21', operation: '查看' },
  { orderId: 'SO-240602', customerName: '华南区域门店', region: '华南', channel: '门店', productLine: '洗衣机', amount: 96.4, grossMargin: 23.1, status: '进行中', owner: '周琳', updatedAt: '06-20', operation: '查看' },
  { orderId: 'SO-240603', customerName: '北区经销商A', region: '华北', channel: '经销商', productLine: '空调', amount: 74.2, grossMargin: 19.5, status: '关注', owner: '赵岩', updatedAt: '06-19', operation: '查看' },
  { orderId: 'SO-240604', customerName: '海外直营网点', region: '海外', channel: '线上直营', productLine: '厨电', amount: 83.8, grossMargin: 25.4, status: '进行中', owner: '何嘉', updatedAt: '06-19', operation: '查看' },
  { orderId: 'SO-240605', customerName: '华东经销商B', region: '华东', channel: '经销商', productLine: '热水器', amount: 66.9, grossMargin: 20.2, status: '预警', owner: '刘敏', updatedAt: '06-18', operation: '查看' },
  { orderId: 'SO-240606', customerName: '华北区域门店', region: '华北', channel: '门店', productLine: '冰箱', amount: 58.1, grossMargin: 18.7, status: '预警', owner: '孙悦', updatedAt: '06-18', operation: '查看' },
  { orderId: 'SO-240607', customerName: '海外经销商C', region: '海外', channel: '经销商', productLine: '空调', amount: 102.5, grossMargin: 22.6, status: '已完成', owner: '林可', updatedAt: '06-17', operation: '查看' },
  { orderId: 'SO-240608', customerName: '华南直营网点', region: '华南', channel: '线上直营', productLine: '洗衣机', amount: 118.9, grossMargin: 28.6, status: '已完成', owner: '陈卓', updatedAt: '06-17', operation: '查看' },
  { orderId: 'SO-240609', customerName: '重点KA客户', region: '华东', channel: '线上直营', productLine: '厨电', amount: 149.3, grossMargin: 30.1, status: '进行中', owner: '王晶', updatedAt: '06-16', operation: '查看' },
];

const defaultDetailColumns: S2ReportColumn[] = [
  { key: 'orderId', label: '订单号', field: 'orderId', width: 112, align: 'center', fixed: 'left', sortable: true, formatter: 'text', priority: 1, locked: true },
  { key: 'customerName', label: '客户', field: 'customerName', width: 132, align: 'left', fixed: 'left', sortable: true, formatter: 'text', priority: 1, locked: true },
  { key: 'region', label: '大区', field: 'region', width: 72, align: 'center', sortable: true, formatter: 'text', priority: 2 },
  { key: 'channel', label: '渠道', field: 'channel', width: 94, align: 'center', sortable: true, formatter: 'text', priority: 2 },
  { key: 'productLine', label: '品类', field: 'productLine', width: 78, align: 'center', sortable: true, formatter: 'text', priority: 3 },
  { key: 'amount', label: '金额', field: 'amount', width: 88, align: 'right', sortable: true, unit: '万元', formatter: 'currency', priority: 1 },
  { key: 'grossMargin', label: '毛利率', field: 'grossMargin', width: 82, align: 'right', sortable: true, unit: '%', formatter: 'percent', priority: 2 },
  { key: 'status', label: '状态', field: 'status', width: 76, align: 'center', sortable: true, formatter: 'status', priority: 1 },
  { key: 'owner', label: '负责人', field: 'owner', width: 76, align: 'center', sortable: true, formatter: 'text', priority: 3 },
  { key: 'updatedAt', label: '更新', field: 'updatedAt', width: 70, align: 'center', sortable: true, formatter: 'text', priority: 4 },
  { key: 'operation', label: '操作', field: 'operation', width: 68, align: 'center', formatter: 'operation', priority: 1 },
];

const defaultComplexRows: Record<string, unknown>[] = [
  { recordId: 'R-2401', region: '华东', channel: '线上直营', revenue: 326.8, revenueYoY: 12.6, grossMargin: 28.4, orderCount: 18420, fulfillmentRate: 97.8, avgDelivery: 1.8, complaintRate: 0.26, stockRisk: '低', overdueAmount: 18.6, status: '健康', owner: '王晶', nextAction: '保持补货节奏' },
  { recordId: 'R-2402', region: '华东', channel: '经销商', revenue: 218.4, revenueYoY: 8.1, grossMargin: 24.7, orderCount: 12680, fulfillmentRate: 94.6, avgDelivery: 2.4, complaintRate: 0.48, stockRisk: '中', overdueAmount: 42.3, status: '关注', owner: '刘敏', nextAction: '复核账期额度' },
  { recordId: 'R-2403', region: '华南', channel: '门店', revenue: 176.2, revenueYoY: -3.5, grossMargin: 21.9, orderCount: 9360, fulfillmentRate: 91.2, avgDelivery: 2.9, complaintRate: 0.66, stockRisk: '高', overdueAmount: 68.7, status: '预警', owner: '陈卓', nextAction: '启动库存清理' },
  { recordId: 'R-2404', region: '华南', channel: '线上直营', revenue: 298.1, revenueYoY: 15.4, grossMargin: 29.6, orderCount: 16240, fulfillmentRate: 98.4, avgDelivery: 1.6, complaintRate: 0.21, stockRisk: '低', overdueAmount: 12.4, status: '健康', owner: '周琳', nextAction: '扩大投放样本' },
  { recordId: 'R-2405', region: '华北', channel: '经销商', revenue: 154.7, revenueYoY: 5.2, grossMargin: 22.8, orderCount: 8120, fulfillmentRate: 93.1, avgDelivery: 2.7, complaintRate: 0.53, stockRisk: '中', overdueAmount: 51.9, status: '关注', owner: '赵岩', nextAction: '压降慢动销' },
  { recordId: 'R-2406', region: '华北', channel: '门店', revenue: 132.5, revenueYoY: -6.8, grossMargin: 19.6, orderCount: 7040, fulfillmentRate: 89.7, avgDelivery: 3.2, complaintRate: 0.82, stockRisk: '高', overdueAmount: 73.5, status: '预警', owner: '孙悦', nextAction: '补齐服务工单' },
  { recordId: 'R-2407', region: '海外', channel: '线上直营', revenue: 248.9, revenueYoY: 10.9, grossMargin: 26.5, orderCount: 10460, fulfillmentRate: 95.8, avgDelivery: 2.2, complaintRate: 0.39, stockRisk: '中', overdueAmount: 36.8, status: '关注', owner: '何嘉', nextAction: '校准备货周期' },
  { recordId: 'R-2408', region: '海外', channel: '经销商', revenue: 201.6, revenueYoY: 7.4, grossMargin: 23.2, orderCount: 8950, fulfillmentRate: 92.5, avgDelivery: 2.8, complaintRate: 0.57, stockRisk: '中', overdueAmount: 58.1, status: '关注', owner: '林可', nextAction: '跟进回款承诺' },
];

const defaultComplexColumnTree: S2ReportColumn[] = [
  { key: 'region', label: '大区', field: 'region', width: 74, fixed: 'left', align: 'center', filterable: true, definition: '一级区域维度', priority: 1, locked: true },
  { key: 'channel', label: '渠道', field: 'channel', width: 104, fixed: 'left', align: 'left', filterable: true, definition: '经营渠道或门店类型', priority: 1, locked: true },
  {
    key: 'performance',
    label: '经营表现',
    children: [
      { key: 'revenue', label: '收入', field: 'revenue', width: 92, align: 'right', sortable: true, unit: '万元', definition: '本期确认收入', formula: 'SUM(revenue)', formatter: 'currency', priority: 1 },
      { key: 'revenueYoY', label: '同比', field: 'revenueYoY', width: 78, align: 'right', sortable: true, unit: '%', definition: '较去年同期收入增幅', formula: '(本期-同期)/同期', formatter: 'percent', priority: 2 },
      { key: 'grossMargin', label: '毛利率', field: 'grossMargin', width: 82, align: 'right', sortable: true, unit: '%', definition: '毛利额/收入', formula: 'grossProfit / revenue', formatter: 'percent', priority: 2 },
      { key: 'orderCount', label: '订单', field: 'orderCount', width: 88, align: 'right', sortable: true, unit: '单', definition: '有效订单数', formatter: 'number', priority: 3 },
    ],
  },
  {
    key: 'quality',
    label: '履约质量',
    children: [
      { key: 'fulfillmentRate', label: '履约率', field: 'fulfillmentRate', width: 82, align: 'right', sortable: true, unit: '%', definition: '按时履约订单占比', formula: 'onTimeOrders / totalOrders', formatter: 'percent', priority: 1 },
      { key: 'avgDelivery', label: '交付时长', field: 'avgDelivery', width: 92, align: 'right', sortable: true, unit: '天', definition: '平均交付时长', formatter: 'duration', priority: 2 },
      { key: 'complaintRate', label: '投诉率', field: 'complaintRate', width: 82, align: 'right', sortable: true, unit: '%', definition: '投诉工单/订单', formula: 'complaints / totalOrders', formatter: 'percent', priority: 3 },
    ],
  },
  {
    key: 'risk',
    label: '风险预警',
    children: [
      { key: 'stockRisk', label: '库存风险', field: 'stockRisk', width: 88, align: 'center', filterable: true, definition: '慢动销与缺货综合等级', formatter: 'text', priority: 1 },
      { key: 'overdueAmount', label: '逾期金额', field: 'overdueAmount', width: 96, align: 'right', sortable: true, unit: '万元', definition: '超过账期未回款金额', formatter: 'currency', priority: 1 },
      { key: 'status', label: '状态', field: 'status', width: 82, align: 'center', filterable: true, definition: '健康、关注、预警三类状态', formatter: 'status', priority: 1 },
    ],
  },
  {
    key: 'action',
    label: '动作建议',
    children: [
      { key: 'owner', label: '负责人', field: 'owner', width: 82, align: 'center', definition: '当前跟进责任人', formatter: 'text', priority: 2 },
      { key: 'nextAction', label: '下一步', field: 'nextAction', minWidth: 132, align: 'left', definition: '建议动作，可进入 detailRoute 查看详情', formatter: 'text', priority: 3, ellipsis: true },
    ],
  },
];

const variant = computed<S2ReportVariant>(() => props.variant ?? 'detail');
const showTableControls = computed(() => variant.value !== 'detail');
const rowFields = computed(() => props.rowFields?.length ? props.rowFields : ['region', 'channel']);
const columnFields = computed(() => props.columnFields?.length ? props.columnFields : ['quarter']);
const valueFields = computed(() => props.valueFields?.length ? props.valueFields : ['sales', 'margin']);
const pivotMeta = computed(() => props.meta?.length ? props.meta : defaultPivotMeta);

const getFieldName = (field: string) => pivotMeta.value.find((item) => item.field === field)?.name ?? field;
const getFieldUnit = (field: string) => pivotMeta.value.find((item) => item.field === field)?.unit ?? '';
const getColumnField = (column: S2ReportColumn) => column.field ?? column.key;
const getColumnLabel = (column: S2ReportColumn) => column.label;

const formatPlainNumber = (value: unknown, digits = 1) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: digits }).format(numericValue);
};

const formatValue = (value: unknown, column?: S2ReportColumn) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numericValue = Number(value);

  if (column?.formatter === 'currency' && Number.isFinite(numericValue)) {
    return `${numberFormatter.format(numericValue)}${column.unit ?? '万元'}`;
  }

  if (column?.formatter === 'percent' && Number.isFinite(numericValue)) {
    return `${numberFormatter.format(numericValue)}%`;
  }

  if (column?.formatter === 'duration' && Number.isFinite(numericValue)) {
    return `${numberFormatter.format(numericValue)}${column.unit ?? '天'}`;
  }

  if (column?.formatter === 'number' && Number.isFinite(numericValue)) {
    return integerFormatter.format(numericValue);
  }

  return String(value);
};

const collectLeafColumns = (columns: S2ReportColumn[]): S2ReportColumn[] =>
  columns.flatMap((column) => column.children?.length ? collectLeafColumns(column.children) : [column]);

const getMaxDepth = (columns: S2ReportColumn[], depth = 1): number =>
  columns.reduce((maxDepth, column) => Math.max(maxDepth, column.children?.length ? getMaxDepth(column.children, depth + 1) : depth), depth);

const getLeafCount = (column: S2ReportColumn): number =>
  column.children?.length ? column.children.reduce((count, child) => count + getLeafCount(child), 0) : 1;

const toCustomTreeNode = (column: S2ReportColumn): CustomTreeNode => ({
  field: getColumnField(column),
  title: getColumnLabel(column),
  description: [column.definition, column.unit ? `单位：${column.unit}` : '', column.formula ? `公式：${column.formula}` : ''].filter(Boolean).join('；'),
  children: column.children?.map(toCustomTreeNode),
});

const normalizeField = (value: unknown) => String(value ?? 'empty').replace(/[^\w]/g, '_');

const buildPivotField = (columnValue: string, valueField: string) => `${normalizeField(columnValue)}__${valueField}`;

const sourcePivotData = computed(() => {
  const propData = props.rawData?.length ? props.rawData : props.data as Record<string, unknown>[] | undefined;
  return propData?.length ? propData : defaultPivotData;
});

const aggregateRows = (rows: Record<string, unknown>[], field: string) =>
  rows.reduce((sum, row) => {
    const numericValue = Number(row[field]);
    return Number.isFinite(numericValue) ? sum + numericValue : sum;
  }, 0);

const pivotColumnValues = computed(() => {
  const columnField = columnFields.value[0] ?? 'quarter';
  return Array.from(new Set(sourcePivotData.value.map((row) => String(row[columnField] ?? '-'))));
});

const buildPivotRow = (
  rows: Record<string, unknown>[],
  rowId: string,
  labels: Record<string, string>,
  rowType: 'normal' | 'subtotal' | 'grandTotal' = 'normal',
) => {
  const result: Record<string, unknown> = {
    rowId,
    __rowType: rowType,
  };

  rowFields.value.forEach((field) => {
    result[field] = labels[field] ?? '';
  });

  const columnField = columnFields.value[0] ?? 'quarter';
  pivotColumnValues.value.forEach((columnValue) => {
    const scopedRows = rows.filter((row) => String(row[columnField] ?? '-') === columnValue);
    valueFields.value.forEach((field) => {
      result[buildPivotField(columnValue, field)] = aggregateRows(scopedRows, field);
    });
  });

  valueFields.value.forEach((field) => {
    result[`total__${field}`] = aggregateRows(rows, field);
  });

  return result;
};

const pivotRows = computed(() => {
  const regionField = rowFields.value[0] ?? 'region';
  const channelField = rowFields.value[1] ?? 'channel';
  const rows: Record<string, unknown>[] = [];

  Array.from(new Set(sourcePivotData.value.map((row) => String(row[regionField] ?? '-')))).forEach((region) => {
    const regionRows = sourcePivotData.value.filter((row) => String(row[regionField] ?? '-') === region);

    Array.from(new Set(regionRows.map((row) => String(row[channelField] ?? '-')))).forEach((channel) => {
      const channelRows = regionRows.filter((row) => String(row[channelField] ?? '-') === channel);
      rows.push(buildPivotRow(channelRows, `${region}-${channel}`, { [regionField]: region, [channelField]: channel }));
    });

    if (props.pivotContract?.subtotal ?? true) {
      rows.push(buildPivotRow(regionRows, `${region}-subtotal`, { [regionField]: region, [channelField]: '小计' }, 'subtotal'));
    }
  });

  if (props.pivotContract?.grandTotal ?? true) {
    rows.push(buildPivotRow(sourcePivotData.value, 'grand-total', { [regionField]: '总计', [channelField]: '' }, 'grandTotal'));
  }

  return rows;
});

const pivotColumns = computed<S2ReportColumn[]>(() => [
  ...rowFields.value.map((field) => ({
    key: field,
    field,
    label: getFieldName(field),
    width: field === rowFields.value[0] ? 78 : 104,
    fixed: 'left' as const,
    align: field === rowFields.value[0] ? 'center' as const : 'left' as const,
    formatter: 'text' as const,
    locked: true,
  })),
  ...pivotColumnValues.value.map((columnValue) => ({
    key: `group-${columnValue}`,
    label: columnValue,
    children: valueFields.value.map((field) => ({
      key: buildPivotField(columnValue, field),
      field: buildPivotField(columnValue, field),
      label: getFieldName(field),
      width: 96,
      align: 'right' as const,
      unit: getFieldUnit(field),
      formatter: 'currency' as const,
      definition: `SUM(${field}) by ${columnFields.value.join('/')}`,
      formula: `sum(${field})`,
    })),
  })),
  {
    key: 'total',
    label: '总计',
    children: valueFields.value.map((field) => ({
      key: `total__${field}`,
      field: `total__${field}`,
      label: getFieldName(field),
      width: 104,
      align: 'right' as const,
      unit: getFieldUnit(field),
      formatter: 'currency' as const,
      definition: `grand total and subtotal for ${field}`,
      formula: `sum(${field})`,
    })),
  },
]);

const detailRows = computed(() => {
  if (props.rows?.length) {
    return props.rows;
  }

  return Array.isArray(props.data) && props.data.length ? props.data as Record<string, unknown>[] : defaultDetailRows;
});

const detailColumns = computed(() => props.tableColumns?.length ? props.tableColumns : defaultDetailColumns);

const complexRows = computed(() => {
  if (props.rows?.length) {
    return props.rows;
  }

  return Array.isArray(props.data) && props.data.length ? props.data as Record<string, unknown>[] : defaultComplexRows;
});

const complexColumns = computed(() => props.columnTree?.length ? props.columnTree : defaultComplexColumnTree);

const rowHeight = computed(() => {
  const configured = Number(props.displayBudget?.rowHeightPx);
  if (Number.isFinite(configured) && configured > 0) {
    return Math.max(24, Math.min(32, Math.floor(configured)));
  }

  return Math.max(24, Math.min(30, Math.floor(sheetSize.value.height / 6)));
});

const headerHeight = computed(() => Math.max(24, Math.min(30, Number(props.displayBudget?.headerRowH) || 28)));

const pageSize = computed(() => {
  const configured = Number(props.displayBudget?.visibleRowCount);
  if (Number.isFinite(configured) && configured > 0) {
    return Math.max(1, Math.floor(configured));
  }

  const heightBudget = Math.max(sheetSize.value.height - 34, 90);
  return Math.max(2, Math.floor(heightBudget / rowHeight.value));
});

const model = computed(() => {
  if (variant.value === 'pivot') {
    const leafColumns = collectLeafColumns(pivotColumns.value);

    return {
      rows: pivotRows.value,
      columns: pivotColumns.value,
      leafColumns,
      rowKey: 'rowId',
      lockedColumnKeys: rowFields.value,
      frozenColCount: rowFields.value.length,
      defaultSort: null as { field: string; order: 'ascending' | 'descending' } | null,
      searchFields: leafColumns.map(getColumnField),
      tableContract: {
        renderer: 'AntV S2 TableSheet with S2DataConfig and s2Options',
        rowFields: rowFields.value,
        columnFields: columnFields.value,
        valueFields: valueFields.value,
        rowDimensions: rowFields.value,
        columnDimensions: columnFields.value,
        measures: valueFields.value,
        aggregation: 'SUM',
        subtotal: props.pivotContract?.subtotal ?? true,
        grandTotal: props.pivotContract?.grandTotal ?? true,
        rateFormula: 'rate measures must recompute totals from numerator and denominator with weighted rules',
        frozen: `S2 frozen colCount=${rowFields.value.length}; rowHeaderW=${props.displayBudget?.rowHeaderW ?? 86}; headerRowH=${props.displayBudget?.headerRowH ?? 28}; measureColumnW=${props.displayBudget?.measureColumnW ?? 96}`,
        tooltip: 'tooltip exposes exact row path, column path, measure name, SUM aggregation formula, and source evidence values',
        drilldown: 'drilldown/detail reserved through row path, column path, measure, and source records',
        states: ['loading', 'empty', 'error', 'noPermission'],
      },
    };
  }

  if (variant.value === 'complex') {
    const leafColumns = collectLeafColumns(complexColumns.value);

    return {
      rows: complexRows.value,
      columns: complexColumns.value,
      leafColumns,
      rowKey: props.rowKey ?? String(props.complexTableContract?.rowKey ?? 'recordId'),
      lockedColumnKeys: leafColumns.filter((column) => column.locked || column.fixed === 'left').map((column) => column.key),
      frozenColCount: leafColumns.filter((column) => column.locked || column.fixed === 'left').length,
      defaultSort: props.complexTableContract?.defaultSort as { field: string; order: 'ascending' | 'descending' } | undefined ?? { field: 'revenue', order: 'descending' },
      searchFields: leafColumns.map(getColumnField),
      tableContract: {
        renderer: 'AntV S2 TableSheet groupedColumns custom columnTree multiLevelHeader',
        rowKey: props.rowKey ?? 'recordId',
        primaryKey: props.rowKey ?? 'recordId',
        columnTree: 'groupedColumns/columnTree uses nested children',
        groupedColumns: complexColumns.value.filter((column) => column.children?.length).map((column) => column.key),
        leafColumns: leafColumns.map(getColumnField),
        spanRules: {
          maxDepth: getMaxDepth(complexColumns.value),
          leafColumnCount: leafColumns.length,
          colSpan: 'parent colSpan = child leafColumnCount',
          rowSpan: 'leaf rowSpan fills maxDepth when no children',
        },
        frozenColumns: leafColumns.filter((column) => column.locked || column.fixed === 'left').map((column) => column.label),
        localFilters: ['componentLocal', 'all', 'risk'],
        columnHeaderFilters: leafColumns.filter((column) => column.filterable).map(getColumnField),
        filterable: true,
        sortable: true,
        tooltip: 'tooltip exposes unit, definition, formula, formatter result and exact row detail values',
        columnSettings: 'top toolbar columnSettings controls visibleColumns and hiddenColumns',
        horizontalScroll: 'S2 canvas scroll handles wide grouped table',
        fullscreen: 'reserved dashboard fullscreen control',
        detailRoute: '/reports/complex-table/detail',
        densityFallback: 'compact + horizontalScroll + columnSettings + fullscreen/detailRoute',
        states: ['loading', 'empty', 'error', 'noPermission'],
      },
    };
  }

  const leafColumns = collectLeafColumns(detailColumns.value);
  return {
    rows: detailRows.value,
    columns: detailColumns.value,
    leafColumns,
    rowKey: props.rowKey ?? String(props.detailTableContract?.rowKey ?? 'orderId'),
    lockedColumnKeys: leafColumns.filter((column) => column.locked || column.fixed === 'left').map((column) => column.key),
    frozenColCount: leafColumns.filter((column) => column.locked || column.fixed === 'left').length,
    defaultSort: props.detailTableContract?.defaultSort as { field: string; order: 'ascending' | 'descending' } | undefined ?? { field: 'amount', order: 'descending' },
    searchFields: leafColumns.map(getColumnField),
      tableContract: {
        renderer: 'AntV S2 TableSheet detail table',
        rowKey: props.rowKey ?? 'orderId',
        primaryKey: props.rowKey ?? 'orderId',
        rowGrain: '订单明细，一行一订单',
      columns: leafColumns.map((column) => ({
        key: column.key,
        width: column.width,
        minWidth: column.minWidth,
        align: column.align,
        fixed: column.fixed,
        sortable: column.sortable,
        type: column.formatter,
        formatter: column.formatter,
        ellipsis: column.ellipsis ?? true,
      })),
      defaultSort: props.detailTableContract?.defaultSort ?? { field: 'amount', order: 'descending' },
      visibleColumns: 'controlled by selectedColumnKeys from columnSettings',
      columnPriority: Object.fromEntries(leafColumns.map((column) => [column.key, column.priority ?? 9])),
      columnSettings: 'top toolbar columnSettings controls visibleColumns and hiddenColumns',
      maxVisibleColumns: props.detailTableContract?.maxVisibleColumns ?? 7,
      hiddenColumns: 'computed from columnSettings',
      pageSize: 'computed by visibleRowCount or container height',
      currentPage: 'footer currentPage',
      pagination: 'local pagination with footer page count and prev/next controls',
      virtual: 'height-driven virtual row budget inside S2 canvas',
      loadMore: 'reserved provider loadMore when API pagination is wired',
      search: 'top toolbar keyword search',
      keyword: 'keyword',
      query: 'component-local query only',
      filterFields: leafColumns.map(getColumnField),
      localFilter: 'component-local search only',
      exportScope: 'filteredRows',
      exportRows: 'current filtered rows',
      detail: 'row detail',
      rowDetail: 'rowDetail dashboard-action',
      drawer: 'reserved detail drawer',
      onRowClick: 'reserved rowDetail click',
      operation: '查看',
      actions: ['rowDetail'],
      states: ['loading', 'empty', 'error', 'noPermission'],
    },
  };
});

const leafColumns = computed(() => model.value.leafColumns);
const lockedColumnKeys = computed(() => new Set(model.value.lockedColumnKeys));

watch(
  leafColumns,
  (columns) => {
    const validKeys = columns.map((column) => column.key);
    const nextSelected = selectedColumnKeys.value.filter((key) => validKeys.includes(key));
    const lockedKeys = columns.filter((column) => lockedColumnKeys.value.has(column.key)).map((column) => column.key);
    const nextKeys = Array.from(new Set([...lockedKeys, ...(nextSelected.length ? nextSelected : validKeys)]));
    const hasSameKeys = nextKeys.length === selectedColumnKeys.value.length &&
      nextKeys.every((key, index) => key === selectedColumnKeys.value[index]);

    if (!hasSameKeys) {
      selectedColumnKeys.value = nextKeys;
    }
  },
  { immediate: true },
);

watch([keyword, variant], () => {
  currentPage.value = 1;
});

const visibleLeafColumns = computed(() =>
  showTableControls.value
    ? leafColumns.value.filter((column) => selectedColumnKeys.value.includes(column.key))
    : leafColumns.value,
);

const pruneColumnTree = (columns: S2ReportColumn[]): S2ReportColumn[] =>
  columns.flatMap((column) => {
    if (!showTableControls.value) {
      return [column];
    }

    if (!column.children?.length) {
      return selectedColumnKeys.value.includes(column.key) ? [column] : [];
    }

    const children = pruneColumnTree(column.children);
    return children.length ? [{ ...column, children }] : [];
  });

const visibleColumnTree = computed(() => pruneColumnTree(model.value.columns));

const filteredRows = computed(() => {
  if (!showTableControls.value) {
    return model.value.rows;
  }

  const normalizedKeyword = keyword.value.trim().toLowerCase();

  if (!normalizedKeyword) {
    return model.value.rows;
  }

  const searchFields = visibleLeafColumns.value.length
    ? visibleLeafColumns.value.map(getColumnField)
    : model.value.searchFields;

  return model.value.rows.filter((row) =>
    searchFields.some((field) => String(row[field] ?? '').toLowerCase().includes(normalizedKeyword)),
  );
});

const sortedRows = computed(() => {
  const rows = [...filteredRows.value];
  const defaultSort = model.value.defaultSort;

  if (!defaultSort?.field || !defaultSort.order) {
    return rows;
  }

  return rows.sort((leftRow, rightRow) => {
    const left = leftRow[defaultSort.field];
    const right = rightRow[defaultSort.field];
    const leftNumber = Number(left);
    const rightNumber = Number(right);
    const result = Number.isFinite(leftNumber) && Number.isFinite(rightNumber)
      ? leftNumber - rightNumber
      : String(left ?? '').localeCompare(String(right ?? ''), 'zh-CN');

    return defaultSort.order === 'ascending' ? result : -result;
  });
});

const pageCount = computed(() => Math.max(1, Math.ceil(sortedRows.value.length / pageSize.value)));

watch(pageCount, (count) => {
  currentPage.value = Math.min(currentPage.value, count);
});

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return sortedRows.value.slice(start, start + pageSize.value);
});

const stateMessage = computed(() => {
  if (props.noPermission) {
    return { title: '暂无权限', message: 'noPermission：当前账号无法查看该 S2 表。' };
  }

  if (props.errorText) {
    return { title: '加载失败', message: `error：${props.errorText}` };
  }

  if (props.loading) {
    return { title: '加载中', message: 'loading：正在加载 S2 表数据。' };
  }

  return null;
});

const columnWidthMap = computed(() =>
  Object.fromEntries(visibleLeafColumns.value.map((column) => [
    getColumnField(column),
    Math.max(64, column.width ?? column.minWidth ?? (column.formatter === 'operation' ? 68 : 92)),
  ])),
);

const s2Meta = computed(() =>
  visibleLeafColumns.value.map((column) => ({
    field: getColumnField(column),
    name: column.label,
    description: [column.definition, column.unit ? `单位：${column.unit}` : '', column.formula ? `公式：${column.formula}` : ''].filter(Boolean).join('；'),
    formatter: (value: unknown) => formatValue(value, column),
  })),
);

const s2DataConfig = computed<S2DataConfig>(() => ({
  data: pagedRows.value as RawData[],
  fields: {
    columns: visibleColumnTree.value.map(toCustomTreeNode),
  },
  meta: s2Meta.value,
}));

const s2Options = computed<S2Options>(() => ({
  width: Math.max(120, Math.floor(sheetSize.value.width)),
  height: Math.max(100, Math.floor(sheetSize.value.height)),
  hd: true,
  showDefaultHeaderActionIcon: false,
  tooltip: {
    enable: true,
    operation: {
      sort: true,
      tableSort: true,
      hiddenColumns: true,
    },
  },
  placeholder: {
    cell: '-',
    empty: {
      description: props.emptyText ?? '暂无数据',
    },
  },
  frozen: {
    rowCount: 0,
    colCount: Math.min(model.value.frozenColCount, visibleLeafColumns.value.length),
    trailingColCount: 0,
  },
  style: {
    layoutWidthType: 'compact',
    compactMinWidth: 68,
    compactExtraWidth: 8,
    colCell: {
      height: headerHeight.value,
      widthByField: columnWidthMap.value,
      maxLines: 1,
      textOverflow: 'ellipsis',
    },
    dataCell: {
      height: rowHeight.value,
      width: 92,
      maxLines: 1,
      textOverflow: 'ellipsis',
    },
    cornerCell: {
      maxLines: 1,
      textOverflow: 'ellipsis',
    },
  },
}));

const readS2ThemeColor = (name: string, fallback: string) => {
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
    horizontalBorderColor: readS2ThemeColor('--s2-cell-border-horizontal', 'rgba(0, 74, 198, 0.12)'),
    horizontalBorderWidth: 1,
    verticalBorderColor: readS2ThemeColor('--s2-cell-border-vertical', 'rgba(0, 74, 198, 0.1)'),
    verticalBorderWidth: 1,
    showShadow: false,
  },
  scrollBar: {
    size: 5,
    thumbColor: readS2ThemeColor('--s2-scroll-thumb', 'rgba(0, 91, 216, 0.32)'),
    thumbHoverColor: readS2ThemeColor('--s2-scroll-thumb-hover', 'rgba(0, 91, 216, 0.48)'),
    trackColor: readS2ThemeColor('--s2-scroll-track', 'rgba(218, 234, 255, 0.48)'),
  },
  [CellType.COL_CELL]: {
    text: {
      fill: readS2ThemeColor('--s2-header-text', '#113d75'),
      fontSize: 11,
      fontWeight: 800,
      textAlign: 'center',
      textBaseline: 'middle',
    },
    bolderText: {
      fill: readS2ThemeColor('--s2-header-strong-text', '#062e72'),
      fontSize: 11,
      fontWeight: 900,
      textAlign: 'center',
      textBaseline: 'middle',
    },
    cell: {
      backgroundColor: readS2ThemeColor('--s2-header-background', 'rgba(235, 244, 255, 0.96)'),
      horizontalBorderColor: readS2ThemeColor('--s2-cell-border-horizontal', 'rgba(0, 74, 198, 0.12)'),
      verticalBorderColor: readS2ThemeColor('--s2-cell-border-vertical', 'rgba(0, 74, 198, 0.1)'),
      padding: { top: 4, right: 6, bottom: 4, left: 6 },
      interactionState: {
        hover: { backgroundColor: readS2ThemeColor('--s2-cell-hover-background', '#ddecff'), backgroundOpacity: 0.9 },
        selected: { backgroundColor: readS2ThemeColor('--s2-cell-selected-background', '#cfe4ff'), backgroundOpacity: 0.95 },
      },
    },
  },
  [CellType.CORNER_CELL]: {
    text: {
      fill: readS2ThemeColor('--s2-header-text', '#113d75'),
      fontSize: 11,
      fontWeight: 850,
      textAlign: 'center',
      textBaseline: 'middle',
    },
    cell: {
      backgroundColor: readS2ThemeColor('--s2-header-background', 'rgba(235, 244, 255, 0.96)'),
      horizontalBorderColor: readS2ThemeColor('--s2-cell-border-horizontal', 'rgba(0, 74, 198, 0.12)'),
      verticalBorderColor: readS2ThemeColor('--s2-cell-border-vertical', 'rgba(0, 74, 198, 0.1)'),
      padding: { top: 4, right: 6, bottom: 4, left: 6 },
    },
  },
  [CellType.DATA_CELL]: {
    text: {
      fill: readS2ThemeColor('--s2-data-text', '#183552'),
      fontSize: 11,
      fontWeight: 650,
      textBaseline: 'middle',
    },
    bolderText: {
      fill: readS2ThemeColor('--s2-data-strong-text', '#063d8e'),
      fontSize: 11,
      fontWeight: 850,
      textBaseline: 'middle',
    },
    cell: {
      backgroundColor: readS2ThemeColor('--s2-data-background', 'rgba(255, 255, 255, 0.48)'),
      crossBackgroundColor: readS2ThemeColor('--s2-data-cross-background', 'rgba(232, 242, 255, 0.38)'),
      horizontalBorderColor: readS2ThemeColor('--s2-data-border-horizontal', 'rgba(0, 74, 198, 0.08)'),
      verticalBorderColor: readS2ThemeColor('--s2-data-border-vertical', 'rgba(0, 74, 198, 0.08)'),
      padding: { top: 4, right: 7, bottom: 4, left: 7 },
      interactionState: {
        hover: { backgroundColor: readS2ThemeColor('--s2-cell-hover-background', '#e8f3ff'), backgroundOpacity: 0.82 },
        selected: { backgroundColor: readS2ThemeColor('--s2-cell-selected-background', '#d7eaff'), backgroundOpacity: 0.92 },
      },
    },
  },
}));

const s2Contract = computed(() => ({
  ...model.value.tableContract,
  selectedColumns: selectedColumnKeys.value,
  hiddenColumns: leafColumns.value.filter((column) => !selectedColumnKeys.value.includes(column.key)).map((column) => column.key),
  search: keyword.value,
  keyword: keyword.value,
  query: keyword.value,
  S2DataConfig: {
    fields: s2DataConfig.value.fields,
    rowCount: s2DataConfig.value.data.length,
  },
  s2Options: {
    width: s2Options.value.width,
    height: s2Options.value.height,
    frozen: s2Options.value.frozen,
    pagination: {
      pageSize: pageSize.value,
      currentPage: currentPage.value,
      pageCount: pageCount.value,
    },
    tooltip: s2Options.value.tooltip,
  },
}));

const footerLabel = computed(() => `第 ${currentPage.value} / ${pageCount.value} 页 · 共 ${sortedRows.value.length} 行`);

const canGoPrev = computed(() => currentPage.value > 1);
const canGoNext = computed(() => currentPage.value < pageCount.value);

const handleKeywordInput = (event: Event) => {
  keyword.value = (event.target as HTMLInputElement | null)?.value ?? '';
  currentPage.value = 1;
};

const syncSelectedColumnsFromDom = () => {
  const checkedKeys = Array.from(rootRef.value?.querySelectorAll<HTMLInputElement>('.s2-report-column-checkbox:checked') ?? [])
    .map((input) => input.value);
  const lockedKeys = leafColumns.value.filter((column) => lockedColumnKeys.value.has(column.key)).map((column) => column.key);
  const nextKeys = Array.from(new Set([...lockedKeys, ...checkedKeys]));
  const hasSameKeys = nextKeys.length === selectedColumnKeys.value.length &&
    nextKeys.every((key, index) => key === selectedColumnKeys.value[index]);

  if (!hasSameKeys) {
    selectedColumnKeys.value = nextKeys;
  }
};

const syncControlsFromDom = () => {
  if (!showTableControls.value) {
    return;
  }

  const nextKeyword = searchInputRef.value?.value ?? '';
  if (nextKeyword !== keyword.value) {
    keyword.value = nextKeyword;
    currentPage.value = 1;
  }

  syncSelectedColumnsFromDom();
};

const goPage = (direction: -1 | 1) => {
  currentPage.value = Math.min(Math.max(currentPage.value + direction, 1), pageCount.value);
};

const updateSize = () => {
  if (!rootRef.value) {
    return;
  }

  const rootRect = rootRef.value.getBoundingClientRect();
  const nextRootSize = {
    width: Math.max(rootRect.width, 0),
    height: Math.max(rootRect.height, 0),
  };
  if (nextRootSize.width !== rootSize.value.width || nextRootSize.height !== rootSize.value.height) {
    rootSize.value = nextRootSize;
  }

  const sheetRect = sheetRef.value?.getBoundingClientRect();
  const nextSheetSize = {
    width: Math.max(sheetRect?.width ?? rootRect.width, 0),
    height: Math.max(sheetRect?.height ?? rootRect.height - 54, 0),
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
  if (!sheetRef.value || stateMessage.value) {
    destroySheet();
    return;
  }

  if (sheetSize.value.width < 80 || sheetSize.value.height < 80) {
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
  variant: variant.value,
  sizeReady: sheetSize.value.width >= 80 && sheetSize.value.height >= 80,
  pageSize: pageSize.value,
  currentPage: currentPage.value,
  keyword: showTableControls.value ? keyword.value : '',
  selectedColumnKeys: showTableControls.value ? selectedColumnKeys.value : leafColumns.value.map((column) => column.key),
  rowCount: pagedRows.value.length,
  firstRowKey: pagedRows.value[0]?.[model.value.rowKey],
  columns: visibleColumnTree.value.map((column) => column.key),
}));

watch(renderSignature, () => {
  queueRenderSheet();
}, { immediate: true, flush: 'post' });

onMounted(() => {
  if (!rootRef.value) {
    return;
  }

  resizeObserver = new ResizeObserver(() => {
    updateSize();
  });
  resizeObserver.observe(rootRef.value);
  if (sheetRef.value) {
    resizeObserver.observe(sheetRef.value);
  }
  updateSize();
  if (showTableControls.value) {
    controlSyncTimer = window.setInterval(syncControlsFromDom, 250);
  }
});

onBeforeUnmount(() => {
  if (renderTimer !== null) {
    window.clearTimeout(renderTimer);
    renderTimer = null;
  }
  if (controlSyncTimer !== null) {
    window.clearInterval(controlSyncTimer);
    controlSyncTimer = null;
  }
  resizeObserver?.disconnect();
  resizeObserver = null;
  destroySheet();
});
</script>

<template>
  <section
    ref="rootRef"
    class="s2-report-table-widget"
    :class="{ 's2-report-table-widget-no-toolbar': !showTableControls }"
    :data-variant="variant"
  >
    <header v-if="showTableControls" class="s2-report-toolbar">
      <label class="s2-report-search">
        <span>搜索</span>
        <input
          ref="searchInputRef"
          :value="keyword"
          type="search"
          placeholder="输入关键词"
          aria-label="搜索表格"
          @input="handleKeywordInput"
          @change="handleKeywordInput"
          @keyup="handleKeywordInput"
        />
      </label>
      <details class="s2-report-column-settings">
        <summary class="s2-report-tool-button">
          列设置
        </summary>
        <div class="s2-report-column-panel">
          <label v-for="column in leafColumns" :key="column.key" class="s2-report-column-option">
            <input
              class="s2-report-column-checkbox"
              type="checkbox"
              :checked="selectedColumnKeys.includes(column.key)"
              :value="column.key"
              :disabled="lockedColumnKeys.has(column.key)"
              @change="syncSelectedColumnsFromDom"
            />
            <span>{{ column.label }}</span>
          </label>
        </div>
      </details>
    </header>

    <div class="s2-report-sheet-shell">
      <div v-if="stateMessage" class="s2-report-state">
        <strong>{{ stateMessage.title }}</strong>
        <span>{{ stateMessage.message }}</span>
      </div>
      <div v-else-if="renderError" class="s2-report-state">
        <strong>渲染失败</strong>
        <span>{{ renderError }}</span>
      </div>
      <div v-else ref="sheetRef" class="s2-report-sheet" />
    </div>

    <footer class="s2-report-footer">
      <span class="s2-report-footer-text" :title="footerLabel">{{ footerLabel }}</span>
      <span class="s2-report-pager">
        <button type="button" :disabled="!canGoPrev" @click="goPage(-1)">上一页</button>
        <button type="button" :disabled="!canGoNext" @click="goPage(1)">下一页</button>
      </span>
    </footer>
  </section>
</template>

<style scoped>
.s2-report-table-widget {
  container-type: size;
  display: grid;
  grid-template-rows: 24px minmax(0, 1fr) 20px;
  gap: 4px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: #163252;
}

.s2-report-table-widget-no-toolbar {
  grid-template-rows: minmax(0, 1fr) 20px;
}

.s2-report-toolbar,
.s2-report-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  min-height: 0;
  gap: 6px;
  color: rgba(22, 50, 82, 0.78);
  font-size: clamp(10px, 4.2cqh, 12px);
  font-weight: 800;
  line-height: 1;
}

.s2-report-search {
  display: inline-grid;
  grid-template-columns: auto minmax(70px, 1fr);
  align-items: center;
  width: min(170px, 58%);
  min-width: 0;
  height: 22px;
  padding: 0 7px;
  gap: 5px;
  border: 1px solid var(--s2-tool-border, rgba(0, 74, 198, 0.15));
  border-radius: 999px;
  background: var(--s2-tool-background, rgba(255, 255, 255, 0.62));
  box-shadow: var(--s2-tool-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.68));
}

.s2-report-search span {
  color: var(--s2-tool-label-color, #1d4f91);
  font-weight: 900;
  white-space: nowrap;
}

.s2-report-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  color: var(--s2-tool-input-color, #183552);
  background: transparent;
  font: inherit;
  font-weight: 700;
}

.s2-report-search input::placeholder {
  color: var(--s2-tool-placeholder-color, rgba(22, 50, 82, 0.38));
}

.s2-report-column-settings {
  position: relative;
  flex: 0 0 auto;
}

.s2-report-column-settings summary {
  list-style: none;
}

.s2-report-column-settings summary::-webkit-details-marker {
  display: none;
}

.s2-report-tool-button,
.s2-report-pager button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  min-width: 0;
  padding: 0 8px;
  border: 1px solid var(--s2-tool-button-border, rgba(0, 74, 198, 0.18));
  border-radius: 999px;
  color: var(--s2-tool-button-color, #0c4ca8);
  background: var(--s2-tool-button-background, linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(236, 245, 255, 0.72)));
  box-shadow: var(--s2-tool-button-shadow, 0 5px 12px rgba(0, 74, 198, 0.08));
  font: inherit;
  font-weight: 900;
  line-height: 1;
  cursor: pointer;
  user-select: none;
}

.s2-report-column-settings[open] .s2-report-tool-button {
  border-color: var(--s2-tool-button-active-border, rgba(0, 74, 198, 0.34));
  color: var(--s2-tool-button-active-color, #ffffff);
  background: var(--s2-tool-button-active-background, linear-gradient(135deg, #005bd8, #2b87ff));
}

.s2-report-pager {
  display: inline-flex;
  min-width: 0;
  gap: 4px;
}

.s2-report-pager button:disabled {
  cursor: not-allowed;
  opacity: 0.42;
}

.s2-report-column-panel {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 8;
  display: grid;
  width: min(210px, 58cqw);
  max-height: min(190px, 70cqh);
  padding: 7px;
  gap: 4px;
  overflow: auto;
  border: 1px solid var(--s2-panel-border, rgba(0, 74, 198, 0.16));
  border-radius: 8px;
  background: var(--s2-panel-background, rgba(250, 253, 255, 0.96));
  box-shadow: var(--s2-panel-shadow, 0 14px 28px rgba(0, 54, 130, 0.16));
}

.s2-report-column-option {
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  align-items: center;
  gap: 5px;
  min-height: 20px;
  color: var(--s2-panel-option-color, #1c3d63);
  font-size: 11px;
  font-weight: 760;
}

.s2-report-column-option input {
  width: 13px;
  height: 13px;
  margin: 0;
  accent-color: #005bd8;
}

.s2-report-column-option span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.s2-report-sheet-shell {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid var(--s2-sheet-border, rgba(0, 74, 198, 0.12));
  background: var(--s2-sheet-background, rgba(255, 255, 255, 0.38));
}

.s2-report-sheet {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.s2-report-state {
  display: grid;
  place-content: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  padding: 10px;
  color: #1d4f91;
  text-align: center;
}

.s2-report-state strong {
  color: #063d8e;
  font-size: 14px;
  font-weight: 950;
}

.s2-report-state span {
  color: rgba(22, 50, 82, 0.72);
  font-size: 12px;
  font-weight: 700;
}

.s2-report-footer-text {
  min-width: 0;
  overflow: hidden;
  color: rgba(22, 50, 82, 0.72);
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.antv-s2-container),
:deep(.s2-container) {
  width: 100% !important;
  height: 100% !important;
}

:deep(canvas) {
  display: block;
}

@container (max-width: 430px) {
  .s2-report-table-widget {
    grid-template-rows: 22px minmax(0, 1fr) 18px;
    gap: 3px;
  }

  .s2-report-table-widget-no-toolbar {
    grid-template-rows: minmax(0, 1fr) 18px;
  }

  .s2-report-search {
    width: min(142px, 54%);
    grid-template-columns: 0 minmax(62px, 1fr);
    padding-right: 6px;
    padding-left: 6px;
  }

  .s2-report-search span {
    overflow: hidden;
  }

  .s2-report-tool-button,
  .s2-report-pager button {
    height: 20px;
    padding-right: 6px;
    padding-left: 6px;
  }
}
</style>
