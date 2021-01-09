<template>
  <slot name="text">
    <span :class="classText" v-show="!hideText">{{ text }}</span>
  </slot>
  <slot />
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  defineProps<{ text?: string; hideText?: boolean; classText?: string }>()
</script>
