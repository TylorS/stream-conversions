import interfaces from './interfaces'
import is from './is'
import to from './to'

const libraries = [
  'most',
  'rx',
  'bacon',
  'kefir',
  'xstream',
]

const makeTo = fromLib =>
  libraries.reduce(
    (acc, toLib) => {
      acc[toLib] = stream => {
        is[fromLib](stream)
        return to[toLib](stream, interfaces[fromLib])
      }
      return acc
    }, {})

const convert = libraries.reduce((acc, lib) => {
  acc[lib] = {to: makeTo(lib)}
  return acc
}, {})

export default convert
