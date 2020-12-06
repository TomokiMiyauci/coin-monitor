<template>
  <div class="shadow rounded-md p-6 bg-white hover:shadow-md">
    <base-title-value
      title-class="text-lg text-gray-400"
      value-class=" text-9xl"
      :title="title"
      :value="value"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseTitleValue from '/@/components/base/BaseTitleValue.vue'

  export default defineComponent({
    components: {
      BaseTitleValue,
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
