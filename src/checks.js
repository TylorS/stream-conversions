function isMost(stream) {
  if (typeof stream.observe !== 'function') {
    throw new Error('Stream provided is not a most.js stream')
  }
}

function isRx(stream) {
  if (typeof stream.subscribe !== 'function') {
    throw new Error('Stream provided is not a rx stream')
  }
}

export {isMost, isRx}
