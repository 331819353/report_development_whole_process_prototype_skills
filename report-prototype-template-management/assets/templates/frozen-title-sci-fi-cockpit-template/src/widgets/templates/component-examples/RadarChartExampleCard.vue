<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface RadarChartExampleIndicator {
  name: string;
  max?: number;
  min?: number;
  unit?: string;
}

interface RadarChartExampleSeries {
  name: string;
  values: number[];
  color?: string;
}

interface RadarChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface RadarChartExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface RadarChartExampleLayoutConfig {
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

interface RadarChartExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface RadarChartExampleChartConfig {
  legendVisible?: boolean;
  axisNameVisible?: boolean;
  splitNumber?: number;
  minDimensionCount?: number;
  maxDimensionCount?: number;
  radiusPercent?: number;
  valueUnit?: string;
  valueDigits?: number;
  areaOpacity?: number;
  lineWidthPx?: number;
  symbolVisible?: boolean;
}

interface RadarChartExampleToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  axis?: string;
  splitLine?: string;
  text?: string;
  unit?: string;
}

interface RadarChartExampleCardConfig {
  title?: RadarChartExampleTitleConfig;
  layout?: RadarChartExampleLayoutConfig;
  aux?: RadarChartExampleAuxConfig;
  chart?: RadarChartExampleChartConfig;
  tones?: RadarChartExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  seriesName?: string;
  indicators?: RadarChartExampleIndicator[];
  values?: number[];
  series?: RadarChartExampleSeries[];
  auxMetrics?: RadarChartExampleAuxMetric[];
  config?: RadarChartExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const text = {
  title: '\u96f7\u8fbe\u56fe\u5361\u7247',
  unit: '\u5355\u4f4d\uff1a\u5206',
  series: '\u7efc\u5408\u80fd\u529b',
  growth: '\u589e\u957f',
  profit: '\u76c8\u5229',
  cash: '\u73b0\u91d1',
  turnover: '\u5468\u8f6c',
  risk: '\u98ce\u9669',
  efficiency: '\u6548\u7387',
  average: '\u5747\u503c',
  highest: '\u6700\u9ad8',
  weakest: '\u77ed\u677f',
  dimensions: '\u7ef4\u5ea6',
  noData: '\u6682\u65e0\u96f7\u8fbe\u56fe\u6570\u636e',
};

const defaultIndicators: Required<RadarChartExampleIndicator>[] = [
  { name: text.growth, min: 0, max: 100, unit: '\u5206' },
  { name: text.profit, min: 0, max: 100, unit: '\u5206' },
  { name: text.cash, min: 0, max: 100, unit: '\u5206' },
  { name: text.turnover, min: 0, max: 100, unit: '\u5206' },
  { name: text.risk, min: 0, max: 100, unit: '\u5206' },
];

const defaultValues = [88, 91, 83, 64, 72];

const defaultTitleConfig: Required<RadarChartExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<RadarChartExampleLayoutConfig> = {
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

const defaultAuxConfig: Required<RadarChartExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
  labelFontSizePx: 9,
  valueFontSizePx: 12,
  labelColor: '#6b7c93',
  valueColor: '#0057d9',
};

const defaultChartConfig: Required<RadarChartExampleChartConfig> = {
  legendVisible: true,
  axisNameVisible: true,
  splitNumber: 4,
  minDimensionCount: 3,
  maxDimensionCount: 6,
  radiusPercent: 56,
  valueUnit: '',
  valueDigits: 0,
  areaOpacity: 0.22,
  lineWidthPx: 2,
  symbolVisible: true,
};

const defaultToneConfig: Required<RadarChartExampleToneConfig> = {
  primary: '#0057d9',
  secondary: '#00a870',
  tertiary: '#f59e0b',
  quaternary: '#7c3aed',
  axis: '#6f8196',
  splitLine: 'rgba(0, 87, 217, 0.16)',
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

const normalizeOrientation = (value: unknown): Required<RadarChartExampleLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const resolvedTitle = computed<Required<RadarChartExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<RadarChartExampleLayoutConfig>>(() => {
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

const resolvedAux = computed<Required<RadarChartExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<RadarChartExampleChartConfig>>(() => ({
  ...defaultChartConfig,
  ...(props.config?.chart ?? {}),
  splitNumber: Math.round(clampNumber(props.config?.chart?.splitNumber, 2, 6, defaultChartConfig.splitNumber)),
  minDimensionCount: Math.round(clampNumber(props.config?.chart?.minDimensionCount, 3, 8, defaultChartConfig.minDimensionCount)),
  maxDimensionCount: Math.round(clampNumber(props.config?.chart?.maxDimensionCount, 3, 8, defaultChartConfig.maxDimensionCount)),
  radiusPercent: clampNumber(props.config?.chart?.radiusPercent, 38, 72, defaultChartConfig.radiusPercent),
  valueDigits: Math.round(clampNumber(props.config?.chart?.valueDigits, 0, 2, defaultChartConfig.valueDigits)),
  areaOpacity: clampNumber(props.config?.chart?.areaOpacity, 0.05, 0.45, defaultChartConfig.areaOpacity),
  lineWidthPx: clampNumber(props.config?.chart?.lineWidthPx, 1, 4, defaultChartConfig.lineWidthPx),
}));

const resolvedTones = computed<Required<RadarChartExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || text.title);
const unit = computed(() => props.unit?.trim() || text.unit);
const valueUnit = computed(() => {
  const configured = resolvedChart.value.valueUnit.trim();

  if (configured) {
    return configured;
  }

  return unit.value.replace(/^\u5355\u4f4d[:\uff1a]?/, '').trim();
});

const dataRows = computed(() => (props.data ?? []).filter(isRecord));

const sourceIndicators = computed<RadarChartExampleIndicator[]>(() => {
  if (props.indicators?.length) {
    return props.indicators;
  }

  const dataIndicators = dataRows.value
    .map((item, index) => ({
      name: String(item.name ?? item.dimension ?? item.label ?? `${text.dimensions} ${index + 1}`),
      min: Number.isFinite(Number(item.min)) ? Number(item.min) : 0,
      max: Number.isFinite(Number(item.max)) ? Number(item.max) : 100,
      unit: typeof item.unit === 'string' ? item.unit : valueUnit.value,
    }))
    .filter((item) => item.name.trim());

  return dataIndicators.length ? dataIndicators : defaultIndicators;
});

const indicators = computed(() => {
  const chartConfig = resolvedChart.value;
  const limit = Math.max(chartConfig.minDimensionCount, chartConfig.maxDimensionCount);

  return sourceIndicators.value
    .slice(0, limit)
    .map((indicator, index) => {
      const max = clampNumber(indicator.max, 1, 100000, 100);
      const min = clampNumber(indicator.min, -100000, max - 1, 0);

      return {
        name: indicator.name?.trim() || `${text.dimensions} ${index + 1}`,
        min,
        max,
        unit: indicator.unit?.trim() || valueUnit.value,
      };
    })
    .filter((indicator) => indicator.name)
    .slice(0, chartConfig.maxDimensionCount);
});

const normalizedValues = (values: number[]) =>
  indicators.value.map((indicator, index) => {
    const fallback = index < defaultValues.length ? defaultValues[index] : indicator.min;
    return clampNumber(values[index], indicator.min, indicator.max, fallback);
  });

const valuesFromData = computed(() =>
  dataRows.value
    .map((item) => Number(item.value ?? item.score ?? item.amount))
    .filter((value) => Number.isFinite(value)),
);

const seriesRows = computed<RadarChartExampleSeries[]>(() => {
  if (props.series?.length) {
    return props.series
      .filter((item) => item.values.length)
      .slice(0, 3)
      .map((item) => ({
        ...item,
        name: item.name?.trim() || text.series,
        values: normalizedValues(item.values),
      }));
  }

  const values = props.values?.length
    ? props.values
    : valuesFromData.value.length
      ? valuesFromData.value
      : defaultValues;

  return [
    {
      name: props.seriesName?.trim() || text.series,
      values: normalizedValues(values),
    },
  ];
});

const hasRenderableData = computed(() =>
  indicators.value.length >= resolvedChart.value.minDimensionCount
  && seriesRows.value.some((item) => item.values.some((value) => Number.isFinite(value))),
);

const formatNumber = (value: number | undefined, suffix = valueUnit.value) => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  const digits = resolvedChart.value.valueDigits;
  const numeric = Number(value);
  const rounded = digits > 0 ? numeric.toFixed(digits) : `${Math.round(numeric)}`;

  return `${rounded}${suffix}`;
};

const primarySeries = computed(() => seriesRows.value[0] ?? { name: text.series, values: [] });

const defaultAuxMetrics = computed<RadarChartExampleAuxMetric[]>(() => {
  const values = primarySeries.value.values;
  const average = values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
  const maxValue = Math.max(...values, 0);
  const minValue = Math.min(...values, 0);
  const maxIndex = values.indexOf(maxValue);
  const minIndex = values.indexOf(minValue);

  return [
    { label: text.average, value: formatNumber(average), tone: 'primary' },
    { label: text.highest, value: indicators.value[maxIndex]?.name ?? '--', tone: 'success' },
    { label: text.weakest, value: indicators.value[minIndex]?.name ?? '--', tone: 'warning' },
    { label: text.dimensions, value: indicators.value.length, tone: 'neutral' },
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

const palette = computed(() => [
  resolvedTones.value.primary,
  resolvedTones.value.secondary,
  resolvedTones.value.tertiary,
  resolvedTones.value.quaternary,
]);

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

const chartScale = computed(() => {
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 90);
  const height = chartSize.value.height || fallbackHeight;
  const compact = Math.min(width / 280, height / 170);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
  const legendVisible = resolvedChart.value.legendVisible && seriesRows.value.length > 1;
  const legendPlacement: 'right' | 'top' = contentOrientation.value === 'horizontal' ? 'right' : 'top';
  const legendTopVisible = legendVisible && legendPlacement === 'top';
  const legendRightVisible = legendVisible && legendPlacement === 'right';
  const maxLegendNameLength = Math.max(1, ...seriesRows.value.map((item) => item.name.length));
  const legendTextWidth = Math.max(
    34,
    Math.min(
      74,
      maxLegendNameLength * fontSize * 0.7 + 10,
    ),
  );
  const legendWidth = legendRightVisible
    ? Math.min(Math.max(52, legendTextWidth + 18), Math.max(52, width * 0.32))
    : 0;
  const legendHeight = legendTopVisible ? Math.max(16, fontSize + 8) : 0;
  const labelVisible = resolvedChart.value.axisNameVisible && width >= 126 && height >= 92;
  const chartWidth = legendRightVisible ? Math.max(width - legendWidth - 6, 96) : width;
  const radiusLimit = chartWidth < 150 || height < 110 ? 46 : chartWidth < 220 ? 52 : resolvedChart.value.radiusPercent;
  const radius = Math.min(resolvedChart.value.radiusPercent, radiusLimit);
  const centerX = legendRightVisible
    ? `${Math.round(clampNumber(((chartWidth * 0.5) / width) * 100, 32, 48, 42))}%`
    : '50%';
  const centerY = legendTopVisible ? (height < 135 ? '60%' : '57%') : height < 110 ? '54%' : '53%';

  return {
    fontSize,
    axisFontSize: Math.max(8, fontSize - 0.4),
    labelVisible,
    legendVisible,
    legendPlacement,
    legendTopVisible,
    legendRightVisible,
    legendWidth,
    legendTextWidth,
    legendHeight,
    radius: `${radius}%`,
    centerX,
    centerY,
    splitNumber: height < 120 ? Math.min(3, resolvedChart.value.splitNumber) : resolvedChart.value.splitNumber,
    symbolSize: resolvedChart.value.symbolVisible ? Math.round(clampNumber(Math.min(width, height) / 34, 3, 6, 4) * 10) / 10 : 0,
  };
});

const radarIndicators = computed(() =>
  indicators.value.map((indicator) => ({
    name: indicator.name,
    min: indicator.min,
    max: indicator.max,
  })),
);

const formatTooltip = (params: unknown) => {
  if (!isRecord(params)) {
    return '';
  }

  const data = isRecord(params.data) ? params.data : {};
  const rawValues = Array.isArray(data.value) ? data.value : [];
  const marker = typeof params.marker === 'string' ? params.marker : '';
  const name = String(data.name ?? params.name ?? '');
  const lines = [`${marker}${name}`];

  indicators.value.forEach((indicator, index) => {
    lines.push(`${indicator.name}: ${formatNumber(Number(rawValues[index]), indicator.unit)}`);
  });

  return lines.join('<br/>');
};

const option = computed<EChartsOption>(() => {
  const tones = resolvedTones.value;
  const scale = chartScale.value;

  return {
    animationDuration: 520,
    color: palette.value,
    legend: {
      show: scale.legendVisible,
      top: scale.legendRightVisible ? 'middle' : 0,
      right: scale.legendRightVisible ? 0 : undefined,
      left: scale.legendTopVisible ? 'center' : undefined,
      orient: scale.legendRightVisible ? 'vertical' : 'horizontal',
      width: scale.legendRightVisible ? scale.legendWidth : undefined,
      itemWidth: 9,
      itemHeight: 6,
      itemGap: 8,
      selectedMode: false,
      data: seriesRows.value.map((item) => item.name),
      textStyle: {
        color: tones.axis,
        fontSize: scale.axisFontSize,
        fontWeight: 700,
        overflow: 'truncate',
        width: scale.legendRightVisible ? scale.legendTextWidth : undefined,
      },
    },
    tooltip: {
      trigger: 'item',
      confine: true,
      appendToBody: true,
      formatter: formatTooltip,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      borderColor: 'rgba(0, 87, 217, 0.16)',
      textStyle: {
        color: tones.text,
        fontSize: 11,
      },
    },
    radar: {
      radius: scale.radius,
      center: [scale.centerX, scale.centerY],
      indicator: radarIndicators.value,
      splitNumber: scale.splitNumber,
      shape: 'polygon',
      axisNameGap: Math.max(3, Math.round(scale.fontSize * 0.56)),
      axisName: {
        show: scale.labelVisible,
        color: tones.text,
        fontSize: scale.axisFontSize,
        fontWeight: 760,
        lineHeight: scale.axisFontSize + 2,
        padding: [1, 3],
        backgroundColor: hexToRgba(tones.primary, 0.07),
        borderRadius: 4,
        formatter: (name?: string) => {
          const label = name ?? '';
          return label.length > 4 && chartSize.value.width < 180 ? `${label.slice(0, 4)}...` : label;
        },
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.34)', hexToRgba(tones.primary, 0.055)],
        },
      },
      axisLine: {
        lineStyle: {
          color: hexToRgba(tones.primary, 0.16),
          width: 1,
        },
      },
      splitLine: {
        lineStyle: {
          color: tones.splitLine,
          type: [4, 5],
        },
      },
    },
    series: [
      {
        name: title.value,
        type: 'radar',
        symbol: resolvedChart.value.symbolVisible ? 'circle' : 'none',
        symbolSize: scale.symbolSize,
        data: seriesRows.value.map((item, index) => {
          const color = item.color ?? palette.value[index % palette.value.length];

          return {
            value: item.values,
            name: item.name,
            areaStyle: {
              color: hexToRgba(color, index === 0 ? resolvedChart.value.areaOpacity : resolvedChart.value.areaOpacity * 0.62),
            },
            lineStyle: {
              color,
              width: resolvedChart.value.lineWidthPx,
              shadowBlur: 6,
              shadowColor: hexToRgba(color, 0.14),
            },
            itemStyle: {
              color,
              borderColor: '#ffffff',
              borderWidth: 1,
            },
          };
        }),
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
    '--radar-chart-card-padding': `${layout.paddingPx}px`,
    '--radar-chart-card-gap': `${layout.gapPx}px`,
    '--radar-chart-content-gap': `${layout.contentGapPx}px`,
    '--radar-chart-title-row': `${layout.titleHeightPx}px`,
    '--radar-chart-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--radar-chart-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--radar-chart-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--radar-chart-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--radar-chart-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--radar-chart-aux-label-color': auxConfig.labelColor,
    '--radar-chart-aux-value-color': auxConfig.valueColor,
    '--radar-chart-title-font-size': `${titleConfig.fontSizePx}px`,
    '--radar-chart-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--radar-chart-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--radar-chart-title-color': titleConfig.color || tones.text,
    '--radar-chart-unit-color': titleConfig.unitColor || tones.unit,
    '--radar-chart-primary': tones.primary,
    '--radar-chart-primary-soft': hexToRgba(tones.primary, 0.2),
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
    class="radar-chart-example-card"
    :class="cardClasses"
    :style="cardStyle"
    aria-label="Radar chart card"
  >
    <header v-if="resolvedTitle.visible" class="radar-chart-example-header">
      <div class="radar-chart-example-title-wrap">
        <span class="radar-chart-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="radar-chart-example-unit">{{ unit }}</span>
    </header>
    <div class="radar-chart-example-body">
      <div v-if="visibleAuxMetrics.length" class="radar-chart-example-aux" aria-label="Radar chart metrics">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="radar-chart-example-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="radar-chart-example-chart-pane">
        <div v-if="hasRenderableData" ref="chartRef" class="radar-chart-example-canvas" />
        <div v-else class="radar-chart-example-empty">{{ text.noData }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.radar-chart-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--radar-chart-title-row) minmax(0, 1fr);
  row-gap: var(--radar-chart-card-gap);
  padding: var(--radar-chart-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--radar-chart-title-color);
}

.radar-chart-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.radar-chart-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.radar-chart-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.radar-chart-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--radar-chart-title-color);
  font-size: var(--radar-chart-title-font-size);
  line-height: var(--radar-chart-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.radar-chart-example-card.has-title-underline .radar-chart-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--radar-chart-primary) 0%,
    var(--radar-chart-primary-soft) 72%,
    transparent 100%
  );
}

.radar-chart-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--radar-chart-unit-color);
  font-size: var(--radar-chart-unit-font-size);
  line-height: var(--radar-chart-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.radar-chart-example-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--radar-chart-content-gap);
  overflow: hidden;
}

.radar-chart-example-card.has-aux.is-horizontal .radar-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--radar-chart-horizontal-split);
}

