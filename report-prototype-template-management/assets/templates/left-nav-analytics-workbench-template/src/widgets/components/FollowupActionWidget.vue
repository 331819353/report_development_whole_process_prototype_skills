<script setup lang="ts">
import { computed } from 'vue';
import type { DashboardWidgetActionEvent } from '../../types/actions';
import type { WidgetContext } from '../types';

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface Props {
  context: WidgetContext;
  data?: unknown[];
  label?: string;
  value?: string;
  description?: string;
  actionLabel?: string;
  tone?: Tone;
  displayBudget?: Record<string, unknown>;
}

const props = defineProps<Props>();

const label = computed(() => props.label ?? '异常跟进');
const value = computed(() => props.value ?? '3 项待闭环');
const description = computed(() => props.description ?? '建议优先查看费用偏差与库存高位区域。');
const actionLabel = computed(() => props.actionLabel ?? '查看');
const tone = computed(() => props.tone ?? 'danger');

const emit = defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const handleAction = () => {
  emit('dashboard-action', {
    name: 'followupAction',
    payload: {
      blockId: props.context.blockId,
      label: label.value,
      value: value.value,
    },
  });
};
</script>

<template>
  <section class="template-carried-action" :class="`tone-${tone}`">
    <p>{{ label }}</p>
    <strong>{{ value }}</strong>
    <span>{{ description }}</span>
    <button type="button" @click="handleAction">{{ actionLabel }}</button>
  </section>
</template>

<style scoped>
.template-carried-action {
  --tone-color: #ba1a1a;
  --tone-soft: rgba(186, 26, 26, 0.14);
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 6px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-variant-numeric: tabular-nums;
}

.tone-primary {
  --tone-color: #004ac6;
  --tone-soft: rgba(0, 74, 198, 0.12);
}

.tone-success {
  --tone-color: #0f8f5f;
  --tone-soft: rgba(15, 143, 95, 0.14);
}

.tone-warning {
  --tone-color: #b76b00;
  --tone-soft: rgba(183, 107, 0, 0.16);
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
  overflow: hidden;
  color: var(--tone-color);
  font-size: 18px;
  font-weight: 800;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

span {
  display: -webkit-box;
  min-width: 0;
  overflow: hidden;
  color: var(--muted, #667085);
  font-size: 12px;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

button {
  justify-self: start;
  height: 26px;
  min-width: 64px;
  max-width: 100%;
  overflow: hidden;
  padding: 0 10px;
  border: 1px solid var(--action-button-border, var(--tone-soft));
  border-radius: 999px;
  background: var(--action-button-background, rgba(255, 255, 255, 0.64));
  color: var(--tone-color);
  font-size: 12px;
  font-weight: 750;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

button:hover {
  background: var(--action-button-hover-background, var(--tone-soft));
}
</style>
