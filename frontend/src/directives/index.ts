import { Directive } from 'vue'

const directive: Directive<HTMLElement, number | undefined> = {
  updated: (el, binding) => {
    el.animate({ opacity: [1, 0, 1] }, binding.value || 200)
  },
}

export { directive }
