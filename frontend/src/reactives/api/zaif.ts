import { baseZaifGetOpenPrice } from '/@/functions/effect/api/zaif'
import { ZaifPair } from '/@/types/pair'
import { baseUsePrice } from '/@/reactives/api/share'

const useOpenPrice = baseUsePrice<ZaifPair>(baseZaifGetOpenPrice)
// const useYesterdayNowPrice = baseUsePrice<ZaifPair>(
//   baseCoincheckGetYesterdayNowPrice
// )

export { useOpenPrice }
