import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import viteString from 'vite-plugin-string'
import autoprefixer from 'autoprefixer'
import precss from 'precss'
import postcssNesting from 'postcss-nesting'
import fs from 'fs'

export default defineConfig({
  plugins: [
    viteString({
      include: '**/*.hbs',
    }),
    handlebars(),
  ],
  server: {
    https: {
      key: fs.readFileSync('../ssl/key.pem'),
      cert: fs.readFileSync('../ssl/cert.pem'),
    },
    host: 'localhost',
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
