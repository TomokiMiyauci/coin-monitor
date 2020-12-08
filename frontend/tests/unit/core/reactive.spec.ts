import { useReactive } from '../../../src/core/reactive'

describe('useReactive', () => {
  it('should return reactive', () => {
    const { state, setState, resetState } = useReactive(0)
    expect(state.value).toBe(0)
    setState(1)
    expect(state.value).toBe(1)
    resetState()
    expect(state.value).toBe(0)
  })
})
