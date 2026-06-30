<script setup lang="ts">
import { Clock, Target, TrendingUp } from '@lucide/vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { TemplateCarriedWidgetTone, WidgetContext } from '../../types';

type SparkType = 'line' | 'bar' | 'none';
type AccessoryIconName = 'trend' | 'target' | 'clock';

interface AccessoryMetric {
  label: string;
  value: string;
  tone?: TemplateCarriedWidgetTone;
  icon?: AccessoryIconName;
}

interface KpiMetricExampleLayoutConfig {
  titleRatio?: number;
  valueRatio?: number;
  accessoryRatio?: number;
  gapPx?: number;
  paddingPx?: number;
}

interface KpiMetricExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface KpiMetricExampleValueConfig {
  minFontSizePx?: number;
  maxFontSizePx?: number;
  heightScale?: number;
  gradientStartColor?: string;
  gradientMidColor?: string;
  gradientEndColor?: string;
  affixRatio?: number;
  affixMinFontSizePx?: number;
  affixMaxFontSizePx?: number;
  shadow?: string;
  reflectionVisible?: boolean;
  reflectionOpacity?: number;
}

interface KpiMetricExampleSparkConfig {
  visible?: boolean;
  type?: SparkType;
  values?: number[];
  maxPoints?: number;
  showArea?: boolean;
  showStroke?: boolean;
  fillStartColor?: string;
  fillMidColor?: string;
  fillEndColor?: string;
  fillStartOpacity?: number;
  fillMidOpacity?: number;
  fillEndOpacity?: number;
  strokeStartColor?: string;
  strokeMidColor?: string;
  strokeEndColor?: string;
  strokeStartOpacity?: number;
  strokeMidOpacity?: number;
  strokeEndOpacity?: number;
  strokeWidth?: number;
  barOpacity?: number;
  barRadiusPx?: number;
  edgeFade?: boolean;
  widthPercent?: number;
  heightPercent?: number;
  rightPercent?: number;
  bottomPercent?: number;
}

interface KpiMetricExampleAccessoryConfig {
  visible?: boolean;
  columns?: 1 | 2;
  maxItems?: number;
  padding?: string;
  rowMinHeightPx?: number;
  columnGapPx?: number;
  rowGapPx?: number;
  itemGapPx?: number;
  itemPaddingInlinePx?: number;
  itemInnerPaddingPx?: number;
  iconVisible?: boolean;
  iconSizePx?: number;
  iconGraphicSizePx?: number;
  iconStrokeWidth?: number;
  iconRadiusPx?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  dividerVisible?: boolean;
  dividerColor?: string;
  dividerWeakOpacity?: number;
  dividerStrongOpacity?: number;
}

interface KpiMetricExampleToneConfig {
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  neutral?: string;
  neutralValue?: string;
}

interface KpiMetricExampleCardConfig {
  layout?: KpiMetricExampleLayoutConfig;
  title?: KpiMetricExampleTitleConfig;
  value?: KpiMetricExampleValueConfig;
  spark?: KpiMetricExampleSparkConfig;
  accessory?: KpiMetricExampleAccessoryConfig;
  tones?: KpiMetricExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  value?: string | number;
  valuePrefix?: string;
  valueSuffix?: string;
  maxDecimals?: number;
  tone?: TemplateCarriedWidgetTone;
  accessoryMetrics?: AccessoryMetric[];
  sparkType?: SparkType;
  sparkValues?: number[];
  config?: KpiMetricExampleCardConfig;
}

const props = defineProps<Props>();

const titleAreaHeightPx = 20;

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;

const defaultAccessoryMetrics: AccessoryMetric[] = [
  { label: '同比', value: '+12.6%', tone: 'success' },
  { label: '环比', value: '+4.8%', tone: 'success' },
  { label: '目标', value: '135,000', tone: 'primary' },
  { label: '上期', value: '119,860', tone: 'neutral' },
];

