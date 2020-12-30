import { VueComponent as Coincheck } from '/@/assets/svgs/markets/coincheck.svg'
import { VueComponent as Zaif } from '/@/assets/svgs/markets/zaif.svg'
import { VueComponent as Bitbank } from '/@/assets/svgs/markets/bitbank.svg'
import Bitpoint from '/@/components/base/icons/markets/Bitpoint.vue'
import { Market } from '/@/utils/symbol'

export const getComponent = (symbol: Market) => {
  switch (symbol) {
    case 'coincheck': {
      return Coincheck
    }

    case 'zaif': {
      return Zaif
    }

    case 'bitbank': {
      return Bitbank
    }

    case 'bitpoint': {
      return Bitpoint
    }
  }
}
