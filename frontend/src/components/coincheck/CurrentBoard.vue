<template>
  <div class="p-2 grid grid-flow-col gap-4">
    <latest-price v-if="result" :value="result.last" />
    <ask-bid v-if="result" :ask="result.ask" :bid="result.bid" />
  </div>

  <order-book v-if="data.length" :asks="buys" :bids="sells" />
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onBeforeMount } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import AskBid from '/@/components/base/AskBid.vue'
  import { useKy } from '/@/plugins/ky'
  import OrderBook from '/@/components/base/OrderBook.vue'

  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
      OrderBook,
    },

    setup() {
      const { $http } = useKy()
      const data = ref([])
      const result = ref()

      const sells = computed(() =>
        data.value.filter(({ order_type }) => order_type === 'sell')
      )
      const buys = computed(() =>
        data.value.filter(({ order_type }) => order_type === 'buy')
      )

      onBeforeMount(() => {
        setInterval(setData, 10000)
        setInterval(setTicker, 10000)
      })

      const setTicker = async () => {
        const r = await $http
          .get('https://coin-monitor-api.tomoki-miyauci.vercel.app/api/src')
          .json()

        result.value = r
      }

      const setData = async () => {
        const { data: d } = await $http
          .get(
            'https://coin-monitor-api.tomoki-miyauci.vercel.app/api/src/coincheck/ticker'
          )
          .json()

        data.value = d
      }

      setData()
      setTicker()

      return { sells, buys, result, data }
    },
  })
</script>
