<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { ElTable, ElTableColumn, ElTag } from 'element-plus';
import type { DashboardWidgetActionEvent } from '../../types/actions';
import type { WidgetContext } from '../types';

type ComplexTableAlign = 'left' | 'center' | 'right';
type ComplexTableFixed = 'left' | 'right';
type ComplexTableFormatter = 'text' | 'number' | 'currency' | 'percent' | 'duration' | 'status';

interface ComplexTableColumnConfig {
  key: string;
  label: string;
  field?: string;
  children?: ComplexTableColumnConfig[];
  width?: number;
  minWidth?: number;
  align?: ComplexTableAlign;
  fixed?: ComplexTableFixed;
  sortable?: boolean;
  filterable?: boolean;
  unit?: string;
  definition?: string;
  formula?: string;
  formatter?: ComplexTableFormatter;
  priority?: number;
  ellipsis?: boolean;
}

interface ComplexTableRow extends Record<string, string | number | null | undefined> {
  recordId: string;
  region: string;
  channel: string;
}

interface ComplexTableContract {
  rowKey?: string;
  primaryKey?: string;
  rowGrain?: string;
  defaultSort?: { field: string; order: 'ascending' | 'descending' };
  columnTree?: string;
  leafColumns?: string[];
  spanRules?: {
    maxDepth: number;
    leafColumnCount: number;
    colSpan: string;
    rowSpan: string;
  };
  frozenColumns?: string[];
  localFilters?: string[];
  columnHeaderFilters?: string[];
  tooltip?: string;
  densityFallback?: string;
  detailRoute?: string;
  states?: Array<'loading' | 'empty' | 'error' | 'noPermission'>;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  rows?: ComplexTableRow[];
  columnTree?: ComplexTableColumnConfig[];
  rowKey?: string;
  emptyText?: string;
  loading?: boolean;
  errorText?: string;
  noPermission?: boolean;
  complexTableContract?: ComplexTableContract;
  displayBudget?: Record<string, unknown>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const activeFilter = ref('all');
const sortState = ref<{ prop: string; order: 'ascending' | 'descending' | null }>({
  prop: props.complexTableContract?.defaultSort?.field ?? 'revenue',
  order: props.complexTableContract?.defaultSort?.order ?? 'descending',
});
let resizeObserver: ResizeObserver | null = null;

const defaultRows: ComplexTableRow[] = [
  { recordId: 'R-2401', region: '华东', channel: '线上直营', revenue: 326.8, revenueYoY: 12.6, grossMargin: 28.4, orderCount: 18420, fulfillmentRate: 97.8, avgDelivery: 1.8, complaintRate: 0.26, stockRisk: '低', overdueAmount: 18.6, status: '健康', owner: '王晨', nextAction: '保持补货节奏' },
  { recordId: 'R-2402', region: '华东', channel: '经销商', revenue: 218.4, revenueYoY: 8.1, grossMargin: 24.7, orderCount: 12680, fulfillmentRate: 94.6, avgDelivery: 2.4, complaintRate: 0.48, stockRisk: '中', overdueAmount: 42.3, status: '关注', owner: '刘敏', nextAction: '复核账期额度' },
  { recordId: 'R-2403', region: '华南', channel: '门店', revenue: 176.2, revenueYoY: -3.5, grossMargin: 21.9, orderCount: 9360, fulfillmentRate: 91.2, avgDelivery: 2.9, complaintRate: 0.66, stockRisk: '高', overdueAmount: 68.7, status: '预警', owner: '陈卓', nextAction: '启动库存清理' },
  { recordId: 'R-2404', region: '华南', channel: '线上直营', revenue: 298.1, revenueYoY: 15.4, grossMargin: 29.6, orderCount: 16240, fulfillmentRate: 98.4, avgDelivery: 1.6, complaintRate: 0.21, stockRisk: '低', overdueAmount: 12.4, status: '健康', owner: '周琳', nextAction: '扩大投放样本' },
  { recordId: 'R-2405', region: '华北', channel: '经销商', revenue: 154.7, revenueYoY: 5.2, grossMargin: 22.8, orderCount: 8120, fulfillmentRate: 93.1, avgDelivery: 2.7, complaintRate: 0.53, stockRisk: '中', overdueAmount: 51.9, status: '关注', owner: '赵岩', nextAction: '压降慢动销' },
  { recordId: 'R-2406', region: '华北', channel: '门店', revenue: 132.5, revenueYoY: -6.8, grossMargin: 19.6, orderCount: 7040, fulfillmentRate: 89.7, avgDelivery: 3.2, complaintRate: 0.82, stockRisk: '高', overdueAmount: 73.5, status: '预警', owner: '孙悦', nextAction: '补齐服务工单' },
  { recordId: 'R-2407', region: '海外', channel: '线上直营', revenue: 248.9, revenueYoY: 10.9, grossMargin: 26.5, orderCount: 10460, fulfillmentRate: 95.8, avgDelivery: 2.2, complaintRate: 0.39, stockRisk: '中', overdueAmount: 36.8, status: '关注', owner: '何嘉', nextAction: '校准备货周期' },
  { recordId: 'R-2408', region: '海外', channel: '经销商', revenue: 201.6, revenueYoY: 7.4, grossMargin: 23.2, orderCount: 8950, fulfillmentRate: 92.5, avgDelivery: 2.8, complaintRate: 0.57, stockRisk: '中', overdueAmount: 58.1, status: '关注', owner: '林可', nextAction: '跟进回款承诺' },
];

const defaultColumnTree: ComplexTableColumnConfig[] = [
  { key: 'region', label: '大区', field: 'region', width: 74, fixed: 'left', align: 'center', filterable: true, definition: '一级区域维度', priority: 1 },
  { key: 'channel', label: '渠道', field: 'channel', width: 104, fixed: 'left', align: 'left', filterable: true, definition: '经营渠道或门店类型', priority: 1 },
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

const filterOptions = [
  { id: 'all', label: '全部' },
  { id: 'direct', label: '直营' },
  { id: 'dealer', label: '经销' },
  { id: 'risk', label: '预警' },
];

const rowKey = computed(() => props.rowKey ?? props.complexTableContract?.rowKey ?? 'recordId');
const columnTree = computed(() => props.columnTree?.length ? props.columnTree : defaultColumnTree);
const rawRows = computed(() => {
  if (props.rows?.length) {
    return props.rows;
  }

  return Array.isArray(props.data) && props.data.length ? props.data as ComplexTableRow[] : defaultRows;
});

const collectLeafColumns = (columns: ComplexTableColumnConfig[], depth = 1): Array<ComplexTableColumnConfig & { depth: number }> =>
  columns.flatMap((column) =>
    column.children?.length ? collectLeafColumns(column.children, depth + 1) : [{ ...column, depth }],
  );

const getMaxDepth = (columns: ComplexTableColumnConfig[], depth = 1): number =>
  columns.reduce((maxDepth, column) => Math.max(maxDepth, column.children?.length ? getMaxDepth(column.children, depth + 1) : depth), depth);

const getLeafCount = (column: ComplexTableColumnConfig): number =>
  column.children?.length ? column.children.reduce((count, child) => count + getLeafCount(child), 0) : 1;

const leafColumns = computed(() => collectLeafColumns(columnTree.value));
const leafColumnMap = computed(() =>
  Object.fromEntries(leafColumns.value.map((column) => [column.field ?? column.key, column])),
);
const maxDepth = computed(() => getMaxDepth(columnTree.value));
const leafColumnCount = computed(() => leafColumns.value.length);
const spanRules = computed(() =>
  columnTree.value.map((column) => ({
    key: column.key,
    colSpan: getLeafCount(column),
    rowSpan: column.children?.length ? 1 : maxDepth.value,
  })),
);

const fixedLeafColumns = computed(() => leafColumns.value.filter((column) => column.fixed === 'left'));
const looseLeafColumns = computed(() => columnTree.value.filter((column) => !column.children?.length && !column.fixed));
const groupedColumns = computed(() => columnTree.value.filter((column) => column.children?.length));
const componentLocalFilters = computed(() => filterOptions.map((option) => option.id));
const columnHeaderFilters = computed(() => leafColumns.value.filter((column) => column.filterable).map((column) => column.field ?? column.key));
const densityFallback = computed(() =>
  containerSize.value.width < 430 ? 'compact + horizontalScroll + columnSettings + fullscreen/detailRoute' : 'standard + horizontalScroll',
);
const paginationContract = computed(() => ({
  currentPage: 1,
  pageSize: visibleRowCount.value,
  virtual: 'component-height driven virtual row budget with table body scroll',
  loadMore: 'reserved for provider-backed detail rows',
}));

const tableContract = computed<Required<ComplexTableContract>>(() => ({
  rowKey: rowKey.value,
  primaryKey: rowKey.value,
  rowGrain: '大区 x 渠道经营明细',
  defaultSort: { field: sortState.value.prop, order: sortState.value.order ?? 'descending' },
  columnTree: 'groupedColumns with complexHeader and multiLevelHeader',
  leafColumns: leafColumns.value.map((column) => column.field ?? column.key),
  spanRules: {
    maxDepth: maxDepth.value,
    leafColumnCount: leafColumnCount.value,
    colSpan: 'computedSpan by getLeafCount(column)',
    rowSpan: 'leaf rowSpan fills maxDepth, group colSpan equals leafColumnCount under group',
  },
  frozenColumns: fixedLeafColumns.value.map((column) => column.label),
  localFilters: componentLocalFilters.value,
  columnHeaderFilters: columnHeaderFilters.value,
  tooltip: 'show-overflow-tooltip exposes unit, definition, formula and exact formatter value',
  densityFallback: `${densityFallback.value}; pagination pageSize=${paginationContract.value.pageSize}; virtual scroll keeps the fixed header readable`,
  detailRoute: props.complexTableContract?.detailRoute ?? '/reports/complex-table/detail',
  states: props.complexTableContract?.states ?? ['loading', 'empty', 'error', 'noPermission'],
}));

const filteredRows = computed(() => rawRows.value.filter((row) => {
  if (activeFilter.value === 'direct') {
    return String(row.channel).includes('直营');
  }

  if (activeFilter.value === 'dealer') {
    return String(row.channel).includes('经销');
  }

  if (activeFilter.value === 'risk') {
    return row.status === '预警' || row.stockRisk === '高';
  }

  return true;
}));

const displayRows = computed(() => {
  const rows = [...filteredRows.value];
  const { prop, order } = sortState.value;

  if (!prop || !order) {
    return rows;
  }

  return rows.sort((a, b) => {
    const left = a[prop];
    const right = b[prop];
    const leftNumber = Number(left);
    const rightNumber = Number(right);
    const result = Number.isFinite(leftNumber) && Number.isFinite(rightNumber)
      ? leftNumber - rightNumber
      : String(left ?? '').localeCompare(String(right ?? ''), 'zh-CN');

    return order === 'ascending' ? result : -result;
  });
});

const tableHeight = computed(() => Math.max(Math.floor(containerSize.value.height - 50), 112));
const rowHeight = computed(() => Math.round(Math.max(24, Math.min(32, tableHeight.value / 5.8))));
const visibleRowCount = computed(() => Math.max(1, Math.floor((tableHeight.value - 58) / rowHeight.value)));
const tableStyle = computed(() => ({
  '--complex-row-height': `${rowHeight.value}px`,
}));
const stateMessage = computed(() => {
  if (props.noPermission) {
    return { title: '暂无权限', message: 'noPermission：当前账号无法查看该复杂表。' };
  }

  if (props.errorText) {
    return { title: '加载失败', message: `error：${props.errorText}` };
  }

  if (props.loading) {
    return { title: '加载中', message: 'loading：正在加载复杂表数据。' };
  }

  return null;
});

const numberFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });
const integerFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 });

