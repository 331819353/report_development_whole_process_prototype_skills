<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import type { WidgetContext } from '../types';

interface PivotMetaConfig {
  field: string;
  name: string;
  unit?: string;
}

interface PivotContractConfig {
  rowDimensions?: string[];
  columnDimensions?: string[];
  measures?: string[];
  aggregation?: 'SUM' | 'AVG' | 'COUNT' | 'MIN' | 'MAX';
  rateFormula?: string;
  subtotal?: boolean;
  grandTotal?: boolean;
  frozen?: string;
  tooltip?: string;
  drilldown?: string;
  states?: string[];
}

interface PivotRow extends Record<string, string | number | boolean | undefined> {
  rowId: string;
  region: string;
  channel: string;
  isSubtotal?: boolean;
  isGrandTotal?: boolean;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  rowFields?: string[];
  columnFields?: string[];
  valueFields?: string[];
  rawData?: Record<string, unknown>[];
  meta?: PivotMetaConfig[];
  valueInCols?: boolean;
  cornerText?: string;
  emptyText?: string;
  pivotContract?: PivotContractConfig;
  displayBudget?: Record<string, unknown>;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;

const defaultData: Record<string, unknown>[] = [
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

const defaultMeta: PivotMetaConfig[] = [
  { field: 'region', name: '大区' },
  { field: 'channel', name: '渠道' },
  { field: 'quarter', name: '季度' },
  { field: 'sales', name: '销售额', unit: '万元' },
  { field: 'margin', name: '毛利额', unit: '万元' },
];

const rowFields = computed(() => props.rowFields?.length ? props.rowFields : ['region', 'channel']);
const columnFields = computed(() => props.columnFields?.length ? props.columnFields : ['quarter']);
const valueFields = computed(() => props.valueFields?.length ? props.valueFields : ['sales', 'margin']);
const sourceData = computed(() => {
  const propData = props.rawData?.length ? props.rawData : props.data as Record<string, unknown>[] | undefined;

  return propData?.length ? propData : defaultData;
});
const metaConfig = computed(() => props.meta?.length ? props.meta : defaultMeta);
const numberFormatter = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 });

const getFieldName = (field: string) => metaConfig.value.find((item) => item.field === field)?.name ?? field;
const getFieldUnit = (field: string) => metaConfig.value.find((item) => item.field === field)?.unit ?? '';

const columnValues = computed(() => {
  const columnField = columnFields.value[0] ?? 'quarter';
  return Array.from(new Set(sourceData.value.map((row) => String(row[columnField] ?? '-'))));
});

const aggregateRows = (rows: Record<string, unknown>[], field: string) =>
  rows.reduce((sum, row) => {
    const value = Number(row[field]);
    return Number.isFinite(value) ? sum + value : sum;
  }, 0);

