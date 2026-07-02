<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface QuadrantChartExamplePoint {
  name: string;
  x: number;
  y: number;
  size?: number;
  group?: string;
  color?: string;
}

interface QuadrantChartExampleAuxMetric {
  label: string;
  value: string | number;
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

interface QuadrantChartExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface QuadrantChartExampleLayoutConfig {
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

interface QuadrantChartExampleChartConfig {
  xAxisName?: string;
  yAxisName?: string;
  xThreshold?: number;
  yThreshold?: number;
  xUnit?: string;
  yUnit?: string;
  sizeUnit?: string;
  quadrantLabels?: [string, string, string, string];
  legendVisible?: boolean;
  legendTopPx?: number;
  legendItemGapPx?: number;
  legendFontSizePx?: number;
  axisVisible?: boolean;
  splitLineVisible?: boolean;
  quadrantAreaVisible?: boolean;
  pointLabelVisible?: boolean;
  gridTopPx?: number;
  gridBottomPx?: number;
  gridLeftPx?: number;
  gridRightPx?: number;
}

interface QuadrantChartExampleToneConfig {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
  axis?: string;
  splitLine?: string;
  text?: string;
  unit?: string;
}

interface QuadrantChartExampleAuxConfig {
  visible?: boolean;
  maxItems?: number;
  orientation?: 'auto' | 'horizontal' | 'vertical';
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  labelColor?: string;
  valueColor?: string;
}

interface QuadrantChartExampleCardConfig {
  title?: QuadrantChartExampleTitleConfig;
  layout?: QuadrantChartExampleLayoutConfig;
  aux?: QuadrantChartExampleAuxConfig;
  chart?: QuadrantChartExampleChartConfig;
  tones?: QuadrantChartExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  points?: QuadrantChartExamplePoint[];
  auxMetrics?: QuadrantChartExampleAuxMetric[];
  config?: QuadrantChartExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
const chartSize = ref({ width: 0, height: 0 });
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const text = {
  title: '\u8c61\u9650\u56fe\u5361\u7247',
  unit: '\u5355\u4f4d\uff1a\u5206',
  sample: '\u6837\u672c',
  highValue: '\u9ad8\u4ef7\u503c',
  steady: '\u7a33\u5065',
  watch: '\u89c2\u5bdf',
  potential: '\u6f5c\u529b',
  risk: '\u98ce\u9669',
  valueAxis: '\u4ef7\u503c',
  growthAxis: '\u589e\u957f',
  pointUnit: '\u5206',
  strength: '\u4f18\u52bf\u533a',
  potentialArea: '\u6f5c\u529b\u533a',
  watchArea: '\u89c2\u5bdf\u533a',
  riskArea: '\u98ce\u9669\u533a',
  count: '\u6837\u672c\u6570',
  strengthCount: '\u4f18\u52bf\u533a',
  noData: '\u6682\u65e0\u8c61\u9650\u56fe\u6570\u636e',
};

const defaultPoints: QuadrantChartExamplePoint[] = [
  { name: `${text.sample} A`, x: 86, y: 88, size: 30, group: text.highValue },
  { name: `${text.sample} B`, x: 72, y: 81, size: 24, group: text.highValue },
  { name: `${text.sample} C`, x: 68, y: 62, size: 18, group: text.steady },
  { name: `${text.sample} D`, x: 45, y: 48, size: 12, group: text.watch },
  { name: `${text.sample} E`, x: 57, y: 74, size: 20, group: text.potential },
  { name: `${text.sample} F`, x: 52, y: 31, size: 14, group: text.risk },
];

const defaultTitleConfig: Required<QuadrantChartExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 10,
  lineHeightPx: 13,
  color: '',
  unitVisible: true,
  unitFontSizePx: 9,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<QuadrantChartExampleLayoutConfig> = {
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

const defaultChartConfig: Required<QuadrantChartExampleChartConfig> = {
  xAxisName: text.valueAxis,
  yAxisName: text.growthAxis,
  xThreshold: 60,
  yThreshold: 60,
  xUnit: text.pointUnit,
  yUnit: text.pointUnit,
  sizeUnit: '',
  quadrantLabels: [text.strength, text.potentialArea, text.watchArea, text.riskArea],
  legendVisible: true,
  legendTopPx: 0,
  legendItemGapPx: 8,
  legendFontSizePx: 9,
  axisVisible: true,
  splitLineVisible: true,
  quadrantAreaVisible: true,
  pointLabelVisible: false,
  gridTopPx: 8,
  gridBottomPx: 18,
  gridLeftPx: 0,
  gridRightPx: 8,
};

const defaultToneConfig: Required<QuadrantChartExampleToneConfig> = {
  primary: '#0057d9',
  secondary: '#19a8ff',
  tertiary: '#00a870',
  quaternary: '#b8c3d1',
  axis: '#7a8aa0',
  splitLine: 'rgba(0, 87, 217, 0.1)',
  text: '#15304f',
  unit: '#667085',
};

const defaultAuxConfig: Required<QuadrantChartExampleAuxConfig> = {
  visible: true,
  maxItems: 4,
  orientation: 'auto',
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

const normalizeOrientation = (value: unknown): Required<QuadrantChartExampleLayoutConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeAuxOrientation = (value: unknown): Required<QuadrantChartExampleAuxConfig>['orientation'] => {
  if (value === 'horizontal' || value === 'vertical') {
    return value;
  }

  return 'auto';
};

const normalizeQuadrantLabels = (value: unknown): [string, string, string, string] => {
  if (Array.isArray(value) && value.length >= 4) {
    return [
      String(value[0] ?? defaultChartConfig.quadrantLabels[0]),
      String(value[1] ?? defaultChartConfig.quadrantLabels[1]),
      String(value[2] ?? defaultChartConfig.quadrantLabels[2]),
      String(value[3] ?? defaultChartConfig.quadrantLabels[3]),
    ];
  }

  return defaultChartConfig.quadrantLabels;
};

const resolvedTitle = computed<Required<QuadrantChartExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<QuadrantChartExampleLayoutConfig>>(() => {
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

const resolvedAux = computed<Required<QuadrantChartExampleAuxConfig>>(() => ({
  ...defaultAuxConfig,
  ...(props.config?.aux ?? {}),
  orientation: normalizeAuxOrientation(props.config?.aux?.orientation),
  maxItems: Math.round(clampNumber(props.config?.aux?.maxItems, 1, 8, defaultAuxConfig.maxItems)),
  labelFontSizePx: clampNumber(props.config?.aux?.labelFontSizePx, 8, 14, defaultAuxConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.aux?.valueFontSizePx, 9, 20, defaultAuxConfig.valueFontSizePx),
}));

const resolvedChart = computed<Required<QuadrantChartExampleChartConfig>>(() => {
  const config = props.config?.chart ?? {};

  return {
    ...defaultChartConfig,
    ...config,
    xThreshold: clampNumber(config.xThreshold, -100000, 100000, defaultChartConfig.xThreshold),
    yThreshold: clampNumber(config.yThreshold, -100000, 100000, defaultChartConfig.yThreshold),
    quadrantLabels: normalizeQuadrantLabels(config.quadrantLabels),
    legendTopPx: clampNumber(config.legendTopPx, 0, 24, defaultChartConfig.legendTopPx),
    legendItemGapPx: clampNumber(config.legendItemGapPx, 2, 24, defaultChartConfig.legendItemGapPx),
    legendFontSizePx: clampNumber(config.legendFontSizePx, 8, 14, defaultChartConfig.legendFontSizePx),
    gridTopPx: clampNumber(config.gridTopPx, 0, 40, defaultChartConfig.gridTopPx),
    gridBottomPx: clampNumber(config.gridBottomPx, 4, 42, defaultChartConfig.gridBottomPx),
    gridLeftPx: clampNumber(config.gridLeftPx, 0, 60, defaultChartConfig.gridLeftPx),
    gridRightPx: clampNumber(config.gridRightPx, 4, 42, defaultChartConfig.gridRightPx),
  };
});

const resolvedTones = computed<Required<QuadrantChartExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || text.title);
const unit = computed(() => props.unit?.trim() || text.unit);

const sourcePoints = computed<QuadrantChartExamplePoint[]>(() => {
  if (props.points?.length) {
    return props.points;
  }

  const dataPoints = (props.data ?? []).reduce<QuadrantChartExamplePoint[]>((items, item, index) => {
    if (!isRecord(item)) {
      return items;
    }

    const rawValue = Array.isArray(item.value) ? item.value : [];
    const x = Number(item.x ?? item.valueX ?? rawValue[0]);
    const y = Number(item.y ?? item.valueY ?? rawValue[1]);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return items;
    }

    items.push({
      name: String(item.name ?? item.label ?? `${text.sample} ${index + 1}`),
      x,
      y,
      size: Number.isFinite(Number(item.size)) ? Number(item.size) : undefined,
      group: item.group == null ? undefined : String(item.group),
      color: item.color == null ? undefined : String(item.color),
    });

    return items;
  }, []);

  return dataPoints.length ? dataPoints : defaultPoints;
});

const points = computed(() =>
  sourcePoints.value
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
    .slice(0, 24),
);

const hasRenderableData = computed(() => points.value.length > 0);

const axisDomain = computed(() => {
  const chartConfig = resolvedChart.value;
  const xValues = points.value.map((point) => point.x);
  const yValues = points.value.map((point) => point.y);
  const rawXMin = Math.min(...xValues, chartConfig.xThreshold, 0);
  const rawXMax = Math.max(...xValues, chartConfig.xThreshold, 100);
  const rawYMin = Math.min(...yValues, chartConfig.yThreshold, 0);
  const rawYMax = Math.max(...yValues, chartConfig.yThreshold, 100);
  const xPadding = Math.max((rawXMax - rawXMin) * 0.12, 6);
  const yPadding = Math.max((rawYMax - rawYMin) * 0.12, 6);
  const xMin = rawXMin < 0 ? Math.floor(rawXMin - xPadding) : Math.floor(rawXMin);
  const xMax = rawXMax > 100 ? Math.ceil(rawXMax + xPadding) : Math.ceil(rawXMax);
  const yMin = rawYMin < 0 ? Math.floor(rawYMin - yPadding) : Math.floor(rawYMin);
  const yMax = rawYMax > 100 ? Math.ceil(rawYMax + yPadding) : Math.ceil(rawYMax);

  return {
    xMin,
    xMax,
    yMin,
    yMax,
  };
});

const formatMetricNumber = (value: number | undefined, suffix = '') => {
  if (!Number.isFinite(value)) {
    return '--';
  }

  return `${Math.round((value ?? 0) * 10) / 10}${suffix}`;
};

const formatAxisNumber = (value: number) => {
  if (!Number.isFinite(value)) {
    return '';
  }

  return `${Math.round(value * 10) / 10}`;
};

const defaultAuxMetrics = computed<QuadrantChartExampleAuxMetric[]>(() => {
  const chartConfig = resolvedChart.value;
  const highValuePoints = points.value.filter((point) => point.x >= chartConfig.xThreshold && point.y >= chartConfig.yThreshold);
  const averageX = points.value.reduce((sum, point) => sum + point.x, 0) / Math.max(points.value.length, 1);
  const averageY = points.value.reduce((sum, point) => sum + point.y, 0) / Math.max(points.value.length, 1);

  return [
    { label: text.count, value: points.value.length, tone: 'neutral' },
    { label: text.strengthCount, value: highValuePoints.length, tone: 'primary' },
    { label: chartConfig.xAxisName, value: formatMetricNumber(averageX), tone: 'success' },
    { label: chartConfig.yAxisName, value: formatMetricNumber(averageY), tone: 'warning' },
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

const pointColorPalette = computed(() => [
  resolvedTones.value.primary,
  resolvedTones.value.secondary,
  resolvedTones.value.tertiary,
  '#7c3aed',
  '#f59e0b',
  '#ef4444',
  '#14b8a6',
  '#64748b',
  '#db2777',
  '#84cc16',
  '#0f766e',
  '#f97316',
  '#2563eb',
  '#9333ea',
  '#dc2626',
  '#0891b2',
  '#65a30d',
  '#c2410c',
  '#4f46e5',
  '#be185d',
  '#16a34a',
  '#ca8a04',
  '#0284c7',
  resolvedTones.value.quaternary,
]);

const getPointColor = (point: QuadrantChartExamplePoint, index: number) =>
  point.color ?? pointColorPalette.value[index % pointColorPalette.value.length];

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
  const chartConfig = resolvedChart.value;
  const width = chartSize.value.width || containerSize.value.width || 240;
  const fallbackHeight = Math.max(containerSize.value.height - resolvedLayout.value.titleHeightPx - resolvedLayout.value.gapPx, 80);
  const height = chartSize.value.height || fallbackHeight;
  const compact = Math.min(width / 280, height / 170);
  const fontSize = Math.round(clampNumber(8 + compact * 2, 8, 11, 9) * 10) / 10;
  const axisVisible = chartConfig.axisVisible && width >= 150 && height >= 92;
  const legendVisible = chartConfig.legendVisible && width >= 150 && height >= 80;
  const legendRowHeight = Math.max(16, chartConfig.legendFontSizePx + 9);
  const estimatedLegendWidth = points.value.reduce((total, point) => (
    total + Math.max(30, point.name.length * chartConfig.legendFontSizePx * 0.74 + 16) + chartConfig.legendItemGapPx
  ), 0);
  const estimatedLegendRows = legendVisible
    ? Math.ceil(estimatedLegendWidth / Math.max(width - 12, 80))
    : 0;
  const maxLegendRows = height < 125 ? 2 : height < 175 ? 3 : 4;
  const legendRows = Math.round(clampNumber(estimatedLegendRows, 1, maxLegendRows, 1));
  const legendHeight = legendVisible ? legendRowHeight * legendRows : 0;
  const axisSplitNumber = width < 220 ? 4 : width < 320 ? 5 : 6;
  const axisLabelGutter = axisVisible ? Math.max(chartConfig.gridLeftPx, width < 220 ? 18 : 22) : 0;

  return {
    fontSize,
    axisFontSize: Math.max(8, fontSize - 1),
    axisVisible,
    axisNameVisible: false,
    axisLabelInside: false,
    axisLabelMargin: 3,
    axisSplitNumber,
    showMaxAxisLabel: width >= 220,
    legendVisible,
    legendWidth: Math.max(width - 14, 80),
    legendHeight,
    legendFontSize: chartConfig.legendFontSizePx,
    pointLabelVisible: chartConfig.pointLabelVisible && width >= 250 && height >= 140,
    symbolMin: width < 230 ? 6 : 8,
    symbolMax: width < 230 ? 14 : 22,
    gridTop: legendVisible ? legendHeight + 6 : chartConfig.gridTopPx,
    gridBottom: axisVisible ? (width < 220 ? 6 : 8) : 6,
    gridLeft: axisLabelGutter,
    gridRight: width < 220 ? 4 : chartConfig.gridRightPx,
    containLabel: false,
  };
});

const pointSizeRange = computed(() => {
  const sizes = points.value.map((point) => point.size ?? 1).filter((value) => Number.isFinite(value));

  return {
    min: Math.min(...sizes, 1),
    max: Math.max(...sizes, 1),
  };
});

const getSymbolSize = (size: number | undefined) => {
  const value = Number.isFinite(size) ? Number(size) : pointSizeRange.value.min;
  const range = pointSizeRange.value.max - pointSizeRange.value.min;

  if (range <= 0) {
    return chartScale.value.symbolMin + 2;
  }

  return chartScale.value.symbolMin + ((value - pointSizeRange.value.min) / range) * (chartScale.value.symbolMax - chartScale.value.symbolMin);
};

const quadrantGraphics = computed(() => {
  const chartConfig = resolvedChart.value;
  const labels = chartConfig.quadrantLabels;
  const tones = resolvedTones.value;
  const scale = chartScale.value;
  const domain = axisDomain.value;
  const width = chartSize.value.width || containerSize.value.width || 240;
  const height = chartSize.value.height || 140;
  const visible = chartConfig.quadrantAreaVisible && width >= 150 && height >= 92;

  if (!visible) {
    return [];
  }

  const axisLabelReserve = scale.axisVisible ? 2 : 0;
  const axisOriginX = scale.gridLeft;
  const axisOriginY = height - scale.gridBottom;
  const plotLeft = axisOriginX + axisLabelReserve + 2;
  const plotRight = Math.max(width - scale.gridRight - 4, plotLeft + 60);
  const plotTop = scale.gridTop + 2;
  const plotBottom = Math.max(axisOriginY - 10, plotTop + 42);
  const plotWidth = Math.max(plotRight - plotLeft, 1);
  const plotHeight = Math.max(plotBottom - plotTop, 1);
  const xRange = Math.max(domain.xMax - domain.xMin, 1);
  const yRange = Math.max(domain.yMax - domain.yMin, 1);
  const xSplitRatio = clampNumber((chartConfig.xThreshold - domain.xMin) / xRange, 0.12, 0.88, 0.5);
  const ySplitRatioFromTop = clampNumber((domain.yMax - chartConfig.yThreshold) / yRange, 0.12, 0.88, 0.5);
  const xSplit = plotLeft + plotWidth * xSplitRatio;
  const ySplit = plotTop + plotHeight * ySplitRatioFromTop;
  const topCenterY = plotTop + (ySplit - plotTop) / 2;
  const bottomCenterY = ySplit + (plotBottom - ySplit) / 2;
  const leftCenterX = plotLeft + (xSplit - plotLeft) / 2;
  const rightCenterX = xSplit + (plotRight - xSplit) / 2;

  return [
    { left: rightCenterX, top: topCenterY, text: labels[0], color: tones.primary, fontWeight: 700, align: 'center', verticalAlign: 'middle' },
    { left: leftCenterX, top: topCenterY, text: labels[1], color: tones.secondary, fontWeight: 700, align: 'center', verticalAlign: 'middle' },
    { left: leftCenterX, top: bottomCenterY, text: labels[2], color: tones.axis, fontWeight: 700, align: 'center', verticalAlign: 'middle' },
    { left: rightCenterX, top: bottomCenterY, text: labels[3], color: tones.tertiary, fontWeight: 700, align: 'center', verticalAlign: 'middle' },
  ].map((item) => ({
    type: 'text',
    left: item.left,
    top: item.top,
    silent: true,
    style: {
      text: item.text,
      fill: hexToRgba(item.color, 0.46),
      fontSize: chartScale.value.axisFontSize,
      fontWeight: item.fontWeight,
      align: item.align,
      verticalAlign: item.verticalAlign,
    },
  }));
});

const formatTooltip = (params: unknown) => {
  const item = Array.isArray(params) ? params[0] : params;

  if (!isRecord(item)) {
    return '';
  }

  const value = Array.isArray(item.value) ? item.value : [];
  const data = isRecord(item.data) ? item.data : {};
  const marker = typeof item.marker === 'string' ? item.marker : '';
  const name = String(item.name ?? data.name ?? '');
  const group = String(value[3] ?? data.group ?? '');
  const size = Number(value[2] ?? data.size);
  const chartConfig = resolvedChart.value;
  const lines = [
    `${marker}${name}`,
    `${chartConfig.xAxisName}: ${formatMetricNumber(Number(value[0]), chartConfig.xUnit)}`,
    `${chartConfig.yAxisName}: ${formatMetricNumber(Number(value[1]), chartConfig.yUnit)}`,
  ];

  if (group) {
    lines.push(`${group}`);
  }

  if (Number.isFinite(size) && chartConfig.sizeUnit) {
    lines.push(`${formatMetricNumber(size, chartConfig.sizeUnit)}`);
  }

  return lines.join('<br/>');
};

const chartOption = computed<EChartsOption>(() => {
  const chartConfig = resolvedChart.value;
  const tones = resolvedTones.value;
  const domain = axisDomain.value;
  const scale = chartScale.value;
  const quadrantColors = [tones.primary, tones.secondary, tones.quaternary, tones.tertiary];
  const quadrantLabels = chartConfig.quadrantLabels;
  const formatXAxisLabel = (value: number) => {
    return formatAxisNumber(value);
  };
  const formatYAxisLabel = (value: number) => {
    return formatAxisNumber(value);
  };
  const getQuadrantIndex = (point: QuadrantChartExamplePoint) => {
    if (point.x >= chartConfig.xThreshold && point.y >= chartConfig.yThreshold) {
      return 0;
    }

    if (point.x < chartConfig.xThreshold && point.y >= chartConfig.yThreshold) {
      return 1;
    }

    if (point.x < chartConfig.xThreshold && point.y < chartConfig.yThreshold) {
      return 2;
    }

    return 3;
  };
  const scatterSeries = points.value.map((point, index) => {
    const quadrantIndex = getQuadrantIndex(point);
    const color = getPointColor(point, index);
    const pointData = {
      name: point.name,
      value: [point.x, point.y, point.size ?? 1, point.group ?? quadrantLabels[quadrantIndex]],
      group: point.group ?? quadrantLabels[quadrantIndex],
      itemStyle: {
        color,
        borderColor: '#ffffff',
        borderWidth: 1,
        shadowBlur: 0,
      },
      label: {
        show: scale.pointLabelVisible,
        formatter: '{b}',
        color: tones.text,
        fontSize: scale.fontSize,
        fontWeight: 700,
        position: 'top',
      },
    };

    return {
      name: point.name,
      type: 'scatter',
      data: [pointData],
      symbol: 'circle',
      symbolSize: (rawValue: unknown) => {
        const value = Array.isArray(rawValue) ? rawValue : [];
        return getSymbolSize(Number(value[2]));
      },
      itemStyle: {
        color,
        borderColor: '#ffffff',
        borderWidth: 1,
        shadowBlur: 0,
      },
      emphasis: {
        focus: 'series',
        scale: 1.12,
      },
      ...(index === 0
        ? {
            markLine: {
              silent: true,
              symbol: 'none',
              label: { show: false },
              lineStyle: {
                color: hexToRgba(tones.primary, 0.38),
                width: 1,
                type: 'dashed',
              },
              data: [
                { xAxis: chartConfig.xThreshold },
                { yAxis: chartConfig.yThreshold },
              ],
            },
            markArea: chartConfig.quadrantAreaVisible
              ? {
                  silent: true,
                  label: { show: false },
                  itemStyle: {
                    color: 'transparent',
                  },
                  data: [
                    [
                      { xAxis: chartConfig.xThreshold, yAxis: chartConfig.yThreshold, itemStyle: { color: hexToRgba(tones.primary, 0.06) } },
                      { xAxis: domain.xMax, yAxis: domain.yMax },
                    ],
                    [
                      { xAxis: domain.xMin, yAxis: chartConfig.yThreshold, itemStyle: { color: hexToRgba(tones.secondary, 0.055) } },
                      { xAxis: chartConfig.xThreshold, yAxis: domain.yMax },
                    ],
                    [
                      { xAxis: domain.xMin, yAxis: domain.yMin, itemStyle: { color: hexToRgba(tones.quaternary, 0.065) } },
                      { xAxis: chartConfig.xThreshold, yAxis: chartConfig.yThreshold },
                    ],
                    [
                      { xAxis: chartConfig.xThreshold, yAxis: domain.yMin, itemStyle: { color: hexToRgba(tones.tertiary, 0.05) } },
                      { xAxis: domain.xMax, yAxis: chartConfig.yThreshold },
                    ],
                  ],
                }
              : undefined,
          }
        : {}),
    };
  });
  const legendLabels = points.value.map((point) => point.name);

  return {
    animation: true,
    animationDuration: 420,
    legend: {
      show: scale.legendVisible,
      top: chartConfig.legendTopPx,
      left: 'center',
      orient: 'horizontal',
      width: scale.legendWidth,
      height: scale.legendHeight,
      icon: 'circle',
      itemWidth: 6,
      itemHeight: 6,
      itemGap: chartConfig.legendItemGapPx,
      selectedMode: false,
      data: legendLabels,
      textStyle: {
        color: tones.axis,
        fontSize: scale.legendFontSize,
        fontWeight: 700,
      },
    },
    grid: {
      top: scale.gridTop,
      bottom: scale.gridBottom,
      left: scale.gridLeft,
      right: scale.gridRight,
      containLabel: scale.containLabel,
    },
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      confine: true,
      formatter: formatTooltip,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      borderColor: 'rgba(0, 87, 217, 0.16)',
      textStyle: {
        color: tones.text,
        fontSize: 11,
      },
    },
    graphic: quadrantGraphics.value as EChartsOption['graphic'],
    xAxis: {
      type: 'value',
      min: domain.xMin,
      max: domain.xMax,
      splitNumber: scale.axisSplitNumber,
      name: scale.axisNameVisible ? chartConfig.xAxisName : '',
      nameLocation: 'middle',
      nameGap: 0,
      axisLine: {
        show: scale.axisVisible,
        lineStyle: { color: hexToRgba(tones.axis, 0.45) },
      },
      axisTick: { show: false },
      axisLabel: {
        show: scale.axisVisible,
        color: tones.axis,
        fontSize: scale.axisFontSize,
        inside: scale.axisLabelInside,
        margin: scale.axisLabelMargin,
        hideOverlap: true,
        showMinLabel: true,
        showMaxLabel: scale.showMaxAxisLabel,
        formatter: formatXAxisLabel,
      },
      splitLine: {
        show: chartConfig.splitLineVisible,
        lineStyle: {
          color: tones.splitLine,
          type: 'dashed',
        },
      },
    },
    yAxis: {
      type: 'value',
      min: domain.yMin,
      max: domain.yMax,
      splitNumber: scale.axisSplitNumber,
      name: scale.axisNameVisible ? chartConfig.yAxisName : '',
      nameGap: 0,
      axisLine: {
        show: scale.axisVisible,
        lineStyle: { color: hexToRgba(tones.axis, 0.45) },
      },
      axisTick: { show: false },
      axisLabel: {
        show: scale.axisVisible,
        color: tones.axis,
        fontSize: scale.axisFontSize,
        inside: scale.axisLabelInside,
        margin: scale.axisLabelMargin,
        align: 'right',
        hideOverlap: true,
        showMinLabel: false,
        showMaxLabel: true,
        formatter: formatYAxisLabel,
      },
      splitLine: {
        show: chartConfig.splitLineVisible,
        lineStyle: {
          color: tones.splitLine,
          type: 'dashed',
        },
      },
    },
    series: scatterSeries as EChartsOption['series'],
  };
});

const cardStyle = computed(() => ({
  '--quadrant-padding': `${resolvedLayout.value.paddingPx}px`,
  '--quadrant-gap': `${resolvedLayout.value.gapPx}px`,
  '--quadrant-title-height': resolvedTitle.value.visible ? `${resolvedLayout.value.titleHeightPx}px` : '0px',
  '--quadrant-content-gap': `${resolvedLayout.value.contentGapPx}px`,
  '--quadrant-title-color': resolvedTitle.value.color || resolvedTones.value.text,
  '--quadrant-unit-color': resolvedTitle.value.unitColor || resolvedTones.value.unit,
  '--quadrant-aux-label-color': resolvedAux.value.labelColor,
  '--quadrant-aux-value-color': resolvedAux.value.valueColor,
  '--quadrant-horizontal-aux-ratio': `${resolvedLayout.value.horizontalAuxRatio}fr`,
  '--quadrant-horizontal-chart-ratio': `${resolvedLayout.value.horizontalChartRatio}fr`,
  '--quadrant-vertical-aux-ratio': `${resolvedLayout.value.verticalAuxRatio}fr`,
  '--quadrant-vertical-chart-ratio': `${resolvedLayout.value.verticalChartRatio}fr`,
}));

const titleStyle = computed(() => ({
  fontSize: `${resolvedTitle.value.fontSizePx}px`,
  lineHeight: `${resolvedTitle.value.lineHeightPx}px`,
}));

const unitStyle = computed(() => ({
  fontSize: `${resolvedTitle.value.unitFontSizePx}px`,
}));

const auxMetricValueStyle = computed(() => ({
  fontSize: `${resolvedAux.value.valueFontSizePx}px`,
}));

const auxMetricLabelStyle = computed(() => ({
  fontSize: `${resolvedAux.value.labelFontSizePx}px`,
}));

const updateSizes = () => {
  if (!rootRef.value) {
    return;
  }

  const rootRect = rootRef.value.getBoundingClientRect();
  const nextContainerSize = {
    width: Math.round(rootRect.width),
    height: Math.round(rootRect.height),
  };

  if (
    nextContainerSize.width !== containerSize.value.width ||
    nextContainerSize.height !== containerSize.value.height
  ) {
    containerSize.value = nextContainerSize;
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
  updateSizes();

  if (!hasRenderableData.value) {
    chart?.dispose();
    chart = null;
    return;
  }

  if (!chartRef.value || !hasRenderableSize()) {
    return;
  }

  chart ??= echarts.init(chartRef.value);
  chart.setOption(chartOption.value, true);
  chart.resize();
};

const scheduleRender = async () => {
  await nextTick();
  renderChart();
};

onMounted(() => {
  if (rootRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateSizes();
      if (hasRenderableSize()) {
        chart?.resize();
        void scheduleRender();
      }
    });
    resizeObserver.observe(rootRef.value);
  }

  void scheduleRender();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  chart?.dispose();
  chart = null;
});

watch(chartOption, () => {
  void scheduleRender();
}, { deep: true, flush: 'post' });
</script>

<template>
  <article ref="rootRef" class="quadrant-chart-example-card" :class="cardClasses" :style="cardStyle">
    <header v-if="resolvedTitle.visible" class="quadrant-chart-example-card__header">
      <div class="quadrant-chart-example-card__title-zone">
        <span
          class="quadrant-chart-example-card__title"
          :class="{ 'has-underline': resolvedTitle.underline }"
          :style="titleStyle"
        >
          {{ title }}
        </span>
      </div>
      <span v-if="resolvedTitle.unitVisible" class="quadrant-chart-example-card__unit" :style="unitStyle">
        {{ unit }}
      </span>
    </header>

    <section class="quadrant-chart-example-card__body">
      <div v-if="visibleAuxMetrics.length" class="quadrant-chart-example-card__aux">
        <div
          v-for="metric in visibleAuxMetrics"
          :key="`${metric.label}-${metric.value}`"
          class="quadrant-chart-example-card__aux-item"
          :class="`is-${metric.tone ?? 'neutral'}`"
        >
          <span class="quadrant-chart-example-card__aux-label" :style="auxMetricLabelStyle">{{ metric.label }}</span>
          <strong class="quadrant-chart-example-card__aux-value" :style="auxMetricValueStyle">{{ metric.value }}</strong>
        </div>
      </div>

      <div class="quadrant-chart-example-card__chart-shell">
        <div v-show="hasRenderableData" ref="chartRef" class="quadrant-chart-example-card__chart" />
        <div v-if="!hasRenderableData" class="quadrant-chart-example-card__empty">{{ text.noData }}</div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.quadrant-chart-example-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--quadrant-gap);
  padding: var(--quadrant-padding);
  overflow: hidden;
  color: var(--quadrant-title-color);
  background: transparent;
}

.quadrant-chart-example-card__header {
  flex: 0 0 var(--quadrant-title-height);
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.quadrant-chart-example-card__title-zone {
  min-width: 0;
  display: flex;
  align-items: center;
}

.quadrant-chart-example-card__title {
  position: relative;
  display: inline-flex;
  flex: 0 1 auto;
  max-width: 100%;
  align-items: center;
  color: var(--quadrant-title-color);
  font-weight: 700;
  white-space: nowrap;
}

.quadrant-chart-example-card__title.has-underline::after {
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  content: "";
  background: linear-gradient(90deg, rgba(0, 87, 217, 0.82), rgba(25, 168, 255, 0.08));
}

.quadrant-chart-example-card__unit {
  min-width: 0;
  color: var(--quadrant-unit-color);
  text-align: right;
  white-space: nowrap;
}

.quadrant-chart-example-card__body {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: var(--quadrant-content-gap);
}

.quadrant-chart-example-card.is-horizontal.has-aux .quadrant-chart-example-card__body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: max-content minmax(0, 1fr);
  gap: min(var(--quadrant-content-gap), 2px);
}

.quadrant-chart-example-card.is-vertical.has-aux .quadrant-chart-example-card__body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: max-content minmax(0, 1fr);
  gap: min(var(--quadrant-content-gap), 2px);
}

.quadrant-chart-example-card:not(.has-aux) .quadrant-chart-example-card__body {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.quadrant-chart-example-card__aux {
  min-width: 0;
  min-height: 0;
  display: grid;
  gap: 2px;
  align-content: center;
}

.quadrant-chart-example-card.aux-horizontal .quadrant-chart-example-card__aux {
  grid-template-columns: repeat(var(--quadrant-aux-count), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  column-gap: 4px;
}

.quadrant-chart-example-card.aux-vertical .quadrant-chart-example-card__aux {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(var(--quadrant-aux-count), minmax(0, 1fr));
  align-items: stretch;
  row-gap: 2px;
}

.quadrant-chart-example-card__aux-item {
  min-width: 0;
  min-height: 0;
  display: grid;
  justify-content: center;
  gap: 1px;
}

.quadrant-chart-example-card.aux-horizontal .quadrant-chart-example-card__aux-item {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto;
  justify-items: center;
  text-align: center;
  row-gap: 1px;
}

.quadrant-chart-example-card.aux-vertical .quadrant-chart-example-card__aux-item {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: stretch;
  column-gap: 6px;
  text-align: left;
}

.quadrant-chart-example-card__aux-label {
  max-width: 100%;
  overflow: hidden;
  color: var(--quadrant-aux-label-color);
  font-weight: 700;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quadrant-chart-example-card__aux-value {
  max-width: 100%;
  overflow: hidden;
  color: var(--quadrant-aux-value-color);
  font-weight: 800;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quadrant-chart-example-card.aux-vertical .quadrant-chart-example-card__aux-label {
  flex: 1 1 auto;
  min-width: 0;
}

.quadrant-chart-example-card.aux-vertical .quadrant-chart-example-card__aux-value {
  flex: 0 1 auto;
  min-width: 0;
  text-align: right;
}

.quadrant-chart-example-card__aux-item.is-success .quadrant-chart-example-card__aux-value {
  color: #00a870;
}

.quadrant-chart-example-card__aux-item.is-warning .quadrant-chart-example-card__aux-value {
  color: #d98500;
}

.quadrant-chart-example-card__aux-item.is-danger .quadrant-chart-example-card__aux-value {
  color: #d92d20;
}

.quadrant-chart-example-card__aux-item.is-neutral .quadrant-chart-example-card__aux-value {
  color: #334155;
}

.quadrant-chart-example-card__chart-shell {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.quadrant-chart-example-card__chart {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.quadrant-chart-example-card__empty {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #8aa0b8;
  font-size: 11px;
  font-weight: 700;
}
</style>
