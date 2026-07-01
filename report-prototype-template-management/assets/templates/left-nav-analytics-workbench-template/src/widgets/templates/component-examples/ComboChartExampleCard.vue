<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

type ComboChartExampleSeriesKind = 'bar' | 'line';

interface ComboChartExampleSeries {
  name: string;
  values: number[];
  kind?: ComboChartExampleSeriesKind;
  color?: string;
  unit?: string;
  yAxisIndex?: 0 | 1;
  targetValue?: number;
  smooth?: boolean;
}

interface ComboChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface ComboChartExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface ComboChartExampleLayoutConfig {
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

interface ComboChartExampleChartConfig {
  legendVisible?: boolean;
  showSymbol?: boolean;
  smooth?: boolean;
  lineWidthPx?: number;
  barWidthPx?: number;
  barMaxWidthPx?: number;
  barGap?: string;
  barCategoryGap?: string;
  borderRadiusPx?: number;
  targetLineVisible?: boolean;
  rightAxisVisible?: boolean;
  gridTopPx?: number;
  gridBottomPx?: number;
  gridLeftPx?: number;
  gridRightPx?: number;
  axisVisible?: boolean;
  splitLineVisible?: boolean;
}

interface ComboChartExampleToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  axis?: string;
  splitLine?: string;
  text?: string;
  unit?: string;
}

interface ComboChartExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface ComboChartExampleCardConfig {
  title?: ComboChartExampleTitleConfig;
  layout?: ComboChartExampleLayoutConfig;
  aux?: ComboChartExampleAuxConfig;
  chart?: ComboChartExampleChartConfig;
  tones?: ComboChartExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  categories?: string[];
  values?: number[];
  rateValues?: number[];
  series?: ComboChartExampleSeries[];
  auxMetrics?: ComboChartExampleAuxMetric[];
  config?: ComboChartExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const defaultCategories = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];
const defaultValues = [56, 72, 68, 86, 94, 88, 108];
const defaultRateValues = [62, 69, 66, 78, 86, 82, 91];

const defaultTitleConfig: Required<ComboChartExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<ComboChartExampleLayoutConfig> = {
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

const defaultChartConfig: Required<ComboChartExampleChartConfig> = {
  legendVisible: true,
  showSymbol: true,
  smooth: true,
  lineWidthPx: 2,
  barWidthPx: 0,
  barMaxWidthPx: 18,
  barGap: '28%',
  barCategoryGap: '42%',
  borderRadiusPx: 3,
  targetLineVisible: true,
  rightAxisVisible: true,
  gridTopPx: 10,
  gridBottomPx: 18,
  gridLeftPx: 0,
  gridRightPx: 8,
  axisVisible: true,
  splitLineVisible: true,
};

const defaultToneConfig: Required<ComboChartExampleToneConfig> = {
  primary: '#0057d9',
  secondary: '#19a8ff',
  tertiary: '#00a870',
  axis: '#7a8aa0',
  splitLine: 'rgba(0, 87, 217, 0.1)',
  text: '#15304f',
  unit: '#667085',
};

const defaultAuxConfig: Required<ComboChartExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
  orientation: 'auto',
  labelFontSizePx: 9,
  valueFontSizePx: 12,
  labelColor: '#6b7c93',
  valueColor: '#0057d9',
};

const clampNumber = (value: unknown, min: number, max: number, fallback: number) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return Math.min(Math.max(numberValue, min), max);
};

