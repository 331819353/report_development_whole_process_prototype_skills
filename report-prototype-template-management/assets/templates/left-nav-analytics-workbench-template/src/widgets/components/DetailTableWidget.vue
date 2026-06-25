<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { ElTable, ElTableColumn, ElTag } from 'element-plus';
import type { DashboardWidgetActionEvent } from '../../types/actions';
import type { WidgetContext } from '../types';

type DetailColumnAlign = 'left' | 'center' | 'right';
type DetailColumnType = 'text' | 'number' | 'currency' | 'percent' | 'status' | 'operation';

interface DetailTableColumn {
  key: string;
  label: string;
  field: string;
  width?: number;
  minWidth?: number;
  align?: DetailColumnAlign;
  fixed?: 'left' | 'right';
  sortable?: boolean;
  type?: DetailColumnType;
  formatter?: DetailColumnType;
  unit?: string;
  priority?: number;
  ellipsis?: boolean;
}

interface DetailTableRow extends Record<string, string | number | null | undefined> {
  orderId: string;
  customerName: string;
}

interface DetailTableContract {
  rowKey?: string;
  primaryKey?: string;
  rowGrain?: string;
  defaultSort?: { field: string; order: 'ascending' | 'descending' };
  visibleColumns?: string[];
  columnPriority?: Record<string, number>;
  columnSettings?: string;
  maxVisibleColumns?: number;
  hiddenColumns?: string[];
  pageSize?: number;
  currentPage?: number;
  pagination?: string;
  virtual?: string;
  loadMore?: string;
  search?: string;
  keyword?: string;
  query?: string;
  filterFields?: string[];
  localFilter?: string;
  exportScope?: string;
  exportRows?: string;
  detail?: string;
  rowDetail?: string;
  drawer?: string;
  onRowClick?: string;
  operation?: string;
  actions?: string[];
  states?: Array<'loading' | 'empty' | 'error' | 'noPermission'>;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  rows?: DetailTableRow[];
  tableColumns?: DetailTableColumn[];
  rowKey?: string;
  emptyText?: string;
  loading?: boolean;
  errorText?: string;
  noPermission?: boolean;
  detailTableContract?: DetailTableContract;
  displayBudget?: Record<string, unknown>;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const keyword = ref('');
const activeStatus = ref('all');
const currentPage = ref(1);
const sortState = ref<{ prop: string; order: 'ascending' | 'descending' | null }>({
  prop: props.detailTableContract?.defaultSort?.field ?? 'amount',
  order: props.detailTableContract?.defaultSort?.order ?? 'descending',
});
let resizeObserver: ResizeObserver | null = null;

const defaultRows: DetailTableRow[] = [
  { orderId: 'SO-240601', customerName: '海尔智家旗舰店', region: '华东', channel: '线上直营', productLine: '冰箱', amount: 128.6, grossMargin: 27.8, status: '已完成', owner: '王晨', updatedAt: '06-21' },
  { orderId: 'SO-240602', customerName: '华南区域门店', region: '华南', channel: '门店', productLine: '洗衣机', amount: 96.4, grossMargin: 23.1, status: '进行中', owner: '周琳', updatedAt: '06-20' },
  { orderId: 'SO-240603', customerName: '北区经销商 A', region: '华北', channel: '经销商', productLine: '空调', amount: 74.2, grossMargin: 19.5, status: '关注', owner: '赵岩', updatedAt: '06-19' },
  { orderId: 'SO-240604', customerName: '海外直营网点', region: '海外', channel: '线上直营', productLine: '厨电', amount: 83.8, grossMargin: 25.4, status: '进行中', owner: '何嘉', updatedAt: '06-19' },
  { orderId: 'SO-240605', customerName: '华东经销商 B', region: '华东', channel: '经销商', productLine: '热水器', amount: 66.9, grossMargin: 20.2, status: '预警', owner: '刘敏', updatedAt: '06-18' },
  { orderId: 'SO-240606', customerName: '华北区域门店', region: '华北', channel: '门店', productLine: '冰箱', amount: 58.1, grossMargin: 18.7, status: '预警', owner: '孙悦', updatedAt: '06-18' },
  { orderId: 'SO-240607', customerName: '海外经销商 C', region: '海外', channel: '经销商', productLine: '空调', amount: 102.5, grossMargin: 22.6, status: '已完成', owner: '林可', updatedAt: '06-17' },
  { orderId: 'SO-240608', customerName: '华南直营网点', region: '华南', channel: '线上直营', productLine: '洗衣机', amount: 118.9, grossMargin: 28.6, status: '已完成', owner: '陈卓', updatedAt: '06-17' },
  { orderId: 'SO-240609', customerName: '重点 KA 客户', region: '华东', channel: '线上直营', productLine: '厨电', amount: 149.3, grossMargin: 30.1, status: '进行中', owner: '王晨', updatedAt: '06-16' },
];

const defaultColumns: DetailTableColumn[] = [
  { key: 'orderId', label: '订单号', field: 'orderId', width: 108, align: 'center', fixed: 'left', sortable: true, type: 'text', priority: 1, ellipsis: true },
  { key: 'customerName', label: '客户', field: 'customerName', width: 126, align: 'left', fixed: 'left', sortable: true, type: 'text', priority: 1, ellipsis: true },
  { key: 'region', label: '大区', field: 'region', width: 70, align: 'center', sortable: true, type: 'text', priority: 2 },
  { key: 'channel', label: '渠道', field: 'channel', width: 92, align: 'center', sortable: true, type: 'text', priority: 2 },
  { key: 'productLine', label: '品类', field: 'productLine', width: 76, align: 'center', sortable: true, type: 'text', priority: 3 },
  { key: 'amount', label: '金额', field: 'amount', width: 86, align: 'right', sortable: true, type: 'currency', formatter: 'currency', unit: '万元', priority: 1 },
  { key: 'grossMargin', label: '毛利率', field: 'grossMargin', width: 78, align: 'right', sortable: true, type: 'percent', formatter: 'percent', unit: '%', priority: 2 },
  { key: 'status', label: '状态', field: 'status', width: 76, align: 'center', sortable: true, type: 'status', formatter: 'status', priority: 1 },
  { key: 'owner', label: '负责人', field: 'owner', width: 76, align: 'center', sortable: true, type: 'text', priority: 3 },
  { key: 'updatedAt', label: '更新', field: 'updatedAt', width: 70, align: 'center', sortable: true, type: 'text', priority: 4 },
  { key: 'operation', label: '操作', field: 'operation', width: 72, align: 'center', fixed: 'right', type: 'operation', priority: 1 },
];

const statusOptions = [
  { id: 'all', label: '全部' },
  { id: '已完成', label: '完成' },
  { id: '进行中', label: '进行' },
  { id: '预警', label: '预警' },
];

const rowKey = computed(() => props.rowKey ?? props.detailTableContract?.rowKey ?? 'orderId');
const tableColumns = computed(() => props.tableColumns?.length ? props.tableColumns : defaultColumns);
const rawRows = computed(() => {
  if (props.rows?.length) {
    return props.rows;
  }

  return Array.isArray(props.data) && props.data.length ? props.data as DetailTableRow[] : defaultRows;
});

const pageSize = computed(() => Math.max(3, Math.floor((tableHeight.value - 58) / rowHeight.value)));
const visibleColumns = computed(() => tableColumns.value.filter((column) => !props.detailTableContract?.hiddenColumns?.includes(column.key)));
const columnPriority = computed(() =>
  Object.fromEntries(tableColumns.value.map((column) => [column.key, column.priority ?? 9])),
);
const detailTableContract = computed<Required<DetailTableContract>>(() => ({
  rowKey: rowKey.value,
  primaryKey: rowKey.value,
  rowGrain: '订单明细，一行一订单',
  defaultSort: { field: sortState.value.prop, order: sortState.value.order ?? 'descending' },
  visibleColumns: visibleColumns.value.map((column) => column.key),
  columnPriority: columnPriority.value,
  columnSettings: 'low-priority columns move to columnSettings or detail drawer when compact',
  maxVisibleColumns: props.detailTableContract?.maxVisibleColumns ?? 7,
  hiddenColumns: props.detailTableContract?.hiddenColumns ?? [],
  pageSize: pageSize.value,
  currentPage: currentPage.value,
  pagination: 'local pagination with table body scroll',
  virtual: 'height-driven virtual row budget',
  loadMore: 'reserved for provider pagination',
  search: keyword.value,
  keyword: keyword.value,
  query: keyword.value,
  filterFields: ['orderId', 'customerName', 'region', 'channel', 'productLine', 'owner'],
  localFilter: activeStatus.value,
  exportScope: 'filteredRows',
  exportRows: 'current filtered detail rows',
  detail: 'row detail',
  rowDetail: 'rowDetail dashboard-action',
  drawer: 'reserved detail drawer',
  onRowClick: 'emits rowDetail',
  operation: 'view row detail',
  actions: ['rowDetail'],
  states: ['loading', 'empty', 'error', 'noPermission'],
}));

const filteredRows = computed(() => {
  const normalizedKeyword = keyword.value.trim().toLowerCase();

  return rawRows.value.filter((row) => {
    const matchesStatus = activeStatus.value === 'all' || row.status === activeStatus.value;
    const matchesKeyword = !normalizedKeyword || detailTableContract.value.filterFields.some((field) =>
      String(row[field] ?? '').toLowerCase().includes(normalizedKeyword),
    );

    return matchesStatus && matchesKeyword;
  });
});

const sortedRows = computed(() => {
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

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return sortedRows.value.slice(start, start + pageSize.value);
});

const tableHeight = computed(() => Math.max(Math.floor(containerSize.value.height - 54), 112));
const rowHeight = computed(() => Math.round(Math.max(26, Math.min(32, tableHeight.value / 5.8))));
const tableStyle = computed(() => ({
  '--detail-row-height': `${rowHeight.value}px`,
}));
const pageCount = computed(() => Math.max(1, Math.ceil(sortedRows.value.length / pageSize.value)));
const stateMessage = computed(() => {
  if (props.noPermission) {
    return { title: '暂无权限', message: 'noPermission：当前账号无法查看明细表。' };
  }

  if (props.errorText) {
    return { title: '加载失败', message: `error：${props.errorText}` };
  }

  if (props.loading) {
    return { title: '加载中', message: 'loading：正在加载明细表。' };
  }

  return null;
});

const numberFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 });