.radar-chart-example-card.has-aux.is-vertical .radar-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--radar-chart-vertical-split);
}

.radar-chart-example-card:not(.has-aux) .radar-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.radar-chart-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.radar-chart-example-card.is-horizontal .radar-chart-example-aux {
  grid-template-columns: repeat(var(--radar-chart-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.radar-chart-example-card.is-vertical .radar-chart-example-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--radar-chart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.radar-chart-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  color: var(--radar-chart-aux-value-color);
  overflow: hidden;
}

.radar-chart-example-card.is-horizontal .radar-chart-example-aux-item {
  justify-items: center;
  text-align: center;
}

.radar-chart-example-card.is-vertical .radar-chart-example-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
}

.radar-chart-example-aux-item em,
.radar-chart-example-aux-item b {
  min-width: 0;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.radar-chart-example-aux-item em {
  color: var(--radar-chart-aux-label-color);
  font-size: var(--radar-chart-aux-label-font-size);
  font-weight: 600;
}

.radar-chart-example-aux-item b {
  color: var(--radar-chart-aux-value-color);
  font-size: var(--radar-chart-aux-value-font-size);
  font-weight: 800;
}

.radar-chart-example-card.is-vertical .radar-chart-example-aux-item b {
  justify-self: end;
}

.radar-chart-example-aux-item.tone-neutral b {
  color: #52677a;
}

.radar-chart-example-aux-item.tone-success b {
  color: #12a867;
}

.radar-chart-example-aux-item.tone-warning b {
  color: #e58a00;
}

.radar-chart-example-aux-item.tone-danger b {
  color: #d93025;
}

.radar-chart-example-chart-pane {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.radar-chart-example-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.radar-chart-example-empty {
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  color: #667085;
  font-size: 12px;
  font-weight: 700;
}
</style>
