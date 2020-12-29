<template>
  <g v-bind="gAttrs">
    <line :x1="x" :x2="x" :y1="y" :y2="height" />
    <line :x1="x" :x2="width" :y1="height" :y2="height" />
    <line :x1="width" :x2="width" :y1="y" :y2="height" />
    <line :x1="x" :x2="width" :y1="y" :y2="y" />
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

      return {
        gAttrs,
      }
    },
  })
</script>
