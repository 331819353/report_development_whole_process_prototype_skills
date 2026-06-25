<script setup lang="ts">
import { computed } from 'vue';
import RankingCardWidget from '../../components/RankingCardWidget.vue';
import type { RankingCardItem, WidgetContext } from '../../types';

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
  blockId: 'regional-revenue-ranking-content-area-template',
  filters: {},
};

const rankingItems: RankingCardItem[] = [
  { rank: 1, label: '华东大区', value: 32680000 },
  { rank: 2, label: '线上渠道', value: 28460000 },
  { rank: 3, label: '华南大区', value: 21930000 },
  { rank: 4, label: '海外市场', value: 18750000 },
  { rank: 5, label: '华北大区', value: 15320000 },
];

const displayBudget = {
  rowHeightPx: 32,
  visibleRowCount: 5,
  maxVisibleItems: 5,
  overflowStrategy: 'show top 5 operating regions with medal rank colors',
};

const contentContext = computed(() => props.context ?? fallbackContext);
const resolvedContentAreaTitle = computed(() => props.contentAreaTitle ?? props.title ?? '');
const shouldShowContentAreaTitle = computed(() => props.showContentTitle !== false && props.slotCount !== 1 && Boolean(resolvedContentAreaTitle.value));
const contentData = computed(() => props.data ?? []);
</script>

<template>
  <section class="component-content-area-template" :class="{ 'has-content-title': shouldShowContentAreaTitle }" aria-label="区域收入排名组件内容区模板">
    <header v-if="shouldShowContentAreaTitle" class="component-content-area-title">{{ resolvedContentAreaTitle }}</header>
    <div class="component-content-area-body">
    <RankingCardWidget
      :context="contentContext"
      :data="contentData"
      value-unit="元"
      :items="rankingItems"
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
