<template>
  <base-symbol :component="component" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { ZaifSymbol } from '/@/components/base/coin'
import BaseSymbol from '/@/components/base/icons/BaseSymbol.vue'
import { getComponent } from '/@/components/zaif/symbol'
export default defineComponent({
  components: {
    BaseSymbol,
  },

  props: {
    symbol: {
      type: String as () => ZaifSymbol,
      default: '',
    },
  },

  setup(props) {
    const component = computed(() => getComponent(props.symbol))

    return {
      component,
    }
  },
})
</script>
