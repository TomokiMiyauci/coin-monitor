<template>
  <order-book :asks="asks" :bids="bids">
    <template #menu>
      <select-box-zaif-pair :value="pair" @input="onInput" />
    </template>
  </order-book>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import type { Ref } from 'vue'

  import { useDepth } from '/@/components/zaif/useDepth'
  import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'
  import OrderBook from '/@/components/order-book/OrderBook.vue'
  import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'

  const pair = inject('orderBookPair') as Ref<ZaifOrderBookPairs>

  const onInput = (payload: ZaifOrderBookPairs) => {
    pair.value = payload
  }

  const { asks, bids } = useDepth(pair)
</script>
