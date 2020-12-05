<template>
  <default>
    <CurrentBoard v-if="result" :value="result" />
  </default>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, InjectionKey, ref } from 'vue'

  import ky from 'ky'
  import Default from '/@/layouts/default.vue'
  import CurrentBoard from '/@/components/coincheck/CurrentBoard.vue'

  const key: InjectionKey<typeof ky> = '$http'

  export default defineComponent({
    components: {
      Default,
      CurrentBoard,
    },

    setup() {
      const a = inject(key)!
      const result = ref()
      const data = ref([])

      const onClick = async () => {
        const ab = await a
          .get('https://coin-monitor-api.tomoki-miyauci.vercel.app/api/src')
          .json()
        console.log(ab)

        result.value = ab
      }

      setInterval(async () => {
        const ab = await a
          .get('https://coin-monitor-api.tomoki-miyauci.vercel.app/api/src')
          .json()
        console.log(ab)

        result.value = ab
      }, 10000)

      const sell = computed(() =>
        data.value.filter(({ order_type }) => order_type === 'sell')
      )

      const buy = computed(() =>
        data.value.filter(({ order_type }) => order_type === 'buy')
      )

      const onH = async () => {
        const result = await a
          .get(
            'https://coin-monitor-api.tomoki-miyauci.vercel.app/api/src/coincheck/ticker'
          )
          .json()
        data.value = result.data
      }

      return { result, onClick, onH, data, sell, buy }
    },
  })
</script>
