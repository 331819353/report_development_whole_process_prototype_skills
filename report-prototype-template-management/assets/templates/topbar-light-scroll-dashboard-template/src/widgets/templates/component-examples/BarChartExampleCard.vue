<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface BarChartExampleSeries {
  name: string;
  values: number[];
  color?: string;
  stack?: string;
}

interface BarChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface BarChartExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface BarChartExampleLayoutConfig {
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

interface BarChartExampleChartConfig {
  legendVisible?: boolean;
  barWidthPx?: number;
  barMaxWidthPx?: number;
  barGap?: string;
  barCategoryGap?: string;
  borderRadiusPx?: number;
  gridTopPx?: number;
  gridBottomPx?: number;
  gridLeftPx?: number;
  gridRightPx?: number;
  axisVisible?: boolean;
  splitLineVisible?: boolean;
}

interface BarChartExampleToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  axis?: string;
  splitLine?: string;
  text?: string;
  unit?: string;
}

interface BarChartExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface BarChartExampleCardConfig {
  title?: BarChartExampleTitleConfig;
  layout?: BarChartExampleLayoutConfig;
  aux?: BarChartExampleAuxConfig;
  chart?: BarChartExampleChartConfig;
  tones?: BarChartExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  categories?: string[];
  values?: number[];
  series?: BarChartExampleSeries[];
  auxMetrics?: BarChartExampleAuxMetric[];
  config?: BarChartExampleCardConfig;
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

const defaultTitleConfig: Required<BarChartExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<BarChartExampleLayoutConfig> = {
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

const defaultChartConfig: Required<BarChartExampleChartConfig> = {
  legendVisible: false,
  barWidthPx: 0,
  barMaxWidthPx: 18,
  barGap: '24%',
  barCategoryGap: '42%',
  borderRadiusPx: 3,
  gridTopPx: 10,
  gridBottomPx: 18,
  gridLeftPx: 0,
  gridRightPx: 8,
  axisVisible: true,
  splitLineVisible: true,
};

const defaultToneConfig: Required<BarChartExampleToneConfig> = {
  primary: '#0057d9',
  secondary: '#2f9bff',
  tertiary: '#7eb8ff',
  axis: '#7a8aa0',
  splitLine: 'rgba(0, 87, 217, 0.1)',
  text: '#15304f',
  unit: '#667085',
};

const defaultAuxConfig: Required<BarChartExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
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

const normalizeOrientation = (value: unknown): Required<BarChartExampleLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const resolvedTitle = computed<Required<BarChartExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<BarChartExampleLayoutConfig>>(() => {
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

const resolvedAux = computed<Required<BarChartExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<BarChartExampleChartConfig>>(() => ({
  ...defaultChartConfig,
  ...(props.config?.chart ?? {}),
  barWidthPx: clampNumber(props.config?.chart?.barWidthPx, 0, 36, defaultChartConfig.barWidthPx),
  barMaxWidthPx: clampNumber(props.config?.chart?.barMaxWidthPx, 4, 36, defaultChartConfig.barMaxWidthPx),
  borderRadiusPx: clampNumber(props.config?.chart?.borderRadiusPx, 0, 12, defaultChartConfig.borderRadiusPx),
  gridTopPx: clampNumber(props.config?.chart?.gridTopPx, 0, 40, defaultChartConfig.gridTopPx),
  gridBottomPx: clampNumber(props.config?.chart?.gridBottomPx, 4, 42, defaultChartConfig.gridBottomPx),
  gridLeftPx: clampNumber(props.config?.chart?.gridLeftPx, 0, 60, defaultChartConfig.gridLeftPx),
  gridRightPx: clampNumber(props.config?.chart?.gridRightPx, 4, 36, defaultChartConfig.gridRightPx),
}));

const resolvedTones = computed<Required<BarChartExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '柱状图卡片');
const unit = computed(() => props.unit?.trim() || '单位：万元');
const unitSuffix = computed(() => unit.value.replace(/^单位[:：]\s*/, ''));
const categories = computed(() => (props.categories?.length ? props.categories : defaultCategories));
const seriesRows = computed<BarChartExampleSeries[]>(() => {
  if (props.series?.length) {
    return props.series.filter((item) => item.values.length);
  }

  return [
    {
      name: '柱状值',
      values: props.values?.length ? props.values : defaultValues,
    },
  ];
});

const hasRenderableData = computed(() => categories.value.length > 0 && seriesRows.value.some((item) => item.values.length > 0));

const valueRange = computed(() => {
  const values = seriesRows.value.flatMap((item) => item.values).filter((value) => Number.isFinite(value));
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const padding = Math.max((max - min) * 0.14, 4);

  return {
    min: Math.max(0, Math.floor(min - padding)),
    max: Math.ceil(max + padding),
  };
});

const formatMetricNumber = (value: number | undefined) => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  return Math.round(value ?? 0).toLocaleString('zh-CN');
};

const defaultAuxMetrics = computed<BarChartExampleAuxMetric[]>(() => {
  const values = (seriesRows.value[0]?.values ?? []).filter((value) => Number.isFinite(value));
  const actual = values.length ? values[values.length - 1] : undefined;
  const previous = values.length > 1 ? values[values.length - 2] : values[0];
  const target = values.length ? Math.ceil(Math.max(...values, actual ?? 0) * 1.08) : undefined;

  return [
    { label: '上期', value: formatMetricNumber(previous), tone: 'neutral' },
    { label: '实际', value: formatMetricNumber(actual), tone: 'primary' },
    { label: '目标', value: formatMetricNumber(target), tone: 'success' },
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
}));

const chartScale = computed(() => {
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 80);
  const height = chartSize.value.height || fallbackHeight;
  const compact = Math.min(width / 280, height / 170);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
  const axisVisible = resolvedChart.value.axisVisible && width >= 150 && height >= 86;
  const legendVisible = resolvedChart.value.legendVisible && seriesRows.value.length > 1 && width >= 240 && height >= 130;
  const yAxisLabelGutter = axisVisible ? Math.max(resolvedChart.value.gridLeftPx, width < 220 ? 24 : 30) : 0;
  const visibleCategoryCount = Math.max(categories.value.length, 1);
  const visibleSeriesCount = Math.max(seriesRows.value.length, 1);
  const autoBarWidth = Math.floor(width / (visibleCategoryCount * visibleSeriesCount * 2.8));
  const barWidth = resolvedChart.value.barWidthPx || clampNumber(autoBarWidth, 4, resolvedChart.value.barMaxWidthPx, 8);

  return {
    fontSize,
    axisFontSize: Math.max(8, fontSize - 1),
    legendVisible,
    axisVisible,
    barWidth,
    gridTop: legendVisible ? Math.max(resolvedChart.value.gridTopPx, 24) : resolvedChart.value.gridTopPx,
    gridBottom: axisVisible ? resolvedChart.value.gridBottomPx : 6,
    gridLeft: yAxisLabelGutter,
    yAxisLabelMargin: yAxisLabelGutter,
    gridRight: width < 220 ? 6 : resolvedChart.value.gridRightPx,
  };
});

const palette = computed(() => [resolvedTones.value.primary, resolvedTones.value.secondary, resolvedTones.value.tertiary]);

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
    { offset: 0, color: hexToRgba(color, 0.16) },
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
      valueFormatter: (value) => `${value}${unitSuffix.value}`,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: hexToRgba(tones.primary, 0.06),
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
    yAxis: {
      type: 'value',
      min: valueRange.value.min,
      max: valueRange.value.max,
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
    series: seriesRows.value.map((item, index) => {
      const color = item.color ?? palette.value[index % palette.value.length];

      return {
        name: item.name,
        type: 'bar',
        data: item.values,
        stack: item.stack,
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
    '--bar-chart-card-padding': `${layout.paddingPx}px`,
    '--bar-chart-card-gap': `${layout.gapPx}px`,
    '--bar-chart-content-gap': `${layout.contentGapPx}px`,
    '--bar-chart-title-row': `${layout.titleHeightPx}px`,
    '--bar-chart-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--bar-chart-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--bar-chart-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--bar-chart-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--bar-chart-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--bar-chart-aux-label-color': auxConfig.labelColor,
    '--bar-chart-aux-value-color': auxConfig.valueColor,
    '--bar-chart-title-font-size': `${titleConfig.fontSizePx}px`,
    '--bar-chart-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--bar-chart-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--bar-chart-title-color': titleConfig.color || tones.text,
    '--bar-chart-unit-color': titleConfig.unitColor || tones.unit,
    '--bar-chart-primary': tones.primary,
    '--bar-chart-primary-soft': hexToRgba(tones.primary, 0.2),
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
  <section ref="rootRef" class="bar-chart-example-card" :class="cardClasses" :style="cardStyle" aria-label="柱状图卡片">
    <header v-if="resolvedTitle.visible" class="bar-chart-example-header">
      <div class="bar-chart-example-title-wrap">
        <span class="bar-chart-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="bar-chart-example-unit">{{ unit }}</span>
    </header>
    <div class="bar-chart-example-body">
      <div v-if="visibleAuxMetrics.length" class="bar-chart-example-aux" aria-label="附加指标">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="bar-chart-example-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="bar-chart-example-chart-pane">
        <div v-if="hasRenderableData" ref="chartRef" class="bar-chart-example-canvas" />
        <div v-else class="bar-chart-example-empty">暂无数据</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bar-chart-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--bar-chart-title-row) minmax(0, 1fr);
  row-gap: var(--bar-chart-card-gap);
  padding: var(--bar-chart-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--bar-chart-title-color);
}

.bar-chart-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.bar-chart-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.bar-chart-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.bar-chart-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--bar-chart-title-color);
  font-size: var(--bar-chart-title-font-size);
  line-height: var(--bar-chart-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.bar-chart-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--bar-chart-primary) 0%, var(--bar-chart-primary-soft) 72%, transparent 100%);
}

