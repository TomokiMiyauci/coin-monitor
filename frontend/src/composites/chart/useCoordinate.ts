import { computed, Ref } from 'vue'

import { Padding, ViewBox } from '/@/core/chart/chart'
import {
  add,
  divide,
  maxValue,
  minValue,
  subtract,
} from '/@/core/chart/coordinate'
type Chart = {
  viewBox: ViewBox
  chartViewBox: ViewBox
  padding: Padding
}

export const useCoordinate = (props: Ref<Chart>, data: Ref<number[]>) => {
  const _minValue = computed(() => minValue(data.value))
  const _maxValue = computed(() => maxValue(data.value))
  const _diff = computed(() => subtract(_maxValue.value, _minValue.value))
  const ratio = computed(() =>
    data.value.map((value) => divide(value - _minValue.value, _diff.value))
  )

  const paddingTopBottom = computed(() =>
    divide(add(props.value.padding.top, props.value.padding.bottom), 2)
  )

  const series = computed(() =>
    ratio.value.map(
      (value) =>
        value * (props.value.chartViewBox.height - paddingTopBottom.value) +
        paddingTopBottom.value
    )
  )
  const invertedCoordinates = computed(() =>
    series.value.map((v) => subtract(props.value.viewBox.height, v))
  )

  const coordinates = computed<[number, number][]>(() =>
    invertedCoordinates.value.map((v, index) => [gridX.value[index], v])
  )

  const gridStep = computed<number>(
    () => props.value.chartViewBox.width / (data.value.length - 1)
  )
  const gridX = computed<number[]>(() => {
    const grids = new Array(data.value.length - 1)
      .fill(0)
      .map((_, i) => gridStep.value * i + paddingTopBottom.value)
    return [...grids, props.value.chartViewBox.width]
  })

  return {
    coordinates,
    maxValue: _maxValue,
    minValue: _minValue,
  }
}
