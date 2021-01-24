<template>
  <div class="card-none sm:card flex flex-col pb-2 sm:pb-4 min-h-96">
    <div class="sm:flex hidden p-2 justify-between items-center">
      <h3 class="ml-2 p-2 mt-1 text-2xl text-gray-400">Order Book</h3>

      <slot name="menu" />
    </div>

    <transition tag="div" name="fade" mode="out-in" class="flex-grow">
      <div v-if="asks.length">
        <div
          class="flex sm:mt-4 py-1 bg-gradient-to-r from-white text-yellow-500 via-gray-200 to-white font-medium justify-between px-10 capitalize"
        >
          <span>rate</span><span>amount</span>
        </div>
        <order-book-body
          class="to-red-400 from-gray-50 bg-gradient-to-b"
          span-class="bg-gradient-to-b from-gray-400 to-red-500"
          value-class="from-gray-800 to-red-800"
          bar-class="bg-red-500"
          :price-amount="sortedAsks"
          text="ask"
          :sum="sumAmount"
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
          span-class="bg-gradient-to-t from-gray-400 to-green-400"
          value-class="from-gray-800 to-green-800"
          bar-class="bg-green-600"
          :price-amount="bids"
          :sum="sumAmount"
          text="bid"
        />
      </div>
      <div v-else class="flex justify-center h-full items-center">
        <spin-loader />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
  import type { PriceAmount } from '/@/components/order-book/share'
  import OrderBookBody from '/@/components/order-book/OrderBookBody.vue'
  import { sort, add } from 'rambda'

  export default defineComponent({
    components: {
      CommaFilter,
      SpinLoader,
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

      const sum = (acc: number, [_, amount]: PriceAmount[number]) =>
        acc + amount
      const sumAsksAmount = computed(() => props.asks.reduce(sum, 0))
      const sumBidsAmount = computed(() => props.bids.reduce(sum, 0))
      const sumAmount = computed(() =>
        add(sumAsksAmount.value, sumBidsAmount.value)
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
        return undefined
      })

      return { tick, sortedAsks, sumAmount }
    },
  })
</script>

<style lang="scss" src="/@/assets/styles/transitions.scss"></style>
