<template>
  <div class="card-none sm:card">
    <h2>
      <header
        class="p-4 hidden items-center capitalize sm:flex justify-between"
      >
        <span class="text-2xl">last</span>

        <slot name="header" />
      </header>
    </h2>

    <text-loader
      v-flash
      skelton-class="inline-block w-full h-8 sm:h-24 md:h-32  text-3xl sm:text-7xl md:text-8xl font-bold sm:font-normal sm:p-4"
      :value="val"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, isRef, Ref, ref, toRefs, watch } from 'vue'

import TheTitleToolbar from '/@/components/app/TheTitleToolbar.vue'
import { Status } from '/@/components/base/icons/IconUpDownFlat.vue'
import TextLoader from '/@/components/base/loaders/TextLoader.vue'
import { toComma } from '/@/utils/format'

const useHistory = (v: Ref<number | undefined> | undefined) => {
  const history = ref<number>()
  const _v = isRef(v) ? v : ref(v)
  watch(
    () => _v.value,
    (_, prev) => {
      history.value = prev
    }
  )

  return { history }
}

export default defineComponent({
  components: {
    TextLoader,
    TheTitleToolbar,
  },

  props: {
    title: {
      type: String,
      default: 'Last',
    },

    value: {
      type: Number,
      default: undefined,
    },
  },

  setup(props) {
    const { value } = toRefs(props)
    const { history } = useHistory(value)

    const _status = (
      now: number | undefined,
      prev: number | undefined
    ): Status => {
      if (!now || !prev) return 'FLAT'
      return now > prev ? 'UP' : 'DOWN'
    }

    const status = computed<Status>(() => _status(props.value, history.value))
    const val = computed(() => toComma(props.value))

    return {
      status,
      val,
    }
  },
})
</script>
