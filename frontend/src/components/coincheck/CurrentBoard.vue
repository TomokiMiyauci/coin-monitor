<template>
  <div class="grid grid-flow-col gap-4">
    <latest-price v-if="last" :value="last" />
    <ask-bid v-if="ask" :ask="ask" :bid="bid" />
  </div>

  <div class="grid grid-rows-3 grid-flow-col mt-4 gap-4">
    <div class="shadow p-5 bg-white mx-auto rounded">
      <h3>Coins</h3>
      <rate :rates="rates" />
    </div>
    <order-book class="row-span-3" :asks="asks" :bids="bids" />

    <trade-history
      class="bg-white rounded shadow row-span-2"
      style="display: table-inline"
      :data="data"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import OrderBook from '/@/components/base/OrderBook.vue'
  import TradeHistory from '/@/components/trade-history/TradeHistory.vue'
  import { useOrderBook } from '/@/components/coincheck/useOrderBooks'
  import { useTicker } from '/@/components/coincheck/useTicker'
  import { useTrades } from '/@/components/coincheck/useTrades'
  import { useRates } from '/@/components/coincheck/useRate'
  import Rate from '/@/components/base/Rate.vue'

  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
      OrderBook,
      TradeHistory,
      Rate,
    },

    setup() {
      const { asks, bids } = useOrderBook()
      const { last, ask, bid } = useTicker()
      const { data } = useTrades()
      const { rates } = useRates(
        'btc_jpy',
        'etc_jpy',
        'bat_jpy',
        'bch_jpy',
        'qtum_jpy',
        'iost_jpy',
        'fct_jpy',
        'mona_jpy',
        'eth_jpy',
        'lsk_jpy',
        'xem_jpy',
        'xlm_jpy',
        'xrp_jpy',
        'ltc_jpy'
      )

      return { last, ask, bid, asks, bids, data, rates }
    },
  })
</script>
