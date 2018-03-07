var chai = require('chai')
var assert = chai.assert
var expect = chai.expect
var {setUp, yeartodate} = require('./dateProto.js')

setUp()
const date = new Date()

describe('date.prototype.isLeapYear', function() {
  it('should return true if year is leap year', function() {
    let actual = new Date('December 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.isLeapYear()
    let expected = true
    assert.equal(actual, expected)
  });
  it('should return false if year is not a leap year', function() {
    let actual = new Date('December 31, 1975, 23:15:30 GMT+11:00')
    actual = actual.isLeapYear()
    let expected = false
    assert.equal(actual, expected)
  });
});

describe('date.prototype.getDOY', function() {
  it('should return the day of the year for a given date', function(){
    let actual = new Date('December 31, 2017, 23:15:30 GMT+11:00')
    actual = actual.getDOY()
    let expected = 365
    assert.equal(actual, expected)
    actual = new Date('November 31, 2017, 23:15:30 GMT+11:00')
    actual = actual.getDOY()
    expected = 335
    assert.equal(actual, expected)
    actual = new Date('January 1, 2017, 23:15:30 GMT+11:00')
    actual = actual.getDOY()
    expected = 1
    assert.equal(actual, expected)
  })
  it('should work for leap years', function(){
    let actual = new Date('December 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getDOY()
    let expected = 366
    assert.equal(actual, expected)
  })
})

describe('date.prototype.getFOM', function(){
  it('should return the first of the month for a given date',function(){
    let actual = new Date('December 31, 2019, 23:15:30 GMT+11:00')
    actual = actual.getFOM()
    let expected = 335
    assert.equal(actual, expected)
  })
  it('should work for leap years', function(){
    let actual = new Date('December 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getFOM()
    let expected = 336
    assert.equal(actual, expected)
    actual = new Date('January 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getFOM()
    expected = 1
    assert.equal(actual, expected)
  })
})

describe('date.prototype.getLOM', function(){
  it('should return the last of the month for a given date', function(){
    let actual = new Date('December 31, 2019, 23:15:30 GMT+11:00')
    actual = actual.getLOM()
    let expected = 365
    assert.equal(actual, expected)
  })
  it('should work for leap years', function(){
    let actual = new Date('December 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getLOM()
    let expected = 366
    assert.equal(actual, expected)
    actual = new Date('January 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getLOM()
    expected = 31
    assert.equal(actual, expected)
  })
})

describe('date.prototype.getFOW', function(){
  it('should return the first date of the week', function(){
    let actual = new Date('December 31, 2018, 23:15:30 GMT+11:00')
    actual = actual.getFOW()
    let expected = 364
    assert.equal(actual, expected)
  })
  it('should work for leap years', function(){
    let actual = new Date('December 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getFOW()
    let expected = 362
    assert.equal(actual, expected)
    actual = new Date('January 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getFOW()
    expected = 26
    assert.equal(actual, expected)
    actual = new Date('January 1, 2020, 23:15:30 GMT+11:00')
    actual = actual.getFOW()
    expected = -363
    assert.equal(actual, expected)
  })
})

describe('date.prototype.getLOW', function(){
  it('should return the last date of the week', function(){
    let actual = new Date('December 31, 2019, 23:15:30 GMT+11:00')
    actual = actual.getLOW()
    let expected = 369
    assert.equal(actual, expected)
  })
  it('should work for leap years', function(){
    let actual = new Date('December 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getLOW()
    let expected = 368
    assert.equal(actual, expected)
    actual = new Date('January 31, 2020, 23:15:30 GMT+11:00')
    actual = actual.getLOW()
    expected = 32
    assert.equal(actual, expected)
  })
})

describe('year to date()', function(){
  it('should return a date object for the given year index', function(){
    let actual = yeartodate(60, 2018)
    let expected = new Date('March 1, 2018, 23:15:30 GMT+11:00')
    assert.equal(actual.toString(), expected.toString())
    actual = yeartodate(2,2018)
    expected = new Date('January 2, 2018, 23:15:30 GMT+11:00')
    assert.equal(actual.toString(), expected.toString())
  })
  it('should work for leap years', function(){
    let actual = yeartodate(366, 2020)
    let expected = new Date('December 31, 2020, 23:15:30 GMT+11:00')
    assert.equal(actual.toString(), expected.toString())
  })
})
