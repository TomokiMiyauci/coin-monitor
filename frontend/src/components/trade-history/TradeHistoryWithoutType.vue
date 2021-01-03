<template>
  <table>
    <thead>
      <tr class="bg-gradient-to-r from-white via-gray-200 to-white">
        <th class="p-2">Date</th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="{ date, rate, amount, id } in data"
        :key="id"
        class="hover:bg-gray-100 bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
      >
        <table-td-without-type v-bind="{ date, rate, amount }" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseSpan from '/@/components/base/BaseSpan.vue'
  import TableTdWithoutType from '/@/components/trade-history/TableTdWithoutType.vue'
  import { CommonData } from '/@/reactives/bitpoint/useTrades'

  export default defineComponent({
    components: {
      TableTdWithoutType,
      BaseSpan,
    },
    props: {
      data: {
        type: Array as () => CommonData[],
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
