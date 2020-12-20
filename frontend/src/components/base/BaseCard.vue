<template>
  <base-div
    class="rounded-md bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
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
  })
</script>
