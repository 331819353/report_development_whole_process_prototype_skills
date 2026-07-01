<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { AlertTriangle, CircleCheck, CircleDashed, Clock3, ListChecks } from '@lucide/vue';
import type { Component } from 'vue';
import type { WidgetContext } from '../../types';

type ActionTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface ActionListExampleItem {
  label: string;
  status?: string;
  owner?: string;
  due?: string;
  tone?: ActionTone;
  done?: boolean;
}

interface ActionListExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface ActionListExampleLayoutConfig {
  paddingPx?: number;
  gapPx?: number;
  titleHeightPx?: number;
  rowGapPx?: number;
  maxVisibleRows?: number;
}

interface ActionListExampleRowConfig {
  minFontSizePx?: number;
  maxFontSizePx?: number;
  minMetaFontSizePx?: number;
  maxMetaFontSizePx?: number;
  minIconSizePx?: number;
  maxIconSizePx?: number;
  minPillHeightPx?: number;
  maxPillHeightPx?: number;
  minRowPaddingInlinePx?: number;
  maxRowPaddingInlinePx?: number;
  minColumnGapPx?: number;
  maxColumnGapPx?: number;
}

interface ActionListExampleToneConfig {
  primary?: string;
  primarySoft?: string;
  primarySofter?: string;
  success?: string;
  successSoft?: string;
  warning?: string;
  warningSoft?: string;
  danger?: string;
  dangerSoft?: string;
  neutral?: string;
  neutralSoft?: string;
  border?: string;
  text?: string;
  meta?: string;
  value?: string;
}

