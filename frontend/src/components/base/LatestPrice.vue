<template>
  <base-card class="p-4">
    <base-title-value
      title-class="text-lg pb-0 text-gray-400"
      value-class=" text-9xl"
      :title="title"
    >
      <div class="flex flex-col gap-8">
        <text-loader skeltonClass="h-14 sm:h-24 md:h-32" :value="value">
          <comma-filter
            class="text-6xl sm:text-8xl md:text-9xl"
            :value="value"
          />
        </text-loader>

        <chart-line
          class="md:w-4/5 mx-auto stroke-8 md:stroke-5"
          width="100%"
          height="100%"
          :data="data"
        />
      </div>
    </base-title-value>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import BaseTitleValue from '/@/components/base/BaseTitleValue.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  import TextLoader from './loaders/TextLoader.vue'
  import ChartLine from '../chart/ChartLine.vue'

  export default defineComponent({
    components: {
      BaseTitleValue,
      BaseCard,
      CommaFilter,
      TextLoader,
      ChartLine,
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
