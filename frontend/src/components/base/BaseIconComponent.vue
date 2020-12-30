<template>
  <component
    :is="component"
    :width="width"
    :height="height"
    class="inline-block"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      width: {
        type: [String, Number],
        default: 24,
      },
      height: {
        type: [String, Number],
        default: 24,
      },
      component: {
        type: Object,
        requried: true,
      },
    },
  })
</script>
