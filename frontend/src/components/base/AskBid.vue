<template>
  <base-card :overflow-hidden="false" class="p-4">
    <base-title-value title="Price">
      <template #title>
        <div class="flex justify-between">
          <base-h-3 class="text-lg text-gray-400">Price</base-h-3>
          <slot name="menu" />
        </div>
      </template>
      <div class="flex mt-8 items-center justify-between">
        <div>
          <base-title-value title="Ask">
            <text-loader
              skelton-style="min-height: 2rem;min-width: 8rem;"
              :value="ask"
            >
              <comma-filter class="text-2xl" :value="ask" />
            </text-loader>
          </base-title-value>
        </div>

        <div class="text-right">
          <base-title-value title="Bid">
            <text-loader
              skelton-style="min-height: 2rem;min-width: 8rem;"
              :value="bid"
            >
              <comma-filter class="text-2xl" :value="bid" />
            </text-loader>
          </base-title-value>
        </div>
      </div>
    </base-title-value>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseCard from './BaseCard.vue'
  import TextLoader from './loaders/TextLoader.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import BaseTitleValue from '/@/components/base/BaseTitleValue.vue'
  import BaseH3 from './BaseH3.vue'

  export default defineComponent({
    components: {
      BaseTitleValue,
      CommaFilter,
      BaseCard,
      TextLoader,
      BaseH3,
    },
    props: {
      ask: {
        type: Number,
        default: undefined,
      },

      bid: {
        type: Number,
        default: undefined,
      },
    },
  })
</script>
