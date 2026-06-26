<script setup lang="ts">
import { computed } from 'vue';
import MetricValueWidget from '../../components/MetricValueWidget.vue';
import type { WidgetContext } from '../../types';

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
  blockId: 'operating-profit-metric-content-area-template',
  filters: {},
};

const contentContext = computed(() => props.context ?? fallbackContext);
const resolvedContentAreaTitle = computed(() => props.contentAreaTitle ?? props.title ?? '');
const shouldShowContentAreaTitle = computed(() => props.showContentTitle !== false && props.slotCount !== 1 && Boolean(resolvedContentAreaTitle.value));
const contentData = computed(() => props.data ?? []);
</script>

<template>
  <section class="component-content-area-template" :class="{ 'has-content-title': shouldShowContentAreaTitle }" aria-label="经营利润组件内容区模板">
    <header v-if="shouldShowContentAreaTitle" class="component-content-area-title">{{ resolvedContentAreaTitle }}</header>
    <div class="component-content-area-body">
    <MetricValueWidget
      :context="contentContext"
      :data="contentData"
      :value="24860000"
      unit="元"
      year-over-year="+15.2%"
      month-over-month="+6.1%"
      :max-decimals="0"
    />
    </div>
  </section>
</template>

<style scoped>
.component-content-area-template {
  display: grid;
  container-type: size;
  --content-area-font-scale: 1;
  --content-area-tight-scale: 1;
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
  font-size: calc(12px * var(--content-area-title-scale, 1));
  font-weight: 750;
  line-height: calc(14px * var(--content-area-title-scale, 1));
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.component-content-area-body {
  --content-area-font-scale: 1;
  --content-area-tight-scale: 1;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 0;
  border-radius: inherit;
  font-size: calc(12px * var(--content-area-font-scale));
  line-height: calc(16px * var(--content-area-tight-scale));
}

.component-content-area-template.has-content-title .component-content-area-body {
  border-radius: 0 0 var(--component-content-area-radius, 8px) var(--component-content-area-radius, 8px);
}

@container (max-width: 260px), (max-height: 150px) {
  .component-content-area-title {
    padding: 2px 6px 0;
    --content-area-title-scale: 0.92;
  }

  .component-content-area-body {
    --content-area-font-scale: 0.9;
    --content-area-tight-scale: 0.88;
  }
}

@container (max-width: 220px), (max-height: 118px) {
  .component-content-area-title {
    padding: 2px 5px 0;
    --content-area-title-scale: 0.84;
  }

  .component-content-area-body {
    --content-area-font-scale: 0.78;
    --content-area-tight-scale: 0.76;
  }
}

</style>