const normalizeOrientation = (value: unknown): Required<ComboChartExampleLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeAuxOrientation = (value: unknown): Required<ComboChartExampleAuxConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const resolvedTitle = computed<Required<ComboChartExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<ComboChartExampleLayoutConfig>>(() => {
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

const resolvedAux = computed<Required<ComboChartExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  orientation: normalizeAuxOrientation(props.config?.aux?.orientation),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<ComboChartExampleChartConfig>>(() => ({
  ...defaultChartConfig,
  ...(props.config?.chart ?? {}),
  lineWidthPx: clampNumber(props.config?.chart?.lineWidthPx, 1, 5, defaultChartConfig.lineWidthPx),
  barWidthPx: clampNumber(props.config?.chart?.barWidthPx, 0, 36, defaultChartConfig.barWidthPx),
  barMaxWidthPx: clampNumber(props.config?.chart?.barMaxWidthPx, 4, 36, defaultChartConfig.barMaxWidthPx),
  borderRadiusPx: clampNumber(props.config?.chart?.borderRadiusPx, 0, 12, defaultChartConfig.borderRadiusPx),
  gridTopPx: clampNumber(props.config?.chart?.gridTopPx, 0, 40, defaultChartConfig.gridTopPx),
  gridBottomPx: clampNumber(props.config?.chart?.gridBottomPx, 4, 42, defaultChartConfig.gridBottomPx),
  gridLeftPx: clampNumber(props.config?.chart?.gridLeftPx, 0, 60, defaultChartConfig.gridLeftPx),
  gridRightPx: clampNumber(props.config?.chart?.gridRightPx, 4, 46, defaultChartConfig.gridRightPx),
}));

const resolvedTones = computed<Required<ComboChartExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '组合图卡片');
const unit = computed(() => props.unit?.trim() || '单位：万元 / %');
const categories = computed(() => (props.categories?.length ? props.categories : defaultCategories));
const visibleSeriesRows = computed<ComboChartExampleSeries[]>(() => {
  const rawSeries = props.series?.length
    ? props.series
    : [
        {
          name: '实际值',
          kind: 'bar' as const,
          values: props.values?.length ? props.values : defaultValues,
          unit: '万元',
          yAxisIndex: 0 as const,
          targetValue: 105,
        },
        {
          name: '达成率',
          kind: 'line' as const,
          values: props.rateValues?.length ? props.rateValues : defaultRateValues,
          unit: '%',
          yAxisIndex: 1 as const,
        },
      ];

  return rawSeries
    .filter((item) => item.values.length)
    .slice(0, 4)
    .map((item, index) => ({
      ...item,
      kind: item.kind ?? (index === 0 ? 'bar' : 'line'),
      yAxisIndex: item.yAxisIndex ?? (item.kind === 'line' || index > 0 ? 1 : 0),
    }));
});

const hasRenderableData = computed(() => categories.value.length > 0 && visibleSeriesRows.value.some((item) => item.values.length > 0));

const valueRangeByAxis = computed(() => {
  const ranges = [0, 1].map((axisIndex) => {
    const values = visibleSeriesRows.value
      .filter((item) => (item.yAxisIndex ?? 0) === axisIndex)
      .flatMap((item) => [...item.values, item.targetValue].filter((value): value is number => Number.isFinite(value)));
    const min = Math.min(...values, 0);
    const max = Math.max(...values, axisIndex === 1 ? 100 : 1);
    const padding = Math.max((max - min) * 0.14, axisIndex === 1 ? 5 : 4);

    return {
      min: Math.max(0, Math.floor(min - padding)),
      max: Math.ceil(max + padding),
    };
  });

  return ranges as [{ min: number; max: number }, { min: number; max: number }];
});

const formatMetricNumber = (value: number | undefined, suffix = '') => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  return `${Math.round(value ?? 0).toLocaleString('zh-CN')}${suffix}`;
};

