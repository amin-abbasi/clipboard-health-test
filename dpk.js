const crypto = require('crypto')

const TRIVIAL_PARTITION_KEY = '0'
const MAX_PARTITION_KEY_LENGTH = 256

function createHash(data) {
  if(typeof data !== 'string') data = JSON.stringify(data)
  return crypto.createHash('sha3-512').update(data).digest('hex')
}

function partitionKey(event) {
  return event.partitionKey || createHash(event)
}

function deterministicPartitionKey(event) {
  const candidate = event ? partitionKey(event) : TRIVIAL_PARTITION_KEY
  if(candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate)
  }
  return candidate
}

module.exports = { deterministicPartitionKey }
