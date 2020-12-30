export const markets = ['coincheck', 'zaif', 'bitbank', 'bitpoint'] as const
export type Market = typeof markets[number]
