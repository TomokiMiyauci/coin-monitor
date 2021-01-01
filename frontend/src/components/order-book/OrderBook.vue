<template>
  <base-card>
    <div class="flex flex-col">
      <div class="flex p-2 justify-between items-center">
        <h3 class="ml-2 p-2 mt-1 text-lg text-gray-400">Order Book</h3>

        <slot name="menu" />
      </div>
    </div>

    <div>
      <template v-if="asks.length">
        <div class="flex mt-4 justify-between px-10 capitalize">
          <span>rate</span><span>amount</span>
        </div>
        <order-book-body
          class="to-red-400 from-gray-50 bg-gradient-to-b"
          spanClass="bg-gradient-to-b from-gray-400 to-red-500"
          :priceAmount="asks"
          text="ask"
        />

        <div
          class="p-5 text-center text-lg bg-gradient-to-b from-red-400 to-green-400"
        >
          <comma-filter :value="tick" />
        </div>

        <order-book-body
          class="bg-gradient-to-t to-green-400 from-white"
          spanClass="bg-gradient-to-t from-gray-400 to-green-400"
          :priceAmount="bids"
          text="bid"
        />
      </template>
      <template v-else>
        <div class="flex justify-center min-h-96">
          <spin-loader />
        </div>
      </template>
    </div>
  </base-card>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import type { PriceAmount } from '/@/components/order-book/share'
  import OrderBookBody from '/@/components/order-book/OrderBookBody.vue'

  export default defineComponent({
    components: {
      CommaFilter,
      SpinLoader,
      BaseCard,
      OrderBookBody,
    },

    props: {
      asks: {
        type: Array as () => PriceAmount,
        default: () => [],
      },

      bids: {
        type: Array as () => PriceAmount,
        default: () => [],
      },
    },

    setup(props) {
      const tick = computed(() => {
        if (
          !!props.asks.length &&
          !!props.asks[9] &&
          !!props.bids.length &&
          !!props.bids[0]
        ) {
          return props.asks[9][0] - props.bids[0][0]
        }
        return
      })

      return { tick }
    },
  })
</script>
