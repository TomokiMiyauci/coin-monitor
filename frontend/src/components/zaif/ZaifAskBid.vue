<template>
  <ask-bid class="col-span-2" :ask="ask" :bid="bid">
    <template #menu>
      <base-menu
        min-width="188"
        max-height="max-h-32"
        :value="pair"
        :symbols="zaifOrderBookPairs"
        @input="onInput"
      >
        <template #default="{ symbol }">
          <base-svg-pair v-bind="format(symbol)" /> </template
      ></base-menu>
    </template>
  </ask-bid>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useTicker } from '/@/components/zaif/useTicker'
  import AskBid from '/@/components/base/AskBid.vue'
  import {
    zaifOrderBookPairs,
    ZaifOrderBookPairs,
  } from '/@/components/zaif/pair'
  import BaseMenu from '/@/components/base/BaseMenu.vue'
  import BaseSvgPair from '/@/components/base/BaseSvgPair.vue'

  export default defineComponent({
    components: {
      AskBid,
      BaseMenu,
      BaseSvgPair,
    },
    setup() {
      const pair = ref<ZaifOrderBookPairs>('btc_jpy')
      const { ask, bid } = useTicker(pair)

      const onInput = (payload: ZaifOrderBookPairs) => {
        pair.value = payload
      }

      const format = (payload: ZaifOrderBookPairs) => {
        const [symbol, baseSymbol] = payload.split('_')
        return {
          symbol: symbol.toUpperCase(),
          baseSymbol: baseSymbol.toUpperCase(),
        }
      }

      return {
        zaifOrderBookPairs,
        format,
        onInput,
        ask,
        bid,
        pair,
      }
    },
  })
</script>
