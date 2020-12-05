<template>
  <base-span>
    {{ commaFilter }}
  </base-span>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

  import BaseSpan from './BaseSpan.vue'
  export default defineComponent({
    components: { BaseSpan },
    props: {
      value: {
        type: Number,
        default: undefined,
      },
    },

    setup(props) {
      const commaFilter = computed(() => props.value?.toLocaleString())
      return { commaFilter }
    },
  })
</script>
