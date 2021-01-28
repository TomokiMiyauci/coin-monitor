<template>
  <slot :symbol="symbol" />
  <span class="align-middle ml-3">{{ symbol }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    symbol: {
      type: String,
      required: true,
    },
  },
})
</script>
