var sqlite3 = require('sqlite3').verbose()
const path = require('path')
let dbPath = path.resolve(__dirname, '../../../electron-stock.db')
// let dbPath = 'db.db'
console.log(dbPath)
export default {
  sqlite3: sqlite3,
  run: function (sql, callback) {
    var db = new this.sqlite3.Database(dbPath)
    db.serialize(function () {
      db.run(sql, callback)
    })
    db.close()
  },
  all: function (sql, callback) {
    var db = new this.sqlite3.Database(dbPath)
    db.all(sql, callback)
    db.close()
  },
  get: function (sql, callback) {
    var db = new this.sqlite3.Database(dbPath)
    db.get(sql, callback)
    db.close()
  }
}
