<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="viewBox"
  >
    <g>
      <rect
        v-for="(i, index) in items"
        :key="index"
        :x="2 * xAxisStep * (index + 1) - xAxisStep"
        :y="i"
        :width="xAxisStep"
        :height="h - i"
        fill="black"
      ></rect>
    </g>
    <g stroke="orange">
      <line x1="0" x2="0" y1="0" y2="300" />
      <line x1="0" x2="300" y1="300" y2="300" />
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
    },

    setup(props) {
      const viewBox = computed(() => `0 0 ${props.w} ${props.h}`)

      const xAxisStep = computed(() => props.w / (props.data.length * 2 + 1))
      const maxValue = computed(() => Math.max(...props.data))

      const items = computed(() =>
        props.data.map((i) => props.h - (i / maxValue.value) * props.h)
      )

      return { viewBox, xAxisStep, items }
    },
  })
</script>
