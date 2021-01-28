import getOrderBooks from '/@/api/coincheck/order-books'
import type { Pair } from '/@/api/coincheck/rate'
import getRate from '/@/api/coincheck/rate'
import getTicker from '/@/api/coincheck/ticker'
import getTrades from '/@/api/coincheck/trades'
// type Pair = string

export { getOrderBooks, getRate, getTicker, getTrades, Pair }
