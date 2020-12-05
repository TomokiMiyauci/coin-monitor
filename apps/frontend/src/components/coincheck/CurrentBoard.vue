<template>
  <div class="p-2 grid grid-flow-col gap-4">
    <latest-price :value="value.last" />
    <ask-bid :ask="value.ask" :bid="value.bid" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LatestPrice from '/@/components/base/LatestPrice.vue'
  import AskBid from '../base/AskBid.vue'

  export default defineComponent({
    components: {
      LatestPrice,
      AskBid,
    },
    props: {
      value: {
        type: Object,
      },
    },
  })
</script>
