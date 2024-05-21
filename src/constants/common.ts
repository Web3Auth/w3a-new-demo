export const ROUTES = {
  LOGIN: 'Login',
  WELCOME: 'Welcome',
  MPC: 'Mpc',
  WALLET_UI: 'WalletUi',
  ON_RAMP: 'OnRamp',
  WALLET_CONNECT: 'WalletConnect',
  NFT_CHECKOUT: 'NFTCheckout',
  STEPS: 'Steps'
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
    heading2: 'to OpenSea',
    subHeading: 'And other apps',
    route: ROUTES.WALLET_CONNECT
  },
  {
    // TODO: update logo
    img: 'wc-logo',
    heading1: 'NFT Checkout/Airdrop ',
    // heading2: 'to OpenSea',
    // subHeading: 'And other apps',
    route: ROUTES.NFT_CHECKOUT
  }
]
