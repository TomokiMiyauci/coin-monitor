import { _setInterval } from '../../../src/core/interval'

describe('_setInterval', () => {
  it('should call function interval', () => {
    jest.useFakeTimers()

    const mock = jest.fn()
    const { setSetInterval, resetInterval, changeInterval } = _setInterval(
      mock,
      1000
    )

    setSetInterval()
    expect(mock).not.toBeCalled()
    jest.advanceTimersByTime(999)
    expect(mock).not.toBeCalled()
    jest.advanceTimersByTime(1)
    expect(mock).toHaveBeenCalledTimes(1)
    jest.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(2)
    changeInterval(3000)
    jest.advanceTimersByTime(1000)
    expect(mock).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(2000)
    expect(mock).toHaveBeenCalledTimes(3)
    resetInterval()
    jest.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(3)
  })
})
