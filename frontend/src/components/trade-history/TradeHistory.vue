<template>
  <table>
    <thead>
      <tr class="bg-gray-300">
        <th class="p-2">Date</th>
        <th>
          <base-span class="text-red-400 rounded-full shadow bg-white px-1"
            >B</base-span
          >
          /
          <base-span class="text-green-400 rounded-full shadow bg-white px-1"
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
        class="hover:bg-gray-100"
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
