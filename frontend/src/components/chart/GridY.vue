<template>
  <g v-bind="{ ...gAttrs, ...$attrs }" :class="className">
    <line
      v-for="(value, index) in gridX"
      :key="index"
      v-bind="lineAttrs"
      :y1="value"
      :y2="value"
    />
  </g>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'

  export default defineComponent({
    props: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
      grids: { type: Number, default: 0 },
      stroke: { type: String, default: 'currentColor' },
      className: { type: String, default: '' },
      strokeDasharray: { type: [String, Number], default: 1 },
      strokeWidth: { type: [String, Number], default: 1 },
    },

    setup(props) {
      const gAttrs = computed(() => ({
        stroke: props.stroke,
        class: props.className,
        'stroke-dasharray': props.strokeDasharray,
        'stroke-width': props.strokeWidth,
      }))

      const lineAttrs = computed(() => ({
        x1: props.x,
        x2: props.width,
      }))

      const gridStep = computed<number>(() => props.width / props.grids)
      const gridX = computed<number[]>(() =>
        new Array(props.grids)
          .fill(0)
          .map((_, i) => gridStep.value * i + props.y)
      )

      return {
        gridX,
        gAttrs,
        lineAttrs,
      }
    },
  })
</script>
