import type { LANGUAGE_TYPE } from '@web3auth/auth-adapter'

export type CustomConfig = {
  dappName: string
  addBrandLogo: boolean
  logoUrl: string
  useLogoAsLoader: boolean
  selectedLanguage: LANGUAGE_TYPE
  isDark: boolean
  primaryColor: string
  primaryTextColor: string
}