const defaultAuxMetrics = computed<ComboChartExampleAuxMetric[]>(() => {
  const barSeries = visibleSeriesRows.value.find((item) => item.kind === 'bar') ?? visibleSeriesRows.value[0];
  const lineSeries = visibleSeriesRows.value.find((item) => item.kind === 'line');
  const barValues = (barSeries?.values ?? []).filter((value) => Number.isFinite(value));
  const lineValues = (lineSeries?.values ?? []).filter((value) => Number.isFinite(value));
  const actual = barValues.length ? barValues[barValues.length - 1] : undefined;
  const previous = barValues.length > 1 ? barValues[barValues.length - 2] : barValues[0];
  const lineActual = lineValues.length ? lineValues[lineValues.length - 1] : undefined;
  const target = barSeries?.targetValue ?? (barValues.length ? Math.ceil(Math.max(...barValues, actual ?? 0) * 1.08) : undefined);

  return [
    { label: '上期', value: formatMetricNumber(previous), tone: 'neutral' },
    { label: '实际', value: formatMetricNumber(actual), tone: 'primary' },
    { label: '达成率', value: formatMetricNumber(lineActual, lineSeries?.unit ?? '%'), tone: 'success' },
    { label: '目标', value: formatMetricNumber(target), tone: 'warning' },
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

const auxOrientation = computed<'horizontal' | 'vertical'>(() => {
  const orientation = resolvedAux.value.orientation;

  if (orientation === 'horizontal' || orientation === 'vertical') {
    return orientation;
  }

  return contentOrientation.value === 'horizontal' ? 'vertical' : 'horizontal';
});

const cardClasses = computed(() => ({
  [`is-${contentOrientation.value}`]: true,
  [`aux-${auxOrientation.value}`]: true,
  'has-aux': visibleAuxMetrics.value.length > 0,
  'has-title': resolvedTitle.value.visible,
}));

const chartScale = computed(() => {
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 80);
  const height = chartSize.value.height || fallbackHeight;
  const compact = Math.min(width / 280, height / 170);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
  const axisVisible = resolvedChart.value.axisVisible && width >= 150 && height >= 86;
  const legendVisible = resolvedChart.value.legendVisible && visibleSeriesRows.value.length > 1 && width >= 240 && height >= 130;
  const hasRightAxis = resolvedChart.value.rightAxisVisible && visibleSeriesRows.value.some((item) => (item.yAxisIndex ?? 0) === 1);
  const yAxisLabelGutter = axisVisible ? Math.max(resolvedChart.value.gridLeftPx, width < 220 ? 24 : 30) : 0;
  const rightAxisGutter = axisVisible && hasRightAxis ? Math.max(resolvedChart.value.gridRightPx, width < 260 ? 26 : 34) : resolvedChart.value.gridRightPx;
  const visibleCategoryCount = Math.max(categories.value.length, 1);
  const visibleBarCount = Math.max(visibleSeriesRows.value.filter((item) => item.kind === 'bar').length, 1);
  const autoBarWidth = Math.floor(width / (visibleCategoryCount * visibleBarCount * 3.4));
  const barWidth = resolvedChart.value.barWidthPx || clampNumber(autoBarWidth, 4, resolvedChart.value.barMaxWidthPx, 8);

  return {
    fontSize,
    axisFontSize: Math.max(8, fontSize - 1),
    symbolSize: Math.round(clampNumber(Math.min(width, height) / 24, 4, 8, 5) * 10) / 10,
    legendVisible,
    axisVisible,
    hasRightAxis,
    barWidth,
    gridTop: legendVisible ? Math.max(resolvedChart.value.gridTopPx, 24) : resolvedChart.value.gridTopPx,
    gridBottom: axisVisible ? resolvedChart.value.gridBottomPx : 6,
    gridLeft: yAxisLabelGutter,
    yAxisLabelMargin: yAxisLabelGutter,
    gridRight: width < 220 ? 6 : rightAxisGutter,
  };
});

const palette = computed(() => [resolvedTones.value.primary, resolvedTones.value.secondary, resolvedTones.value.tertiary, '#ffb020']);

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

const makeBarGradient = (color: string) =>
  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
    { offset: 0, color: hexToRgba(color, 0.14) },
    { offset: 0.62, color: hexToRgba(color, 0.74) },
    { offset: 1, color },
  ]);

