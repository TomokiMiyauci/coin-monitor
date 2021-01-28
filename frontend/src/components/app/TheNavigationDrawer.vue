<template>
  <div
    class="bg-gray-800 shadow-md flex flex-col items-center flex-shrink-0 justify-between p-4"
    :class="[minVariant ? 'rounded-3xl lg:m-6' : 'rounded-r-7xl my-6']"
  >
    <span>
      <div class="flex items-center justify-center mt-4">
        <div class="flex items-center">
          <logo-letter v-show="!minVariant" />
          <span v-show="minVariant" class="text-white text-2xl">C</span>
        </div>
      </div>

      <page-navs :min-variant="minVariant" class="mt-10" />
    </span>

    <base-circle-button
      class="self-start hover:bg-gray-700"
      @click="$emit('click')"
    >
      <mdi-chevron-double-left
        class="transform transition-transform duration-500"
        :class="{ 'rotate-180': minVariant }"
      />
    </base-circle-button>
  </div>
</template>

<script setup lang="ts">
import { defineEmit, defineProps } from 'vue'

import LogoLetter from '/@/components/app/LogoLetter.vue'
import PageNavs from '/@/components/app/PageNavs.vue'
import BaseCircleButton from '/@/components/base/buttons/BaseCircleButton.vue'
import MdiChevronDoubleLeft from '/@/components/base/icons/mdi/MdiChevronDoubleLeft.vue'
defineProps<{ minVariant: boolean }>()
defineEmit(['click'])
</script>
