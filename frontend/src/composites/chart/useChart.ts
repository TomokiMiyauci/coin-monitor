type Chart = { viewBox: ViewBox; padding: Padding }
import { computed } from 'vue'
import {
  viewBox as _viewBox,
  chartWidth as _chartWidth,
  chartHeight as _chartHeight,
  viewBox,
  ViewBox,
  Padding,
} from '/@/core/chart/chart'
export const useChart = (props: Chart) => {
  const chartWidth = computed<number>(() =>
    _chartWidth({
      width: props.viewBox.width,
      paddingLeft: props.padding.left,
      paddingRight: props.padding.right,
    })
  )
  const chartHeight = computed<number>(() =>
    _chartHeight({
      height: props.viewBox.height,
      paddingTop: props.padding.top,
      paddingBottom: props.padding.bottom,
    })
  )

  const chartViewBox = computed<ViewBox>(() =>
    viewBox({
      x: props.padding.left,
      y: props.padding.top,
      width: chartWidth.value,
      height: chartHeight.value,
    })
  )

  return {
    chartViewBox,
    chartWidth,
    chartHeight,
  }
}
