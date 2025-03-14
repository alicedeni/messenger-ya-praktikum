import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import viteString from 'vite-plugin-string'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import postcssCustomProperties from 'postcss-custom-properties'

export default defineConfig({
  plugins: [
    viteString({
      include: '**/*.hbs',
    }),
    handlebars(),
  ],
  server: {
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [postcssImport(), postcssNested(), postcssCustomProperties(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
})
