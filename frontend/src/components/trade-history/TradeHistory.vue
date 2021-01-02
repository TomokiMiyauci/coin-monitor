<template>
  <table>
    <thead>
      <tr class="bg-gradient-to-r from-white via-gray-200 to-white">
        <th class="p-2">Date</th>
        <th>
          <base-span class="text-white rounded-full shadow bg-red-400 px-1"
            >B</base-span
          >
          /
          <base-span class="text-white rounded-full shadow bg-green-400 px-1"
            >S</base-span
          >
        </th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="{ date, type, rate, amount, id } in data"
        :key="id"
        class="hover:bg-gray-100 bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
        :class="type === 'SELL' ? 'from-green-100' : 'from-red-100'"
      >
        <table-td v-bind="{ type, date, rate, amount }" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseSpan from '/@/components/base/BaseSpan.vue'
  import TableTd from '/@/components/trade-history/TableTd.vue'

  type Data = {
    id: number
    date: Date
    type: 'SELL' | 'BUY'
    rate: number
    amount: number
  }

  export default defineComponent({
    components: {
      TableTd,
      BaseSpan,
    },
    props: {
      data: {
        type: Array as () => Data[],
        default: () => [],
      },
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
    @apply opacity-0 transform translate-x-5;
  }
</style>
