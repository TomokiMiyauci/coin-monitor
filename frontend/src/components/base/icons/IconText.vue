<template>
  <slot />

  <slot name="text">
    <span v-show="!hideText" :class="classText">{{ text }}</span>
  </slot>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ text?: string; hideText?: boolean; classText?: string }>()
</script>