const defaultSparkValues = [24, 29, 35, 38, 36, 42, 48, 46, 54, 63, 70, 76];
const defaultLayoutConfig: Required<KpiMetricExampleLayoutConfig> = {
  titleRatio: 1,
  valueRatio: 3,
  accessoryRatio: 2,
  gapPx: 2,
  paddingPx: 5,
};
const defaultTitleConfig: Required<KpiMetricExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 11,
  lineHeightPx: 14,
  color: '',
  unitVisible: true,
  unitFontSizePx: 10,
  unitColor: '#667085',
};
const defaultValueConfig: Required<KpiMetricExampleValueConfig> = {
  minFontSizePx: 18,
  maxFontSizePx: 58,
  heightScale: 0.58,
  gradientStartColor: '#338cff',
  gradientMidColor: '#0868e8',
  gradientEndColor: '#0052d3',
  affixRatio: 0.32,
  affixMinFontSizePx: 8,
  affixMaxFontSizePx: 14,
  shadow: '0 8px 18px rgba(0, 87, 217, 0.1)',
  reflectionVisible: true,
  reflectionOpacity: 0.3,
};
const defaultSparkConfig: Required<KpiMetricExampleSparkConfig> = {
  visible: true,
  type: 'line',
  values: defaultSparkValues,
  maxPoints: 24,
  showArea: true,
  showStroke: true,
  fillStartColor: '#ffffff',
  fillMidColor: '#4fa2ff',
  fillEndColor: '#0057d9',
  fillStartOpacity: 0,
  fillMidOpacity: 0.045,
  fillEndOpacity: 0.13,
  strokeStartColor: '#0057d9',
  strokeMidColor: '#4fa2ff',
  strokeEndColor: '#0057d9',
  strokeStartOpacity: 0.08,
  strokeMidOpacity: 0.12,
  strokeEndOpacity: 0.18,
  strokeWidth: 2.2,
  barOpacity: 0.96,
  barRadiusPx: 4,
  edgeFade: true,
  widthPercent: 110,
  heightPercent: 96,
  rightPercent: -4,
  bottomPercent: -26,
};
const defaultAccessoryConfig: Required<KpiMetricExampleAccessoryConfig> = {
  visible: true,
  columns: 2,
  maxItems: 4,
  padding: '3px 8px',
  rowMinHeightPx: 30,
  columnGapPx: 0,
  rowGapPx: 0,
  itemGapPx: 8,
  itemPaddingInlinePx: 18,
  itemInnerPaddingPx: 2,
  iconVisible: true,
  iconSizePx: 26,
  iconGraphicSizePx: 17,
  iconStrokeWidth: 3,
  iconRadiusPx: 7,
  labelFontSizePx: 12,
  valueFontSizePx: 15,
  dividerVisible: true,
  dividerColor: '82, 103, 122',
  dividerWeakOpacity: 0.026,
  dividerStrongOpacity: 0.058,
};
const defaultToneConfig: Required<KpiMetricExampleToneConfig> = {
  primary: '#0057d9',
  success: '#0f8f5f',
  warning: '#b76b00',
  danger: '#ba1a1a',
  neutral: '#0057d9',
  neutralValue: '#2f3b4e',
};
const sparkViewBoxWidth = 640;
const sparkPlotLeft = 28;
const sparkPlotRight = 28;
const sparkPlotTop = 22;
const sparkPlotBottom = 132;

const clampNumber = (value: number | undefined, min: number, max: number, fallback: number) => {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(min, Math.min(max, Number(value)));
};

