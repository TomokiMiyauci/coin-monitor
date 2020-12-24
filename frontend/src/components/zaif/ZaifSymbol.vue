<template>
  <base-symbol :component="component" />
</template>

<script lang="ts">
  import BaseSymbol from '/@/components/base/icons/BaseSymbol.vue'
  import { getComponent } from '/@/components/zaif/symbol'
  import { ZaifSymbol } from '/@/components/base/coin'

  import { defineComponent, computed } from 'vue'
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
