<template>
  <base-td class="px-3 sm:px-5 py-1">
    {{ formattedDate }}
  </base-td>

  <base-td class="px-3 py-1 text-center">
    <comma-filter :value="rate" />
  </base-td>

  <base-td class="px-3 sm:px-5 py-1 text-right">
    {{ amount }}
  </base-td>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import BaseTd from '/@/components/base/BaseTd.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'

  export default defineComponent({
    components: {
      BaseTd,
      CommaFilter,
    },

    props: {
      date: {
        type: Date,
        default: () => new Date(),
      },

      rate: {
        type: Number,
        default: 0,
      },

      amount: {
        type: Number,
        default: 0,
      },
    },

    setup(props) {
      const formattedDate = computed(() => {
        const _date = (props.date as any) as Date
        return _date.toLocaleString('ja', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      })

      return {
        formattedDate,
      }
    },
  })
</script>
