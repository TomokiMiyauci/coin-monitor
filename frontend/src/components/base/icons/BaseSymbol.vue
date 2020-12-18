<template>
  <component :is="component" width="24" height="24" class="inline-block" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      component: {
        type: Object,
        required: true,
      },
    },
  })
</script>
