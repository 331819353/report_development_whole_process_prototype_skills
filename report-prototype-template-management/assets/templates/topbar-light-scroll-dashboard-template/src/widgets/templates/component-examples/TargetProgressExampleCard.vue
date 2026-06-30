<script setup lang="ts">
import { Clock3, Target, TriangleAlert } from '@lucide/vue';
import { computed } from 'vue';
import type { Component } from 'vue';
import type { TemplateCarriedWidgetTone, WidgetContext } from '../../types';

interface TargetProgressDetailItem {
  label: string;
  value: string | number;
  icon?: 'target' | 'current' | 'gap';
}

interface TargetProgressExampleTitleConfig {
  visible?: boolean;
  underline?: boolean;
  fontSizePx?: number;
  lineHeightPx?: number;
  color?: string;
  unitVisible?: boolean;
  unitFontSizePx?: number;
  unitColor?: string;
}

interface TargetProgressExampleLayoutConfig {
  paddingPx?: number;
  gapPx?: number;
  titleRatio?: number;
  bodyRatio?: number;
  topRatio?: number;
  progressRatio?: number;
  valueRatio?: number;
  detailRatio?: number;
}

interface TargetProgressExampleValueConfig {
  minFontSizePx?: number;
  maxFontSizePx?: number;
  percentFontRatio?: number;
}

interface TargetProgressExampleDetailConfig {
  iconSizePx?: number;
  iconGraphicSizePx?: number;
  labelFontSizePx?: number;
  valueFontSizePx?: number;
  dividerColor?: string;
  dividerOpacity?: number;
}

interface TargetProgressExampleProgressConfig {
  labelVisible?: boolean;
  heightPx?: number;
  trackColor?: string;
  trackBorderColor?: string;
  fillStartColor?: string;
  fillEndColor?: string;
  thumbVisible?: boolean;
  markerVisible?: boolean;
}

interface TargetProgressExampleToneConfig {
  primary?: string;
  warning?: string;
  neutral?: string;
}

interface TargetProgressExampleCardConfig {
  title?: TargetProgressExampleTitleConfig;
  layout?: TargetProgressExampleLayoutConfig;
  value?: TargetProgressExampleValueConfig;
  detail?: TargetProgressExampleDetailConfig;
  progress?: TargetProgressExampleProgressConfig;
  tones?: TargetProgressExampleToneConfig;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  title?: string;
  unit?: string;
  value?: string | number;
  valueSuffix?: string;
  maxDecimals?: number;
  tone?: TemplateCarriedWidgetTone;
  targetValue?: string | number;
  currentValue?: string | number;
  gapValue?: string | number;
  targetLabel?: string;
  currentLabel?: string;
  gapLabel?: string;
  progressLabel?: string;
  goalLabel?: string;
  details?: TargetProgressDetailItem[];
  config?: TargetProgressExampleCardConfig;
}

const props = defineProps<Props>();

const titleAreaHeightPx = 20;

const clampNumber = (value: unknown, min: number, max: number, fallback: number) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return fallback;
  }

  return Math.min(Math.max(numberValue, min), max);
};

