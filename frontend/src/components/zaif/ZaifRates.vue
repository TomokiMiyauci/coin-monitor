<template>
  <base-card>
    <div class="flex p-2 justify-between items-center">
      <h3 class="ml-2 text-lg text-gray-400">Coins</h3>
      <base-menu
        :value="baseSymbol"
        :symbols="zaifBaseSymbols"
        @input="onInput"
      >
        <template #default="{ symbol }">
          <base-svg-symbol :symbol="symbol">
            <zaif-symbol :symbol="symbol" />
          </base-svg-symbol>
        </template>
      </base-menu>
    </div>

    <rate-table-ratio
      class="w-full"
      :headers="[{ value: 'ratio' }]"
      :items="rates"
    >
      <template #default="{ symbol }">
        <base-svg-symbol :symbol="symbol">
          <zaif-symbol :symbol="symbol" />
        </base-svg-symbol>
      </template>
    </rate-table-ratio>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import BaseMenu from '/@/components/base/BaseMenu.vue'
  import RateTableRatio from '/@/components/rate/RateTableRatio.vue'

  import { zaifBaseSymbols, ZaifBaseSymbol } from '/@/components/base/coin'
  import { useRates, usePair } from '/@/components/zaif/useRate'
  import ZaifSymbol from './ZaifSymbol.vue'

  export default defineComponent({
    components: {
      BaseSvgSymbol,
      BaseCard,
      BaseMenu,
      ZaifSymbol,
      RateTableRatio,
    },

    setup() {
      const baseSymbol = ref<ZaifBaseSymbol>('JPY')
      const { pairs } = usePair(baseSymbol)

      const { rates } = useRates(pairs)

      const onInput = (v: ZaifBaseSymbol) => {
        baseSymbol.value = v
      }

      return {
        rates,
        onInput,
        baseSymbol,
        zaifBaseSymbols,
      }
    },
  })
</script>