interface ActionListExampleCardConfig {
  title?: ActionListExampleTitleConfig;
  layout?: ActionListExampleLayoutConfig;
  row?: ActionListExampleRowConfig;
  tones?: ActionListExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  items?: ActionListExampleItem[];
  config?: ActionListExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;

const defaultItems: ActionListExampleItem[] = [
  { label: '完成经营复盘', owner: '经营组', due: '今日', status: '推进中', tone: 'primary' },
  { label: '核对异常费用', owner: '财务', due: '今日', status: '待处理', tone: 'warning' },
  { label: '确认库存预警', owner: '运营', due: '明日', status: '需关注', tone: 'danger' },
  { label: '同步行动闭环', owner: '项目组', due: '本周', status: '已完成', tone: 'success', done: true },
];

const defaultTitleConfig: Required<ActionListExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 11,
  lineHeightPx: 14,
  color: '',
  unitVisible: true,
  unitFontSizePx: 10,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<ActionListExampleLayoutConfig> = {
  paddingPx: 5,
  gapPx: 2,
  titleHeightPx: 20,
  rowGapPx: 3,
  maxVisibleRows: 5,
};

const defaultRowConfig: Required<ActionListExampleRowConfig> = {
  minFontSizePx: 8,
  maxFontSizePx: 13,
  minMetaFontSizePx: 8,
  maxMetaFontSizePx: 11,
  minIconSizePx: 14,
  maxIconSizePx: 22,
  minPillHeightPx: 14,
  maxPillHeightPx: 24,
  minRowPaddingInlinePx: 5,
  maxRowPaddingInlinePx: 10,
  minColumnGapPx: 6,
  maxColumnGapPx: 12,
};

const defaultToneConfig: Required<ActionListExampleToneConfig> = {
  primary: '#0057d9',
  primarySoft: 'rgba(0, 87, 217, 0.13)',
  primarySofter: 'rgba(0, 87, 217, 0.04)',
  success: '#0f8f5f',
  successSoft: 'rgba(15, 143, 95, 0.12)',
  warning: '#b76b00',
  warningSoft: 'rgba(183, 107, 0, 0.13)',
  danger: '#ba1a1a',
  dangerSoft: 'rgba(186, 26, 26, 0.12)',
  neutral: '#475467',
  neutralSoft: 'rgba(71, 84, 103, 0.1)',
  border: 'rgba(0, 87, 217, 0.14)',
  text: '#15304f',
  meta: '#667085',
  value: '#0057d9',
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

const resolvedTitle = computed<Required<ActionListExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<ActionListExampleLayoutConfig>>(() => ({
  ...defaultLayoutConfig,
  ...(props.config?.layout ?? {}),
  paddingPx: clampNumber(props.config?.layout?.paddingPx, 0, 24, defaultLayoutConfig.paddingPx),
  gapPx: clampNumber(props.config?.layout?.gapPx, 0, 16, defaultLayoutConfig.gapPx),
  titleHeightPx: clampNumber(props.config?.layout?.titleHeightPx, 16, 40, defaultLayoutConfig.titleHeightPx),
  rowGapPx: clampNumber(props.config?.layout?.rowGapPx, 0, 10, defaultLayoutConfig.rowGapPx),
  maxVisibleRows: clampNumber(props.config?.layout?.maxVisibleRows, 1, 8, defaultLayoutConfig.maxVisibleRows),
}));

const resolvedRow = computed<Required<ActionListExampleRowConfig>>(() => ({
  ...defaultRowConfig,
  ...(props.config?.row ?? {}),
  minFontSizePx: clampNumber(props.config?.row?.minFontSizePx, 7, 16, defaultRowConfig.minFontSizePx),
  maxFontSizePx: clampNumber(props.config?.row?.maxFontSizePx, 8, 22, defaultRowConfig.maxFontSizePx),
  minMetaFontSizePx: clampNumber(props.config?.row?.minMetaFontSizePx, 7, 14, defaultRowConfig.minMetaFontSizePx),
  maxMetaFontSizePx: clampNumber(props.config?.row?.maxMetaFontSizePx, 8, 18, defaultRowConfig.maxMetaFontSizePx),
  minIconSizePx: clampNumber(props.config?.row?.minIconSizePx, 10, 28, defaultRowConfig.minIconSizePx),
  maxIconSizePx: clampNumber(props.config?.row?.maxIconSizePx, 12, 34, defaultRowConfig.maxIconSizePx),
  minPillHeightPx: clampNumber(props.config?.row?.minPillHeightPx, 10, 28, defaultRowConfig.minPillHeightPx),
  maxPillHeightPx: clampNumber(props.config?.row?.maxPillHeightPx, 12, 32, defaultRowConfig.maxPillHeightPx),
  minRowPaddingInlinePx: clampNumber(props.config?.row?.minRowPaddingInlinePx, 0, 18, defaultRowConfig.minRowPaddingInlinePx),
  maxRowPaddingInlinePx: clampNumber(props.config?.row?.maxRowPaddingInlinePx, 2, 28, defaultRowConfig.maxRowPaddingInlinePx),
  minColumnGapPx: clampNumber(props.config?.row?.minColumnGapPx, 2, 18, defaultRowConfig.minColumnGapPx),
  maxColumnGapPx: clampNumber(props.config?.row?.maxColumnGapPx, 3, 24, defaultRowConfig.maxColumnGapPx),
}));

const resolvedTones = computed<Required<ActionListExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '事项清单');
const unit = computed(() => props.unit?.trim() || '单位：项');
const hasVisibleTitle = computed(() => resolvedTitle.value.visible || resolvedTitle.value.unitVisible);
const visibleItems = computed(() => (props.items?.length ? props.items : defaultItems).slice(0, resolvedLayout.value.maxVisibleRows));

const getStatusTone = (item: ActionListExampleItem): ActionTone => {
  if (item.done) {
    return 'success';
  }

  return item.tone ?? 'primary';
};

const getStatusText = (item: ActionListExampleItem) => {
  if (item.status?.trim()) {
    return item.status.trim();
  }

  if (item.done) {
    return '已完成';
  }

  const tone = getStatusTone(item);

  return tone === 'warning' ? '待处理' : tone === 'danger' ? '需关注' : tone === 'success' ? '已完成' : '推进中';
};

const getStatusIcon = (tone: ActionTone, done?: boolean): Component => {
  if (done || tone === 'success') {
    return CircleCheck;
  }

  if (tone === 'warning') {
    return Clock3;
  }

  if (tone === 'danger') {
    return AlertTriangle;
  }

  if (tone === 'neutral') {
    return CircleDashed;
  }

  return ListChecks;
};

const rows = computed(() =>
  visibleItems.value.map((item, index) => {
    const tone = getStatusTone(item);
    const metaParts = [item.owner, item.due].filter((part): part is string => Boolean(part?.trim()));

    return {
      ...item,
      id: `${index}-${item.label}`,
      tone,
      statusText: getStatusText(item),
      metaText: metaParts.join(' / '),
      icon: getStatusIcon(tone, item.done),
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
  const titleRowHeight = hasVisibleTitle.value ? layout.titleHeightPx : 0;
  const listHeight = Math.max(height - layout.paddingPx * 2 - titleRowHeight - layout.gapPx, 1);
  const autoRowGap = Math.round(clampNumber(listHeight * 0.018, 2, layout.rowGapPx, layout.rowGapPx) * 10) / 10;
  const rowHeight = Math.max((listHeight - autoRowGap * (rowCount - 1)) / rowCount, 1);
  const longestLabel = Math.max(...rows.value.map((item) => getWeightedTextLength(item.label)), 1);
  const longestMeta = Math.max(...rows.value.map((item) => getWeightedTextLength(`${item.metaText}${item.statusText}`)), 1);
  const labelBudget = Math.max(width - 128, 48);
  const metaBudget = Math.max(width * 0.32, 54);
  const labelSize = labelBudget / longestLabel / 1.18;
  const metaSize = metaBudget / longestMeta / 0.74;
  const fontSize = Math.round(
    clampNumber(Math.min(rowHeight * 0.36, labelSize), rowConfig.minFontSizePx, rowConfig.maxFontSizePx, rowConfig.maxFontSizePx) * 10,
  ) / 10;
  const metaFontSize = Math.round(
    clampNumber(Math.min(rowHeight * 0.29, metaSize), rowConfig.minMetaFontSizePx, rowConfig.maxMetaFontSizePx, rowConfig.maxMetaFontSizePx) * 10,
  ) / 10;
  const iconSize = Math.round(clampNumber(rowHeight * 0.5, rowConfig.minIconSizePx, rowConfig.maxIconSizePx, rowConfig.maxIconSizePx) * 10) / 10;
  const pillHeight = Math.round(clampNumber(rowHeight * 0.48, rowConfig.minPillHeightPx, rowConfig.maxPillHeightPx, rowConfig.maxPillHeightPx) * 10) / 10;

  return {
    '--action-list-title-row': `${titleRowHeight}px`,
    '--action-list-card-padding': `${layout.paddingPx}px`,
    '--action-list-card-gap': `${layout.gapPx}px`,
    '--action-list-row-count': String(rowCount),
    '--action-list-row-gap': `${autoRowGap}px`,
    '--action-list-row-font-size': `${fontSize}px`,
    '--action-list-row-meta-size': `${metaFontSize}px`,
    '--action-list-icon-size': `${iconSize}px`,
    '--action-list-pill-height': `${pillHeight}px`,
    '--action-list-row-padding-x': `${Math.round(clampNumber(width * 0.022, rowConfig.minRowPaddingInlinePx, rowConfig.maxRowPaddingInlinePx, rowConfig.maxRowPaddingInlinePx) * 10) / 10}px`,
    '--action-list-col-gap': `${Math.round(clampNumber(width * 0.026, rowConfig.minColumnGapPx, rowConfig.maxColumnGapPx, rowConfig.maxColumnGapPx) * 10) / 10}px`,
    '--action-list-title-font-size': `${titleConfig.fontSizePx}px`,
    '--action-list-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--action-list-title-color': titleConfig.color || tones.primary,
    '--action-list-title-underline-opacity': titleConfig.underline ? '1' : '0',
    '--action-list-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--action-list-unit-color': titleConfig.unitColor,
    '--action-list-primary': tones.primary,
    '--action-list-primary-soft': tones.primarySoft,
    '--action-list-primary-softer': tones.primarySofter,
    '--action-list-success': tones.success,
    '--action-list-success-soft': tones.successSoft,
    '--action-list-warning': tones.warning,
    '--action-list-warning-soft': tones.warningSoft,
    '--action-list-danger': tones.danger,
    '--action-list-danger-soft': tones.dangerSoft,
    '--action-list-neutral': tones.neutral,
    '--action-list-neutral-soft': tones.neutralSoft,
    '--action-list-border': tones.border,
    '--action-list-text': tones.text,
    '--action-list-meta': tones.meta,
    '--action-list-value': tones.value,
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
  <section ref="rootRef" class="action-list-example-card" :class="{ 'has-title': hasVisibleTitle }" :style="valueStyle" aria-label="action-list-example-card">
    <header v-if="hasVisibleTitle" class="action-list-example-header">
      <span v-if="resolvedTitle.visible" class="action-list-example-title" :title="title">{{ title }}</span>
      <span v-if="resolvedTitle.unitVisible" class="action-list-example-unit" :title="unit">{{ unit }}</span>
    </header>

    <div class="action-list-example-body" role="list">
      <div v-for="item in rows" :key="item.id" class="action-list-example-row" :class="`tone-${item.tone}`" role="listitem">
        <span class="action-list-example-icon" aria-hidden="true">
          <component :is="item.icon" :size="14" :stroke-width="2.2" />
        </span>
        <span class="action-list-example-main">
          <strong class="action-list-example-label" :title="item.label">{{ item.label }}</strong>
          <span v-if="item.metaText" class="action-list-example-meta" :title="item.metaText">{{ item.metaText }}</span>
        </span>
        <span class="action-list-example-status" :title="item.statusText">{{ item.statusText }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.action-list-example-card {
  display: grid;
  grid-template-rows:
    var(--action-list-title-row, 20px)
    minmax(0, 1fr);
  gap: var(--action-list-card-gap, 2px);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--action-list-card-padding, 5px);
  background: transparent;
  color: var(--text-strong, #101828);
  container-type: size;
  font-variant-numeric: tabular-nums;
}

.action-list-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.action-list-example-card:not(.has-title) .action-list-example-body {
  grid-row: 1;
}

.action-list-example-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 2px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.action-list-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-self: start;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  padding: 0 0 3px;
  color: var(--action-list-title-color, var(--action-list-primary));
  font-size: var(--action-list-title-font-size, 11px);
  font-weight: 800;
  line-height: var(--action-list-title-line-height, 14px);
  text-overflow: clip;
  white-space: nowrap;
}

.action-list-example-title::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, currentColor 0%, color-mix(in srgb, currentColor 26%, transparent) 72%, transparent 100%);
  content: "";
  opacity: var(--action-list-title-underline-opacity, 1);
}

.action-list-example-unit {
  justify-self: end;
  max-width: 100%;
  overflow: hidden;
  color: var(--action-list-unit-color, #667085);
  font-size: var(--action-list-unit-font-size, 10px);
  font-weight: 700;
  line-height: var(--action-list-title-line-height, 14px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-list-example-body {
  display: grid;
  grid-template-rows: repeat(var(--action-list-row-count, 4), minmax(0, 1fr));
  gap: var(--action-list-row-gap, 3px);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.action-list-example-row {
  position: relative;
  display: grid;
  grid-template-columns: var(--action-list-icon-size, 18px) minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--action-list-col-gap, 9px);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 0 var(--action-list-row-padding-x, 8px);
  border: 1px solid var(--action-list-border, rgba(0, 87, 217, 0.14));
  border-radius: 5px;
  background: color-mix(in srgb, var(--action-list-row-soft, var(--action-list-primary-softer)) 58%, transparent);
  box-shadow: none;
}

.action-list-example-row.tone-primary {
  --action-list-row-color: var(--action-list-primary);
  --action-list-row-soft: var(--action-list-primary-softer);
}

.action-list-example-row.tone-success {
  --action-list-row-color: var(--action-list-success);
  --action-list-row-soft: var(--action-list-success-soft);
}

.action-list-example-row.tone-warning {
  --action-list-row-color: var(--action-list-warning);
  --action-list-row-soft: var(--action-list-warning-soft);
}

.action-list-example-row.tone-danger {
  --action-list-row-color: var(--action-list-danger);
  --action-list-row-soft: var(--action-list-danger-soft);
}

.action-list-example-row.tone-neutral {
  --action-list-row-color: var(--action-list-neutral);
  --action-list-row-soft: var(--action-list-neutral-soft);
}

.action-list-example-icon,
.action-list-example-main,
.action-list-example-status {
  position: relative;
  z-index: 1;
}

.action-list-example-icon {
  display: inline-grid;
  width: var(--action-list-icon-size, 18px);
  height: var(--action-list-icon-size, 18px);
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--action-list-row-color, var(--action-list-primary)) 28%, transparent);
  border-radius: 999px;
  color: var(--action-list-row-color, var(--action-list-primary));
  background: color-mix(in srgb, var(--action-list-row-color, var(--action-list-primary)) 10%, transparent);
  box-shadow: none;
}

.action-list-example-icon :deep(svg) {
  width: max(10px, calc(var(--action-list-icon-size, 18px) - 6px));
  height: max(10px, calc(var(--action-list-icon-size, 18px) - 6px));
}

.action-list-example-main {
  display: grid;
  align-content: center;
  gap: 2px;
  min-width: 0;
  overflow: hidden;
}

.action-list-example-label {
  min-width: 0;
  overflow: hidden;
  color: var(--action-list-text, #15304f);
  font-size: var(--action-list-row-font-size, 12px);
  font-weight: 730;
  line-height: 1.08;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-list-example-meta {
  min-width: 0;
  overflow: hidden;
  color: var(--action-list-meta, #667085);
  font-size: var(--action-list-row-meta-size, 10px);
  font-weight: 600;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-list-example-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 76px;
  min-width: 0;
  height: var(--action-list-pill-height, 20px);
  overflow: hidden;
  padding: 0 clamp(5px, 1.8cqw, 9px);
  border: 1px solid color-mix(in srgb, var(--action-list-row-color, var(--action-list-primary)) 24%, transparent);
  border-radius: 999px;
  color: var(--action-list-row-color, var(--action-list-primary));
  background: color-mix(in srgb, var(--action-list-row-color, var(--action-list-primary)) 8%, transparent);
  font-size: var(--action-list-row-meta-size, 10px);
  font-weight: 760;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
