<template>
  <nav>
    <router-link
      class="flex rounded items-center mt-4 py-2 px-6 hover:bg-gray-600 transition duration-200 text-gray-100"
      to="/"
      active-class="bg-gray-700"
      ><mdi-dashboard class="mx-3" /><span class="text-xl align-middle"
        >Dashboard</span
      ></router-link
    >
    <h5 class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
      markets
    </h5>

    <router-link
      v-for="{ to, icon } in navs"
      :key="to"
      :to="to"
      class="flex rounded items-center mt-1 py-2 px-6 hover:bg-gray-600 transition duration-200 text-gray-100"
      active-class="bg-gray-700"
    >
      <market-icon-text class="ml-3 capitalize text-xl" :value="icon" />
    </router-link>
  </nav>
</template>

<script setup lang="ts">
  import MdiDashboard from '/@/components/base/icons/mdi/MdiDashboard.vue'
  import MarketIconText from '/@/components/base/icons/markets/MarketIconText.vue'
  const navs = [
    {
      to: '/coincheck',
      icon: 'coincheck',
    },
    {
      to: '/zaif',
      icon: 'zaif',
    },
    {
      to: '/bitbank',
      icon: 'bitbank',
    },
    {
      to: '/bitpoint',
      icon: 'bitpoint',
    },
  ]
</script>
