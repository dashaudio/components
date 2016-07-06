import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import string from 'rollup-plugin-string'
import builtins from 'rollup-plugin-node-builtins'
import json from 'rollup-plugin-json'
import sass from 'rollup-plugin-sass'
import postcss from 'postcss'
import nano from 'cssnano'
import uglify from 'rollup-plugin-uglify'

const processPostCSS = (css, file) => {
  return postcss([nano()]).process(css).then(result => result.css)
}

export default {
  entry: 'components/components.js',
  format: 'iife',
  moduleName: 'Dash',
  sourceMap: true,
  plugins: [
    string({
      extensions: ['html']
    }),
    sass({
      output: processPostCSS
    }),
    json(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ 'es2015-rollup', 'stage-1' ]
    }),
    builtins(),
    resolve({ main: true }),
    commonjs({
      exclude: 'node_modules/rollup-plugin-node-globals/**'
    }),
    globals(),
    uglify({ wrap: true })
  ]
}
