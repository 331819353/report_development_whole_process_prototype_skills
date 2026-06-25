<script setup lang="ts">
import { computed } from 'vue';
import TemplateEChartWidget from '../../components/TemplateEChartWidget.vue';
import type { WidgetContext } from '../../types';

interface ScatterPoint {
  name: string;
  value: [number, number, number];
}

const props = defineProps<{
  context?: WidgetContext;
  data?: unknown[];
  title?: string;
  contentAreaTitle?: string;
  showContentTitle?: boolean;
  slotCount?: number;
  templateFile?: string;
}>();

const fallbackContext: WidgetContext = {
  area: 'page',
  navId: 'component-library',
  navLabel: '组件内容区',
  blockId: 'customer-value-scatter-content-area-template',
  filters: {},
};

const points: ScatterPoint[] = [
  { name: '战略客户', value: [86, 88, 30] },
  { name: '成长客户', value: [72, 81, 24] },
  { name: '效率客户', value: [68, 62, 18] },
  { name: '观察客户', value: [45, 48, 12] },
  { name: '潜力客户', value: [57, 74, 20] },
  { name: '风险客户', value: [52, 31, 14] },
];

const contentContext = computed(() => props.context ?? fallbackContext);
const resolvedContentAreaTitle = computed(() => props.contentAreaTitle ?? props.title ?? '');
const shouldShowContentAreaTitle = computed(() => props.showContentTitle !== false && props.slotCount !== 1 && Boolean(resolvedContentAreaTitle.value));
const contentData = computed(() => props.data ?? []);
</script>

<template>
  <section class="component-content-area-template" :class="{ 'has-content-title': shouldShowContentAreaTitle }" aria-label="客户价值象限组件内容区模板">
    <header v-if="shouldShowContentAreaTitle" class="component-content-area-title">{{ resolvedContentAreaTitle }}</header>
    <div class="component-content-area-body">
    <TemplateEChartWidget
      :context="contentContext"
      :data="contentData"
      chart-kind="scatter"
      series-name="客户分群"
      unit="分"
      :points="points"
      tone="primary"
    />
    </div>
  </section>
</template>

<style scoped>
.component-content-area-template {
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 0;
  border-radius: var(--component-content-area-radius, 8px);
  background: var(--component-content-area-background, transparent);
}

.component-content-area-template.has-content-title {
  grid-template-rows: 20px minmax(0, 1fr);
}

.component-content-area-title {
  display: block;
  height: 20px;
  min-width: 0;
  overflow: hidden;
  padding: 3px 8px 0;
  color: var(--text-strong, #101828);
  font-size: 12px;
  font-weight: 750;
  line-height: 14px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.component-content-area-body {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 0;
  border-radius: inherit;
}

.component-content-area-template.has-content-title .component-content-area-body {
  border-radius: 0 0 var(--component-content-area-radius, 8px) var(--component-content-area-radius, 8px);
}
</style>
