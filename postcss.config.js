import autoprefixer from 'autoprefixer'
import precss from 'precss'
import postcssNesting from 'postcss-nesting'

export default {
  plugins: [precss(), autoprefixer(), postcssNesting()],
}
