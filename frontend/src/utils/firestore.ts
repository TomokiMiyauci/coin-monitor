import {
  collection,
  query,
  getDocs,
  where,
  limit,
  orderBy,
} from 'firebase/firestore/lite'
import { useFirestore } from '/@/plugins/firebase'
import day from 'dayjs'
export const useHistorycal = () => {
  const { $firestore } = useFirestore()
  const now = day()
  const before1H = now.subtract(1, 'hour')

  const get = () =>
    getDocs<{ value: number; date: Date }>(
      query(
        collection($firestore, 'markets/coincheck/pairs/btc_jpy/rates'),
        orderBy('date', 'asc'),
        where('date', '>', before1H.toDate()),
        limit(60)
      )
    ).then(({ docs }) => docs.map((doc) => doc.data()))

  return get
}
