<template>
  <table>
    <tbody>
      <tr v-for="(value, key) of rates" :key="key">
        <td class="px-2 py-2">
          <svg-symbol :symbol="format(key)" />
        </td>
        <td class="px-4 py-2"><comma-filter :value="value" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  // import { VueComponent as Btc } from '/@/assets/svgs/coins/btc.svg'
  import SvgSymbol from '/@/components/base/SvgSymbol.vue'

  export default defineComponent({
    components: {
      CommaFilter,
      SvgSymbol,
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
