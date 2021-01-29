<template>
  <slot :symbol="symbol" />
  <span class="align-middle ml-3">{{ symbol }}</span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  symbol: {
    type: String,
    required: true,
  },
})
</script>
