<template>
  <div>
    <!-- <label id="list-box-label" class="block text-sm font-medium text-gray-700">
      Assigned to
    </label> -->
    <div class="relative">
      <button
        type="button"
        aria-haspopup="list-box"
        :aria-expanded="hover"
        aria-labelledby="list-box-label"
        class="relative bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        style="min-width: 136px"
        @click="hover = true"
      >
        <span class="flex items-center">
          <svg-symbol :symbol="value" />
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

      <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        v-show="hover"
        class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-20"
      >
        <ul
          tabindex="-1"
          role="list-box"
          aria-labelledby="list-box-label"
          aria-activedescendant="list-box-item-3"
          class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        -->
          <li
            v-for="(li, index) in SYMBOLS"
            id="list-box-item-0"
            :key="index"
            role="option"
            class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600"
            @click="onClick(li)"
          >
            <div class="flex items-center">
              <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
              <svg-symbol :symbol="li" />

              <!--
            Checkmark, only display for selected option.

            Highlighted: "text-white", Not Highlighted: "text-indigo-600"

          -->
            </div>
          </li>

          <!-- More options... -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'
  import SvgSymbol from './SvgSymbol.vue'
  import { SYMBOLS, CoincheckSymbol } from '/@/components/base/coin'
  export default defineComponent({
    components: {
      SvgSymbol,
    },

    props: {
      value: {
        type: String as PropType<CoincheckSymbol>,
        default: '',
      },
    },

    emits: ['input'],
    setup(props, { emit }) {
      const hover = ref(false)
      const selected = ref(0)

      const onClick = (symbol: CoincheckSymbol) => {
        hover.value = false

        emit('input', symbol)
      }

      return { hover, selected, SYMBOLS, onClick }
    },
  })
</script>
