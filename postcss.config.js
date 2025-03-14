import autoprefixer from 'autoprefixer'
import postcssNesting from 'postcss-nesting'

export default {
  plugins: [autoprefixer(), postcssNesting()],
}
