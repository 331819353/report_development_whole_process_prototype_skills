<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../types';

type ChartKind = 'line' | 'pie' | 'scatter' | 'map' | 'candlestick';
type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface NamedValue {
  name: string;
  value: number;
}

interface ScatterPoint {
  name: string;
  value: [number, number] | [number, number, number];
}

interface CandlePoint {
  date: string;
  open: number;
  close: number;
  low: number;
  high: number;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  chartKind?: ChartKind;
  seriesName?: string;
  unit?: string;
  categories?: string[];
  values?: number[];
  pieData?: NamedValue[];
  points?: ScatterPoint[];
  mapData?: NamedValue[];
  candles?: CandlePoint[];
  tone?: Tone;
}

const props = defineProps<Props>();

const rootEl = ref<HTMLElement | null>(null);
const chartEl = ref<HTMLDivElement | null>(null);
const rootSize = ref({ width: 0, height: 0 });
const chartTheme = ref({
  legendText: '#344054',
  axisText: '#667085',
  axisLine: '',
  splitLine: '',
  labelText: '#1d3f68',
  emphasisLabelText: '#004ac6',
});
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const seriesTypeKey = 'type';
const tone = computed(() => props.tone ?? 'primary');
const chartKind = computed<ChartKind>(() => props.chartKind ?? 'line');
const unit = computed(() => props.unit ?? '');
const yAxisUnit = computed(() => unit.value);
const seriesName = computed(() => props.seriesName ?? '指标');
const categories = computed(() => {
  if (props.categories?.length) {
    return props.categories;
  }

  return ['1月', '2月', '3月', '4月', '5月', '6月'];
});
const values = computed(() => (props.values?.length ? props.values : [42, 58, 52, 67, 74, 88]));
const pieRows = computed<NamedValue[]>(() =>
  props.pieData?.length
    ? props.pieData
    : [
        { name: '线上', value: 42 },
        { name: '门店', value: 31 },
        { name: '经销', value: 18 },
        { name: '其他', value: 9 },
      ],
);
const scatterRows = computed<ScatterPoint[]>(() =>
  props.points?.length
    ? props.points
    : [
        { name: 'A区', value: [42, 76, 18] },
        { name: 'B区', value: [58, 82, 24] },
        { name: 'C区', value: [66, 69, 16] },
        { name: 'D区', value: [74, 88, 28] },
      ],
);
const mapRows = computed<NamedValue[]>(() =>
  props.mapData?.length
    ? props.mapData
    : [
        { name: '华东', value: 88 },
        { name: '华南', value: 76 },
        { name: '华北', value: 64 },
        { name: '海外', value: 92 },
      ],
);
const candleRows = computed<CandlePoint[]>(() =>
  props.candles?.length
    ? props.candles
    : [
        { date: '周一', open: 24, close: 29, low: 21, high: 31 },
        { date: '周二', open: 29, close: 26, low: 24, high: 32 },
        { date: '周三', open: 26, close: 34, low: 25, high: 36 },
        { date: '周四', open: 34, close: 31, low: 29, high: 35 },
      ],
);

const chartScale = computed(() => {
  const width = rootSize.value.width || 220;
  const height = rootSize.value.height || 120;
  const compact = Math.min(width / 260, height / 150);
  const fontSize = Math.max(8, Math.min(11, Math.round(9 + compact)));

  return {
    fontSize,
    axisFontSize: Math.max(8, fontSize - 1),
    gridTop: Math.max(20, fontSize + 13),
    gridBottom: Math.max(18, fontSize + 9),
    gridLeft: Math.max(28, fontSize * 2.3 + 8),
    gridRight: 8,
    symbolSize: Math.max(6, Math.min(13, Math.round(width / 26))),
  };
});

const toneColors = computed(() => {
  const map: Record<Tone, { color: string; soft: string; line: string; second: string }> = {
    primary: { color: '#0057d9', soft: 'rgba(0, 87, 217, 0.2)', line: 'rgba(0, 87, 217, 0.13)', second: '#4a87f5' },
    success: { color: '#0b6fe8', soft: 'rgba(11, 111, 232, 0.18)', line: 'rgba(0, 87, 217, 0.12)', second: '#64a3ff' },
    warning: { color: '#2f7fe8', soft: 'rgba(47, 127, 232, 0.18)', line: 'rgba(0, 87, 217, 0.12)', second: '#8db9ff' },
    danger: { color: '#1c65c9', soft: 'rgba(28, 101, 201, 0.18)', line: 'rgba(0, 87, 217, 0.12)', second: '#6fa9ff' },
    neutral: { color: '#526d9a', soft: 'rgba(82, 109, 154, 0.16)', line: 'rgba(0, 87, 217, 0.1)', second: '#8ca6cc' },
  };

  return map[tone.value];
});

