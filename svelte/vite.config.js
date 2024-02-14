import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const moduleExports = `
    export const init = window.__svelte_scrllgngn_module.init
    export const update = window.__svelte_scrllgngn_module.update
  `

  const inputFile = process.env.SNIPPET === 'true' ? 'snippet' : 'main';

  const filename =
    process.env.SNIPPET === 'true'
      ? 'snippet'
      : process.env.VITE_MODULE ?? 'build';

  return {
    // [WIP] export multiple modules?
    plugins: [svelte()],
    resolve: {
      alias: [
        {
          find: '~',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
    build: {
      // pour export le css séparément
      cssCodeSplit: false,
      rollupOptions: {
        input: `./src/${inputFile}.js`,
        output: {
          format: 'iife',
          dir: './public/build',
          entryFileNames: `${filename}.js`,
          assetFileNames: `${filename}.[ext]`,
          footer: command === 'build' && moduleExports,
        },
      },
    },
  }
})