const normalizeNumberText = (value: string | number) => {
  const rawValue = String(value).trim().replace(/,/g, '');
  const match = rawValue.match(/^(-?)(\d+)(?:\.(\d+))?$/);

  if (!match) {
    return String(value).trim();
  }

  const [, sign, integerPart, decimalPart] = match;
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${sign}${formattedInteger}${decimalPart ? `.${decimalPart}` : ''}`;
};

const getNumericValue = (value: string | number | undefined, fallback: number) => {
  const parsed = Number(String(value ?? '').replace(/,/g, ''));

  return Number.isFinite(parsed) ? parsed : fallback;
};

const defaultTitleConfig: Required<TargetProgressExampleTitleConfig> = {
  visible: true,
  underline: true,
  fontSizePx: 11,
  lineHeightPx: 14,
  color: '',
  unitVisible: true,
  unitFontSizePx: 10,
  unitColor: '#667085',
};

const defaultLayoutConfig: Required<TargetProgressExampleLayoutConfig> = {
  paddingPx: 5,
  gapPx: 2,
  titleRatio: 1,
  bodyRatio: 5,
  topRatio: 3,
  progressRatio: 1,
  valueRatio: 1,
  detailRatio: 1,
};

const defaultValueConfig: Required<TargetProgressExampleValueConfig> = {
  minFontSizePx: 32,
  maxFontSizePx: 82,
  percentFontRatio: 0.34,
};

const defaultDetailConfig: Required<TargetProgressExampleDetailConfig> = {
  iconSizePx: 24,
  iconGraphicSizePx: 16,
  labelFontSizePx: 12,
  valueFontSizePx: 13,
  dividerColor: '0, 87, 217',
  dividerOpacity: 0.16,
};

const defaultProgressConfig: Required<TargetProgressExampleProgressConfig> = {
  labelVisible: true,
  heightPx: 15,
  trackColor: 'rgba(47, 155, 255, 0.12)',
  trackBorderColor: 'rgba(0, 87, 217, 0.34)',
  fillStartColor: '#2f9bff',
  fillEndColor: '#0057d9',
  thumbVisible: false,
  markerVisible: false,
};

const defaultToneConfig: Required<TargetProgressExampleToneConfig> = {
  primary: '#0057d9',
  warning: '#0057d9',
  neutral: '#667085',
};

const resolvedTitle = computed<Required<TargetProgressExampleTitleConfig>>(() => ({
  ...defaultTitleConfig,
  ...(props.config?.title ?? {}),
  fontSizePx: clampNumber(props.config?.title?.fontSizePx, 8, 22, defaultTitleConfig.fontSizePx),
  lineHeightPx: clampNumber(props.config?.title?.lineHeightPx, 10, 28, defaultTitleConfig.lineHeightPx),
  unitFontSizePx: clampNumber(props.config?.title?.unitFontSizePx, 8, 18, defaultTitleConfig.unitFontSizePx),
}));

const resolvedLayout = computed<Required<TargetProgressExampleLayoutConfig>>(() => ({
  ...defaultLayoutConfig,
  ...(props.config?.layout ?? {}),
  paddingPx: clampNumber(props.config?.layout?.paddingPx, 0, 24, defaultLayoutConfig.paddingPx),
  gapPx: clampNumber(props.config?.layout?.gapPx, 0, 16, defaultLayoutConfig.gapPx),
  titleRatio: clampNumber(props.config?.layout?.titleRatio, 0, 8, defaultLayoutConfig.titleRatio),
  bodyRatio: clampNumber(props.config?.layout?.bodyRatio, 1, 16, defaultLayoutConfig.bodyRatio),
  topRatio: clampNumber(props.config?.layout?.topRatio, 1, 12, defaultLayoutConfig.topRatio),
  progressRatio: clampNumber(props.config?.layout?.progressRatio, 1, 12, defaultLayoutConfig.progressRatio),
  valueRatio: clampNumber(props.config?.layout?.valueRatio, 1, 8, defaultLayoutConfig.valueRatio),
  detailRatio: clampNumber(props.config?.layout?.detailRatio, 1, 8, defaultLayoutConfig.detailRatio),
}));

const resolvedValue = computed<Required<TargetProgressExampleValueConfig>>(() => ({
  ...defaultValueConfig,
  ...(props.config?.value ?? {}),
  minFontSizePx: clampNumber(props.config?.value?.minFontSizePx, 16, 90, defaultValueConfig.minFontSizePx),
  maxFontSizePx: clampNumber(props.config?.value?.maxFontSizePx, 24, 120, defaultValueConfig.maxFontSizePx),
  percentFontRatio: clampNumber(props.config?.value?.percentFontRatio, 0.18, 0.62, defaultValueConfig.percentFontRatio),
}));

const resolvedDetail = computed<Required<TargetProgressExampleDetailConfig>>(() => ({
  ...defaultDetailConfig,
  ...(props.config?.detail ?? {}),
  iconSizePx: clampNumber(props.config?.detail?.iconSizePx, 14, 42, defaultDetailConfig.iconSizePx),
  iconGraphicSizePx: clampNumber(props.config?.detail?.iconGraphicSizePx, 10, 28, defaultDetailConfig.iconGraphicSizePx),
  labelFontSizePx: clampNumber(props.config?.detail?.labelFontSizePx, 8, 20, defaultDetailConfig.labelFontSizePx),
  valueFontSizePx: clampNumber(props.config?.detail?.valueFontSizePx, 9, 24, defaultDetailConfig.valueFontSizePx),
  dividerOpacity: clampNumber(props.config?.detail?.dividerOpacity, 0, 1, defaultDetailConfig.dividerOpacity),
}));

const resolvedProgress = computed<Required<TargetProgressExampleProgressConfig>>(() => ({
  ...defaultProgressConfig,
  ...(props.config?.progress ?? {}),
  heightPx: clampNumber(props.config?.progress?.heightPx, 8, 32, defaultProgressConfig.heightPx),
}));

const resolvedTones = computed<Required<TargetProgressExampleToneConfig>>(() => ({
  ...defaultToneConfig,
  ...(props.config?.tones ?? {}),
}));

const title = computed(() => props.title?.trim() || '目标进度卡片');
const unit = computed(() => props.unit?.trim() || '单位：万元');
const valueText = computed(() => normalizeNumberText(props.value ?? 86));
const valueSuffix = computed(() => props.valueSuffix?.trim() ?? '%');
const valueFitScale = computed(() => {
  const visibleTextLength = `${valueText.value}${valueSuffix.value}`.replace(/\s/g, '').length;

  if (visibleTextLength <= 4) {
    return 1;
  }

  return clampNumber(4.4 / visibleTextLength, 0.48, 1, 1);
});
const progressValue = computed(() => clampNumber(getNumericValue(props.value, 86), 0, 100, 86));
const detailItems = computed<TargetProgressDetailItem[]>(() => {
  if (props.details?.length) {
    return props.details.slice(0, 3);
  }

  return [
    { label: props.targetLabel ?? '目标值', value: props.targetValue ?? 100, icon: 'target' },
    { label: props.currentLabel ?? '当前值', value: props.currentValue ?? props.value ?? 86, icon: 'current' },
    { label: props.gapLabel ?? '差距', value: props.gapValue ?? 14, icon: 'gap' },
  ];
});

const getDetailIcon = (item: TargetProgressDetailItem, index: number): Component => {
  const icon = item.icon ?? (['target', 'current', 'gap'][index] as TargetProgressDetailItem['icon']);

  if (icon === 'current') {
    return Clock3;
  }

  if (icon === 'gap') {
    return TriangleAlert;
  }

  return Target;
};

const progressFillStyle = computed(() => ({
  width: `${progressValue.value}%`,
}));

const progressRateStyle = computed(() => ({
  left: `clamp(18px, ${progressValue.value}%, calc(100% - 46px))`,
}));

const valueStyle = computed(() => {
  const layout = resolvedLayout.value;
  const titleConfig = resolvedTitle.value;
  const valueConfig = resolvedValue.value;
  const detailConfig = resolvedDetail.value;
  const progressConfig = resolvedProgress.value;
  const tones = resolvedTones.value;

  return {
    '--target-progress-card-title-row': `${titleAreaHeightPx}px`,
    '--target-progress-card-body-row': `${layout.bodyRatio}fr`,
    '--target-progress-card-top-row': `${layout.topRatio}fr`,
    '--target-progress-card-progress-row': `${layout.progressRatio}fr`,
    '--target-progress-card-value-col': `${layout.valueRatio}fr`,
    '--target-progress-card-detail-col': `${layout.detailRatio}fr`,
    '--target-progress-card-gap': `${layout.gapPx}px`,
    '--target-progress-card-padding': `${layout.paddingPx}px`,
    '--target-progress-title-font-size': `${titleConfig.fontSizePx}px`,
    '--target-progress-title-line-height': `${titleConfig.lineHeightPx}px`,
    '--target-progress-title-color': titleConfig.color || tones.primary,
    '--target-progress-title-underline-opacity': titleConfig.underline ? '1' : '0',
    '--target-progress-unit-font-size': `${titleConfig.unitFontSizePx}px`,
    '--target-progress-unit-color': titleConfig.unitColor,
    '--target-progress-value-min-size': `${valueConfig.minFontSizePx}px`,
    '--target-progress-value-max-size': `${valueConfig.maxFontSizePx}px`,
    '--target-progress-value-affix-ratio': `${valueConfig.percentFontRatio}`,
    '--target-progress-value-fit-scale': `${valueFitScale.value}`,
    '--target-progress-primary-color': tones.primary,
    '--target-progress-warning-color': tones.warning,
    '--target-progress-neutral-color': tones.neutral,
    '--target-progress-detail-icon-size': `${detailConfig.iconSizePx}px`,
    '--target-progress-detail-icon-graphic-size': `${detailConfig.iconGraphicSizePx}px`,
    '--target-progress-detail-label-size': `${detailConfig.labelFontSizePx}px`,
    '--target-progress-detail-value-size': `${detailConfig.valueFontSizePx}px`,
    '--target-progress-detail-divider': `rgba(${detailConfig.dividerColor}, ${detailConfig.dividerOpacity})`,
    '--target-progress-track-height': `${progressConfig.heightPx}px`,
    '--target-progress-track-color': progressConfig.trackColor,
    '--target-progress-track-border-color': progressConfig.trackBorderColor,
    '--target-progress-fill-start': progressConfig.fillStartColor,
    '--target-progress-fill-end': progressConfig.fillEndColor,
  };
});
</script>

<template>
  <section class="target-progress-example-card" :style="valueStyle" aria-label="目标进度卡片示例">
    <header v-if="resolvedTitle.visible || resolvedTitle.unitVisible" class="target-progress-example-header">
      <span v-if="resolvedTitle.visible" class="target-progress-example-title" :title="title">{{ title }}</span>
      <span v-if="resolvedTitle.unitVisible" class="target-progress-example-unit" :title="unit">{{ unit }}</span>
    </header>

    <div class="target-progress-example-body">
      <section class="target-progress-example-top">
        <div class="target-progress-example-value" aria-label="达成值">
          <span class="target-progress-example-value-inner">
            <strong>{{ valueText }}</strong>
            <span v-if="valueSuffix" class="target-progress-example-value-unit">{{ valueSuffix }}</span>
          </span>
        </div>

        <div class="target-progress-example-details" aria-label="目标进度明细">
          <div
            v-for="(item, index) in detailItems"
            :key="`${item.label}:${item.value}`"
            class="target-progress-example-detail"
          >
            <span class="target-progress-example-detail-icon" aria-hidden="true">
              <component
                :is="getDetailIcon(item, index)"
                :size="resolvedDetail.iconGraphicSizePx"
                :stroke-width="3"
              />
            </span>
            <span class="target-progress-example-detail-label">{{ item.label }}:</span>
            <strong>{{ normalizeNumberText(item.value) }}</strong>
          </div>
        </div>
      </section>

      <section class="target-progress-example-progress" aria-label="达成进度">
        <div v-if="resolvedProgress.labelVisible" class="target-progress-example-progress-head">
          <span>{{ progressLabel ?? '达成进度' }}</span>
          <b>100%</b>
        </div>
        <div class="target-progress-example-progress-track">
          <i :style="progressFillStyle"></i>
        </div>
        <div class="target-progress-example-progress-foot">
          <strong :style="progressRateStyle">{{ valueText }}{{ valueSuffix }}</strong>
          <span>{{ goalLabel ?? '目标' }}</span>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.target-progress-example-card {
  --target-progress-primary-color: #0057d9;
  display: grid;
  grid-template-rows:
    var(--target-progress-card-title-row, 20px)
    minmax(0, var(--target-progress-card-body-row, 5fr));
  gap: var(--target-progress-card-gap, 2px);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--target-progress-card-padding, 5px);
  border: 0;
  border-radius: 0;
  background: transparent;
  container-type: size;
  color: var(--text-strong, #101828);
  font-variant-numeric: tabular-nums;
}

.target-progress-example-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 2px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.target-progress-example-title {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-self: start;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  padding: 0 0 3px;
  color: var(--target-progress-title-color, var(--target-progress-primary-color));
  font-size: var(--target-progress-title-font-size, 11px);
  font-weight: 800;
  line-height: var(--target-progress-title-line-height, 14px);
  text-overflow: clip;
  white-space: nowrap;
}

.target-progress-example-title::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, currentColor 0%, color-mix(in srgb, currentColor 26%, transparent) 72%, transparent 100%);
  content: "";
  opacity: var(--target-progress-title-underline-opacity, 1);
}

.target-progress-example-unit {
  justify-self: end;
  max-width: 100%;
  overflow: hidden;
  color: var(--target-progress-unit-color, #667085);
  font-size: var(--target-progress-unit-font-size, 10px);
  font-weight: 700;
  line-height: var(--target-progress-title-line-height, 14px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.target-progress-example-body {
  display: grid;
  grid-template-rows:
    minmax(0, var(--target-progress-card-top-row, 3fr))
    minmax(0, var(--target-progress-card-progress-row, 1fr));
  gap: clamp(2px, 1.8cqh, 6px);
  min-width: 0;
  min-height: 0;
}

.target-progress-example-top {
  display: grid;
  grid-template-columns:
    minmax(0, var(--target-progress-card-value-col, 1fr))
    minmax(0, var(--target-progress-card-detail-col, 1fr));
  align-items: center;
  gap: clamp(6px, 3.2cqw, 14px);
  min-width: 0;
  min-height: 0;
}

.target-progress-example-value {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--target-progress-primary-color);
  line-height: 0.9;
}

.target-progress-example-value-inner {
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  max-width: 100%;
  min-width: 0;
}

.target-progress-example-value strong {
  flex: 0 1 auto;
  min-width: 0;
  overflow: visible;
  font-size: clamp(14px, calc(min(34cqw, 42cqh) * var(--target-progress-value-fit-scale, 1)), var(--target-progress-value-max-size, 82px));
  font-weight: 900;
  letter-spacing: 0;
  text-align: center;
  text-overflow: clip;
  white-space: nowrap;
}

.target-progress-example-value-unit {
  flex: 0 0 auto;
  color: var(--target-progress-primary-color);
  font-size: clamp(12px, calc(min(34cqw, 42cqh) * var(--target-progress-value-affix-ratio, 0.34) * var(--target-progress-value-fit-scale, 1)), 34px);
  font-weight: 900;
  line-height: 1.08;
}

.target-progress-example-details {
  display: grid;
  align-content: center;
  gap: clamp(4px, 2.7cqh, 9px);
  min-width: 0;
  min-height: 0;
}

.target-progress-example-detail {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  align-items: center;
  gap: clamp(4px, 1.8cqw, 7px);
  min-width: 0;
  min-height: 0;
  padding-bottom: clamp(2px, 1.3cqh, 5px);
  border-bottom: 1px solid var(--target-progress-detail-divider, rgba(0, 87, 217, 0.16));
}

.target-progress-example-detail-icon {
  display: inline-grid;
  width: var(--target-progress-detail-icon-size, 24px);
  height: var(--target-progress-detail-icon-size, 24px);
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--target-progress-primary-color) 18%, transparent);
  border-radius: 999px;
  color: var(--target-progress-primary-color);
  background: color-mix(in srgb, var(--target-progress-primary-color) 8%, #ffffff);
}

.target-progress-example-detail-label {
  overflow: hidden;
  color: #2f3b4e;
  font-size: var(--target-progress-detail-label-size, 12px);
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.target-progress-example-detail strong {
  overflow: hidden;
  color: var(--target-progress-primary-color);
  font-size: var(--target-progress-detail-value-size, 13px);
  font-weight: 900;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.target-progress-example-progress {
  display: grid;
  grid-template-rows: auto minmax(0, auto) auto;
  align-content: center;
  gap: clamp(1px, 1.1cqh, 3px);
  min-width: 0;
  min-height: 0;
}

.target-progress-example-progress-head,
.target-progress-example-progress-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  min-height: 0;
}

.target-progress-example-progress-head span {
  color: #4e5d6e;
  font-size: clamp(9px, 4.4cqh, 12px);
  font-weight: 800;
}

.target-progress-example-progress-head b,
.target-progress-example-progress-foot span {
  color: var(--target-progress-neutral-color, #667085);
  font-size: clamp(8px, 4cqh, 11px);
  font-weight: 800;
}

.target-progress-example-progress-track {
  position: relative;
  height: var(--target-progress-track-height, 15px);
  padding: 2px;
  overflow: hidden;
  border: 1px solid var(--target-progress-track-border-color, rgba(0, 87, 217, 0.34));
  border-radius: 5px;
  background: var(--target-progress-track-color, rgba(47, 155, 255, 0.12));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.78);
}

.target-progress-example-progress-track i {
  display: block;
  width: 0;
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--target-progress-fill-start, #2f9bff), var(--target-progress-fill-end, #0057d9));
}

.target-progress-example-progress-foot {
  position: relative;
  height: clamp(10px, 4.7cqh, 14px);
}

.target-progress-example-progress-foot strong {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  color: var(--target-progress-primary-color);
  font-size: clamp(9px, 4.2cqh, 12px);
  font-weight: 900;
  white-space: nowrap;
}

.target-progress-example-progress-foot span {
  margin-left: auto;
}

@container (max-aspect-ratio: 1 / 1) {
  .target-progress-example-top {
    grid-template-columns: none;
    grid-template-rows:
      minmax(0, var(--target-progress-card-value-col, 1fr))
      minmax(0, var(--target-progress-card-detail-col, 1fr));
    align-items: stretch;
    gap: clamp(4px, 2cqh, 8px);
  }

  .target-progress-example-value {
    place-items: center;
  }

  .target-progress-example-value strong {
    font-size: clamp(14px, calc(min(38cqw, 28cqh) * var(--target-progress-value-fit-scale, 1)), var(--target-progress-value-max-size, 82px));
  }

  .target-progress-example-details {
    align-content: start;
    gap: clamp(2px, 1.6cqh, 5px);
  }

  .target-progress-example-detail {
    padding-bottom: clamp(1px, 1cqh, 3px);
  }
}
</style>
