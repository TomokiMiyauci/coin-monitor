<template>
  <div class="p-3">
    <div>
      <svg-symbol :symbol="symbol" />
    </div>

    <div>
      <comma-filter class="mr-6" :value="rate" />
      <flash-box :value="ratio">
        <percentage :value="ratio" />
      </flash-box>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { CoincheckSymbol } from '/@/components/base/coin'
  import Percentage from '/@/components/base/Percentage.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import SvgSymbol from '/@/components/base/SvgSymbol.vue'
  import FlashBox from '/@/components/base/FlashBox.vue'

  export default defineComponent({
    props: {
      symbol: {
        type: String as PropType<CoincheckSymbol>,
        default: '',
      },

      rate: {
        type: Number,
        default: 0,
      },

      ratio: {
        type: Number,
        default: 0,
      },
    },

    components: {
      Percentage,
      CommaFilter,
      SvgSymbol,
      FlashBox,
    },
  })
</script>
