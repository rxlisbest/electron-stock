import Db from './db'
export default {
  tableName: '',
  add: function (data) {
    let sql = 'INSERT INTO ' + this.tableName + ' (' + Object.keys(data).join(', ') + ') VALUES (\'' + Object.values(data).join('\', \'') + '\')'
    Db.run(sql)
  },
  edit: function (where, data, callback) {
    let whereArr = []
    for (let k of Object.keys(where)) {
      whereArr.push(k + ' = \'' + where[k] + '\'')
    }
    let dataArr = []
    for (let k of Object.keys(data)) {
      dataArr.push(k + ' = \'' + data[k] + '\'')
    }
    let sql = 'UPDATE ' + this.tableName + ' SET ' + dataArr.join(', ') + ' WHERE ' + whereArr.join(' AND ')
    Db.run(sql)
  },
  del: function (where, callback) {
    var whereArr = []
    for (var k of Object.keys(where)) {
      whereArr.push(k + ' = \'' + where[k] + '\'')
    }
    let sql = 'DELETE FROM ' + this.tableName + ' WHERE ' + whereArr.join(' AND ')
    Db.run(sql)
  },
  all: function (callback) {
    let sql = 'SELECT * FROM ' + this.tableName
    Db.all(sql, callback)
  }
}
