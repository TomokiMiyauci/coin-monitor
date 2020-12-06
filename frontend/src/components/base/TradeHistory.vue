<template>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>B/S</th>
        <th>Rate</th>
        <th>Amount</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="{ created_at, order_type, rate, amount, id } in data"
        :key="id"
        class="px-3"
      >
        <td class="px-3">
          {{ created_at }}
        </td>
        <td class="px-3">
          {{ order_type }}
        </td>

        <td class="px-3">
          <comma-filter :value="rate" />
        </td>

        <td class="px-3">
          {{ amount }}
        </td>
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
      data: {
        type: Array,
        default: () => [],
      },
    },
  })
</script>
