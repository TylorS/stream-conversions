import babel from 'rollup-plugin-babel'
import npm from 'rollup-plugin-npm'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'src/index.js',
  dest: 'lib/stream-conversions.js',
  plugins: [babel(), npm, commonjs({include: 'node_modules/**'})],
  format: 'cjs',
  moduleName: 'streamConversions',
  sourceMap: true,
}
