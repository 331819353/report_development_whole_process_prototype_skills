<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { WidgetContext } from '../../types';

type ConclusionExampleTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
type ConclusionExampleOrientation = 'auto' | 'vertical' | 'horizontal';

interface ConclusionExampleItem {
  label: string;
  value: string;
  tone?: ConclusionExampleTone;
}

interface ConclusionExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface ConclusionExampleLayoutConfig {
  paddingPx?: number;
  gapPx?: number;
  titleHeightPx?: number;
  contentGapPx?: number;
  orientation?: ConclusionExampleOrientation;
}

interface ConclusionExampleCoreConfig {
  label?: string;
  minFontSizePx?: number;
  maxFontSizePx?: number;
  minEmphasisFontSizePx?: number;
  maxEmphasisFontSizePx?: number;
}

interface ConclusionExampleListConfig {
  heading?: string;
  maxVisibleItems?: number;
  minFontSizePx?: number;
  maxFontSizePx?: number;
  minValueFontSizePx?: number;
  maxValueFontSizePx?: number;
}

interface ConclusionExampleToneConfig {
  primary?: string;
  success?: string;
  warning?: string;
  danger?: string;
  neutral?: string;
  border?: string;
  text?: string;
  muted?: string;
  panel?: string;
  panelStrong?: string;
}

interface ConclusionExampleCardConfig {
  title?: ConclusionExampleTitleConfig;
  layout?: ConclusionExampleLayoutConfig;
  core?: ConclusionExampleCoreConfig;
  list?: ConclusionExampleListConfig;
  tones?: ConclusionExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  conclusion?: string;
  emphasis?: string;
  statusLabel?: string;
  statusTone?: ConclusionExampleTone;
  evidenceItems?: ConclusionExampleItem[];
  actionItems?: ConclusionExampleItem[];
  items?: ConclusionExampleItem[];
  config?: ConclusionExampleCardConfig;
}

const props = defineProps<Props>();

const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;

const defaultEvidenceItems: ConclusionExampleItem[] = [
  { label: '增长来源', value: '线上直营贡献提升', tone: 'success' },
  { label: '关键证据', value: '华东复购率走高', tone: 'primary' },
];

const defaultActionItems: ConclusionExampleItem[] = [
  { label: '优先动作', value: '锁定高转化渠道', tone: 'primary' },
  { label: '闭环事项', value: '库存预警本周确认', tone: 'warning' },
];

const defaultTitleConfig: Required<ConclusionExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 11,
  lineHeightPx: 14,
  color: '',
  unitVisible: true,
  unitFontSizePx: 10,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<ConclusionExampleLayoutConfig> = {
  paddingPx: 5,
  gapPx: 2,
  titleHeightPx: 20,
  contentGapPx: 5,
  orientation: 'auto',
};

const defaultCoreConfig: Required<ConclusionExampleCoreConfig> = {
  label: '核心结论',
  minFontSizePx: 10,
  maxFontSizePx: 18,
  minEmphasisFontSizePx: 8,
  maxEmphasisFontSizePx: 12,
};

const defaultListConfig: Required<ConclusionExampleListConfig> = {
  heading: '补充说明',
  maxVisibleItems: 4,
  minFontSizePx: 8,
  maxFontSizePx: 12,
  minValueFontSizePx: 8,
  maxValueFontSizePx: 11,
};

