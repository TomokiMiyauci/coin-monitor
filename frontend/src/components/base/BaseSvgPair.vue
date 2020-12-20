<template>
  <div>
    <span class="relative flex items-center justify-center">
      <component
        :is="baseSymbolComponent"
        width="24"
        height="24"
        class="inline-block absolute left-3 top-0 bg-white shadow-sm border rounded-full"
      />
      <component
        :is="component"
        width="24"
        height="24"
        class="inline-block absolute left-0 top-0 bg-white border shadow-sm rounded-full"
      />
    </span>
    <base-span class="align-middle ml-12">{{ pair }}</base-span>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import { getComponent } from '/@/components/zaif/symbol'
  import BaseSpan from '/@/components/base/BaseSpan.vue'
  import { ZaifBaseSymbol } from '/@/components/base/coin'

  export default defineComponent({
    components: { BaseSpan },
    props: {
      symbol: {
        type: String as PropType<ZaifBaseSymbol>,
        required: true,
      },

      baseSymbol: {
        type: String as PropType<ZaifBaseSymbol>,
        required: true,
      },
    },

    setup(props) {
      const component = computed(() => getComponent(props.symbol))
      const baseSymbolComponent = computed(() => getComponent(props.baseSymbol))

      const pair = computed(() => `${props.symbol}${props.baseSymbol}`)

      return { component, pair, baseSymbolComponent }
    },
  })
</script>
