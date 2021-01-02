<template>
  <div class="z-0 relative">
    <div
      v-for="[price, amount] in priceAmount"
      :key="price"
      class="flex px-10 py-0.5 justify-between items-center hover:bg-gray-50 duration-100 hover:bg-opacity-60"
    >
      <comma-filter
        class="bg-clip-text text-transparent bg-gradient-to-r"
        :class="valueClass"
        :value="price"
      />
      <comma-filter
        class="bg-clip-text text-transparent bg-gradient-to-l"
        :class="valueClass"
        :value="amount"
      />
    </div>

    <span class="span" :class="spanClass">{{ text }}</span>
  </div>
</template>

<script lang="ts">
  import type { PriceAmount } from '/@/components/order-book/share'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      priceAmount: {
        type: Array as () => PriceAmount,
        default: () => [],
      },

      text: {
        type: String,
        default: '',
      },

      spanClass: {
        type: String,
        default: '',
      },

      valueClass: {
        type: String,
        default: '',
      },
    },

    components: {
      CommaFilter,
    },
  })
</script>

<style scoped>
  .span {
    @apply text-7xl capitalize top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute bg-clip-text text-transparent;

    z-index: -1;
  }
</style>
