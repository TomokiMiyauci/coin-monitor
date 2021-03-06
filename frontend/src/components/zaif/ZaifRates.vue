<template>
  <div class="card-none sm:card">
    <div class="sm:flex p-4 hidden justify-between items-center">
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
import { ZaifBaseSymbol } from '/@/components/base/coin'
import RateTableRatio from '/@/components/rate/RateTableRatio.vue'
import { usePair, useRates } from '/@/components/zaif/useRate'
import { useFirestore } from '/@/plugins/firebase'
import { useOpenPrice } from '/@/reactives/api/zaif'
import { joinSeparator } from '/@/utils/format'

import ZaifSymbol from './ZaifSymbol.vue'
export default defineComponent({
  components: {
    BaseSvgSymbol,
    // BaseMenu,
    ZaifSymbol,
    RateTableRatio,
  },

  setup() {
    const baseSymbol = ref<ZaifBaseSymbol>('JPY')
    const now = new Date()
    const { firestore } = useFirestore()
    const openPrice = [
      'btc_jpy',
      'xem_jpy',
      'eth_jpy',
      'bch_jpy',
      'mona_jpy',
      'zaif_jpy',
      'cicc_jpy',
      'fscc_jpy',
      'ncxc_jpy',
      'xcp_jpy',
      'erc20.cms_jpy',
      'mosaic.cms_jpy',
    ].map((pair) => {
      const { state, setData } = useOpenPrice(pair, now, firestore)
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
        const _rate = pair === 'jpyz_jpy' ? 1 : openPriceMap.value[pair]
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
