<template>
  <table>
    <thead>
      <tr class="bg-gray-300">
        <th class="p-2">Date</th>
        <th>
          <base-span class="text-red-500 rounded-full shadow bg-white px-1"
            >B</base-span
          >
          /
          <base-span class="text-green-500 rounded-full shadow bg-white px-1"
            >S</base-span
          >
        </th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="{ date, type, rate, amount, id } in data" :key="id">
        <table-td v-bind="{ type, date, rate, amount }" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseSpan from '../base/BaseSpan.vue'
  import TableTd from '/@/components/trade-history/TableTd.vue'

  export default defineComponent({
    components: {
      TableTd,
      BaseSpan,
    },
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
  })
</script>
