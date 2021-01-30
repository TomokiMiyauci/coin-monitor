<template>
  <component
    :is="component"
    :width="width"
    :height="height"
    class="inline-block w-6 h-6"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  width: {
    type: [String, Number],
    default: 24,
  },
  height: {
    type: [String, Number],
    default: 24,
  },
  component: {
    type: [Function, Object],
    requried: true,
  },
})
</script>