.bar-chart-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--bar-chart-unit-color);
  font-size: var(--bar-chart-unit-font-size);
  line-height: var(--bar-chart-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.bar-chart-example-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--bar-chart-content-gap);
  overflow: hidden;
}

.bar-chart-example-card.has-aux.is-horizontal .bar-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--bar-chart-horizontal-split);
}

.bar-chart-example-card.has-aux.is-vertical .bar-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--bar-chart-vertical-split);
}

.bar-chart-example-card:not(.has-aux) .bar-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.bar-chart-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.bar-chart-example-card.is-horizontal .bar-chart-example-aux {
  grid-template-columns: repeat(var(--bar-chart-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.bar-chart-example-card.is-vertical .bar-chart-example-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--bar-chart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.bar-chart-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  color: var(--bar-chart-aux-value-color);
  overflow: hidden;
}

.bar-chart-example-card.is-horizontal .bar-chart-example-aux-item {
  justify-items: center;
  text-align: center;
}

.bar-chart-example-card.is-vertical .bar-chart-example-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
}

.bar-chart-example-aux-item em,
.bar-chart-example-aux-item b {
  min-width: 0;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bar-chart-example-aux-item em {
  color: var(--bar-chart-aux-label-color);
  font-size: var(--bar-chart-aux-label-font-size);
  font-weight: 600;
}

.bar-chart-example-aux-item b {
  color: var(--bar-chart-aux-value-color);
  font-size: var(--bar-chart-aux-value-font-size);
  font-weight: 800;
}

.bar-chart-example-card.is-vertical .bar-chart-example-aux-item b {
  justify-self: end;
}

.bar-chart-example-aux-item.tone-neutral b {
  color: #52677a;
}

.bar-chart-example-aux-item.tone-success b {
  color: #12a867;
}

.bar-chart-example-aux-item.tone-warning b {
  color: #e58a00;
}

.bar-chart-example-aux-item.tone-danger b {
  color: #d93025;
}

.bar-chart-example-chart-pane {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.bar-chart-example-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.bar-chart-example-empty {
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  color: #667085;
  font-size: 12px;
}
</style>
