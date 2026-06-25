<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { TemplateWidgetDisplayBudget, WidgetContext } from '../types';

interface RankingCardItem {
  rank?: number;
  label: string;
  value: number | string;
  suffix?: string;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  items?: RankingCardItem[];
  valueUnit?: string;
  displayBudget?: TemplateWidgetDisplayBudget;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;

const defaultItems: RankingCardItem[] = [
  { rank: 1, label: '华东大区', value: 32680000 },
  { rank: 2, label: '线上渠道', value: 28460000 },
  { rank: 3, label: '华南大区', value: 21930000 },
  { rank: 4, label: '海外市场', value: 18750000 },
  { rank: 5, label: '华北大区', value: 15320000 },
];

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const getWeightedTextLength = (value = '') =>
  Array.from(value.trim()).reduce((total, char) => total + (/[\u4e00-\u9fff]/.test(char) ? 1 : 0.58), 0);

const parseNumber = (value: number | string) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  const numericText = value.replace(/,/g, '').trim();
  const numericValue = Number(numericText);

  return Number.isFinite(numericValue) ? numericValue : undefined;
};

const formatValue = (value: number | string) => {
  const numericValue = parseNumber(value);

  if (numericValue === undefined) {
    return String(value);
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
  }).format(numericValue);
};

const maxVisibleRows = computed(() => {
  const configuredMax = Number(props.displayBudget?.maxVisibleItems ?? props.displayBudget?.visibleRowCount ?? 5);

  return clampNumber(Number.isFinite(configuredMax) ? Math.floor(configuredMax) : 5, 1, 6);
});

const sourceRows = computed(() => (props.items?.length ? props.items : defaultItems).slice(0, maxVisibleRows.value));

const maxNumericValue = computed(() =>
  Math.max(...sourceRows.value.map((item) => parseNumber(item.value) ?? 0), 1),
);

const rows = computed(() =>
  sourceRows.value.map((item, index) => {
    const numericValue = parseNumber(item.value);
    const sharePercent =
      numericValue === undefined ? 0 : Math.round(clampNumber((numericValue / maxNumericValue.value) * 100, 8, 100));

    return {
      ...item,
      rank: item.rank ?? index + 1,
      rankClass: `rank-${item.rank ?? index + 1}`,
      valueText: formatValue(item.value),
      suffixText: item.suffix ?? props.valueUnit ?? '',
      sharePercent,
    };
  }),
);

