<template>
  <div class="flex h-screen bg-gray-200">
    <the-navigation-drawer
      class="fixed z-10 inset-y-0 left-0 w-64 transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 -translate-x-full ease-in"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-6 py-8">
          <h3 class="text-gray-700 text-3xl mb-8 font-medium capitalize">
            {{ title }}
          </h3>

          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import TheNavigationDrawer from '/@/components/app/TheNavigationDrawer.vue'

  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {
      TheNavigationDrawer,
    },

    props: {
      title: {
        type: String,
        default: '',
      },
    },
  })
</script>
