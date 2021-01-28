<template>
  <base-symbol :component="component" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { CoincheckSymbol } from '/@/components/base/coin'
import BaseSymbol from '/@/components/base/icons/BaseSymbol.vue'
import { getComponent } from '/@/components/coincheck/symbol'
export default defineComponent({
  components: {
    BaseSymbol,
  },

  props: {
    symbol: {
      type: String as () => CoincheckSymbol,
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
