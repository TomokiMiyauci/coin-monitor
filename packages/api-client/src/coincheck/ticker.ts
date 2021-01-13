import ky from 'ky-universal'
import type { Options } from 'ky'

import { curry } from 'rambda'

type kyInstance = typeof ky

export const baseGetApi = (
  kyInstance: kyInstance,
  path: string,
  options?: Options
) => {
  return kyInstance.get(path, options).json()
}
const curriedBaseGetApi = curry(baseGetApi)
const getApi = curriedBaseGetApi(ky)
export const a = (kyInstance: kyInstance) => {
  const aaa = curriedBaseGetApi(kyInstance)
  console.log(aaa)
  return aaa
}
export const ticker = () => getApi('')
// const a = curried(ky)
