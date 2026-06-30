<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface HeatmapChartExampleCell {
  row: string;
  col: string;
  value: number | null;
}

interface HeatmapChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface HeatmapChartExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface HeatmapChartExampleLayoutConfig {
  paddingPx?: number;
  gapPx?: number;
  titleHeightPx?: number;
  contentGapPx?: number;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  horizontalAuxRatio?: number;
  horizontalChartRatio?: number;
  verticalAuxRatio?: number;
  verticalChartRatio?: number;
}

interface HeatmapChartExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface HeatmapChartExampleChartConfig {
  labelVisible?: boolean;
  axisVisible?: boolean;
  splitAreaVisible?: boolean;
  minValue?: number;
  maxValue?: number;
  valueDigits?: number;
  highThreshold?: number;
  gridTopPx?: number;
  gridBottomPx?: number;
  gridLeftPx?: number;
  gridRightPx?: number;
  cellBorderRadiusPx?: number;
}

interface HeatmapChartExampleToneConfig {
  low?: string;
  medium?: string;
  high?: string;
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  axis?: string;
  splitLine?: string;
  text?: string;
  unit?: string;
}

interface HeatmapChartExampleCardConfig {
  title?: HeatmapChartExampleTitleConfig;
  layout?: HeatmapChartExampleLayoutConfig;
  aux?: HeatmapChartExampleAuxConfig;
  chart?: HeatmapChartExampleChartConfig;
  tones?: HeatmapChartExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  rows?: string[];
  columns?: string[];
  cells?: HeatmapChartExampleCell[];
  auxMetrics?: HeatmapChartExampleAuxMetric[];
  config?: HeatmapChartExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const text = {
  title: '\u70ed\u529b\u56fe\u5361\u7247',
  unit: '\u5355\u4f4d\uff1a\u5206',
  noData: '\u6682\u65e0\u70ed\u529b\u6570\u636e',
  average: '\u5747\u503c',
  peak: '\u5cf0\u503c',
  highZone: '\u9ad8\u70ed\u533a',
  coverage: '\u8986\u76d6',
  low: '\u4f4e',
  high: '\u9ad8',
};

const defaultRows = ['\u6536\u5165', '\u5229\u6da6', '\u8d39\u7528', '\u5e93\u5b58'];
const defaultColumns = ['Q1', 'Q2', 'Q3', 'Q4'];
const defaultCells: HeatmapChartExampleCell[] = [
  { row: '\u6536\u5165', col: 'Q1', value: 72 },
  { row: '\u6536\u5165', col: 'Q2', value: 84 },
  { row: '\u6536\u5165', col: 'Q3', value: 91 },
  { row: '\u6536\u5165', col: 'Q4', value: 88 },
  { row: '\u5229\u6da6', col: 'Q1', value: 58 },
  { row: '\u5229\u6da6', col: 'Q2', value: 66 },
  { row: '\u5229\u6da6', col: 'Q3', value: 73 },
  { row: '\u5229\u6da6', col: 'Q4', value: 81 },
  { row: '\u8d39\u7528', col: 'Q1', value: 43 },
  { row: '\u8d39\u7528', col: 'Q2', value: 39 },
  { row: '\u8d39\u7528', col: 'Q3', value: 52 },
  { row: '\u8d39\u7528', col: 'Q4', value: 48 },
  { row: '\u5e93\u5b58', col: 'Q1', value: 61 },
  { row: '\u5e93\u5b58', col: 'Q2', value: 57 },
  { row: '\u5e93\u5b58', col: 'Q3', value: null },
  { row: '\u5e93\u5b58', col: 'Q4', value: 69 },
];

const defaultTitleConfig: Required<HeatmapChartExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<HeatmapChartExampleLayoutConfig> = {
  paddingPx: 5,
  gapPx: 2,
  titleHeightPx: 20,
  contentGapPx: 6,
  orientation: 'auto',
  horizontalAuxRatio: 1,
  horizontalChartRatio: 3,
  verticalAuxRatio: 1,
  verticalChartRatio: 2,
};

const defaultAuxConfig: Required<HeatmapChartExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
  labelFontSizePx: 9,
  valueFontSizePx: 12,
  labelColor: '#6b7c93',
  valueColor: '#0057d9',
};

