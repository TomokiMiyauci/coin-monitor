<template>
  <base-span ref="baseSpan">
    {{ commaFilter }}
  </base-span>
</template>

<script lang="ts">
  import { computed, defineComponent, watch, ref } from 'vue'
  import { toComma } from '/@/utils/format'

  import BaseSpan from '/@/components/base/BaseSpan.vue'
  export default defineComponent({
    components: { BaseSpan },
    props: {
      value: {
        type: Number,
        required: false,
      },
    },

    setup(props) {
      const commaFilter = computed(() => toComma(props.value))
      const baseSpan = ref<InstanceType<typeof BaseSpan>>()

      const flush = (): void => {
        if (!baseSpan.value) return
        baseSpan.value.$el.animate({ opacity: [1, 0, 1] }, 200)
      }

      watch(commaFilter, flush)
      return { commaFilter, baseSpan }
    },
  })
</script>
