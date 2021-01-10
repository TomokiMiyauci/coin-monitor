<template>
  <component :is="component" width="24" height="24" class="inline-block" />
  <span class="align-middle ml-3">{{ symbol }}</span>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { getComponent } from '/@/components/coincheck/symbol'
  import { CoincheckSymbol } from '/@/components/base/coin'

  export default defineComponent({
    props: {
      symbol: {
        type: String as () => CoincheckSymbol,
        required: true,
      },
    },

    setup(props) {
      const component = computed(() => getComponent(props.symbol))

      return { component }
    },
  })
</script>