const defaultChartConfig: Required<HeatmapChartExampleChartConfig> = {
  labelVisible: true,
  axisVisible: true,
  splitAreaVisible: true,
  minValue: 0,
  maxValue: 100,
  valueDigits: 0,
  highThreshold: 80,
  gridTopPx: 8,
  gridBottomPx: 18,
  gridLeftPx: 0,
  gridRightPx: 8,
  cellBorderRadiusPx: 3,
};

const defaultToneConfig: Required<HeatmapChartExampleToneConfig> = {
  low: '#eaf8ff',
  medium: '#69b7ff',
  high: '#0057d9',
  primary: '#0057d9',
  success: '#00a870',
  warning: '#e58a00',
  danger: '#d92d20',
  axis: '#6f8196',
  splitLine: 'rgba(0, 87, 217, 0.1)',
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

const uniqueStrings = (values: string[]) => Array.from(new Set(values.map((item) => item.trim()).filter(Boolean)));

const normalizeOrientation = (value: unknown): Required<HeatmapChartExampleLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const resolvedTitle = computed<Required<HeatmapChartExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<HeatmapChartExampleLayoutConfig>>(() => {
  const config = props.config?.layout ?? {};

  return {
    ...defaultLayoutConfig,
    ...config,
    paddingPx: clampNumber(config.paddingPx, 0, 24, defaultLayoutConfig.paddingPx),
    gapPx: clampNumber(config.gapPx, 0, 16, defaultLayoutConfig.gapPx),
    titleHeightPx: clampNumber(config.titleHeightPx, 16, 40, defaultLayoutConfig.titleHeightPx),
    contentGapPx: clampNumber(config.contentGapPx, 0, 18, defaultLayoutConfig.contentGapPx),
    orientation: normalizeOrientation(config.orientation),
    horizontalAuxRatio: clampNumber(config.horizontalAuxRatio, 0.5, 4, defaultLayoutConfig.horizontalAuxRatio),
    horizontalChartRatio: clampNumber(config.horizontalChartRatio, 0.5, 5, defaultLayoutConfig.horizontalChartRatio),
    verticalAuxRatio: clampNumber(config.verticalAuxRatio, 0.5, 4, defaultLayoutConfig.verticalAuxRatio),
    verticalChartRatio: clampNumber(config.verticalChartRatio, 0.5, 5, defaultLayoutConfig.verticalChartRatio),
  };
});

const resolvedAux = computed<Required<HeatmapChartExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<HeatmapChartExampleChartConfig>>(() => {
  const config = props.config?.chart ?? {};

  return {
    ...defaultChartConfig,
    ...config,
    valueDigits: Math.round(clampNumber(config.valueDigits, 0, 2, defaultChartConfig.valueDigits)),
    highThreshold: clampNumber(config.highThreshold, -100000, 100000, defaultChartConfig.highThreshold),
    gridTopPx: clampNumber(config.gridTopPx, 0, 40, defaultChartConfig.gridTopPx),
    gridBottomPx: clampNumber(config.gridBottomPx, 4, 44, defaultChartConfig.gridBottomPx),
    gridLeftPx: clampNumber(config.gridLeftPx, 0, 72, defaultChartConfig.gridLeftPx),
    gridRightPx: clampNumber(config.gridRightPx, 4, 42, defaultChartConfig.gridRightPx),
    cellBorderRadiusPx: clampNumber(config.cellBorderRadiusPx, 0, 8, defaultChartConfig.cellBorderRadiusPx),
    minValue: Number.isFinite(Number(config.minValue)) ? Number(config.minValue) : defaultChartConfig.minValue,
    maxValue: Number.isFinite(Number(config.maxValue)) ? Number(config.maxValue) : defaultChartConfig.maxValue,
  };
});

const resolvedTones = computed<Required<HeatmapChartExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const explicitCells = computed<HeatmapChartExampleCell[]>(() => {
  if (props.cells?.length) {
    return props.cells;
  }

  return (props.data ?? []).reduce<HeatmapChartExampleCell[]>((items, item, index) => {
    if (!isRecord(item)) {
      return items;
    }

    const rawValue = Array.isArray(item.value) ? item.value : [];
    const row = String(item.row ?? item.metric ?? item.name ?? item.label ?? rawValue[1] ?? '').trim();
    const col = String(item.col ?? item.column ?? item.period ?? item.category ?? rawValue[0] ?? '').trim();
    const value = Number(item.score ?? item.amount ?? item.value ?? rawValue[2]);

    if (!row || !col || !Number.isFinite(value)) {
      return items;
    }

    items.push({
      row,
      col,
      value,
    });

    return items;
  }, []);
});

const rows = computed(() => {
  if (props.rows?.length) {
    return uniqueStrings(props.rows);
  }

  const derivedRows = uniqueStrings(explicitCells.value.map((item) => item.row));

  return derivedRows.length ? derivedRows : defaultRows;
});

const columns = computed(() => {
  if (props.columns?.length) {
    return uniqueStrings(props.columns);
  }

  const derivedColumns = uniqueStrings(explicitCells.value.map((item) => item.col));

  return derivedColumns.length ? derivedColumns : defaultColumns;
});

const cells = computed(() => (explicitCells.value.length ? explicitCells.value : defaultCells));
const title = computed(() => props.title?.trim() || text.title);
const unit = computed(() => props.unit?.trim() || text.unit);
const valueUnit = computed(() => unit.value.replace(/^\u5355\u4f4d[:\uff1a]?/, '').trim());
const rowIndexByName = computed(() => new Map(rows.value.map((item, index) => [item, index])));
const columnIndexByName = computed(() => new Map(columns.value.map((item, index) => [item, index])));

const chartCells = computed(() =>
  cells.value
    .map((cell) => ({
      row: cell.row,
      col: cell.col,
      rowIndex: rowIndexByName.value.get(cell.row) ?? -1,
      columnIndex: columnIndexByName.value.get(cell.col) ?? -1,
      value: Number(cell.value),
    }))
    .filter((cell) => cell.rowIndex >= 0 && cell.columnIndex >= 0 && Number.isFinite(cell.value)),
);

const hasRenderableData = computed(() =>
  rows.value.length > 0 && columns.value.length > 0 && chartCells.value.length > 0,
);

const valueRange = computed(() => {
  const values = chartCells.value.map((item) => item.value).filter((value) => Number.isFinite(value));
  const dataMin = Math.min(...values, resolvedChart.value.minValue);
  const dataMax = Math.max(...values, resolvedChart.value.maxValue);
  const min = Math.min(resolvedChart.value.minValue, dataMin);
  const max = Math.max(resolvedChart.value.maxValue, dataMax);

  return {
    min,
    max: max > min ? max : min + 1,
  };
});

const formatNumber = (value: number | undefined, suffix = valueUnit.value) => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  const digits = resolvedChart.value.valueDigits;
  const numeric = Number(value);
  const rounded = digits > 0 ? numeric.toFixed(digits) : `${Math.round(numeric)}`;

  return `${rounded}${suffix}`;
};

