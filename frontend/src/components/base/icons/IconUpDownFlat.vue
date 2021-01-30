<template>
  <mdi-minus-thick v-if="isFlat" class="w-20 h-20 text-gray-400" />
  <mdi-arrow-top-right
    v-else
    class="w-14 transform sm:w-20 sm:h-20 duration-1000 h-14"
    :class="className"
  />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

import MdiArrowTopRight from '/@/components/base/icons/mdi/MdiArrowTopRight.vue'
import MdiMinusThick from '/@/components/base/icons/mdi/MdiMinusThick.vue'

type Status = 'UP' | 'DOWN' | 'FLAT'
const props = defineProps({
  status: {
    type: String as () => 'UP' | 'DOWN' | 'FLAT',
    default: '',
  },
})

const _isFlat = (status: Status): boolean => status === 'FLAT'
const isFlat = computed(() => _isFlat(props.status))
const className = computed(() => {
  switch (props.status) {
    case 'UP': {
      return 'text-red-500'
    }

    case 'DOWN': {
      return 'text-green-500 rotate-90'
    }

    default: {
      return ''
    }
  }
})
</script>
