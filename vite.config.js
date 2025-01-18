import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import viteString from 'vite-plugin-string'
import autoprefixer from 'autoprefixer'
import precss from 'precss'
import postcssNesting from 'postcss-nesting'

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
      plugins: [precss(), autoprefixer(), postcssNesting()],
    },
  },
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
})
