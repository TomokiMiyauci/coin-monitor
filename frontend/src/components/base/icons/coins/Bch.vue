<template>
  <VueComponent />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  export default defineComponent({
    components: {
      VueComponent: defineAsyncComponent(() =>
        import('/@/assets/svgs/coins/bch.svg').then(
          ({ VueComponent }) => VueComponent
        )
      ),
    },
  })
</script>
