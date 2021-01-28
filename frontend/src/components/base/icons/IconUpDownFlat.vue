<template>
  <mdi-minus-thick v-if="isFlat" class="w-20 h-20 text-gray-400" />
  <mdi-arrow-top-right
    v-else
    class="w-14 transform sm:w-20 sm:h-20 duration-1000 h-14"
    :class="className"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import MdiArrowTopRight from '/@/components/base/icons/mdi/MdiArrowTopRight.vue'
import MdiMinusThick from '/@/components/base/icons/mdi/MdiMinusThick.vue'

export type Status = 'UP' | 'DOWN' | 'FLAT'

export default defineComponent({
  components: {
    MdiArrowTopRight,
    MdiMinusThick,
  },

  props: {
    status: {
      type: String as () => Status,
      default: '',
    },
  },

  setup(props) {
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

    return {
      className,
      isFlat,
    }
  },
})
</script>