const defaultToneConfig: Required<ConclusionExampleToneConfig> = {
  primary: '#0057d9',
  success: '#12a150',
  warning: '#dc8a00',
  danger: '#d92d20',
  neutral: '#667085',
  border: 'rgba(0, 87, 217, 0.16)',
  text: '#15304f',
  muted: '#667085',
  panel: 'rgba(0, 87, 217, 0.035)',
  panelStrong: 'rgba(18, 161, 80, 0.08)',
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

const getTone = (tone?: string): ConclusionExampleTone => {
  if (tone === 'success' || tone === 'warning' || tone === 'danger' || tone === 'neutral') {
    return tone;
  }

  return 'primary';
};

const resolvedTitle = computed<Required<ConclusionExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<ConclusionExampleLayoutConfig>>(() => ({
  ...defaultLayoutConfig,
  ...(props.config?.layout ?? {}),
  paddingPx: clampNumber(props.config?.layout?.paddingPx, 0, 24, defaultLayoutConfig.paddingPx),
  gapPx: clampNumber(props.config?.layout?.gapPx, 0, 16, defaultLayoutConfig.gapPx),
  titleHeightPx: clampNumber(props.config?.layout?.titleHeightPx, 16, 40, defaultLayoutConfig.titleHeightPx),
  contentGapPx: clampNumber(props.config?.layout?.contentGapPx, 2, 14, defaultLayoutConfig.contentGapPx),
  orientation: props.config?.layout?.orientation ?? defaultLayoutConfig.orientation,
}));

const resolvedCore = computed<Required<ConclusionExampleCoreConfig>>(() => ({
  ...defaultCoreConfig,
  ...(props.config?.core ?? {}),
  minFontSizePx: clampNumber(props.config?.core?.minFontSizePx, 8, 18, defaultCoreConfig.minFontSizePx),
  maxFontSizePx: clampNumber(props.config?.core?.maxFontSizePx, 9, 24, defaultCoreConfig.maxFontSizePx),
  minEmphasisFontSizePx: clampNumber(props.config?.core?.minEmphasisFontSizePx, 7, 14, defaultCoreConfig.minEmphasisFontSizePx),
  maxEmphasisFontSizePx: clampNumber(props.config?.core?.maxEmphasisFontSizePx, 8, 18, defaultCoreConfig.maxEmphasisFontSizePx),
}));

const resolvedList = computed<Required<ConclusionExampleListConfig>>(() => ({
  ...defaultListConfig,
  ...(props.config?.list ?? {}),
  maxVisibleItems: clampNumber(props.config?.list?.maxVisibleItems, 1, 8, defaultListConfig.maxVisibleItems),
  minFontSizePx: clampNumber(props.config?.list?.minFontSizePx, 7, 14, defaultListConfig.minFontSizePx),
  maxFontSizePx: clampNumber(props.config?.list?.maxFontSizePx, 8, 18, defaultListConfig.maxFontSizePx),
  minValueFontSizePx: clampNumber(props.config?.list?.minValueFontSizePx, 7, 14, defaultListConfig.minValueFontSizePx),
  maxValueFontSizePx: clampNumber(props.config?.list?.maxValueFontSizePx, 8, 16, defaultListConfig.maxValueFontSizePx),
}));

const resolvedTones = computed<Required<ConclusionExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '结论卡片');
const unit = computed(() => props.unit?.trim() || '经营结论');
const statusLabel = computed(() => props.statusLabel?.trim() || '建议推进');
const statusTone = computed(() => getTone(props.statusTone));
const conclusion = computed(() => props.conclusion?.trim() || '整体经营表现稳中向好，收入增长具备持续性，但库存与费用偏差仍需跟进。');
const emphasis = computed(() => props.emphasis?.trim() || '继续放大高转化渠道，并在本周闭环库存预警。');
const hasVisibleTitle = computed(() => resolvedTitle.value.visible || resolvedTitle.value.unitVisible);
const supportGroups = computed(() => {
  const hasGroupedItems = Boolean(props.evidenceItems?.length || props.actionItems?.length);
  const fallbackItems = props.items?.length ? props.items : [...defaultEvidenceItems, ...defaultActionItems];
  const evidenceItems = hasGroupedItems ? props.evidenceItems ?? [] : fallbackItems.slice(0, Math.ceil(fallbackItems.length / 2));
  const actionItems = hasGroupedItems ? props.actionItems ?? [] : fallbackItems.slice(Math.ceil(fallbackItems.length / 2));
  const maxVisibleItems = resolvedList.value.maxVisibleItems;
  const maxEvidenceItems = actionItems.length ? Math.max(1, Math.ceil(maxVisibleItems / 2)) : maxVisibleItems;
  const maxActionItems = Math.max(1, maxVisibleItems - Math.min(evidenceItems.length, maxEvidenceItems));

  return [
    { id: 'evidence', title: '结论依据', items: evidenceItems.slice(0, maxEvidenceItems) },
    { id: 'action', title: '应对动作', items: actionItems.slice(0, maxActionItems) },
  ].filter((group) => group.items.length);
});
const visibleItems = computed(() => supportGroups.value.flatMap((group) => group.items));
const supportVisible = computed(() => supportGroups.value.length > 0);

