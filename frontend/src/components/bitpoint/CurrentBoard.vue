<template>
  <last-price :value="price" />
  <div class="grid grid-cols-2 mt-4 gap-4">
    <order-book
      :asks="asks"
      :bids="bids"
      class="bg-white col-span-2 sm:col-span-1 rounded-mdhover:shadow-xl duration-200 transition"
    />

    <base-card class="w-80 col-span-1 max-h-96 overflow-y-scroll">
      <trade-history-without-type :data="data" />
    </base-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import BaseCard from '/@/components/base/BaseCard.vue'
import LastPrice from '/@/components/last-price/LastPrice.vue'
import OrderBook from '/@/components/order-book/OrderBook.vue'
import TradeHistoryWithoutType from '/@/components/trade-history/TradeHistoryWithoutType.vue'
import { depth } from '/@/reactives/api/bitpoint'
import { usePrice } from '/@/reactives/bitpoint/usePrice'
import { useTrades } from '/@/reactives/bitpoint/useTrades'

export default defineComponent({
  components: {
    OrderBook,
    LastPrice,
    TradeHistoryWithoutType,
    BaseCard,
  },

  setup() {
    const { state, setData } = depth()
    const { data } = useTrades()

    setData()

    const asks = computed(() =>
      state.value?.asks.map(
        ({ price, qty }) => [price, qty] as [number, number]
      )
    )

    const bids = computed(() =>
      state.value?.bids.map(
        ({ price, qty }) => [price, qty] as [number, number]
      )
    )

    const { price } = usePrice()

    return {
      asks,
      bids,
      price,
      data,
    }
  },
})
</script>