const formatCell = (row: ComplexTableRow, column: ComplexTableColumnConfig) => {
  const value = row[column.field ?? column.key];

  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numericValue = Number(value);

  if (column.formatter === 'currency' && Number.isFinite(numericValue)) {
    return `${numberFormatter.format(numericValue)}万`;
  }

  if (column.formatter === 'percent' && Number.isFinite(numericValue)) {
    return `${numberFormatter.format(numericValue)}%`;
  }

  if (column.formatter === 'duration' && Number.isFinite(numericValue)) {
    return `${numberFormatter.format(numericValue)}天`;
  }

  if (column.formatter === 'number' && Number.isFinite(numericValue)) {
    return integerFormatter.format(numericValue);
  }

  return String(value);
};

const getColumnTitle = (column: ComplexTableColumnConfig) =>
  [column.definition, column.unit ? `单位：${column.unit}` : '', column.formula ? `公式：${column.formula}` : '']
    .filter(Boolean)
    .join('；');

const getColumnFilters = (column: ComplexTableColumnConfig) => {
  if (!column.filterable || !column.field) {
    return undefined;
  }

  return Array.from(new Set(rawRows.value.map((row) => row[column.field ?? column.key]).filter((value) => value !== undefined && value !== null)))
    .map((value) => ({ text: String(value), value: String(value) }));
};

