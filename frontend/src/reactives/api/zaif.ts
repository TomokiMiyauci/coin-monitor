import { baseZaifGetOpenPrice } from '/@/functions/effect/api/zaif'
import { baseUsePrice } from '/@/reactives/api/share'
import { ZaifPair } from '/@/types/pair'

const useOpenPrice = baseUsePrice<ZaifPair>(baseZaifGetOpenPrice)
// const useYesterdayNowPrice = baseUsePrice<ZaifPair>(
//   baseCoincheckGetYesterdayNowPrice
// )

export { useOpenPrice }
