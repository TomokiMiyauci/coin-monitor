export const toUpperCase = <T extends string>(text: T): Uppercase<T> =>
  text.toUpperCase() as Uppercase<T>
export const toLowerCase = <T extends string>(text: T): Lowercase<T> =>
  text.toLowerCase() as Lowercase<T>

export const joinSeparator = <T extends string, U extends string>(
  text1: T,
  text2: U
) => `${text1}_${text2}` as const

export const getLowercasePair = <T extends string, U extends string>(
  symbol: T,
  baseSymbol: U
): Lowercase<`${T}_${U}`> => toLowerCase(joinSeparator(symbol, baseSymbol))

export const toComma = (num: number | undefined): string =>
  num?.toLocaleString() ?? ''
