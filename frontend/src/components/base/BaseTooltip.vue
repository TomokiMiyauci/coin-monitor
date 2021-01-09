<template>
  <span
    @mouseover="switchHover(true)"
    @mouseleave="switchHover(false)"
    class="relative"
  >
    <slot />

    <transition name="fade">
      <base-card class="absolute z-10" :class="classContent" v-show="hover">
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
