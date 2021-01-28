<template>
  <table :class="classTable">
    <thead :class="classThead">
      <tr>
        <slot name="header" :headers="headersRef">
          <th v-for="header in headersRef" :key="header.value" :class="classTh">
            {{ header.text }}
          </th>
        </slot>
      </tr>
    </thead>

    <tbody :class="classTbody">
      <tr
        v-for="(item, index) in itemsRef"
        :key="index"
        :class="classTr || 'hover:bg-gray-100'"
      >
        <slot name="item" :item="item">
          <td v-for="{ value } in headersRef" :key="value">
            {{ item[value] }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
type Headers = {
  text?: string
  class?: string
  value: string | number
}[]
type Items = {
  class?: string
  [k: string]: string | number | undefined
}[]

export { Headers, Items }
</script>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps<{
  headers?: {
    text?: string
    class?: string
    value: string | number
  }[]
  items?: {
    class?: string
    [k: string]: string | number | undefined
  }[]
  classTable?: string
  classThead?: string
  classTbody?: string
  classTh?: string
  classTr?: string
}>()

const headersRef = computed(() => props.headers || [])
const itemsRef = computed(() => props.items || [])
</script>
