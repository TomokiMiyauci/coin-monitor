<template>
  <header class="bg-gray-800 px-3 py-1 flex items-center justify-between">
    <logo-letter />

    <button
      class="mr-2 rounded-full outline-none shadow focus:outline-none"
      @click="$emit('open')"
    >
      <mdi-menu class="text-white" />
    </button>
  </header>
</template>

<script setup lang="ts">
  import LogoLetter from '/@/components/app/LogoLetter.vue'
  import MdiMenu from '/@/components/base/icons/mdi/MdiMenu.vue'
</script>
