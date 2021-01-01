export const coincheck = 'coincheck'
export const zaif = 'zaif'
export const bitbank = 'bitbank'
export const markets = [coincheck, zaif, bitbank] as const
export type Markets = typeof markets[number]
