<template>
  <index />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Index from '/@/pages/index.vue'

  export default defineComponent({
    name: 'App',
    components: {
      Index,
    },
  })
</script>
