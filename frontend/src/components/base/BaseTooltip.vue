<template>
  <span
    class="relative"
    @mouseover="switchHover(true)"
    @mouseleave="switchHover(false)"
  >
    <slot />

    <transition name="fade">
      <base-card v-show="hover" class="absolute z-10" :class="classContent">
        <slot name="content" />
      </base-card>
    </transition>
  </span>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

import BaseCard from '/@/components/base/BaseCard.vue'

const hover = ref(false)
const switchHover = (isHover: boolean) => {
  hover.value = isHover
}

defineProps<{ classContent?: string }>()
</script>

<style scoped lang="scss">
@import '../../assets/styles/transitions.scss';
</style>
