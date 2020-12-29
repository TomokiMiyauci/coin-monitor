<template>
  <base-card class="p-4">
    <base-title-value
      title-class="text-lg pb-0 text-gray-400"
      value-class=" text-9xl"
      :title="title"
    >
      <div class="flex flex-col gap-8">
        <text-loader skelton-style="height: 8rem;" :value="value">
          <comma-filter class="text-9xl" :value="value" />
        </text-loader>

        <chart-line width="100%" height="100%" :data="data" />
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
