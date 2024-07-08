import { LANGUAGE_TYPE } from '@toruslabs/openlogin-utils'

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
