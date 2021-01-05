<template>
  <button
    class="inline-block p-3 text-center text-white transition border border-yellow-500 rounded-full ripple focus:outline-none"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { defineEmit } from 'vue'

  defineEmit(['click'])
</script>
