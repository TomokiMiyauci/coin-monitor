<template>
  <div id="line-chart" />
</template>

<script setup lang="ts">
  import { Line, Svg, IChartistLineChart } from 'chartist'
  import { onMounted, defineProps, watch, ref } from 'vue'
  type LineChart = ConstructorParameters<typeof Line>
  type Data = LineChart[1]
  type Options = LineChart[2]
  type ResponsiveOptions = LineChart[3]
  const props = defineProps<{
    data: Data
    options?: Options
    responsiveOptions?: ResponsiveOptions
  }>()

  const lineChart = ref<IChartistLineChart>()

  watch(props, () => {
    lineChart.value?.update(props.data)
  })

  onMounted(() => {
    lineChart.value = new Line(
      '#line-chart',
      props.data,
      props.options,
      props.responsiveOptions
    )

    lineChart.value.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 2000 * data.index,
            dur: 2000,
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
