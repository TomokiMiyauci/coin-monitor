<template>
  <div class="z-0 relative">
    <div
      v-for="[price, amount] in priceAmount"
      :key="price"
      class="grid grid-cols-2 px-10 hover:bg-gray-50 duration-100 hover:bg-opacity-60"
    >
      <span
        v-flash
        class="bg-clip-text text-transparent bg-gradient-to-l"
        :class="valueClass"
      >
        {{ toComma(price) }}
      </span>

      <div class="text-right relative -z-10">
        <div
          v-show="sum"
          class="absolute rounded-l duration-1000 transition-all inset-y-0 -z-20 shadow right-0"
          :class="barClass"
          :style="compute(amount)"
        ></div>
        <span
          v-flash
          class="bg-clip-text text-transparent bg-gradient-to-l"
          :class="valueClass"
        >
          {{ toComma(amount) }}
        </span>
      </div>
    </div>

    <span class="span" :class="spanClass">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { PriceAmount } from '/@/components/order-book/share'
import { toComma } from '/@/utils/format'

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

    barClass: {
      type: String,
      default: '',
    },

    sum: {
      type: Number,
      required: true,
    },

    valueClass: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const compute = (a: number): string => `width: ${(a / props.sum) * 100}%`

    return {
      compute,
      toComma,
    }
  },
})
</script>

<style scoped>
.span {
  @apply text-7xl capitalize top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute bg-clip-text text-transparent;

  z-index: -1;
}
</style>
