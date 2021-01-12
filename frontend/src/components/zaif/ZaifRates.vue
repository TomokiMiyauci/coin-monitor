<template>
  <base-card>
    <div class="flex p-4 justify-between items-center">
      <h3 class="ml-2 text-2xl text-gray-400">Coins</h3>
      <!-- <base-menu
        :value="baseSymbol"
        :symbols="zaifBaseSymbols"
        @input="onInput"
      >
        <template #default="{ symbol }">
          <base-svg-symbol :symbol="symbol">
            <zaif-symbol :symbol="symbol" />
          </base-svg-symbol>
        </template>
      </base-menu> -->
    </div>

    <rate-table-ratio
      class="w-full"
      :headers="[
        { value: 'ratio', tooltipText: 'Initial Price', text: '0:00' },
      ]"
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
  import { computed, defineComponent, ref } from 'vue'
  import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  // import BaseMenu from '/@/components/base/BaseMenu.vue'
  import RateTableRatio from '/@/components/rate/RateTableRatio.vue'

  import { ZaifBaseSymbol } from '/@/components/base/coin'
  import { useRates, usePair } from '/@/components/zaif/useRate'
  import { useOpenPrice } from '/@/reactives/api/zaif'
  import { useFirestore } from '/@/plugins/firebase'
  import ZaifSymbol from './ZaifSymbol.vue'
  import { joinSeparator } from '/@/utils/format'
  export default defineComponent({
    components: {
      BaseSvgSymbol,
      BaseCard,
      // BaseMenu,
      ZaifSymbol,
      RateTableRatio,
    },

    setup() {
      const baseSymbol = ref<ZaifBaseSymbol>('JPY')
      const now = new Date()
      const { $firestore } = useFirestore()
      const openPrice = [
        'btc_jpy',
        'xem_jpy',
        'eth_jpy',
        'bch_jpy',
        'mona_jpy',
      ].map((pair) => {
        const { state, setData } = useOpenPrice(pair, now, $firestore)
        setData()

        return {
          state,
          setData,
        }
      })

      const openPriceMap = computed(() =>
        openPrice.reduce((acc, { state }) => {
          if (!state.value || !state.value.pair) return acc

          acc[state.value.pair] = state.value.value
          return acc
        }, {} as any)
      )

      const { pairs } = usePair(baseSymbol)

      const { rates: _rates } = useRates(pairs)
      const rates = computed(() =>
        _rates.value.map(({ baseSymbol, symbol, rate }) => {
          const pair = joinSeparator(symbol.toLowerCase(), baseSymbol)
          const _rate = openPriceMap.value[pair]
          return {
            rate,
            baseSymbol,
            symbol,
            ratio: !!rate && !!_rate ? (rate / _rate - 1) * 100 : undefined,
          }
        })
      )
      const onInput = (v: ZaifBaseSymbol) => {
        baseSymbol.value = v
      }

      return {
        onInput,
        rates,
      }
    },
  })
</script>