const formatValueLabel = (value: number | undefined) => {
  if (!Number.isFinite(value)) {
    return '';
  }

  const digits = resolvedChart.value.valueDigits;
  const numeric = Number(value);

  return digits > 0 ? numeric.toFixed(digits) : `${Math.round(numeric)}`;
};

const defaultAuxMetrics = computed<HeatmapChartExampleAuxMetric[]>(() => {
  const values = chartCells.value.map((item) => item.value);
  const average = values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
  const maxCell = chartCells.value.reduce<typeof chartCells.value[number] | undefined>((current, item) => (
    !current || item.value > current.value ? item : current
  ), undefined);
  const highCount = chartCells.value.filter((item) => item.value >= resolvedChart.value.highThreshold).length;
  const coverage = Math.round((chartCells.value.length / Math.max(rows.value.length * columns.value.length, 1)) * 100);

  return [
    { label: text.average, value: formatNumber(average), tone: 'primary' },
    { label: text.peak, value: maxCell ? `${maxCell.row}/${maxCell.col}` : '--', tone: 'success' },
    { label: text.highZone, value: highCount, tone: highCount > 0 ? 'warning' : 'neutral' },
    { label: text.coverage, value: `${coverage}%`, tone: 'neutral' },
  ];
});

const visibleAuxMetrics = computed(() => {
  if (!resolvedAux.value.visible) {
    return [];
  }

  const metrics = props.auxMetrics?.length ? props.auxMetrics : defaultAuxMetrics.value;

  return metrics
    .filter((metric) => metric.label.trim() || String(metric.value).trim())
    .slice(0, resolvedAux.value.maxItems);
});

