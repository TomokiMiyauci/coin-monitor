<template>
  <base-svg :d="d" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import BaseSvg from '/@/components/base/BaseSvg.vue'
defineProps<{
  d: string
}>()
</script>
