const {deterministicPartitionKey} = require('./dpk')

console.log(deterministicPartitionKey())
// console.log(deterministicPartitionKey(123))
// console.log(deterministicPartitionKey('abc'))
// console.log(deterministicPartitionKey({}))
// console.log(deterministicPartitionKey({ partitionKey: 'xyz' }))
// console.log(deterministicPartitionKey({ partitionKey: 'xxxx2f1a4f8f7cb9104030c74b371f5f5ecf76723c253738167f7f7578c67c8b0a4051c3e6e1102aecc81ee75d4b9ddd848badfd1e286418b5499444487963d37b60' }))
