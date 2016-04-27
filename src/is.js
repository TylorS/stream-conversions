const message = lib => `Stream provided is not a ${lib} stream`

function isMost(stream) {
  if (typeof stream.observe !== 'function') {
    throw new Error(message('most'))
  }
}

function isRx(stream) {
  if (typeof stream.subscribe !== 'function' || typeof stream.onValue === `function`) {
    throw new Error(message('rx'))
  }
}

function isBacon(stream) {
  if (typeof stream.onValue !== 'function' || typeof stream.onAny === `function`) {
    throw new Error(message('bacon'))
  }
}

function isKefir(stream) {
  if (typeof stream.onAny !== `function`) {
    throw new Error(message('kefir'))
  }
}

function isXstream(stream) {
  if (typeof stream.addListener !== `function`) {
    throw new Error(message('xstream'))
  }
}

const is = {
  most: isMost,
  rx: isRx,
  bacon: isBacon,
  kefir: isKefir,
  xstream: isXstream,
}

export default is
