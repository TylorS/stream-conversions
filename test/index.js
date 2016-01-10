const assert = require('assert')
const {makeAssertions, beforeEachFn, libraries, makeObserve} = require('./common')
const convert = require('../lib/stream-conversions')

libraries.forEach(testLib => {

  describe(`${testLib}`.toUpperCase(), () => {
    let self = this
    beforeEach(beforeEachFn.bind(self))

    libraries.forEach(toLib => {
      it(`should throw when given wrong type of stream converting to ${toLib}`, done => {
        const testStream = testLib === 'rx' ? self.most : self.rx
        assert.throws(() => {
          convert[testLib].to[toLib](testStream)
        }, new RegExp(`Stream provided is not a ${testLib} stream`))
        done()
      })
    })

    libraries.forEach(toLib => {
      it(`should convert to ${toLib}`, done => {
        const observe = makeObserve(toLib, done)
        const testStream = self[testLib]
        const stream = convert[testLib].to[toLib](testStream)
        observe(stream)
      })
    })

  })
})
