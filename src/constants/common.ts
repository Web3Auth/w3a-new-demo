export const SOCIAL_LOGINS = [
  {
    icon: 'google',
    label: 'google',
    verifier: 'google',
    description: 'Continue with Google'
  },
  {
    icon: 'github',
    label: 'github',
    verifier: 'torus-auth0-github'
  },
  {
    icon: 'twitter',
    label: 'twitter',
    verifier: 'torus-auth0-twitter'
  },
  {
    icon: 'discord',
    label: 'discord',
    verifier: 'discord'
  },
  {
    icon: 'facebook',
    label: 'facebook',
    verifier: 'facebook'
  },
  {
    icon: 'line',
    label: 'line',
    verifier: 'torus-auth0-line'
  },
  {
    icon: 'reddit',
    label: 'reddit',
    verifier: 'reddit'
  },
  {
    icon: 'apple',
    label: 'apple',
    verifier: 'torus-auth0-apple'
  },
  {
    icon: 'twitch',
    label: 'twitch',
    verifier: 'twitch'
  },
  {
    icon: 'linkedin',
    label: 'linkedin',
    verifier: 'torus-auth0-linkedin'
  },
  {
    icon: 'wechat',
    label: 'wechat',
    verifier: 'torus-auth0-wechat'
  },
  {
    icon: 'kakao',
    label: 'kakao',
    verifier: 'torus-auth0-kakao'
  }
]

export const ROUTES = {
  LOGIN: 'Login',
  WELCOME: 'Welcome',
  MPC: 'Mpc',
  WALLET_UI: 'WalletUi',
  ON_RAMP: 'OnRamp',
  WALLET_CONNECT: 'WalletConnect'
}

export const STEP_DETAILS = [
  {
    img: 'mfa-logo',
    heading1: 'Experience MPC',
    heading2: 'Multi Factor Auth',
    subHeading: 'Intuitive progressive self-custody',
    route: ROUTES.MPC
  },
  {
    img: 'waas-logo',
    heading1: 'Provide Delightful,',
    heading2: 'Customizable Wallet UI',
    subHeading: 'UI for your brand and use-case',
    route: ROUTES.WALLET_UI
  },
  {
    img: 'topup-logo',
    heading1: 'Onramp Users with',
    heading2: 'Credit Card',
    subHeading: 'Aggregated local payment providers',
    route: ROUTES.ON_RAMP
  },
  {
    img: 'wc-logo',
    heading1: 'Connect your wallet ',
    heading2: 'to UniSwap',
    subHeading: 'And other apps',
    route: ROUTES.WALLET_CONNECT
  }
]

export const CLIENT_ID =
  'BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk'

export const MAINNET_CHAIN_ID = '0x1'

export const CHAINS = {
  MAINNET: 'mainnet'
}

export const SUPPORTED_NETWORKS = {
  [CHAINS.MAINNET]: {
    blockExplorerUrl: 'https://etherscan.io',
    chainId: MAINNET_CHAIN_ID,
    displayName: 'Main Ethereum Network',
    logo: 'eth.svg',
    rpcTarget: 'https://rpc.ankr.com/eth',
    ticker: 'ETH',
    tickerName: 'Ethereum',
    type: CHAINS.MAINNET
  }
}
