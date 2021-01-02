<template>
  <base-svg :d="d" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseSvg from '/@/components/base/BaseSvg.vue'

  export default defineComponent({
    components: { BaseSvg },
    props: {
      d: {
        type: String,
        required: true,
      },
    },
  })
</script>
