import Most from 'most'
import {Observable} from 'rx'
import Bacon from 'baconjs'
import Kefir  from 'kefir'
import Xstream from 'xstream'

const toMost = (stream, streamInterface) =>
  Most.create((add, end, error) => {
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

const toXstream = (stream, streamInterface) =>
    Xstream.create({
        start: function (listener) {
            const observer = {
                onNext: x => listener.next(x),
                onError: x => listener.error(x),
                onCompleted: x => listener.complete(x),
            }
            streamInterface(stream, observer)
        },
        stop: function () {}
    })


const to = {
  most: toMost,
  rx: toRx,
  bacon: toBacon,
  kefir: toKefir,
  xstream: toXstream,
}

export default to
