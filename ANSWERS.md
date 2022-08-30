# Answers:

## Ticket Breakdown:

- First, override the Agent table in the database to have a new column as a unique id (UID) [estimate: 1-2 hours],
- Then, write a migration code to generate this UID and add it to the existing rows (agents), and execute it. It should add a new UID in all existing agents data in DB, [estimate: 2-3 hours],
- Then, write another migration code to change Facilities agent ids from internal database agent Id to new UID, and execute it. It should update the existing facilities in DB to have their agent id value change into a new UID.  [estimate: 2-3 hours],
- Then, change and modify the query of function "getShiftsByFacility" to include UID in agents metadata instead of internal database id, [estimate: 1-2 hours],
- Then, change and modify the query of function "generateReport" to use UID for aggregating on agents instead of the internal database id, [estimate: 3-4 hours].




## Refactor Code:

- First, we need to extract and move constant values from inside the function,
- Then, we need to define a new global function to hash data based on the "crypto" module called "createHash",
- Then, we need to define a new function to return partition key based on existing "event" called "partitionKey", 
- Then, we need to modify how to set the value to the "candidate" variable based on the "event",
- Then, after checking the candidate length, we will return the final result of our main function,
- We used the "createHash" function twice on two different occasions to avoid repetition.

```
const crypto = require('crypto')

const TRIVAL_PARTITION_KEY = '0'
const MAX_PARTITION_KEY_LENGTH  = 256

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
```


Test using "Jest":

```
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
```

