<template>
  <base-span ref="baseSpan">
    <slot />
  </base-span>
</template>

<script lang="ts">
  import { defineComponent, ref, watchEffect } from 'vue'
  import BaseSpan from '/@/components/base/BaseSpan.vue'

  export default defineComponent({
    components: { BaseSpan },

    props: {
      value: {
        type: Number,
        default: undefined,
      },
    },
    setup() {
      const baseSpan = ref<InstanceType<typeof BaseSpan>>()

      const flush = (): void => {
        if (!baseSpan.value) return
        baseSpan.value.$el.animate({ opacity: [1, 0, 1] }, 200)
      }

      watchEffect(flush)

      return { baseSpan }
    },
  })
</script>
