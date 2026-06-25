<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import { AlertTriangle, CircleUserRound, Clock3, MessageSquareText, Target, ThumbsUp } from '@lucide/vue';
import type { TemplateWidgetDisplayBudget, WidgetContext } from '../types';

type CardKind = 'target' | 'compare' | 'warning' | 'contribution' | 'mini-grid' | 'funnel' | 'goal-bars' | 'summary';
type CardTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface CardRow {
  label: string;
  value?: string;
  subValue?: string;
  status?: string;
  percent?: number;
  tone?: CardTone;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  cardKind?: CardKind;
  headline?: string;
  metricName?: string;
  riskLevel?: string;
  value?: string;
  unit?: string;
  target?: string;
  gap?: string;
  status?: string;
  rows?: CardRow[];
  notes?: string[];
  displayBudget?: TemplateWidgetDisplayBudget;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const funnelChartRef = ref<HTMLDivElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;
let funnelChart: ECharts | null = null;

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const readFirstNumber = (value?: string) => {
  const match = String(value ?? '')
    .replace(/,/g, '')
    .match(/-?\d+(\.\d+)?/);

  return match ? Number.parseFloat(match[0]) : Number.NaN;
};

const defaultRowsByKind: Record<CardKind, CardRow[]> = {
  target: [
    { label: '实际', value: '92 万' },
    { label: '目标', value: '95 万' },
    { label: '差距', value: '-3 万', tone: 'warning' },
  ],
  compare: [
    { label: '同比', value: '+8.4%', tone: 'success' },
    { label: '环比', value: '+2.1%', tone: 'primary' },
    { label: '预算差', value: '-1.8%', tone: 'warning' },
  ],
  warning: [
    { label: '异常对象', value: '费用偏差' },
    { label: '触发原因', value: '超阈值' },
    { label: '处理状态', value: '复核中', tone: 'warning' },
  ],
  contribution: [
    { label: '线上渠道', value: '42%', percent: 42 },
    { label: '门店渠道', value: '31%', percent: 31 },
    { label: '经销渠道', value: '18%', percent: 18 },
  ],
  'mini-grid': [
    { label: '收入', value: '92 万', subValue: '+8.4%' },
    { label: '费用', value: '31 万', subValue: '-1.2%' },
    { label: '利润', value: '18 万', subValue: '+6.9%' },
  ],
  funnel: [
    { label: '线索', value: '1,280', percent: 100 },
    { label: '商机', value: '860', percent: 67 },
    { label: '成交', value: '420', percent: 33 },
  ],
  'goal-bars': [
    { label: '收入', value: '92%', percent: 92 },
    { label: '利润', value: '86%', percent: 86 },
    { label: '回款', value: '78%', percent: 78 },
  ],
  summary: [
    { label: '结论', value: '核心指标保持上行' },
    { label: '依据', value: '收入与利润同步改善' },
    { label: '关注', value: '费用偏差继续收敛' },
  ],
};

const cardKind = computed<CardKind>(() => props.cardKind ?? 'target');
const headline = computed(() => props.headline ?? '指标概览');
const valueText = computed(() => props.value ?? (cardKind.value === 'target' ? '96.8' : '92'));
const unitText = computed(() => props.unit ?? (cardKind.value === 'target' ? '%' : ''));
const targetText = computed(() => props.target ?? '95 万');
const gapText = computed(() => props.gap ?? '-3 万');
const statusText = computed(() => props.status ?? '中风险');
const maxVisibleRows = computed(() => {
  const configuredMax = Number(props.displayBudget?.maxVisibleItems ?? props.displayBudget?.visibleRowCount ?? 4);
  const kindMax = cardKind.value === 'mini-grid' ? 10 : 5;

  return clampNumber(Number.isFinite(configuredMax) ? Math.floor(configuredMax) : 4, 1, kindMax);
});
const rows = computed(() => (props.rows?.length ? props.rows : defaultRowsByKind[cardKind.value]).slice(0, maxVisibleRows.value));
const notes = computed(() => (props.notes?.length ? props.notes : ['当前状态稳定', '重点指标继续跟踪']).slice(0, 3));
const targetPercent = computed(() => clampNumber(Number.parseFloat(valueText.value), 0, 100));
const targetTone = computed(() => {
  const achievementRatio = targetPercent.value / 100;

  if (achievementRatio < 0.5) {
    return 'red';
  }

  if (achievementRatio < 0.75) {
    return 'yellow';
  }

  if (achievementRatio < 0.9) {
    return 'blue';
  }

  return 'green';
});
const targetRows = computed(() => {
  const nextRows = rows.value.length
    ? rows.value
    : [
        { label: '目标', value: targetText.value },
        { label: '当前', value: props.status ?? '48 天' },
        { label: '偏差', value: gapText.value },
      ];

  return nextRows.slice(0, 3);
});
const warningLimitRow = computed(() => rows.value[1] ?? { label: '预警上限', value: targetText.value });
const warningLimitText = computed(() => {
  const limitValue = warningLimitRow.value.value ?? targetText.value;

  return limitValue.startsWith('¥') ? limitValue : `¥${limitValue}`;
});
const warningAmountText = computed(() => {
  const rawValue = valueText.value.trim();
  const unit = unitText.value.trim();
  const valueWithUnit = unit && !rawValue.endsWith(unit) ? `${rawValue}${unit}` : rawValue;

  return valueWithUnit.startsWith('¥') ? valueWithUnit : `¥${valueWithUnit}`;
});
const warningProgress = computed(() => {
  const explicitProgress = readFirstNumber(statusText.value);

  if (Number.isFinite(explicitProgress)) {
    return clampNumber(explicitProgress, 0, 200);
  }

  const amount = readFirstNumber(valueText.value);
  const limit = readFirstNumber(warningLimitText.value);

  if (Number.isFinite(amount) && Number.isFinite(limit) && limit > 0) {
    return clampNumber((amount / limit) * 100, 0, 200);
  }

  return 163;
});
const warningProgressText = computed(() => `${Math.round(warningProgress.value)}%`);
const warningProgressState = computed(() => (warningProgress.value >= 100 ? '已超限' : '预警内'));
const warningRiskLabel = computed(() => {
  if (props.riskLevel?.trim()) {
    return props.riskLevel.trim();
  }

  if (warningProgress.value >= 150) {
    return '高风险';
  }

  if (warningProgress.value >= 100) {
    return '中风险';
  }

  return '低风险';
});
const warningRiskMain = computed(() => {
  const riskIndex = warningRiskLabel.value.indexOf('风险');

  return riskIndex > 0 ? warningRiskLabel.value.slice(0, riskIndex) : warningRiskLabel.value.slice(0, 1);
});
const warningRiskTone = computed(() => {
  if (warningRiskLabel.value.includes('高')) {
    return 'high';
  }

  if (warningRiskLabel.value.includes('中')) {
    return 'medium';
  }

  return 'low';
});
const warningMetricName = computed(() => props.metricName?.trim() || '逾期金额');
const warningExplanationRows = computed(() => {
  const configuredRows = rows.value.filter((item) => item.label !== '超限进度').slice(0, 3);

  if (configuredRows.length >= 2) {
    return configuredRows;
  }

  return [
    { label: '较上月', value: props.gap ?? '+63%', tone: 'danger' as const },
    { label: '预警上限', value: warningLimitText.value },
    { label: '触发规则', value: '超过上限', tone: 'danger' as const },
  ];
});
const warningProgressStyle = computed(() => ({
  width: `${clampNumber(warningProgress.value / 2, 0, 100)}%`,
}));
const warningOverrunStyle = computed(() => ({
  width: `${clampNumber(warningProgress.value / 2 - 50, 0, 50)}%`,
}));
const getMiniPriorityTone = (item: CardRow) => {
  if (item.tone) {
    return item.tone;
  }

  if (item.value?.includes('高')) {
    return 'danger';
  }

  if (item.value?.includes('中')) {
    return 'warning';
  }

  return 'success';
};
const getMiniStatusTone = (status = '') => {
  if (status.includes('完成')) {
    return 'success';
  }

  if (status.includes('进行')) {
    return 'primary';
  }

  return 'neutral';
};

const percentStyle = (percent = 0) => ({
  width: `${clampNumber(percent, 0, 100)}%`,
});

const positionStyle = (percent = 0) => ({
  left: `${clampNumber(percent, 0, 100)}%`,
});

const targetIconSize = computed(() => {
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 145;
  const size = Math.min(width * 0.058, height * 0.11);

  return Math.round(clampNumber(size, 12, 18));
});
const getTargetIcon = (index: number) => [Target, Clock3, AlertTriangle][index] ?? Target;
const getTargetMetricClass = (index: number) => ['metric-target', 'metric-current', 'metric-gap'][index] ?? 'metric-target';
const getSummaryIcon = (index: number) => [CircleUserRound, MessageSquareText, ThumbsUp][index] ?? CircleUserRound;
const getSummaryTone = (item: CardRow, index: number) => item.tone ?? (index === 2 ? 'warning' : 'primary');
const summaryIconSize = computed(() => {
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 145;
  const size = Math.min(width * 0.064, height * 0.12);

  return Math.round(clampNumber(size, 13, 20));
});
const funnelChartRows = computed(() =>
  rows.value.map((item, index) => {
    // Funnel contract: funnelStages use stageOrder/index from configured rows; entryValue/share use one cohort denominator.
    // Metric unit follows row.value, conversionRate/totalConversion use percent, dropRate/loss is previous stage minus current stage.
    // maxStages density fallback is controlled by displayBudget.maxVisibleItems; targetValue/targetRateLine can be added as markLine.
    const parsedValue = readFirstNumber(item.value);
    const rawPercent = Number.isFinite(item.percent)
      ? Number(item.percent)
      : Number.isFinite(parsedValue)
        ? parsedValue
        : 100 - index * 24;

    return {
      name: item.label,
      rawValue: item.value ?? `${Math.round(clampNumber(rawPercent, 0, 100))}%`,
      value: Math.round(clampNumber(rawPercent, 1, 100)),
      tone: item.tone ?? 'primary',
    };
  }),
);
const funnelChartScale = computed(() => {
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 145;
  const dense = Math.min(width / 260, height / 145);

  return {
    fontSize: Math.round(clampNumber(10.5 * dense, 9, 12) * 10) / 10,
    gap: Math.round(clampNumber(height * 0.025, 3, 7) * 10) / 10,
  };
});
const funnelOption = computed<EChartsOption>(() => {
  const scale = funnelChartScale.value;
  const palette = [
    ['#0057d9', 'rgba(47, 155, 255, 0.72)'],
    ['#2379e8', 'rgba(78, 176, 255, 0.64)'],
    ['#55a6ff', 'rgba(141, 207, 255, 0.58)'],
    ['#8cc7ff', 'rgba(188, 226, 255, 0.56)'],
    ['#b4dcff', 'rgba(219, 238, 255, 0.58)'],
  ];

  return {
    animation: true,
    animationDuration: 420,
    animationEasing: 'cubicOut',
    tooltip: {
      trigger: 'item',
      confine: true,
      appendToBody: true,
      formatter: (params: unknown) => {
        const item = params as { name?: string; value?: number };
        const row = funnelChartRows.value.find((nextRow) => nextRow.name === item.name);

        return [`${item.name ?? ''}`, `数值：${row?.rawValue ?? ''}`, `转化：${item.value ?? row?.value ?? 0}%`]
          .filter(Boolean)
          .join('<br/>');
      },
    },
    series: [
      {
        type: 'funnel',
        left: '4%',
        top: '5%',
        bottom: '5%',
        width: '92%',
        min: 0,
        max: 100,
        minSize: '42%',
        maxSize: '96%',
        sort: 'none',
        gap: scale.gap,
        label: {
          show: true,
          position: 'inside',
          color: '#ffffff',
          fontSize: scale.fontSize,
          fontWeight: 800,
          lineHeight: Math.round(scale.fontSize * 1.3),
          formatter: (params: unknown) => {
            const item = params as { name?: string };
            const row = funnelChartRows.value.find((nextRow) => nextRow.name === item.name);

            return `${item.name ?? ''}  ${row?.rawValue ?? ''}`;
          },
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          borderColor: 'rgba(255, 255, 255, 0.7)',
          borderWidth: 1,
          borderRadius: 3,
        },
        emphasis: {
          focus: 'self',
          label: {
            fontWeight: 900,
          },
        },
        data: funnelChartRows.value.map((row, index) => {
          const colors = palette[index % palette.length];

          return {
            name: row.name,
            value: row.value,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: colors[0] },
                { offset: 1, color: colors[1] },
              ]),
            },
          };
        }),
      },
    ],
  };
});

