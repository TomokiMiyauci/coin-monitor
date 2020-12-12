<template>
  <transition-group name="fade" mode="out-in" appear>
    <rate-percentage
      v-for="{ symbol, rate, ratio } of filter"
      :key="`${symbol}`"
      class="flex justify-between items-center hover:bg-gray-100 transition duration-100"
      :symbol="symbol"
      :rate="rate"
      :ratio="ratio"
    />
  </transition-group>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import RatePercentage from './RatePercentage.vue'

  type Rate = {
    symbol: string
    baseSymbol: string
    rate: number | undefined
    ratio: number | undefined
  }

  export default defineComponent({
    components: {
      RatePercentage,
    },
    props: {
      rates: {
        type: Array as PropType<Rate[]>,
        default: () => [],
      },
    },

    setup(props) {
      const format = (text: string) => {
        return text.split('_')[0].toUpperCase()
      }

      const filter = computed(() => {
        return props.rates.filter((rate) => !!rate.rate)
      })

      return { format, filter }
    },
  })
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    @apply transition duration-200;
  }

  .fade-enter-from,
  .fade-leave-to {
    @apply opacity-0 transform translate-x-2;
  }
</style>
