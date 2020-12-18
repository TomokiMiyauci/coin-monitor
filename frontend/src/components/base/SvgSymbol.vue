<template>
  <component :is="component" width="24" height="24" class="inline-block" />
  <base-span class="align-middle ml-3">{{ symbol }}</base-span>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import { getComponent } from '/@/components/coincheck/symbol'
  import BaseSpan from '/@/components/base/BaseSpan.vue'
  import { CoincheckSymbol } from '/@/components/base/coin'

  export default defineComponent({
    components: { BaseSpan },
    props: {
      symbol: {
        type: String as PropType<CoincheckSymbol>,
        required: true,
      },
    },

    setup(props) {
      const component = computed(() => getComponent(props.symbol))

      return { component }
    },
  })
</script>