const layoutStyle = computed(() => {
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 145;
  const dense = Math.min(width / 260, height / 145);
  const fontSize = Math.round(clampNumber(10.5 * dense, 8.5, 12) * 10) / 10;
  const valueSize = Math.round(clampNumber(Math.min(width / 7.2, height / 3.8), 20, 35) * 10) / 10;
  const rowGap = Math.round(clampNumber(height * 0.03, 3, 5) * 10) / 10;

  return {
    '--u-card-font-size': `${fontSize}px`,
    '--u-card-small-size': `${Math.max(8, fontSize - 1)}px`,
    '--u-card-value-size': `${valueSize}px`,
    '--u-card-row-gap': `${rowGap}px`,
    '--u-card-pad-x': `${Math.round(clampNumber(width * 0.026, 6, 10) * 10) / 10}px`,
  };
});

const miniTableStyle = computed(() => {
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 145;
  const rowCount = Math.max(rows.value.length, 1);
  const headerHeight = Math.round(clampNumber(height * 0.18, 17, 28) * 10) / 10;
  const rowHeight = Math.max((height - headerHeight - rowCount) / rowCount, 1);
  const rowFontSize = Math.round(clampNumber(Math.min(rowHeight * 0.43, width / 23), 8.2, 12.5) * 10) / 10;
  const headerFontSize = Math.round(clampNumber(rowFontSize + 0.5, 8.8, 13) * 10) / 10;
  const pillHeight = Math.round(clampNumber(rowHeight * 0.58, 13, 22) * 10) / 10;
  const pillFontSize = Math.round(clampNumber(rowFontSize * 0.92, 8, 12) * 10) / 10;
  const dotSize = Math.round(clampNumber(Math.min(rowHeight * 0.22, width * 0.022), 4, 7) * 10) / 10;
  const cellPadX = Math.round(clampNumber(width * 0.018, 3, 10) * 10) / 10;
  const statusGap = Math.round(clampNumber(width * 0.012, 3, 7) * 10) / 10;
  const priorityWidth = Math.round(clampNumber(width * 0.105, 22, 38) * 10) / 10;
  const columns =
    width < 230
      ? 'minmax(0, 1.38fr) minmax(30px, 0.66fr) minmax(34px, 0.76fr) minmax(44px, 0.9fr)'
      : width < 300
        ? 'minmax(0, 1.32fr) minmax(36px, 0.72fr) minmax(42px, 0.82fr) minmax(54px, 0.98fr)'
        : 'minmax(0, 1.35fr) minmax(46px, 0.78fr) minmax(52px, 0.84fr) minmax(62px, 1fr)';

  return {
    gridTemplateRows: `${headerHeight}px repeat(${rowCount}, minmax(0, 1fr))`,
    '--mini-cols': columns,
    '--mini-cell-pad-x': `${cellPadX}px`,
    '--mini-head-font-size': `${headerFontSize}px`,
    '--mini-row-font-size': `${rowFontSize}px`,
    '--mini-pill-height': `${pillHeight}px`,
    '--mini-pill-font-size': `${pillFontSize}px`,
    '--mini-pill-min-width': `${priorityWidth}px`,
    '--mini-dot-size': `${dotSize}px`,
    '--mini-status-gap': `${statusGap}px`,
  };
});

