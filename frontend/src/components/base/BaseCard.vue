<template>
  <div
    class="rounded-3xl bg-gray-50 bg-gradient-to-b shadow-md hover:shadow-xl transition-shadow duration-200"
    :class="{ 'overflow-hidden': overflowHidden || true }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  defineProps<{ overflowHidden?: true }>()
</script>
