const StackTraceResolve = require('../lib').default
const assert = require('assert')

if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

describe('resolves stack traces', function() {
  it('resolves the source line number', function(done) {
    const error = new Error('Hi')
    const frames = StackTraceResolve(error)
    frames.then(function(result) {
      assert(result[0].sourceLineNumber === 11)
      assert(result[0].sourceLines.filter(l => !l.context)[0].text.trim() === 'const error = new Error(\'Hi\')')
      done()
    }).catch(function(e) {
      done.fail(e)
    })
  })

  it('respects context size', function(done) {
    const error = new Error('Hi')
    const frames = StackTraceResolve(error, 1)
    frames.then(function(result) {
      assert(result[0].sourceLineNumber === 23)
      assert(result[0].sourceLines.length === 3)
      assert(result[0].scriptLines.length === 3)
      done()
    }).catch(function(e) {
      done.fail(e)
    })
  })

  it('only returns one non-context line', function(done) {
    const error = new Error('Hi')
    const frames = StackTraceResolve(error, 1)
    frames.then(function(result) {
      assert(result[0].sourceLineNumber === 36)
      assert(result[0].sourceLines.filter(l => !l.context).length === 1)
      assert(result[0].scriptLines.filter(l => !l.context).length === 1)
      done()
    }).catch(function(e) {
      done.fail(e)
    })
  })
})
