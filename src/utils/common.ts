import Bowser from 'bowser'

export const randomId = () => Math.random().toString(36).slice(2)

export const precisionDisplay = (value: string, precision = 3) => {
  return Number.parseFloat(value).toPrecision(precision).toString()
}

export const passwordlessBackendUrl = 'https://api-passwordless.web3auth.io'
export const getUserCountry = async (): Promise<{ country: string; dialCode: string } | null> => {
  try {
    const result = await fetch(`${passwordlessBackendUrl}/api/v2/user/location`)
    const { data } = (await result.json()) as { data: { country: string; dial_code: string } }
    if (data && data.country) return { country: data.country, dialCode: data.dial_code }
    return null
  } catch (error) {
    console.error('error getting user country', error)
    return null
  }
}

export const validatePhoneNumber = async (phoneNumber: string): Promise<boolean | string> => {
  try {
    const fetchResult = await fetch(`${passwordlessBackendUrl}/api/v3/phone_number/validate`, {
      method: 'POST',
      body: JSON.stringify({ phone_number: phoneNumber }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = (await fetchResult.json()) as { success: boolean; parsed_number: string }

    if (result && result.success) return result.parsed_number
    return false
  } catch (error: unknown) {
    console.error('error validating phone number', error)
    return false
  }
}

export const getBrowserName = () => {
  const { userAgent } = navigator
  try {
    // @ts-expect-error works only on brave browser
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
