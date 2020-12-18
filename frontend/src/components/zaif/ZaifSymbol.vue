<template>
  <base-symbol :component="component" />
</template>

<script lang="ts">
  import BaseSymbol from '/@/components/base/icons/BaseSymbol.vue'
  import { getComponent } from '/@/components/zaif/symbol'
  import { CoincheckSymbol } from '/@/components/base/coin'

  import { defineComponent, PropType, computed } from 'vue'
  export default defineComponent({
    components: {
      BaseSymbol,
    },

    props: {
      symbol: {
        type: String as PropType<CoincheckSymbol>,
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
