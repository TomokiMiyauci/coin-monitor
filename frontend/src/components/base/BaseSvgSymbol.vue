<template>
  <slot :symbol="symbol" />
  <base-span class="align-middle ml-3">{{ symbol }}</base-span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseSpan from '/@/components/base/BaseSpan.vue'

  export default defineComponent({
    components: { BaseSpan },
    props: {
      symbol: {
        type: String,
        required: true,
      },
    },
  })
</script>
