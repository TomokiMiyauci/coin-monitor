<template>
  <div class="w-64 bg-gray-800 p-4 my-10 rounded-r-7xl">
    <div class="flex items-center justify-center mt-4">
      <div class="flex items-center">
        <logo-letter />
      </div>
    </div>

    <page-navs class="mt-10" />
  </div>
</template>

<script setup lang="ts">
  import LogoLetter from '/@/components/app/LogoLetter.vue'
  import PageNavs from '/@/components/app/PageNavs.vue'
</script>
