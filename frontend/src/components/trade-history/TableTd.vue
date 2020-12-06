<template>
  <base-td class="px-3 py-1">
    {{ date.toLocaleString() }}
  </base-td>
  <base-td class="px-3 py-1 text-center">
    <chip-buy v-if="type === 'BUY'" />
    <chip-sell v-else />
  </base-td>

  <base-td class="px-3 py-1">
    <comma-filter :value="rate" />
  </base-td>

  <base-td class="px-3 py-1">
    {{ amount }}
  </base-td>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ChipBuy from '/@/components/base/chips/ChipBuy.vue'
  import ChipSell from '/@/components/base/chips/ChipSell.vue'
  import BaseTd from '/@/components/base/BaseTd.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  export default defineComponent({
    components: {
      BaseTd,
      CommaFilter,
      ChipBuy,
      ChipSell,
    },

    props: {
      date: {
        type: Date,
        default: () => new Date(),
      },

      type: {
        type: String,
        requreid: true,
        default: '',
        validate: (v: string) => {
          return ['SELL', 'BUY'].includes(v.toUpperCase())
        },
      },

      rate: {
        type: Number,
        default: 0,
      },

      amount: {
        type: Number,
        default: 0,
      },
    },
  })
</script>
