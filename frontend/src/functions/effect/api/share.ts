import {
  collection,
  CollectionReference,
  FirebaseFirestore,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore/lite'

import {
  dateLessThanWhere,
  dateRatherThanWhere,
  limit1,
  limit12,
} from '/@/functions/pure/api'
import { zaifPairsPath } from '/@/functions/pure/api'
import { CoincheckPair } from '/@/types/pair'
import { getBefore1DayFromDate, getMidnightFromDate } from '/@/utils/format'

type ResponseData = {
  value: number
  date: Timestamp
}

const baseFirestore = <T>(
  collectionReference: CollectionReference,
  ...queryConstraints: QueryConstraint[]
) => getDocs<T>(query(collectionReference, ...queryConstraints))

const curriedBaseFirestore = <T>(
  path: string,
  firestore: FirebaseFirestore,
  ...queryConstraints: QueryConstraint[]
) => baseFirestore<T>(collection(firestore, path), ...queryConstraints)

const baseGet = (
  path: string,
  firestore: FirebaseFirestore,
  ...queryConstraints: QueryConstraint[]
) => curriedBaseFirestore<ResponseData>(path, firestore, ...queryConstraints)

const curriedBaseGetP = (
  fn: (fromDate: Date) => Date,
  interval: '1H' | '5m' | '1D'
) => (f: typeof zaifPairsPath) => (
  pair: CoincheckPair,
  date: Date,
  firestore: FirebaseFirestore
) =>
  baseGet(f(pair)(interval), firestore, orderBy('date', 'desc'), limit12).then(
    (e) =>
      e.docs
        .map((b) => {
          console.log(b.data())
          const { date, value } = b.data()
          return {
            date: date.toDate(),
            value,
          }
        })
        .reverse()
  )

const curriedBaseGetPrice = (fn: (fromDate: Date) => Date) => (
  f: typeof zaifPairsPath
) => (pair: CoincheckPair, date: Date, firestore: FirebaseFirestore) =>
  baseGet(
    f(pair)('rates'),
    firestore,
    orderBy('date', 'asc'),
    dateRatherThanWhere(fn(date)),
    limit1
  ).then(({ docs }) => (docs.length ? docs[0].data() : undefined))

const getOpenPrice = curriedBaseGetPrice(getMidnightFromDate)
const getYesterdayNowPrice = curriedBaseGetPrice(getBefore1DayFromDate)
const get1HPrices = curriedBaseGetP(getBefore1DayFromDate, '1H')
const get5mPrices = curriedBaseGetP(getBefore1DayFromDate, '5m')
const get1DPrices = curriedBaseGetP(() => new Date(), '1D')
export {
  get1DPrices,
  get1HPrices,
  get5mPrices,
  getOpenPrice,
  getYesterdayNowPrice,
  ResponseData,
}
