const assert = require('assert')
const most = require('most')
const Rx = require('rx')
const Bacon = require('baconjs')
const Kefir = require('kefir')
const Xstream = require('xstream').default

const makeAssertions = done => n => {
  assert.strictEqual(n, 100)
  done()
}

const subscription = {
  // create a function to observe the values and make sure they
  // are the proper value when converted
  rx: (done, stream) => stream.subscribe(makeAssertions(done)),
  most: (done, stream) => stream.observe(makeAssertions(done)),
  bacon: (done, stream) => stream.onValue(makeAssertions(done)),
  kefir: (done, stream) => stream.onValue(makeAssertions(done)),
  xstream: (done, stream) => stream.addListener({
    next: makeAssertions(done),
    error: err => {},
    complete: () => {},
  }),
}

const makeObserve = (library, done) => stream => {
  subscription[library](done, stream)
}

function beforeEachFn() {
  // create a single stream which holds the value 100
  // for each library - must use 'this.library'
  this.most = most.just(100)
  this.rx = Rx.Observable.just(100)
  this.bacon = Bacon.once(100)
  this.kefir = Kefir.constant(100)
  this.xstream = Xstream.of(100)
}

// to add
const libraries = ['most', 'rx', 'bacon', 'kefir', 'xstream']

module.exports = {makeAssertions, beforeEachFn, libraries, makeObserve}
