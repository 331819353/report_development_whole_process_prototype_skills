<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../../types';

interface StageRow {
  name: string;
  value: number;
  rate: string;
}

const props = defineProps<{
  context?: WidgetContext;
  data?: unknown[];
  title?: string;
  contentAreaTitle?: string;
  showContentTitle?: boolean;
  slotCount?: number;
  templateFile?: string;
}>();

const fallbackContext: WidgetContext = {
  area: 'page',
  navId: 'component-library',
  navLabel: '组件内容区',
  blockId: 'launch-conversion-waterfall-content-area-template',
  filters: {},
};

const chartRef = ref<HTMLDivElement | null>(null);
const chartSize = ref({ width: 0, height: 0 });
const contentContext = computed(() => props.context ?? fallbackContext);
const resolvedContentAreaTitle = computed(() => props.contentAreaTitle ?? props.title ?? '');
const shouldShowContentAreaTitle = computed(() => props.showContentTitle !== false && props.slotCount !== 1 && Boolean(resolvedContentAreaTitle.value));
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const stageRows: StageRow[] = [
  { name: '覆盖门店', value: 1260, rate: '100%' },
  { name: '动销门店', value: 1038, rate: '82%' },
  { name: '复购门店', value: 684, rate: '54%' },
  { name: '高频门店', value: 426, rate: '34%' },
];

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const chartScale = computed(() => {
  const width = chartSize.value.width || 260;
  const height = chartSize.value.height || 140;
  const fontSize = Math.round(clampNumber(Math.min(width / 28, height / 13), 8, 10) * 10) / 10;
  const gridTop = Math.round(clampNumber(height * 0.12, 12, 18));
  const gridBottom = Math.round(clampNumber(height * 0.17, 18, 26));
  const gridLeft = Math.round(clampNumber(width * 0.15, 30, 44));
  const gridRight = Math.round(clampNumber(width * 0.035, 6, 12));
  const symbolSize = Math.round(clampNumber(Math.min(width / 42, height / 18), 5, 8) * 10) / 10;
  const strokeWidth = Math.round(clampNumber(symbolSize / 4, 1.2, 2) * 10) / 10;

  return { fontSize, gridTop, gridBottom, gridLeft, gridRight, symbolSize, strokeWidth };
});

const option = computed<EChartsOption>(() => ({
  animation: true,
  animationDuration: 520,
  color: ['#0057d9', '#7db5ff'],
  grid: {
    top: chartScale.value.gridTop,
    right: chartScale.value.gridRight,
    bottom: chartScale.value.gridBottom,
    left: chartScale.value.gridLeft,
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params) => {
      const first = Array.isArray(params) ? params[0] : params;
      const row = stageRows[first.dataIndex ?? 0];

      return `${row.name}<br/>门店数：${row.value}<br/>转化率：${row.rate}`;
    },
  },
  xAxis: {
    type: 'category',
    data: stageRows.map((item) => item.name),
    axisTick: { show: false },
    axisLine: { lineStyle: { color: 'rgba(0, 87, 217, 0.18)' } },
    axisLabel: {
      color: '#5f718a',
      fontSize: chartScale.value.fontSize,
      fontWeight: 700,
    },
  },
  yAxis: {
    type: 'value',
    name: '门店数',
    nameTextStyle: {
      color: '#5f718a',
      fontSize: chartScale.value.fontSize,
      fontWeight: 700,
      align: 'left',
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0, 87, 217, 0.1)',
        type: 'dashed',
      },
    },
    axisLabel: {
      color: '#6b7d92',
      fontSize: chartScale.value.fontSize,
    },
  },
  series: [
    {
      type: 'bar',
      name: '转化门店',
      data: stageRows.map((item) => item.value),
      barWidth: '46%',
      itemStyle: {
        borderRadius: [5, 5, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#0057d9' },
          { offset: 1, color: '#8fc2ff' },
        ]),
      },
      label: {
        show: true,
        position: 'insideTop',
        color: '#ffffff',
        fontSize: chartScale.value.fontSize,
        fontWeight: 800,
        formatter: ({ dataIndex }) => stageRows[dataIndex].rate,
      },
    },
    {
      type: 'line',
      name: '转化路径',
      data: stageRows.map((item) => item.value),
      symbol: 'circle',
      symbolSize: chartScale.value.symbolSize,
      lineStyle: {
        width: chartScale.value.strokeWidth,
        color: '#0c4fb3',
      },
      itemStyle: {
        color: '#ffffff',
        borderColor: '#0c4fb3',
        borderWidth: chartScale.value.strokeWidth,
      },
      tooltip: { show: false },
    },
  ],
}));

