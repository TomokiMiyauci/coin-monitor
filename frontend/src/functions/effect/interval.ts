import { onBeforeMount, onBeforeUnmount, Ref, ref } from 'vue'

const resetInterval = (
  intervalId: number | undefined,
  handler: TimerHandler,
  timeout: number | undefined,
  isInstant?: boolean
): number => {
  clearInterval(intervalId)
  if (isInstant && typeof handler === 'function') {
    handler()
  }

  return setInterval(handler, timeout)
}

const useInterval = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: () => any
): {
  intervalId: Ref<number | undefined>
} => {
  const intervalId = ref<number | undefined>()
  onBeforeMount(() => {
    intervalId.value = fn()
  })
  onBeforeUnmount(() => {
    console.log('clear')
    clearInterval(intervalId.value)
  })

  return {
    intervalId,
  }
}

export { resetInterval, useInterval }
