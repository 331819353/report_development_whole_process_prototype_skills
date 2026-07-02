<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface LineChartExampleSeries {
  name: string;
  values: number[];
  color?: string;
  areaVisible?: boolean;
  smooth?: boolean;
}

interface LineChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface LineChartExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface LineChartExampleLayoutConfig {
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

interface LineChartExampleChartConfig {
  legendVisible?: boolean | 'auto';
  smooth?: boolean;
  areaVisible?: boolean;
  showSymbol?: boolean;
  lineWidthPx?: number;
  gridTopPx?: number;
  gridBottomPx?: number;
  gridLeftPx?: number;
  gridRightPx?: number;
  axisVisible?: boolean;
  splitLineVisible?: boolean;
}

interface LineChartExampleToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  axis?: string;
  splitLine?: string;
  text?: string;
  unit?: string;
}

interface LineChartExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface LineChartExampleCardConfig {
  title?: LineChartExampleTitleConfig;
  layout?: LineChartExampleLayoutConfig;
  aux?: LineChartExampleAuxConfig;
  chart?: LineChartExampleChartConfig;
  tones?: LineChartExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  categories?: string[];
  values?: number[];
  series?: LineChartExampleSeries[];
  auxMetrics?: LineChartExampleAuxMetric[];
  config?: LineChartExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const defaultCategories = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];
const defaultValues = [42, 58, 53, 67, 74, 69, 88];

