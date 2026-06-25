<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../types';

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface Props {
  context: WidgetContext;
  data?: unknown[];
  label?: string;
  value?: string;
  unit?: string;
  categories?: string[];
  series?: number[];
  seriesName?: string;
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
});
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const tone = computed(() => props.tone ?? 'primary');
const label = computed(() => props.label ?? '收入趋势');
const value = computed(() => props.value ?? '92');
const unit = computed(() => props.unit ?? '万元');
const yAxisUnit = computed(() => unit.value);
const seriesName = computed(() => props.seriesName ?? label.value);
const seriesValues = computed(() => (props.series?.length ? props.series : [42, 58, 46, 64, 72, 92]));
const categories = computed(() => {
  if (props.categories?.length) {
    return props.categories.slice(0, seriesValues.value.length);
  }

  return seriesValues.value.map((_, index) => `${index + 1}期`);
});

const chartRows = computed(() =>
  seriesValues.value.slice(0, categories.value.length).map((item, index) => ({
    category: categories.value[index] ?? `${index + 1}期`,
    value: item,
  })),
);

const chartScale = computed(() => {
  const width = rootSize.value.width || 220;
  const height = rootSize.value.height || 120;
  const compact = Math.min(width / 260, height / 150);
  const fontSize = Math.max(8, Math.min(11, Math.round(9 + compact)));
  const barWidth = Math.max(8, Math.min(20, Math.floor(width / Math.max(chartRows.value.length * 2.5, 1))));

  return {
    fontSize,
    axisFontSize: Math.max(8, fontSize - 1),
    gridTop: Math.max(20, fontSize + 13),
    gridBottom: Math.max(18, fontSize + 9),
    gridLeft: Math.max(28, fontSize * 2.3 + 8),
    gridRight: 8,
    barWidth,
  };
});

const toneColors = computed(() => {
  const map: Record<Tone, { color: string; soft: string; line: string }> = {
    primary: { color: '#0057d9', soft: 'rgba(0, 87, 217, 0.26)', line: 'rgba(0, 87, 217, 0.13)' },
    success: { color: '#0f8f5f', soft: 'rgba(15, 143, 95, 0.24)', line: 'rgba(15, 143, 95, 0.13)' },
    warning: { color: '#b76b00', soft: 'rgba(183, 107, 0, 0.24)', line: 'rgba(183, 107, 0, 0.14)' },
    danger: { color: '#ba1a1a', soft: 'rgba(186, 26, 26, 0.23)', line: 'rgba(186, 26, 26, 0.13)' },
    neutral: { color: '#52677a', soft: 'rgba(82, 103, 122, 0.22)', line: 'rgba(82, 103, 122, 0.13)' },
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
  const colors = toneColors.value;
  const nextTheme = {
    legendText: readChartThemeColor('--chart-legend-text', '#344054'),
    axisText: readChartThemeColor('--chart-axis-text', '#667085'),
    axisLine: readChartThemeColor('--chart-axis-line', colors.line),
    splitLine: readChartThemeColor('--chart-split-line', colors.line),
  };

  if ((Object.keys(nextTheme) as Array<keyof typeof nextTheme>).some((key) => nextTheme[key] !== chartTheme.value[key])) {
    chartTheme.value = nextTheme;
  }
};

const option = computed<EChartsOption>(() => {
  const scale = chartScale.value;
  const colors = toneColors.value;

  return {
    animation: true,
    animationDuration: 420,
    animationEasing: 'cubicOut',
    color: [colors.color],
    legend: {
      show: true,
      top: 0,
      left: 'center',
      itemWidth: Math.max(7, scale.fontSize),
      itemHeight: Math.max(5, scale.fontSize - 3),
      icon: 'roundRect',
      textStyle: {
        color: chartTheme.value.legendText,
        fontSize: scale.fontSize,
        fontWeight: 650,
      },
    },
    tooltip: {
      trigger: 'axis',
      confine: true,
      appendToBody: true,
      axisPointer: {
        type: 'shadow',
      },
      formatter: (items: unknown) => {
        const points = Array.isArray(items) ? items : [items];
        const first = points[0] as { axisValue?: string; value?: number } | undefined;
        const row = chartRows.value.find((item) => item.category === first?.axisValue);

        return [`${first?.axisValue ?? ''}`, `${seriesName.value}: ${row?.value ?? first?.value ?? 0} ${yAxisUnit.value}`]
          .filter(Boolean)
          .join('<br/>');
      },
    },
    grid: {
      top: scale.gridTop,
      right: scale.gridRight,
      bottom: scale.gridBottom,
      left: scale.gridLeft,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: chartRows.value.map((row) => row.category),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: chartTheme.value.axisLine || colors.line } },
      axisLabel: {
        show: true,
        color: chartTheme.value.axisText,
        fontSize: scale.axisFontSize,
        interval: 0,
        hideOverlap: true,
        margin: 4,
      },
    },
    yAxis: {
      type: 'value',
      axisUnit: yAxisUnit.value,
      axisLabel: {
        show: true,
        color: chartTheme.value.axisText,
        fontSize: scale.axisFontSize,
        hideOverlap: false,
        margin: 4,
        formatter: (value: unknown) => String(value ?? ''),
      },
      splitLine: {
        lineStyle: {
          color: chartTheme.value.splitLine || colors.line,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        ['name']: seriesName.value,
        type: 'bar',
        data: chartRows.value.map((row) => row.value),
        barMaxWidth: scale.barWidth,
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors.color },
            { offset: 1, color: colors.soft },
          ]),
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: colors.color,
          },
        },
      },
    ],
  };
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

  if (!chartRows.value.length) {
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
  <section ref="rootEl" class="template-carried-mini-trend" :class="`tone-${tone}`" aria-label="自适应柱状图">
    <div v-if="chartRows.length" ref="chartEl" class="mini-trend-chart" />
    <div v-else class="mini-trend-empty">暂无数据</div>
  </section>
</template>

<style scoped>
.template-carried-mini-trend {
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
  --tone-color: #0f8f5f;
}

.tone-warning {
  --tone-color: #b76b00;
}

.tone-danger {
  --tone-color: #ba1a1a;
}

.tone-neutral {
  --tone-color: #52677a;
}

.mini-trend-chart {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.mini-trend-empty {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: var(--muted, #667085);
  font-size: 12px;
}
</style>
