<template>
  <span>
    <div class="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        :aria-expanded="hover"
        aria-labelledby="list-box-label"
        class="relative bg-white border hover:shadow-md border-gray-300 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800 sm:text-sm transition duration-200"
        :style="style"
        @click="hover = true"
      >
        <span class="flex items-center">
          <slot :symbol="value" />
        </span>
        <span
          class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <!-- Heroicon name: selector -->
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <div
        v-show="hover"
        class="fixed inset-0 h-full w-full z-10"
        @click="hover = false"
      ></div>

      <transition name="slide-down">
        <div
          v-if="hover"
          class="absolute mt-1 w-full bg-white overflow-y-scroll rounded-2xl overflow-hidden shadow-md hover:shadow-xl duration-300 transition-shadow z-20"
        >
          <ul
            :tabindex="-1"
            role="list-box"
            aria-labelledby="list-box-label"
            aria-activedescendant="list-box-item-3"
            class="text-gray-900 cursor-pointer rounded-2xl text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            :class="maxHeight"
          >
            <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
            <li
              v-for="(symbol, index) in symbols"
              id="list-box-item-0"
              :key="index"
              role="option"
              class="select-none relative py-2 transition duration-200 pl-3 pr-9 hover:text-white hover:bg-gray-800"
              :class="{
                'bg-gray-800 text-white font-bold bg-opacity-80':
                  symbol === value,
              }"
              @click="onClick(symbol)"
            >
              <div class="flex items-center">
                <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                <slot :symbol="symbol" />

                <!--
            Checkmark, only display for selected option.

            Highlighted: "text-white", Not Highlighted: "text-indigo-600"

          -->
              </div>
            </li>

            <!-- More options... -->
          </ul>
        </div>
      </transition>
    </div>
  </span>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, computed } from 'vue'
  export default defineComponent({
    props: {
      value: {
        type: String,
        default: '',
      },

      minWidth: {
        type: String,
        default: '',
      },

      maxHeight: {
        type: String,
        default: 'max-h-56',
      },

      symbols: {
        type: Array as PropType<readonly string[]>,
        default: () => [],
      },
    },

    emits: ['input'],
    setup(props, { emit }) {
      const hover = ref(false)

      const onClick = (symbol: string): void => {
        hover.value = false

        emit('input', symbol)
      }

      const style = computed(() => {
        return `min-width: ${props.minWidth}px`
      })

      return { hover, onClick, style }
    },
  })
</script>

<style scoped>
  .slide-down-enter-active,
  .slide-down-leave-active {
    @apply transition duration-200;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    @apply opacity-0 transform -translate-y-2;
  }
</style>
