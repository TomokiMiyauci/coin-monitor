<template>
  <last-price :value="price" />
  <div class="grid grid-cols-2 gap-4">
    <order-book
      :asks="asks"
      :bids="bids"
      class="bg-white col-span-1 rounded-mdhover:shadow-xl duration-200 transition"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import LastPrice from '/@/components/last-price/LastPrice.vue'
  import OrderBook from '/@/components/order-book/OrderBook.vue'
  import { depth } from '/@/reactives/api/bitpoint'
  import { usePrice } from '/@/reactives/bitpoint/usePrice'

  export default defineComponent({
    components: {
      OrderBook,
      LastPrice,
    },

    setup() {
      const { state, setData } = depth()
      setData()

      const asks = computed(() =>
        state.value?.asks.map(({ price, qty }) => [price, qty])
      )

      const bids = computed(() =>
        state.value?.bids.map(({ price, qty }) => [price, qty])
      )

      const { price } = usePrice()

      return {
        asks,
        bids,
        price,
      }
    },
  })
</script>
