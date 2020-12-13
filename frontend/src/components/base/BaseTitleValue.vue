<template>
  <slot name="title">
    <base-h-3 class="mb-1" :class="titleClass" v-text="title" />
  </slot>

  <slot />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import BaseH3 from '/@/components/base/BaseH3.vue'

  export default defineComponent({
    components: { BaseH3 },
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
        default: 'text-lg text-gray-400',
      },

      valueClass: {
        type: String,
        default: '',
      },
    },
  })
</script>
