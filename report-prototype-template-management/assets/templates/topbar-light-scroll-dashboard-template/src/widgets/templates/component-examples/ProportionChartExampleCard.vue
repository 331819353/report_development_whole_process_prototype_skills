<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface ProportionChartExampleItem {
  name: string;
  value: number;
  color?: string;
}

interface ProportionChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface ProportionChartExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface ProportionChartExampleLayoutConfig {
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

interface ProportionChartExampleChartConfig {
  legendVisible?: boolean;
  legendPosition?: 'auto' | 'right' | 'top' | 'bottom' | 'hidden';
  legendWidthPx?: number;
  labelVisible?: boolean;
  labelLineVisible?: boolean;
  centerVisible?: boolean;
  donut?: boolean;
  roseType?: false | 'radius' | 'area';
  innerRadiusPercent?: number;
  outerRadiusPercent?: number;
  borderWidthPx?: number;
  minAngle?: number;
  valueUnit?: string;
  centerValueUnit?: string;
  percentDigits?: number;
  sliceGradient?: boolean;
}

interface ProportionChartExampleToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  axis?: string;
  text?: string;
  unit?: string;
}

interface ProportionChartExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface ProportionChartExampleCardConfig {
  title?: ProportionChartExampleTitleConfig;
  layout?: ProportionChartExampleLayoutConfig;
  aux?: ProportionChartExampleAuxConfig;
  chart?: ProportionChartExampleChartConfig;
  tones?: ProportionChartExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  totalLabel?: string;
  items?: ProportionChartExampleItem[];
  auxMetrics?: ProportionChartExampleAuxMetric[];
  config?: ProportionChartExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const defaultItems: ProportionChartExampleItem[] = [
  { name: '结构 A', value: 42 },
  { name: '结构 B', value: 28 },
  { name: '结构 C', value: 18 },
  { name: '其他', value: 12 },
];

const defaultTitleConfig: Required<ProportionChartExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<ProportionChartExampleLayoutConfig> = {
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

const defaultChartConfig: Required<ProportionChartExampleChartConfig> = {
  legendVisible: true,
  legendPosition: 'auto',
  legendWidthPx: 58,
  labelVisible: true,
  labelLineVisible: true,
  centerVisible: true,
  donut: true,
  roseType: false,
  innerRadiusPercent: 50,
  outerRadiusPercent: 68,
  borderWidthPx: 1,
  minAngle: 4,
  valueUnit: '',
  centerValueUnit: '',
  percentDigits: 1,
  sliceGradient: false,
};

const defaultToneConfig: Required<ProportionChartExampleToneConfig> = {
  primary: '#0057d9',
  secondary: '#2f8ee5',
  tertiary: '#7bb6df',
  quaternary: '#b8c3d1',
  axis: '#7a8aa0',
  text: '#15304f',
  unit: '#667085',
};

const defaultAuxConfig: Required<ProportionChartExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
  labelFontSizePx: 9,
  valueFontSizePx: 12,
  labelColor: '#6b7c93',
  valueColor: '#0057d9',
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

const normalizeOrientation = (value: unknown): Required<ProportionChartExampleLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeLegendPosition = (value: unknown): Required<ProportionChartExampleChartConfig>['legendPosition'] => {
  if (value === 'auto' || value === 'right' || value === 'top' || value === 'bottom' || value === 'hidden') {
    return value;
  }

  return defaultChartConfig.legendPosition;
};

const resolvedTitle = computed<Required<ProportionChartExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<ProportionChartExampleLayoutConfig>>(() => {
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

const resolvedAux = computed<Required<ProportionChartExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<ProportionChartExampleChartConfig>>(() => ({
  ...defaultChartConfig,
  ...(props.config?.chart ?? {}),
  legendPosition: normalizeLegendPosition(props.config?.chart?.legendPosition),
  legendWidthPx: clampNumber(props.config?.chart?.legendWidthPx, 42, 120, defaultChartConfig.legendWidthPx),
  innerRadiusPercent: clampNumber(props.config?.chart?.innerRadiusPercent, 0, 82, defaultChartConfig.innerRadiusPercent),
  outerRadiusPercent: clampNumber(props.config?.chart?.outerRadiusPercent, 32, 92, defaultChartConfig.outerRadiusPercent),
  borderWidthPx: clampNumber(props.config?.chart?.borderWidthPx, 0, 4, defaultChartConfig.borderWidthPx),
  minAngle: clampNumber(props.config?.chart?.minAngle, 0, 24, defaultChartConfig.minAngle),
  percentDigits: Math.round(clampNumber(props.config?.chart?.percentDigits, 0, 2, defaultChartConfig.percentDigits)),
}));

const resolvedTones = computed<Required<ProportionChartExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '占比图卡片');
const unit = computed(() => props.unit?.trim() || '单位：%');
const totalLabel = computed(() => props.totalLabel?.trim() || '合计');

const sourceItems = computed<ProportionChartExampleItem[]>(() => {
  if (props.items?.length) {
    return props.items;
  }

  const dataItems = (props.data ?? []).reduce<ProportionChartExampleItem[]>((items, item, index) => {
    if (!isRecord(item)) {
      return items;
    }

    items.push({
      name: String(item.name ?? item.label ?? `分类 ${index + 1}`),
      value: Number(item.value ?? item.amount ?? 0),
      color: typeof item.color === 'string' ? item.color : undefined,
    });

    return items;
  }, []);

  return dataItems?.length ? dataItems : defaultItems;
});

const visibleItems = computed(() =>
  sourceItems.value
    .map((item, index) => ({
      ...item,
      name: item.name?.trim() || `分类 ${index + 1}`,
      value: Number(item.value),
    }))
    .filter((item) => item.name && Number.isFinite(item.value) && item.value > 0)
    .slice(0, 8),
);

const hasRenderableData = computed(() => visibleItems.value.length > 0);
const totalValue = computed(() => visibleItems.value.reduce((sum, item) => sum + item.value, 0));

const formatNumber = (value: number | undefined, suffix = '') => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  const numeric = Number(value);
  const formatted = Math.abs(numeric) >= 1000
    ? Math.round(numeric).toLocaleString('zh-CN')
    : `${Math.round(numeric * 10) / 10}`;

  return `${formatted}${suffix}`;
};

const formatPercent = (value: number) => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  const digits = resolvedChart.value.percentDigits;

  return `${value.toFixed(digits)}%`;
};

const itemPercent = (value: number) => {
  if (!totalValue.value) {
    return 0;
  }

  return (value / totalValue.value) * 100;
};

const sortedItems = computed(() => [...visibleItems.value].sort((a, b) => b.value - a.value));

const defaultAuxMetrics = computed<ProportionChartExampleAuxMetric[]>(() => {
  const topItem = sortedItems.value[0];
  const secondItem = sortedItems.value[1];
  const valueUnit = resolvedChart.value.valueUnit;

  return [
    { label: '最大项', value: topItem?.name ?? '--', tone: 'primary' },
    { label: '占比', value: topItem ? formatPercent(itemPercent(topItem.value)) : '--', tone: 'success' },
    { label: '第二项', value: secondItem ? formatPercent(itemPercent(secondItem.value)) : '--', tone: 'neutral' },
    { label: '合计', value: formatNumber(totalValue.value, valueUnit), tone: 'warning' },
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
  '#d7dde7',
  '#9aaabd',
  '#5d82b8',
  '#eef2f6',
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

const makeSliceGradient = (color: string) =>
  new echarts.graphic.RadialGradient(0.3, 0.3, 0.85, [
    { offset: 0, color: hexToRgba(color, 0.72) },
    { offset: 1, color },
  ]);

const chartScale = computed(() => {
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 80);
  const height = chartSize.value.height || fallbackHeight;
  const compact = Math.min(width / 280, height / 170);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
  const chartConfig = resolvedChart.value;
  const effectiveLegendPosition = chartConfig.legendPosition === 'auto'
    ? (contentOrientation.value === 'vertical' ? 'top' : 'right')
    : chartConfig.legendPosition;
  const legendVisible = chartConfig.legendVisible
    && effectiveLegendPosition !== 'hidden'
    && visibleItems.value.length > 1
    && width >= 160
    && height >= 100;
  const rightLegendVisible = legendVisible && effectiveLegendPosition === 'right';
  const horizontalLegendVisible = legendVisible && (effectiveLegendPosition === 'top' || effectiveLegendPosition === 'bottom');
  const legendWidth = rightLegendVisible ? Math.min(chartConfig.legendWidthPx, Math.max(42, width * 0.34)) : 0;
  const chartWidth = rightLegendVisible ? Math.max(width - legendWidth - 4, 80) : width;
  const centerXNumber = rightLegendVisible ? clampNumber((chartWidth * 0.5 / width) * 100, 34, 50, 40) : 50;
  const centerYNumber = effectiveLegendPosition === 'top' ? 58 : effectiveLegendPosition === 'bottom' ? 46 : 52;
  const labelVisible = chartConfig.labelVisible && width >= 170 && height >= 105;
  const centerVisible = resolvedChart.value.centerVisible && resolvedChart.value.donut && width >= 160 && height >= 112;
  const radiusLimit = rightLegendVisible ? (width < 230 ? 56 : 64) : horizontalLegendVisible ? 62 : 68;
  const outerRadius = Math.min(clampNumber(chartConfig.outerRadiusPercent, 32, 92, defaultChartConfig.outerRadiusPercent), radiusLimit);
  const innerRadius = resolvedChart.value.donut
    ? Math.min(clampNumber(resolvedChart.value.innerRadiusPercent, 0, 82, defaultChartConfig.innerRadiusPercent), outerRadius - 12)
    : 0;

  return {
    fontSize,
    labelFontSize: Math.max(8, fontSize - 0.5),
    legendVisible,
    legendPosition: effectiveLegendPosition,
    rightLegendVisible,
    horizontalLegendVisible,
    legendWidth,
    legendTextWidth: rightLegendVisible ? Math.max(legendWidth - 18, 34) : Math.max(42, Math.min(72, width * 0.22)),
    labelVisible,
    centerVisible,
    centerX: `${Math.round(centerXNumber)}%`,
    centerY: `${centerYNumber}%`,
    centerLabelFontSize: Math.max(8, fontSize - 1),
    centerValueFontSize: Math.max(10, fontSize + 1),
    labelLineLength: width < 230 ? 8 : 12,
    labelLineLength2: width < 230 ? 5 : 10,
    labelWidth: width < 230 ? 46 : 62,
    radius: [`${Math.max(innerRadius, 0)}%`, `${outerRadius}%`] as [string, string],
  };
});

const chartData = computed(() =>
  visibleItems.value.map((item, index) => {
    const color = item.color ?? palette.value[index % palette.value.length];

    return {
      name: item.name,
      value: item.value,
      itemStyle: {
        color: resolvedChart.value.sliceGradient ? makeSliceGradient(color) : color,
      },
    };
  }),
);

const centerValue = computed(() => formatNumber(totalValue.value, resolvedChart.value.centerValueUnit));

const legendOption = computed(() => {
  const scale = chartScale.value;
  const tones = resolvedTones.value;
  const common = {
    show: scale.legendVisible,
    type: 'scroll' as const,
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 6,
    pageIconSize: 7,
    pageTextStyle: {
      color: tones.axis,
    },
    textStyle: {
      color: tones.axis,
      fontSize: scale.labelFontSize,
      overflow: 'truncate' as const,
      width: scale.legendTextWidth,
    },
  };

  if (scale.legendPosition === 'top') {
    return {
      ...common,
      top: 0,
      left: 'center',
      orient: 'horizontal' as const,
    };
  }

  if (scale.legendPosition === 'bottom') {
    return {
      ...common,
      bottom: 0,
      left: 'center',
      orient: 'horizontal' as const,
    };
  }

  return {
    ...common,
    right: 0,
    top: 'middle',
    orient: 'vertical' as const,
    width: scale.legendWidth,
  };
});

const option = computed<EChartsOption>(() => {
  const scale = chartScale.value;
  const chartConfig = resolvedChart.value;
  const tones = resolvedTones.value;

  return {
    animationDuration: 500,
    color: palette.value,
    title: { show: false },
    legend: legendOption.value,
    tooltip: {
      trigger: 'item',
      confine: true,
      appendToBody: true,
      formatter: (params: unknown) => {
        if (!params || typeof params !== 'object') {
          return '';
        }

        const row = params as { marker?: string; name?: string; value?: number; percent?: number };
        const percent = Number.isFinite(row.percent) ? Number(row.percent) : itemPercent(Number(row.value));

        return [
          `${row.marker ?? ''}${row.name ?? ''}: ${formatNumber(Number(row.value), chartConfig.valueUnit)}`,
          `占比: ${formatPercent(percent)}`,
        ].join('<br/>');
      },
    },
    series: [
      {
        name: title.value,
        type: 'pie',
        radius: scale.radius,
        center: [scale.centerX, scale.centerY],
        minAngle: chartConfig.minAngle,
        roseType: chartConfig.roseType || undefined,
        avoidLabelOverlap: true,
        stillShowZeroSum: false,
        itemStyle: {
          borderColor: 'rgba(255, 255, 255, 0.9)',
          borderWidth: chartConfig.borderWidthPx,
        },
        label: {
          show: scale.labelVisible,
          position: 'outside',
          alignTo: 'labelLine',
          distanceToLabelLine: 2,
          width: scale.labelWidth,
          overflow: 'break',
          color: tones.text,
          fontSize: scale.labelFontSize,
          lineHeight: scale.labelFontSize + 2,
          formatter: (params: { name?: string; percent?: number }) => `${params.name ?? ''}\n${formatPercent(Number(params.percent))}`,
        },
        labelLine: {
          show: scale.labelVisible && chartConfig.labelLineVisible,
          length: scale.labelLineLength,
          length2: scale.labelLineLength2,
          smooth: false,
          lineStyle: {
            color: hexToRgba(tones.axis, 0.38),
          },
        },
        emphasis: {
          scale: false,
          focus: 'self',
          itemStyle: {
            shadowBlur: 0,
          },
        },
        data: chartData.value,
      },
    ],
  };
});

const cardStyle = computed(() => {
  const layout = resolvedLayout.value;
  const titleConfig = resolvedTitle.value;
  const auxConfig = resolvedAux.value;
  const tones = resolvedTones.value;

  return {
    '--proportion-chart-card-padding': `${layout.paddingPx}px`,
    '--proportion-chart-card-gap': `${layout.gapPx}px`,
    '--proportion-chart-content-gap': `${layout.contentGapPx}px`,
    '--proportion-chart-title-row': `${layout.titleHeightPx}px`,
    '--proportion-chart-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--proportion-chart-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--proportion-chart-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--proportion-chart-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--proportion-chart-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--proportion-chart-aux-label-color': auxConfig.labelColor,
    '--proportion-chart-aux-value-color': auxConfig.valueColor,
    '--proportion-chart-title-font-size': `${titleConfig.fontSizePx}px`,
    '--proportion-chart-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--proportion-chart-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--proportion-chart-title-color': titleConfig.color || tones.text,
    '--proportion-chart-unit-color': titleConfig.unitColor || tones.unit,
    '--proportion-chart-primary': tones.primary,
    '--proportion-chart-primary-soft': hexToRgba(tones.primary, 0.2),
    '--proportion-chart-center-x': chartScale.value.centerX,
    '--proportion-chart-center-y': chartScale.value.centerY,
    '--proportion-chart-center-label-font-size': `${chartScale.value.centerLabelFontSize}px`,
    '--proportion-chart-center-value-font-size': `${chartScale.value.centerValueFontSize}px`,
    '--proportion-chart-center-label-color': tones.axis,
    '--proportion-chart-center-value-color': tones.text,
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
    class="proportion-chart-example-card"
    :class="cardClasses"
    :style="cardStyle"
    aria-label="占比图卡片"
  >
    <header v-if="resolvedTitle.visible" class="proportion-chart-example-header">
      <div class="proportion-chart-example-title-wrap">
        <span class="proportion-chart-example-title">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="proportion-chart-example-unit">{{ unit }}</span>
    </header>
    <div class="proportion-chart-example-body">
      <div v-if="visibleAuxMetrics.length" class="proportion-chart-example-aux" aria-label="附加指标">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="proportion-chart-example-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="proportion-chart-example-chart-pane">
        <div v-if="hasRenderableData" ref="chartRef" class="proportion-chart-example-canvas" />
        <div v-if="hasRenderableData && chartScale.centerVisible" class="proportion-chart-example-center">
          <em>{{ totalLabel }}</em>
          <b>{{ centerValue }}</b>
        </div>
        <div v-if="!hasRenderableData" class="proportion-chart-example-empty">暂无数据</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proportion-chart-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--proportion-chart-title-row) minmax(0, 1fr);
  row-gap: var(--proportion-chart-card-gap);
  padding: var(--proportion-chart-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--proportion-chart-title-color);
}

.proportion-chart-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.proportion-chart-example-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.proportion-chart-example-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.proportion-chart-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--proportion-chart-title-color);
  font-size: var(--proportion-chart-title-font-size);
  line-height: var(--proportion-chart-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.proportion-chart-example-card.has-title-underline .proportion-chart-example-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--proportion-chart-primary) 0%,
    var(--proportion-chart-primary-soft) 72%,
    transparent 100%
  );
}

.proportion-chart-example-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--proportion-chart-unit-color);
  font-size: var(--proportion-chart-unit-font-size);
  line-height: var(--proportion-chart-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.proportion-chart-example-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--proportion-chart-content-gap);
  overflow: hidden;
}

