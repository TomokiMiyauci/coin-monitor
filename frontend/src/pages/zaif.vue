<template>
  <default title="zaif">
    <current-board />
  </default>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Default from '/@/layouts/default.vue'
  import CurrentBoard from '/@/components/zaif/CurrentBoard.vue'

  export default defineComponent({
    components: {
      Default,
      CurrentBoard,
    },
  })
</script>
