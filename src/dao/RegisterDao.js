import Knex from 'knex'
import config from '@/sqlite.config'
let registerDao = {} 
// let config = require('../sqlite.config.js')

var knex = Knex(config.sqlite)
registerDao.findRegisterRecord = (bookInfo, callback) => {
  knex
    .select('id', 'name', 'dept', 'remark')
    .from('register_record')
    .then(doc => {
      callback(null, doc)
    })
    .catch(err => {
      callback(err)
    })
}
// registerDao.addRecords = (record, callback) => {
//   knex('register_record')
//     .insert(record)
//     .then(doc => {
//       callback(null, doc)
//     })
//     .catch(err => {
//       callback(err)
//     })
// }
export default registerDao
