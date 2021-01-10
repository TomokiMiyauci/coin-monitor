<template>
  <span ref="span">
    <slot />
  </span>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue'

  export default defineComponent({
    props: {
      value: {
        type: Number,
        default: undefined,
      },
    },
    setup() {
      const span = ref<HTMLSpanElement>()
      const flush = (): void => {
        if (!span.value) return
        span.value.animate({ opacity: [1, 0, 1] }, 200)
      }

      watchEffect(flush)

      return { span }
    },
  })
</script>