const disposeFunnelChart = () => {
  funnelChart?.dispose();
  funnelChart = null;
};

const hasFunnelRenderableSize = () => {
  if (!funnelChartRef.value) {
    return false;
  }

  const rect = funnelChartRef.value.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
};

const renderFunnelChart = () => {
  if (cardKind.value !== 'funnel' || !funnelChartRows.value.length) {
    disposeFunnelChart();
    return;
  }

  if (!funnelChartRef.value) {
    return;
  }

  if (!hasFunnelRenderableSize()) {
    return;
  }

  if (!funnelChart) {
    funnelChart = echarts.init(funnelChartRef.value);
  }

  funnelChart.setOption(funnelOption.value, true);
  funnelChart.resize();
};

const scheduleFunnelRender = async () => {
  await nextTick();
  renderFunnelChart();
};

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

    if (hasFunnelRenderableSize()) {
      funnelChart?.resize();
      void scheduleFunnelRender();
    }
  };

  resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(rootRef.value);
  updateSize();
  void scheduleFunnelRender();
});

watch([cardKind, rows, funnelOption], () => {
  void scheduleFunnelRender();
}, { deep: true, flush: 'post' });

watch(containerSize, () => {
  void scheduleFunnelRender();
}, { deep: true, flush: 'post' });

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  disposeFunnelChart();
});
</script>

