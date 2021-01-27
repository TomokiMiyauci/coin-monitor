<template>
  <component
    :is="component"
    :width="width"
    :height="height"
    class="inline-block w-6 h-6"
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
        type: [Function, Object],
        requried: true,
      },
    },
  })
</script>
