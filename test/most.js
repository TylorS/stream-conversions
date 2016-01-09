const assert = require('assert')
const most = require('most')
const Rx = require('rx')
const convert = require('../lib')

const makeAssertions = done => n => {
  assert.strictEqual(n, 100)
  done()
}

describe('Most', () => {
  let mostStream, rxStream

  beforeEach(() => {
    mostStream = most.just(100)
    rxStream = Rx.Observable.just(100)
  })

  it('should throw if not given a most stream', done => {
    assert.throws(() => {
      convert.most.toMost(rxStream)
    }, /Stream provided is not a most.js stream/)
    assert.throws(() => {
      convert.most.toRx(rxStream)
    }, /Stream provided is not a most.js stream/)
    done()
  })

  it('should convert to most', done => {
    convert.most.toMost(mostStream).observe(makeAssertions(done))
  })

  it('should convert to rx', done => {
    convert.most.toRx(mostStream).subscribe(makeAssertions(done))
  })
})
