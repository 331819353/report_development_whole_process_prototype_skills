<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { DashboardWidgetActionEvent } from '../../types/actions';
import type { WidgetContext } from '../types';

interface CompactBarRow {
  period: string;
  actual: number;
  target?: number;
}

interface CompactBarChartInputRow {
  period?: string;
  actual?: number;
  target?: number;
}

export interface CompactBarChartProps {
  context: WidgetContext;
  data?: CompactBarChartInputRow[];
  metricName?: string;
  unit?: string;
  chartGeometryContract?: Record<string, unknown>;
}

const props = defineProps<CompactBarChartProps>();

const emit = defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const rootEl = ref<HTMLElement | null>(null);
const chartEl = ref<HTMLDivElement | null>(null);
const chartTheme = ref({
  axisText: '#667085',
  axisLine: 'rgba(0, 74, 198, 0.12)',
  splitLine: 'rgba(0, 74, 198, 0.08)',
});
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const rows = computed<CompactBarRow[]>(() =>
  (props.data ?? [])
    .filter((row): row is CompactBarChartInputRow & { period: string; actual: number } => typeof row.actual === 'number' && Boolean(row.period))
    .map((row) => ({
      period: row.period,
      actual: row.actual,
      target: typeof row.target === 'number' ? row.target : undefined,
    })),
);

const metricName = computed(() => props.metricName ?? 'Actual');
const yAxisUnit = computed(() => props.unit ?? '万元');
const hideLegend = true;

const readChartThemeColor = (name: string, fallback: string) => {
  if (!rootEl.value) {
    return fallback;
  }

  return getComputedStyle(rootEl.value).getPropertyValue(name).trim() || fallback;
};

const updateChartTheme = () => {
  const nextTheme = {
    axisText: readChartThemeColor('--chart-axis-text', '#667085'),
    axisLine: readChartThemeColor('--chart-axis-line', 'rgba(0, 74, 198, 0.12)'),
    splitLine: readChartThemeColor('--chart-split-line', 'rgba(0, 74, 198, 0.08)'),
  };

  if ((Object.keys(nextTheme) as Array<keyof typeof nextTheme>).some((key) => nextTheme[key] !== chartTheme.value[key])) {
    chartTheme.value = nextTheme;
  }
};

const option = computed<EChartsOption>(() => ({
  animation: true,
  animationDuration: 420,
  animationEasing: 'cubicOut',
  color: ['#004ac6'],
  legend: {
    show: !hideLegend,
  },
  tooltip: {
    trigger: 'axis',
    confine: true,
    axisPointer: {
      type: 'shadow',
    },
    formatter: (items) => {
      const points = Array.isArray(items) ? items : [items];
      const first = points[0] as { axisValue?: string } | undefined;
      const row = rows.value.find((item) => item.period === first?.axisValue);
      const value = row?.actual ?? 0;
      const target = row?.target;
      return [
        `${first?.axisValue ?? ''}`,
        `${metricName.value}: ${value} ${yAxisUnit.value}`,
        target === undefined ? '' : `Target: ${target} ${yAxisUnit.value}`,
      ]
        .filter(Boolean)
        .join('<br/>');
    },
  },
  grid: {
    top: 8,
    right: 6,
    bottom: 20,
    left: 30,
    containLabel: false,
  },
  xAxis: {
    type: 'category',
    data: rows.value.map((row) => row.period),
    axisTick: { show: false },
    axisLine: { lineStyle: { color: chartTheme.value.axisLine } },
    axisLabel: {
      color: chartTheme.value.axisText,
      fontSize: 10,
      interval: 0,
      hideOverlap: true,
    },
  },
  yAxis: {
    type: 'value',
    name: yAxisUnit.value,
    nameLocation: 'middle',
    nameRotate: 90,
    nameGap: 20,
    nameTextStyle: {
      color: chartTheme.value.axisText,
      fontSize: 10,
      align: 'center',
    },
    axisLabel: {
      color: chartTheme.value.axisText,
      fontSize: 10,
      hideOverlap: false,
      formatter: (value: unknown) => String(value ?? ''),
    },
    splitLine: {
      lineStyle: {
        color: chartTheme.value.splitLine,
        type: 'dashed',
      },
    },
  },
  series: [
    {
      name: metricName.value,
      type: 'bar',
      data: rows.value.map((row) => row.actual),
      barMaxWidth: 18,
      itemStyle: {
        borderRadius: [2, 2, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 74, 198, 0.82)' },
          { offset: 1, color: 'rgba(0, 74, 198, 0.36)' },
        ]),
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          color: '#004ac6',
        },
      },
    },
  ],
}));

const hasRenderableSize = () => {
  if (!chartEl.value) {
    return false;
  }

  const rect = chartEl.value.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
};

const ensureResizeObserver = () => {
  if (!chartEl.value || resizeObserver) {
    return;
  }

  resizeObserver = new ResizeObserver(() => {
    if (hasRenderableSize()) {
      chart?.resize();
      void scheduleRenderChart();
    }
  });
  resizeObserver.observe(chartEl.value);
};

const renderChart = () => {
  updateChartTheme();

  if (!rows.value.length) {
    resizeObserver?.disconnect();
    resizeObserver = null;
    chart?.dispose();
    chart = null;
    return;
  }

  if (!chartEl.value) {
    return;
  }

  ensureResizeObserver();

  if (!hasRenderableSize()) {
    return;
  }

  if (!chart) {
    chart = echarts.init(chartEl.value);
    chart.on('click', (params) => {
      emit('dashboard-action', {
        name: 'barClick',
        payload: {
          blockId: props.context.blockId,
          period: params.name,
          value: params.value,
        },
      });
    });
  }

  chart.setOption(option.value, true);
  chart.resize();
};

const scheduleRenderChart = async () => {
  await nextTick();
  renderChart();
};

onMounted(() => {
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
  <section ref="rootEl" class="compact-bar-chart" aria-label="紧凑柱状图">
    <div v-if="rows.length" ref="chartEl" class="compact-bar-chart-canvas" />
    <div v-else class="compact-bar-chart-empty">暂无数据</div>
  </section>
</template>

<style scoped>
.compact-bar-chart {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.compact-bar-chart-canvas {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.compact-bar-chart-empty {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: var(--muted);
  font-size: 12px;
}
</style>
