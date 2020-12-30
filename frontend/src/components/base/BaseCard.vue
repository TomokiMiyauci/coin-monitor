<template>
  <base-div
    class="rounded-md from-gray-100 via-white to-gray-100 bg-gradient-to-b shadow-md hover:shadow-xl transition-shadow duration-200"
    :class="{ 'overflow-hidden': overflowHidden }"
  >
    <slot />
  </base-div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import BaseDiv from '/@/components/base/BaseDiv.vue'
  export default defineComponent({
    components: {
      BaseDiv,
    },

    props: {
      overflowHidden: {
        type: Boolean,
        default: true,
      },
    },
  })
</script>
