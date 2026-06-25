<script setup lang="ts">
import BaseLayoutSpan from './BaseLayoutSpan.vue';
import type { LayoutSpanTemplateProps } from './types';

defineProps<LayoutSpanTemplateProps>();
</script>

<template>
  <BaseLayoutSpan v-bind="$props" span-id="09x06" />
</template>
