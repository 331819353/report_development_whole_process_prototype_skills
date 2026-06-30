<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { WidgetContext } from '../../types';

interface RankingListExampleItem {
  rank?: number;
  label: string;
  value: string | number;
  suffix?: string;
}

interface RankingListExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface RankingListExampleLayoutConfig {
  paddingPx?: number;
  gapPx?: number;
  titleHeightPx?: number;
  rowGapPx?: number;
  maxVisibleRows?: number;
}

interface RankingListExampleRowConfig {
  minFontSizePx?: number;
  maxFontSizePx?: number;
  minValueFontSizePx?: number;
  maxValueFontSizePx?: number;
  minBadgeSizePx?: number;
  maxBadgeSizePx?: number;
  minRowPaddingInlinePx?: number;
  maxRowPaddingInlinePx?: number;
  minColumnGapPx?: number;
  maxColumnGapPx?: number;
}

interface RankingListExampleToneConfig {
  primary?: string;
  primarySoft?: string;
  primarySofter?: string;
  border?: string;
  text?: string;
  value?: string;
  goldStart?: string;
  goldEnd?: string;
  silverStart?: string;
  silverEnd?: string;
  bronzeStart?: string;
  bronzeEnd?: string;
}

interface RankingListExampleCardConfig {
  title?: RankingListExampleTitleConfig;
  layout?: RankingListExampleLayoutConfig;
  row?: RankingListExampleRowConfig;
  tones?: RankingListExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  items?: RankingListExampleItem[];
  valueUnit?: string;
  config?: RankingListExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;

const defaultItems: RankingListExampleItem[] = [
  { rank: 1, label: '示例项 A', value: 98 },
  { rank: 2, label: '示例项 B', value: 86 },
  { rank: 3, label: '示例项 C', value: 74 },
  { rank: 4, label: '示例项 D', value: 62 },
  { rank: 5, label: '示例项 E', value: 51 },
];

const defaultTitleConfig: Required<RankingListExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 11,
  lineHeightPx: 14,
  color: '',
  unitVisible: true,
  unitFontSizePx: 10,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<RankingListExampleLayoutConfig> = {
  paddingPx: 5,
  gapPx: 2,
  titleHeightPx: 20,
  rowGapPx: 3,
  maxVisibleRows: 5,
};

const defaultRowConfig: Required<RankingListExampleRowConfig> = {
  minFontSizePx: 9,
  maxFontSizePx: 13,
  minValueFontSizePx: 10,
  maxValueFontSizePx: 14,
  minBadgeSizePx: 16,
  maxBadgeSizePx: 22,
  minRowPaddingInlinePx: 6,
  maxRowPaddingInlinePx: 10,
  minColumnGapPx: 7,
  maxColumnGapPx: 11,
};

const defaultToneConfig: Required<RankingListExampleToneConfig> = {
  primary: '#0057d9',
  primarySoft: 'rgba(0, 87, 217, 0.18)',
  primarySofter: 'rgba(0, 87, 217, 0.035)',
  border: 'rgba(0, 87, 217, 0.18)',
  text: '#15304f',
  value: '#0057d9',
  goldStart: '#ffe7a3',
  goldEnd: '#d99300',
  silverStart: '#f8fafc',
  silverEnd: '#9aa7b8',
  bronzeStart: '#d8995b',
  bronzeEnd: '#8b4a1e',
};

const clampNumber = (value: unknown, min: number, max: number, fallback: number) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return Math.min(Math.max(numberValue, min), max);
};

const getWeightedTextLength = (value = '') =>
  Array.from(value.trim()).reduce((total, char) => total + (/[\u4e00-\u9fff]/.test(char) ? 1 : /[0-9]/.test(char) ? 0.62 : 0.56), 0);

const parseNumber = (value: number | string) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  const numericValue = Number(value.replace(/,/g, '').trim());

  return Number.isFinite(numericValue) ? numericValue : undefined;
};

const formatValue = (value: number | string) => {
  const numericValue = parseNumber(value);

  if (numericValue === undefined) {
    return String(value).trim();
  }

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
  }).format(numericValue);
};

