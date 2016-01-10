import {create} from 'most'
import {Observable} from 'rx'
import Bacon from 'baconjs'
import Kefir  from 'kefir'

const toMost = (stream, streamInterface) =>
  create((add, end, error) => {
    const observer = {
      onNext: add,
      onCompleted: end,
      onError: error,
    }
    streamInterface(stream, observer)
  })

const toRx = (stream, streamInterface) => Observable.create(observer => {
  streamInterface(stream, observer)
})

const toBacon = (stream, streamInterface) =>
  Bacon.fromBinder(sink => {
    const observer = {
      onNext: x => sink(new Bacon.Next(x)),
      onCompleted: x => sink(new Bacon.End(x)),
      onError: x => sink(new Bacon.Error(x)),
    }
    streamInterface(stream, observer)
  })

const toKefir = (stream, streamInterface) =>
  Kefir.stream(emitter => {
    const observer = {
      onNext: x => emitter.emit(x),
      onError: x => emitter.error(x),
      onCompleted: x => emitter.end(x),
    }
    streamInterface(stream, observer)
  })

const to = {
  most: toMost,
  rx: toRx,
  bacon: toBacon,
  kefir: toKefir,
}

export default to
