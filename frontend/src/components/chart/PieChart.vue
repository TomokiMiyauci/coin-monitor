<template>
  <div :id="id" class="ct-chart" />
</template>

<script setup lang="ts">
  import {
    Pie,
    Svg,
    IChartistPieChart,
    IChartistData,
    IPieChartOptions,
    IResponsiveOptionTuple,
  } from 'chartist'
  import { onMounted, defineProps, watch, ref } from 'vue'

  const props = defineProps<{
    data: IChartistData
    options?: IPieChartOptions
    responsiveOptions?: IResponsiveOptionTuple<IPieChartOptions>[]
    id: string
  }>()

  const barChart = ref<IChartistPieChart>()

  watch(props, ({ data, options }) => {
    barChart.value?.update(data, options)
  })

  onMounted(() => {
    barChart.value = new Pie(
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
