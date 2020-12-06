<template>
  <div class="w-64 bg-gray-800 p-4">
    <div class="flex items-center justify-center mt-4">
      <div class="flex items-center">
        <span class="text-white text-2xl mx-2 font-semibold">Coin Monitor</span>
      </div>
    </div>

    <nav class="mt-10">
      <h5 class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
        markets
      </h5>
      <a
        class="flex rounded items-center mt-4 py-2 px-6 hover:bg-gray-700 bg-opacity-25 text-gray-100"
        href="/"
      >
        <span class="mx-3">Coincheck</span>
      </a>
    </nav>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({})
</script>
