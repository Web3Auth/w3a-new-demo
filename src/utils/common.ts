import Bowser from 'bowser'

export const openWindow = (url: string) => {
  window.open(
    url,
    '_blank',
    'directories=0,titlebar=0,toolbar=0,status=0,location=0,menubar=0,height=700,width=1200'
  )
}

export const randomId = () => Math.random().toString(36).slice(2)

export const precisionDisplay = (value: string, precision = 3) => {
  return Number.parseFloat(value).toPrecision(precision).toString()
}

export const getCountryName = async () => {
  const response = await fetch('https://lrc.admin.openlogin.com/api/v2/user/location')
  const { data } = await response.json()
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  return regionNames.of(data.country)
}

export const getDeviceType = () => {
  const browser = Bowser.getParser(window.navigator.userAgent)
  return browser.getPlatformType()
}

export const getBrowserName = () => {
  const { userAgent } = navigator
  try {
    // @ts-ignore works only on brave browser
    if (navigator.brave?.isBrave()) return 'Brave'
  } catch (error) {
    console.error(error)
  }
  const browser = Bowser.getParser(userAgent)
  return browser.getBrowserName()
}

export function getBrowserVersion() {
  const browser = Bowser.getParser(window.navigator.userAgent)
  return browser.getBrowserVersion()
}

export const getOSName = () => {
  const browser = Bowser.getParser(window.navigator.userAgent)
  return browser.getOSName()
}

export const getTruncateString = (val: string) => {
  const address = val || ''
  return `${address.slice(0, 10)}....${address.slice(address.length - 6)}`
}

// const parseTokenAndReturnAddress = (token: string) => {
//   if (!token) return null
//   const base64Url = token.split('.')[1]
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split('')
//       .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//       .join('')
//   )
//   console.log(JSON.parse(jsonPayload).wallets[0].public_key)
//   return publicKeyToAddress(JSON.parse(jsonPayload)?.wallets[0]?.public_key || '')
// }

export function setTheme(isDark: boolean) {
  const htmlElement = document.querySelector('html') as HTMLElement
  if (htmlElement) {
    if (isDark) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }
}
