<template>
  <base-span :class="className">{{ percentagedNumber }}%</base-span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import BaseSpan from './BaseSpan.vue'

  export default defineComponent({
    components: { BaseSpan },

    props: {
      value: {
        type: Number,
        required: true,
      },

      fractionDigits: {
        type: Number,
        default: 2,
      },
    },

    setup(props) {
      const percentagedNumber = computed(() => {
        // const percent = props.value / 100
        return props.value.toFixed(props.fractionDigits)
      })

      const className = computed(() => {
        if (props.value > 0) {
          return 'text-green-400'
        } else if (props.value < 0) {
          return 'text-red-400'
        }
      })

      return { percentagedNumber, className }
    },
  })
</script>
