<script setup lang="ts">
import BaseLayoutSpan from './BaseLayoutSpan.vue';
import type { LayoutSpanTemplateProps } from './types';

defineProps<LayoutSpanTemplateProps>();
</script>

<template>
  <BaseLayoutSpan v-bind="$props" span-id="12x02" />
</template>
