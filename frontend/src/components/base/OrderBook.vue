<template>
  <div class="card">
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
        <div class="bg-gradient-to-b to-red-400 z-0 from-gray-50 aaa relative">
          <div
            v-for="ask in asks"
            :key="ask"
            class="flex px-10 py-0.5 justify-between items-center"
          >
            <span v-flash>{{ toComma(ask[0]) }}</span>
            <span v-flash>{{ toComma(ask[1]) }}</span>
          </div>
        </div>

        <div
          class="p-5 text-center text-lg bg-gradient-to-b from-red-400 to-green-400"
        >
          <span v-flash>{{ toComma(tick) }}</span>
        </div>

        <div class="bg-gradient-to-t to-green-400 bbb relative z-0 from-white">
          <div
            v-for="bid in bids"
            :key="bid"
            class="flex flex-row py-0.5 px-10 justify-between hover:bg-gray-200 hover:opacity-70"
          >
            <span v-flash>{{ toComma(bid[0]) }}</span>
            <span v-flash>{{ toComma(bid[1]) }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex justify-center min-h-96">
          <spin-loader />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue'

import SpinLoader from '/@/components/base/loaders/SpinLoader.vue'
import { toComma } from '/@/utils/format'

const props = defineProps({
  asks: {
    type: Array as PropType<[number, number][]>,
    default: () => [],
  },

  bids: {
    type: Array as () => [number, number][],
    default: () => [],
  },
})

const tick = computed(() => {
  if (
    !!props.asks.length &&
    !!props.asks[9] &&
    !!props.bids.length &&
    !!props.bids[0]
  ) {
    return props.asks[9][0] - props.bids[0][0]
  }
  return undefined
})
</script>

<style scoped>
.aaa::after {
  content: 'Ask';

  @apply text-7xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  absolute bg-clip-text text-transparent bg-gradient-to-b from-gray-400 to-red-500;

  z-index: -1;
}

.bbb::after {
  content: 'bid';

  @apply text-7xl capitalize top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  absolute bg-clip-text text-transparent bg-gradient-to-b from-green-500 to-gray-400;

  z-index: -1;
}
</style>