const option = computed<EChartsOption>(() => {
  const chartConfig = resolvedChart.value;
  const scale = chartScale.value;
  const tones = resolvedTones.value;

  return {
    animationDuration: 500,
    color: palette.value,
    grid: {
      top: scale.gridTop,
      right: scale.gridRight,
      bottom: scale.gridBottom,
      left: scale.gridLeft,
      containLabel: false,
    },
    legend: {
      show: scale.legendVisible,
      top: 0,
      left: 'center',
      orient: 'horizontal',
      itemWidth: 10,
      itemHeight: 6,
      textStyle: {
        color: tones.axis,
        fontSize: scale.axisFontSize,
      },
    },
    tooltip: {
      trigger: 'axis',
      confine: true,
      appendToBody: true,
      formatter: (params: unknown) => {
        const rows = Array.isArray(params) ? params : [params];
        const axisLabel = rows.find((item) => item && typeof item === 'object' && 'axisValueLabel' in item) as
          | { axisValueLabel?: string }
          | undefined;
        const lines = rows
          .map((item) => {
            if (!item || typeof item !== 'object') {
              return '';
            }

            const row = item as { marker?: string; seriesName?: string; value?: string | number | Array<string | number> };
            const series = visibleSeriesRows.value.find((seriesItem) => seriesItem.name === row.seriesName);
            const value = Array.isArray(row.value) ? row.value[row.value.length - 1] : row.value;

            return `${row.marker ?? ''}${row.seriesName ?? ''}: ${value ?? '--'}${series?.unit ?? ''}`;
          })
          .filter(Boolean);

        return [axisLabel?.axisValueLabel, ...lines].filter(Boolean).join('<br/>');
      },
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: hexToRgba(tones.primary, 0.28),
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: categories.value,
      axisTick: { show: false },
      axisLine: {
        show: scale.axisVisible,
        lineStyle: { color: hexToRgba(tones.primary, 0.14) },
      },
      axisLabel: {
        show: scale.axisVisible,
        color: tones.axis,
        fontSize: scale.axisFontSize,
        interval: containerSize.value.width < 260 ? 'auto' : 0,
        hideOverlap: true,
      },
      splitLine: { show: false },
    },
    yAxis: [
      {
        type: 'value',
        min: valueRangeByAxis.value[0].min,
        max: valueRangeByAxis.value[0].max,
        axisLabel: {
          show: scale.axisVisible && containerSize.value.width >= 190,
          color: tones.axis,
          fontSize: scale.axisFontSize,
          align: 'left',
          margin: scale.yAxisLabelMargin,
          padding: [0, 0, 0, 0],
          formatter: (value: number) => `${value}`,
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          show: chartConfig.splitLineVisible,
          lineStyle: {
            color: tones.splitLine,
            type: 'dashed',
          },
        },
      },
      {
        type: 'value',
        show: scale.hasRightAxis,
        min: valueRangeByAxis.value[1].min,
        max: Math.max(valueRangeByAxis.value[1].max, 100),
        axisLabel: {
          show: scale.axisVisible && containerSize.value.width >= 240,
          color: tones.axis,
          fontSize: scale.axisFontSize,
          formatter: (value: number) => `${value}%`,
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    series: visibleSeriesRows.value.map((item, index) => {
      const color = item.color ?? palette.value[index % palette.value.length];
      const isLine = item.kind === 'line';

      if (isLine) {
        return {
          name: item.name,
          type: 'line',
          yAxisIndex: item.yAxisIndex ?? 1,
          data: item.values,
          smooth: item.smooth ?? chartConfig.smooth,
          symbol: chartConfig.showSymbol && containerSize.value.width >= 230 ? 'circle' : 'none',
          symbolSize: scale.symbolSize,
          lineStyle: {
            width: chartConfig.lineWidthPx,
            color,
            shadowBlur: 4,
            shadowColor: hexToRgba(color, 0.14),
          },
          itemStyle: {
            color,
            borderWidth: 1,
            borderColor: '#fff',
          },
          emphasis: {
            focus: 'series',
          },
        };
      }

      return {
        name: item.name,
        type: 'bar',
        yAxisIndex: item.yAxisIndex ?? 0,
        data: item.values,
        barWidth: scale.barWidth,
        barMaxWidth: chartConfig.barMaxWidthPx,
        barGap: chartConfig.barGap,
        barCategoryGap: chartConfig.barCategoryGap,
        itemStyle: {
          color: makeBarGradient(color),
          borderRadius: [chartConfig.borderRadiusPx, chartConfig.borderRadiusPx, 1, 1],
          shadowBlur: 5,
          shadowColor: hexToRgba(color, 0.12),
        },
        markLine: chartConfig.targetLineVisible && Number.isFinite(item.targetValue)
          ? {
              silent: true,
              symbol: 'none',
              label: {
                formatter: '目标',
                color: '#8a5a00',
                fontSize: scale.axisFontSize,
              },
              lineStyle: {
                color: '#ffb020',
                type: 'dashed',
                width: 1,
              },
              data: [{ yAxis: item.targetValue }],
            }
          : undefined,
        emphasis: {
          focus: 'series',
          itemStyle: {
            color,
          },
        },
      };
    }),
  };
});

const cardStyle = computed(() => {
  const layout = resolvedLayout.value;
  const titleConfig = resolvedTitle.value;
  const auxConfig = resolvedAux.value;
  const tones = resolvedTones.value;

  return {
    '--combo-chart-card-padding': `${layout.paddingPx}px`,
    '--combo-chart-card-gap': `${layout.gapPx}px`,
    '--combo-chart-content-gap': `${layout.contentGapPx}px`,
    '--combo-chart-title-row': `${layout.titleHeightPx}px`,
    '--combo-chart-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--combo-chart-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--combo-chart-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--combo-chart-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--combo-chart-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--combo-chart-aux-label-color': auxConfig.labelColor,
    '--combo-chart-aux-value-color': auxConfig.valueColor,
    '--combo-chart-title-font-size': `${titleConfig.fontSizePx}px`,
    '--combo-chart-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--combo-chart-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--combo-chart-title-color': titleConfig.color || tones.text,
    '--combo-chart-unit-color': titleConfig.unitColor || tones.unit,
    '--combo-chart-primary': tones.primary,
    '--combo-chart-primary-soft': hexToRgba(tones.primary, 0.2),
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
  <section ref="rootRef" class="combo-chart-example-card" :class="cardClasses" :style="cardStyle" aria-label="组合图卡片">
    <header v-if="resolvedTitle.visible" class="combo-chart-example-header">
      <div class="combo-chart-example-title-wrap">
        <span class="combo-chart-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="combo-chart-example-unit">{{ unit }}</span>
    </header>
    <div class="combo-chart-example-body">
      <div v-if="visibleAuxMetrics.length" class="combo-chart-example-aux" aria-label="附加指标">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="combo-chart-example-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="combo-chart-example-chart-pane">
        <div v-if="hasRenderableData" ref="chartRef" class="combo-chart-example-canvas" />
        <div v-else class="combo-chart-example-empty">暂无数据</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.combo-chart-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--combo-chart-title-row) minmax(0, 1fr);
  row-gap: var(--combo-chart-card-gap);
  padding: var(--combo-chart-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--combo-chart-title-color);
}

.combo-chart-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.combo-chart-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.combo-chart-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.combo-chart-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--combo-chart-title-color);
  font-size: var(--combo-chart-title-font-size);
  line-height: var(--combo-chart-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.combo-chart-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--combo-chart-primary) 0%, var(--combo-chart-primary-soft) 72%, transparent 100%);
}

.combo-chart-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--combo-chart-unit-color);
  font-size: var(--combo-chart-unit-font-size);
  line-height: var(--combo-chart-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.combo-chart-example-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--combo-chart-content-gap);
  overflow: hidden;
}

