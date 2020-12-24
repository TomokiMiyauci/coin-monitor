<template>
  <base-symbol :component="component" />
</template>

<script lang="ts">
  import BaseSymbol from '/@/components/base/icons/BaseSymbol.vue'
  import { getComponent } from '/@/components/coincheck/symbol'
  import { CoincheckSymbol } from '/@/components/base/coin'

  import { defineComponent, computed } from 'vue'
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
