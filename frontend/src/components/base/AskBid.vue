<template>
  <base-card class="flex gap-6 justify-center items-center">
    <div>
      <base-title-value title="Ask" value-class="text-3xl" :value="ask" />
    </div>
    <div>
      <base-title-value
        title="Bid"
        title-class=" text-right"
        value-class="text-3xl"
        :value="bid"
      />
    </div>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseCard from './BaseCard.vue'
  // import CommaFilter from '/@/components/base/CommaFilter.vue'
  import BaseTitleValue from '/@/components/base/BaseTitleValue.vue'

  export default defineComponent({
    components: {
      BaseTitleValue,
      BaseCard,
    },
    props: {
      ask: {
        type: Number,
        required: true,
      },

      bid: {
        type: Number,
        required: true,
      },
    },
  })
</script>
