import { getLastPrice } from '/@/api/zaif'
import { useInterval } from '/@/core/interval'
import { useReactive } from '/@/core/reactive'

export const useLastPrice = () => {
  const { get } = getLastPrice()
  const { state: lastPrice, setState } = useReactive<number | undefined>(
    undefined
  )

  const setData = async () => {
    const { last_price } = await get('btc_jpy')

    setState(last_price)
  }

  setData()
  useInterval(setData, 10000)

  return {
    lastPrice,
  }
}
