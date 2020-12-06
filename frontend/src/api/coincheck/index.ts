import getOrderBooks from '/@/api/coincheck/order-books'
import getTicker from '/@/api/coincheck/ticker'
import getTrades from '/@/api/coincheck/trades'
import getRate from '/@/api/coincheck/rate'
import type { Pair } from '/@/api/coincheck/rate'
// type Pair = string

export { getOrderBooks, getTicker, getTrades, getRate, Pair }
