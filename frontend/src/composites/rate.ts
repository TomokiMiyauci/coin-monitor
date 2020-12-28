import { Ref, ref, watch } from 'vue'

export const useHistory = (
  val: Ref<number | undefined>,
  threshold: number
): Ref<number[]> => {
  const values = ref<number[]>([])

  watch(val, (now) => {
    if (!now) return
    if (values.value.length > threshold) {
      values.value.shift()
      values.value = [...values.value, now]
    } else {
      values.value = [...values.value, now]
    }
  })

  return values
}
