<script setup lang="ts">
import { computed } from 'vue';
import StatusRowsWidget from '../../components/StatusRowsWidget.vue';
import type { StatusRowsWidgetItem, WidgetContext } from '../../types';

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
  blockId: 'key-action-list-content-area-template',
  filters: {},
};

const actionItems: StatusRowsWidgetItem[] = [
  { label: '逾期客户回款复核', value: '今日闭环', status: 'danger' },
  { label: '华北门店转化提升', value: '推进中', status: 'warning' },
  { label: '高毛利新品补货', value: '已排产', status: 'success' },
  { label: '费用投放复盘', value: '本周完成', status: 'primary' },
  { label: '重点客户满意度回访', value: '已启动', status: 'success' },
];

const displayBudget = {
  rowHeightPx: 32,
  visibleRowCount: 5,
  maxVisibleItems: 5,
  overflowStrategy: 'show top 5 operating actions with compact adaptive rows',
};

const contentContext = computed(() => props.context ?? fallbackContext);
const resolvedContentAreaTitle = computed(() => props.contentAreaTitle ?? props.title ?? '');
const shouldShowContentAreaTitle = computed(() => props.showContentTitle !== false && props.slotCount !== 1 && Boolean(resolvedContentAreaTitle.value));
const contentData = computed(() => props.data ?? []);
</script>

<template>
  <section class="component-content-area-template" :class="{ 'has-content-title': shouldShowContentAreaTitle }" aria-label="重点行动清单组件内容区模板">
    <header v-if="shouldShowContentAreaTitle" class="component-content-area-title">{{ resolvedContentAreaTitle }}</header>
    <div class="component-content-area-body">
    <StatusRowsWidget
      :context="contentContext"
      :data="contentData"
      tone="primary"
      :items="actionItems"
      :display-budget="displayBudget"
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
