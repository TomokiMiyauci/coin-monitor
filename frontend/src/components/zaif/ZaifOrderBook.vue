<template>
  <div class="grid grid-cols-2 gap-6">
    <order-book :asks="asks" :bids="bids">
      <template #menu>
        <base-menu
          min-width="188"
          :value="pair"
          :symbols="zaifOrderBookPairs"
          @input="onInput"
        >
          <template #default="{ symbol }">
            <base-svg-pair v-bind="format(symbol)" /> </template
        ></base-menu>
      </template>
    </order-book>
  </div>
</template>

<script lang="ts">
  import { defineComponent, Ref, inject } from 'vue'
  import { useDepth } from '/@/components/zaif/useDepth'
  import OrderBook from '/@/components/order-book/OrderBook.vue'
  import BaseMenu from '/@/components/base/BaseMenu.vue'
  import BaseSvgPair from '/@/components/base/BaseSvgPair.vue'
  import {
    zaifOrderBookPairs,
    ZaifOrderBookPairs,
  } from '/@/components/zaif/pair'

  export default defineComponent({
    components: {
      OrderBook,
      BaseMenu,
      BaseSvgPair,
    },

    setup() {
      const pair = inject('orderBookPair') as Ref<ZaifOrderBookPairs>
      const { asks, bids } = useDepth(pair)

      const format = (payload: ZaifOrderBookPairs) => {
        const [symbol, baseSymbol] = payload.split('_')
        return {
          symbol: symbol.toUpperCase(),
          baseSymbol: baseSymbol.toUpperCase(),
        }
      }

      const onInput = (payload: ZaifOrderBookPairs) => {
        pair.value = payload
      }

      return {
        onInput,
        pair,
        format,
        bids,
        asks,
        zaifOrderBookPairs,
      }
    },
  })
</script>
