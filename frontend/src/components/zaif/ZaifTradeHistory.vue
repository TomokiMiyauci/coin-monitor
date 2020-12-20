<template>
  <trade-history :data="data">
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
  </trade-history>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref } from 'vue'
  import { useTrades } from '/@/components/zaif/useTrades'
  import TradeHistory from '/@/components/base/TradeHistory.vue'
  import BaseMenu from '/@/components/base/BaseMenu.vue'
  import BaseSvgPair from '/@/components/base/BaseSvgPair.vue'

  import {
    zaifOrderBookPairs,
    ZaifOrderBookPairs,
  } from '/@/components/zaif/pair'

  export default defineComponent({
    components: {
      TradeHistory,
      BaseMenu,
      BaseSvgPair,
    },
    setup() {
      const pair = inject('historyPair') as Ref<ZaifOrderBookPairs>

      const { data } = useTrades(pair)
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

      return { data, format, onInput, pair, zaifOrderBookPairs }
    },
  })
</script>
