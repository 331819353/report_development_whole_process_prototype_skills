<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface RoundedFunnelStage {
  name: string;
  value: number;
  color?: string;
  detail?: string;
}

interface RoundedFunnelAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface RoundedFunnelTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface RoundedFunnelLayoutConfig {
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

interface RoundedFunnelChartConfig {
  labelVisible?: boolean;
  trackVisible?: boolean;
  conversionVisible?: boolean;
  minWidthPercent?: number;
  barHeightPx?: number;
  maxBarHeightPx?: number;
  borderRadiusPx?: number;
  gridTopPx?: number;
  gridBottomPx?: number;
  gridLeftPx?: number;
  gridRightPx?: number;
}

interface RoundedFunnelToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  track?: string;
  text?: string;
  unit?: string;
}

interface RoundedFunnelAuxConfig {
  visible?: boolean;
  maxItems?: number;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface RoundedFunnelCardConfig {
  title?: RoundedFunnelTitleConfig;
  layout?: RoundedFunnelLayoutConfig;
  aux?: RoundedFunnelAuxConfig;
  chart?: RoundedFunnelChartConfig;
  tones?: RoundedFunnelToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  stages?: RoundedFunnelStage[];
  auxMetrics?: RoundedFunnelAuxMetric[];
  config?: RoundedFunnelCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const defaultStages: RoundedFunnelStage[] = [
  { name: '访问', value: 1280, detail: '访问人群' },
  { name: '留资', value: 920, detail: '有效线索' },
  { name: '试用', value: 640, detail: '进入试用' },
  { name: '成交', value: 410, detail: '完成成交' },
];

const defaultTitleConfig: Required<RoundedFunnelTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<RoundedFunnelLayoutConfig> = {
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

const defaultChartConfig: Required<RoundedFunnelChartConfig> = {
  labelVisible: true,
  trackVisible: false,
  conversionVisible: true,
  minWidthPercent: 28,
  barHeightPx: 0,
  maxBarHeightPx: 28,
  borderRadiusPx: 8,
  gridTopPx: 8,
  gridBottomPx: 8,
  gridLeftPx: 0,
  gridRightPx: 0,
};

const defaultToneConfig: Required<RoundedFunnelToneConfig> = {
  primary: '#0057d9',
  secondary: '#2f9bff',
  tertiary: '#49c0b6',
  quaternary: '#18a058',
  track: 'rgba(0, 87, 217, 0.07)',
  text: '#15304f',
  unit: '#667085',
};

const defaultAuxConfig: Required<RoundedFunnelAuxConfig> = {
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

const normalizeOrientation = (value: unknown): Required<RoundedFunnelLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeAuxOrientation = (value: unknown): Required<RoundedFunnelAuxConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const resolvedTitle = computed<Required<RoundedFunnelTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<RoundedFunnelLayoutConfig>>(() => {
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

const resolvedAux = computed<Required<RoundedFunnelAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  orientation: normalizeAuxOrientation(props.config?.aux?.orientation),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<RoundedFunnelChartConfig>>(() => ({
  ...defaultChartConfig,
  ...(props.config?.chart ?? {}),
  minWidthPercent: clampNumber(props.config?.chart?.minWidthPercent, 12, 80, defaultChartConfig.minWidthPercent),
  barHeightPx: clampNumber(props.config?.chart?.barHeightPx, 0, 42, defaultChartConfig.barHeightPx),
  maxBarHeightPx: clampNumber(props.config?.chart?.maxBarHeightPx, 10, 42, defaultChartConfig.maxBarHeightPx),
  borderRadiusPx: clampNumber(props.config?.chart?.borderRadiusPx, 0, 18, defaultChartConfig.borderRadiusPx),
  gridTopPx: clampNumber(props.config?.chart?.gridTopPx, 0, 32, defaultChartConfig.gridTopPx),
  gridBottomPx: clampNumber(props.config?.chart?.gridBottomPx, 0, 32, defaultChartConfig.gridBottomPx),
  gridLeftPx: clampNumber(props.config?.chart?.gridLeftPx, 0, 48, defaultChartConfig.gridLeftPx),
  gridRightPx: clampNumber(props.config?.chart?.gridRightPx, 0, 48, defaultChartConfig.gridRightPx),
}));

const resolvedTones = computed<Required<RoundedFunnelToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '圆角漏斗图卡片');
const unit = computed(() => props.unit?.trim() || '单位：人');
const unitSuffix = computed(() => unit.value.replace(/^单位[:：]\s*/, ''));
const stages = computed(() => (props.stages?.length ? props.stages : defaultStages));

const normalizedStages = computed(() => {
  const finiteStages = stages.value
    .map((stage) => ({
      ...stage,
      name: stage.name?.trim() || '阶段',
      value: Math.max(0, Number(stage.value) || 0),
    }))
    .filter((stage) => stage.name && stage.value > 0);
  const maxValue = Math.max(...finiteStages.map((stage) => stage.value), 1);

  return finiteStages.map((stage, index) => {
    const previous = finiteStages[index - 1];
    const percent = clampNumber((stage.value / maxValue) * 100, resolvedChart.value.minWidthPercent, 100, 100);
    const conversion = previous ? clampNumber((stage.value / Math.max(previous.value, 1)) * 100, 0, 999, 0) : 100;

    return {
      ...stage,
      index,
      rawPercent: (stage.value / maxValue) * 100,
      percent,
      conversion,
      formattedValue: Math.round(stage.value).toLocaleString('zh-CN'),
    };
  });
});

const hasRenderableData = computed(() => normalizedStages.value.length > 0);

const formatPercent = (value: number) => `${Math.round(value)}%`;

const defaultAuxMetrics = computed<RoundedFunnelAuxMetric[]>(() => {
  const rows = normalizedStages.value;
  const entry = rows[0]?.value ?? 0;
  const final = rows[rows.length - 1]?.value ?? 0;
  const totalConversion = entry > 0 ? (final / entry) * 100 : 0;

  return [
    { label: '成交', value: Math.round(final).toLocaleString('zh-CN'), tone: 'primary' },
    { label: '总转化', value: formatPercent(totalConversion), tone: 'success' },
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

const palette = computed(() => [
  resolvedTones.value.primary,
  resolvedTones.value.secondary,
  resolvedTones.value.tertiary,
  resolvedTones.value.quaternary,
]);

const chartScale = computed(() => {
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 80);
  const height = chartSize.value.height || fallbackHeight;
  const itemCount = Math.max(normalizedStages.value.length, 1);
  const compact = Math.min(width / 280, height / 160);
  const autoBarHeight = Math.floor((height - resolvedChart.value.gridTopPx - resolvedChart.value.gridBottomPx) / (itemCount * 1.7));
  const barHeight = resolvedChart.value.barHeightPx
    || clampNumber(autoBarHeight, 12, resolvedChart.value.maxBarHeightPx, 18);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;

  return {
    barHeight,
    radius: Math.min(resolvedChart.value.borderRadiusPx, Math.round(barHeight / 2)),
    fontSize,
    valueFontSize: Math.max(8, fontSize - 0.4),
    labelVisible: resolvedChart.value.labelVisible && width >= 150 && height >= 74,
    conversionVisible: resolvedChart.value.conversionVisible && width >= 210 && height >= 104,
    labelPadding: width < 210 ? 6 : 9,
    gridTop: resolvedChart.value.gridTopPx,
    gridBottom: resolvedChart.value.gridBottomPx,
    gridLeft: resolvedChart.value.gridLeftPx,
    gridRight: resolvedChart.value.gridRightPx,
  };
});

const makeStageGradient = (color: string) =>
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color },
    { offset: 0.68, color: hexToRgba(color, 0.76) },
    { offset: 1, color: hexToRgba(color, 0.34) },
  ]);

const truncateText = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(1, maxLength - 1))}…`;
};

const option = computed<EChartsOption>(() => {
  const scale = chartScale.value;
  const chartConfig = resolvedChart.value;
  const tones = resolvedTones.value;
  const rows = normalizedStages.value;
  const data = rows.map((stage) => ({
    name: stage.name,
    value: [stage.percent, stage.index, stage.value],
    rawValue: stage.formattedValue,
    conversion: stage.conversion,
    detail: stage.detail,
  }));
  const roundedFunnelSeries = {
    type: 'custom',
    coordinateSystem: 'cartesian2d',
    encode: { x: 0, y: 1 },
    data,
    renderItem: (_params: unknown, api: any) => {
      const stageIndex = Number(api.value(1));
      const stage = rows[stageIndex];

      if (!stage) {
        return null;
      }

      const start = api.coord([0, stageIndex]);
      const end = api.coord([100, stageIndex]);
      const fullWidth = Math.max(1, end[0] - start[0]);
      const width = Math.max(24, fullWidth * (stage.percent / 100));
      const x = start[0] + (fullWidth - width) / 2;
      const y = start[1] - scale.barHeight / 2;
      const color = stage.color ?? palette.value[stageIndex % palette.value.length];
      const maxLabelChars = width < 88 ? 2 : width < 132 ? 4 : 8;
      const stageLabel = truncateText(stage.name, maxLabelChars);
      const conversionLabel = stageIndex === 0 ? '' : formatPercent(stage.conversion);
      const children: any[] = [];

      if (chartConfig.trackVisible) {
        children.push({
          type: 'rect',
          silent: true,
          shape: {
            x: start[0],
            y,
            width: fullWidth,
            height: scale.barHeight,
            r: scale.radius,
          },
          style: {
            fill: tones.track,
          },
        });
      }

      children.push({
        type: 'rect',
        shape: {
          x,
          y,
          width,
          height: scale.barHeight,
          r: scale.radius,
        },
        style: {
          fill: makeStageGradient(color),
          shadowBlur: 6,
          shadowColor: hexToRgba(color, 0.18),
        },
      });

      if (scale.labelVisible) {
        children.push({
          type: 'text',
          silent: true,
          style: {
            x: x + scale.labelPadding,
            y: y + scale.barHeight / 2,
            text: stageLabel,
            fill: '#ffffff',
            font: `700 ${scale.fontSize}px sans-serif`,
            align: 'left',
            verticalAlign: 'middle',
          },
        });
        children.push({
          type: 'text',
          silent: true,
          style: {
            x: x + width - scale.labelPadding,
            y: y + scale.barHeight / 2,
            text: stage.formattedValue,
            fill: '#ffffff',
            font: `800 ${scale.valueFontSize}px sans-serif`,
            align: 'right',
            verticalAlign: 'middle',
          },
        });
      }

      if (scale.conversionVisible && conversionLabel) {
        children.push({
          type: 'text',
          silent: true,
          style: {
            x: end[0] - 2,
            y: y + scale.barHeight / 2,
            text: conversionLabel,
            fill: tones.unit,
            font: `700 ${Math.max(8, scale.fontSize - 1)}px sans-serif`,
            align: 'right',
            verticalAlign: 'middle',
          },
        });
      }

      return {
        type: 'group',
        children,
      };
    },
  } as any;

  return {
    animationDuration: 520,
    animationEasing: 'cubicOut',
    grid: {
      top: scale.gridTop,
      right: scale.gridRight,
      bottom: scale.gridBottom,
      left: scale.gridLeft,
      containLabel: false,
    },
    tooltip: {
      trigger: 'item',
      confine: true,
      appendToBody: true,
      formatter: (params: unknown) => {
        const item = params as { name?: string; data?: { rawValue?: string; conversion?: number; detail?: string } };
        const conversionText = item.data?.conversion === undefined ? '' : `阶段转化：${formatPercent(item.data.conversion)}`;

        return [
          item.name ?? '',
          `数值：${item.data?.rawValue ?? '--'}${unitSuffix.value}`,
          conversionText,
          item.data?.detail,
        ].filter(Boolean).join('<br/>');
      },
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      show: false,
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: rows.map((stage) => stage.name),
      show: false,
    },
    series: [roundedFunnelSeries],
  } as EChartsOption;
});

const cardStyle = computed(() => {
  const layout = resolvedLayout.value;
  const titleConfig = resolvedTitle.value;
  const auxConfig = resolvedAux.value;
  const tones = resolvedTones.value;

  return {
    '--rounded-funnel-card-padding': `${layout.paddingPx}px`,
    '--rounded-funnel-card-gap': `${layout.gapPx}px`,
    '--rounded-funnel-content-gap': `${layout.contentGapPx}px`,
    '--rounded-funnel-title-row': `${layout.titleHeightPx}px`,
    '--rounded-funnel-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--rounded-funnel-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--rounded-funnel-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--rounded-funnel-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--rounded-funnel-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--rounded-funnel-aux-label-color': auxConfig.labelColor,
    '--rounded-funnel-aux-value-color': auxConfig.valueColor,
    '--rounded-funnel-title-font-size': `${titleConfig.fontSizePx}px`,
    '--rounded-funnel-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--rounded-funnel-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--rounded-funnel-title-color': titleConfig.color || tones.text,
    '--rounded-funnel-unit-color': titleConfig.unitColor || tones.unit,
    '--rounded-funnel-primary': tones.primary,
    '--rounded-funnel-primary-soft': hexToRgba(tones.primary, 0.2),
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
  <section ref="rootRef" class="rounded-funnel-example-card" :class="cardClasses" :style="cardStyle" aria-label="圆角漏斗图卡片">
    <header v-if="resolvedTitle.visible" class="rounded-funnel-example-header">
      <div class="rounded-funnel-example-title-wrap">
        <span class="rounded-funnel-example-title" :class="{ 'has-underline': resolvedTitle.underline }">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="rounded-funnel-example-unit">{{ unit }}</span>
    </header>
    <div class="rounded-funnel-example-body">
      <div v-if="visibleAuxMetrics.length" class="rounded-funnel-example-aux" aria-label="附加指标">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="rounded-funnel-example-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="rounded-funnel-example-chart-pane">
        <div v-if="hasRenderableData" ref="chartRef" class="rounded-funnel-example-canvas" />
        <div v-else class="rounded-funnel-example-empty">暂无数据</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rounded-funnel-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--rounded-funnel-title-row) minmax(0, 1fr);
  row-gap: var(--rounded-funnel-card-gap);
  padding: var(--rounded-funnel-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--rounded-funnel-title-color);
}

.rounded-funnel-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.rounded-funnel-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.rounded-funnel-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.rounded-funnel-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--rounded-funnel-title-color);
  font-size: var(--rounded-funnel-title-font-size);
  line-height: var(--rounded-funnel-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.rounded-funnel-example-title.has-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--rounded-funnel-primary) 0%, var(--rounded-funnel-primary-soft) 72%, transparent 100%);
}

.rounded-funnel-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--rounded-funnel-unit-color);
  font-size: var(--rounded-funnel-unit-font-size);
  line-height: var(--rounded-funnel-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.rounded-funnel-example-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--rounded-funnel-content-gap);
  overflow: hidden;
}

.rounded-funnel-example-card.has-aux.is-horizontal .rounded-funnel-example-body,
.rounded-funnel-example-card.has-aux.is-vertical .rounded-funnel-example-body {
  grid-template-columns: var(--rounded-funnel-horizontal-split);
  grid-template-rows: minmax(0, 1fr);
}

.rounded-funnel-example-card:not(.has-aux) .rounded-funnel-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.rounded-funnel-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--rounded-funnel-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
  overflow: hidden;
}

.rounded-funnel-example-card.aux-horizontal .rounded-funnel-example-aux {
  grid-template-columns: repeat(var(--rounded-funnel-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.rounded-funnel-example-card.aux-vertical .rounded-funnel-example-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--rounded-funnel-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.rounded-funnel-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-content: center;
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
  overflow: hidden;
}

.rounded-funnel-example-card.aux-horizontal .rounded-funnel-example-aux-item {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto;
  justify-items: center;
  text-align: center;
  row-gap: 1px;
}

.rounded-funnel-example-card.aux-vertical .rounded-funnel-example-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
  text-align: left;
}

.rounded-funnel-example-aux-item em,
.rounded-funnel-example-aux-item b {
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
}

.rounded-funnel-example-aux-item em {
  color: var(--rounded-funnel-aux-label-color);
  font-size: var(--rounded-funnel-aux-label-font-size);
  line-height: 1.15;
  font-weight: 600;
}

.rounded-funnel-example-aux-item b {
  color: var(--rounded-funnel-aux-value-color);
  font-size: var(--rounded-funnel-aux-value-font-size);
  line-height: 1.1;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.rounded-funnel-example-aux-item.tone-success b {
  color: #18a058;
}

.rounded-funnel-example-aux-item.tone-warning b {
  color: #b7791f;
}

.rounded-funnel-example-aux-item.tone-danger b {
  color: #c0352b;
}

.rounded-funnel-example-aux-item.tone-neutral b {
  color: #344054;
}

.rounded-funnel-example-chart-pane {
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

.rounded-funnel-example-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.rounded-funnel-example-empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--rounded-funnel-unit-color);
  font-size: 10px;
}
</style>
