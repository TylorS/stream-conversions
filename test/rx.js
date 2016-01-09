const assert = require('assert')
const most = require('most')
const Rx = require('rx')
const convert = require('../lib')

const makeAssertions = done => n => {
  assert.strictEqual(n, 100)
  done()
}

describe('Rx', () => {
  let mostStream, rxStream

  beforeEach(() => {
    mostStream = most.just(100)
    rxStream = Rx.Observable.just(100)
  })

  it('should throw if not given a most stream', done => {
    assert.throws(() => {
      convert.rx.toMost(mostStream)
    }, /Stream provided is not a rx stream/)
    assert.throws(() => {
      convert.rx.toRx(mostStream)
    }, /Stream provided is not a rx stream/)
    done()
  })

  it('should convert to most', done => {
    assert.doesNotThrow(() => {
      convert.rx.toMost(rxStream)
    })
    convert.rx.toMost(rxStream).observe(makeAssertions(done))
  })

  it('should convert to rx', done => {
    assert.doesNotThrow(() => {
      convert.rx.toRx(rxStream)
    })
    convert.rx.toRx(rxStream).subscribe(makeAssertions(done))
  })
})
