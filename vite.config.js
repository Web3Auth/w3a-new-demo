import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_APP_INFURA_PROJECT_KEY } = loadEnv(mode, process.cwd())

  console.log('build', mode, VITE_APP_INFURA_PROJECT_KEY)
  const config = {
    server: {
      port: 4051
    },
    plugins: [vue()],
    define: {
      'process.env.VITE_APP_INFURA_PROJECT_KEY': JSON.stringify(VITE_APP_INFURA_PROJECT_KEY),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }

  console.log(
    'check: config',
    process.env.VITE_APP_INFURA_PROJECT_KEY,
    JSON.stringify(VITE_APP_INFURA_PROJECT_KEY)
  )
  return config
})
