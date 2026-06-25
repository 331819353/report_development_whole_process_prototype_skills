<script setup lang="ts">
import { computed } from 'vue';
import type { WidgetContext } from '../types';

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface SignalMatrixCell {
  label: string;
  value: number;
  tone?: Tone;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  tone?: Tone;
  matrix?: SignalMatrixCell[];
}

const props = defineProps<Props>();

const defaultCells: SignalMatrixCell[] = [
  { label: '华东', value: 82, tone: 'primary' },
  { label: '华南', value: 76, tone: 'success' },
  { label: '华北', value: 61, tone: 'warning' },
  { label: '海外', value: 88, tone: 'primary' },
  { label: '线上', value: 69, tone: 'neutral' },
  { label: '线下', value: 43, tone: 'danger' },
];

const cells = computed(() => (props.matrix?.length ? props.matrix : defaultCells).slice(0, 6));
</script>

<template>
  <section class="template-carried-matrix">
    <div
      v-for="cell in cells"
      :key="cell.label"
      class="matrix-cell"
      :class="`status-${cell.tone ?? 'neutral'}`"
    >
      <span>{{ cell.label }}</span>
      <strong>{{ cell.value }}</strong>
    </div>
  </section>
</template>

<style scoped>
.template-carried-matrix {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  font-variant-numeric: tabular-nums;
}

.matrix-cell {
  --tone-color: #475467;
  --tone-faint: rgba(71, 84, 103, 0.07);
  display: grid;
  align-content: center;
  gap: 4px;
  min-width: 0;
  min-height: 0;
  padding: 6px;
  background: var(--tone-faint);
  color: var(--tone-color);
}

.status-primary {
  --tone-color: #004ac6;
  --tone-faint: rgba(0, 74, 198, 0.08);
}

.status-success {
  --tone-color: #0f8f5f;
  --tone-faint: rgba(15, 143, 95, 0.08);
}

.status-warning {
  --tone-color: #b76b00;
  --tone-faint: rgba(183, 107, 0, 0.09);
}

.status-danger {
  --tone-color: #ba1a1a;
  --tone-faint: rgba(186, 26, 26, 0.08);
}

span,
strong {
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

span {
  font-size: 11px;
  font-weight: 700;
}

strong {
  font-size: 16px;
  font-weight: 800;
}
</style>
