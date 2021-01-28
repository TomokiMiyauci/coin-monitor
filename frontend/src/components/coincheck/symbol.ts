import Bat from '/@/assets/svgs/coins/bat.svg'
import Bch from '/@/assets/svgs/coins/bch.svg'
import Btc from '/@/assets/svgs/coins/btc.svg'
import Etc from '/@/assets/svgs/coins/etc.svg'
import Eth from '/@/assets/svgs/coins/eth.svg'
import Fct from '/@/assets/svgs/coins/fct.svg'
import Iost from '/@/assets/svgs/coins/iost.svg'
import Jpy from '/@/assets/svgs/coins/jpy.svg'
import Lsk from '/@/assets/svgs/coins/lsk.svg'
import Ltc from '/@/assets/svgs/coins/ltc.svg'
import Mona from '/@/assets/svgs/coins/mona.svg'
import Qtum from '/@/assets/svgs/coins/qtum.svg'
import Xem from '/@/assets/svgs/coins/xem.svg'
import Xlm from '/@/assets/svgs/coins/xlm.svg'
import Xrp from '/@/assets/svgs/coins/xrp.svg'
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
