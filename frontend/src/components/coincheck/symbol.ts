import { VueComponent as Btc } from '/@/assets/svgs/coins/btc.svg'
import { VueComponent as Etc } from '/@/assets/svgs/coins/etc.svg'
import { VueComponent as Eth } from '/@/assets/svgs/coins/eth.svg'
import { VueComponent as Iost } from '/@/assets/svgs/coins/iost.svg'
import { VueComponent as Lsk } from '/@/assets/svgs/coins/lsk.svg'
import { VueComponent as Qtum } from '/@/assets/svgs/coins/qtum.svg'
import { VueComponent as Xem } from '/@/assets/svgs/coins/xem.svg'
import { VueComponent as Xlm } from '/@/assets/svgs/coins/xlm.svg'
import { VueComponent as Xrp } from '/@/assets/svgs/coins/xrp.svg'
import { VueComponent as Mona } from '/@/assets/svgs/coins/mona.svg'
import { VueComponent as Bat } from '/@/assets/svgs/coins/bat.svg'
import { VueComponent as Bch } from '/@/assets/svgs/coins/bch.svg'
import { VueComponent as Fct } from '/@/assets/svgs/coins/fct.svg'
import { VueComponent as Ltc } from '/@/assets/svgs/coins/ltc.svg'
import { VueComponent as Jpy } from '/@/assets/svgs/coins/jpy.svg'
import { CoincheckSymbol } from '/@/components/base/coin'

export const getComponent = (symbol: CoincheckSymbol) => {
  switch (symbol) {
    case 'BTC': {
      return Btc
    }

    case 'ETC': {
      return Etc
    }

    case 'ETH': {
      return Eth
    }

    case 'IOST': {
      return Iost
    }

    case 'LSK': {
      return Lsk
    }

    case 'QTUM': {
      return Qtum
    }

    case 'XEM': {
      return Xem
    }

    case 'XLM': {
      return Xlm
    }

    case 'XRP': {
      return Xrp
    }

    case 'MONA': {
      return Mona
    }

    case 'BAT': {
      return Bat
    }

    case 'BCH': {
      return Bch
    }

    case 'FCT': {
      return Fct
    }

    case 'LTC': {
      return Ltc
    }

    case 'JPY': {
      return Jpy
    }
  }
}