const readChartThemeColor = (name: string, fallback: string) => {
  if (!rootEl.value) {
    return fallback;
  }

  return getComputedStyle(rootEl.value).getPropertyValue(name).trim() || fallback;
};

const updateChartTheme = () => {
  const nextTheme = {
    legendText: readChartThemeColor('--chart-legend-text', '#344054'),
    axisText: readChartThemeColor('--chart-axis-text', '#667085'),
    axisLine: readChartThemeColor('--chart-axis-line', toneColors.value.line),
    splitLine: readChartThemeColor('--chart-split-line', toneColors.value.line),
    labelText: readChartThemeColor('--chart-label-text', '#1d3f68'),
    emphasisLabelText: readChartThemeColor('--chart-emphasis-label-text', '#004ac6'),
  };

  if ((Object.keys(nextTheme) as Array<keyof typeof nextTheme>).some((key) => nextTheme[key] !== chartTheme.value[key])) {
    chartTheme.value = nextTheme;
  }
};

const legendBase = computed(() => ({
  show: true,
  top: 0,
  left: 'center',
  itemWidth: Math.max(7, chartScale.value.fontSize),
  itemHeight: Math.max(5, chartScale.value.fontSize - 3),
  icon: 'roundRect',
  textStyle: {
    color: chartTheme.value.legendText,
    fontSize: chartScale.value.fontSize,
    fontWeight: 650,
  },
}));

const gridBase = computed(() => ({
  top: chartScale.value.gridTop,
  right: chartScale.value.gridRight,
  bottom: chartScale.value.gridBottom,
  left: chartScale.value.gridLeft,
  containLabel: true,
}));

const axisBase = computed(() => ({
  axisTick: { show: false },
  axisLine: { lineStyle: { color: chartTheme.value.axisLine || toneColors.value.line } },
  axisLabel: {
    show: true,
    color: chartTheme.value.axisText,
    fontSize: chartScale.value.axisFontSize,
    hideOverlap: true,
    margin: 4,
  },
  splitLine: {
    lineStyle: {
      color: chartTheme.value.splitLine || toneColors.value.line,
      type: 'dashed',
    },
  },
}));

const yAxisLabel = computed(() => ({
  ...axisBase.value.axisLabel,
  hideOverlap: false,
  formatter: (value: unknown) => String(value ?? ''),
}));

const tooltipValue = (value: unknown) => (Array.isArray(value) ? value.join(', ') : String(value ?? ''));

const lineOption = (): Record<string, unknown> => ({
  animation: true,
  animationDuration: 420,
  color: [toneColors.value.color],
  legend: legendBase.value,
  tooltip: {
    trigger: 'axis',
    confine: true,
    appendToBody: true,
    formatter: (items: unknown) => {
      const points = Array.isArray(items) ? items : [items];
      const first = points[0] as { axisValue?: string; value?: number } | undefined;

      return [`${first?.axisValue ?? ''}`, `${seriesName.value}: ${first?.value ?? 0} ${unit.value}`].filter(Boolean).join('<br/>');
    },
  },
  grid: gridBase.value,
  xAxis: {
    ...axisBase.value,
    type: 'category',
    data: categories.value,
    axisLabel: {
      ...axisBase.value.axisLabel,
      interval: 0,
    },
    splitLine: { show: false },
  },
  yAxis: {
    ...axisBase.value,
    type: 'value',
    axisUnit: yAxisUnit.value,
    axisLabel: yAxisLabel.value,
  },
  series: [
    {
      ['name']: seriesName.value,
      [seriesTypeKey]: 'line',
      smooth: true,
      showSymbol: true,
      symbolSize: Math.max(4, chartScale.value.symbolSize - 2),
      data: values.value.slice(0, categories.value.length),
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: toneColors.value.soft },
          { offset: 1, color: 'rgba(255, 255, 255, 0)' },
        ]),
      },
      lineStyle: {
        width: 2,
      },
    },
  ],
});

const pieOption = (): Record<string, unknown> => ({
  animation: true,
  animationDuration: 420,
  color: ['#0057d9', '#347df0', '#68a4ff', '#9bc4ff', '#c9ddf6'],
  legend: {
    show: false,
  },
  tooltip: {
    trigger: 'item',
    confine: true,
    appendToBody: true,
    formatter: (params: unknown) => {
      const item = params as { name?: string; value?: number | string | null; percent?: number };

      return `${item.name ?? ''}: ${item.value ?? 0}${unit.value} (${item.percent ?? 0}%)`;
    },
  },
  series: [
    {
      ['name']: seriesName.value,
      [seriesTypeKey]: 'pie',
      radius: ['28%', '50%'],
      center: ['50%', '56%'],
      minAngle: 8,
      avoidLabelOverlap: true,
      data: pieRows.value,
      label: {
        show: true,
        position: 'outside',
        formatter: '{b} {d}%',
        alignTo: 'edge',
        edgeDistance: 4,
        color: chartTheme.value.labelText,
        fontSize: chartScale.value.axisFontSize,
        fontWeight: 650,
        lineHeight: Math.max(10, chartScale.value.axisFontSize + 2),
      },
      labelLine: {
        show: true,
        length: 6,
        length2: 8,
        smooth: true,
        lineStyle: {
          color: 'rgba(0, 87, 217, 0.42)',
          width: 1,
        },
      },
    },
  ],
});

