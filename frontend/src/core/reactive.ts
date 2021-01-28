import { computed, ComputedRef, Ref, ref, UnwrapRef, watch } from 'vue'

type UseReactive<T> = {
  state: ComputedRef<UnwrapRef<T>>
  stateRef: Ref<UnwrapRef<T>>
  setState: (val: UnwrapRef<T>) => void
  resetState: () => void
}

export const useReactive = <T>(init: T): UseReactive<T> => {
  const _state = ref<T>(init)

  const state = computed<UnwrapRef<T>>(() => _state.value)
  const setState = (val: UnwrapRef<T>): void => {
    _state.value = val
  }
  const resetState = (): void => {
    _state.value = init as UnwrapRef<T>
  }

  return { state, stateRef: _state, setState, resetState }
}

export const useReactiveEffect = <T>(
  source: ComputedRef<T>,
  cb: (args: any) => any
) => {
  watch(source, cb)
}
