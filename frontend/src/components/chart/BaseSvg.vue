<template>
  <svg
    v-bind="{ ...$props, ...$attrs }"
    :viewBox="viewBoxRef"
    :class="className"
  >
    <slot />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import {
  chartHeight as _chartHeight,
  chartWidth as _chartWidth,
  viewBox as _viewBox,
} from '/@/core/chart/chart'
export default defineComponent({
  props: {
    width: { type: [Number, String], default: 1140 },
    height: { type: [Number, String], default: 640 },
    viewBox: {
      type: Object as PropType<{
        x: number
        y: number
        width: number
        height: number
      }>,
      default: () => ({
        x: 0,
        y: 0,
        width: 1140,
        height: 640,
      }),
    },
    className: { type: String, default: '' },
    version: { type: [String, Number], default: '1.1' },
    xmlns: { type: String, default: 'http://www.w3.org/2000/svg' },
    'xmlns:xlink': { type: String, default: 'http://www.w3.org/1999/xlink' },
  },

  setup(props) {
    const viewBoxRef = computed<string>(() =>
      _viewBox({
        x: props.viewBox.x,
        y: props.viewBox.y,
        width: props.viewBox.width,
        height: props.viewBox.height,
      }).toString()
    )

    return {
      viewBoxRef,
    }
  },
})
</script>
