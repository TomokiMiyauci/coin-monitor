<template>
  <nav>
    <router-link
      class="flex rounded items-center mt-4 py-2 hover:bg-gray-600 transition duration-200 text-gray-100"
      :class="[minVariant ? 'justify-center' : 'px-10']"
      to="/"
      active-class="bg-gray-700"
      @click.prevent="on('/')"
    >
      <icon-text
        text="Dashboard"
        class-text="text-xl align-middle ml-3"
        :hide-text="minVariant"
      >
        <mdi-dashboard />
      </icon-text>
    </router-link>
    <h5 class="flex font-medium text-sm text-gray-400 my-4 uppercase">
      markets
    </h5>

    <router-link
      v-for="{ to, icon } in navs"
      :key="to"
      :to="to"
      class="flex rounded items-center mt-1 py-2 hover:bg-gray-600 transition duration-200 text-gray-100"
      :class="[minVariant ? 'justify-center' : 'px-10']"
      active-class="bg-gray-700"
      @click.prevent="on(to)"
    >
      <market-icon-text
        v-if="!minVariant"
        class="capitalize text-xl"
        :value="icon"
      />
      <base-icon-component v-else :component="getComponent(icon)" />
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, useContext } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseIconComponent from '/@/components/base/BaseIconComponent.vue'
import IconText from '/@/components/base/icons/IconText.vue'
import MarketIconText from '/@/components/base/icons/markets/MarketIconText.vue'
import MdiDashboard from '/@/components/base/icons/mdi/MdiDashboard.vue'
import { getComponent } from '/@/components/market/symbol'
const { emit } = useContext()
const router = useRouter()
const route = useRoute()

const on = (routeLocation: string) => {
  router.push(routeLocation)
  if (route.path !== routeLocation) {
    emit('close')
  }
}

defineProps<{ minVariant?: boolean }>()
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
] as const
</script>
