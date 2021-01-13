import { getAPITicker } from 'coincheck-client'
import { getTicker } from 'zaif-client'
import { getTicker as bitbankGetTicker } from 'bitbank-client'

const factory = (market: string): any => {
  switch (market) {
    case 'coincheck':
    default: {
      return getAPITicker
    }
    case 'zaif': {
      return getTicker
    }

    case 'bitbank': {
      return bitbankGetTicker
    }
  }
}

export { factory }
