<template>
  <div class="card flex flex-col">
    <the-title-toolbar> last </the-title-toolbar>

    <div class="p-4 flex-grow bg-gradient-to-b from-white to-gray-200">
      <div class="flex flex-col h-full">
        <div class="flex justify-between">
          <h2 class="text-gray-700 title">ask</h2>
          <h2 class="text-gray-700 title">bid</h2>
        </div>

        <div class="flex justify-between">
          <text-loader skelton-class="h-8 sm:h-12 w-1/3" :value="ask">
            <comma-filter class="text-3xl sm:text-5xl" :value="ask" />
          </text-loader>

          <text-loader skelton-class="h-8 sm:h-12 w-1/3" :value="bid">
            <comma-filter class="text-3xl sm:text-5xl" :value="bid" />
          </text-loader>
        </div>

        <div
          class="flex-grow text-2xl flex-wrap p-5 gap-12 mt-10 flex justify-center items-center"
        >
          <div>
            <div
              class="w-44 text-white hover:opacity-80 shadow hover:shadow-lg hover:scale-105 transform transition duration-200 h-44 bg-gradient-to-br from-purple-400 to-red-500 rounded-full flex justify-center items-center"
            >
              {{ highRef }}
            </div>
            <div class="text-center p-2">High</div>
          </div>

          <div>
            <div
              class="w-44 text-white hover:opacity-80 shadow hover:shadow-lg hover:scale-105 transform transition duration-200 h-44 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex justify-center items-center"
            >
              {{ lowRef }}
            </div>
            <div class="text-center p-2">Low</div>
          </div>

          <div>
            <div
              class="w-44 text-white hover:opacity-80 shadow hover:shadow-lg hover:scale-105 transform transition duration-200 h-44 bg-gradient-to-br from-green-400 to-yellow-500 rounded-full flex justify-center items-center"
            >
              {{ volumeRef }}
            </div>
            <div class="text-center p-2">Volume</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import TheTitleToolbar from '/@/components/app/TheTitleToolbar.vue'
import CommaFilter from '/@/components/base/CommaFilter.vue'
import { toComma } from '/@/utils/format'

import TextLoader from './loaders/TextLoader.vue'

export default defineComponent({
  components: {
    CommaFilter,
    TextLoader,
    TheTitleToolbar,
  },
  props: {
    ask: {
      type: Number,
      default: undefined,
      required: false,
    },

    bid: {
      type: Number,
      default: undefined,

      required: false,
    },

    high: {
      type: Number,
      default: undefined,

      required: false,
    },

    low: {
      type: Number,
      default: undefined,

      required: false,
    },
    volume: {
      type: Number,
      default: undefined,

      required: false,
    },
  },

  setup(props) {
    const highRef = computed(() => toComma(props.high))
    const lowRef = computed(() => toComma(props.low))
    const volumeRef = computed(() => toComma(props.volume))

    return {
      highRef,
      lowRef,
      volumeRef,
    }
  },
})
</script>