const filterTableColumn = (value: string, row: ComplexTableRow, column: { property?: string }) =>
  String(row[column.property ?? '']) === value;

const handleSortChange = ({ prop, order }: { prop: string | null; order: 'ascending' | 'descending' | null }) => {
  sortState.value = {
    prop: prop ?? sortState.value.prop,
    order: order ?? null,
  };
};

const getStatusType = (status: unknown) => {
  if (status === '健康' || status === '低') {
    return 'success';
  }

  if (status === '预警' || status === '高') {
    return 'danger';
  }

  return 'warning';
};

const getCellClassName = ({ column }: { column: { property?: string } }) => {
  const config = leafColumnMap.value[column.property ?? ''];

  return [
    config?.formatter === 'status' ? 'complex-table-status-cell' : '',
    config?.formatter === 'percent' ? 'complex-table-percent-cell' : '',
  ].filter(Boolean).join(' ');
};

const handleRowClick = (row: ComplexTableRow) => {
  emit('dashboard-action', {
    name: 'rowDetail',
    payload: {
      rowKey: row[rowKey.value],
      row,
      detailRoute: tableContract.value.detailRoute,
    },
  });
};

const updateSize = () => {
  if (!rootRef.value) {
    return;
  }

  const rect = rootRef.value.getBoundingClientRect();
  containerSize.value = {
    width: Math.max(rect.width, 0),
    height: Math.max(rect.height, 0),
  };
};

