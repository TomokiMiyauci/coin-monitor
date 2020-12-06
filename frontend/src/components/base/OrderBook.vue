<template>
  <table class="mx-auto shadow rounded" style="display: inline-table">
    <thead>
      <tr>
        <th
          class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
        >
          Rate
        </th>
        <th
          class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
        >
          Amount
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td colspan="2" class="text-center bg-red-500 uppercase p-2">Buy</td>
      </tr>
    </tbody>

    <tbody v-for="({ amount, rate }, i) in asks" :key="i">
      <tr>
        <td class="px-5 py-1">
          <comma-filter class="text-red-600" :value="rate" />
        </td>
        <td class="px-5">{{ amount }}</td>
      </tr>
    </tbody>

    <tbody v-for="({ amount, rate }, i) in bids" :key="i">
      <tr>
        <td class="px-5 py-1">
          <comma-filter class="text-green-500" :value="rate" />
        </td>
        <td class="px-5">{{ amount }}</td>
      </tr>
    </tbody>

    <tbody>
      <tr>
        <td colspan="2" class="text-center bg-green-500 p-2">Sell</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  export default defineComponent({
    components: {
      CommaFilter,
    },
    props: {
      asks: {
        type: Array,
        default: () => [],
      },

      bids: {
        type: Array,
        default: () => [],
      },
    },
  })
</script>
