<template>
  <div class="grid grid-cols-2 gap-10">
    <latest-price :value="lastPrice" />
    <ask-bid :ask="ask" :bid="bid" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import { useLastPrice } from '/@/components/zaif/useLastPrice'
  import { useTicker } from '/@/components/zaif/useTicker'

  export default defineComponent({
    components: { LatestPrice, AskBid },
    setup() {
      const { lastPrice } = useLastPrice()
      const { ask, bid } = useTicker()

      return {
        lastPrice,
        ask,
        bid,
      }
    },
  })
</script>
