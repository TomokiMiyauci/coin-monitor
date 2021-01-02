<template>
  <div class="grid grid-cols-4 gap-4">
    <order-book
      :asks="asks"
      :bids="bids"
      class="bg-white col-span-full md:col-span-2 rounded-mdhover:shadow-xl lg:col-span-2 xl:col-span-1 duration-200 transition"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import OrderBook from '/@/components/order-book/OrderBook.vue'
  import { depth } from '/@/reactives/api/bitpoint'

  export default defineComponent({
    components: {
      OrderBook,
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

      return {
        asks,
        bids,
      }
    },
  })
</script>
