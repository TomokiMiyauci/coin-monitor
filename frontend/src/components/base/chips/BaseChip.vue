<template>
  <base-span class="py-0.5 shadow hover:shadow-md rounded-full">
    <slot
  /></base-span>
</template>

<script>
  import BaseSpan from '/@/components/base/BaseSpan.vue'
  export default {
    components: { BaseSpan },
  }
</script>
