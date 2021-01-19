<template>
  <trade-history :data="data">
    <template #menu>
      <select-box-zaif-pair :value="pair" @input="onInput" />
    </template>
  </trade-history>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import type { Ref } from 'vue'
  import { useTrades } from '/@/components/zaif/useTrades'
  import TradeHistory from '/@/components/base/TradeHistory.vue'
  import SelectBoxZaifPair from '/@/components/zaif/SelectBoxZaifPair.vue'

  import type { ZaifOrderBookPairs } from '/@/components/zaif/pair'

  const pair = inject('historyPair') as Ref<ZaifOrderBookPairs>

  const { data } = useTrades(pair)

  const onInput = (payload: ZaifOrderBookPairs) => {
    pair.value = payload
  }
</script>
