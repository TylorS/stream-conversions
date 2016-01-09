import {isRx} from '../checks'
import {create} from 'most'

export default function rxToMost(stream) {
  isRx(stream)
  return create((add, end, error) => {
    stream.subscribe(add, error, end)
  })
}
