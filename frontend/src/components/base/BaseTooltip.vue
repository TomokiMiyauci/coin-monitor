<template>
  <span
    class="relative"
    @mouseover="switchHover(true)"
    @mouseleave="switchHover(false)"
  >
    <slot />

    <transition name="fade">
      <div v-show="hover" class="absolute card z-10" :class="classContent">
        <slot name="content" />
      </div>
    </transition>
  </span>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const hover = ref(false)
const switchHover = (isHover: boolean): void => {
  hover.value = isHover
}

defineProps<{ classContent?: string }>()
</script>

<style lang="scss" src="/@/assets/styles/transitions.scss"></style>
