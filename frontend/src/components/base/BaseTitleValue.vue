<template>
  <slot name="title">
    <base-h-3 class="mb-1" :class="titleClass" v-text="title" />
  </slot>

  <slot name="value"> <comma-filter :class="valueClass" :value="value" /></slot>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  import BaseH3 from '/@/components/base/BaseH3.vue'

  export default defineComponent({
    components: { BaseH3, CommaFilter },
    props: {
      title: {
        type: String,
        required: true,
      },

      value: {
        type: Number,
        required: true,
      },

      titleClass: {
        type: String,
        default: '',
      },

      valueClass: {
        type: String,
        default: '',
      },
    },
  })
</script>