const scatterOption = (): Record<string, unknown> => ({
  animation: true,
  animationDuration: 420,
  color: [toneColors.value.color],
  legend: legendBase.value,
  tooltip: {
    trigger: 'item',
    confine: true,
    appendToBody: true,
    formatter: (params: unknown) => {
      const item = params as { name?: string; value?: number[] };

      return `${item.name ?? ''}<br/>转化: ${item.value?.[0] ?? 0}%<br/>健康度: ${item.value?.[1] ?? 0}${unit.value}`;
    },
  },
  grid: gridBase.value,
  xAxis: {
    ...axisBase.value,
    type: 'value',
    min: 35,
    max: 90,
    splitNumber: 3,
  },
  yAxis: {
    ...axisBase.value,
    type: 'value',
    axisUnit: yAxisUnit.value,
    axisLabel: yAxisLabel.value,
    min: 55,
    max: 95,
    splitNumber: 3,
  },
  series: [
    {
      ['name']: seriesName.value,
      [seriesTypeKey]: 'scatter',
      data: scatterRows.value.map((item) => ({
        name: item.name,
        value: item.value,
      })),
      symbolSize: (value: unknown) => {
        const tuple = Array.isArray(value) ? value : [];
        return Math.max(7, Math.min(18, Number(tuple[2] ?? 12) / 1.4));
      },
      itemStyle: {
        color: toneColors.value.color,
        opacity: 0.82,
        borderColor: 'rgba(255, 255, 255, 0.92)',
        borderWidth: 1,
      },
    },
  ],
});

const templateMapName = 'template-business-region-map';
let mapRegistered = false;
const registerTemplateMap = () => {
  if (mapRegistered) {
    return;
  }

  echarts.registerMap(templateMapName, {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: '华北' },
        geometry: { type: 'Polygon', coordinates: [[[22, 70], [48, 84], [58, 64], [36, 52], [22, 70]]] },
      },
      {
        type: 'Feature',
        properties: { name: '华东' },
        geometry: { type: 'Polygon', coordinates: [[[54, 58], [82, 64], [86, 36], [58, 34], [54, 58]]] },
      },
      {
        type: 'Feature',
        properties: { name: '华南' },
        geometry: { type: 'Polygon', coordinates: [[[36, 45], [56, 34], [66, 14], [38, 12], [24, 28], [36, 45]]] },
      },
      {
        type: 'Feature',
        properties: { name: '海外' },
        geometry: { type: 'Polygon', coordinates: [[[8, 28], [24, 34], [28, 12], [8, 8], [8, 28]]] },
      },
    ],
  } as Parameters<typeof echarts.registerMap>[1]);
  mapRegistered = true;
};

const mapOption = (): Record<string, unknown> => {
  registerTemplateMap();
  const mapValues = mapRows.value.map((item) => item.value);

  return {
    animation: true,
    animationDuration: 420,
    color: [toneColors.value.color],
    tooltip: {
      trigger: 'item',
      confine: true,
      appendToBody: true,
      formatter: (params: unknown) => {
        const item = params as { name?: string; value?: number | string | null };

        return `${item.name ?? ''}: ${item.value ?? 0} ${unit.value}`;
      },
    },
    visualMap: {
      show: false,
      min: Math.min(...mapValues, 0),
      max: Math.max(...mapValues, 1),
      inRange: {
        color: ['#d9e8ff', '#79a8ff', toneColors.value.color],
      },
    },
    series: [
      {
        ['name']: seriesName.value,
        [seriesTypeKey]: 'map',
        map: templateMapName,
        roam: false,
        top: 16,
        bottom: 2,
        left: 2,
        right: 2,
        data: mapRows.value,
        label: {
          show: true,
          color: chartTheme.value.labelText,
          fontSize: chartScale.value.axisFontSize,
          fontWeight: 700,
        },
        itemStyle: {
          borderColor: 'rgba(0, 87, 217, 0.26)',
          borderWidth: 1,
        },
        emphasis: {
          label: { color: chartTheme.value.emphasisLabelText },
          itemStyle: { areaColor: '#c5dcff' },
        },
      },
    ],
  };
};

