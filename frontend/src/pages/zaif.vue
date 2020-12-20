<template>
  <default title="zaif">
    <current-board />
    <template #header-rest>
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
  </default>
</template>

<script lang="ts">
  import { defineComponent, ref, provide } from 'vue'
  import BaseMenu from '/@/components/base/BaseMenu.vue'
  import BaseSvgPair from '/@/components/base/BaseSvgPair.vue'

  import Default from '/@/layouts/default.vue'
  import CurrentBoard from '/@/components/zaif/CurrentBoard.vue'
  import {
    zaifOrderBookPairs,
    ZaifOrderBookPairs,
  } from '/@/components/zaif/pair'
  export default defineComponent({
    components: {
      Default,
      CurrentBoard,
      BaseMenu,
      BaseSvgPair,
    },

    setup() {
      const initPair = 'btc_jpy'
      const pair = ref<ZaifOrderBookPairs>(initPair)
      const historyPair = ref<ZaifOrderBookPairs>(initPair)
      const orderBookPair = ref<ZaifOrderBookPairs>(initPair)
      const askBidPair = ref<ZaifOrderBookPairs>(initPair)

      provide('historyPair', historyPair)
      provide('orderBookPair', orderBookPair)
      provide('askBidPair', askBidPair)

      const format = (payload: ZaifOrderBookPairs) => {
        const [symbol, baseSymbol] = payload.split('_')
        return {
          symbol: symbol.toUpperCase(),
          baseSymbol: baseSymbol.toUpperCase(),
        }
      }
      const onInput = (payload: ZaifOrderBookPairs) => {
        pair.value = payload
        historyPair.value = payload
        orderBookPair.value = payload
        askBidPair.value = payload
      }
      return {
        pair,
        format,
        onInput,
        zaifOrderBookPairs,
      }
    },
  })
</script>