const resolvedTitle = computed<Required<RankingListExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<RankingListExampleLayoutConfig>>(() => ({
  ...defaultLayoutConfig,
  ...(props.config?.layout ?? {}),
  paddingPx: clampNumber(props.config?.layout?.paddingPx, 0, 24, defaultLayoutConfig.paddingPx),
  gapPx: clampNumber(props.config?.layout?.gapPx, 0, 16, defaultLayoutConfig.gapPx),
  titleHeightPx: clampNumber(props.config?.layout?.titleHeightPx, 16, 40, defaultLayoutConfig.titleHeightPx),
  rowGapPx: clampNumber(props.config?.layout?.rowGapPx, 0, 10, defaultLayoutConfig.rowGapPx),
  maxVisibleRows: clampNumber(props.config?.layout?.maxVisibleRows, 1, 8, defaultLayoutConfig.maxVisibleRows),
}));

const resolvedRow = computed<Required<RankingListExampleRowConfig>>(() => ({
  ...defaultRowConfig,
  ...(props.config?.row ?? {}),
  minFontSizePx: clampNumber(props.config?.row?.minFontSizePx, 7, 16, defaultRowConfig.minFontSizePx),
  maxFontSizePx: clampNumber(props.config?.row?.maxFontSizePx, 8, 22, defaultRowConfig.maxFontSizePx),
  minValueFontSizePx: clampNumber(props.config?.row?.minValueFontSizePx, 8, 18, defaultRowConfig.minValueFontSizePx),
  maxValueFontSizePx: clampNumber(props.config?.row?.maxValueFontSizePx, 9, 24, defaultRowConfig.maxValueFontSizePx),
  minBadgeSizePx: clampNumber(props.config?.row?.minBadgeSizePx, 10, 28, defaultRowConfig.minBadgeSizePx),
  maxBadgeSizePx: clampNumber(props.config?.row?.maxBadgeSizePx, 12, 36, defaultRowConfig.maxBadgeSizePx),
  minRowPaddingInlinePx: clampNumber(props.config?.row?.minRowPaddingInlinePx, 0, 18, defaultRowConfig.minRowPaddingInlinePx),
  maxRowPaddingInlinePx: clampNumber(props.config?.row?.maxRowPaddingInlinePx, 2, 28, defaultRowConfig.maxRowPaddingInlinePx),
  minColumnGapPx: clampNumber(props.config?.row?.minColumnGapPx, 2, 18, defaultRowConfig.minColumnGapPx),
  maxColumnGapPx: clampNumber(props.config?.row?.maxColumnGapPx, 3, 24, defaultRowConfig.maxColumnGapPx),
}));

const resolvedTones = computed<Required<RankingListExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '排名列表');
const unit = computed(() => props.unit?.trim() || '单位：分');
const visibleItems = computed(() => (props.items?.length ? props.items : defaultItems).slice(0, resolvedLayout.value.maxVisibleRows));
const maxNumericValue = computed(() => Math.max(...visibleItems.value.map((item) => parseNumber(item.value) ?? 0), 1));

const rows = computed(() =>
  visibleItems.value.map((item, index) => {
    const numericValue = parseNumber(item.value);
    const fillBaseValue = maxNumericValue.value <= 100 ? 100 : maxNumericValue.value;
    const sharePercent = numericValue === undefined ? 0 : Math.round(clampNumber((numericValue / fillBaseValue) * 100, 0, 100, 0));
    const rank = item.rank ?? index + 1;

    return {
      ...item,
      rank,
      rankClass: `rank-${rank}`,
      valueText: formatValue(item.value),
      suffixText: item.suffix ?? props.valueUnit ?? '',
      sharePercent,
    };
  }),
);

