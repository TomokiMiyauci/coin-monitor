<template>
  <td class="px-3 sm:px-5 py-1">
    {{ formattedDate }}
  </td>
  <td class="px-3 py-1 text-center">
    <chip-buy v-if="type === 'BUY'" />
    <chip-sell v-else />
  </td>

  <td class="px-3 py-1 text-center">
    <span>{{ toComma(rate) }}</span>
  </td>

  <td class="px-3 sm:px-5 py-1 text-right">
    {{ amount }}
  </td>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import ChipBuy from '/@/components/base/chips/ChipBuy.vue'
import ChipSell from '/@/components/base/chips/ChipSell.vue'
import { toComma } from '/@/utils/format'

export default defineComponent({
  components: {
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

  setup(props) {
    const formattedDate = computed(() => {
      const _date = (props.date as any) as Date
      return _date.toLocaleString('ja', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    })

    return {
      formattedDate,
      toComma,
    }
  },
})
</script>