const contentOrientation = computed<'horizontal' | 'vertical'>(() => {
  const orientation = resolvedLayout.value.orientation;

  if (orientation === 'horizontal' || orientation === 'vertical') {
    return orientation;
  }

  if (!containerSize.value.width || !containerSize.value.height) {
    return 'horizontal';
  }

  return containerSize.value.width >= containerSize.value.height ? 'horizontal' : 'vertical';
});

const cardClasses = computed(() => ({
  [`is-${contentOrientation.value}`]: true,
  'has-aux': visibleAuxMetrics.value.length > 0,
  'has-title': resolvedTitle.value.visible,
  'has-title-underline': resolvedTitle.value.underline,
}));

const normalizeColor = (color: string) => (color.startsWith('#') ? color : resolvedTones.value.primary);

const hexToRgba = (color: string, opacity: number) => {
  const normalized = normalizeColor(color).replace('#', '');
  const expanded = normalized.length === 3 ? normalized.split('').map((item) => item + item).join('') : normalized;
  const numeric = Number.parseInt(expanded, 16);

  if (!Number.isFinite(numeric)) {
    return `rgba(0, 87, 217, ${opacity})`;
  }

  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const colorPalette = computed(() => [
  resolvedTones.value.low,
  '#bde7ff',
  resolvedTones.value.medium,
  '#2d8cff',
  resolvedTones.value.high,
]);

const chartScale = computed(() => {
  const chartConfig = resolvedChart.value;
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 80);
  const height = chartSize.value.height || fallbackHeight;
  const compact = Math.min(width / 280, height / 170);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
  const axisVisible = chartConfig.axisVisible && width >= 135 && height >= 82;
  const labelVisible = chartConfig.labelVisible && width >= 158 && height >= 92;
  const xAxisLabelGutter = axisVisible ? (width < 220 ? 18 : 22) : 0;
  const yAxisLabelGutter = axisVisible ? Math.max(chartConfig.gridLeftPx, width < 220 ? 30 : 38) : 0;

  return {
    fontSize,
    axisFontSize: Math.max(8, fontSize - 1),
    axisVisible,
    labelVisible,
    gridTop: chartConfig.gridTopPx,
    gridBottom: axisVisible ? Math.max(chartConfig.gridBottomPx, xAxisLabelGutter + 4) : 6,
    gridLeft: yAxisLabelGutter,
    gridRight: width < 220 ? 4 : chartConfig.gridRightPx,
  };
});

const formatTooltip = (params: unknown) => {
  if (!isRecord(params)) {
    return '';
  }

  const value = Array.isArray(params.value) ? params.value : [];
  const row = rows.value[Number(value[1])] ?? '';
  const column = columns.value[Number(value[0])] ?? '';
  const numericValue = Number(value[2]);
  const marker = typeof params.marker === 'string' ? params.marker : '';

  return [
    `${marker}${row} / ${column}`,
    `${title.value}: ${formatNumber(numericValue)}`,
  ].join('<br/>');
};

