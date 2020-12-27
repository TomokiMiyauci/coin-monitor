<template>
  <base-svg :d="mdiViewDashboard" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { mdiViewDashboard } from '@mdi/js'
  import BaseSvg from '/@/components/base/BaseSvg.vue'

  export default defineComponent({
    components: { BaseSvg },
    setup() {
      return { mdiViewDashboard }
    },
  })
</script>
