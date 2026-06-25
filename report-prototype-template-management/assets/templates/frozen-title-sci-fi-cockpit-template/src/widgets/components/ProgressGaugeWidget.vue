<script setup lang="ts">
import { computed } from 'vue';
import type { WidgetContext } from '../types';

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
type ProgressShape = 'circle' | 'rect' | 'tank';

interface Props {
  context: WidgetContext;
  data?: unknown[];
  label?: string;
  progress?: number;
  description?: string;
  tone?: Tone;
  showCopy?: boolean;
  shape?: ProgressShape;
}

const props = defineProps<Props>();

const label = computed(() => props.label ?? '经营健康度');
const description = computed(() => props.description ?? '结构稳定，低风险指标继续观察。');
const tone = computed(() => props.tone ?? 'success');
const showCopy = computed(() => props.showCopy ?? true);
const shape = computed(() => props.shape ?? 'circle');
const progressValue = computed(() => Math.min(100, Math.max(0, props.progress ?? 78)));
const progressStyle = computed(() => ({
  '--progress': `${progressValue.value}%`,
  '--empty-progress': `${100 - progressValue.value}%`,
}));
</script>

<template>
  <section class="template-carried-progress" :class="[`tone-${tone}`, `shape-${shape}`, { 'is-ring-only': !showCopy }]">
    <div v-if="shape === 'tank'" class="progress-tank" :style="progressStyle" aria-label="矩形水箱进度">
      <div class="tank-frame">
        <span class="tank-fill"></span>
        <span class="tank-waterline"></span>
        <strong>{{ progressValue }}</strong>
      </div>
    </div>
    <div v-else class="progress-ring" :style="progressStyle">
      <strong>{{ progressValue }}<span>%</span></strong>
    </div>
    <div v-if="showCopy" class="progress-copy">
      <p>{{ label }}</p>
      <span>{{ description }}</span>
    </div>
  </section>
</template>

<style scoped>
.template-carried-progress {
  --tone-color: #0f8f5f;
  container-type: size;
  display: grid;
  grid-template-columns: minmax(72px, 0.48fr) minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-variant-numeric: tabular-nums;
}

.template-carried-progress.is-ring-only {
  grid-template-columns: minmax(0, 1fr);
  place-items: center;
}

.template-carried-progress.shape-rect {
  grid-template-columns: minmax(0, 1fr);
}

.template-carried-progress.shape-tank {
  grid-template-columns: minmax(0, 1fr);
}

.tone-primary {
  --tone-color: #004ac6;
}

.tone-warning {
  --tone-color: #b76b00;
}

.tone-danger {
  --tone-color: #ba1a1a;
}

.progress-ring {
  position: relative;
  container-type: size;
  display: grid;
  width: min(88px, 100%);
  aspect-ratio: 1;
  place-items: center;
  justify-self: center;
  border-radius: 50%;
  background: conic-gradient(var(--tone-color) var(--progress), var(--progress-track-background, rgba(100, 116, 139, 0.16)) 0);
}

.template-carried-progress.is-ring-only .progress-ring {
  width: min(96px, 82%);
}

.template-carried-progress.shape-rect .progress-ring {
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  min-height: 52px;
  aspect-ratio: auto;
  border-radius: min(18px, 24%);
  background: linear-gradient(90deg, var(--tone-color) var(--progress), var(--progress-track-background, rgba(100, 116, 139, 0.16)) 0);
}

.progress-ring::after {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: var(--progress-ring-core-background, rgba(255, 255, 255, 0.82));
  content: "";
}

.template-carried-progress.shape-rect .progress-ring::after {
  inset: clamp(5px, 8%, 11px);
  border-radius: min(13px, 20%);
  background: var(--progress-ring-core-background, rgba(255, 255, 255, 0.84));
  box-shadow: inset 0 0 0 1px var(--progress-ring-core-border, rgba(0, 74, 198, 0.08));
}

.progress-tank {
  container-type: size;
  display: grid;
  width: 66.666%;
  height: 66.666%;
  min-width: 0;
  min-height: 0;
  padding: clamp(1px, 1.8cqw, 3px);
  place-items: stretch;
  justify-self: center;
  align-self: center;
}

.tank-frame {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  overflow: hidden;
  border: 1px solid var(--tank-frame-border, rgba(0, 74, 198, 0.28));
  border-radius: clamp(7px, 7cqw, 12px);
  background: var(--tank-frame-background, rgba(232, 242, 255, 0.82));
  box-shadow: none;
}

.tank-frame::before {
  position: absolute;
  inset: clamp(4px, 4cqw, 7px);
  z-index: 4;
  border: 1px solid var(--tank-inner-border, rgba(0, 74, 198, 0.12));
  border-radius: clamp(4px, 4cqw, 8px);
  content: "";
  pointer-events: none;
}

.tank-frame::after {
  position: absolute;
  top: 13%;
  right: clamp(5px, 5cqw, 9px);
  bottom: 13%;
  z-index: 5;
  width: clamp(7px, 8cqw, 12px);
  border-radius: 999px;
  background:
    repeating-linear-gradient(
      180deg,
      rgba(0, 74, 198, 0.3) 0 1px,
      transparent 1px 7px
    );
  content: "";
  opacity: 0.42;
  pointer-events: none;
}

.tank-fill {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--progress);
  overflow: hidden;
  background:
    repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0 1px, transparent 1px 8px),
    linear-gradient(180deg, #3aa7ff 0%, #0057d9 100%);
  box-shadow: none;
}

.tank-fill::before,
.tank-fill::after {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 3;
  content: "";
  pointer-events: none;
}

.tank-fill::before {
  top: 0;
  height: clamp(2px, 3cqh, 4px);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  opacity: 0.82;
}

.tank-fill::after {
  inset: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), transparent 42% 72%, rgba(255, 255, 255, 0.14));
  opacity: 0.5;
}

.tank-waterline {
  position: absolute;
  right: 8px;
  bottom: calc(var(--progress) - 1px);
  left: 8px;
  z-index: 6;
  height: 2px;
  border-radius: 999px;
  background: rgba(0, 74, 198, 0.56);
  box-shadow: none;
  opacity: 0.7;
}

.progress-tank strong {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: baseline;
  gap: 2px;
  padding: clamp(3px, 3.8cqw, 6px) clamp(8px, 7cqw, 13px);
  border: 1px solid var(--tank-value-border, rgba(0, 74, 198, 0.16));
  border-radius: 999px;
  color: var(--tank-value-color, #0057d9);
  background: var(--tank-value-background, rgba(255, 255, 255, 0.9));
  box-shadow: none;
  font-size: clamp(20px, 29cqh, 33px);
  font-weight: 900;
  line-height: 1;
}

.progress-ring strong {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: baseline;
  gap: 2px;
  color: var(--tone-color);
  font-size: clamp(20px, 22cqh, 30px);
  font-weight: 800;
  line-height: 1;
}

.progress-ring span {
  color: var(--muted, #667085);
  font-size: 12px;
  font-weight: 650;
}

.progress-tank strong span {
  font-size: 12px;
  font-weight: 700;
}

.progress-copy {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.progress-copy p {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-copy span {
  display: -webkit-box;
  min-width: 0;
  overflow: hidden;
  color: var(--muted, #667085);
  font-size: 12px;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
