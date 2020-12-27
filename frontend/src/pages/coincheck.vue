<template>
  <default title="coincheck">
    <CurrentBoard />
  </default>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Default from '/@/layouts/default.vue'
  import CurrentBoard from '/@/components/coincheck/CurrentBoard.vue'
  import { doc, getDoc } from 'firebase/firestore/lite'
  import { useFirestore } from '/@/plugins/firebase'

  export default defineComponent({
    components: {
      Default,
      CurrentBoard,
    },

    setup() {
      const { $firestore } = useFirestore()
      getDoc(
        doc(
          $firestore,
          'markets/coincheck/pairs/btc_jpy/rates/1IsLJEVauQfi4LAsiy8E'
        )
      ).then((e) => {
        console.log(e.data())
      })
    },
  })
</script>