<template>
  <section ref="rootRef" class="universal-card-widget" :class="`kind-${cardKind}`" :style="layoutStyle">
    <div v-if="cardKind === 'target'" class="target-view" :class="`target-tone-${targetTone}`">
      <div class="target-main">
        <div class="target-big-value">
          <strong>{{ valueText }}</strong>
          <span v-if="unitText">{{ unitText }}</span>
        </div>
        <div class="target-metrics">
          <div
            v-for="(item, index) in targetRows"
            :key="item.label"
            class="target-metric"
            :class="getTargetMetricClass(index)"
          >
            <span class="target-metric-icon">
              <component :is="getTargetIcon(index)" :size="targetIconSize" :stroke-width="2.8" />
            </span>
            <span class="target-metric-label">{{ item.label }}:</span>
            <strong>{{ item.value }}</strong>
          </div>
        </div>
      </div>
      <div class="target-progress">
        <div class="target-progress-head">
          <span>达成进度</span>
          <b>100%</b>
        </div>
        <div class="target-progress-track">
          <i :style="percentStyle(targetPercent)"></i>
          <span class="target-goal-line"></span>
        </div>
        <div class="target-progress-foot">
          <strong class="target-rate" :style="positionStyle(targetPercent)">{{ valueText }}{{ unitText }}</strong>
          <span>目标</span>
        </div>
      </div>
    </div>

    <div v-else-if="cardKind === 'compare'" class="compare-view">
      <div class="value-line">
        <strong>{{ valueText }}</strong>
        <span v-if="unitText">{{ unitText }}</span>
      </div>
      <div class="compare-grid">
        <span v-for="item in rows" :key="item.label" :class="`tone-${item.tone ?? 'primary'}`">
          <em>{{ item.label }}</em>
          <b>{{ item.value }}</b>
        </span>
      </div>
    </div>

    <div v-else-if="cardKind === 'warning'" class="warning-view">
      <div class="warning-main">
        <div class="warning-risk" :class="`warning-risk-${warningRiskTone}`">
          <strong>{{ warningRiskMain }}</strong>
        </div>
        <div class="warning-metric-value">
          <span>{{ warningMetricName }}</span>
          <strong>{{ warningAmountText }}</strong>
        </div>
      </div>
      <div class="warning-explain-list" :style="{ '--warning-explain-count': String(warningExplanationRows.length) }">
        <div
          v-for="item in warningExplanationRows"
          :key="item.label"
          class="warning-explain-item"
          :class="`tone-${item.tone ?? 'primary'}`"
        >
          <p>
            <em>{{ item.label }}</em>
            <strong>{{ item.value }}</strong>
          </p>
        </div>
      </div>
      <div class="warning-progress">
        <div class="warning-progress-head">
          <span>超限进度</span>
          <strong>{{ warningProgressText }}<small>（{{ warningProgressState }}）</small></strong>
        </div>
        <div class="warning-progress-body">
          <span class="warning-limit-note">100%（预警上限 {{ warningLimitText }}）</span>
          <div class="warning-track">
            <i :style="warningProgressStyle"></i>
            <b :style="warningOverrunStyle"></b>
            <span class="warning-limit-line"></span>
          </div>
          <div class="warning-axis">
            <span>0</span>
            <span>100%</span>
            <span>200%</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="cardKind === 'contribution'" class="bar-list">
      <div v-for="item in rows" :key="item.label" class="bar-row">
        <div class="row-head">
          <span>{{ item.label }}</span>
          <b>{{ item.value }}</b>
        </div>
        <div class="bar-track">
          <i :style="percentStyle(item.percent)"></i>
        </div>
      </div>
    </div>

    <div v-else-if="cardKind === 'mini-grid'" class="mini-grid-view">
      <div class="mini-table" :style="miniTableStyle">
        <div class="mini-table-head" role="row">
          <span class="mini-table-cell">任务</span>
          <span class="mini-table-cell">优先级</span>
          <span class="mini-table-cell">完成率</span>
          <span class="mini-table-cell">状态</span>
        </div>
        <div v-for="item in rows" :key="item.label" class="mini-table-row" role="row">
          <span class="mini-table-cell mini-task-cell">{{ item.label }}</span>
          <span class="mini-table-cell mini-priority-cell">
            <i class="mini-priority-pill" :class="`priority-${getMiniPriorityTone(item)}`">{{ item.value }}</i>
          </span>
          <span class="mini-table-cell mini-rate-cell">{{ item.subValue }}</span>
          <span class="mini-table-cell mini-status-cell">
            <i class="mini-status" :class="`status-${getMiniStatusTone(item.status)}`">
              <b></b>
              <span>{{ item.status }}</span>
            </i>
          </span>
        </div>
      </div>
    </div>

    <div v-else-if="cardKind === 'funnel'" class="funnel-view">
      <div v-if="funnelChartRows.length" ref="funnelChartRef" class="funnel-chart" />
      <div v-else class="funnel-empty">暂无数据</div>
    </div>

    <div v-else-if="cardKind === 'goal-bars'" class="goal-bars-view">
      <div v-for="item in rows" :key="item.label" class="goal-row">
        <div class="row-head">
          <span>{{ item.label }}</span>
          <b>{{ item.value }}</b>
        </div>
        <div class="bar-track slim">
          <i :style="percentStyle(item.percent)"></i>
        </div>
      </div>
    </div>

    <div v-else class="summary-view">
      <section class="summary-core">
        <span class="summary-eyebrow">核心结论</span>
        <div class="summary-score-line">
          <strong class="summary-metric-name">{{ headline }}</strong>
          <b class="summary-score-value">{{ valueText }}</b>
          <em v-if="unitText" class="summary-score-unit">{{ unitText }}</em>
        </div>
      </section>
      <section class="summary-detail-list" aria-label="具体内容">
        <div
          v-for="(item, index) in rows"
          :key="item.label"
          class="summary-detail-row"
          :class="`summary-tone-${getSummaryTone(item, index)}`"
        >
          <span class="summary-detail-icon">
            <component :is="getSummaryIcon(index)" :size="summaryIconSize" :stroke-width="2.4" />
          </span>
          <p>
            <span>{{ item.label }}</span>
            <strong v-if="item.value">{{ item.value }}</strong>
            <em v-if="item.subValue">{{ item.subValue }}</em>
          </p>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.universal-card-widget {
  --u-blue: #0057d9;
  --u-blue-dark: #004ac6;
  --u-blue-soft: rgba(0, 87, 217, 0.1);
  container-type: size;
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--u-card-text, #15304f);
  font-size: var(--u-card-font-size, 11px);
  font-variant-numeric: tabular-nums;
}

