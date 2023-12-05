export const setTheme = (isDarkMode = false) => {
  const htmlElement = document.querySelector('html') as HTMLElement

  if (htmlElement) {
    if (isDarkMode) htmlElement.classList.add('dark')
    else htmlElement.classList.remove('dark')
  }
}

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

export const getUserCountry = async () => {
  const response: any = await fetch('https://lrc.admin.openlogin.com/api/v2/user/location')
  return response.json()
}

export const getCountryName = async () => {
  const response: any = await fetch('https://lrc.admin.openlogin.com/api/v2/user/location')
  const { data } = await response.json()
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  return regionNames.of(data.country)
}

export const getDeviceType = () => {
  const { userAgent } = navigator
  if (/mobile/i.test(userAgent)) return 'Mobile'
  if (/iPad|Android|Touch/i.test(userAgent)) return 'Tablet'
  return 'Desktop'
}

export const getBrowserName = () => {
  const { userAgent } = navigator
  try {
    // @ts-ignore works only on brave browser
    if (navigator.brave?.isBrave()) return 'Brave'
  } catch (error) {
    console.error(error)
  }
  if (/Opera|OPR/i.test(userAgent)) return 'Opera'
  if (/Chrome/i.test(userAgent)) return 'Google Chrome'
  if (/Safari/i.test(userAgent)) return 'Safari'
  if (/Firefox/i.test(userAgent)) return 'Firefox'
  if (/Edge/i.test(userAgent)) return 'Microsoft Edge'
  return 'Special Browser'
}

export function getBrowserVersion() {
  const userAgent: string = navigator?.userAgent || ''
  let version = ''

  if (userAgent.includes('Chrome')) {
    version = userAgent.match(/Chrome\/(\S+)/)?.[1] || ''
  } else if (userAgent.includes('Firefox')) {
    version = userAgent.match(/Firefox\/(\S+)/)?.[1] || ''
  } else if (userAgent.includes('Safari')) {
    version = userAgent.match(/Version\/(\S+)/)?.[1] || ''
  } else if (userAgent.includes('Edge')) {
    version = userAgent.match(/Edge\/(\S+)/)?.[1] || ''
  }

  return version
}

export const getOSName = () => {
  const { appVersion } = navigator
  if (appVersion.indexOf('Win') !== -1) return 'Windows'
  if (appVersion.indexOf('Mac') !== -1) return 'macOS'
  if (appVersion.indexOf('X11') !== -1) return 'UNIX'
  if (appVersion.indexOf('Linux') !== -1) return 'Linux'
  return 'Special OS'
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
