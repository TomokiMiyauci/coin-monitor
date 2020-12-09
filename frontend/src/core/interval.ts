import { useReactive } from '/@/core/reactive'
import { onBeforeMount, onBeforeUnmount } from 'vue'

type Params = [TimerHandler, number]

export const _setInterval = (
  fn: Params[0],
  interval: Params[1]
): {
  setSetInterval: (newInterval?: Params[1]) => void
  resetInterval: () => void
  changeInterval: (newInterval: Params[1]) => void
} => {
  const { state: timeoutId, setState, resetState } = useReactive<
    undefined | number
  >(undefined)

  const setSetInterval = (newInterval?: Params[1]): void => {
    setState(setInterval(fn, newInterval || interval))
  }

  const resetInterval = (): void => {
    if (!timeoutId.value) return
    clearInterval(timeoutId.value)
    resetState()
  }

  const changeInterval = (newInterval: Params[1]): void => {
    resetInterval()
    setSetInterval(newInterval)
  }

  return { setSetInterval, resetInterval, changeInterval }
}

export const useInterval = (
  fn: Params[0],
  interval: Params[1]
): {
  changeInterval: (newInterval: Params[1]) => void
} => {
  const { setSetInterval, resetInterval, ...rest } = _setInterval(fn, interval)

  onBeforeMount(setSetInterval)
  onBeforeUnmount(resetInterval)

  return { ...rest }
}
