<template>
  <div class="p-3">
    <div>
      <svg-symbol :symbol="symbol" />
    </div>

    <div>
      <text-loader
        class="inline-block align-middle mr-4"
        skelton-style="min-width: 6rem;"
        :value="rate"
      >
        <comma-filter :value="rate" />
      </text-loader>

      <text-loader
        :value="ratio"
        skelton-style="min-width: 3rem;"
        class="inline-block align-middle"
      >
        <flash-box :value="ratio">
          <percentage :value="ratio" />
        </flash-box>
      </text-loader>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { CoincheckSymbol } from '/@/components/base/coin'
  import Percentage from '/@/components/base/Percentage.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import SvgSymbol from '/@/components/base/SvgSymbol.vue'
  import FlashBox from '/@/components/base/FlashBox.vue'
  import TextLoader from './loaders/TextLoader.vue'

  export default defineComponent({
    components: {
      Percentage,
      CommaFilter,
      SvgSymbol,
      FlashBox,
      TextLoader,
    },

    props: {
      symbol: {
        type: String as () => CoincheckSymbol,
        default: '',
      },

      rate: {
        type: Number,
        default: undefined,
      },

      ratio: {
        type: Number,
        default: undefined,
      },
    },
  })
</script>
