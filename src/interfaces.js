const mostInterface = (stream, observer) => {
  stream
    .observe(x => observer.onNext(x))
    .then(x => observer.onCompleted(x))
    .catch(x => observer.onError(x))
}

const rxInterface = (stream, observer) => {
  stream.subscribe(
    x => observer.onNext(x),
    x => observer.onError(x),
    x => observer.onCompleted(x)
  )
}

const baconInterface = (stream, observer) => {
  stream.onValue(x => observer.onNext(x))
  stream.onError(x => observer.onError(x))
  stream.onEnd(x => observer.onCompleted(x))
}

const kefirInterface = (stream, observer) => {
  stream.onValue(x => observer.onNext(x))
  stream.onError(x => observer.onError(x))
  stream.onEnd(x => observer.onCompleted(x))
}

const xstreamInterface = (stream, observer) => {
  stream.addListener({
    next: x => observer.onNext(x),
    error: x => observer.onError(x),
    complete: x => observer.onCompleted(x),
  })
}

const interfaces = {
  most: mostInterface,
  rx: rxInterface,
  bacon: baconInterface,
  kefir: kefirInterface,
  xstream: xstreamInterface,
}

export default interfaces
