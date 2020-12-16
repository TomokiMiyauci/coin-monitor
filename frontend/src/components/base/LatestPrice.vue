<template>
  <base-card>
    <base-title-value
      title-class="text-lg text-gray-400"
      value-class=" text-9xl"
      :title="title"
    >
      <text-loader skelton-style="height: 8rem;" :value="value">
        <comma-filter class="text-9xl" :value="value" />
      </text-loader>
    </base-title-value>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseTitleValue from '/@/components/base/BaseTitleValue.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  import TextLoader from './loaders/TextLoader.vue'

  export default defineComponent({
    components: {
      BaseTitleValue,
      BaseCard,
      CommaFilter,
      TextLoader,
    },

    props: {
      title: {
        type: String,
        default: 'Last',
      },

      value: {
        type: Number,
        default: undefined,
      },
    },
  })
</script>
