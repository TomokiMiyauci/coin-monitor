<template>
  <div class="flex flex-col lg:flex-row h-screen bg-gray-200">
    <the-navigation-drawer
      class="fixed z-10 inset-y-0 left-0 w-64 transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 -translate-x-full ease-in"
    />

    <the-header
      class="h-16 static inset-x-0 top-0 w-full transition duration-700 lg:-translate-y-full transform lg:fixed -translate-y-0"
      @open="on(true)"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-4 sm:px-6 py-8">
          <div class="flex justify-between">
            <slot name="header">
              <h3 class="text-gray-700 text-3xl mb-8 font-medium capitalize">
                {{ title }}
              </h3>

              <slot name="header-rest" />
            </slot>
          </div>

          <slot />
        </div>
      </main>
    </div>
    <transition name="fade">
      <hover-navigation @close="on(false)" v-show="state">
        <page-navs />
      </hover-navigation>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import TheNavigationDrawer from '/@/components/app/TheNavigationDrawer.vue'
  import TheHeader from '/@/components/app/TheHeader.vue'
  import HoverNavigation from '/@/components/app/HoverNavigation.vue'
  import PageNavs from '/@/components/app/PageNavs.vue'
  import { defineProps, ref } from 'vue'

  const state = ref(false)

  const on = (payload: boolean) => {
    state.value = payload
  }

  defineProps<{ title: string }>()
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
