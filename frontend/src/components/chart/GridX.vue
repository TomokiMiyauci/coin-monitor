<template>
  <g v-bind="{ ...gAttrs, ...$attrs }" :class="className">
    <line
      v-for="(value, index) in gridY"
      :key="index"
      v-bind="lineAttrs"
      :x1="value"
      :x2="value"
    />
  </g>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

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
      y1: props.y,
      y2: props.height,
    }))

    const gridStep = computed<number>(() => props.width / props.grids)
    const gridY = computed<number[]>(() =>
      new Array(props.grids).fill(0).map((_, i) => gridStep.value * i + props.x)
    )

    return {
      gridY,
      gAttrs,
      lineAttrs,
    }
  },
})
</script>
