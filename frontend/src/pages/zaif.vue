<template>
  <div class="flex justify-between">
    <h3 class="text-gray-700 text-3xl mb-8 font-medium capitalize">Zaif</h3>
    <select-box-zaif-pair :value="pair" @input="onInput" />
  </div>
  <current-board />
</template>

<script setup lang="ts">
  import { ref, provide } from 'vue'
  import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'

  import CurrentBoard from '/@/components/zaif/CurrentBoard.vue'
  import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'

  const initPair = 'btc_jpy'
  const pair = ref<ZaifOrderBookPairs>(initPair)
  const historyPair = ref<ZaifOrderBookPairs>(initPair)
  const tradeHistoryPair = ref<ZaifOrderBookPairs>(initPair)
  const orderBookPair = ref<ZaifOrderBookPairs>(initPair)
  const askBidPair = ref<ZaifOrderBookPairs>(initPair)

  provide('historyPair', historyPair)
  provide('tradeHistoryPair', tradeHistoryPair)
  provide('orderBookPair', orderBookPair)
  provide('askBidPair', askBidPair)

  const onInput = (payload: ZaifOrderBookPairs) => {
    ;[pair, historyPair, tradeHistoryPair, orderBookPair, askBidPair].forEach(
      (v) => {
        v.value = payload
      }
    )
  }
</script>
