import babel from 'rollup-plugin-babel'
import npm from 'rollup-plugin-npm'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/index.js',
  dest: 'dist/stream-conversions.js',
  plugins: [babel(), npm, commonjs({include: 'node_modules/**'})],
  format: 'iife',
  globals: {
    most: 'most',
    rx: 'Rx'
  },
  moduleName: 'streamConversions',
  sourceMap: true,
}
