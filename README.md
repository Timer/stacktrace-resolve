# stacktrace-resolve
[![Build Status](https://travis-ci.org/Timer/stacktrace-resolve.svg?branch=master)](https://travis-ci.org/Timer/stacktrace-resolve)
[![codecov](https://codecov.io/gh/Timer/stacktrace-resolve/branch/master/graph/badge.svg)](https://codecov.io/gh/Timer/stacktrace-resolve)

Turns a stack trace into code.

## API

#### `StackTraceResolve.resolve(error)` => [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)(ResolvedStackFrame[])
Given an an `Error` object, return an array of `ResolvedStackFrame`s.
