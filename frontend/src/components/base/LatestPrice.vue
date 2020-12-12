<template>
  <base-card>
    <base-title-value
      title-class="text-lg text-gray-400"
      value-class=" text-9xl"
      :title="title"
      :value="value"
    />
  </base-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseTitleValue from '/@/components/base/BaseTitleValue.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'

  export default defineComponent({
    components: {
      BaseTitleValue,
      BaseCard,
    },

    props: {
      title: {
        type: String,
        default: 'Last',
      },

      value: {
        type: Number,
        required: true,
      },
    },
  })
</script>
