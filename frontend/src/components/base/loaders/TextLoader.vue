<template>
  <transition tag="div" class="relative" name="fade" mode="out-in">
    <div
      v-if="typeof value === 'undefined'"
      :class="skeltonClass"
      :style="skeltonStyle"
      style="min-height: 1.5rem; background-color: rgba(0, 0, 0, 0.12)"
    >
      <skelton-loader />
    </div>

    <div v-else>
      <slot>{{ value }}</slot>
    </div>
  </transition>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SkeltonLoader from '/@/components/base/loaders/SkeltonLoader.vue'

  export default defineComponent({
    components: { SkeltonLoader },

    props: {
      value: {
        type: [String],
        default: undefined,
      },

      skeltonClass: {
        type: String,
        default: 'h-full',
      },

      skeltonStyle: {
        type: String,
        default: '',
      },
    },
  })
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    @apply transition duration-100;
  }

  .fade-enter-from,
  .fade-leave-to {
    @apply opacity-0;
  }
</style>
