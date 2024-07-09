import Bowser from 'bowser'

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

export const getTruncateString = (val: string) => {
  const address = val || ''
  return `${address.slice(0, 10)}....${address.slice(address.length - 6)}`
}

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
