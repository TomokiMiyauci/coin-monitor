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

    <order-book class="col-span-1" :asks="asks" :bids="bids" />

    <trade-history class="col-span-2" :data="data" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import OrderBook from '/@/components/base/OrderBook.vue'
  import { useLastPrice } from '/@/components/zaif/useLastPrice'
  import { useTicker } from '/@/components/zaif/useTicker'
  import { useDepth } from '/@/components/zaif/useDepth'
  import { useTrades } from '/@/components/zaif/useTrades'
  import BaseMenu from '/@/components/base/BaseMenu.vue'

  import { useRates, usePair } from '/@/components/zaif/useRate'
  import TradeHistory from '/@/components/base/TradeHistory.vue'
  import BaseRate from '/@/components/base/BaseRate.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'

  import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
  import ZaifSymbol from './ZaifSymbol.vue'
  import { getLastPrice as g } from 'zaif-client'
  import { zaifBaseSymbols, ZaifBaseSymbol } from '/@/components/base/coin'

  export default defineComponent({
    components: {
      BaseMenu,
      LatestPrice,
      AskBid,
      OrderBook,
      TradeHistory,
      ZaifSymbol,
      BaseSvgSymbol,
      BaseRate,
      BaseCard,
    },
    setup() {
      const { ask, bid } = useTicker()
      const { asks, bids } = useDepth()
      const { data } = useTrades()
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
        asks,
        bids,
        data,
        lastPrice,
      }
    },
  })
</script>