const option = computed<EChartsOption>(() => {
  const scale = chartScale.value;
  const tones = resolvedTones.value;
  const chartConfig = resolvedChart.value;

  return {
    animationDuration: 420,
    color: colorPalette.value,
    grid: {
      top: scale.gridTop,
      right: scale.gridRight,
      bottom: scale.gridBottom,
      left: scale.gridLeft,
      containLabel: false,
    },
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      confine: true,
      formatter: formatTooltip,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      borderColor: hexToRgba(tones.primary, 0.16),
      textStyle: {
        color: tones.text,
        fontSize: 11,
      },
    },
    xAxis: {
      type: 'category',
      data: columns.value,
      axisTick: { show: false },
      axisLine: {
        show: scale.axisVisible,
        lineStyle: { color: hexToRgba(tones.primary, 0.14) },
      },
      axisLabel: {
        show: scale.axisVisible,
        color: tones.axis,
        fontSize: scale.axisFontSize,
        interval: 0,
        hideOverlap: true,
      },
      splitArea: {
        show: chartConfig.splitAreaVisible,
        areaStyle: { color: ['rgba(255,255,255,0.22)', hexToRgba(tones.primary, 0.025)] },
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      data: rows.value,
      inverse: true,
      axisTick: { show: false },
      axisLine: {
        show: scale.axisVisible,
        lineStyle: { color: hexToRgba(tones.primary, 0.14) },
      },
      axisLabel: {
        show: scale.axisVisible,
        color: tones.axis,
        fontSize: scale.axisFontSize,
        margin: 4,
        hideOverlap: true,
        formatter: (value: string) => (value.length > 4 && chartSize.value.width < 180 ? `${value.slice(0, 4)}...` : value),
      },
      splitArea: {
        show: chartConfig.splitAreaVisible,
        areaStyle: { color: ['rgba(255,255,255,0.18)', hexToRgba(tones.primary, 0.02)] },
      },
    },
    visualMap: {
      show: false,
      min: valueRange.value.min,
      max: valueRange.value.max,
      inRange: { color: colorPalette.value },
    },
    series: [
      {
        name: title.value,
        type: 'heatmap',
        data: chartCells.value.map((item) => [item.columnIndex, item.rowIndex, item.value]),
        label: {
          show: scale.labelVisible,
          color: tones.text,
          fontSize: scale.axisFontSize,
          fontWeight: 760,
          formatter: (params: unknown) => formatValueLabel(Number((params as { value?: unknown[] }).value?.[2])),
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 7,
            shadowColor: hexToRgba(tones.primary, 0.22),
          },
        },
        itemStyle: {
          borderColor: 'rgba(255,255,255,0.92)',
          borderWidth: 1,
          borderRadius: chartConfig.cellBorderRadiusPx,
        },
      },
    ] as EChartsOption['series'],
  };
});

const cardStyle = computed(() => {
  const layout = resolvedLayout.value;
  const titleConfig = resolvedTitle.value;
  const auxConfig = resolvedAux.value;
  const tones = resolvedTones.value;

  return {
    '--heatmap-chart-card-padding': `${layout.paddingPx}px`,
    '--heatmap-chart-card-gap': `${layout.gapPx}px`,
    '--heatmap-chart-content-gap': `${layout.contentGapPx}px`,
    '--heatmap-chart-title-row': `${layout.titleHeightPx}px`,
    '--heatmap-chart-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--heatmap-chart-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--heatmap-chart-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--heatmap-chart-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--heatmap-chart-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--heatmap-chart-aux-label-color': auxConfig.labelColor,
    '--heatmap-chart-aux-value-color': auxConfig.valueColor,
    '--heatmap-chart-title-font-size': `${titleConfig.fontSizePx}px`,
    '--heatmap-chart-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--heatmap-chart-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--heatmap-chart-title-color': titleConfig.color || tones.text,
    '--heatmap-chart-unit-color': titleConfig.unitColor || tones.unit,
    '--heatmap-chart-primary': tones.primary,
    '--heatmap-chart-primary-soft': hexToRgba(tones.primary, 0.2),
  };
});

const updateContainerSize = () => {
  if (!rootRef.value) {
    return;
  }

  const rect = rootRef.value.getBoundingClientRect();
  const nextSize = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };

  if (nextSize.width !== containerSize.value.width || nextSize.height !== containerSize.value.height) {
    containerSize.value = nextSize;
  }

  const chartRect = chartRef.value?.getBoundingClientRect();
  const nextChartSize = {
    width: Math.round(chartRect?.width ?? 0),
    height: Math.round(chartRect?.height ?? 0),
  };

  if (nextChartSize.width !== chartSize.value.width || nextChartSize.height !== chartSize.value.height) {
    chartSize.value = nextChartSize;
  }
};

const hasRenderableSize = () => {
  if (!chartRef.value) {
    return false;
  }

  const rect = chartRef.value.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
};

const renderChart = () => {
  updateContainerSize();

  if (!hasRenderableData.value) {
    chart?.dispose();
    chart = null;
    return;
  }

  if (!chartRef.value || !hasRenderableSize()) {
    return;
  }

  chart ??= echarts.init(chartRef.value);
  chart.setOption(option.value, true);
  chart.resize();
};

const scheduleRenderChart = async () => {
  await nextTick();
  renderChart();
};

