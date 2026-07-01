<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface CustomEChartDatum {
  name: string;
  value: number;
  color?: string;
  detail?: string;
  meta?: Record<string, string | number | boolean | null | undefined>;
}

interface CustomEChartAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface CustomEChartTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface CustomEChartLayoutConfig {
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

interface CustomEChartAuxConfig {
  visible?: boolean;
  maxItems?: number;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface CustomEChartChartConfig {
  rendererName?: string;
  labelVisible?: boolean;
  guideVisible?: boolean;
  minWidthPercent?: number;
  itemHeightPx?: number;
  maxItemHeightPx?: number;
  borderRadiusPx?: number;
  gridTopPx?: number;
  gridBottomPx?: number;
  gridLeftPx?: number;
  gridRightPx?: number;
}

interface CustomEChartDeveloperConfig {
  componentId?: string;
  componentName?: string;
  renderMode?: 'echarts-custom-series';
  dataSchema?: string;
  replaceableEntry?: string;
  notes?: string[];
}

interface CustomEChartToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  track?: string;
  text?: string;
  unit?: string;
}

interface CustomEChartComponentConfig {
  developer?: CustomEChartDeveloperConfig;
  title?: CustomEChartTitleConfig;
  layout?: CustomEChartLayoutConfig;
  aux?: CustomEChartAuxConfig;
  chart?: CustomEChartChartConfig;
  tones?: CustomEChartToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  items?: CustomEChartDatum[];
  auxMetrics?: CustomEChartAuxMetric[];
  config?: CustomEChartComponentConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const defaultItems: CustomEChartDatum[] = [
  { name: '输入', value: 1280, detail: '原始输入样本' },
  { name: '识别', value: 960, detail: '算法识别结果' },
  { name: '分层', value: 720, detail: '规则分层结果' },
  { name: '行动', value: 420, detail: '可执行动作' },
];

const defaultTitleConfig: Required<CustomEChartTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<CustomEChartLayoutConfig> = {
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

const defaultAuxConfig: Required<CustomEChartAuxConfig> = {
  visible: true,
  maxItems: 4,
  orientation: 'auto',
  labelFontSizePx: 9,
  valueFontSizePx: 12,
  labelColor: '#6b7c93',
  valueColor: '#0057d9',
};

const defaultChartConfig: Required<CustomEChartChartConfig> = {
  rendererName: 'self-developed-echarts-custom-series',
  labelVisible: true,
  guideVisible: true,
  minWidthPercent: 28,
  itemHeightPx: 0,
  maxItemHeightPx: 28,
  borderRadiusPx: 8,
  gridTopPx: 8,
  gridBottomPx: 8,
  gridLeftPx: 0,
  gridRightPx: 0,
};

const defaultDeveloperConfig: Required<CustomEChartDeveloperConfig> = {
  componentId: 'custom-echart-component-template',
  componentName: '自开发 ECharts 组件模板',
  renderMode: 'echarts-custom-series',
  dataSchema: 'items: Array<{ name: string; value: number; color?: string; detail?: string; meta?: object }>',
  replaceableEntry: 'renderCustomShape',
  notes: [
    '保留外层标题、辅助指标和图形区布局。',
    '复制模板后优先替换 renderCustomShape 和 option 坐标系。',
    '业务字段通过 items/meta/config 传入，不在布局层硬编码。',
  ],
};

const defaultToneConfig: Required<CustomEChartToneConfig> = {
  primary: '#0057d9',
  secondary: '#2f9bff',
  tertiary: '#49c0b6',
  quaternary: '#18a058',
  track: 'rgba(0, 87, 217, 0.07)',
  text: '#15304f',
  unit: '#667085',
};

const clampNumber = (value: unknown, min: number, max: number, fallback: number) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return Math.min(Math.max(numberValue, min), max);
};

const normalizeOrientation = (value: unknown): Required<CustomEChartLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeAuxOrientation = (value: unknown): Required<CustomEChartAuxConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

const title = computed(() => props.title?.trim() || props.config?.developer?.componentName || defaultDeveloperConfig.componentName);
const unit = computed(() => props.unit?.trim() || '单位：项');
const unitSuffix = computed(() => unit.value.replace(/^单位[:：]\s*/, ''));

const resolvedDeveloper = computed<Required<CustomEChartDeveloperConfig>>(() => ({
  ...defaultDeveloperConfig,
  ...(props.config?.developer ?? {}),
  renderMode: 'echarts-custom-series',
  notes: props.config?.developer?.notes?.length ? props.config.developer.notes : defaultDeveloperConfig.notes,
}));

const resolvedTitle = computed<Required<CustomEChartTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<CustomEChartLayoutConfig>>(() => {
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

const resolvedAux = computed<Required<CustomEChartAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  orientation: normalizeAuxOrientation(props.config?.aux?.orientation),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<CustomEChartChartConfig>>(() => ({
  ...defaultChartConfig,
  ...(props.config?.chart ?? {}),
  rendererName: props.config?.chart?.rendererName?.trim() || defaultChartConfig.rendererName,
  minWidthPercent: clampNumber(props.config?.chart?.minWidthPercent, 12, 80, defaultChartConfig.minWidthPercent),
  itemHeightPx: clampNumber(props.config?.chart?.itemHeightPx, 0, 42, defaultChartConfig.itemHeightPx),
  maxItemHeightPx: clampNumber(props.config?.chart?.maxItemHeightPx, 10, 42, defaultChartConfig.maxItemHeightPx),
  borderRadiusPx: clampNumber(props.config?.chart?.borderRadiusPx, 0, 18, defaultChartConfig.borderRadiusPx),
  gridTopPx: clampNumber(props.config?.chart?.gridTopPx, 0, 32, defaultChartConfig.gridTopPx),
  gridBottomPx: clampNumber(props.config?.chart?.gridBottomPx, 0, 32, defaultChartConfig.gridBottomPx),
  gridLeftPx: clampNumber(props.config?.chart?.gridLeftPx, 0, 48, defaultChartConfig.gridLeftPx),
  gridRightPx: clampNumber(props.config?.chart?.gridRightPx, 0, 48, defaultChartConfig.gridRightPx),
}));

const resolvedTones = computed<Required<CustomEChartToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const items = computed<CustomEChartDatum[]>(() => {
  if (props.items?.length) {
    return props.items;
  }

  const dataRows = (props.data ?? []).filter(isRecord).map((row) => ({
    name: String(row.name ?? row.label ?? '节点'),
    value: Number(row.value ?? row.amount ?? 0),
    color: typeof row.color === 'string' ? row.color : undefined,
    detail: typeof row.detail === 'string' ? row.detail : undefined,
    meta: isRecord(row.meta) ? row.meta as CustomEChartDatum['meta'] : undefined,
  }));

  return dataRows.length ? dataRows : defaultItems;
});

const normalizedItems = computed(() => {
  const finiteItems = items.value
    .map((item) => ({
      ...item,
      name: item.name?.trim() || '节点',
      value: Math.max(0, Number(item.value) || 0),
    }))
    .filter((item) => item.name && item.value > 0);
  const maxValue = Math.max(...finiteItems.map((item) => item.value), 1);

  return finiteItems.map((item, index) => {
    const previous = finiteItems[index - 1];
    const percent = clampNumber((item.value / maxValue) * 100, resolvedChart.value.minWidthPercent, 100, 100);
    const ratio = previous ? clampNumber((item.value / Math.max(previous.value, 1)) * 100, 0, 999, 0) : 100;

    return {
      ...item,
      index,
      percent,
      ratio,
      formattedValue: Math.round(item.value).toLocaleString('zh-CN'),
    };
  });
});

const hasRenderableData = computed(() => normalizedItems.value.length > 0);
const formatPercent = (value: number) => `${Math.round(value)}%`;

const defaultAuxMetrics = computed<CustomEChartAuxMetric[]>(() => {
  const rows = normalizedItems.value;
  const entry = rows[0]?.value ?? 0;
  const final = rows[rows.length - 1]?.value ?? 0;
  const totalConversion = entry > 0 ? (final / entry) * 100 : 0;

  return [
    { label: '结果', value: Math.round(final).toLocaleString('zh-CN'), tone: 'primary' },
    { label: '链路率', value: formatPercent(totalConversion), tone: 'success' },
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
  const itemCount = Math.max(normalizedItems.value.length, 1);
  const compact = Math.min(width / 280, height / 160);
  const autoItemHeight = Math.floor((height - resolvedChart.value.gridTopPx - resolvedChart.value.gridBottomPx) / (itemCount * 1.7));
  const itemHeight = resolvedChart.value.itemHeightPx
    || clampNumber(autoItemHeight, 12, resolvedChart.value.maxItemHeightPx, 18);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;

  return {
    itemHeight,
    radius: Math.min(resolvedChart.value.borderRadiusPx, Math.round(itemHeight / 2)),
    fontSize,
    valueFontSize: Math.max(8, fontSize - 0.4),
    labelVisible: resolvedChart.value.labelVisible && width >= 150 && height >= 74,
    guideVisible: resolvedChart.value.guideVisible && width >= 210 && height >= 104,
    labelPadding: width < 210 ? 6 : 9,
    gridTop: resolvedChart.value.gridTopPx,
    gridBottom: resolvedChart.value.gridBottomPx,
    gridLeft: resolvedChart.value.gridLeftPx,
    gridRight: resolvedChart.value.gridRightPx,
  };
});

const makeItemGradient = (color: string) =>
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

interface CustomRenderContext {
  api: any;
  item: typeof normalizedItems.value[number];
  itemIndex: number;
  start: number[];
  end: number[];
  fullWidth: number;
  width: number;
  x: number;
  y: number;
  color: string;
}

// 自开发入口：复制这个模板创建新组件时，优先替换本函数。
// 外层布局、尺寸监听、空状态、tooltip、标题和辅助指标可以继续复用。
const renderCustomShape = ({
  item,
  itemIndex,
  start,
  end,
  fullWidth,
  width,
  x,
  y,
  color,
}: CustomRenderContext) => {
  const scale = chartScale.value;
  const tones = resolvedTones.value;
  const maxLabelChars = width < 88 ? 2 : width < 132 ? 4 : 8;
  const itemLabel = truncateText(item.name, maxLabelChars);
  const ratioLabel = itemIndex === 0 ? '' : formatPercent(item.ratio);
  const children: any[] = [];

  if (resolvedChart.value.guideVisible) {
    children.push({
      type: 'rect',
      silent: true,
      shape: {
        x: start[0],
        y,
        width: fullWidth,
        height: scale.itemHeight,
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
      height: scale.itemHeight,
      r: scale.radius,
    },
    style: {
      fill: makeItemGradient(color),
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
        y: y + scale.itemHeight / 2,
        text: itemLabel,
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
        y: y + scale.itemHeight / 2,
        text: item.formattedValue,
        fill: '#ffffff',
        font: `800 ${scale.valueFontSize}px sans-serif`,
        align: 'right',
        verticalAlign: 'middle',
      },
    });
  }

  if (scale.guideVisible && ratioLabel) {
    children.push({
      type: 'text',
      silent: true,
      style: {
        x: end[0] - 2,
        y: y + scale.itemHeight / 2,
        text: ratioLabel,
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
};

const option = computed<EChartsOption>(() => {
  const scale = chartScale.value;
  const rows = normalizedItems.value;
  const data = rows.map((item) => ({
    name: item.name,
    value: [item.percent, item.index, item.value],
    rawValue: item.formattedValue,
    ratio: item.ratio,
    detail: item.detail,
    meta: item.meta,
  }));
  const customSeries = {
    type: 'custom',
    name: resolvedChart.value.rendererName,
    coordinateSystem: 'cartesian2d',
    encode: { x: 0, y: 1 },
    data,
    renderItem: (_params: unknown, api: any) => {
      const itemIndex = Number(api.value(1));
      const item = rows[itemIndex];

      if (!item) {
        return null;
      }

      const start = api.coord([0, itemIndex]);
      const end = api.coord([100, itemIndex]);
      const fullWidth = Math.max(1, end[0] - start[0]);
      const width = Math.max(24, fullWidth * (item.percent / 100));
      const x = start[0] + (fullWidth - width) / 2;
      const y = start[1] - scale.itemHeight / 2;
      const color = item.color ?? palette.value[itemIndex % palette.value.length];

      return renderCustomShape({
        api,
        item,
        itemIndex,
        start,
        end,
        fullWidth,
        width,
        x,
        y,
        color,
      });
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
        const item = params as { name?: string; data?: { rawValue?: string; ratio?: number; detail?: string } };
        const ratioText = item.data?.ratio === undefined ? '' : `节点比例：${formatPercent(item.data.ratio)}`;

        return [
          item.name ?? '',
          `数值：${item.data?.rawValue ?? '--'}${unitSuffix.value}`,
          ratioText,
          item.data?.detail,
          `模板：${resolvedDeveloper.value.componentId}`,
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
      data: rows.map((item) => item.name),
      show: false,
    },
    series: [customSeries],
  } as EChartsOption;
});

const cardStyle = computed(() => {
  const layout = resolvedLayout.value;
  const titleConfig = resolvedTitle.value;
  const auxConfig = resolvedAux.value;
  const tones = resolvedTones.value;

  return {
    '--custom-echart-card-padding': `${layout.paddingPx}px`,
    '--custom-echart-card-gap': `${layout.gapPx}px`,
    '--custom-echart-content-gap': `${layout.contentGapPx}px`,
    '--custom-echart-title-row': `${layout.titleHeightPx}px`,
    '--custom-echart-horizontal-split': `minmax(0, ${layout.horizontalAuxRatio}fr) minmax(0, ${layout.horizontalChartRatio}fr)`,
    '--custom-echart-vertical-split': `minmax(0, ${layout.verticalAuxRatio}fr) minmax(0, ${layout.verticalChartRatio}fr)`,
    '--custom-echart-aux-count': `${Math.max(visibleAuxMetrics.value.length, 1)}`,
    '--custom-echart-aux-label-font-size': `${auxConfig.labelFontSizePx}px`,
    '--custom-echart-aux-value-font-size': `${auxConfig.valueFontSizePx}px`,
    '--custom-echart-aux-label-color': auxConfig.labelColor,
    '--custom-echart-aux-value-color': auxConfig.valueColor,
    '--custom-echart-title-font-size': `${titleConfig.fontSizePx}px`,
    '--custom-echart-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--custom-echart-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--custom-echart-title-color': titleConfig.color || tones.text,
    '--custom-echart-unit-color': titleConfig.unitColor || tones.unit,
    '--custom-echart-primary': tones.primary,
    '--custom-echart-primary-soft': hexToRgba(tones.primary, 0.2),
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
    class="custom-echart-template-card"
    :class="cardClasses"
    :style="cardStyle"
    aria-label="自开发 ECharts 组件模板"
  >
    <header v-if="resolvedTitle.visible" class="custom-echart-template-header">
      <div class="custom-echart-template-title-wrap">
        <span class="custom-echart-template-title" :class="{ 'has-underline': resolvedTitle.underline }">{{ title }}</span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="custom-echart-template-unit">{{ unit }}</span>
    </header>
    <div class="custom-echart-template-body">
      <div v-if="visibleAuxMetrics.length" class="custom-echart-template-aux" aria-label="附加指标">
        <span
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}:${metric.value}`"
          class="custom-echart-template-aux-item"
          :class="`tone-${metric.tone ?? 'neutral'}`"
        >
          <em>{{ metric.label }}</em>
          <b>{{ metric.value }}</b>
        </span>
      </div>
      <div class="custom-echart-template-chart-pane">
        <div v-if="hasRenderableData" ref="chartRef" class="custom-echart-template-canvas" />
        <div v-else class="custom-echart-template-empty">暂无数据</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-echart-template-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: var(--custom-echart-title-row) minmax(0, 1fr);
  row-gap: var(--custom-echart-card-gap);
  padding: var(--custom-echart-card-padding);
  overflow: hidden;
  background: transparent;
  color: var(--custom-echart-title-color);
}

.custom-echart-template-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.custom-echart-template-header {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: start;
  column-gap: 8px;
}

.custom-echart-template-title-wrap {
  min-width: 0;
  display: flex;
  align-items: flex-start;
}

.custom-echart-template-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  min-width: 0;
  color: var(--custom-echart-title-color);
  font-size: var(--custom-echart-title-font-size);
  line-height: var(--custom-echart-title-line-height);
  font-weight: 700;
  white-space: normal;
  overflow-wrap: anywhere;
}

.custom-echart-template-title.has-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--custom-echart-primary) 0%, var(--custom-echart-primary-soft) 72%, transparent 100%);
}

.custom-echart-template-unit {
  justify-self: stretch;
  min-width: 0;
  width: 100%;
  color: var(--custom-echart-unit-color);
  font-size: var(--custom-echart-unit-font-size);
  line-height: var(--custom-echart-title-line-height);
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: right;
}

.custom-echart-template-body {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--custom-echart-content-gap);
  overflow: hidden;
}

.custom-echart-template-card.has-aux.is-horizontal .custom-echart-template-body,
.custom-echart-template-card.has-aux.is-vertical .custom-echart-template-body {
  grid-template-columns: var(--custom-echart-horizontal-split);
  grid-template-rows: minmax(0, 1fr);
}

.custom-echart-template-card:not(.has-aux) .custom-echart-template-body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.custom-echart-template-aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--custom-echart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
  overflow: hidden;
}

.custom-echart-template-card.aux-horizontal .custom-echart-template-aux {
  grid-template-columns: repeat(var(--custom-echart-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.custom-echart-template-card.aux-vertical .custom-echart-template-aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--custom-echart-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.custom-echart-template-aux-item {
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

.custom-echart-template-card.aux-horizontal .custom-echart-template-aux-item {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto;
  justify-items: center;
  text-align: center;
  row-gap: 1px;
}

.custom-echart-template-card.aux-vertical .custom-echart-template-aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
  text-align: left;
}

.custom-echart-template-aux-item em,
.custom-echart-template-aux-item b {
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: normal;
}

.custom-echart-template-aux-item em {
  color: var(--custom-echart-aux-label-color);
  font-size: var(--custom-echart-aux-label-font-size);
  line-height: 1.15;
  font-weight: 600;
}

.custom-echart-template-aux-item b {
  color: var(--custom-echart-aux-value-color);
  font-size: var(--custom-echart-aux-value-font-size);
  line-height: 1.1;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.custom-echart-template-aux-item.tone-success b {
  color: #18a058;
}

.custom-echart-template-aux-item.tone-warning b {
  color: #b7791f;
}

.custom-echart-template-aux-item.tone-danger b {
  color: #c0352b;
}

.custom-echart-template-aux-item.tone-neutral b {
  color: #344054;
}

.custom-echart-template-chart-pane {
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

.custom-echart-template-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.custom-echart-template-empty {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--custom-echart-unit-color);
  font-size: 10px;
}
</style>
