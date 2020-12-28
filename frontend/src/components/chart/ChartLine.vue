<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="viewBox"
    :width="width"
    :height="height"
  >
    <g stroke="currentColor" class="text-gray-400" stroke-width="1">
      <line
        :x1="paddingLeft"
        :x2="paddingLeft"
        :y1="paddingTop"
        :y2="chartHeight"
      />

      <line
        :x1="paddingLeft"
        :x2="chartWidth"
        :y1="chartHeight"
        :y2="chartHeight"
      />
    </g>

    <g>
      <text
        text-anchor="end"
        font-size="24"
        :x="paddingLeft + labelYOffset.x"
        :y="paddingTop + labelYOffset.y"
      >
        {{ toComma(_maxValue) }}
      </text>
      <text
        text-anchor="end"
        font-size="24"
        :x="paddingLeft + labelYOffset.x"
        :y="chartHeight + labelYOffset.y"
      >
        {{ toComma(_minValue) }}
      </text>
    </g>

    <g
      stroke="currentColor"
      class="text-gray-400"
      stroke-dasharray="3"
      stroke-width="1"
    >
      <line
        v-for="(axisY, index) in axisYs"
        :key="index"
        :x1="paddingLeft"
        :x2="chartWidth"
        :y1="axisY"
        :y2="axisY"
      />
    </g>
    <g class="chart-line__series-line text-blue-500">
      <polyline
        stroke-width="5"
        stroke="currentColor"
        v-for="(line, i) in seriesLinePropsList"
        :key="i"
        :points="line.points"
      ></polyline>
    </g>

    <g
      fill="currentColor"
      v-for="(point, index) in seriesLinePointList"
      :key="index"
    >
      <circle
        v-for="([x, y], index) in point"
        :key="index"
        stroke="rgba(59, 130, 246)"
        class="text-white"
        stroke-width="4"
        :cx="x"
        :cy="y"
        r="9"
      />
    </g>
  </svg>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import {
    viewBox as _viewBox,
    chartWidth as _chartWidth,
    chartHeight as _chartHeight,
  } from '/@/core/chart/chart'
  import { toComma } from '/@/utils/format'

  export default defineComponent({
    props: {
      width: { type: [Number, String], default: 1140 },
      height: { type: [Number, String], default: 640 },
      svgWidth: { type: Number, default: 1140 },
      svgHeight: { type: Number, default: 640 },
      labelYOffset: {
        type: Object,
        default: () => ({ x: -16, y: 8 }),
      },
      paddingTop: { type: Number, default: 14 },
      paddingBottom: { type: Number, default: 24 },
      paddingLeft: { type: Number, default: 130 },
      paddingRight: { type: Number, default: 40 },
      series: { type: Array as PropType<number[][]>, default: () => [] },
    },

    setup(props) {
      const axisY = 5
      const viewBox = computed<string>(() =>
        _viewBox({
          width: props.svgWidth,
          height: props.svgHeight,
        })
      )

      const axisYs = computed(() =>
        new Array(axisY)
          .fill(0)
          .map((_, i) => axisYStep.value * i + props.paddingTop)
      )
      const chartWidth = computed<number>(() =>
        _chartWidth({
          width: props.svgWidth,
          paddingLeft: props.paddingLeft,
          paddingRight: props.paddingRight,
        })
      )
      const chartHeight = computed<number>(() =>
        _chartHeight({
          height: props.svgHeight,
          paddingTop: props.paddingTop,
          paddingBottom: props.paddingBottom,
        })
      )

      const axisYStep = computed(() => chartHeight.value / axisY)
      const xAxisStep = computed<number>(
        () =>
          chartWidth.value /
          Math.max(...props.series.map((data) => data.length - 1))
      )

      const allValues = computed<number[]>(() =>
        props.series.reduce((memo, data) => memo.concat(data), [])
      )
      const _maxValue = computed<number>(() => Math.max(...allValues.value))
      const _minValue = computed<number>(() => Math.min(...allValues.value))
      const percentOfSeries = computed<number[][]>(() =>
        props.series.map((data) =>
          data.map(
            (value) =>
              (value - _minValue.value) / (_maxValue.value - _minValue.value)
          )
        )
      )

      const seriesLinePointList = computed<[number, number][][]>(() =>
        percentOfSeries.value.map((data) =>
          data.map((value, index) => [
            xAxisStep.value * index + props.paddingLeft,
            chartHeight.value + props.paddingTop - chartHeight.value * value,
          ])
        )
      )

      const seriesLineTransform = computed<string>(
        () => `translate(${props.paddingLeft} ${chartHeight.value})`
      )

      const seriesLinePropsList = computed<{ points: string }[]>(() =>
        seriesLinePointList.value.map((points) => ({
          points: points.map((p) => p.join(' ')).join(' '),
        }))
      )

      return {
        toComma,
        axisYs,
        axisYStep,
        seriesLineTransform,
        seriesLinePropsList,
        seriesLinePointList,
        percentOfSeries,
        xAxisStep,
        viewBox,
        chartWidth,
        chartHeight,
        _minValue,
        _maxValue,
      }
    },
  })
</script>
<style scoped>
  .chart-line {
    position: relative;
    margin-top: 25px;
  }

  .chart-line__unit {
    margin-top: 0;
    margin-bottom: 0;
    color: #999;
    font-size: 0.75rem;
  }

  .chart-line__y-step-line {
    fill: none;
    stroke: #ccc;
    stroke-width: 1;
  }

  .chart-line__series-line {
    fill: none;
    stroke: #333;
    stroke-width: 2;
  }

  @media screen and (max-width: 1140px) {
    .chart-line {
      margin-top: 1rem;
    }

    svg {
      width: 100%;
      height: auto;
    }

    .legend-list {
      display: none;
    }
  }
</style>
