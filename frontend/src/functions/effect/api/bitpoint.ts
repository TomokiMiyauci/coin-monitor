import ky, { Options } from 'ky'
import { curriedFirstBaseGetApi } from '/@/functions/pure/api'

const kyInstance = ky.create({
  prefixUrl: 'https://smartapi.bitpoint.co.jp/bpj-smart-api',
})

const baseGetApi = curriedFirstBaseGetApi(kyInstance)

type PriceQuality = {
  price: number
  qty: number
}
type ResponseDepth = {
  lastUpdateId: number
  bids: (PriceQuality & { ignore: true })[]
  asks: (PriceQuality & { ignore: true })[]
}
type ResponsePrice = {
  symbolPrice: [
    {
      symbol: 'BTCJPY'
      price: number
    }
  ]
}
type ResponseTrades = {
  id: number
  price: number
  qty: number
  time: number
}[]

const json = (text: string) =>
  JSON.parse(text, (key, value) => {
    if (['asks', 'bids'].includes(key)) {
      const _value = value as {
        price: string
        qty: string
        ignore: false
      }[]
      return _value.map(({ price, qty }) => ({
        price: Number(price),
        qty: Number(qty),
      }))
    }
    return value
  })

const baseGetDepth = baseGetApi('api/depth')
const baseGetPrice = baseGetApi('api/ticker/price')
const baseGetTrades = baseGetApi('api/trades')

const getDepth = (pair: 'BTCJPY' = 'BTCJPY', limit: 5 | 10 | 20 = 10) => {
  const options: Options = {
    parseJson: json,
    searchParams: {
      symbol: pair,
      limit,
    },
  }

  return baseGetDepth(options) as Promise<ResponseDepth>
}

const getPrice = (pair: 'BTCJPY' = 'BTCJPY') => {
  const options: Options = {
    parseJson: (text) =>
      JSON.parse(text, (key, value) => {
        if (key === 'price' && typeof value === 'string') {
          return Number(value)
        }

        return value
      }),
    searchParams: {
      symbol: pair,
    },
  }
  return baseGetPrice(options) as Promise<ResponsePrice>
}

const getTrades = (pair: 'BTCJPY' = 'BTCJPY') => {
  const options: Options = {
    parseJson: (text) =>
      JSON.parse(text, (key, value) => {
        if (['price', 'time', 'qty'].includes(key)) {
          return Number(value)
        }

        return value
      }),
    searchParams: {
      symbol: pair,
    },
  }
  return baseGetTrades(options) as Promise<ResponseTrades>
}

export {
  getDepth,
  ResponseDepth,
  getPrice,
  ResponsePrice,
  getTrades,
  ResponseTrades,
}