onMounted(() => {
  if (!rootRef.value) {
    return;
  }

  resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(rootRef.value);
  updateSize();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
});
</script>

<template>
  <div ref="rootRef" class="complex-table-widget" :style="tableStyle">
    <div class="complex-table-toolbar">
      <div class="complex-table-filter-group" role="group" aria-label="组件内局部筛选">
        <button
          v-for="option in filterOptions"
          :key="option.id"
          type="button"
          :class="{ active: activeFilter === option.id }"
          @click="activeFilter = option.id"
        >
          {{ option.label }}
        </button>
      </div>
      <span class="complex-table-meta" :title="JSON.stringify(tableContract.spanRules)">
        {{ leafColumnCount }}列 · 冻结{{ fixedLeafColumns.length }}列
      </span>
    </div>

    <div class="complex-table-shell">
      <div v-if="stateMessage" class="complex-table-state">
        <strong>{{ stateMessage.title }}</strong>
        <span>{{ stateMessage.message }}</span>
      </div>

      <ElTable
        v-else
        class="complex-table"
        :data="displayRows"
        :height="tableHeight"
        :row-key="rowKey"
        :cell-class-name="getCellClassName"
        border
        stripe
        size="small"
        :empty-text="emptyText ?? '暂无数据'"
        @sort-change="handleSortChange"
        @row-click="handleRowClick"
      >
        <ElTableColumn
          v-for="column in fixedLeafColumns"
          :key="column.key"
          :prop="column.field ?? column.key"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :align="column.align ?? 'center'"
          header-align="center"
          :fixed="column.fixed"
          :sortable="column.sortable ? 'custom' : false"
          :filters="getColumnFilters(column)"
          :filter-method="column.filterable ? filterTableColumn : undefined"
          :show-overflow-tooltip="column.ellipsis ?? true"
        >
          <template #header>
            <span class="complex-table-header-label" :title="getColumnTitle(column)">
              {{ column.label }}
            </span>
          </template>
          <template #default="{ row }">
            <span class="complex-table-cell-text">{{ formatCell(row, column) }}</span>
          </template>
        </ElTableColumn>

        <ElTableColumn
          v-for="group in groupedColumns"
          :key="group.key"
          :label="group.label"
          align="center"
          header-align="center"
        >
          <ElTableColumn
            v-for="column in group.children"
            :key="column.key"
            :prop="column.field ?? column.key"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth"
            :align="column.align ?? 'center'"
            header-align="center"
            :sortable="column.sortable ? 'custom' : false"
            :filters="getColumnFilters(column)"
            :filter-method="column.filterable ? filterTableColumn : undefined"
            :show-overflow-tooltip="column.ellipsis ?? true"
          >
            <template #header>
              <span class="complex-table-header-label" :title="getColumnTitle(column)">
                {{ column.label }}
                <small v-if="column.unit">{{ column.unit }}</small>
              </span>
            </template>
            <template #default="{ row }">
              <ElTag
                v-if="column.formatter === 'status'"
                :type="getStatusType(row[column.field ?? column.key])"
                effect="light"
                round
                size="small"
              >
                {{ formatCell(row, column) }}
              </ElTag>
              <span v-else class="complex-table-cell-text">{{ formatCell(row, column) }}</span>
            </template>
          </ElTableColumn>
        </ElTableColumn>

        <ElTableColumn
          v-for="column in looseLeafColumns"
          :key="column.key"
          :prop="column.field ?? column.key"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :align="column.align ?? 'center'"
          header-align="center"
          :sortable="column.sortable ? 'custom' : false"
          :filters="getColumnFilters(column)"
          :filter-method="column.filterable ? filterTableColumn : undefined"
          :show-overflow-tooltip="column.ellipsis ?? true"
        >
          <template #default="{ row }">
            <span class="complex-table-cell-text">{{ formatCell(row, column) }}</span>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>

    <footer class="complex-table-footer">
      <span>可见{{ Math.max(0, visibleRowCount) }}行</span>
      <span :title="paginationContract.virtual">{{ densityFallback }}</span>
    </footer>
  </div>
