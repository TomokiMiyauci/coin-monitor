<template>
  <base-rate-table v-bind="$props" :data="data" classHdSymbol="w-8/12">
    <template #expand-th>
      <th class="text-right px-3">
        <text-icon text="1D">
          <span @mouseover="on" @mouseleave="off" class="relative">
            <mdi-mdi-help-circle class="w-4 align-top h-4" />

            <transition name="fade">
              <base-card class="absolute px-4 py02 right-0 z-10" v-show="hover">
                <pre>Now / Yesterday Now</pre>
              </base-card>
            </transition>
          </span>
        </text-icon>
      </th>
    </template>

    <template #expand-td="{ data }">
      <td class="text-right pr-3">
        <text-loader :value="data.ratio" skelton-style="min-width: 3rem">
          <flash-box :value="data.ratio">
            <percentage :value="data.ratio" />
          </flash-box>
        </text-loader>
      </td>
    </template>
    <template #td-inner-symbol="{ symbol }">
      <base-svg-symbol :symbol="symbol">
        <coincheck-symbol :symbol="symbol" />
      </base-svg-symbol>
    </template>
  </base-rate-table>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  import BaseRateTable from '/@/components/rate/BaseRateTable.vue'
  import CoincheckSymbol from '/@/components/coincheck/CoincheckSymbol.vue'
  import FlashBox from '/@/components/base/FlashBox.vue'
  import TextLoader from '/@/components/base/loaders/TextLoader.vue'
  import Percentage from '/@/components/base/Percentage.vue'
  import BaseSvgSymbol from '/@/components/base/BaseSvgSymbol.vue'
  import TextIcon from '/@/components/base/icons/TextIcon.vue'
  import MdiMdiHelpCircle from '/@/components/base/icons/mdi/MdiHelpCircle.vue'
  import BaseCard from '/@/components/base/BaseCard.vue'

  defineProps<{
    data: { symbol: string; rate?: number; ratio?: number }[]
    classHdSymbol?: string
    classHdRate?: string
    classTdSymbol?: string
    classTdRate?: string
    classBodyTd?: string
  }>()

  ref: hover = false

  const on = () => {
    hover = true
    console.log(1)
  }
  const off = () => {
    hover = false
  }
</script>

<style scoped lang="scss">
  @import '../../assets/styles/transitions.scss';
</style>
