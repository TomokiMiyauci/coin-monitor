import { zaifPairsPath } from '/@/functions/pure/api'
import {
  getOpenPrice,
  get1HPrices,
  get5mPrices,
  get1DPrices,
} from '/@/functions/effect/api/share'

const baseZaifGetOpenPrice = getOpenPrice(zaifPairsPath)
const get1HRates = get1HPrices(zaifPairsPath)
const get5mRates = get5mPrices(zaifPairsPath)
const get1DRates = get1DPrices(zaifPairsPath)

export { baseZaifGetOpenPrice, get1HRates, get5mRates, get1DRates }
