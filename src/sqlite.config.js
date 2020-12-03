'use strict'
module.exports = {
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: './eva.sqlite'
    },
    pool: {
      min: 0,
      max: 7
    }
  }
}
