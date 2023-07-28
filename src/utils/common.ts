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
