export const coincheck = 'coincheck'
export const zaif = 'zaif'

export const markets = [coincheck, zaif] as const
export type Markets = typeof markets[number]
