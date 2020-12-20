<template>
  <order-book :asks="asks" :bids="bids">
    <template #menu>
      <base-menu
        min-width="188"
        :value="pair"
        :symbols="zaifOrderBookPairs"
        @input="onInput"
      >
        <template #default="{ symbol }">
          <base-svg-pair v-bind="hoge(symbol)" /> </template
      ></base-menu>
    </template>
  </order-book>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useDepth } from '/@/components/zaif/useDepth'
  import OrderBook from '/@/components/base/OrderBook.vue'
  import BaseMenu from '/@/components/base/BaseMenu.vue'
  import BaseSvgPair from '/@/components/base/BaseSvgPair.vue'
  import { zaifOrderBookPairs } from '/@/components/zaif/pair'

  export default defineComponent({
    components: {
      OrderBook,
      BaseMenu,
      BaseSvgPair,
    },

    setup() {
      const pair = ref('btc_jpy')
      const { asks, bids } = useDepth(pair)

      const hoge = (pair: string) => {
        const [symbol, baseSymbol] = pair.split('_')
        return {
          symbol: symbol.toUpperCase(),
          baseSymbol: baseSymbol.toUpperCase(),
        }
      }

      const onInput = (hoge: string) => {
        console.log(hoge)
        pair.value = hoge
      }

      return {
        onInput,
        pair,
        hoge,
        bids,
        asks,
        zaifOrderBookPairs,
      }
    },
  })
</script>
