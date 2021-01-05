<template>
  <div
    class="fixed inset-y-0 right-0 flex bg-gray-900 flex-col shadow-lg bg-opacity-20 w-80"
    style="backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(4px)"
  >
    <div class="text-right p-2">
      <button
        @click="$emit('close')"
        class="p-2 rounded-md focus:outline-none focus:ring"
      >
        <svg
          class="w-6 h-6 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div class="flex-1 max-h-full p-4 overflow-hidden hover:overflow-y-scroll">
      <slot />
      <!-- Settings Panel Content ... -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineEmit } from 'vue'
  defineEmit(['close'])
</script>
