<template>
  <ask-bid class="col-span-2" v-bind="askBidAttrs">
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
  </ask-bid>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue'

import AskBid from '/@/components/base/AskBid.vue'
import BaseMenu from '/@/components/base/BaseMenu.vue'
import BaseSvgPair from '/@/components/base/BaseSvgPair.vue'
import { ZaifOrderBookPairs, zaifOrderBookPairs } from '/@/components/zaif/pair'
import { useTicker } from '/@/components/zaif/useTicker'

export default defineComponent({
  components: {
    AskBid,
    BaseMenu,
    BaseSvgPair,
  },
  setup() {
    const pair = inject('askBidPair') as Ref<ZaifOrderBookPairs>
    const { ask, bid, low, high, volume } = useTicker(pair)

    const askBidAttrs = computed(() => ({
      ask: ask.value,
      bid: bid.value,
      high: high.value,
      low: low.value,
      volume: volume.value,
    }))

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
      pair,
      askBidAttrs,
    }
  },
})
</script>