const formatCell = (row: DetailTableRow, column: DetailTableColumn) => {
  const value = row[column.field];
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

  return String(value);
};

const asDetailRow = (row: unknown) => row as DetailTableRow;

const getStatusType = (status: unknown) => {
  if (status === '已完成') {
    return 'success';
  }

  if (status === '预警') {
    return 'danger';
  }

  return 'warning';
};

const handleSortChange = ({ prop, order }: { prop: string | null; order: 'ascending' | 'descending' | null }) => {
  sortState.value = {
    prop: prop ?? sortState.value.prop,
    order: order ?? null,
  };
};

const handleRowClick = (row: DetailTableRow) => {
  emit('dashboard-action', {
    name: 'rowDetail',
    payload: {
      rowKey: row[rowKey.value],
      row,
      drawer: detailTableContract.value.drawer,
    },
  });
};

const goPage = (direction: -1 | 1) => {
  currentPage.value = Math.min(Math.max(currentPage.value + direction, 1), pageCount.value);
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
  <div ref="rootRef" class="detail-table-widget" :style="tableStyle">
    <div class="detail-table-toolbar">
      <input v-model="keyword" class="detail-table-search" type="search" placeholder="搜索订单/客户" aria-label="搜索明细表" />
      <div class="detail-table-filter-group" role="group" aria-label="状态局部筛选">
        <button
          v-for="option in statusOptions"
          :key="option.id"
          type="button"
          :class="{ active: activeStatus === option.id }"
          @click="activeStatus = option.id; currentPage = 1"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div class="detail-table-shell">
      <div v-if="stateMessage" class="detail-table-state">
        <strong>{{ stateMessage.title }}</strong>
        <span>{{ stateMessage.message }}</span>
      </div>

      <ElTable
        v-else
        class="detail-table"
        :data="pagedRows"
        :height="tableHeight"
        :row-key="rowKey"
        border
        stripe
        size="small"
        :empty-text="emptyText ?? '暂无明细数据'"
        @sort-change="handleSortChange"
        @row-click="handleRowClick"
      >
        <ElTableColumn
          v-for="column in visibleColumns"
          :key="column.key"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :align="column.align ?? 'center'"
          header-align="center"
          :fixed="column.fixed"
          :sortable="column.sortable ? 'custom' : false"
          :show-overflow-tooltip="column.ellipsis ?? true"
        >
          <template #header>
            <span class="detail-table-header-label" :title="column.unit ? `${column.label}，单位：${column.unit}` : column.label">
              {{ column.label }}
              <small v-if="column.unit">{{ column.unit }}</small>
            </span>
          </template>
          <template #default="{ row }">
            <button
              v-if="column.type === 'operation'"
              type="button"
              class="detail-table-link"
              @click.stop="handleRowClick(asDetailRow(row))"
            >
              查看
            </button>
            <ElTag
              v-else-if="column.formatter === 'status'"
              :type="getStatusType(asDetailRow(row)[column.field])"
              effect="light"
              round
              size="small"
            >
              {{ formatCell(asDetailRow(row), column) }}
            </ElTag>
            <span v-else class="detail-table-cell-text" :class="{ numeric: column.align === 'right' }">
              {{ formatCell(asDetailRow(row), column) }}
            </span>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>

    <footer class="detail-table-footer">
      <span>第{{ currentPage }}/{{ pageCount }}页 · {{ sortedRows.length }}行</span>
      <span class="detail-table-pager">
        <button type="button" :disabled="currentPage <= 1" @click="goPage(-1)">上一页</button>
        <button type="button" :disabled="currentPage >= pageCount" @click="goPage(1)">下一页</button>
      </span>
    </footer>
  </div>
</template>

<style scoped>
.detail-table-widget {
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

.detail-table-toolbar,
.detail-table-footer {
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

.detail-table-search {
  width: min(118px, 36%);
  height: 20px;
  min-width: 84px;
  padding: 0 8px;
  border: 1px solid rgba(0, 74, 198, 0.18);
  border-radius: 999px;
  outline: none;
  color: #183552;
  background: rgba(255, 255, 255, 0.72);
  font: inherit;
}

.detail-table-filter-group,
.detail-table-pager {
  display: flex;
  min-width: 0;
  gap: 3px;
}

.detail-table-filter-group button,
.detail-table-pager button {
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

.detail-table-filter-group button.active {
  border-color: rgba(0, 74, 198, 0.34);
  color: #ffffff;
  background: linear-gradient(135deg, #005bd8, #2b87ff);
}

.detail-table-pager button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.detail-table-shell {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(0, 74, 198, 0.13);
  background: rgba(255, 255, 255, 0.42);
}

.detail-table-state {
  display: grid;
  place-content: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  color: #1d4f91;
  text-align: center;
}

.detail-table {
  width: 100%;
  height: 100%;
  --el-table-border-color: rgba(0, 74, 198, 0.1);
  --el-table-header-bg-color: rgba(232, 242, 255, 0.96);
  --el-table-tr-bg-color: rgba(255, 255, 255, 0.48);
  --el-table-row-hover-bg-color: rgba(0, 91, 216, 0.08);
  --el-table-text-color: #183552;
  --el-table-header-text-color: #143c72;
}

.detail-table-header-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  gap: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-table-header-label small {
  color: #4f78ac;
  font-size: 0.82em;
  font-weight: 750;
}

.detail-table-cell-text {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: nowrap;
}

.detail-table-cell-text.numeric {
  width: 100%;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.detail-table-link {
  padding: 0;
  border: 0;
  color: #005bd8;
  background: transparent;
  font: inherit;
  font-weight: 900;
  cursor: pointer;
}

:deep(.el-table) {
  background: transparent;
  font-size: clamp(10px, 4.5cqh, 12px);
}

:deep(.el-table__inner-wrapper::before) {
  display: none;
}

:deep(.el-table__header th) {
  height: 28px;
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
  height: var(--detail-row-height);
  padding: 0;
  border-color: rgba(0, 74, 198, 0.08);
  background: rgba(255, 255, 255, 0.38);
  font-weight: 720;
}

:deep(.el-table__body td .cell) {
  min-height: calc(var(--detail-row-height) - 2px);
  padding: 0 7px;
  line-height: calc(var(--detail-row-height) - 2px);
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: rgba(234, 244, 255, 0.34);
}

:deep(.el-table__fixed),
:deep(.el-table__fixed-right) {
  box-shadow: 8px 0 12px rgba(0, 74, 198, 0.08);
}

:deep(.el-tag) {
  min-width: 42px;
  justify-content: center;
  border: 0;
  font-weight: 850;
}
</style>
