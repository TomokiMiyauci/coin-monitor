import { useReactive } from '/@/core/reactive'
import { onBeforeMount, onBeforeUnmount } from 'vue'

type Params = [TimerHandler, number]

export const _setInterval = (
  fn: Params[0],
  interval: Params[1]
): {
  setSetInterval: () => void
  resetInterval: () => void
} => {
  const { state: timeoutId, setState, resetState } = useReactive<
    undefined | number
  >(undefined)

  const setSetInterval = (): void => {
    setState(setInterval(fn, interval))
  }
  const resetInterval = (): void => {
    if (!timeoutId.value) return
    clearInterval(timeoutId.value)
    resetState()
  }

  return { setSetInterval, resetInterval }
}

export const useInterval = (fn: Params[0], interval: Params[1]): void => {
  const { setSetInterval, resetInterval } = _setInterval(fn, interval)

  onBeforeMount(setSetInterval)
  onBeforeUnmount(resetInterval)
}
