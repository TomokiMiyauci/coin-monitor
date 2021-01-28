<template>
  <the-toolbar class="p-4 pb-0 flex justify-between">
    <base-title> <slot /></base-title>

    <slot name="right" />
  </the-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TheToolbar from '/@/components/app/TheToolbar.vue'
import BaseTitle from '/@/components/base/BaseTitle.vue'

export default defineComponent({
  components: {
    TheToolbar,
    BaseTitle,
  },
})
</script>
