import { zaifPairsPath } from '/@/functions/pure/api'
import { getOpenPrice, getPrices } from '/@/functions/effect/api/share'

const baseZaifGetOpenPrice = getOpenPrice(zaifPairsPath)
const get1HRates = getPrices(zaifPairsPath)

export { baseZaifGetOpenPrice, get1HRates }