</template>

<style scoped>
.complex-table-widget {
  container-type: size;
  display: grid;
  grid-template-rows: 24px minmax(0, 1fr) 18px;
  gap: 4px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: #163252;
}

.complex-table-toolbar,
.complex-table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  min-height: 0;
  gap: 6px;
  color: rgba(22, 50, 82, 0.76);
  font-size: clamp(10px, 4.2cqh, 12px);
  font-weight: 750;
  line-height: 1;
}

.complex-table-filter-group {
  display: flex;
  min-width: 0;
  gap: 3px;
}

.complex-table-filter-group button {
  height: 20px;
  min-width: 0;
  padding: 0 7px;
  border: 1px solid rgba(0, 74, 198, 0.18);
  border-radius: 999px;
  color: #1d4f91;
  background: rgba(255, 255, 255, 0.58);
  font-size: inherit;
  font-weight: 850;
  line-height: 1;
  cursor: pointer;
}

.complex-table-filter-group button.active {
  border-color: rgba(0, 74, 198, 0.34);
  color: #ffffff;
  background: linear-gradient(135deg, #005bd8, #2b87ff);
  box-shadow: 0 5px 12px rgba(0, 74, 198, 0.16);
}

.complex-table-meta,
.complex-table-footer span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.complex-table-shell {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(0, 74, 198, 0.13);
  background: rgba(255, 255, 255, 0.42);
}

.complex-table-state {
  display: grid;
  place-content: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  color: #1d4f91;
  text-align: center;
}

.complex-table-state strong {
  color: #063d8e;
  font-size: 14px;
}

.complex-table-state span {
  color: rgba(22, 50, 82, 0.72);
  font-size: 12px;
}

.complex-table {
  width: 100%;
  height: 100%;
  --el-table-border-color: rgba(0, 74, 198, 0.11);
  --el-table-header-bg-color: rgba(232, 242, 255, 0.94);
  --el-table-tr-bg-color: rgba(255, 255, 255, 0.48);
  --el-table-row-hover-bg-color: rgba(0, 91, 216, 0.08);
  --el-table-text-color: #183552;
  --el-table-header-text-color: #143c72;
}

.complex-table-header-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  gap: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
}

.complex-table-header-label small {
  color: #4f78ac;
  font-size: 0.82em;
  font-weight: 750;
}

.complex-table-cell-text {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
}

:deep(.el-table) {
  background: transparent;
  font-size: clamp(10px, 4.5cqh, 12px);
}

:deep(.el-table__inner-wrapper::before) {
  display: none;
}

:deep(.el-table__header th) {
  height: 27px;
  padding: 0;
  background:
    linear-gradient(180deg, rgba(243, 248, 255, 0.98), rgba(226, 239, 255, 0.92));
  color: #143c72;
  text-align: center;
  vertical-align: middle;
  font-weight: 900;
}

:deep(.el-table__header th .cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 0 6px;
  line-height: 1.1;
}

:deep(.el-table__body td) {
  height: var(--complex-row-height);
  padding: 0;
  border-color: rgba(0, 74, 198, 0.08);
  background: rgba(255, 255, 255, 0.38);
  font-weight: 720;
}

:deep(.el-table__body td .cell) {
  min-height: calc(var(--complex-row-height) - 2px);
  padding: 0 7px;
  line-height: calc(var(--complex-row-height) - 2px);
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: rgba(234, 244, 255, 0.34);
}

:deep(.el-table__fixed),
:deep(.el-table__fixed-right) {
  box-shadow: 8px 0 12px rgba(0, 74, 198, 0.08);
}

:deep(.complex-table-percent-cell .cell) {
  color: #005bd8;
  font-weight: 850;
}

:deep(.complex-table-status-cell .cell) {
  line-height: 1;
}

:deep(.el-tag) {
  min-width: 42px;
  justify-content: center;
  border: 0;
  font-weight: 850;
}

@container (max-width: 430px) {
  .complex-table-widget {
    grid-template-rows: 22px minmax(0, 1fr) 16px;
    gap: 3px;
  }

  .complex-table-filter-group button {
    padding: 0 5px;
  }

  :deep(.el-table__header th .cell),
  :deep(.el-table__body td .cell) {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
