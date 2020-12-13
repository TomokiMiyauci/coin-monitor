<template>
  <slot name="title">
    <base-h-3 class="mb-1" :class="titleClass" v-text="title" />
  </slot>

  <slot name="value">
    <comma-filter v-show="value" :class="valueClass" :value="value" />
    <div
      v-show="!value"
      class="w-4/5 relative"
      style="min-height: 130px; background-color: rgba(0, 0, 0, 0.12)"
    >
      <skelton-loader />
    </div>
  </slot>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  import BaseH3 from '/@/components/base/BaseH3.vue'
  import SkeltonLoader from './loaders/SkeltonLoader.vue'

  export default defineComponent({
    components: { BaseH3, CommaFilter, SkeltonLoader },
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