.target-view,
.compare-view,
.warning-view,
.bar-list,
.mini-grid-view,
.funnel-view,
.goal-bars-view,
.summary-view {
  display: grid;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  gap: var(--u-card-row-gap, 4px);
}

.target-view {
  --target-main: #ee2f27;
  --target-main-soft: rgba(238, 47, 39, 0.13);
  --target-main-track: rgba(238, 47, 39, 0.08);
  --target-main-border: rgba(238, 47, 39, 0.32);
  --target-bar-start: #ff3c2f;
  --target-bar-end: #ef2f26;
  grid-template-rows: minmax(0, 2fr) minmax(0, 1fr);
  align-content: stretch;
  gap: clamp(4px, 3.2cqh, 8px);
}

.target-tone-yellow {
  --target-main: #f59e0b;
  --target-main-soft: rgba(245, 158, 11, 0.15);
  --target-main-track: rgba(245, 158, 11, 0.09);
  --target-main-border: rgba(245, 158, 11, 0.34);
  --target-bar-start: #ffbf3d;
  --target-bar-end: #f59e0b;
}

.target-tone-blue {
  --target-main: #0057d9;
  --target-main-soft: rgba(0, 87, 217, 0.13);
  --target-main-track: rgba(0, 87, 217, 0.08);
  --target-main-border: rgba(0, 87, 217, 0.32);
  --target-bar-start: #2f9bff;
  --target-bar-end: #0057d9;
}

.target-tone-green {
  --target-main: #0f8f5f;
  --target-main-soft: rgba(15, 143, 95, 0.14);
  --target-main-track: rgba(15, 143, 95, 0.08);
  --target-main-border: rgba(15, 143, 95, 0.32);
  --target-bar-start: #25c48d;
  --target-bar-end: #0f8f5f;
}

.target-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(7px, 5cqw, 14px);
  min-width: 0;
  min-height: 0;
}

.target-big-value {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 100%;
  color: var(--target-main);
  line-height: 0.9;
  text-align: center;
}

.target-big-value strong {
  overflow: hidden;
  font-size: clamp(46px, 44cqh, 84px);
  font-weight: 900;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.target-big-value span {
  color: var(--target-main);
  font-size: clamp(20px, 18cqh, 36px);
  font-weight: 900;
}

.target-metrics {
  display: grid;
  align-content: center;
  gap: clamp(3px, 2.4cqh, 7px);
  min-width: 0;
  min-height: 0;
}

.target-metric {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(4px, 2cqw, 7px);
  min-width: 0;
  min-height: 0;
  padding-bottom: clamp(2px, 1.7cqh, 5px);
  border-bottom: 1px solid color-mix(in srgb, var(--target-main) 12%, transparent);
}

.target-metric-icon {
  display: inline-grid;
  width: clamp(20px, 11cqh, 29px);
  height: clamp(20px, 11cqh, 29px);
  place-items: center;
  border-radius: 999px;
}

.target-metric-label {
  overflow: hidden;
  color: var(--u-card-muted-strong, #3f4753);
  font-size: clamp(11px, 6.2cqh, 17px);
  font-weight: 850;
  white-space: nowrap;
}

.target-metric strong {
  overflow: hidden;
  font-size: clamp(13px, 7.5cqh, 22px);
  font-weight: 900;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metric-target .target-metric-icon {
  color: var(--target-main);
  background: var(--target-main-soft);
}

.metric-current .target-metric-icon,
.metric-gap .target-metric-icon {
  color: var(--target-main);
  background: var(--target-main-soft);
}

.metric-target strong,
.metric-current strong,
.metric-gap strong {
  color: var(--target-main);
}

.target-progress {
  display: grid;
  align-content: center;
  gap: clamp(2px, 1.8cqh, 5px);
  min-width: 0;
  min-height: 0;
}

.target-progress-head,
.target-progress-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
}

.target-progress-head span {
  color: var(--u-card-muted-strong, #3f4753);
  font-size: clamp(10px, 4.8cqh, 14px);
  font-weight: 850;
}

.target-progress-head b,
.target-progress-foot span {
  color: var(--u-card-muted, #7f7f7f);
  font-size: clamp(9px, 4.4cqh, 13px);
  font-weight: 800;
}

.target-progress-track {
  position: relative;
  height: clamp(17px, 8.6cqh, 29px);
  padding: 3px;
  overflow: visible;
  border: 1px solid var(--target-main-border);
  border-radius: 6px;
  background: var(--target-main-track);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.74);
}

.target-progress-track i {
  display: block;
  width: 0;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--target-bar-start), var(--target-bar-end));
  box-shadow: 0 3px 8px color-mix(in srgb, var(--target-main) 22%, transparent);
}

.target-goal-line {
  position: absolute;
  top: -9px;
  right: 5%;
  bottom: -18px;
  border-left: 1px dashed rgba(85, 85, 85, 0.48);
}

.target-progress-foot {
  position: relative;
  height: clamp(12px, 5.2cqh, 18px);
}

.target-rate {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  color: var(--target-main);
  font-size: clamp(10px, 5cqh, 14px);
  font-weight: 900;
  white-space: nowrap;
}

.target-progress-foot span {
  margin-left: auto;
  padding-right: 3%;
}

.compare-view {
  grid-template-rows: auto auto minmax(0, 1fr);
  align-content: center;
}

.value-line {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 3px;
  min-width: 0;
  color: var(--u-blue);
  line-height: 1;
}

.value-line strong {
  overflow: hidden;
  font-size: var(--u-card-value-size, 28px);
  font-weight: 850;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.value-line span {
  color: rgba(0, 74, 198, 0.74);
  font-size: var(--u-card-font-size, 11px);
  font-weight: 750;
}

.bar-track {
  position: relative;
  height: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 74, 198, 0.1);
  border-radius: 999px;
  background: rgba(0, 87, 217, 0.075);
}

.bar-track.slim {
  height: 6px;
}

.bar-track i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #004ac6, #2f9bff);
  box-shadow: 0 0 10px rgba(0, 87, 217, 0.2);
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 3px;
  min-height: 0;
}

