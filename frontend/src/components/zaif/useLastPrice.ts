import { getLastPrice } from '/@/api/zaif'
import { useReactive } from '/@/core/reactive'
import { useInterval } from '/@/core/interval'

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