const valueStyle = computed(() => {
  const width = containerSize.value.width || 320;
  const height = containerSize.value.height || 188;
  const layout = resolvedLayout.value;
  const rowConfig = resolvedRow.value;
  const titleConfig = resolvedTitle.value;
  const tones = resolvedTones.value;
  const rowCount = Math.max(rows.value.length, 1);
  const listHeight = Math.max(height - layout.paddingPx * 2 - layout.titleHeightPx - layout.gapPx, 1);
  const autoRowGap = Math.round(clampNumber(listHeight * 0.018, 2, layout.rowGapPx, layout.rowGapPx) * 10) / 10;
  const rowHeight = Math.max((listHeight - autoRowGap * (rowCount - 1)) / rowCount, 1);
  const longestLabel = Math.max(...rows.value.map((item) => getWeightedTextLength(item.label)), 1);
  const longestValue = Math.max(...rows.value.map((item) => getWeightedTextLength(item.valueText + item.suffixText)), 1);
  const labelBudget = Math.max(width - 132, 48);
  const valueBudget = Math.max(width * 0.22, 42);
  const labelSize = labelBudget / longestLabel / 1.15;
  const valueSize = valueBudget / longestValue / 0.68;
  const fontSize = Math.round(
    clampNumber(Math.min(rowHeight * 0.42, labelSize, valueSize), rowConfig.minFontSizePx, rowConfig.maxFontSizePx, rowConfig.maxFontSizePx) * 10,
  ) / 10;
  const valueFontSize = Math.round(
    clampNumber(Math.min(rowHeight * 0.45, valueSize + 0.8), rowConfig.minValueFontSizePx, rowConfig.maxValueFontSizePx, rowConfig.maxValueFontSizePx) * 10,
  ) / 10;

  return {
    '--ranking-list-title-row': `${layout.titleHeightPx}px`,
    '--ranking-list-card-padding': `${layout.paddingPx}px`,
    '--ranking-list-card-gap': `${layout.gapPx}px`,
    '--ranking-list-row-count': String(rowCount),
    '--ranking-list-row-gap': `${autoRowGap}px`,
    '--ranking-list-row-font-size': `${fontSize}px`,
    '--ranking-list-row-value-size': `${valueFontSize}px`,
    '--ranking-list-badge-size': `${Math.round(clampNumber(rowHeight * 0.58, rowConfig.minBadgeSizePx, rowConfig.maxBadgeSizePx, rowConfig.maxBadgeSizePx) * 10) / 10}px`,
    '--ranking-list-row-padding-x': `${Math.round(clampNumber(width * 0.022, rowConfig.minRowPaddingInlinePx, rowConfig.maxRowPaddingInlinePx, rowConfig.maxRowPaddingInlinePx) * 10) / 10}px`,
    '--ranking-list-col-gap': `${Math.round(clampNumber(width * 0.026, rowConfig.minColumnGapPx, rowConfig.maxColumnGapPx, rowConfig.maxColumnGapPx) * 10) / 10}px`,
    '--ranking-list-title-font-size': `${titleConfig.fontSizePx}px`,
    '--ranking-list-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--ranking-list-title-color': titleConfig.color || tones.primary,
    '--ranking-list-title-underline-opacity': titleConfig.underline ? '1' : '0',
    '--ranking-list-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--ranking-list-unit-color': titleConfig.unitColor,
    '--ranking-list-primary': tones.primary,
    '--ranking-list-primary-soft': tones.primarySoft,
    '--ranking-list-primary-softer': tones.primarySofter,
    '--ranking-list-border': tones.border,
    '--ranking-list-text': tones.text,
    '--ranking-list-value': tones.value,
    '--ranking-list-gold-start': tones.goldStart,
    '--ranking-list-gold-end': tones.goldEnd,
    '--ranking-list-silver-start': tones.silverStart,
    '--ranking-list-silver-end': tones.silverEnd,
    '--ranking-list-bronze-start': tones.bronzeStart,
    '--ranking-list-bronze-end': tones.bronzeEnd,
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
  <section ref="rootRef" class="ranking-list-example-card" :style="valueStyle" aria-label="排名列表卡片示例">
    <header v-if="resolvedTitle.visible || resolvedTitle.unitVisible" class="ranking-list-example-header">
      <span v-if="resolvedTitle.visible" class="ranking-list-example-title" :title="title">{{ title }}</span>
      <span v-if="resolvedTitle.unitVisible" class="ranking-list-example-unit" :title="unit">{{ unit }}</span>
    </header>

    <div class="ranking-list-example-body" role="list">
      <div v-for="item in rows" :key="`${item.rank}-${item.label}`" class="ranking-list-example-row" role="listitem">
        <span class="ranking-list-example-fill" :style="{ width: `${item.sharePercent}%` }"></span>
        <span class="ranking-list-example-badge" :class="item.rankClass">{{ item.rank }}</span>
        <span class="ranking-list-example-label" :title="item.label">{{ item.label }}</span>
        <span class="ranking-list-example-value" :title="`${item.valueText}${item.suffixText}`">
          <strong>{{ item.valueText }}</strong>
          <small v-if="item.suffixText">{{ item.suffixText }}</small>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ranking-list-example-card {
  display: grid;
  grid-template-rows:
    var(--ranking-list-title-row, 20px)
    minmax(0, 1fr);
  gap: var(--ranking-list-card-gap, 2px);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--ranking-list-card-padding, 5px);
  background: transparent;
  color: var(--text-strong, #101828);
  container-type: size;
  font-variant-numeric: tabular-nums;
}

.ranking-list-example-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 2px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.ranking-list-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-self: start;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  padding: 0 0 3px;
  color: var(--ranking-list-title-color, var(--ranking-list-primary));
  font-size: var(--ranking-list-title-font-size, 11px);
  font-weight: 800;
  line-height: var(--ranking-list-title-line-height, 14px);
  text-overflow: clip;
  white-space: nowrap;
}

.ranking-list-example-title::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, currentColor 0%, color-mix(in srgb, currentColor 26%, transparent) 72%, transparent 100%);
  content: "";
  opacity: var(--ranking-list-title-underline-opacity, 1);
}

