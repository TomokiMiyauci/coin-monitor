<template>
  <order-book :asks="asks" :bids="bids">
    <template #menu>
      <base-menu
        :value="pair"
        title="Symbol Pair"
        class-button=" w-52"
        :candidates="zaifOrderBookPairs"
        @input="onInput"
      >
        <template #buttonContent="{ value }">
          <base-svg-pair v-bind="format(value)" />
        </template>

        <template #candidate="{ candidate }">
          <base-svg-pair v-bind="format(candidate)" />
        </template>
      </base-menu>
    </template>
  </order-book>
</template>

<script lang="ts">
  import { defineComponent, Ref, inject } from 'vue'
  import { useDepth } from '/@/components/zaif/useDepth'
  import OrderBook from '/@/components/order-book/OrderBook.vue'
  import BaseSvgPair from '/@/components/base/BaseSvgPair.vue'
  import {
    zaifOrderBookPairs,
    ZaifOrderBookPairs,
  } from '/@/components/zaif/pair'
  import BaseMenu from '/@/components/menu/BaseMenu.vue'

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
