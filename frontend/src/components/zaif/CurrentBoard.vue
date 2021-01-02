<template>
  <div class="grid grid-cols-6 gap-6">
    <latest-price
      class="col-span-6 md:col-span-5 2xl:col-span-3"
      :value="lastPrice"
      :data="historycalLast"
    />

    <zaif-ask-bid class="col-span-6 md:col-span-4 2xl:col-span-3" />

    <zaif-rates
      class="col-span-full sm:col-span-3 md:col-span-3 2xl:col-span-2"
    />

    <zaif-order-book class="col-span-full sm:col-span-3 2xl:col-span-2" />

    <zaif-trade-history class="col-span-full md:col-span-4 xl:col-span-3" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import { useLastPrice } from '/@/components/zaif/useLastPrice'

  import ZaifRates from '/@/components/zaif/ZaifRates.vue'
  import ZaifOrderBook from '/@/components/zaif/ZaifOrderBook.vue'
  import ZaifTradeHistory from '/@/components/zaif/ZaifTradeHistory.vue'
  import ZaifAskBid from '/@/components/zaif/ZaifAskBid.vue'
  import { useHistory } from '/@/composites/rate'

  export default defineComponent({
    components: {
      LatestPrice,
      ZaifOrderBook,
      ZaifAskBid,
      ZaifTradeHistory,
      ZaifRates,
    },
    setup() {
      const { lastPrice } = useLastPrice()

      return {
        lastPrice,
        historycalLast: useHistory(lastPrice, 10),
      }
    },
  })
</script>