.ranking-list-example-unit {
  justify-self: end;
  max-width: 100%;
  overflow: hidden;
  color: var(--ranking-list-unit-color, #667085);
  font-size: var(--ranking-list-unit-font-size, 10px);
  font-weight: 700;
  line-height: var(--ranking-list-title-line-height, 14px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-list-example-body {
  display: grid;
  grid-template-rows: repeat(var(--ranking-list-row-count, 5), minmax(0, 1fr));
  gap: var(--ranking-list-row-gap, 3px);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.ranking-list-example-row {
  position: relative;
  display: grid;
  grid-template-columns: var(--ranking-list-badge-size, 20px) minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--ranking-list-col-gap, 9px);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 0 var(--ranking-list-row-padding-x, 8px);
  border: 1px solid var(--ranking-list-border, rgba(0, 87, 217, 0.18));
  border-radius: 5px;
  background: color-mix(in srgb, var(--ranking-list-primary-softer, rgba(0, 87, 217, 0.035)) 64%, transparent);
  box-shadow: none;
}

.ranking-list-example-fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--ranking-list-primary-soft, rgba(0, 87, 217, 0.18)) 44%, transparent),
    transparent
  );
  pointer-events: none;
}

.ranking-list-example-badge,
.ranking-list-example-label,
.ranking-list-example-value {
  position: relative;
  z-index: 1;
}

.ranking-list-example-badge {
  display: inline-grid;
  width: var(--ranking-list-badge-size, 20px);
  height: var(--ranking-list-badge-size, 20px);
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--ranking-list-primary, #0057d9) 30%, transparent);
  border-radius: 999px;
  color: var(--ranking-list-primary, #0057d9);
  background: color-mix(in srgb, var(--ranking-list-primary, #0057d9) 10%, transparent);
  box-shadow: none;
  font-size: max(8px, calc(var(--ranking-list-row-font-size, 12px) - 1px));
  font-weight: 850;
  line-height: 1;
}

.ranking-list-example-badge.rank-1 {
  border-color: color-mix(in srgb, var(--ranking-list-gold-end, #d99300) 30%, transparent);
  color: var(--ranking-list-gold-end, #d99300);
  background: color-mix(in srgb, var(--ranking-list-gold-start, #ffe7a3) 20%, transparent);
}

.ranking-list-example-badge.rank-2 {
  border-color: color-mix(in srgb, var(--ranking-list-silver-end, #9aa7b8) 34%, transparent);
  color: var(--ranking-list-silver-end, #9aa7b8);
  background: color-mix(in srgb, var(--ranking-list-silver-start, #f8fafc) 18%, transparent);
}

.ranking-list-example-badge.rank-3 {
  border-color: color-mix(in srgb, var(--ranking-list-bronze-end, #8b4a1e) 32%, transparent);
  color: var(--ranking-list-bronze-end, #8b4a1e);
  background: color-mix(in srgb, var(--ranking-list-bronze-start, #d8995b) 18%, transparent);
}

.ranking-list-example-label {
  min-width: 0;
  overflow: hidden;
  color: var(--ranking-list-text, #15304f);
  font-size: var(--ranking-list-row-font-size, 12px);
  font-weight: 730;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-list-example-value {
  display: inline-flex;
  align-items: baseline;
  justify-content: flex-end;
  min-width: 0;
  overflow: hidden;
  color: var(--ranking-list-value, #0057d9);
  font-size: var(--ranking-list-row-value-size, 13px);
  font-weight: 820;
  line-height: 1;
  white-space: nowrap;
}

.ranking-list-example-value strong {
  overflow: hidden;
  font: inherit;
  text-overflow: ellipsis;
}

.ranking-list-example-value small {
  margin-left: 2px;
  color: color-mix(in srgb, var(--ranking-list-value, #0057d9) 76%, #667085);
  font-size: max(8px, calc(var(--ranking-list-row-font-size, 12px) - 1px));
  font-weight: 720;
}
</style>