.combo-chart-example-card.has-aux.is-horizontal .combo-chart-example-body {
  grid-template-columns: var(--combo-chart-horizontal-split);
  grid-template-rows: minmax(0, 1fr);
}

.combo-chart-example-card.has-aux.is-vertical .combo-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--combo-chart-vertical-split);
}

.combo-chart-example-card:not(.has-aux) .combo-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.combo-chart-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.combo-chart-example-card.aux-horizontal .combo-chart-example-aux {
  grid-template-columns: repeat(var(--combo-chart-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.combo-chart-example-card.aux-vertical .combo-chart-example-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--combo-chart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.combo-chart-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  color: var(--combo-chart-aux-value-color);
  overflow: hidden;
}

.combo-chart-example-card.aux-horizontal .combo-chart-example-aux-item {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto;
  justify-items: center;
  text-align: center;
  row-gap: 1px;
}

.combo-chart-example-card.aux-vertical .combo-chart-example-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
  text-align: left;
}

.combo-chart-example-aux-item em,
.combo-chart-example-aux-item b {
  min-width: 0;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.combo-chart-example-aux-item em {
  color: var(--combo-chart-aux-label-color);
  font-size: var(--combo-chart-aux-label-font-size);
  font-weight: 600;
}

.combo-chart-example-aux-item b {
  color: var(--combo-chart-aux-value-color);
  font-size: var(--combo-chart-aux-value-font-size);
  font-weight: 800;
}

.combo-chart-example-card.aux-vertical .combo-chart-example-aux-item b {
  justify-self: end;
}

.combo-chart-example-aux-item.tone-neutral b {
  color: #52677a;
}

.combo-chart-example-aux-item.tone-success b {
  color: #12a867;
}

.combo-chart-example-aux-item.tone-warning b {
  color: #e58a00;
}

.combo-chart-example-aux-item.tone-danger b {
  color: #d93025;
}

.combo-chart-example-chart-pane {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.combo-chart-example-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.combo-chart-example-empty {
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  color: #667085;
  font-size: 12px;
}
</style>
