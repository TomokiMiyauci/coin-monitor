import { computed, ComputedRef } from 'vue'

import { useInterval } from '/@/core/interval'
import { ResponsePrice } from '/@/functions/effect/api/bitpoint'
import { price } from '/@/reactives/api/bitpoint'

const computePrice = (state: ComputedRef<ResponsePrice | undefined>) => {
  const price = computed(() => state.value?.symbolPrice[0].price)

  return {
    price,
  }
}

export const usePrice = () => {
  const { state, setData } = price()

  setData()
  useInterval(setData, 10000)

  return {
    ...computePrice(state),
  }
}