.proportion-chart-example-card.has-aux.is-horizontal .proportion-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--proportion-chart-horizontal-split);
}

.proportion-chart-example-card.has-aux.is-vertical .proportion-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: var(--proportion-chart-vertical-split);
}

.proportion-chart-example-card:not(.has-aux) .proportion-chart-example-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.proportion-chart-example-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  overflow: hidden;
}

.proportion-chart-example-card.is-horizontal .proportion-chart-example-aux {
  grid-template-columns: repeat(var(--proportion-chart-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.proportion-chart-example-card.is-vertical .proportion-chart-example-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--proportion-chart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.proportion-chart-example-aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  align-content: center;
  color: var(--proportion-chart-aux-value-color);
  overflow: hidden;
}

.proportion-chart-example-card.is-horizontal .proportion-chart-example-aux-item {
  justify-items: center;
  text-align: center;
}

.proportion-chart-example-card.is-vertical .proportion-chart-example-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
}

.proportion-chart-example-aux-item em,
.proportion-chart-example-aux-item b {
  min-width: 0;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.proportion-chart-example-aux-item em {
  color: var(--proportion-chart-aux-label-color);
  font-size: var(--proportion-chart-aux-label-font-size);
  font-weight: 600;
}

.proportion-chart-example-aux-item b {
  color: var(--proportion-chart-aux-value-color);
  font-size: var(--proportion-chart-aux-value-font-size);
  font-weight: 800;
}

.proportion-chart-example-card.is-vertical .proportion-chart-example-aux-item b {
  justify-self: end;
}

.proportion-chart-example-aux-item.tone-neutral b {
  color: #52677a;
}

.proportion-chart-example-aux-item.tone-success b {
  color: #12a867;
}

.proportion-chart-example-aux-item.tone-warning b {
  color: #e58a00;
}

.proportion-chart-example-aux-item.tone-danger b {
  color: #d93025;
}

.proportion-chart-example-chart-pane {
  min-width: 0;
  min-height: 0;
  display: grid;
  position: relative;
  overflow: hidden;
}

.proportion-chart-example-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.proportion-chart-example-empty {
  min-width: 0;
  min-height: 0;
  display: grid;
  place-items: center;
  color: #667085;
  font-size: 12px;
}

.proportion-chart-example-center {
  position: absolute;
  left: var(--proportion-chart-center-x);
  top: var(--proportion-chart-center-y);
  z-index: 1;
  display: grid;
  justify-items: center;
  align-content: center;
  min-width: 0;
  max-width: 42%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  text-align: center;
}

.proportion-chart-example-center em,
.proportion-chart-example-center b {
  min-width: 0;
  max-width: 100%;
  font-style: normal;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.proportion-chart-example-center em {
  color: var(--proportion-chart-center-label-color);
  font-size: var(--proportion-chart-center-label-font-size);
  font-weight: 600;
}

.proportion-chart-example-center b {
  margin-top: 1px;
  color: var(--proportion-chart-center-value-color);
  font-size: var(--proportion-chart-center-value-font-size);
  font-weight: 800;
}
</style>
