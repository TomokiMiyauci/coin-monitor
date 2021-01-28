<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="viewBox"
  >
    <slot name="grid">
      <g>
        <line
          v-for="(i, index) in gridX"
          :key="index"
          :x1="i"
          :x2="i"
          :y1="0"
          :y2="300"
          class="ct-grid ct-horizontal"
        ></line>

        <line
          v-for="(i, index) in gridY"
          :key="index"
          :x1="leftPadding"
          :x2="300"
          :y1="i"
          :y2="i"
          class="ct-grid ct-horizontal"
        ></line>
      </g>
    </slot>
    <g>
      <text text-anchor="end" :x="leftPadding - 5" y="0">
        {{ maxValue }}
      </text>
    </g>
    <g>
      <rect
        v-for="(i, index) in items"
        :key="index"
        :x="dataX[index]"
        :y="i"
        :width="xAxisStep"
        :height="h - i"
        fill="currentColor"
      ></rect>
    </g>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    w: {
      type: Number,
      default: 300,
    },
    h: {
      type: Number,
      default: 300,
    },

    data: {
      type: Array as PropType<number[]>,
      default: () => [],
    },

    leftPadding: {
      type: Number,
      default: 60,
    },
  },

  setup(props) {
    const viewBox = computed(() => `0 0 ${props.w} ${props.h}`)
    const graphWidth = computed(() => props.w - props.leftPadding)

    const xAxisStep = computed(
      () => graphWidth.value / (props.data.length * 2 + 1)
    )
    const maxValue = computed(() => Math.max(...props.data))

    const items = computed(() =>
      props.data.map((i) => props.h - (i / maxValue.value) * props.h)
    )

    const gridX = computed(() => {
      return new Array(props.data.length)
        .fill(0)
        .map(
          (_, index) =>
            (graphWidth.value / props.data.length) * index + props.leftPadding
        )
    })

    const gridY = computed(() => {
      const i = new Array(5).fill(0).map((_, index) => (props.w / 5) * index)
      return [...i, props.h]
    })

    const dataX = computed(() => {
      return gridX.value.map((grid) => grid + 12 - xAxisStep.value / 2)
    })

    return {
      viewBox,
      xAxisStep,
      items,
      graphWidth,
      maxValue,
      gridX,
      gridY,
      dataX,
    }
  },
})
</script>

<style scoped>
.ct-grid {
  stroke: rgba(0, 0, 0, 0.2);
  stroke-width: 1px;
  stroke-dasharray: 2px;
}
</style>
