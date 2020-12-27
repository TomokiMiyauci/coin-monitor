<template>
  <div class="w-64 bg-gray-800 p-4">
    <div class="flex items-center justify-center mt-4">
      <div class="flex items-center">
        <span class="text-white text-2xl mx-2 font-semibold">Coin Monitor</span>
      </div>
    </div>

    <nav class="mt-10">
      <router-link
        class="flex rounded items-center mt-4 py-2 px-6 hover:bg-gray-600 transition duration-200 text-gray-100"
        to="/"
        ><mdi-dashboard class="mx-3" /><span class="text-xl align-middle"
          >Dashboard</span
        ></router-link
      >
      <h5 class="flex font-medium text-sm text-gray-400 px-4 my-4 uppercase">
        markets
      </h5>

      <router-link
        to="/coincheck"
        class="flex rounded items-center mt-4 py-2 px-6 hover:bg-gray-600 transition duration-200 text-gray-100"
        active-class="bg-gray-700"
      >
        <span class="mx-3"
          ><coincheck class="inline-block" width="24" height="24" /><span
            class="ml-3 text-xl align-middle"
            >Coincheck</span
          ></span
        >
      </router-link>

      <router-link
        to="/zaif"
        class="flex rounded items-center mt-1 py-2 px-6 hover:bg-gray-600 transition duration-200 text-gray-100"
        active-class="bg-gray-700"
      >
        <span class="mx-3">
          <zaif class="inline-block" width="24" height="24" /><span
            class="ml-3 text-xl align-middle"
          >
            Zaif</span
          >
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { VueComponent as Zaif } from '/@/assets/svgs/markets/zaif.svg'
  import { VueComponent as Coincheck } from '/@/assets/svgs/markets/coincheck.svg'
  import MdiDashboard from '/@/components/base/icons/mdi/MdiDashboard.vue'

  export default defineComponent({
    components: {
      Zaif,
      Coincheck,
      MdiDashboard,
    },
  })
</script>
