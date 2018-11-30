var sqlite3 = require('sqlite3').verbose()
const path = require('path')
var dbPath = path.join(__dirname, 'electron-stock.db')

export default {
  sqlite3: sqlite3,
  run: function (sql) {
    var db = new this.sqlite3.Database(dbPath)
    db.serialize(function () {
      db.run(sql)
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
