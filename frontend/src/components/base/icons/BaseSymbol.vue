<template>
  <component
    :is="component"
    width="24"
    height="24"
    class="inline-block w-7 h-7"
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  component: {
    type: [Function, Object],
    required: true,
  },
})
</script>
