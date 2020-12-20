export type CoincheckSymbol =
  | 'BTC'
  | 'ETC'
  | 'ETH'
  | 'IOST'
  | 'LSK'
  | 'QTUM'
  | 'XEM'
  | 'XLM'
  | 'XRP'
  | 'MONA'
  | 'BAT'
  | 'BCH'
  | 'FCT'
  | 'LTC'
  | 'JPY'

export const coincheckSymbols: CoincheckSymbol[] = [
  'BAT',
  'BCH',
  'ETC',
  'IOST',
  'LSK',
  'QTUM',
  'XEM',
  'XLM',
  'XRP',
  'MONA',
  'BTC',
  'FCT',
  'LTC',
  'JPY',
]

export const ZaifSymbols = [
  'BCH',
  'ETH',
  'XEM',
  'ZAIF',
  'MONA',
  'BTC',
  'XCP',
  'CICC',
  'NCXC',
  'ERC20.CMS',
  'MOSAIC.CMS',
  'CSETH',
  'CSBTC',
  'CSXEM',
  'CSZAIF',
  'FSCC',
  'JPYZ',
  'JPY',
] as const

export const zaifBaseSymbols = ['ETH', 'XEM', 'ZAIF', 'BTC', 'JPY'] as const
export type ZaifSymbol = typeof ZaifSymbols[number]
export type ZaifBaseSymbol = typeof zaifBaseSymbols[number]
