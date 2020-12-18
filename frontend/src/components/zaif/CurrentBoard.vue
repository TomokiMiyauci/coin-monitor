<template>
  <div class="grid grid-cols-2 gap-6">
    <latest-price :value="lastPrice" />
    <ask-bid :ask="ask" :bid="bid" />

    <order-book :asks="asks" :bids="bids" />

    <trade-history :data="data" />

    <base-rate :rates="rates">
      <template #default="{ symbol }">
        <base-svg-symbol :symbol="symbol">
          <zaif-symbol :symbol="symbol" />
        </base-svg-symbol>
      </template>
    </base-rate>
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
  import { useRate } from '/@/components/zaif/useRate'
  import TradeHistory from '/@/components/base/TradeHistory.vue'
  import BaseRate from '/@/components/base/BaseRate.vue'
  import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
  import ZaifSymbol from './ZaifSymbol.vue'

  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
      OrderBook,
      TradeHistory,
      ZaifSymbol,
      BaseSvgSymbol,
      BaseRate,
    },
    setup() {
      const { lastPrice } = useLastPrice()
      const { ask, bid } = useTicker()
      const { asks, bids } = useDepth()
      const { data } = useTrades()
      const { rate, ratio } = useRate()
      const rates = ref([
        {
          rate,
          ratio,
          symbol: 'BTC',
          baseSymbol: 'JPY',
        },
        { symbol: 'XEM', baseSymbol: 'JPY' },
      ])

      return {
        lastPrice,
        ask,
        bid,
        asks,
        bids,
        data,
        rate,
        rates,
      }
    },
  })
</script>
