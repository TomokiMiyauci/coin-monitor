<template>
  <div class="card-none sm:card">
    <the-title-toolbar> last </the-title-toolbar>
    <div
      class="flex flex-col gap-8 p-4 bg-gradient-to-b from-white to-gray-200"
    >
      <text-loader
        v-flash
        skelton-class="h-14 sm:h-24 md:h-32 text-6xl sm:text-8xl md:text-9xl"
        :value="toComma(value)"
      />

      <chart-line
        class="md:w-4/5 mx-auto stroke-8 md:stroke-5"
        width="100%"
        height="100%"
        :data="data"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'

import TheTitleToolbar from '/@/components/app/TheTitleToolbar.vue'
import TextLoader from '/@/components/base/loaders/TextLoader.vue'
import ChartLine from '/@/components/chart/ChartLine.vue'
import { toComma } from '/@/utils/format'

defineProps({
  title: {
    type: String,
    default: 'Last',
  },

  data: {
    type: Array as PropType<number[]>,
    default: () => [],
  },

  value: {
    type: Number,
    default: undefined,
  },
})
</script>
