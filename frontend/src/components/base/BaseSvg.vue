<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 24 24`"
    :aria-labelledby="iconName"
    role="presentation"
    class="inline"
  >
    <title lang="en">{{ iconName }}</title>
    <g :fill="iconColor">
      <slot><path :d="d" /></slot>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  iconName: {
    type: String,
    default: 'icon',
  },

  width: {
    type: [Number, String],
    default: 24,
  },

  height: {
    type: [Number, String],
    default: 24,
  },

  iconColor: {
    type: String,
    default: 'currentColor',
  },

  d: {
    type: String,
    default: '',
  },
})
</script>
