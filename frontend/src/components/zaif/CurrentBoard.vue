<template>
  <div class="grid grid-cols-4 gap-6">
    <latest-price class="col-span-2" :value="lastPrice" />
    <ask-bid class="col-span-2" :ask="ask" :bid="bid" />

    <base-card class="col-span-1" style="min-height: 300px">
      <div class="flex p-2 justify-between items-center">
        <h3 class="ml-2 text-lg text-gray-400">Coins</h3>
        <base-menu
          :value="baseSymbol"
          :symbols="zaifBaseSymbols"
          @input="onInput"
        >
          <template #default="{ symbol }">
            <base-svg-symbol :symbol="symbol">
              <zaif-symbol :symbol="symbol" />
            </base-svg-symbol>
          </template>
        </base-menu>
      </div>

      <base-rate :rates="rates">
        <template #default="{ symbol }">
          <base-svg-symbol :symbol="symbol">
            <zaif-symbol :symbol="symbol" />
          </base-svg-symbol>
        </template>
      </base-rate>
    </base-card>

    <zaif-order-book class="col-span-1" />

    <zaif-trade-history class="col-span-2" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import { useLastPrice } from '/@/components/zaif/useLastPrice'
  import { useTicker } from '/@/components/zaif/useTicker'
  import BaseMenu from '/@/components/base/BaseMenu.vue'

  import { useRates, usePair } from '/@/components/zaif/useRate'
  import BaseRate from '/@/components/base/BaseRate.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'

  import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
  import ZaifSymbol from './ZaifSymbol.vue'
  import ZaifOrderBook from '/@/components/zaif/ZaifOrderBook.vue'
  import ZaifTradeHistory from '/@/components/zaif/ZaifTradeHistory.vue'
  import { zaifBaseSymbols, ZaifBaseSymbol } from '/@/components/base/coin'

  export default defineComponent({
    components: {
      BaseMenu,
      LatestPrice,
      AskBid,
      ZaifOrderBook,
      ZaifTradeHistory,
      ZaifSymbol,
      BaseSvgSymbol,
      BaseRate,
      BaseCard,
    },
    setup() {
      const { ask, bid } = useTicker()
      const { lastPrice } = useLastPrice()

      const baseSymbol = ref<ZaifBaseSymbol>('JPY')

      const { pairs } = usePair(baseSymbol)

      const onInput = (v: ZaifBaseSymbol) => {
        baseSymbol.value = v
      }

      const { rates } = useRates(pairs)

      return {
        onInput,
        rates,
        pairs,
        baseSymbol,
        zaifBaseSymbols,
        ask,
        bid,
        lastPrice,
      }
    },
  })
</script>