const getAlphaColor = (color: string, opacity: number) => {
  const alpha = clampNumber(opacity, 0, 1, 1);
  const normalizedColor = color.trim();

  if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(normalizedColor)) {
    return `rgba(${normalizedColor}, ${alpha})`;
  }

  const hexMatch = normalizedColor.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);

  if (hexMatch) {
    const hexValue = hexMatch[1];
    const fullHex =
      hexValue.length === 3
        ? hexValue
            .split('')
            .map((char) => `${char}${char}`)
            .join('')
        : hexValue;
    const red = parseInt(fullHex.slice(0, 2), 16);
    const green = parseInt(fullHex.slice(2, 4), 16);
    const blue = parseInt(fullHex.slice(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  return `color-mix(in srgb, ${normalizedColor} ${Math.round(alpha * 100)}%, transparent)`;
};

const resolvedLayout = computed<Required<KpiMetricExampleLayoutConfig>>(() => {
  const layout = props.config?.layout ?? {};

  return {
    titleRatio: clampNumber(layout.titleRatio, 0, 12, defaultLayoutConfig.titleRatio),
    valueRatio: clampNumber(layout.valueRatio, 0, 12, defaultLayoutConfig.valueRatio),
    accessoryRatio: clampNumber(layout.accessoryRatio, 0, 12, defaultLayoutConfig.accessoryRatio),
    gapPx: clampNumber(layout.gapPx, 0, 24, defaultLayoutConfig.gapPx),
    paddingPx: clampNumber(layout.paddingPx, 0, 32, defaultLayoutConfig.paddingPx),
  };
});

const resolvedTitle = computed<Required<KpiMetricExampleTitleConfig>>(() => {
  const titleConfig = props.config?.title ?? {};

  return {
    ...defaultTitleConfig,
    ...titleConfig,
    fontSizePx: clampNumber(titleConfig.fontSizePx, 8, 28, defaultTitleConfig.fontSizePx),
    lineHeightPx: clampNumber(titleConfig.lineHeightPx, 10, 36, defaultTitleConfig.lineHeightPx),
    unitFontSizePx: clampNumber(titleConfig.unitFontSizePx, 8, 24, defaultTitleConfig.unitFontSizePx),
  };
});

const resolvedValue = computed<Required<KpiMetricExampleValueConfig>>(() => {
  const valueConfig = props.config?.value ?? {};

  return {
    ...defaultValueConfig,
    ...valueConfig,
    minFontSizePx: clampNumber(valueConfig.minFontSizePx, 10, 96, defaultValueConfig.minFontSizePx),
    maxFontSizePx: clampNumber(valueConfig.maxFontSizePx, 12, 128, defaultValueConfig.maxFontSizePx),
    heightScale: clampNumber(valueConfig.heightScale, 0.1, 1.2, defaultValueConfig.heightScale),
    affixRatio: clampNumber(valueConfig.affixRatio, 0.12, 0.8, defaultValueConfig.affixRatio),
    affixMinFontSizePx: clampNumber(valueConfig.affixMinFontSizePx, 6, 28, defaultValueConfig.affixMinFontSizePx),
    affixMaxFontSizePx: clampNumber(valueConfig.affixMaxFontSizePx, 8, 36, defaultValueConfig.affixMaxFontSizePx),
    reflectionOpacity: clampNumber(valueConfig.reflectionOpacity, 0, 1, defaultValueConfig.reflectionOpacity),
  };
});

const resolvedSpark = computed<Required<KpiMetricExampleSparkConfig>>(() => {
  const sparkConfig = props.config?.spark ?? {};
  const maxPoints = Math.round(clampNumber(sparkConfig.maxPoints, 2, 48, defaultSparkConfig.maxPoints));
  const configuredValues = (sparkConfig.values ?? props.sparkValues ?? defaultSparkValues)
    .filter((value) => Number.isFinite(value))
    .slice(0, maxPoints);

  return {
    ...defaultSparkConfig,
    ...sparkConfig,
    type: sparkConfig.type ?? props.sparkType ?? defaultSparkConfig.type,
    values: configuredValues.length >= 2 ? configuredValues : defaultSparkValues,
    maxPoints,
    fillStartOpacity: clampNumber(sparkConfig.fillStartOpacity, 0, 1, defaultSparkConfig.fillStartOpacity),
    fillMidOpacity: clampNumber(sparkConfig.fillMidOpacity, 0, 1, defaultSparkConfig.fillMidOpacity),
    fillEndOpacity: clampNumber(sparkConfig.fillEndOpacity, 0, 1, defaultSparkConfig.fillEndOpacity),
    strokeStartOpacity: clampNumber(sparkConfig.strokeStartOpacity, 0, 1, defaultSparkConfig.strokeStartOpacity),
    strokeMidOpacity: clampNumber(sparkConfig.strokeMidOpacity, 0, 1, defaultSparkConfig.strokeMidOpacity),
    strokeEndOpacity: clampNumber(sparkConfig.strokeEndOpacity, 0, 1, defaultSparkConfig.strokeEndOpacity),
    strokeWidth: clampNumber(sparkConfig.strokeWidth, 0.4, 8, defaultSparkConfig.strokeWidth),
    barOpacity: clampNumber(sparkConfig.barOpacity, 0, 1, defaultSparkConfig.barOpacity),
    barRadiusPx: clampNumber(sparkConfig.barRadiusPx, 0, 12, defaultSparkConfig.barRadiusPx),
    widthPercent: clampNumber(sparkConfig.widthPercent, 20, 180, defaultSparkConfig.widthPercent),
    heightPercent: clampNumber(sparkConfig.heightPercent, 20, 160, defaultSparkConfig.heightPercent),
    rightPercent: clampNumber(sparkConfig.rightPercent, -80, 80, defaultSparkConfig.rightPercent),
    bottomPercent: clampNumber(sparkConfig.bottomPercent, -80, 80, defaultSparkConfig.bottomPercent),
  };
});

const resolvedAccessory = computed<Required<KpiMetricExampleAccessoryConfig>>(() => {
  const accessoryConfig = props.config?.accessory ?? {};
  const columns = clampNumber(accessoryConfig.columns, 1, 2, defaultAccessoryConfig.columns) <= 1 ? 1 : 2;

  return {
    ...defaultAccessoryConfig,
    ...accessoryConfig,
    columns,
    maxItems: Math.round(clampNumber(accessoryConfig.maxItems, 1, 12, defaultAccessoryConfig.maxItems)),
    rowMinHeightPx: clampNumber(accessoryConfig.rowMinHeightPx, 18, 80, defaultAccessoryConfig.rowMinHeightPx),
    columnGapPx: clampNumber(accessoryConfig.columnGapPx, 0, 32, defaultAccessoryConfig.columnGapPx),
    rowGapPx: clampNumber(accessoryConfig.rowGapPx, 0, 32, defaultAccessoryConfig.rowGapPx),
    itemGapPx: clampNumber(accessoryConfig.itemGapPx, 0, 24, defaultAccessoryConfig.itemGapPx),
    itemPaddingInlinePx: clampNumber(
      accessoryConfig.itemPaddingInlinePx,
      0,
      40,
      defaultAccessoryConfig.itemPaddingInlinePx,
    ),
    itemInnerPaddingPx: clampNumber(
      accessoryConfig.itemInnerPaddingPx,
      0,
      24,
      defaultAccessoryConfig.itemInnerPaddingPx,
    ),
    iconSizePx: clampNumber(accessoryConfig.iconSizePx, 0, 48, defaultAccessoryConfig.iconSizePx),
    iconGraphicSizePx: clampNumber(accessoryConfig.iconGraphicSizePx, 8, 32, defaultAccessoryConfig.iconGraphicSizePx),
    iconStrokeWidth: clampNumber(accessoryConfig.iconStrokeWidth, 1, 5, defaultAccessoryConfig.iconStrokeWidth),
    iconRadiusPx: clampNumber(accessoryConfig.iconRadiusPx, 0, 16, defaultAccessoryConfig.iconRadiusPx),
    labelFontSizePx: clampNumber(accessoryConfig.labelFontSizePx, 8, 22, defaultAccessoryConfig.labelFontSizePx),
    valueFontSizePx: clampNumber(accessoryConfig.valueFontSizePx, 9, 28, defaultAccessoryConfig.valueFontSizePx),
    dividerWeakOpacity: clampNumber(
      accessoryConfig.dividerWeakOpacity,
      0,
      1,
      defaultAccessoryConfig.dividerWeakOpacity,
    ),
    dividerStrongOpacity: clampNumber(
      accessoryConfig.dividerStrongOpacity,
      0,
      1,
      defaultAccessoryConfig.dividerStrongOpacity,
    ),
  };
});

const resolvedTones = computed<Required<KpiMetricExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || 'Kpi 指标');
const unit = computed(() => props.unit?.trim() || '单位：万元');
const tone = computed(() => props.tone ?? 'primary');
const valuePrefix = computed(() => props.valuePrefix?.trim() ?? '');
const valueSuffix = computed(() => props.valueSuffix?.trim() ?? '');
const sparkType = computed<SparkType>(() => {
  if (resolvedSpark.value.type === 'bar') {
    return 'bar';
  }

  if (resolvedSpark.value.type === 'none') {
    return 'none';
  }

  return 'line';
});

const normalizeNumberText = (value: string | number) => {
  const rawValue = String(value).trim().replace(/,/g, '');
  const match = rawValue.match(/^(-?)(\d+)(?:\.(\d+))?$/);

  if (!match) {
    return String(value).trim();
  }

  const [, sign, integerPart, decimalPart] = match;
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${sign}${formattedInteger}${decimalPart ? `.${decimalPart}` : ''}`;
};

const formattedValue = computed(() => {
  const value = props.value ?? 128063;

  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: props.maxDecimals ?? 2,
    }).format(value);
  }

  return normalizeNumberText(value);
});

const accessoryMetrics = computed(() => {
  if (!resolvedAccessory.value.visible) {
    return [];
  }

  const configuredMetrics = props.accessoryMetrics
    ?.filter((metric) => metric.label.trim() || metric.value.trim())
    .slice(0, resolvedAccessory.value.maxItems);

  if (configuredMetrics) {
    return configuredMetrics;
  }

  return defaultAccessoryMetrics.slice(0, resolvedAccessory.value.maxItems);
});

const visibleAccessoryMetrics = computed(() =>
  accessoryMetrics.value
    .filter((metric) => metric.label.trim() || metric.value.trim())
    .slice(0, resolvedAccessory.value.maxItems),
);

const useVerticalAccessoryOrder = computed(() => {
  const { width, height } = containerSize.value;

  return width > 0
    && height > 0
    && width < height
    && resolvedAccessory.value.columns > 1
    && visibleAccessoryMetrics.value.length > resolvedAccessory.value.columns;
});

const orderedAccessoryMetrics = computed(() => {
  const metrics = visibleAccessoryMetrics.value;

  if (!useVerticalAccessoryOrder.value) {
    return metrics;
  }

  const columns = resolvedAccessory.value.columns;
  const rows = Math.ceil(metrics.length / columns);
  const orderedMetrics: AccessoryMetric[] = [];

  for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
    for (let rowIndex = 0; rowIndex < rows; rowIndex += 1) {
      const metric = metrics[rowIndex * columns + columnIndex];

      if (metric) {
        orderedMetrics.push(metric);
      }
    }
  }

  return orderedMetrics;
});

const accessoryClass = computed(() => {
  const count = visibleAccessoryMetrics.value.length;
  const columns = resolvedAccessory.value.columns;
  const rowCount = Math.ceil(count / columns);
  const hasDivider = resolvedAccessory.value.dividerVisible;

  return {
    'is-single-row': rowCount <= 1,
    'is-single-metric': count === 1,
    'has-horizontal-divider': hasDivider && rowCount > 1,
    'has-vertical-divider': hasDivider && columns > 1 && count > 1,
    'is-vertical-order': useVerticalAccessoryOrder.value,
    'without-icons': !resolvedAccessory.value.iconVisible,
  };
});

const sparkValues = computed(() => {
  return resolvedSpark.value.values;
});

const sparkPoints = computed(() => {
  const values = sparkValues.value;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(maxValue - minValue, 1);
  const plotWidth = sparkViewBoxWidth - sparkPlotLeft - sparkPlotRight;
  const plotHeight = sparkPlotBottom - sparkPlotTop;
  const step = values.length > 1 ? plotWidth / (values.length - 1) : 0;

  return values.map((value, index) => {
    const normalizedValue = (value - minValue) / range;
    const x = sparkPlotLeft + step * index;
    const y = sparkPlotBottom - normalizedValue * plotHeight;

    return {
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      value,
    };
  });
});

const sparkLinePath = computed(() =>
  sparkPoints.value.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' '),
);

const sparkAreaPath = computed(() => {
  const points = sparkPoints.value;

  if (points.length === 0) {
    return '';
  }

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return `${linePath} L ${points[points.length - 1].x} ${sparkPlotBottom} L ${points[0].x} ${sparkPlotBottom} Z`;
});

const sparkBars = computed(() => {
  const points = sparkPoints.value;
  const plotWidth = sparkViewBoxWidth - sparkPlotLeft - sparkPlotRight;
  const barWidth = Math.max(8, Math.min(24, plotWidth / Math.max(points.length * 1.8, 1)));

  return points.map((point) => {
    const height = Math.max(sparkPlotBottom - point.y, 4);

    return {
      x: Math.round((point.x - barWidth / 2) * 10) / 10,
      y: Math.round((sparkPlotBottom - height) * 10) / 10,
      width: Math.round(barWidth * 10) / 10,
      height: Math.round(height * 10) / 10,
    };
  });
});

const getAccessoryIcon = (metric: AccessoryMetric) => {
  if (metric.icon === 'target') {
    return Target;
  }

  if (metric.icon === 'clock') {
    return Clock;
  }

  if (metric.icon === 'trend') {
    return TrendingUp;
  }

  const label = metric.label;

  if (label.includes('目标')) {
    return Target;
  }

  if (label.includes('上期')) {
    return Clock;
  }

  return TrendingUp;
};

const getWeightedTextLength = (value: string) =>
  Array.from(value).reduce((total, char) => total + (/[0-9]/.test(char) ? 0.72 : char === ',' ? 0.34 : 0.86), 0);

const valueStyle = computed(() => {
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 240;
  const layout = resolvedLayout.value;
  const valueConfig = resolvedValue.value;
  const accessoryConfig = resolvedAccessory.value;
  const titleConfig = resolvedTitle.value;
  const sparkConfig = resolvedSpark.value;
  const tones = resolvedTones.value;
  const totalRatio = Math.max(layout.valueRatio + layout.accessoryRatio, 1);
  const gridHeight = Math.max(height - layout.paddingPx * 2 - layout.gapPx * 2 - titleAreaHeightPx, 1);
  const valueHeight = gridHeight * (layout.valueRatio / totalRatio);
  const textWeight = Math.max(getWeightedTextLength(`${valuePrefix.value}${formattedValue.value}${valueSuffix.value}`), 1);
  const widthDrivenSize = Math.max(width - layout.paddingPx * 2 - 6, 1) / textWeight;
  const heightDrivenSize = valueHeight * valueConfig.heightScale;
  const fontSize = Math.max(
    valueConfig.minFontSizePx,
    Math.min(valueConfig.maxFontSizePx, Math.floor(Math.min(widthDrivenSize, heightDrivenSize))),
  );
  const suffixSize = Math.max(
    valueConfig.affixMinFontSizePx,
    Math.min(valueConfig.affixMaxFontSizePx, Math.round(fontSize * valueConfig.affixRatio)),
  );
  const dividerWeak = getAlphaColor(accessoryConfig.dividerColor, accessoryConfig.dividerWeakOpacity);
  const dividerStrong = getAlphaColor(accessoryConfig.dividerColor, accessoryConfig.dividerStrongOpacity);

  return {
    '--kpi-example-title-row': `${titleAreaHeightPx}px`,
    '--kpi-example-value-row': `${layout.valueRatio}fr`,
    '--kpi-example-accessory-row': `${layout.accessoryRatio}fr`,
    '--kpi-example-card-gap': `${layout.gapPx}px`,
    '--kpi-example-card-padding': `${layout.paddingPx}px`,
    '--kpi-example-title-font-size': `${titleConfig.fontSizePx}px`,
    '--kpi-example-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--kpi-example-title-color': titleConfig.color || tones.primary,
    '--kpi-example-title-underline-opacity': titleConfig.underline ? '1' : '0',
    '--kpi-example-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--kpi-example-unit-color': titleConfig.unitColor,
    '--kpi-example-value-font-size': `${fontSize}px`,
    '--kpi-example-value-affix-size': `${suffixSize}px`,
    '--kpi-example-value-gradient-start': valueConfig.gradientStartColor,
    '--kpi-example-value-gradient-mid': valueConfig.gradientMidColor,
    '--kpi-example-value-gradient-end': valueConfig.gradientEndColor,
    '--kpi-example-value-shadow': valueConfig.shadow,
    '--kpi-example-value-reflection-opacity': valueConfig.reflectionVisible
      ? `${valueConfig.reflectionOpacity}`
      : '0',
    '--kpi-example-primary-color': tones.primary,
    '--kpi-example-success-color': tones.success,
    '--kpi-example-warning-color': tones.warning,
    '--kpi-example-danger-color': tones.danger,
    '--kpi-example-neutral-color': tones.neutral,
    '--kpi-example-neutral-value-color': tones.neutralValue,
    '--kpi-example-spark-width': `${sparkConfig.widthPercent}%`,
    '--kpi-example-spark-height': `${sparkConfig.heightPercent}%`,
    '--kpi-example-spark-right': `${sparkConfig.rightPercent}%`,
    '--kpi-example-spark-bottom': `${sparkConfig.bottomPercent}%`,
    '--kpi-example-spark-stroke-width': `${sparkConfig.strokeWidth}`,
    '--kpi-example-spark-bar-opacity': `${sparkConfig.barOpacity}`,
    '--kpi-example-spark-mask': sparkConfig.edgeFade
      ? 'linear-gradient(90deg, transparent 0%, #000 16%, #000 78%, transparent 100%)'
      : 'linear-gradient(90deg, #000 0%, #000 100%)',
    '--kpi-example-accessory-columns': `${accessoryConfig.columns}`,
    '--kpi-example-accessory-padding': accessoryConfig.padding,
    '--kpi-example-accessory-row-min-height': `${accessoryConfig.rowMinHeightPx}px`,
    '--kpi-example-accessory-column-gap': `${accessoryConfig.columnGapPx}px`,
    '--kpi-example-accessory-row-gap': `${accessoryConfig.rowGapPx}px`,
    '--kpi-example-accessory-item-gap': `${accessoryConfig.itemGapPx}px`,
    '--kpi-example-accessory-item-outer-padding': `${accessoryConfig.itemPaddingInlinePx}px`,
    '--kpi-example-accessory-item-inner-padding': `${accessoryConfig.itemInnerPaddingPx}px`,
    '--kpi-example-accessory-icon-size': `${accessoryConfig.iconSizePx}px`,
    '--kpi-example-accessory-icon-radius': `${accessoryConfig.iconRadiusPx}px`,
    '--kpi-example-accessory-label-size': `${accessoryConfig.labelFontSizePx}px`,
    '--kpi-example-accessory-value-size': `${accessoryConfig.valueFontSizePx}px`,
    '--kpi-example-accessory-divider-weak': dividerWeak,
    '--kpi-example-accessory-divider-strong': dividerStrong,
  };
});

onMounted(() => {
  if (!rootRef.value) {
    return;
  }

  const updateSize = () => {
    if (!rootRef.value) {
      return;
    }

    const rect = rootRef.value.getBoundingClientRect();
    containerSize.value = {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  };

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
  <section ref="rootRef" class="kpi-example-card" :class="`tone-${tone}`" :style="valueStyle" aria-label="Kpi 指标卡片示例">
    <header v-if="resolvedTitle.visible || resolvedTitle.unitVisible" class="kpi-example-card-header">
      <span v-if="resolvedTitle.visible" class="kpi-example-card-title-text" :title="title">{{ title }}</span>
      <span v-if="resolvedTitle.unitVisible" class="kpi-example-card-unit" :title="unit">{{ unit }}</span>
    </header>

    <div class="kpi-example-card-value" aria-label="指标值">
      <svg
        v-if="resolvedSpark.visible && sparkType !== 'none'"
        class="kpi-example-card-value-spark"
        :class="`spark-${sparkType}`"
        viewBox="0 0 640 160"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="kpi-example-spark-fill" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" :stop-color="resolvedSpark.fillStartColor" :stop-opacity="resolvedSpark.fillStartOpacity" />
            <stop offset="46%" :stop-color="resolvedSpark.fillMidColor" :stop-opacity="resolvedSpark.fillMidOpacity" />
            <stop offset="100%" :stop-color="resolvedSpark.fillEndColor" :stop-opacity="resolvedSpark.fillEndOpacity" />
          </linearGradient>
          <linearGradient id="kpi-example-spark-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" :stop-color="resolvedSpark.strokeStartColor" :stop-opacity="resolvedSpark.strokeStartOpacity" />
            <stop offset="52%" :stop-color="resolvedSpark.strokeMidColor" :stop-opacity="resolvedSpark.strokeMidOpacity" />
            <stop offset="100%" :stop-color="resolvedSpark.strokeEndColor" :stop-opacity="resolvedSpark.strokeEndOpacity" />
          </linearGradient>
        </defs>
        <g v-if="sparkType === 'bar'" class="kpi-example-spark-bars">
          <rect
            v-for="(bar, index) in sparkBars"
            :key="index"
            :x="bar.x"
            :y="bar.y"
            :width="bar.width"
            :height="bar.height"
            :rx="resolvedSpark.barRadiusPx"
          />
        </g>
        <g v-else class="kpi-example-spark-line">
          <path v-if="resolvedSpark.showArea" class="kpi-example-spark-area" :d="sparkAreaPath" />
          <path v-if="resolvedSpark.showStroke" class="kpi-example-spark-stroke" :d="sparkLinePath" />
        </g>
      </svg>
      <span v-if="valuePrefix" class="kpi-example-card-value-affix">{{ valuePrefix }}</span>
      <strong :data-value="formattedValue">{{ formattedValue }}</strong>
      <span v-if="valueSuffix" class="kpi-example-card-value-affix">{{ valueSuffix }}</span>
    </div>

    <div
      v-if="resolvedAccessory.visible && visibleAccessoryMetrics.length > 0"
      class="kpi-example-card-accessory"
      :class="accessoryClass"
      aria-label="附件指标"
    >
      <span
        v-for="metric in orderedAccessoryMetrics"
        :key="`${metric.label}:${metric.value}`"
        class="kpi-example-card-accessory-item"
        :class="`tone-${metric.tone ?? 'neutral'}`"
      >
        <span v-if="resolvedAccessory.iconVisible" class="kpi-example-card-accessory-icon" aria-hidden="true">
          <component
            :is="getAccessoryIcon(metric)"
            :size="resolvedAccessory.iconGraphicSizePx"
            :stroke-width="resolvedAccessory.iconStrokeWidth"
          />
        </span>
        <em>{{ metric.label }}</em>
        <b>{{ metric.value }}</b>
      </span>
    </div>
  </section>
</template>

<style scoped>
.kpi-example-card {
  --kpi-example-primary-color: #0057d9;
  --kpi-example-success-color: #0f8f5f;
  --kpi-example-warning-color: #b76b00;
  --kpi-example-danger-color: #ba1a1a;
  --kpi-example-neutral-color: #0057d9;
  --kpi-example-neutral-value-color: #2f3b4e;
  --kpi-example-tone: var(--kpi-example-primary-color);
  --kpi-example-tone-soft: rgba(0, 87, 217, 0.1);
  display: grid;
  grid-template-rows:
    var(--kpi-example-title-row, 20px)
    minmax(0, var(--kpi-example-value-row, 3fr))
    minmax(0, var(--kpi-example-accessory-row, 2fr));
  gap: var(--kpi-example-card-gap, 2px);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--kpi-example-card-padding, 5px);
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--text-strong, #101828);
  font-variant-numeric: tabular-nums;
}

.kpi-example-card.tone-success,
.kpi-example-card-accessory-item.tone-success {
  --kpi-example-tone: var(--kpi-example-success-color);
  --kpi-example-tone-soft: color-mix(in srgb, var(--kpi-example-success-color) 8%, #ffffff);
  --kpi-example-value-color: var(--kpi-example-success-color);
}

.kpi-example-card.tone-warning,
.kpi-example-card-accessory-item.tone-warning {
  --kpi-example-tone: var(--kpi-example-warning-color);
  --kpi-example-tone-soft: color-mix(in srgb, var(--kpi-example-warning-color) 8%, #ffffff);
}

.kpi-example-card.tone-danger,
.kpi-example-card-accessory-item.tone-danger {
  --kpi-example-tone: var(--kpi-example-danger-color);
  --kpi-example-tone-soft: color-mix(in srgb, var(--kpi-example-danger-color) 7%, #ffffff);
}

.kpi-example-card.tone-neutral,
.kpi-example-card-accessory-item.tone-neutral {
  --kpi-example-tone: var(--kpi-example-neutral-color);
  --kpi-example-tone-soft: color-mix(in srgb, var(--kpi-example-neutral-color) 7%, #ffffff);
  --kpi-example-value-color: var(--kpi-example-neutral-value-color);
}

.kpi-example-card-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 2px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.kpi-example-card-title-text {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-self: start;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  padding: 0 0 3px;
  border: 0;
  color: var(--kpi-example-title-color, var(--kpi-example-tone));
  font-size: var(--kpi-example-title-font-size, 11px);
  font-weight: 800;
  letter-spacing: 0;
  line-height: var(--kpi-example-title-line-height, 14px);
  text-overflow: clip;
  white-space: nowrap;
}

.kpi-example-card-title-text::after {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, currentColor 0%, color-mix(in srgb, currentColor 26%, transparent) 72%, transparent 100%);
  content: "";
  opacity: var(--kpi-example-title-underline-opacity, 1);
}

.kpi-example-card-unit {
  display: block;
  min-width: 0;
  overflow: hidden;
  color: var(--kpi-example-unit-color, #667085);
  font-size: var(--kpi-example-unit-font-size, 10px);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 14px;
  text-align: right;
  text-overflow: clip;
  white-space: nowrap;
}

.kpi-example-card-value {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--kpi-example-tone);
  isolation: isolate;
}

.kpi-example-card-value-spark {
  position: absolute;
  right: var(--kpi-example-spark-right, -4%);
  bottom: var(--kpi-example-spark-bottom, -26%);
  z-index: -1;
  width: var(--kpi-example-spark-width, 110%);
  height: var(--kpi-example-spark-height, 96%);
  overflow: visible;
  color: #0057d9;
  pointer-events: none;
  -webkit-mask-image: var(--kpi-example-spark-mask);
  mask-image: var(--kpi-example-spark-mask);
}

.kpi-example-spark-area,
.kpi-example-spark-bars rect {
  fill: url("#kpi-example-spark-fill");
}

.kpi-example-spark-stroke {
  fill: none;
  stroke: url("#kpi-example-spark-stroke");
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: var(--kpi-example-spark-stroke-width, 2.2);
}

.kpi-example-spark-bars rect {
  opacity: var(--kpi-example-spark-bar-opacity, 0.96);
}

.kpi-example-card-value strong {
  position: relative;
  display: block;
  max-width: 100%;
  overflow: visible;
  background:
    linear-gradient(
      180deg,
      var(--kpi-example-value-gradient-start, #338cff) 0%,
      var(--kpi-example-value-gradient-mid, #0868e8) 52%,
      var(--kpi-example-value-gradient-end, #0052d3) 100%
    );
  background-clip: text;
  color: transparent;
  font-size: var(--kpi-example-value-font-size, 40px);
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1;
  text-align: center;
  text-shadow: var(--kpi-example-value-shadow, 0 8px 18px rgba(0, 87, 217, 0.1));
  white-space: nowrap;
}

.kpi-example-card-value strong::after {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  color: rgba(0, 87, 217, 0.12);
  content: attr(data-value);
  filter: blur(0.6px);
  line-height: 1;
  opacity: var(--kpi-example-value-reflection-opacity, 0.3);
  transform: translateY(-7%) scaleY(-0.36);
  transform-origin: top center;
  -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.58), transparent 76%);
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.58), transparent 76%);
}

.kpi-example-card-value-affix {
  flex: 0 0 auto;
  color: #667085;
  font-size: var(--kpi-example-value-affix-size, 12px);
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.kpi-example-card-accessory {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--kpi-example-accessory-columns, 2), minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(var(--kpi-example-accessory-row-min-height, 30px), 1fr));
  column-gap: var(--kpi-example-accessory-column-gap, 0);
  row-gap: var(--kpi-example-accessory-row-gap, 0);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--kpi-example-accessory-padding, 3px 8px);
}

.kpi-example-card-accessory::before,
.kpi-example-card-accessory::after {
  position: absolute;
  pointer-events: none;
  content: "";
  opacity: 0;
}

.kpi-example-card-accessory::before {
  left: 4%;
  right: 4%;
  top: 50%;
  height: 1px;
  background:
    linear-gradient(90deg, transparent 0%, var(--kpi-example-accessory-divider-weak) 18%, var(--kpi-example-accessory-divider-strong) 34%, transparent 48% 52%, var(--kpi-example-accessory-divider-strong) 66%, var(--kpi-example-accessory-divider-weak) 82%, transparent 100%);
}

.kpi-example-card-accessory::after {
  top: 10%;
  bottom: 10%;
  left: 50%;
  width: 1px;
  background: linear-gradient(180deg, transparent 0%, var(--kpi-example-accessory-divider-weak) 20%, var(--kpi-example-accessory-divider-strong) 50%, var(--kpi-example-accessory-divider-weak) 80%, transparent 100%);
}

.kpi-example-card-accessory.has-horizontal-divider::before,
.kpi-example-card-accessory.has-vertical-divider::after {
  opacity: 1;
}

.kpi-example-card-accessory.is-single-row {
  grid-template-rows: minmax(var(--kpi-example-accessory-row-min-height, 30px), 1fr);
  align-content: center;
}

.kpi-example-card-accessory.is-single-row::after {
  top: 18%;
  bottom: 18%;
}

.kpi-example-card-accessory.is-single-metric {
  grid-template-columns: minmax(0, 1fr);
}

.kpi-example-card-accessory-item {
  display: grid;
  grid-template-columns: var(--kpi-example-accessory-icon-size, 26px) auto minmax(0, 1fr);
  align-items: center;
  gap: var(--kpi-example-accessory-item-gap, 8px);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 0 var(--kpi-example-accessory-item-outer-padding, 18px);
  color: #52677a;
  background: transparent;
}

.kpi-example-card-accessory-item:nth-child(odd) {
  padding-left: var(--kpi-example-accessory-item-inner-padding, 2px);
  padding-right: var(--kpi-example-accessory-item-outer-padding, 18px);
}

.kpi-example-card-accessory-item:nth-child(even) {
  padding-left: var(--kpi-example-accessory-item-outer-padding, 18px);
  padding-right: var(--kpi-example-accessory-item-inner-padding, 2px);
}

.kpi-example-card-accessory.is-single-metric .kpi-example-card-accessory-item {
  padding-right: var(--kpi-example-accessory-item-inner-padding, 2px);
}

.kpi-example-card-accessory.without-icons .kpi-example-card-accessory-item {
  grid-template-columns: auto minmax(0, 1fr);
}

.kpi-example-card-accessory-icon {
  display: grid;
  place-items: center;
  width: var(--kpi-example-accessory-icon-size, 26px);
  height: var(--kpi-example-accessory-icon-size, 26px);
  border: 1px solid color-mix(in srgb, var(--kpi-example-tone) 10%, transparent);
  border-radius: var(--kpi-example-accessory-icon-radius, 7px);
  color: var(--kpi-example-tone);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), var(--kpi-example-tone-soft));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.76),
    0 5px 12px rgba(0, 87, 217, 0.045);
}

.kpi-example-card-accessory-item em,
.kpi-example-card-accessory-item b {
  min-width: 0;
  overflow: hidden;
  letter-spacing: 0;
  line-height: 1;
  text-overflow: clip;
  white-space: nowrap;
}

.kpi-example-card-accessory-item em {
  color: #667085;
  font-size: var(--kpi-example-accessory-label-size, 12px);
  font-style: normal;
  font-weight: 700;
}

.kpi-example-card-accessory-item b {
  color: var(--kpi-example-value-color, var(--kpi-example-tone));
  font-size: var(--kpi-example-accessory-value-size, 15px);
  font-weight: 900;
  text-align: right;
}
</style>
