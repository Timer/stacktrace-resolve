require('babel-polyfill')
require('whatwg-fetch')

const isPhantom = window.navigator.userAgent.match(/PhantomJS/)
const errorLine = 'const error = new Error(\'Hi\')'
const line = (function() {
  if (isPhantom) {
    return 'if (isPhantom) try { throw error } catch (e) { }'
  }
  return errorLine
})()

const StackTraceResolve = require('../lib').default
const assert = require('assert')

describe('resolves stack traces', function() {
  it('resolves the source line number', function(done) {
    const error = new Error('Hi')
    if (isPhantom) try { throw error } catch (e) { }
    const frames = StackTraceResolve(error)
    frames.then(function(result) {
      assert(result[0].sourceLineNumber === isPhantom ? 19 : 18)
      assert(result[0].sourceLines.filter(function(l) { return !l.context })[0].text.trim() === line)
      done()
    }).catch(function(e) {
      done.fail(e)
    })
  })

  it('respects context size', function(done) {
    const error = new Error('Hi')
    if (isPhantom) try { throw error } catch (e) { }
    const frames = StackTraceResolve(error, 1)
    frames.then(function(result) {
      assert(result[0].sourceLineNumber === isPhantom ? 32 : 31)
      assert(result[0].sourceLines.length === 3)
      assert(result[0].scriptLines.length === 3)
      done()
    }).catch(function(e) {
      done.fail(e)
    })
  })

  it('only returns one non-context line', function(done) {
    const error = new Error('Hi')
    if (isPhantom) try { throw error } catch (e) { }
    const frames = StackTraceResolve(error, 1)
    frames.then(function(result) {
      assert(result[0].sourceLineNumber === isPhantom ? 46 : 45)
      assert(result[0].sourceLines.filter(function(l) { return !l.context }).length === 1)
      assert(result[0].scriptLines.filter(function(l) { return !l.context }).length === 1)
      done()
    }).catch(function(e) {
      done.fail(e)
    })
  })
})
