<template>
  <div class="w-64 bg-gray-800 p-4">
    <div class="flex items-center justify-center mt-4">
      <div class="flex items-center">
        <logo-letter />
      </div>
    </div>

    <page-navs class="mt-10" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MdiDashboard from '/@/components/base/icons/mdi/MdiDashboard.vue'
  import LogoLetter from '/@/components/app/LogoLetter.vue'
  import PageNavs from '/@/components/app/PageNavs.vue'

  export default defineComponent({
    components: {
      MdiDashboard,
      LogoLetter,
      PageNavs,
    },
  })
</script>
