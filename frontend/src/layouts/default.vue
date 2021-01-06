<template>
  <div class="flex flex-col lg:flex-row h-screen bg-gray-200">
    <the-navigation-drawer
      :min-variant="isMinVariant"
      @click="isMinVariant = !isMinVariant"
      class="fixed z-10 inset-y-0 left-0 transform-gpu duration-300 transition-all overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 -translate-x-full ease-in"
      :class="[isMinVariant ? 'w-20' : 'w-64']"
    />

    <the-header
      class="h-16 static rounded-bl-5xl inset-x-0 top-0 w-full transition delay-500 duration-700 lg:-translate-y-full transform lg:fixed -translate-y-0"
      @open="on(true)"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-4 sm:px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
    <transition name="fade">
      <hover-navigation class="max-w-9/12" @close="on(false)" v-show="state">
        <page-navs @close="on(false)" />
      </hover-navigation>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import TheNavigationDrawer from '/@/components/app/TheNavigationDrawer.vue'
  import TheHeader from '/@/components/app/TheHeader.vue'
  import HoverNavigation from '/@/components/app/HoverNavigation.vue'
  import PageNavs from '/@/components/app/PageNavs.vue'
  import { ref } from 'vue'

  const state = ref(false)
  const isMinVariant = ref(false)

  const on = (payload: boolean) => {
    state.value = payload
  }
</script>

<style scoped>
  .fade-enter-from,
  .fade-leave-to {
    @apply transform-gpu  opacity-0 translate-x-full;
  }

  .fade-enter-active,
  .fade-leave-active {
    @apply transition duration-500 ease-out;
  }
</style>