const layoutStyle = computed(() => {
  const rowCount = Math.max(rows.value.length, 1);
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 146;
  const rowGap = Math.round(clampNumber(height * 0.022, 2.4, 3.8) * 10) / 10;
  const rowHeight = Math.max((height - rowGap * (rowCount - 1)) / rowCount, 1);
  const longestLabel = Math.max(...rows.value.map((item) => getWeightedTextLength(item.label)), 1);
  const longestValue = Math.max(...rows.value.map((item) => getWeightedTextLength(item.valueText + item.suffixText)), 1);
  const labelBudget = Math.max(width - 128, 80);
  const valueBudget = Math.max(width * 0.3, 72);
  const labelSize = Math.min(rowHeight * 0.4, labelBudget / longestLabel / 1.18);
  const valueSize = Math.min(rowHeight * 0.42, valueBudget / longestValue / 0.68);
  const fontSize = Math.round(clampNumber(Math.min(labelSize, valueSize), 8.5, 12) * 10) / 10;
  const valueFontSize = Math.round(clampNumber(Math.min(valueSize + 0.4, rowHeight * 0.44), 9.5, 13) * 10) / 10;

  return {
    '--ranking-row-count': String(rowCount),
    '--ranking-row-gap': `${rowGap}px`,
    '--ranking-font-size': `${fontSize}px`,
    '--ranking-value-font-size': `${valueFontSize}px`,
    '--ranking-badge-size': `${Math.round(clampNumber(rowHeight * 0.58, 16, 22) * 10) / 10}px`,
    '--ranking-row-padding-x': `${Math.round(clampNumber(width * 0.026, 6, 10) * 10) / 10}px`,
    '--ranking-col-gap': `${Math.round(clampNumber(width * 0.028, 7, 11) * 10) / 10}px`,
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
  <section ref="rootRef" class="ranking-card-widget" :style="layoutStyle" aria-label="排名卡片">
    <div class="ranking-list" role="list">
      <div v-for="item in rows" :key="`${item.rank}-${item.label}`" class="ranking-row" role="listitem">
        <span class="ranking-fill" :style="{ width: `${item.sharePercent}%` }"></span>
        <span class="ranking-badge" :class="item.rankClass">{{ item.rank }}</span>
        <span class="ranking-label" :title="item.label">{{ item.label }}</span>
        <span class="ranking-value" :title="`${item.valueText}${item.suffixText}`">
          <strong>{{ item.valueText }}</strong>
          <small v-if="item.suffixText">{{ item.suffixText }}</small>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ranking-card-widget {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-variant-numeric: tabular-nums;
}

.ranking-list {
  display: grid;
  grid-template-rows: repeat(var(--ranking-row-count, 5), minmax(0, 1fr));
  gap: var(--ranking-row-gap, 4px);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.ranking-row {
  position: relative;
  display: grid;
  grid-template-columns: var(--ranking-badge-size, 22px) minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--ranking-col-gap, 9px);
  min-width: 0;
  min-height: 0;
  padding: 0 var(--ranking-row-padding-x, 8px);
  overflow: hidden;
  border: 1px solid var(--ranking-row-border, rgba(0, 74, 198, 0.14));
  border-radius: 5px;
  background: var(--ranking-row-background, rgba(0, 87, 217, 0.038));
  box-shadow: var(--ranking-row-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.7));
}

.ranking-fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0;
  border-radius: inherit;
  background: var(--ranking-fill-background, linear-gradient(90deg, rgba(0, 87, 217, 0.18), rgba(0, 87, 217, 0.035)));
  pointer-events: none;
}

.ranking-badge,
.ranking-label,
.ranking-value {
  position: relative;
  z-index: 1;
}

.ranking-badge {
  display: inline-grid;
  width: var(--ranking-badge-size, 22px);
  height: var(--ranking-badge-size, 22px);
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.64);
  border-radius: 999px;
  color: #ffffff;
  background: linear-gradient(180deg, #006ee6, #004ac6);
  box-shadow: 0 4px 10px rgba(0, 74, 198, 0.18);
  font-size: calc(var(--ranking-font-size, 12px) - 1px);
  font-weight: 800;
  line-height: 1;
}

.ranking-badge.rank-1 {
  color: #5f3a00;
  background: linear-gradient(180deg, #ffe7a3 0%, #ffc43d 46%, #d99300 100%);
  box-shadow: 0 4px 11px rgba(217, 147, 0, 0.22);
}

.ranking-badge.rank-2 {
  color: #334155;
  background: linear-gradient(180deg, #f8fafc 0%, #d7dee8 48%, #9aa7b8 100%);
  box-shadow: 0 4px 11px rgba(100, 116, 139, 0.18);
}

.ranking-badge.rank-3 {
  color: #fff7ed;
  background: linear-gradient(180deg, #d8995b 0%, #b96d2c 48%, #7c3f18 100%);
  box-shadow: 0 4px 11px rgba(185, 109, 44, 0.2);
}

.ranking-label {
  min-width: 0;
  overflow: hidden;
  color: var(--ranking-label-color, #15304f);
  font-size: var(--ranking-font-size, 12px);
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-value {
  display: inline-flex;
  align-items: baseline;
  justify-content: flex-end;
  min-width: 0;
  overflow: hidden;
  color: var(--ranking-value-color, #0057d9);
  font-size: var(--ranking-value-font-size, 13px);
  font-weight: 850;
  letter-spacing: 0;
  line-height: 1;
  white-space: nowrap;
}

.ranking-value strong {
  overflow: hidden;
  font: inherit;
  text-overflow: ellipsis;
}

.ranking-value small {
  margin-left: 2px;
  color: var(--ranking-unit-color, rgba(0, 74, 198, 0.72));
  font-size: calc(var(--ranking-font-size, 12px) - 1px);
  font-weight: 700;
}
</style>