const candleOption = (): Record<string, unknown> => ({
  animation: true,
  animationDuration: 420,
  color: [toneColors.value.color, toneColors.value.second],
  legend: legendBase.value,
  tooltip: {
    trigger: 'axis',
    confine: true,
    appendToBody: true,
    axisPointer: { type: 'cross' },
    formatter: (items: unknown) => {
      const points = Array.isArray(items) ? items : [items];
      const first = points[0] as { axisValue?: string; data?: number[] } | undefined;
      const data = first?.data ?? [];

      return [
        first?.axisValue ?? '',
        `开盘: ${data[0] ?? 0}${unit.value}`,
        `收盘: ${data[1] ?? 0}${unit.value}`,
        `最低: ${data[2] ?? 0}${unit.value}`,
        `最高: ${data[3] ?? 0}${unit.value}`,
      ].join('<br/>');
    },
  },
  grid: {
    ...gridBase.value,
    left: Math.max(30, chartScale.value.gridLeft),
  },
  xAxis: {
    ...axisBase.value,
    type: 'category',
    data: candleRows.value.map((item) => item.date),
    boundaryGap: true,
    axisLabel: {
      ...axisBase.value.axisLabel,
      interval: 0,
    },
    splitLine: { show: false },
  },
  yAxis: {
    ...axisBase.value,
    type: 'value',
    scale: true,
    axisUnit: yAxisUnit.value,
    splitNumber: 3,
    axisLabel: yAxisLabel.value,
  },
  series: [
    {
      ['name']: seriesName.value,
      [seriesTypeKey]: 'candlestick',
      data: candleRows.value.map((item) => [item.open, item.close, item.low, item.high]),
      itemStyle: {
        color: '#0f8f5f',
        color0: '#ba1a1a',
        borderColor: '#0f8f5f',
        borderColor0: '#ba1a1a',
      },
    },
  ],
});

const option = computed<EChartsOption>(() => {
  const builders: Record<ChartKind, () => Record<string, unknown>> = {
    line: lineOption,
    pie: pieOption,
    scatter: scatterOption,
    map: mapOption,
    candlestick: candleOption,
  };

  return builders[chartKind.value]() as EChartsOption;
});

const hasRenderableData = computed(() => {
  if (chartKind.value === 'pie') {
    return pieRows.value.length > 0;
  }

  if (chartKind.value === 'scatter') {
    return scatterRows.value.length > 0;
  }

  if (chartKind.value === 'map') {
    return mapRows.value.length > 0;
  }

  if (chartKind.value === 'candlestick') {
    return candleRows.value.length > 0;
  }

  return values.value.length > 0;
});

const updateRootSize = () => {
  if (!rootEl.value) {
    return;
  }

  const nextRect = rootEl.value.getBoundingClientRect();
  const nextSize = {
    width: Math.round(nextRect.width),
    height: Math.round(nextRect.height),
  };

  if (nextSize.width !== rootSize.value.width || nextSize.height !== rootSize.value.height) {
    rootSize.value = nextSize;
  }
};

const hasRenderableSize = () => {
  if (!chartEl.value) {
    return false;
  }

  const rect = chartEl.value.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
};

const renderChart = () => {
  updateRootSize();
  updateChartTheme();

  if (!hasRenderableData.value) {
    chart?.dispose();
    chart = null;
    return;
  }

  if (!chartEl.value) {
    return;
  }

  if (!hasRenderableSize()) {
    return;
  }

  if (!chart) {
    chart = echarts.init(chartEl.value);
  }

  chart.setOption(option.value, true);
  chart.resize();
};

const scheduleRenderChart = async () => {
  await nextTick();
  renderChart();
};

onMounted(() => {
  if (rootEl.value) {
    resizeObserver = new ResizeObserver(() => {
      updateRootSize();
      if (hasRenderableSize()) {
        chart?.resize();
        void scheduleRenderChart();
      }
    });
    resizeObserver.observe(rootEl.value);
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
  <section ref="rootEl" class="template-echart-widget" :class="`tone-${tone}`" aria-label="自适应图表模板">
    <div v-if="hasRenderableData" ref="chartEl" class="template-echart-widget-canvas" />
    <div v-else class="template-echart-widget-empty">暂无数据</div>
  </section>
</template>

<style scoped>
.template-echart-widget {
  --tone-color: #0057d9;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-variant-numeric: tabular-nums;
}

.tone-success {
  --tone-color: #0b6fe8;
}

.tone-warning {
  --tone-color: #2f7fe8;
}

.tone-danger {
  --tone-color: #1c65c9;
}

.tone-neutral {
  --tone-color: #526d9a;
}

.template-echart-widget-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.template-echart-widget-empty {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: var(--muted, #667085);
  font-size: 12px;
}
</style>
