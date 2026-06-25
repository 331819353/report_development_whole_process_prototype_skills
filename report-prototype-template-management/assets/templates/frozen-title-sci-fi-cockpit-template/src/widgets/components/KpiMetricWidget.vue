<script setup lang="ts">
import { computed } from 'vue';
import type { WidgetContext } from '../types';

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface Props {
  context: WidgetContext;
  data?: unknown[];
  label?: string;
  value?: string;
  unit?: string;
  delta?: string;
  tone?: Tone;
}

const props = defineProps<Props>();

const label = computed(() => props.label ?? '核心指标');
const value = computed(() => props.value ?? '86.4');
const unit = computed(() => props.unit ?? '%');
const delta = computed(() => props.delta ?? '+4.8%');
const tone = computed(() => props.tone ?? 'primary');
</script>

<template>
  <section class="template-carried-kpi" :class="`tone-${tone}`">
    <p>{{ label }}</p>
    <strong>{{ value }}<span>{{ unit }}</span></strong>
    <em>{{ delta }}</em>
  </section>
</template>

<style scoped>
.template-carried-kpi {
  --tone-color: #004ac6;
  --tone-soft: rgba(0, 74, 198, 0.12);
  display: grid;
  align-content: center;
  gap: 7px;
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
  --tone-soft: rgba(15, 143, 95, 0.14);
}

.tone-warning {
  --tone-color: #b76b00;
  --tone-soft: rgba(183, 107, 0, 0.16);
}

.tone-danger {
  --tone-color: #ba1a1a;
  --tone-soft: rgba(186, 26, 26, 0.14);
}

p {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--muted, #667085);
  font-size: 12px;
  font-weight: 650;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

strong {
  display: flex;
  align-items: baseline;
  gap: 4px;
  min-width: 0;
  color: var(--tone-color);
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
}

strong span {
  color: var(--muted, #667085);
  font-size: 12px;
  font-weight: 650;
}

em {
  justify-self: start;
  max-width: 100%;
  overflow: hidden;
  padding: 4px 8px;
  border-radius: 999px;
  background: var(--kpi-delta-background, var(--tone-soft));
  color: var(--tone-color);
  font-size: 12px;
  font-style: normal;
  font-weight: 750;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
