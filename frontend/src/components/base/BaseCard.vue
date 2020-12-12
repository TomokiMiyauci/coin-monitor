<template>
  <base-div
    class="rounded-md bg-white shadow p-6 hover:shadow-md transition-shadow duration-200"
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