const orientation = computed<'vertical' | 'horizontal'>(() => {
  const configured = resolvedLayout.value.orientation;

  if (configured === 'vertical' || configured === 'horizontal') {
    return configured;
  }

  const width = containerSize.value.width || 320;
  const height = containerSize.value.height || 188;
  const titleRowHeight = hasVisibleTitle.value ? resolvedLayout.value.titleHeightPx : 0;
  const contentHeight = Math.max(height - resolvedLayout.value.paddingPx * 2 - titleRowHeight - resolvedLayout.value.gapPx, 1);

  return width >= Math.max(260, contentHeight * 1.52) ? 'horizontal' : 'vertical';
});

const valueStyle = computed(() => {
  const width = containerSize.value.width || 320;
  const height = containerSize.value.height || 188;
  const layout = resolvedLayout.value;
  const core = resolvedCore.value;
  const list = resolvedList.value;
  const titleConfig = resolvedTitle.value;
  const tones = resolvedTones.value;
  const titleRowHeight = titleConfig.visible || titleConfig.unitVisible ? layout.titleHeightPx : 0;
  const contentHeight = Math.max(height - layout.paddingPx * 2 - titleRowHeight - layout.gapPx, 1);
  const horizontal = orientation.value === 'horizontal';
  const coreWidth = horizontal ? Math.max((width - layout.paddingPx * 2 - layout.contentGapPx) / 2, 1) : Math.max(width - layout.paddingPx * 2, 1);
  const verticalCoreRatio = 1.42;
  const verticalSupportRatio = 1.58;
  const verticalRatioTotal = verticalCoreRatio + verticalSupportRatio;
  const coreHeight = horizontal ? contentHeight : Math.max((contentHeight - layout.contentGapPx) * verticalCoreRatio / verticalRatioTotal, 1);
  const supportWidth = horizontal ? coreWidth : Math.max(width - layout.paddingPx * 2, 1);
  const supportHeight = horizontal ? contentHeight : Math.max((contentHeight - layout.contentGapPx) * verticalSupportRatio / verticalRatioTotal, 1);
  const sectionCount = supportGroups.value.length;
  const preferredSectionColumns = horizontal && sectionCount > 1 ? sectionCount : 1;
  const sectionColumns = preferredSectionColumns > 1 && supportWidth / preferredSectionColumns >= 180 ? preferredSectionColumns : 1;
  const listColumns = 1;
  const itemCount = Math.max(visibleItems.value.length, 1);
  const maxGroupRows = Math.max(...supportGroups.value.map((group) => group.items.length), 1);
  const listRows = sectionColumns > 1 ? maxGroupRows : Math.ceil(itemCount / listColumns);
  const sectionGap = sectionCount > 1 ? 4 : 0;
  const sectionTitleHeight = (sectionColumns > 1 ? 1 : sectionCount) * 12;
  const sectionGapTotal = sectionColumns > 1 ? 0 : sectionGap * Math.max(sectionCount - 1, 0);
  const supportHeadingHeight = 0;
  const rawRowHeight = Math.max(
    (supportHeight - supportHeadingHeight - sectionTitleHeight - sectionGapTotal - 3 * Math.max(listRows - 1, 0)) / Math.max(listRows, 1),
    1,
  );
  const listRowHeight = Math.round(Math.min(Math.max(rawRowHeight, 16), horizontal ? 34 : 28) * 10) / 10;
  const rowHeight = listRowHeight;
  const longestLabel = Math.max(...visibleItems.value.map((item) => getWeightedTextLength(item.label)), 1);
  const longestValue = Math.max(...visibleItems.value.map((item) => getWeightedTextLength(item.value)), 1);
  const sectionSupportWidth = sectionColumns > 1
    ? Math.max((supportWidth - sectionGap * Math.max(sectionCount - 1, 0)) / sectionColumns, 1)
    : supportWidth;
  const labelMaxBudget = Math.max(34, Math.min(sectionSupportWidth * 0.34, 64));
  const desiredLabelBudget = Math.max(longestLabel * list.minFontSizePx * 1.04, 34);
  const listLabelBudget = Math.round(Math.min(desiredLabelBudget, labelMaxBudget) * 10) / 10;
  const listValueBudget = Math.max(sectionSupportWidth - listLabelBudget - 31, 34);
  const listLabelSize = listLabelBudget / longestLabel / 1.08;
  const listValueSize = listValueBudget / longestValue / 0.98;
  const coreTextLength = getWeightedTextLength(conclusion.value);
  const coreBudget = Math.max(coreWidth - 20, 40);
  const compactVertical = !horizontal && coreWidth < 230;
  const coreReservedHeight = compactVertical ? 22 : 30;
  const coreLineHeightBudget = compactVertical ? 12 : 13;
  const coreLines = Math.max(2, Math.min(3, Math.floor(Math.max(coreHeight - coreReservedHeight, 28) / coreLineHeightBudget)));
  const coreSizeByWidth = coreBudget * coreLines / Math.max(coreTextLength, 1) / (compactVertical ? 0.88 : 0.95);
  const coreLineHeight = coreLines >= 3 ? 1.12 : 1.18;
  const coreMainHeightBudget = Math.max(coreHeight - (compactVertical ? 38 : 46), 14);
  const coreSizeByHeight = coreMainHeightBudget / coreLines / coreLineHeight;
  const coreFontSize = Math.round(
    clampNumber(Math.min(coreHeight * (compactVertical ? 0.24 : 0.22), coreSizeByWidth, coreSizeByHeight), core.minFontSizePx, core.maxFontSizePx, core.maxFontSizePx) * 10,
  ) / 10;
  const emphasisFontSize = Math.round(
    clampNumber(Math.min(coreFontSize * 0.66, coreHeight * 0.13), core.minEmphasisFontSizePx, core.maxEmphasisFontSizePx, core.maxEmphasisFontSizePx) * 10,
  ) / 10;
  const listFontSize = Math.round(
    clampNumber(Math.min(rowHeight * 0.34, listLabelSize, listValueSize), list.minFontSizePx, list.maxFontSizePx, list.maxFontSizePx) * 10,
  ) / 10;
  const listValueFontSize = Math.round(
    clampNumber(Math.min(rowHeight * 0.36, listValueSize + 0.4), list.minValueFontSizePx, list.maxValueFontSizePx, list.maxValueFontSizePx) * 10,
  ) / 10;

  return {
    '--conclusion-title-row': `${titleRowHeight}px`,
    '--conclusion-card-padding': `${layout.paddingPx}px`,
    '--conclusion-card-gap': `${layout.gapPx}px`,
    '--conclusion-content-gap': `${layout.contentGapPx}px`,
    '--conclusion-title-font-size': `${titleConfig.fontSizePx}px`,
    '--conclusion-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--conclusion-title-color': titleConfig.color || tones.primary,
    '--conclusion-title-underline-opacity': titleConfig.underline ? '1' : '0',
    '--conclusion-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--conclusion-unit-color': titleConfig.unitColor,
    '--conclusion-core-font-size': `${coreFontSize}px`,
    '--conclusion-core-lines': String(coreLines),
    '--conclusion-core-line-height': String(coreLineHeight),
    '--conclusion-emphasis-font-size': `${emphasisFontSize}px`,
    '--conclusion-list-columns': String(listColumns),
    '--conclusion-list-label-width': `${listLabelBudget}px`,
    '--conclusion-list-row-height': `${listRowHeight}px`,
    '--conclusion-section-count': String(Math.max(sectionCount, 1)),
    '--conclusion-section-columns': String(Math.max(sectionColumns, 1)),
    '--conclusion-section-gap': `${sectionGap}px`,
    '--conclusion-list-font-size': `${listFontSize}px`,
    '--conclusion-list-value-font-size': `${listValueFontSize}px`,
    '--conclusion-primary': tones.primary,
    '--conclusion-success': tones.success,
    '--conclusion-warning': tones.warning,
    '--conclusion-danger': tones.danger,
    '--conclusion-neutral': tones.neutral,
    '--conclusion-border': tones.border,
    '--conclusion-text': tones.text,
    '--conclusion-muted': tones.muted,
    '--conclusion-panel': tones.panel,
    '--conclusion-panel-strong': tones.panelStrong,
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
  <section
    ref="rootRef"
    class="conclusion-example-card"
    :class="[`is-${orientation}`, { 'has-support': supportVisible, 'has-title': hasVisibleTitle }]"
    :style="valueStyle"
    aria-label="结论卡片示例"
  >
    <header v-if="hasVisibleTitle" class="conclusion-example-header">
      <span v-if="resolvedTitle.visible" class="conclusion-example-title" :title="title">{{ title }}</span>
      <span v-if="resolvedTitle.unitVisible" class="conclusion-example-unit" :title="unit">{{ unit }}</span>
    </header>

    <div class="conclusion-example-content">
      <section class="conclusion-example-core" :class="`tone-${statusTone}`">
        <div class="conclusion-example-kicker">
          <span class="conclusion-example-kicker-text">{{ resolvedCore.label }}</span>
          <span class="conclusion-example-status">{{ statusLabel }}</span>
        </div>
        <p class="conclusion-example-main" :title="conclusion">{{ conclusion }}</p>
        <p class="conclusion-example-emphasis" :title="emphasis">{{ emphasis }}</p>
      </section>

      <section v-if="supportVisible" class="conclusion-example-support" aria-label="补充说明">
        <div class="conclusion-example-support-body">
          <section v-for="group in supportGroups" :key="group.id" class="conclusion-example-section">
            <div class="conclusion-example-section-title">{{ group.title }}</div>
            <ul class="conclusion-example-list">
              <li v-for="item in group.items" :key="`${group.id}-${item.label}-${item.value}`" class="conclusion-example-item" :class="`tone-${getTone(item.tone)}`">
                <span class="conclusion-example-dot"></span>
                <span class="conclusion-example-item-label" :title="item.label">{{ item.label }}</span>
                <span class="conclusion-example-item-value" :title="item.value">{{ item.value }}</span>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.conclusion-example-card {
  display: grid;
  grid-template-rows:
    var(--conclusion-title-row, 20px)
    minmax(0, 1fr);
  gap: var(--conclusion-card-gap, 2px);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--conclusion-card-padding, 5px);
  background: transparent;
  color: var(--conclusion-text, #15304f);
  container-type: size;
  font-variant-numeric: tabular-nums;
}

.conclusion-example-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 2px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.conclusion-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-self: start;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  padding: 0 0 3px;
  color: var(--conclusion-title-color, var(--conclusion-primary));
  font-size: var(--conclusion-title-font-size, 11px);
  font-weight: 800;
  line-height: var(--conclusion-title-line-height, 14px);
  text-overflow: clip;
  white-space: nowrap;
}

.conclusion-example-title::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, currentColor 0%, color-mix(in srgb, currentColor 26%, transparent) 72%, transparent 100%);
  content: "";
  opacity: var(--conclusion-title-underline-opacity, 1);
}

