<template>
  <base-svg
    :version="version"
    :width="width"
    :height="height"
    :view-box="viewBox"
    :xmlns="xmlns"
    :xmlns:xlink="xmlnsXlink"
    :class-name="className"
  >
    <!-- <g>
      <text text-anchor="end" font-size="24" :x="padding.left" :y="padding.top">
        {{ toComma(maxValue) }}
      </text>
    </g> -->
    <grid-y
      class="text-gray-400"
      :stroke-dasharray="8"
      v-bind="chartViewBox"
      :grids="5"
    />
    <frame class="text-gray-400" :stroke-dasharray="0" v-bind="chartViewBox" />

    <g fill="none" class="text-blue-500">
      <polyline stroke="currentColor" :points="points"></polyline>
    </g>

    <g fill="currentColor">
      <circle
        v-for="([x, y], index) in coordinates"
        :key="index"
        stroke="rgba(59, 130, 246)"
        class="text-white"
        :cx="x"
        :cy="y"
        r="9"
      />
    </g>
  </base-svg>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType, toRefs } from 'vue'
  import {
    viewBox as _viewBox,
    chartWidth as _chartWidth,
    chartHeight as _chartHeight,
  } from '/@/core/chart/chart'
  import { toComma } from '/@/utils/format'
  import Frame from './Frame.vue'
  import GridY from './GridY.vue'
  import BaseSvg from '/@/components/chart/BaseSvg.vue'
  import {
    Padding,
    ViewBox,
    DEFAULT_VIEW_BOX,
    DEFAULT_PADDING,
  } from '/@/core/chart/chart'
  import { useCoordinate } from '/@/composites/chart/useCoordinate'
  import { useChart } from '/@/composites/chart/useChart'

  export default defineComponent({
    components: {
      BaseSvg,
      Frame,
      GridY,
    },
    props: {
      width: { type: [Number, String], default: 1140 },
      height: { type: [Number, String], default: 640 },
      viewBox: {
        type: Object as () => ViewBox,
        default: () => DEFAULT_VIEW_BOX,
      },
      className: { type: String, default: '' },
      version: { type: [String, Number], default: '1.1' },
      xmlns: { type: String, default: 'http://www.w3.org/2000/svg' },
      xmlnsXlink: { type: String, default: 'http://www.w3.org/1999/xlink' },

      padding: {
        type: Object as () => Padding,
        default: () => DEFAULT_PADDING,
      },
      data: {
        type: Array as PropType<number[]>,
        default: () => [],
      },
    },

    setup(props) {
      const { chartHeight, chartWidth, chartViewBox } = useChart({
        viewBox: props.viewBox,
        padding: props.padding,
      })

      const { data } = toRefs(props)

      const chart = computed(() => ({
        viewBox: props.viewBox,
        chartViewBox: chartViewBox.value,
        padding: props.padding,
      }))

      const { coordinates, maxValue, minValue } = useCoordinate(chart, data)

      const points = computed(() =>
        coordinates.value.map((value) => value.join(',')).join(' ')
      )

      return {
        chartViewBox,
        coordinates,
        maxValue,
        minValue,
        points,
        toComma,
        chartWidth,
        chartHeight,
      }
    },
  })
</script>
