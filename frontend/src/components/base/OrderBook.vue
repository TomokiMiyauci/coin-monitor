<template>
  <base-card>
    <div class="flex p-2 justify-between items-center">
      <h3 class="ml-2 p-2 mt-1 text-lg text-gray-400">Order Book</h3>

      <slot name="menu" />
    </div>

    <template v-if="asks.length">
      <div class="flex mt-4 justify-around uppercase">
        <span>rate</span><span>amount</span>
      </div>
      <div class="bg-gradient-to-b to-red-400 from-white">
        <div class="uppercase text-center text-red-400">buy</div>
        <div
          v-for="ask in asks"
          :key="ask"
          class="flex px-10 pt-1 justify-between"
        >
          <comma-filter :value="ask[0]" />
          <comma-filter :value="ask[1]" />
        </div>
      </div>

      <div class="p-2 text-center bg-gradient-to-b from-red-400 to-green-400">
        <comma-filter :value="tick" />
      </div>

      <div class="bg-gradient-to-t to-green-400 from-white">
        <div
          v-for="bid in bids"
          :key="bid"
          class="flex px-10 pt-1 justify-between"
        >
          <comma-filter :value="bid[0]" />

          <comma-filter :value="bid[1]" />
        </div>
        <div class="uppercase text-center text-green-400">sell</div>
      </div>
    </template>
    <template v-else>
      <spin-loader class="h-full" />
    </template>
  </base-card>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'

  type PriceAmount = [number, number][]

  export default defineComponent({
    components: {
      CommaFilter,
      SpinLoader,
      BaseCard,
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
