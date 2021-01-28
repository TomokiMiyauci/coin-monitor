<template>
  <svg-text :callback="getComponent" :value="value" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SvgText from '/@/components/base/SvgText.vue'
import { getComponent } from '/@/components/market/symbol'

export default defineComponent({
  components: {
    SvgText,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      getComponent,
    }
  },
})
</script>
