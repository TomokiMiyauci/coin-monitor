import day from 'dayjs'
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

export const abbreviateNumber = (num: number): string => {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'] as const
  const tier = (Math.log10(num) / 3) | 0
  if (tier === 0) return num.toString()

  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)
  const scaled = num / scale

  return `${scaled.toFixed(1)}${suffix}`
}

const joinStrings = (separater: string, ...args: string[]): string => {
  return args.join(separater)
}

const curriedJoinStrings = (separater: string) => (...args: string[]) =>
  joinStrings(separater, ...args)

export const joinSlash = curriedJoinStrings('/')

export const getMidnightFromDate = (date: Date): Date =>
  new Date(date.setHours(0, 0, 0, 0))

export const getBefore1DayFromDate = (date: Date): Date =>
  day(date).subtract(1, 'day').toDate()
