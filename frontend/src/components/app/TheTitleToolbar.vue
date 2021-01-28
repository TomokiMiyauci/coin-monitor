<template>
  <the-toolbar class="p-4 pb-0 flex justify-between">
    <h2 class="title"><slot /></h2>

    <slot name="right" />
  </the-toolbar>
</template>

<script setup lang="ts">
import TheToolbar from '/@/components/app/TheToolbar.vue'
</script>
