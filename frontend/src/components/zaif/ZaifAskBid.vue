<template>
  <ask-bid v-bind="askBidAttrs">
    <template #header>
      <header class="p-4 flex items-center justify-between">
        <h3 class="text-2xl">Current</h3>

        <span class="flex gap-4">
          <div>
            <input
              v-model.number="interval"
              min="1"
              class="appearance-none h-4 bg-blue-300 shadow p-px cursor-pointer outline-none rounded-xl"
              max="10"
              step="3"
              type="range"
            />

            <div class="flex justify-between px-1">
              <span>1</span><span class="ml-2">4</span
              ><span class="ml-2">7</span><span>10</span>
            </div>
          </div>
          <select-box-zaif-pair v-model="pairRef" />
        </span>
      </header>
    </template>
  </ask-bid>
</template>

<script setup lang="ts">
import { computed, inject, watch } from 'vue'

import AskBid from '/@/components/base/AskBid.vue'
import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'
import { getTicker } from '/@/functions/effect/api/zaif'
import { resetInterval } from '/@/functions/effect/interval'
import { multiplie1000 } from '/@/functions/pure/math'
import { tickerKey } from '/@/provider'

const { stateRef, pairRef, interval, intervalId } = inject(tickerKey)!

const askBidAttrs = computed(() => ({
  ask: stateRef.value?.ask,
  bid: stateRef.value?.bid,
  high: stateRef.value?.high,
  low: stateRef.value?.low,
  volume: stateRef.value?.volume,
}))

watch(interval, (now) => {
  intervalId.value = resetInterval(
    intervalId.value,
    async () => (stateRef.value = await getTicker(pairRef.value)),
    multiplie1000(now)
  )
})

watch(pairRef, (now) => {
  stateRef.value = undefined
  getTicker(now).then((result) => (stateRef.value = result))
  intervalId.value = resetInterval(
    intervalId.value,
    async () => (stateRef.value = await getTicker(now)),
    multiplie1000(interval.value)
  )
})
</script>
