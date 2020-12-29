<template>
  <base-card :overflow-hidden="false" class="p-4">
    <base-title-value title="Price">
      <template #title>
        <div class="flex justify-between">
          <base-h-3 class="text-lg text-gray-440">Price</base-h-3>
          <slot name="menu" />
        </div>
      </template>
      <div class="flex flex-col h-full">
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

        <div
          class="flex-grow text-lg flex-wrap p-5 gap-12 mt-10 flex justify-center items-center"
        >
          <div>
            <div
              class="w-44 text-white hover:opacity-80 shadow hover:shadow-lg hover:scale-105 transform transition duration-200 h-44 bg-gradient-to-br from-purple-400 to-red-500 rounded-full flex justify-center items-center"
            >
              {{ _high }}
            </div>
            <div class="text-center p-2">High</div>
          </div>

          <div>
            <div
              class="w-44 text-white hover:opacity-80 shadow hover:shadow-lg hover:scale-105 transform transition duration-200 h-44 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex justify-center items-center"
            >
              {{ _low }}
            </div>
            <div class="text-center p-2">Low</div>
          </div>
          <div>
            <div
              class="w-44 text-white hover:opacity-80 shadow hover:shadow-lg hover:scale-105 transform transition duration-200 h-44 bg-gradient-to-br from-yellow-500 to-green-500 rounded-full flex justify-center items-center"
            >
              {{ _volume }}
            </div>
            <div class="text-center p-2">Volume</div>
          </div>
        </div>
      </div>
    </base-title-value>
  </base-card>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import BaseCard from './BaseCard.vue'
  import TextLoader from './loaders/TextLoader.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import BaseTitleValue from '/@/components/base/BaseTitleValue.vue'
  import BaseH3 from './BaseH3.vue'
  import { toComma } from '/@/utils/format'

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
        required: false,
      },

      bid: {
        type: Number,
        required: false,
      },

      high: {
        type: Number,
        required: false,
      },

      low: {
        type: Number,
        required: false,
      },
      volume: {
        type: Number,
        required: false,
      },
    },

    setup(props) {
      const _high = computed(() => toComma(props.high))
      const _low = computed(() => toComma(props.low))
      const _volume = computed(() => toComma(props.volume))

      return {
        _high,
        _low,
        _volume,
      }
    },
  })
</script>
