<template>
  <base-card class="flex flex-col">
    <the-title-toolbar> last </the-title-toolbar>
    <div
      class="flex flex-grow flex-col gap-8 p-4 bg-gradient-to-b from-white to-gray-200"
    >
      <text-loader
        skeltonClass="h-14 sm:h-24 md:h-32"
        class="flex items-center"
        :value="value"
      >
        <comma-filter
          class="text-6xl sm:text-8xl md:text-9xl mr-3"
          :value="value"
        />
        <icon-up-down-flat :status="status" />
      </text-loader>
    </div>
  </base-card>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    ref,
    watch,
    Ref,
    toRefs,
    isRef,
  } from 'vue'
  import BaseCard from '/@/components/base/BaseCard.vue'
  import CommaFilter from '/@/components/base/CommaFilter.vue'
  import TextLoader from '/@/components/base/loaders/TextLoader.vue'
  import TheTitleToolbar from '/@/components/app/TheTitleToolbar.vue'
  import MdiArrowTopRight from '/@/components/base/icons/mdi/MdiArrowTopRight.vue'
  import MdiMinusThick from '/@/components/base/icons/mdi/MdiMinusThick.vue'
  import IconUpDownFlat, {
    Status,
  } from '/@/components/base/icons/IconUpDownFlat.vue'

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
      BaseCard,
      CommaFilter,
      TextLoader,
      TheTitleToolbar,
      MdiArrowTopRight,
      MdiMinusThick,
      IconUpDownFlat,
    },

    props: {
      title: {
        type: String,
        default: 'Last',
      },

      value: {
        type: Number,
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

      return {
        status,
      }
    },
  })
</script>
