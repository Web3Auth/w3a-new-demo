import {
  CHAIN_NAMESPACES,
  ChainNamespaceType,
  CustomChainConfig,
  WEB3AUTH_NETWORK,
  WEB3AUTH_NETWORK_TYPE
} from '@web3auth/base'

export const ROUTES = {
  LOGIN: 'Login',
  HOME: 'Home',
  NFT_CHECKOUT: 'NFTCheckout'
}

export const LOGIN_METHODS = {
  google: {
    name: 'google',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-dark.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  facebook: {
    name: 'facebook',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  reddit: {
    name: 'reddit',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  discord: {
    name: 'discord',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  twitch: {
    name: 'twitch',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  apple: {
    name: 'apple',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  line: {
    name: 'line',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  github: {
    name: 'github',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  kakao: {
    name: 'kakao',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  linkedin: {
    name: 'linkedin',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  twitter: {
    name: 'twitter',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  weibo: {
    name: 'weibo',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  wechat: {
    name: 'wechat',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  },
  farcaster: {
    name: 'farcaster',
    description: '',
    logoHover: '',
    logoLight: 'https://images.web3auth.io/login-google-light.svg',
    logoDark: 'https://images.web3auth.io/login-google-dark.svg',
    mainOption: false,
    showOnModal: true,
    showOnDesktop: true,
    showOnMobile: true
  }
  // email_passwordless: {
  //   name: 'email passwordless',
  //   description: '',
  //   logoHover: '',
  //   logoLight: '',
  //   logoDark: '',
  //   mainOption: false,
  //   showOnModal: true,
  //   showOnDesktop: true,
  //   showOnMobile: true
  // },
  // sms_passwordless: {
  //   name: 'sms passwordless',
  //   description: '',
  //   logoHover: '',
  //   logoLight: '',
  //   logoDark: '',
  //   mainOption: false,
  //   showOnModal: true,
  //   showOnDesktop: true,
  //   showOnMobile: true
  // }
}

export const clientIds: Record<WEB3AUTH_NETWORK_TYPE, string> = {
  [WEB3AUTH_NETWORK.MAINNET]:
    'BJRZ6qdDTbj6Vd5YXvV994TYCqY42-PxldCetmvGTUdoq6pkCqdpuC1DIehz76zuYdaq1RJkXGHuDraHRhCQHvA',
  [WEB3AUTH_NETWORK.TESTNET]:
    'BHr_dKcxC0ecKn_2dZQmQeNdjPgWykMkcodEHkVvPMo71qzOV6SgtoN8KCvFdLN7bf34JOm89vWQMLFmSfIo84A',
  [WEB3AUTH_NETWORK.AQUA]:
    'BM34K7ZqV3QwbDt0lvJFCdr4DxS9gyn7XZ2wZUaaf0Ddr71nLjPCNNYtXuGWxxc4i7ivYdgQzFqKlIot4IWrWCE',
  [WEB3AUTH_NETWORK.CYAN]:
    'BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk',
  [WEB3AUTH_NETWORK.SAPPHIRE_DEVNET]:
    'BHgArYmWwSeq21czpcarYh0EVq2WWOzflX-NTK-tY1-1pauPzHKRRLgpABkmYiIV_og9jAvoIxQ8L3Smrwe04Lw',
  [WEB3AUTH_NETWORK.SAPPHIRE_MAINNET]:
    'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ',
  [WEB3AUTH_NETWORK.CELESTE]: 'openlogin'
}

export const chainConfigs: Record<ChainNamespaceType, CustomChainConfig[]> = {
  [CHAIN_NAMESPACES.EIP155]: [
    {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      rpcTarget: 'https://rpc.ankr.com/eth',
      blockExplorerUrl: 'https://etherscan.io',
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      chainId: '0x1',
      ticker: 'ETH',
      tickerName: 'Ethereum'
    },
    {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      rpcTarget: 'https://rpc.ankr.com/eth_sepolia',
      blockExplorerUrl: 'https://sepolia.etherscan.io',
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      chainId: '0xaa36a7',
      ticker: 'ETH',
      tickerName: 'Sepolia Testnet'
    },
    {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      rpcTarget: 'https://data-seed-prebsc-2-s3.binance.org:8545',
      blockExplorerUrl: 'https://testnet.bscscan.com',
      logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
      chainId: '0x61',
      displayName: 'Binance SmartChain Testnet',
      ticker: 'BNB',
      tickerName: 'BNB'
    },
    {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x13882',
      rpcTarget: 'https://rpc.ankr.com/polygon_amoy',
      displayName: 'Polygon Amoy Testnet',
      blockExplorerUrl: 'https://amoy.polygonscan.com/',
      ticker: 'POL',
      tickerName: 'Polygon Ecosystem Token'
    }
  ],
  [CHAIN_NAMESPACES.SOLANA]: [
    // Ref: https://namespaces.chainagnostic.org/solana/caip10
    {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      rpcTarget: 'https://api.devnet.solana.com',
      blockExplorerUrl: 'https://solscan.io',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      chainId: '0x3',
      ticker: 'SOL',
      tickerName: 'Solana Devnet'
    },
    {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      rpcTarget: import.meta.env.VITE_SOLANA_MAINNET_RPC,
      blockExplorerUrl: 'https://explorer.solana.com',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      chainId: '0x1',
      ticker: 'SOL',
      tickerName: 'Solana Mainnet'
    }
  ],
  [CHAIN_NAMESPACES.CASPER]: [],
  [CHAIN_NAMESPACES.XRPL]: [],
  [CHAIN_NAMESPACES.OTHER]: []
}
