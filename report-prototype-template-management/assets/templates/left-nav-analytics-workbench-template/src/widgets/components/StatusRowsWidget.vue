<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { WidgetContext } from '../types';

type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
type ElementTagType = 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface StatusRowsWidgetItem {
  label: string;
  value?: string;
  status?: Tone;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  tone?: Tone;
  items?: StatusRowsWidgetItem[];
  displayBudget?: Record<string, unknown>;
}

const props = defineProps<Props>();
const tone = computed(() => props.tone ?? 'warning');
const rootRef = ref<HTMLElement | null>(null);
const containerSize = ref({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | null = null;
const maxListItems = 10;

const defaultItems: StatusRowsWidgetItem[] = [
  { label: '收入达成', value: '达成', status: 'success' },
  { label: '费用偏差', value: '关注', status: 'warning' },
  { label: '库存周转', value: '正常', status: 'primary' },
];

const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const getWeightedTextLength = (value = '') =>
  Array.from(value.trim()).reduce((total, char) => total + (/[\u4e00-\u9fff]/.test(char) ? 1 : 0.58), 0);

const rows = computed(() => (props.items?.length ? props.items : defaultItems).slice(0, maxListItems));
const longestTextWeight = computed(() =>
  Math.max(...rows.value.map((item) => getWeightedTextLength(`${item.label}${item.value ?? ''}`)), 1),
);
const listMetrics = computed(() => {
  const rowCount = Math.max(rows.value.length, 1);
  const width = containerSize.value.width || 260;
  const height = containerSize.value.height || 140;
  const rowGapY = Math.round(clampNumber(width * 0.006, 1, 2) * 10) / 10;
  const rowHeight = Math.max((height - rowGapY * (rowCount - 1)) / rowCount, 1);
  const widthBudget = Math.max(width - 68, 80);
  const widthDrivenFontSize = widthBudget / longestTextWeight.value / 1.18;
  const heightDrivenFontSize = rowHeight * 0.56;
  const fontSize = Math.round(clampNumber(Math.min(widthDrivenFontSize, heightDrivenFontSize), 8, 12) * 10) / 10;
  const dotSize = Math.round(clampNumber(rowHeight * 0.32, 4, 8) * 10) / 10;
  const tagHeight = Math.round(clampNumber(rowHeight * 0.68, 12, 21) * 10) / 10;
  const tagPadding = Math.round(clampNumber(width * 0.018, 3, 8) * 10) / 10;
  const tagMaxWidth = Math.round(clampNumber(width * 0.28, 48, 88) * 10) / 10;

  return {
    '--status-row-count': String(rowCount),
    '--status-font-size': `${fontSize}px`,
    '--status-dot-size': `${dotSize}px`,
    '--status-tag-height': `${tagHeight}px`,
    '--status-tag-padding': `${tagPadding}px`,
    '--status-tag-max-width': `${tagMaxWidth}px`,
    '--status-row-padding-x': `${Math.round(clampNumber(width * 0.025, 4, 8) * 10) / 10}px`,
    '--status-row-gap': `${Math.round(clampNumber(width * 0.022, 4, 7) * 10) / 10}px`,
    '--status-row-gap-y': `${rowGapY}px`,
  };
});
const getTagType = (status?: Tone): ElementTagType => {
  if (status === 'neutral') {
    return 'info';
  }

  return status ?? 'info';
};

onMounted(() => {
  if (!rootRef.value) {
    return;
  }

  const updateSize = () => {
    if (!rootRef.value) {
      return;
    }

    const rect = rootRef.value.getBoundingClientRect();
    containerSize.value = { width: rect.width, height: rect.height };
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
  <section ref="rootRef" class="template-carried-status" :class="`tone-${tone}`" :style="listMetrics">
    <el-scrollbar class="status-list-scrollbar">
      <div class="status-list-frame" role="list">
        <div v-for="item in rows" :key="item.label" class="status-list-item" role="listitem">
          <span class="status-dot" :class="`status-${item.status ?? 'neutral'}`"></span>
          <span class="status-list-label">{{ item.label }}</span>
          <el-tag class="status-list-tag" :type="getTagType(item.status)" effect="light" round>
            {{ item.value }}
          </el-tag>
        </div>
      </div>
    </el-scrollbar>
  </section>
</template>

<style scoped>
.template-carried-status {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  margin: 0;
  overflow: hidden;
  color: var(--text-strong, #101828);
}

.status-list-scrollbar {
  width: 100%;
  height: 100%;
}

.status-list-scrollbar :deep(.el-scrollbar__wrap),
.status-list-scrollbar :deep(.el-scrollbar__view) {
  height: 100%;
}

.status-list-frame {
  display: grid;
  grid-template-rows: repeat(var(--status-row-count, 1), minmax(0, 1fr));
  gap: var(--status-row-gap-y, 2px);
  min-width: 0;
  height: 100%;
  overflow: hidden;
  border: 0;
  background: transparent;
}

.status-list-item {
  display: grid;
  grid-template-columns: var(--status-dot-size, 8px) minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--status-row-gap, 7px);
  min-width: 0;
  min-height: 0;
  padding: 0 var(--status-row-padding-x, 8px);
  border: 1px solid var(--status-row-border, rgba(0, 74, 198, 0.16));
  border-radius: 5px;
  background: var(--status-row-background, rgba(0, 87, 217, 0.035));
}

.status-dot {
  width: var(--status-dot-size, 8px);
  height: var(--status-dot-size, 8px);
  border-radius: 999px;
  background: #98a2b3;
}

.status-list-label {
  min-width: 0;
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-size: var(--status-font-size, 12px);
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-list-tag {
  justify-self: end;
  max-width: var(--status-tag-max-width, 72px);
  height: var(--status-tag-height, 22px);
  padding: 0 var(--status-tag-padding, 8px);
  font-size: var(--status-font-size, 12px);
  line-height: 1;
  white-space: nowrap;
}

.status-primary {
  background: rgba(0, 74, 198, 0.78);
}

.status-success {
  background: rgba(15, 143, 95, 0.78);
}

.status-warning {
  background: rgba(183, 107, 0, 0.78);
}

.status-danger {
  background: rgba(186, 26, 26, 0.78);
}

.status-neutral {
  background: rgba(71, 84, 103, 0.58);
}
</style>
