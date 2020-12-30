<template>
  <base-card>
    <the-title-toolbar> last </the-title-toolbar>
    <div
      class="flex flex-col gap-8 p-4 bg-gradient-to-b from-white to-gray-200"
    >
      <text-loader skeltonClass="h-14 sm:h-24 md:h-32" :value="value">
        <comma-filter class="text-6xl sm:text-8xl md:text-9xl" :value="value" />
      </text-loader>

      <chart-line
        class="md:w-4/5 mx-auto stroke-8 md:stroke-5"
        width="100%"
        height="100%"
        :data="data"
      />
    </div>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  import TextLoader from './loaders/TextLoader.vue'
  import ChartLine from '../chart/ChartLine.vue'
  import TheTitleToolbar from '/@/components/app/TheTitleToolbar.vue'

  export default defineComponent({
    components: {
      BaseCard,
      CommaFilter,
      TextLoader,
      ChartLine,
      TheTitleToolbar,
    },

    props: {
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
    },
  })
</script>
