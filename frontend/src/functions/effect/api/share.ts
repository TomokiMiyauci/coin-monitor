import { dateRatherThanWhere, limit1, limit12 } from '/@/functions/pure/api'
import {
  collection,
  orderBy,
  getDocs,
  query,
  FirebaseFirestore,
  Timestamp,
  QueryConstraint,
  CollectionReference,
} from 'firebase/firestore/lite'
import { CoincheckPair } from '/@/types/pair'
import { getBefore1DayFromDate, getMidnightFromDate } from '/@/utils/format'
import { zaifPairsPath } from '/@/functions/pure/api'

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

const curriedBaseGetP = (fn: (fromDate: Date) => Date) => (
  f: typeof zaifPairsPath
) => (pair: CoincheckPair, date: Date, firestore: FirebaseFirestore) =>
  baseGet(
    f(pair)('1H'),
    firestore,
    orderBy('date', 'asc'),
    dateRatherThanWhere(fn(date)),
    limit12
  ).then((e) =>
    e.docs.map((b) => {
      const { date, value } = b.data()
      return {
        date: date.toDate(),
        value,
      }
    })
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
  ).then(({ docs }) => docs[0].data())

const getOpenPrice = curriedBaseGetPrice(getMidnightFromDate)
const getYesterdayNowPrice = curriedBaseGetPrice(getBefore1DayFromDate)
const getPrices = curriedBaseGetP(getBefore1DayFromDate)
export { getOpenPrice, getYesterdayNowPrice, ResponseData, getPrices }
