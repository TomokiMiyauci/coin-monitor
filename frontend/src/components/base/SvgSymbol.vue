<template>
  <component :is="component" width="24" height="24" class="inline-block" />
  <base-span class="align-middle ml-2">{{ symbol }}</base-span>
</template>

<script lang="ts">
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
    PropType,
  } from 'vue'
  import BaseSpan from '/@/components/base/BaseSpan.vue'
  import { CoincheckSymbol } from '/@/components/base/coin'

  const getAsyncComponent = (symbol: CoincheckSymbol) => {
    switch (symbol) {
      case 'BTC': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Btc.vue`)
        )
      }

      case 'ETC': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Etc.vue`)
        )
      }

      case 'ETH': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Eth.vue`)
        )
      }

      case 'IOST': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Iost.vue`)
        )
      }

      case 'LSK': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Lsk.vue`)
        )
      }

      case 'QTUM': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Qtum.vue`)
        )
      }

      case 'XEM': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Xem.vue`)
        )
      }

      case 'XLM': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Xlm.vue`)
        )
      }

      case 'XRP': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Xrp.vue`)
        )
      }

      case 'MONA': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Mona.vue`)
        )
      }

      case 'BAT': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Bat.vue`)
        )
      }

      case 'BCH': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Bch.vue`)
        )
      }

      case 'FCT': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Fct.vue`)
        )
      }

      case 'LTC': {
        return defineAsyncComponent(
          () => import(`/@/components/base/icons/coins/Ltc.vue`)
        )
      }
    }
  }

  export default defineComponent({
    components: { BaseSpan },
    props: {
      symbol: {
        type: String as PropType<CoincheckSymbol>,
        required: true,
      },
    },

    setup(props) {
      const component = computed(() => getAsyncComponent(props.symbol))

      return { component }
    },
  })
</script>
