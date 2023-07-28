export const PAYMENT_PROVIDER = {
  XANPOOL: 'xanpool',
  RAMPNETWORK: 'rampnetwork',
  SIMPLEX: 'simplex',
  MOONPAY: 'moonpay',
  MERCURYO: 'mercuryo',
  TRANSAK: 'transak',
  BANXA: 'banxa',
  POKO: 'poko'
} as const

export type PAYMENT_PROVIDER_TYPE = (typeof PAYMENT_PROVIDER)[keyof typeof PAYMENT_PROVIDER]

export type SelectOption = {
  name: string
  value: string
  description?: string
  icon?: string
  imgSrc?: string
}

export type Quote = {
  id: string
  provider: PAYMENT_PROVIDER_TYPE
  fee?: string
  cryptoAmount?: string
  fiatAmount?: string
  netFiatAmount?: number
  logo?: string
  wordmark?: string
  rates?: string
  orderDetails?: string
  aggregator?: string
  error?: null | { id?: string; args?: string[]; msg?: string }
}
