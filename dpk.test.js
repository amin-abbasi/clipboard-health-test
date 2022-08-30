const { deterministicPartitionKey } = require('./dpk')

describe('deterministicPartitionKey', () => {
  it('Returns the literal 0 when given no input', () => {
    const trivialKey = deterministicPartitionKey()
    expect(trivialKey).toBe('0')
  })

  it('Returns new key when given non-object input', () => {
    const trivialKey = deterministicPartitionKey('abc')
    expect(trivialKey).toBeTruthy()
  })

  it('Returns new key when given empty object input (with no "partitionKey" property)', () => {
    const trivialKey = deterministicPartitionKey({})
    expect(trivialKey).toBeTruthy()
  })

  it('Returns the value of "partitionKey" when given an object input with that property', () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 'abc' })
    expect(trivialKey).toBe('abc')
  })
})
