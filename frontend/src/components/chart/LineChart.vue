<template>
  <div id="line-chart" />
</template>

<script setup lang="ts">
  import { Line } from 'chartist'
  import { onMounted, defineProps, watch } from 'vue'
  type LineChart = ConstructorParameters<typeof Line>
  type Data = LineChart[1]
  type Options = LineChart[2]

  const props = defineProps<{
    data: Data
    options?: Options
  }>()

  watch(props, () => {
    new Line('#line-chart', props.data).update(props.data, props.options)
  })

  onMounted(() => {
    new Line('#line-chart', props.data, props.options)
  })
</script>
