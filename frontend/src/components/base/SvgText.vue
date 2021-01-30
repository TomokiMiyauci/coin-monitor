<template>
  <div class="flex items-center">
    <base-icon-component v-bind="baseIconAttrs" />
    <span class="ml-3">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import BaseIconComponent from '/@/components/base/BaseIconComponent.vue'
const props = defineProps({
  width: {
    type: [String, Number],
    default: 24,
  },
  height: {
    type: [String, Number],
    default: 24,
  },
  callback: {
    type: Function,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

const component = computed(() => props.callback(props.value))
const baseIconAttrs = computed(() => ({
  component: component.value,
  width: props.width,
  height: props.height,
}))
</script>
