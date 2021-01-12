<template>
  <table class="w-full">
    <thead>
      <tr>
        <slot name="header" :headers="headersRef">
          <th v-for="header in headersRef" :key="header.value">
            {{ header.text }}
          </th>
        </slot>
      </tr>
    </thead>

    <tbody>
      <tr
        :class="classTr || 'hover:bg-gray-100'"
        v-for="(item, index) in itemsRef"
        :key="index"
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
  export type Headers = {
    text?: string
    class?: string
    value: string | number
  }[]
  export type Items = {
    class?: string
    [k: string]: string | number | undefined
  }[]
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
    classTr?: string
  }>()

  const headersRef = computed(() => props.headers || [])
  const itemsRef = computed(() => props.items || [])
</script>
