<template>
  <base-card class="flex flex-col pb-4 min-h-full">
    <div class="flex p-2 justify-between items-center">
      <h3 class="ml-2 p-2 mt-1 text-lg text-gray-400">Order Book</h3>

      <slot name="menu" />
    </div>

    <transition tag="div" name="fade" mode="out-in" class="flex-grow">
      <div v-if="asks.length">
        <div
          class="flex mt-4 py-1 bg-gradient-to-r from-white text-yellow-500 via-gray-200 to-white font-medium justify-between px-10 capitalize"
        >
          <span>rate</span><span>amount</span>
        </div>
        <order-book-body
          class="to-red-400 from-gray-50 bg-gradient-to-b"
          spanClass="bg-gradient-to-b from-gray-400 to-red-500"
          valueClass="from-gray-800 to-red-800"
          :priceAmount="sortedAsks"
          text="ask"
        />

        <div
          class="p-5 text-center text-lg bg-gradient-to-b from-red-400 to-green-400"
        >
          <comma-filter
            class="text-xl bg-clip-text text-transparent bg-gradient-to-r font-medium from-purple-500 to-blue-500"
            :value="tick"
          />
        </div>

        <order-book-body
          class="bg-gradient-to-t to-green-400 from-gray-100"
          spanClass="bg-gradient-to-t from-gray-400 to-green-400"
          valueClass="from-gray-800 to-green-800"
          :priceAmount="bids"
          text="bid"
        />
      </div>
      <div v-else class="flex justify-center h-full items-center">
        <spin-loader />
      </div>
    </transition>
  </base-card>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import type { PriceAmount } from '/@/components/order-book/share'
  import OrderBookBody from '/@/components/order-book/OrderBookBody.vue'
  import { sort } from 'rambda'

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
      const sortedAsks = computed(() =>
        sort(([a], [b]) => (a < b ? 1 : -1), props.asks)
      )
      const tick = computed(() => {
        if (
          !!props.asks.length &&
          !!props.asks[0] &&
          !!props.bids.length &&
          !!props.bids[0]
        ) {
          return props.asks[0][0] - props.bids[0][0]
        }
        return
      })

      return { tick, sortedAsks }
    },
  })
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    @apply transition duration-200;
  }

  .fade-enter-from,
  .fade-leave-to {
    @apply opacity-0 transform translate-x-2;
  }
</style>
