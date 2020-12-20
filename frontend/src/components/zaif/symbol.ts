import { VueComponent as Btc } from '/@/assets/svgs/coins/btc.svg'
import { VueComponent as Eth } from '/@/assets/svgs/coins/eth.svg'
import { VueComponent as Xem } from '/@/assets/svgs/coins/xem.svg'
import { VueComponent as Mona } from '/@/assets/svgs/coins/mona.svg'
import { VueComponent as Bch } from '/@/assets/svgs/coins/bch.svg'
import { VueComponent as Jpy } from '/@/assets/svgs/coins/jpy.svg'
import { VueComponent as Zaif } from '/@/assets/svgs/markets/zaif.svg'
import { VueComponent as Xcp } from '/@/assets/svgs/coins/xcp.svg'
import { VueComponent as Fscc } from '/@/assets/svgs/coins/fisco.svg'
import { VueComponent as Credits } from '/@/assets/svgs/coins/credits.svg'
import { VueComponent as Token } from '/@/assets/svgs/coins/token.svg'
import { ZaifSymbol } from '/@/components/base/coin'

export const getComponent = (symbol: ZaifSymbol) => {
  switch (symbol) {
    case 'BTC': {
      return Btc
    }

    case 'ETH': {
      return Eth
    }

    case 'XEM': {
      return Xem
    }

    case 'MONA': {
      return Mona
    }

    case 'BCH': {
      return Bch
    }

    case 'ZAIF': {
      return Zaif
    }

    case 'XCP': {
      return Xcp
    }

    case 'FSCC': {
      return Fscc
    }

    case 'CSBTC':
    case 'CSETH':
    case 'CSXEM':
    case 'CSZAIF': {
      return Credits
    }

    case 'CICC':
    case 'ERC20.CMS':
    case 'MOSAIC.CMS':
    case 'NCXC':
    case 'JPYZ': {
      return Token
    }

    case 'JPY': {
      return Jpy
    }
  }
}
