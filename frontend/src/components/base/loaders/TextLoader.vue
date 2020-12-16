<template>
  <transition tag="div" class="relative" name="fade" mode="out-in">
    <div
      v-if="isShow"
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
  import { defineComponent, computed } from 'vue'
  import SkeltonLoader from '/@/components/base/loaders/SkeltonLoader.vue'

  export default defineComponent({
    components: { SkeltonLoader },

    props: {
      value: {
        type: [String, Number],
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

    setup(props) {
      const isShow = computed(
        () =>
          typeof props.value === 'undefined' ||
          (typeof props.value === 'string' && !props.value)
      )

      return { isShow }
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
    @apply translate-x-6 transform opacity-0;
  }
</style>
