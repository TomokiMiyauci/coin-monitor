<template>
  <span :class="className">{{ percentagedNumber }}%</span>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },

  fractionDigits: {
    type: Number,
    default: 2,
  },
})

const percentagedNumber = computed(() => {
  // const percent = props.value / 100
  return props.value.toFixed(props.fractionDigits)
})

const className = computed(() => {
  if (props.value > 0) {
    return 'text-green-400'
  } else if (props.value < 0) {
    return 'text-red-400'
  }
  return ''
})
</script>
