import { LANGUAGE_MAP, type LANGUAGE_TYPE, LANGUAGES } from '@web3auth/auth-adapter'
import { createI18n, PathValue } from 'petite-vue-i18n'

import en from './i18n/english.json'

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: { en }, // set locale messages
  legacy: false,
  messageResolver: (obj: unknown, path: string): PathValue | null => {
    const keys = path.split('.')
    const value = keys.reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return (acc as Record<string, unknown>)[key]
      }
      return null
    }, obj)
    return value as PathValue
  },
  fallbacker: (_: string, fallbackLocale: string): string => {
    return fallbackLocale
  }
})

const loadedLanguages: Set<LANGUAGE_TYPE> = new Set<LANGUAGE_TYPE>([LANGUAGES.en]) // our default language that is preloaded

function setI18nLanguage(lang: LANGUAGE_TYPE) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  i18n.global.locale.value = lang
  // This is okay to ts-ignore because we use dynamic loading of languages
  return lang
}

export async function loadLanguageAsync(lang: LANGUAGE_TYPE): Promise<string> {
  console.log(lang, 'CALLED LANG')
  if (i18n.global.locale.value === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }
  // If the language was already loaded
  if (loadedLanguages.has(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(`./i18n/${LANGUAGE_MAP[lang]}.json`).then((messages) => {
    i18n.global.setLocaleMessage(lang, messages.default)
    loadedLanguages.add(lang)
    return setI18nLanguage(lang)
  })
}

export default i18n