.meta-grid span,
.compare-grid span,
.line-list span,
.mini-grid-row {
  display: grid;
  align-items: center;
  min-width: 0;
  min-height: 0;
  padding: 0 var(--u-card-pad-x, 8px);
  border: 1px solid var(--u-row-border, rgba(0, 74, 198, 0.12));
  border-radius: 5px;
  background: var(--u-row-background, rgba(0, 87, 217, 0.036));
}

.meta-grid span {
  justify-items: center;
  padding-top: 4px;
  padding-bottom: 4px;
}

em {
  overflow: hidden;
  color: var(--u-card-muted, #5f718a);
  font-size: var(--u-card-small-size, 10px);
  font-style: normal;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

b,
strong {
  letter-spacing: 0;
}

.meta-grid b,
.compare-grid b,
.line-list b,
.row-head b,
.mini-grid-row strong,
.mini-grid-row b,
.goal-row b {
  overflow: hidden;
  color: var(--u-blue);
  font-size: var(--u-card-font-size, 11px);
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.compare-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;
  min-height: 0;
}

.compare-grid span {
  justify-items: center;
  padding-top: 6px;
  padding-bottom: 6px;
}

.warning-view {
  --warning-red: var(--warning-accent, #d94b38);
  --warning-red-dark: var(--warning-accent-strong, #c83a2d);
  --warning-red-soft: var(--warning-accent-soft, rgba(217, 75, 56, 0.12));
  --warning-yellow: #f59e0b;
  --warning-green: #16a66a;
  --warning-risk-background: linear-gradient(180deg, rgba(0, 87, 217, 0.06), rgba(0, 87, 217, 0.025));
  --warning-risk-border: rgba(0, 74, 198, 0.13);
  --warning-track-background: rgba(217, 75, 56, 0.08);
  --warning-track-border: rgba(217, 75, 56, 0.22);
  --warning-track-fill-start: var(--warning-red-dark);
  --warning-track-fill-end: #ff835f;
  --warning-title-color: var(--u-card-muted-strong, #334762);
  --warning-label-color: var(--u-card-muted, #52667e);
  --warning-limit-color: var(--u-card-muted-strong, #253446);
  --warning-axis-color: var(--u-card-muted, #8b96a6);
  --warning-limit-line-color: rgba(36, 57, 79, 0.45);
  --warning-limit-marker-color: rgba(36, 57, 79, 0.8);
  grid-template-rows: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(3px, 2.2cqh, 7px);
}

.warning-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  align-items: center;
  gap: clamp(5px, 3cqw, 12px);
  min-width: 0;
  min-height: 0;
}

.warning-risk {
  --warning-risk-main-size: clamp(26px, 26cqh, 52px);
  display: grid;
  align-content: center;
  justify-items: center;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--warning-risk-border);
  border-radius: 6px;
  background: var(--warning-risk-background);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.warning-risk-high {
  color: var(--warning-red);
  border-color: var(--warning-risk-high-border, rgba(217, 75, 56, 0.22));
  background: var(--warning-risk-high-background, linear-gradient(180deg, rgba(0, 87, 217, 0.065), rgba(217, 75, 56, 0.07)));
}

.warning-risk-medium {
  color: var(--warning-yellow);
  border-color: rgba(245, 158, 11, 0.22);
  background: linear-gradient(180deg, rgba(0, 87, 217, 0.055), rgba(245, 158, 11, 0.07));
}

.warning-risk-low {
  color: var(--warning-green);
  border-color: rgba(22, 166, 106, 0.2);
  background: linear-gradient(180deg, rgba(0, 87, 217, 0.055), rgba(22, 166, 106, 0.065));
}

.warning-risk strong {
  display: block;
  overflow: hidden;
  width: var(--warning-risk-main-size);
  max-width: 100%;
  font-size: var(--warning-risk-main-size);
  font-weight: 950;
  line-height: 0.9;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warning-metric-value {
  display: grid;
  align-content: center;
  min-width: 0;
  min-height: 0;
  height: 100%;
  padding: clamp(5px, 3cqh, 11px) clamp(8px, 3.6cqw, 16px);
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.warning-metric-value span {
  justify-self: start;
  overflow: hidden;
  color: var(--warning-title-color);
  font-size: clamp(10px, 5.4cqh, 15px);
  font-weight: 850;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warning-metric-value strong {
  justify-self: center;
  overflow: hidden;
  max-width: 100%;
  color: var(--warning-red);
  font-size: clamp(25px, 25cqh, 50px);
  font-weight: 950;
  line-height: 1;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warning-explain-list {
  display: grid;
  grid-template-columns: repeat(var(--warning-explain-count, 3), minmax(0, 1fr));
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.warning-explain-item {
  display: grid;
  align-items: center;
  min-width: 0;
  min-height: 0;
  padding: clamp(3px, 1.8cqh, 7px) clamp(5px, 2.6cqw, 11px);
}

.warning-explain-item + .warning-explain-item {
  border-left: 0;
}

.warning-explain-item p {
  display: grid;
  justify-items: center;
  gap: 2px;
  min-width: 0;
  margin: 0;
}

.warning-explain-item em {
  max-width: 100%;
  color: var(--warning-label-color);
  font-size: clamp(8px, 4.2cqh, 11px);
  font-weight: 760;
}

.warning-explain-item strong {
  overflow: hidden;
  max-width: 100%;
  color: var(--u-blue);
  font-size: clamp(11px, 6.2cqh, 18px);
  font-weight: 900;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warning-explain-item.tone-danger strong,
.warning-explain-item.tone-warning strong {
  color: var(--warning-red);
}

.warning-progress {
  display: grid;
  align-content: center;
  gap: clamp(2px, 1.7cqh, 5px);
  min-width: 0;
  min-height: 0;
}

.warning-progress-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
  min-width: 0;
}

.warning-progress-head span {
  color: var(--warning-title-color);
  font-size: clamp(9px, 4.6cqh, 12px);
  font-weight: 850;
  white-space: nowrap;
}

.warning-progress-head strong {
  display: flex;
  align-items: baseline;
  gap: 1px;
  color: var(--warning-red);
  font-size: clamp(10px, 5.3cqh, 15px);
  font-weight: 900;
  line-height: 1;
  white-space: nowrap;
}

.warning-progress-head small {
  color: var(--warning-red);
  font-size: 0.62em;
  font-weight: 850;
}

.warning-progress-body {
  position: relative;
  display: grid;
  gap: clamp(1px, 1cqh, 3px);
  min-width: 0;
  min-height: 0;
  padding-top: clamp(6px, 4.4cqh, 12px);
}

.warning-limit-note {
  position: absolute;
  top: 0;
  left: 50%;
  color: var(--warning-limit-color);
  font-size: clamp(7px, 3.2cqh, 9px);
  font-weight: 800;
  line-height: 1;
  transform: translateX(-50%);
  white-space: nowrap;
}

.warning-track {
  position: relative;
  height: clamp(9px, 6.2cqh, 15px);
  overflow: hidden;
  border: 1px solid var(--warning-track-border);
  border-radius: 999px;
  background: var(--warning-track-background);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.warning-track i {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--warning-track-fill-start), var(--warning-track-fill-end));
  box-shadow: 0 0 10px color-mix(in srgb, var(--warning-red) 18%, transparent);
}

.warning-track b {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  display: block;
  overflow: hidden;
  border-radius: 0 999px 999px 0;
  background: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.22) 0 4px,
    rgba(255, 255, 255, 0.035) 4px 8px
  );
}

.warning-limit-line {
  position: absolute;
  top: -7px;
  bottom: -7px;
  left: 50%;
  border-left: 1px dashed var(--warning-limit-line-color);
}

.warning-limit-line::before {
  position: absolute;
  top: -1px;
  left: -4px;
  width: 0;
  height: 0;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 6px solid var(--warning-limit-marker-color);
  content: '';
}

.warning-axis {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  color: var(--warning-axis-color);
  font-size: clamp(7px, 3.2cqh, 9px);
  font-weight: 750;
  line-height: 1;
}

.warning-axis span:nth-child(2) {
  text-align: center;
}

.warning-axis span:last-child {
  text-align: right;
}

@container (max-height: 110px) {
  .warning-view {
    gap: 3px;
  }

  .warning-risk {
    --warning-risk-main-size: clamp(22px, 25cqh, 40px);
  }

  .warning-limit-note {
    display: none;
  }

  .warning-progress-body {
    padding-top: 0;
  }
}

.bar-list,
.goal-bars-view {
  align-content: center;
}

.bar-row,
.goal-row {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.row-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  color: var(--u-card-text, #15304f);
  font-size: var(--u-card-font-size, 11px);
  font-weight: 700;
}

.row-head span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-grid-view {
  display: block;
  min-width: 0;
  min-height: 0;
}

.mini-table {
  display: grid;
  grid-template-rows: minmax(18px, 0.9fr) repeat(4, minmax(0, 1fr));
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid var(--mini-table-border, rgba(0, 74, 198, 0.12));
  border-radius: 6px;
  background: var(--mini-table-background, rgba(255, 255, 255, 0.68));
}

.mini-table-head,
.mini-table-row {
  display: grid;
  grid-template-columns: var(
    --mini-cols,
    minmax(0, 1.35fr) minmax(46px, 0.78fr) minmax(52px, 0.84fr) minmax(62px, 1fr)
  );
  min-width: 0;
  min-height: 0;
}

.mini-table-head {
  color: var(--mini-table-head-color, #24344a);
  background: var(--mini-table-head-background, rgba(232, 241, 254, 0.86));
  font-size: var(--mini-head-font-size, clamp(10px, 5.4cqh, 13px));
  font-weight: 850;
}

.mini-table-row {
  border-top: 1px solid var(--mini-table-row-border, rgba(0, 74, 198, 0.08));
  color: var(--mini-table-row-color, #24344a);
  font-size: var(--mini-row-font-size, clamp(10px, 5cqh, 13px));
  font-weight: 700;
  background: var(--mini-table-row-background, rgba(255, 255, 255, 0.54));
}

.mini-table-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  padding: 0 var(--mini-cell-pad-x, clamp(5px, 2.2cqw, 10px));
  overflow: hidden;
  border-right: 1px solid var(--mini-table-cell-border, rgba(0, 74, 198, 0.075));
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-table-cell:last-child {
  border-right: 0;
}

.mini-task-cell {
  justify-content: flex-start;
  color: var(--mini-table-task-color, #1d324b);
  font-weight: 800;
}

.mini-priority-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--mini-pill-min-width, clamp(23px, 11cqw, 35px));
  height: var(--mini-pill-height, clamp(16px, 7.2cqh, 22px));
  padding: 0 calc(var(--mini-cell-pad-x, 5px) * 0.72);
  border-radius: 999px;
  font-size: var(--mini-pill-font-size, clamp(9px, 4.4cqh, 12px));
  font-style: normal;
  font-weight: 850;
  line-height: 1;
}

.priority-danger {
  color: #ef2f3c;
  background: rgba(255, 74, 87, 0.12);
}

.priority-warning {
  color: #ff8a00;
  background: rgba(255, 159, 38, 0.16);
}

.priority-success {
  color: #12a75a;
  background: rgba(24, 190, 108, 0.12);
}

.mini-rate-cell {
  color: #006eff;
  font-weight: 900;
}

.mini-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--mini-status-gap, clamp(4px, 1.4cqw, 7px));
  min-width: 0;
  overflow: hidden;
  color: #5f718a;
  font-size: var(--mini-pill-font-size, clamp(9px, 4.4cqh, 12px));
  font-style: normal;
  font-weight: 740;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-status b {
  flex: none;
  width: var(--mini-dot-size, clamp(5px, 2.4cqw, 7px));
  height: var(--mini-dot-size, clamp(5px, 2.4cqw, 7px));
  border-radius: 999px;
  background: #9aaabe;
}

.mini-status span {
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-success b {
  background: #18c56d;
}

.status-primary b {
  background: #006eff;
}

.status-neutral b {
  background: #9aaabe;
}

@container (max-width: 230px) {
  .mini-table-cell {
    padding-right: 3px;
    padding-left: 3px;
  }

  .mini-status {
    gap: 3px;
  }
}

.funnel-view {
  display: grid;
  place-items: stretch;
}

.funnel-chart {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.funnel-empty {
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 0;
  color: #5f718a;
  font-size: var(--u-card-font-size, 11px);
  font-weight: 700;
}

.summary-view {
  position: relative;
  isolation: isolate;
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0;
  padding: clamp(8px, 4.2cqh, 14px) clamp(10px, 4.4cqw, 18px);
  overflow: hidden;
  border: 0;
  border-radius: 6px;
  background: transparent;
}

.summary-core {
  display: grid;
  align-content: center;
  min-width: 0;
  min-height: 0;
  padding-bottom: clamp(5px, 2.6cqh, 10px);
  border-bottom: 1px solid var(--summary-divider-color, rgba(0, 74, 198, 0.08));
}

.summary-eyebrow {
  overflow: hidden;
  color: var(--summary-accent-color, #6a72ff);
  font-size: clamp(10px, 5.6cqh, 14px);
  font-weight: 850;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary-score-line {
  display: flex;
  align-items: baseline;
  gap: clamp(3px, 1.3cqw, 8px);
  min-width: 0;
  margin-top: clamp(4px, 2.6cqh, 8px);
  line-height: 0.96;
}

.summary-metric-name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--summary-accent-color, #6a72ff);
  font-size: clamp(19px, min(12cqh, 8.8cqw), 32px);
  font-weight: 950;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.summary-score-value {
  flex: 0 0 auto;
  min-width: 0;
  overflow: hidden;
  background: var(--summary-score-gradient, linear-gradient(110deg, #7b6cff 4%, #9c72f6 45%, #ff9a62 96%));
  background-clip: text;
  color: transparent;
  font-size: clamp(36px, min(28cqh, 15cqw), 60px);
  font-weight: 950;
  letter-spacing: 0;
  text-overflow: ellipsis;
  -webkit-background-clip: text;
}

.summary-score-unit {
  flex: 0 0 auto;
  color: var(--summary-unit-color, #ff9856);
  font-size: clamp(13px, min(10cqh, 7cqw), 22px);
  font-style: normal;
  font-weight: 850;
  white-space: nowrap;
}

.summary-detail-list {
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  min-width: 0;
  min-height: 0;
}

.summary-detail-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(7px, 2.8cqw, 12px);
  min-width: 0;
  min-height: 0;
  border-bottom: 1px solid var(--summary-row-border, rgba(0, 74, 198, 0.065));
}

.summary-detail-row:last-child {
  border-bottom: 0;
}

.summary-detail-icon {
  display: inline-grid;
  width: clamp(24px, 12cqh, 34px);
  height: clamp(24px, 12cqh, 34px);
  place-items: center;
  border-radius: 999px;
  color: #ffffff;
  background: linear-gradient(135deg, #9b8dff, #65a9ff);
  box-shadow: 0 4px 10px rgba(0, 87, 217, 0.14);
}

.summary-tone-warning .summary-detail-icon {
  background: linear-gradient(135deg, #ffb367, #ff8a37);
  box-shadow: 0 4px 10px rgba(255, 138, 55, 0.18);
}

.summary-detail-row p {
  display: flex;
  align-items: baseline;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--summary-row-text, #26364f);
  font-size: clamp(11px, 5.2cqh, 14px);
  font-weight: 760;
  line-height: 1.1;
  white-space: nowrap;
}

.summary-detail-row p span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-detail-row p strong,
.summary-detail-row p em {
  flex: 0 0 auto;
  margin-left: 4px;
  color: #4f8fff;
  font-size: clamp(13px, 6.4cqh, 18px);
  font-style: normal;
  font-weight: 950;
}

.summary-tone-warning p strong,
.summary-tone-warning p em {
  color: #ff8a37;
}

.tone-success {
  color: #0f8f5f !important;
}

.tone-warning {
  color: #b76b00 !important;
}

.tone-danger {
  color: #ba1a1a !important;
}

.tone-neutral {
  color: #52677a !important;
}
</style>
