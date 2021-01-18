<template>
  <div class="relative">
    <slot name="activator">
      <button
        ref="button"
        :aria-expanded="isShow"
        class="p-2 pl-3 flex justify-between items-center bg-white hover:bg-gray-50 border hover:shadow-md border-gray-300 rounded-2xl shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-gray-800 focus:border-gray-800 sm:text-sm transition duration-200"
        :class="classButton"
        @click="switchShow(isShow)"
      >
        <slot name="buttonContent" :value="value">
          <span>{{ buttonTitle }}</span>
        </slot>

        <MdiUnfoldMoreHorizontal class="ml-3" />
      </button>
    </slot>

    <div
      v-show="isShow"
      class="fixed inset-0 h-full w-full"
      @click="hide"
    ></div>

    <transition name="slide-down">
      <div
        v-show="isShow"
        class="absolute border mt-1 w-full bg-white overflow-y-scroll rounded-2xl overflow-hidden shadow-md hover:shadow-xl duration-300 transition-shadow z-20"
      >
        <slot name="header">
          <header
            class="px-3 bg-gray-50 sticky py-2 flex items-center justify-between border-b"
          >
            <h3 class="text-lg">{{ title }}</h3>
            <button-close-circle
              class="bg-gray-300 focus:ring-2 focus:ring-gray-800"
              @click="hide"
            />
          </header>
        </slot>

        <ul
          ref="ul"
          :tabindex="-1"
          role="list-box"
          aria-labelledby="list-box-label"
          aria-activedescendant="list-box-item-1"
          class="text-gray-900 py-1 cursor-pointer overflow-y-scroll h-52 text-base overflow-auto focus:outline-none sm:text-sm"
          :class="maxHeight"
          @keydown.up.prevent="onArrowUp"
          @keydown.down.prevent="onArrowDown"
          @keydown.enter.prevent="onSelect"
          @keydown.space.prevent="onSelect"
          @keydown.esc.prevent="hide"
        >
          <li
            v-for="(d, index) in candidates"
            :id="`list-box-item-${index}`"
            :key="`${d}-${index}`"
            role="option"
            class="select-none items-center flex justify-between py-2 transition duration-200 p-3"
            :class="[
              { 'text-white bg-gray-800': selected === index },
              { 'font-bold': d === value },
            ]"
            @mouseenter="onMouse(index)"
            @click="onClick(d)"
          >
            <slot name="candidate" :candidate="d">
              <span>{{ d }}</span>
            </slot>

            <transition name="fade">
              <mdi-check v-show="d === value" width="20" height="20" />
            </transition>
          </li>
        </ul>

        <div
          class="border-t hidden bg-gray-200 px-4 p-1 text-xs md:flex flex-wrap gap-3"
        >
          <span class="bg-gray-100 p-1 rounded">
            <button-keyboard-arrow-up @click="onArrowUp" />

            <span class="ml-1 align-middle">Up</span>
          </span>

          <span ref="arrowDown" class="bg-gray-100 p-1 rounded">
            <button-keyboard-arrow-down @click="onArrowDown" />
            <span class="ml-1 align-middle">Down</span>
          </span>

          <span class="bg-gray-100 p-1 rounded">
            <button-keyboard-enter @click="onSelect" />
            /
            <button-keyboard-space @click="onSelect" />
            <span class="ml-1 align-middle">Enter</span>
          </span>
          <span class="bg-gray-100 p-1 rounded">
            <button-keyboard-esc @click="hide" />
            <span class="ml-1 align-middle">Close</span>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import {
    ref,
    defineProps,
    defineEmit,
    useContext,
    nextTick,
    computed,
  } from 'vue'
  import MdiUnfoldMoreHorizontal from '/@/components/base/icons/mdi/MdiUnfoldMoreHorizontal.vue'
  import MdiCheck from '/@/components/base/icons/mdi/MdiCheck.vue'
  import ButtonKeyboardEnter from '/@/components/base/buttons/keyboards/ButtonKeyboardEnter.vue'
  import ButtonKeyboardArrowDown from '/@/components/base/buttons/keyboards/ButtonKeyboardArrowDown.vue'
  import ButtonKeyboardArrowUp from '/@/components/base/buttons/keyboards/ButtonKeyboardArrowUp.vue'
  import ButtonKeyboardEsc from '/@/components/base/buttons/keyboards/ButtonKeyboardEsc.vue'
  import ButtonKeyboardSpace from '/@/components/base/buttons/keyboards/ButtonKeyboardSpace.vue'
  import ButtonCloseCircle from '/@/components/base/buttons/ButtonCloseCircle.vue'
  import { add } from '/@/utils/math'

  const props = defineProps<{
    value: string
    candidates: Readonly<string[]>
    minWidth?: string | number
    maxHeight?: string | number
    title?: string
    placeholder?: string
    classButton?: string
  }>()
  defineEmit(['input'])
  const { emit } = useContext()

  const isShow = ref<boolean>(false)
  const selected = ref<number>()
  const ul = ref<HTMLUListElement>()
  const button = ref<HTMLButtonElement>()
  const arrowDown = ref<HTMLSpanElement>()

  const switchShow = (payload: boolean): void => {
    payload ? hide() : show()
  }

  const onClick = async (payload: string) => {
    emit('input', payload)
    await nextTick()

    hide()
  }

  const buttonTitle = computed(() => props.value || props.placeholder)

  const show = async () => {
    const picked = props.candidates.findIndex((v) => v === props.value)
    if (picked > -1) {
      selected.value = picked
    }
    isShow.value = true
    await nextTick()

    ul.value?.focus()
  }

  const length = computed<number>(() => props.candidates.length)

  const onArrowDown = () => {
    ul.value?.scrollBy({
      top: 37,
      behavior: 'smooth',
    })
    const _selected = selected.value || 0
    const result = add(_selected, 1)
    if (result >= length.value) return
    selected.value = result
  }

  const onArrowUp = () => {
    ul.value?.scrollBy({
      top: -37,
      behavior: 'smooth',
    })
    const _selected = selected.value || 0
    const result = add(_selected, -1)
    if (result < 0) return
    selected.value = result
  }

  const onSelect = async () => {
    if (selected.value === undefined) return
    const picked = props.candidates[selected.value]
    emit('input', picked)
    await nextTick()

    hide()
    button.value?.focus()
  }

  const onMouse = (index?: number): void => {
    selected.value = index
  }

  const hide = (): void => {
    isShow.value = false
  }
</script>

<style scoped lang="scss">
  @import '../../assets/styles/transitions.scss';
</style>