const defaultTitleConfig: Required<LineChartExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<LineChartExampleLayoutConfig> = {
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

const defaultChartConfig: Required<LineChartExampleChartConfig> = {
  legendVisible: 'auto',
  smooth: true,
  areaVisible: true,
  showSymbol: true,
  lineWidthPx: 2,
  gridTopPx: 10,
  gridBottomPx: 18,
  gridLeftPx: 0,
  gridRightPx: 8,
  axisVisible: true,
  splitLineVisible: true,
};

const defaultToneConfig: Required<LineChartExampleToneConfig> = {
  primary: '#0057d9',
  secondary: '#2f9bff',
  tertiary: '#7eb8ff',
  axis: '#7a8aa0',
  splitLine: 'rgba(0, 87, 217, 0.1)',
  text: '#15304f',
  unit: '#667085',
};

const defaultAuxConfig: Required<LineChartExampleAuxConfig> = {
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

const normalizeOrientation = (value: unknown): Required<LineChartExampleLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeAuxOrientation = (value: unknown): Required<LineChartExampleAuxConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const resolvedTitle = computed<Required<LineChartExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<LineChartExampleLayoutConfig>>(() => {
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

const resolvedAux = computed<Required<LineChartExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  orientation: normalizeAuxOrientation(props.config?.aux?.orientation),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<LineChartExampleChartConfig>>(() => ({
  ...defaultChartConfig,
  ...(props.config?.chart ?? {}),
  lineWidthPx: clampNumber(props.config?.chart?.lineWidthPx, 1, 5, defaultChartConfig.lineWidthPx),
  gridTopPx: clampNumber(props.config?.chart?.gridTopPx, 0, 40, defaultChartConfig.gridTopPx),
  gridBottomPx: clampNumber(props.config?.chart?.gridBottomPx, 4, 42, defaultChartConfig.gridBottomPx),
  gridLeftPx: clampNumber(props.config?.chart?.gridLeftPx, 0, 60, defaultChartConfig.gridLeftPx),
  gridRightPx: clampNumber(props.config?.chart?.gridRightPx, 4, 36, defaultChartConfig.gridRightPx),
}));

const resolvedTones = computed<Required<LineChartExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '折线图卡片');
const unit = computed(() => props.unit?.trim() || '单位：万元');
const categories = computed(() => (props.categories?.length ? props.categories : defaultCategories));
const seriesRows = computed<LineChartExampleSeries[]>(() => {
  if (props.series?.length) {
    return props.series.filter((item) => item.values.length);
  }

  return [
    {
      name: '趋势值',
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

const defaultAuxMetrics = computed<LineChartExampleAuxMetric[]>(() => {
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

const auxOrientation = computed<'horizontal' | 'vertical'>(() => {
  const orientation = resolvedAux.value.orientation;

  if (orientation === 'horizontal' || orientation === 'vertical') {
    return orientation;
  }

  return contentOrientation.value;
});

const cardClasses = computed(() => ({
  [`is-${contentOrientation.value}`]: true,
  [`aux-${auxOrientation.value}`]: true,
  'has-aux': visibleAuxMetrics.value.length > 0,
  'has-title': resolvedTitle.value.visible,
}));

const isCompactChart = computed(() => {
  const height =
    chartSize.value.height ||
    Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 0);

  return height > 0 && height < 200;
});

const chartScale = computed(() => {
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 80);
  const height = chartSize.value.height || fallbackHeight;
  const compact = Math.min(width / 280, height / 170);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
  const axisVisible = resolvedChart.value.axisVisible && width >= 150 && height >= 86;
  const legendSetting = resolvedChart.value.legendVisible;
  const legendEnabled =
    legendSetting === true ? true : legendSetting === false ? false : seriesRows.value.length > 1;
  const legendVisible = legendEnabled && seriesRows.value.length > 0 && width >= 240 && height >= 130;
  const yAxisLabelGutter = axisVisible ? Math.max(resolvedChart.value.gridLeftPx, width < 220 ? 24 : 30) : 0;

  return {
    fontSize,
    axisFontSize: Math.max(8, fontSize - 1),
    symbolSize: Math.round(clampNumber(Math.min(width, height) / 24, 4, 8, 5) * 10) / 10,
    legendVisible,
    axisVisible,
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

const makeAreaGradient = (color: string, opacity = 0.18) =>
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: hexToRgba(color, opacity) },
    { offset: 0.55, color: hexToRgba(color, 0.055) },
    { offset: 1, color: 'rgba(255, 255, 255, 0)' },
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
      valueFormatter: (value) => `${value}${unit.value.replace('单位：', '')}`,
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: hexToRgba(tones.primary, 0.24),
          width: 1,
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
      const areaVisible = item.areaVisible ?? chartConfig.areaVisible;

      return {
        name: item.name,
        type: 'line',
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
        areaStyle: areaVisible
          ? {
              color: makeAreaGradient(color, index === 0 ? 0.2 : 0.1),
            }
          : undefined,
        emphasis: {
          focus: 'series',
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
  const titlelessAuxGapPx = Math.round(
    clampNumber(containerSize.value.height > 0 ? containerSize.value.height * 0.035 : undefined, 6, 14, 8),
  );

  return {
    '--line-chart-card-padding': `${layout.paddingPx}px`,
    '--line-chart-card-gap': `${layout.gapPx}px`,
    '--line-chart-content-gap': `${layout.contentGapPx}px`,
    '--line-chart-title-row': `${layout.titleHeightPx}px`,
    '--line-chart-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--line-chart-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--line-chart-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--line-chart-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--line-chart-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--line-chart-aux-label-color': auxConfig.labelColor,
    '--line-chart-aux-value-color': auxConfig.valueColor,
    '--line-chart-titleless-aux-gap': `${titlelessAuxGapPx}px`,
    '--line-chart-title-font-size': `${titleConfig.fontSizePx}px`,
    '--line-chart-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--line-chart-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--line-chart-title-color': titleConfig.color || tones.text,
    '--line-chart-unit-color': titleConfig.unitColor || tones.unit,
    '--line-chart-primary': tones.primary,
    '--line-chart-primary-soft': hexToRgba(tones.primary, 0.2),
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
  <section ref="rootRef" class="line-chart-example-card" :class="cardClasses" :style="cardStyle" aria-label="折线图卡片">
    <header v-if="resolvedTitle.visible" class="line-chart-example-header">
      <div class="line-chart-example-title-wrap">
        <span class="line-chart-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="line-chart-example-unit">{{ unit }}</span>
    </header>
    <div class="line-chart-example-body">
      <div v-if="visibleAuxMetrics.length" class="line-chart-example-aux" aria-label="附加指标">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="line-chart-example-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="line-chart-example-chart-pane" :class="{ 'is-compact-chart': isCompactChart }">
        <div v-if="hasRenderableData" ref="chartRef" class="line-chart-example-canvas" />
        <div v-else class="line-chart-example-empty">暂无数据</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-chart-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--line-chart-title-row) minmax(0, 1fr);
  row-gap: var(--line-chart-card-gap);
  padding: var(--line-chart-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--line-chart-title-color);
}

.line-chart-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.line-chart-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.line-chart-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.line-chart-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--line-chart-title-color);
  font-size: var(--line-chart-title-font-size);
  line-height: var(--line-chart-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.line-chart-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--line-chart-primary) 0%, var(--line-chart-primary-soft) 72%, transparent 100%);
}

.line-chart-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--line-chart-unit-color);
  font-size: var(--line-chart-unit-font-size);
  line-height: var(--line-chart-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.line-chart-example-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--line-chart-content-gap);
  overflow: hidden;
}

.line-chart-example-card.has-aux.is-horizontal .line-chart-example-body,
.line-chart-example-card.has-aux.is-vertical .line-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: max-content minmax(0, 1fr);
  gap: min(var(--line-chart-content-gap), 2px);
}

.line-chart-example-card:not(.has-aux) .line-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.line-chart-example-card:not(.has-title).has-aux .line-chart-example-aux {
  margin-top: var(--line-chart-titleless-aux-gap);
}

.line-chart-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.line-chart-example-card.aux-horizontal .line-chart-example-aux {
  grid-template-columns: repeat(var(--line-chart-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.line-chart-example-card.aux-vertical .line-chart-example-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--line-chart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.line-chart-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  color: var(--line-chart-aux-value-color);
  overflow: hidden;
}

.line-chart-example-card.aux-horizontal .line-chart-example-aux-item {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto;
  justify-items: center;
  text-align: center;
  row-gap: 1px;
}

.line-chart-example-card.aux-vertical .line-chart-example-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
  text-align: left;
}

.line-chart-example-aux-item em,
.line-chart-example-aux-item b {
  min-width: 0;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-chart-example-aux-item em {
  color: var(--line-chart-aux-label-color);
  font-size: var(--line-chart-aux-label-font-size);
  font-weight: 600;
}

.line-chart-example-aux-item b {
  color: var(--line-chart-aux-value-color);
  font-size: var(--line-chart-aux-value-font-size);
  font-weight: 800;
}

.line-chart-example-card.aux-vertical .line-chart-example-aux-item b {
  justify-self: end;
}

.line-chart-example-aux-item.tone-neutral b {
  color: #52677a;
}

.line-chart-example-aux-item.tone-success b {
  color: #12a867;
}

.line-chart-example-aux-item.tone-warning b {
  color: #e58a00;
}

.line-chart-example-aux-item.tone-danger b {
  color: #d93025;
}

.line-chart-example-chart-pane {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.line-chart-example-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.line-chart-example-empty {
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  color: #667085;
  font-size: 12px;
}
</style>
