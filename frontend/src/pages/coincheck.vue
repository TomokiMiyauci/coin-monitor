<template>
  <h3 class="text-gray-700 text-3xl mb-8 font-medium capitalize">Coincheck</h3>

  <CurrentBoard />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

import CurrentBoard from '/@/components/coincheck/CurrentBoard.vue'

useHead({
  title: 'Coincheck | Coin Monitor',
})
</script>
