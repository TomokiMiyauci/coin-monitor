<template>
  <div :id="id" />
</template>

<script setup lang="ts">
import {
  Bar,
  IBarChartOptions,
  IChartistBarChart,
  IChartistData,
  IResponsiveOptionTuple,
  Svg,
} from 'chartist'
import { defineProps, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  data: IChartistData
  options?: IBarChartOptions
  responsiveOptions?: IResponsiveOptionTuple<IBarChartOptions>[]
  id: string
}>()

const barChart = ref<IChartistBarChart>()

watch(
  () => props.data,
  (now) => {
    barChart.value?.update(now)
  }
)

onMounted(() => {
  barChart.value = new Bar(
    `#${props.id}`,
    props.data,
    props.options,
    props.responsiveOptions
  )

  barChart.value.on('draw', (data) => {
    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        d: {
          dur: 1000,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
          easing: Svg.Easing.easeOutQuint,
        },
      })
    }
  })
})
</script>