.conclusion-example-unit {
  justify-self: end;
  max-width: 100%;
  overflow: hidden;
  color: var(--conclusion-unit-color, #667085);
  font-size: var(--conclusion-unit-font-size, 10px);
  font-weight: 700;
  line-height: var(--conclusion-title-line-height, 14px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conclusion-example-content {
  display: grid;
  gap: var(--conclusion-content-gap, 5px);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.conclusion-example-card:not(.has-title) {
  grid-template-rows: minmax(0, 1fr);
}

.conclusion-example-card:not(.has-title) .conclusion-example-content {
  grid-row: 1;
}

.conclusion-example-card.is-vertical .conclusion-example-content {
  grid-template-rows: minmax(0, 1.42fr) minmax(0, 1.58fr);
}

.conclusion-example-card.is-horizontal .conclusion-example-content {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.conclusion-example-card.is-horizontal .conclusion-example-support-body {
  grid-template-columns: repeat(var(--conclusion-section-columns, 1), minmax(0, 1fr));
  grid-template-rows: minmax(0, 1fr);
}

.conclusion-example-card:not(.has-support) .conclusion-example-content {
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
}

.conclusion-example-core,
.conclusion-example-support {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.conclusion-example-core {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 3px;
  padding: 6px 7px;
  border: 1px solid var(--conclusion-border, rgba(0, 87, 217, 0.16));
  border-radius: 6px;
  background:
    linear-gradient(135deg, var(--conclusion-panel-strong, rgba(18, 161, 80, 0.08)), transparent 62%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), var(--conclusion-panel, rgba(0, 87, 217, 0.035)));
}

.conclusion-example-card.is-vertical .conclusion-example-core {
  gap: 2px;
  padding: 4px 6px;
}

.conclusion-example-kicker {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 5px;
  min-width: 0;
  overflow: hidden;
}

.conclusion-example-kicker-text {
  min-width: 0;
  overflow: hidden;
  color: var(--conclusion-muted, #667085);
  font-size: max(8px, calc(var(--conclusion-emphasis-font-size, 10px) - 1px));
  font-weight: 800;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conclusion-example-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 88px;
  min-width: 0;
  height: 17px;
  overflow: hidden;
  padding: 0 6px;
  border-radius: 999px;
  color: var(--conclusion-primary, #0057d9);
  background: color-mix(in srgb, var(--conclusion-primary, #0057d9) 8%, transparent);
  font-size: max(8px, calc(var(--conclusion-emphasis-font-size, 10px) - 1px));
  font-weight: 800;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conclusion-example-card.is-vertical .conclusion-example-status {
  max-width: 70px;
  height: 15px;
  padding: 0 5px;
}

.conclusion-example-core.tone-success .conclusion-example-status {
  color: var(--conclusion-success, #12a150);
  background: color-mix(in srgb, var(--conclusion-success, #12a150) 8%, transparent);
}

.conclusion-example-core.tone-warning .conclusion-example-status {
  color: var(--conclusion-warning, #dc8a00);
  background: color-mix(in srgb, var(--conclusion-warning, #dc8a00) 8%, transparent);
}

.conclusion-example-core.tone-danger .conclusion-example-status {
  color: var(--conclusion-danger, #d92d20);
  background: color-mix(in srgb, var(--conclusion-danger, #d92d20) 8%, transparent);
}

.conclusion-example-core.tone-neutral .conclusion-example-status {
  color: var(--conclusion-neutral, #667085);
  background: color-mix(in srgb, var(--conclusion-neutral, #667085) 8%, transparent);
}

.conclusion-example-main {
  align-self: center;
  display: -webkit-box;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  margin: 0;
  color: var(--conclusion-text, #15304f);
  font-size: var(--conclusion-core-font-size, 14px);
  font-weight: 850;
  line-height: 1.22;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--conclusion-core-lines, 2);
}

.conclusion-example-emphasis {
  min-width: 0;
  overflow: hidden;
  margin: 0;
  color: var(--conclusion-muted, #667085);
  font-size: var(--conclusion-emphasis-font-size, 10px);
  font-weight: 700;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conclusion-example-support {
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  gap: 0;
  padding: 1px 0 0;
}

.conclusion-example-support-heading {
  min-width: 0;
  overflow: hidden;
  color: var(--conclusion-muted, #667085);
  font-size: max(8px, calc(var(--conclusion-list-font-size, 10px) - 1px));
  font-weight: 850;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conclusion-example-support-body {
  display: grid;
  grid-template-rows: repeat(var(--conclusion-section-count, 1), minmax(0, 1fr));
  align-content: stretch;
  gap: var(--conclusion-section-gap, 4px);
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

.conclusion-example-section {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 2px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.conclusion-example-section-title {
  min-width: 0;
  overflow: hidden;
  color: var(--conclusion-title-color, var(--conclusion-primary));
  font-size: max(8px, calc(var(--conclusion-list-font-size, 10px) - 1px));
  font-weight: 850;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conclusion-example-list {
  display: grid;
  grid-template-columns: repeat(var(--conclusion-list-columns, 1), minmax(0, 1fr));
  grid-auto-rows: minmax(0, var(--conclusion-list-row-height, 24px));
  align-content: start;
  gap: 3px 5px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conclusion-example-item {
  display: grid;
  grid-template-columns: 7px minmax(0, var(--conclusion-list-label-width, 34px)) minmax(0, 1fr);
  align-items: center;
  gap: 5px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: 0 6px;
  border: 1px solid color-mix(in srgb, var(--conclusion-primary, #0057d9) 10%, transparent);
  border-radius: 5px;
  background: color-mix(in srgb, var(--conclusion-panel, rgba(0, 87, 217, 0.035)) 68%, transparent);
}

.conclusion-example-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--conclusion-primary, #0057d9) 74%, transparent);
}

.conclusion-example-item.tone-success .conclusion-example-dot {
  background: color-mix(in srgb, var(--conclusion-success, #12a150) 74%, transparent);
}

.conclusion-example-item.tone-warning .conclusion-example-dot {
  background: color-mix(in srgb, var(--conclusion-warning, #dc8a00) 74%, transparent);
}

.conclusion-example-item.tone-danger .conclusion-example-dot {
  background: color-mix(in srgb, var(--conclusion-danger, #d92d20) 74%, transparent);
}

.conclusion-example-item.tone-neutral .conclusion-example-dot {
  background: color-mix(in srgb, var(--conclusion-neutral, #667085) 74%, transparent);
}

.conclusion-example-item-label,
.conclusion-example-item-value {
  min-width: 0;
  overflow: hidden;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conclusion-example-item-label {
  color: var(--conclusion-muted, #667085);
  font-size: var(--conclusion-list-font-size, 10px);
  font-weight: 700;
}

.conclusion-example-item-value {
  color: var(--conclusion-text, #15304f);
  font-size: var(--conclusion-list-value-font-size, 10px);
  font-weight: 760;
}
</style>
