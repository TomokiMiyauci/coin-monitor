<template>
  <base-div
    class="rounded-3xl bg-gray-50 bg-gradient-to-b shadow-md hover:shadow-xl transition-shadow duration-200"
    :class="{ 'overflow-hidden': overflowHidden || true }"
  >
    <slot />
  </base-div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'
  import BaseDiv from '/@/components/base/BaseDiv.vue'

  defineProps<{ overflowHidden?: true }>()
</script>
