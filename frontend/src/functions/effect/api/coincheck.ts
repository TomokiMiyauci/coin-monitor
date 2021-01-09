import { pairsPath, dateRatherThanWhere, limit1 } from '/@/functions/pure/api'
import {
  collection,
  orderBy,
  getDocs,
  query,
  FirebaseFirestore,
  Timestamp,
} from 'firebase/firestore/lite'
import { getBefore1DayFromDate, getMidnightFromDate } from '/@/utils/format'
import { CoincheckPair } from '/@/types/pair'
import { curriedRun, baseGetRateApi } from '/@/functions/pure/api'

type ResponseData = {
  value: number
  date: Timestamp
}

const baseGetPrice = (
  pair: CoincheckPair,
  date: Date,
  firestore: FirebaseFirestore
) =>
  getDocs<ResponseData>(
    query(
      collection(firestore, pairsPath(pair)('rates')),
      orderBy('date', 'asc'),
      dateRatherThanWhere(date),
      limit1
    )
  ).then(({ docs }) => docs[0].data())

const curriedBaseGetPrice = (fn: (fromDate: Date) => Date) => (
  pair: CoincheckPair,
  date: Date,
  firestore: FirebaseFirestore
) => baseGetPrice(pair, fn(date), firestore)

const getOpenPrice = curriedBaseGetPrice(getMidnightFromDate)
const getYesterdayNowPrice = curriedBaseGetPrice(getBefore1DayFromDate)

type ResponseGetRate = { rate: number }

const getRate = curriedRun<ResponseGetRate, 'coincheck'>(baseGetRateApi)

export {
  getOpenPrice,
  ResponseData,
  getRate,
  ResponseGetRate,
  getYesterdayNowPrice,
  baseGetPrice,
}
