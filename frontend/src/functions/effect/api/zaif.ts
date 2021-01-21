import { zaifPairsPath } from '/@/functions/pure/api'
import {
  getOpenPrice,
  get1HPrices,
  get5mPrices,
} from '/@/functions/effect/api/share'

const baseZaifGetOpenPrice = getOpenPrice(zaifPairsPath)
const get1HRates = get1HPrices(zaifPairsPath)
const get5mRates = get5mPrices(zaifPairsPath)

export { baseZaifGetOpenPrice, get1HRates, get5mRates }
