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
