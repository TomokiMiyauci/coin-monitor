<template>
  <base-svg :d="mdiViewDashboard" />
</template>

<script lang="ts">
import { mdiViewDashboard } from '@mdi/js'
import { defineComponent } from 'vue'

import BaseSvg from '/@/components/base/BaseSvg.vue'

export default defineComponent({
  components: { BaseSvg },
  setup() {
    return { mdiViewDashboard }
  },
})
</script>
