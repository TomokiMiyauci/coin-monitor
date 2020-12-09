<template>
  <table>
    <tbody>
      <tr v-for="(value, key) of rates" :key="key">
        <td class="px-2 py-2">
          <svg-symbol :symbol="format(key)" />
        </td>
        <td class="px-4 py-2"><comma-filter :value="value.rate" /></td>
        <td class="px-4 py-2">
          <flash-box :value="value.ratio">
            <percentage :value="value.ratio" />
          </flash-box>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Percentage from '/@/components/base/Percentage.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import SvgSymbol from '/@/components/base/SvgSymbol.vue'
  import FlashBox from '/@/components/base/FlashBox.vue'

  export default defineComponent({
    components: {
      CommaFilter,
      SvgSymbol,
      Percentage,
      FlashBox,
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
