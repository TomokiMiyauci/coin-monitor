<template>
  <div class="grid grid-cols-4 gap-4">
    <order-book
      :asks="asks"
      :bids="bids"
      class="bg-white rounded-md hover:shadow-xl duration-200 transition"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import OrderBook from '/@/components/base/OrderBook.vue'
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
