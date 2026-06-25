<script setup lang="ts">
import { computed } from 'vue';
import UniversalCardWidget from '../../components/UniversalCardWidget.vue';
import type { TemplateCarriedWidgetTone, WidgetContext } from '../../types';

interface CardRow {
  label: string;
  value?: string;
  tone?: TemplateCarriedWidgetTone;
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
  blockId: 'target-achievement-content-area-template',
  filters: {},
};

const targetRows: CardRow[] = [
  { label: '目标', value: '1.35亿' },
  { label: '当前', value: '1.28亿' },
  { label: '差距', value: '693.65万', tone: 'warning' },
];

const displayBudget = {
  rowHeightPx: 32,
  visibleRowCount: 3,
  maxVisibleItems: 3,
  overflowStrategy: 'show target, current, gap and achievement progress in one compact report card',
};

const contentContext = computed(() => props.context ?? fallbackContext);
const resolvedContentAreaTitle = computed(() => props.contentAreaTitle ?? props.title ?? '');
const shouldShowContentAreaTitle = computed(() => props.showContentTitle !== false && props.slotCount !== 1 && Boolean(resolvedContentAreaTitle.value));
const contentData = computed(() => props.data ?? []);
</script>

<template>
  <section class="component-content-area-template" :class="{ 'has-content-title': shouldShowContentAreaTitle }" aria-label="目标达成组件内容区模板">
    <header v-if="shouldShowContentAreaTitle" class="component-content-area-title">{{ resolvedContentAreaTitle }}</header>
    <div class="component-content-area-body">
    <UniversalCardWidget
      :context="contentContext"
      :data="contentData"
      card-kind="target"
      value="86"
      unit="%"
      target="135,000,000元"
      status="128,063,459元"
      gap="6,936,541元"
      :rows="targetRows"
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
