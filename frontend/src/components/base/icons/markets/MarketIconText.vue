<template>
  <svg-text :callback="getComponent" :value="value" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import SvgText from '/@/components/base/SvgText.vue'
import { getComponent } from '/@/components/market/symbol'

defineProps({
  value: {
    type: String,
    default: '',
  },
})
</script>
