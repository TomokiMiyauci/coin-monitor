<template>
  <span ref="span">
    {{ commaFilter }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import { toComma } from '/@/utils/format'

export default defineComponent({
  props: {
    value: {
      type: Number,
      required: false,
    },
  },

  setup(props) {
    const commaFilter = computed(() => toComma(props.value))
    const span = ref<HTMLSpanElement>()

    const flush = (): void => {
      if (!span.value) return
      span.value.animate({ opacity: [1, 0, 1] }, 200)
    }

    watch(commaFilter, flush)
    return { commaFilter, span }
  },
})
</script>
