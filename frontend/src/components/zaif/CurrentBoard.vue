<template>
  <div class="2xl:grid grid-cols-2 grid-rows-2 gap-4">
    <latest-price
      class="col-span-full mb-6 2xl:mb-0 row-span-1 2xl:col-span-1"
      :value="lastPrice"
    />

    <zaif-ask-bid class="col-span-full row-span-2 2xl:col-span-1" />
  </div>

  <div class="grid mt-6 grid-cols-6 gap-6">
    <zaif-rates
      class="col-span-full sm:col-span-3 md:col-span-3 2xl:col-span-2"
    />

    <zaif-order-book class="col-span-full sm:col-span-3 2xl:col-span-2" />

    <zaif-trade-history
      class="col-span-full sm:col-span-6 xl:col-span-3 2xl:col-span-2"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LatestPrice from '/@/components/last-price/LastPrice.vue'
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