const buildPivotRow = (rows: Record<string, unknown>[], rowId: string, labels: Record<string, string>, flags: Partial<PivotRow> = {}): PivotRow => {
  const result: PivotRow = {
    rowId,
    region: labels.region ?? '',
    channel: labels.channel ?? '',
    ...flags,
  };
  const columnField = columnFields.value[0] ?? 'quarter';

  columnValues.value.forEach((columnValue) => {
    const scopedRows = rows.filter((row) => String(row[columnField] ?? '-') === columnValue);
    valueFields.value.forEach((field) => {
      result[`${columnValue}__${field}`] = aggregateRows(scopedRows, field);
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
  const rows: PivotRow[] = [];

  Array.from(new Set(sourceData.value.map((row) => String(row[regionField] ?? '-')))).forEach((region) => {
    const regionRows = sourceData.value.filter((row) => String(row[regionField] ?? '-') === region);

    Array.from(new Set(regionRows.map((row) => String(row[channelField] ?? '-')))).forEach((channel) => {
      const channelRows = regionRows.filter((row) => String(row[channelField] ?? '-') === channel);
      rows.push(buildPivotRow(channelRows, `${region}-${channel}`, { region, channel }));
    });

    if (props.pivotContract?.subtotal ?? true) {
      rows.push(buildPivotRow(regionRows, `${region}-subtotal`, { region, channel: '小计' }, { isSubtotal: true }));
    }
  });

  if (props.pivotContract?.grandTotal ?? true) {
    rows.push(buildPivotRow(sourceData.value, 'grand-total', { region: '总计', channel: '' }, { isGrandTotal: true }));
  }

  return rows;
});

const tableHeight = computed(() => Math.max(Math.floor(containerSize.value.height), 120));
const rowHeight = computed(() => Math.round(Math.max(26, Math.min(32, tableHeight.value / 6.3))));
const tableStyle = computed(() => ({
  '--pivot-row-height': `${rowHeight.value}px`,
}));

const formatMetric = (field: string, value: unknown) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return '-';
  }

  const unit = getFieldUnit(field);
  return `${numberFormatter.format(numericValue)}${unit ? ` ${unit}` : ''}`;
};

const getRowClassName = ({ row }: { row: PivotRow }) => {
  if (row.isGrandTotal) {
    return 'element-pivot-row-grand-total';
  }

  if (row.isSubtotal) {
    return 'element-pivot-row-subtotal';
  }

  return '';
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
  <section ref="rootRef" class="element-pivot-widget" :style="tableStyle" aria-label="Element Plus 透视表">
    <ElTable
      class="element-pivot-table"
      :data="pivotRows"
      :height="tableHeight"
      row-key="rowId"
      :row-class-name="getRowClassName"
      border
      stripe
      size="small"
      :empty-text="emptyText ?? '暂无透视数据'"
    >
      <ElTableColumn
        prop="region"
        :label="getFieldName(rowFields[0] ?? 'region')"
        width="82"
        fixed="left"
        align="center"
        header-align="center"
        show-overflow-tooltip
      />
      <ElTableColumn
        prop="channel"
        :label="getFieldName(rowFields[1] ?? 'channel')"
        width="96"
        fixed="left"
        align="left"
        header-align="center"
        show-overflow-tooltip
      />
      <ElTableColumn
        v-for="columnValue in columnValues"
        :key="columnValue"
        :label="columnValue"
        align="center"
        header-align="center"
      >
        <ElTableColumn
          v-for="field in valueFields"
          :key="`${columnValue}-${field}`"
          :prop="`${columnValue}__${field}`"
          :label="getFieldName(field)"
          width="104"
          align="right"
          header-align="center"
          sortable
          show-overflow-tooltip
        >
          <template #header>
            <span class="element-pivot-header-label" :title="`${getFieldName(field)}，单位：${getFieldUnit(field)}`">
              {{ getFieldName(field) }}
              <small v-if="getFieldUnit(field)">{{ getFieldUnit(field) }}</small>
            </span>
          </template>
          <template #default="{ row }">
            <span class="element-pivot-number">{{ formatMetric(field, row[`${columnValue}__${field}`]) }}</span>
          </template>
        </ElTableColumn>
      </ElTableColumn>
      <ElTableColumn label="总计" align="center" header-align="center">
        <ElTableColumn
          v-for="field in valueFields"
          :key="`total-${field}`"
          :prop="`total__${field}`"
          :label="getFieldName(field)"
          width="108"
          align="right"
          header-align="center"
          sortable
          show-overflow-tooltip
        >
          <template #header>
            <span class="element-pivot-header-label" :title="`${getFieldName(field)}，单位：${getFieldUnit(field)}`">
              {{ getFieldName(field) }}
              <small v-if="getFieldUnit(field)">{{ getFieldUnit(field) }}</small>
            </span>
          </template>
          <template #default="{ row }">
            <span class="element-pivot-number">{{ formatMetric(field, row[`total__${field}`]) }}</span>
          </template>
        </ElTableColumn>
      </ElTableColumn>
    </ElTable>
  </section>
</template>

<style scoped>
.element-pivot-widget {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(0, 74, 198, 0.13);
  background: rgba(255, 255, 255, 0.42);
}

.element-pivot-table {
  width: 100%;
  height: 100%;
  --el-table-border-color: rgba(0, 74, 198, 0.1);
  --el-table-header-bg-color: rgba(232, 242, 255, 0.96);
  --el-table-tr-bg-color: rgba(255, 255, 255, 0.48);
  --el-table-row-hover-bg-color: rgba(0, 91, 216, 0.08);
  --el-table-text-color: #183552;
  --el-table-header-text-color: #143c72;
}

.element-pivot-header-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  gap: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.element-pivot-header-label small {
  color: #4f78ac;
  font-size: 0.82em;
  font-weight: 750;
}

.element-pivot-number {
  display: inline-block;
  width: 100%;
  text-align: right;
  font-variant-numeric: tabular-nums;
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
  height: var(--pivot-row-height);
  padding: 0;
  border-color: rgba(0, 74, 198, 0.08);
  background: rgba(255, 255, 255, 0.38);
  font-weight: 720;
}

:deep(.el-table__body td .cell) {
  min-height: calc(var(--pivot-row-height) - 2px);
  padding: 0 7px;
  line-height: calc(var(--pivot-row-height) - 2px);
}

:deep(.element-pivot-row-subtotal td) {
  background: rgba(0, 91, 216, 0.07) !important;
  color: #063d8e;
  font-weight: 900;
}

:deep(.element-pivot-row-grand-total td) {
  background: rgba(0, 74, 198, 0.13) !important;
  color: #062e72;
  font-weight: 950;
}

:deep(.el-table__fixed),
:deep(.el-table__fixed-right) {
  box-shadow: 8px 0 12px rgba(0, 74, 198, 0.08);
}
</style>
