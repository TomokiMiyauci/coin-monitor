<template>
  <order-book :asks="asks" :bids="bids" />
</template>

<script setup lang="ts">
  import { useOrderBook } from '/@/components/coincheck/useOrderBooks'
  import OrderBook from '/@/components/order-book/OrderBook.vue'

  const { asks, bids } = useOrderBook()
</script>
