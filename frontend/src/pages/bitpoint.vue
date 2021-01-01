<template>
  <default title="bitpoint">
    <CurrentBoard />
  </default>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Default from '/@/layouts/default.vue'
  import CurrentBoard from '/@/components/bitpoint/CurrentBoard.vue'

  export default defineComponent({
    components: {
      Default,
      CurrentBoard,
    },
  })
</script>
