<template>
  <table>
    <tbody>
      <tr v-for="(value, key) of rates" :key="key">
        <td class="px-2 py-2">{{ format(key) }}</td>
        <td class="px-4 py-2"><comma-filter :value="value" /></td>
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
      rates: {
        type: Object,
        default: undefined,
      },
    },

    setup() {
      const format = (text: string) => {
        return text.split('_')[0].toUpperCase()
      }

      return { format }
    },
  })
</script>
