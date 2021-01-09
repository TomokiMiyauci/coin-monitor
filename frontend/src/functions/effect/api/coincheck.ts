import { pairsPath, dateRatherThanWhere, limit1 } from '/@/functions/pure/api'
import {
  collection,
  orderBy,
  getDocs,
  query,
  FirebaseFirestore,
  Timestamp,
} from 'firebase/firestore/lite'
import { getBefore1DayFromDate } from '/@/utils/format'
import { CoincheckPair } from '/@/types/pair'
import { curriedRun, baseGetRateApi } from '/@/functions/pure/api'

type ResponseData = {
  value: number
  date: Timestamp
}

const getOpenPrice = (pair: CoincheckPair, firestore: FirebaseFirestore) =>
  getDocs<ResponseData>(
    query(
      collection(firestore, pairsPath(pair)('rates')),
      orderBy('date', 'asc'),
      dateRatherThanWhere(getBefore1DayFromDate(new Date())),
      limit1
    )
  ).then(({ docs }) => docs[0].data())

type ResponseGetRate = { rate: number }

const getRate = curriedRun<ResponseGetRate, 'coincheck'>(baseGetRateApi)

export { getOpenPrice, ResponseData, getRate, ResponseGetRate }
