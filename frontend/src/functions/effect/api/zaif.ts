import { zaifPairsPath } from '/@/functions/pure/api'
import { getOpenPrice } from '/@/functions/effect/api/share'

const baseZaifGetOpenPrice = getOpenPrice(zaifPairsPath)

export { baseZaifGetOpenPrice }
