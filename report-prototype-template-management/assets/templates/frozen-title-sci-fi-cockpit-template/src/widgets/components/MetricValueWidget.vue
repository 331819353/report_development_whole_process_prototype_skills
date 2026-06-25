<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { WidgetContext } from '../types';

interface Props {
  context: WidgetContext;
  data?: unknown[];
  value?: number | string;
  unit?: string;
  yearOverYear?: string;
  monthOverMonth?: string;
  maxDecimals?: number;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;

const normalizeNumberText = (value: number | string) => {
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
  const value = props.value ?? 128063459;

  if (typeof value === 'number') {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: props.maxDecimals ?? 2,
    }).format(value);
  }

  return normalizeNumberText(value);
});
const yearOverYearText = computed(() => props.yearOverYear?.trim() || '+12.6%');
const monthOverMonthText = computed(() => props.monthOverMonth?.trim() || '+2.4%');

const getWeightedTextLength = (value: string) =>
  Array.from(value).reduce((total, char) => total + (/[0-9]/.test(char) ? 0.72 : char === ',' ? 0.34 : 0.8), 0);

const valueStyle = computed(() => {
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 140;
  const textWeight = Math.max(getWeightedTextLength(formattedValue.value), 1);
  const widthDrivenSize = (width - 18) / textWeight;
  const heightDrivenSize = height * 0.44;
  const fontSize = Math.max(18, Math.min(42, Math.floor(Math.min(widthDrivenSize, heightDrivenSize))));
  const compareFontSize = Math.max(9, Math.min(12, Math.round(Math.min(width / 26, height * 0.075) * 10) / 10));
  const compareValueSize = Math.max(11, Math.min(15, Math.round((compareFontSize + 2.2) * 10) / 10));

  return {
    '--metric-value-font-size': `${fontSize}px`,
    '--metric-compare-font-size': `${compareFontSize}px`,
    '--metric-compare-value-size': `${compareValueSize}px`,
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
  <section ref="rootRef" class="metric-value-widget" :style="valueStyle" aria-label="千分位指标值">
    <div class="metric-value-main">
      <strong>{{ formattedValue }}</strong>
    </div>
    <div class="metric-compare-strip" aria-label="同比环比">
      <span class="metric-compare-item">
        <em>同比</em>
        <b>{{ yearOverYearText }}</b>
      </span>
      <span class="metric-compare-item">
        <em>环比</em>
        <b>{{ monthOverMonthText }}</b>
      </span>
    </div>
  </section>
</template>

<style scoped>
.metric-value-widget {
  container-type: size;
  display: grid;
  grid-template-rows: minmax(0, 3fr) minmax(0, 1fr);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  gap: 2px;
  overflow: hidden;
  color: #0057d9;
  font-variant-numeric: tabular-nums;
}

.metric-value-main {
  display: grid;
  min-width: 0;
  min-height: 0;
  place-items: center;
  overflow: hidden;
}

.metric-value-main strong {
  display: block;
  max-width: 100%;
  overflow: visible;
  color: inherit;
  font-size: var(--metric-value-font-size, 32px);
  font-weight: 850;
  letter-spacing: 0;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
}

.metric-compare-strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: clamp(2px, 1.4cqh, 5px) clamp(4px, 1.8cqw, 8px);
  border-radius: 4px;
  background: transparent;
}

.metric-compare-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(3px, 1.4cqw, 6px);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--metric-compare-text, #52677a);
}

.metric-compare-item em {
  flex: 0 0 auto;
  color: var(--metric-compare-label, #5f718a);
  font-size: var(--metric-compare-font-size, 10px);
  font-style: normal;
  font-weight: 760;
  white-space: nowrap;
}

.metric-compare-item b {
  min-width: 0;
  overflow: hidden;
  color: var(--metric-compare-value, #0057d9);
  font-size: var(--metric-compare-value-size, 13px);
  font-weight: 900;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
