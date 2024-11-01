import { existsSync, writeFileSync } from 'fs'
import { mkdir } from 'fs/promises'
import path from 'path'

const args = process.argv.slice(2)
const branch = args[0] || 'main'
const repoUrl = `https://raw.githubusercontent.com/Web3Auth/web3auth-locales/${branch}/Demo-locale`
const localeGroups = ['locales-common']
const promises = []
const locales = {}

localeGroups.forEach((group) => {
  const urlFetch = `${repoUrl}/${group}.json`
  promises.push(fetch(urlFetch).then((res) => res.json()))
})

function processRecords(items) {
  Object.keys(items).forEach((groupKey) => {
    Object.keys(items[groupKey]).forEach((wordKey) => {
      Object.keys(items[groupKey][wordKey]).forEach((localeKey) => {
        if (!locales[localeKey]) locales[localeKey] = {}
        if (!locales[localeKey][groupKey]) locales[localeKey][groupKey] = {}
        locales[localeKey][groupKey][wordKey] = items[groupKey][wordKey][localeKey]
      })
    })
  })
}

const results = await Promise.all(promises)

results.forEach((set) => {
  processRecords(set)
})

// Create json files
const folder = './src/plugins/i18n/'
const folderPath = path.resolve(folder)
if (!existsSync(folderPath)) {
  await mkdir(folderPath)
}

const keys = Object.keys(locales)
for (let localeIndex = 0; localeIndex < keys.length; localeIndex += 1) {
  const localeKey = keys[localeIndex]
  if (Object.prototype.hasOwnProperty.call(locales, localeKey)) {
    const filePath = path.resolve(`${folder}${localeKey}.json`)
    writeFileSync(filePath, JSON.stringify(locales[localeKey], null, 2), { flag: 'w' })
  }
}
