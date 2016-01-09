import babel from 'rollup-plugin-babel'
import npm from 'rollup-plugin-npm'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'test/index.js',
  dest: 'test/bundle.js',
  plugins: [babel(), npm, commonjs({include: 'node_modules/**'})],
  format: 'iife',
  moduleName: 'streamConversions',
}
