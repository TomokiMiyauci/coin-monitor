import {
  get1DPrices,
  get1HPrices,
  get5mPrices,
  getOpenPrice,
} from '/@/functions/effect/api/share'
import { zaifPairsPath } from '/@/functions/pure/api'

const baseZaifGetOpenPrice = getOpenPrice(zaifPairsPath)
const get1HRates = get1HPrices(zaifPairsPath)
const get5mRates = get5mPrices(zaifPairsPath)
const get1DRates = get1DPrices(zaifPairsPath)

export { baseZaifGetOpenPrice, get1DRates, get1HRates, get5mRates }