onMounted(() => {
  if (rootRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateContainerSize();
      if (hasRenderableSize()) {
        chart?.resize();
        void scheduleRenderChart();
      }
    });
    resizeObserver.observe(rootRef.value);
  }

  void scheduleRenderChart();
});

watch(option, () => {
  void scheduleRenderChart();
}, { deep: true, flush: 'post' });

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  chart?.dispose();
  chart = null;
});
</script>

<template>
  <section
    ref="rootRef"
    class="heatmap-chart-example-card"
    :class="cardClasses"
    :style="cardStyle"
    aria-label="Heatmap chart card"
  >
    <header v-if="resolvedTitle.visible" class="heatmap-chart-example-header">
      <div class="heatmap-chart-example-title-wrap">
        <span class="heatmap-chart-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="heatmap-chart-example-unit">{{ unit }}</span>
    </header>
    <div class="heatmap-chart-example-body">
      <div v-if="visibleAuxMetrics.length" class="heatmap-chart-example-aux" aria-label="Heatmap chart metrics">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="heatmap-chart-example-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="heatmap-chart-example-chart-pane">
        <div v-if="hasRenderableData" ref="chartRef" class="heatmap-chart-example-canvas" />
        <div v-else class="heatmap-chart-example-empty">{{ text.noData }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.heatmap-chart-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--heatmap-chart-title-row) minmax(0, 1fr);
  row-gap: var(--heatmap-chart-card-gap);
  padding: var(--heatmap-chart-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--heatmap-chart-title-color);
}

.heatmap-chart-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.heatmap-chart-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.heatmap-chart-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.heatmap-chart-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--heatmap-chart-title-color);
  font-size: var(--heatmap-chart-title-font-size);
  line-height: var(--heatmap-chart-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.heatmap-chart-example-card.has-title-underline .heatmap-chart-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--heatmap-chart-primary) 0%, var(--heatmap-chart-primary-soft) 72%, transparent 100%);
}

.heatmap-chart-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--heatmap-chart-unit-color);
  font-size: var(--heatmap-chart-unit-font-size);
  line-height: var(--heatmap-chart-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.heatmap-chart-example-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--heatmap-chart-content-gap);
  overflow: hidden;
}

.heatmap-chart-example-card.has-aux.is-horizontal .heatmap-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--heatmap-chart-horizontal-split);
}

.heatmap-chart-example-card.has-aux.is-vertical .heatmap-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--heatmap-chart-vertical-split);
}

.heatmap-chart-example-card:not(.has-aux) .heatmap-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.heatmap-chart-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.heatmap-chart-example-card.is-horizontal .heatmap-chart-example-aux {
  grid-template-columns: repeat(var(--heatmap-chart-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.heatmap-chart-example-card.is-vertical .heatmap-chart-example-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--heatmap-chart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.heatmap-chart-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  color: var(--heatmap-chart-aux-value-color);
  overflow: hidden;
}

.heatmap-chart-example-card.is-horizontal .heatmap-chart-example-aux-item {
  justify-items: center;
  text-align: center;
}

.heatmap-chart-example-card.is-vertical .heatmap-chart-example-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
}

.heatmap-chart-example-aux-item em,
.heatmap-chart-example-aux-item b {
  min-width: 0;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.heatmap-chart-example-aux-item em {
  color: var(--heatmap-chart-aux-label-color);
  font-size: var(--heatmap-chart-aux-label-font-size);
  font-weight: 600;
}

.heatmap-chart-example-aux-item b {
  color: var(--heatmap-chart-aux-value-color);
  font-size: var(--heatmap-chart-aux-value-font-size);
  font-weight: 800;
}

.heatmap-chart-example-card.is-vertical .heatmap-chart-example-aux-item b {
  justify-self: end;
}

.heatmap-chart-example-aux-item.tone-neutral b {
  color: #52677a;
}

.heatmap-chart-example-aux-item.tone-success b {
  color: #00a870;
}

.heatmap-chart-example-aux-item.tone-warning b {
  color: #e58a00;
}

.heatmap-chart-example-aux-item.tone-danger b {
  color: #d92d20;
}

.heatmap-chart-example-chart-pane {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.heatmap-chart-example-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.heatmap-chart-example-empty {
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  color: #667085;
  font-size: 12px;
  font-weight: 700;
}
</style>
