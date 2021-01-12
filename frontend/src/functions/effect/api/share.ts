import { dateRatherThanWhere, limit1 } from '/@/functions/pure/api'
import {
  collection,
  orderBy,
  getDocs,
  query,
  FirebaseFirestore,
  Timestamp,
} from 'firebase/firestore/lite'
import { CoincheckPair } from '/@/types/pair'
import { getBefore1DayFromDate, getMidnightFromDate } from '/@/utils/format'
import { zaifPairsPath } from '/@/functions/pure/api'

type ResponseData = {
  value: number
  date: Timestamp
}

const baseGetPrice = (path: string, date: Date, firestore: FirebaseFirestore) =>
  getDocs<ResponseData>(
    query(
      collection(firestore, path),
      orderBy('date', 'asc'),
      dateRatherThanWhere(date),
      limit1
    )
  ).then(({ docs }) => docs[0].data())

const curriedBaseGetPrice = (fn: (fromDate: Date) => Date) => (
  f: typeof zaifPairsPath
) => (pair: CoincheckPair, date: Date, firestore: FirebaseFirestore) =>
  baseGetPrice(f(pair)('rates'), fn(date), firestore)

const getOpenPrice = curriedBaseGetPrice(getMidnightFromDate)
const getYesterdayNowPrice = curriedBaseGetPrice(getBefore1DayFromDate)

export { getOpenPrice, getYesterdayNowPrice, ResponseData }