const updateChartSize = () => {
  if (!chartRef.value) {
    return;
  }

  const { width, height } = chartRef.value.getBoundingClientRect();
  const nextSize = { width: Math.round(width), height: Math.round(height) };

  if (chartSize.value.width !== nextSize.width || chartSize.value.height !== nextSize.height) {
    chartSize.value = nextSize;
  }

  chart?.resize();
};

const renderChart = async () => {
  await nextTick();

  if (!chartRef.value) {
    return;
  }

  chart ??= echarts.init(chartRef.value);
  updateChartSize();
  chart.setOption(option.value, true);
  chart.resize();
};

onMounted(() => {
  void renderChart();

  if (chartRef.value) {
    resizeObserver = new ResizeObserver(updateChartSize);
    resizeObserver.observe(chartRef.value);
    updateChartSize();
  }
});

watch([option, contentContext], () => {
  void renderChart();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  chart?.dispose();
  chart = null;
});
</script>

<template>
  <section class="component-content-area-template" :class="{ 'has-content-title': shouldShowContentAreaTitle }" aria-label="新品铺货转化路径组件内容区模板">
    <header v-if="shouldShowContentAreaTitle" class="component-content-area-title">{{ resolvedContentAreaTitle }}</header>
    <div class="component-content-area-body">
    <div ref="chartRef" class="launch-conversion-chart"></div>
    </div>
  </section>
</template>

<style scoped>
.component-content-area-template {
  display: grid;
  container-type: size;
  --content-area-font-scale: 1;
  --content-area-tight-scale: 1;
  grid-template-rows: minmax(0, 1fr);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 0;
  border-radius: var(--component-content-area-radius, 8px);
  background: var(--component-content-area-background, transparent);
}

.component-content-area-template.has-content-title {
  grid-template-rows: 20px minmax(0, 1fr);
}

.component-content-area-title {
  display: block;
  height: 20px;
  min-width: 0;
  overflow: hidden;
  padding: 3px 8px 0;
  color: var(--text-strong, #101828);
  font-size: calc(12px * var(--content-area-title-scale, 1));
  font-weight: 750;
  line-height: calc(14px * var(--content-area-title-scale, 1));
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.component-content-area-body {
  --content-area-font-scale: 1;
  --content-area-tight-scale: 1;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 0;
  border-radius: inherit;
  font-size: calc(12px * var(--content-area-font-scale));
  line-height: calc(16px * var(--content-area-tight-scale));
}

.component-content-area-template.has-content-title .component-content-area-body {
  border-radius: 0 0 var(--component-content-area-radius, 8px) var(--component-content-area-radius, 8px);
}

.launch-conversion-chart {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

@container (max-width: 260px), (max-height: 150px) {
  .component-content-area-title {
    padding: 2px 6px 0;
    --content-area-title-scale: 0.92;
  }

  .component-content-area-body {
    --content-area-font-scale: 0.9;
    --content-area-tight-scale: 0.88;
  }
}

@container (max-width: 220px), (max-height: 118px) {
  .component-content-area-title {
    padding: 2px 5px 0;
    --content-area-title-scale: 0.84;
  }

  .component-content-area-body {
    --content-area-font-scale: 0.78;
    --content-area-tight-scale: 0.76;
  }
}

</style>
