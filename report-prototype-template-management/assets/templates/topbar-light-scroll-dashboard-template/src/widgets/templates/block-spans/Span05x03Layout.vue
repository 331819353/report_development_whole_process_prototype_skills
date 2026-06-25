<script setup lang="ts">
import BaseLayoutSpan from './BaseLayoutSpan.vue';
import type { LayoutSpanTemplateProps } from './types';

defineProps<LayoutSpanTemplateProps>();
</script>

<template>
  <BaseLayoutSpan v-bind="$props" span-id="05x03" />
</template>
