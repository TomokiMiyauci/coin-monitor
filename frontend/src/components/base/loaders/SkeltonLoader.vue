<template>
  <div class="div" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped>
.div {
  animation: loading 1.5s infinite;
  background: linear-gradient(
    90deg,
    hsla(0, 0%, 100%, 0),
    hsla(0, 0%, 100%, 0.3),
    hsla(0, 0%, 100%, 0)
  );
  content: '';
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(-100%);
  z-index: 1;
}

@keyframes loading {
  to {
    transform: translateX(100%);
  }
}
</style>
