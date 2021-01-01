import ky, { Options } from 'ky'
import { baseGetApi } from '/@/functions/pure/api'

const kyInstance = ky.create({
  prefixUrl: 'https://smartapi.bitpoint.co.jp/bpj-smart-api',
})

type PriceQuality = {
  price: number
  qty: number
}
type ResponseDepth = {
  lastUpdateId: number
  bids: (PriceQuality & { ignore: true })[]
  asks: (PriceQuality & { ignore: true })[]
}

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
const base = (path: string, options: Options) =>
  baseGetApi(path, options, kyInstance)
const baseGetDepth = (options: Options) => base('api/depth', options)

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

export { getDepth, ResponseDepth }
