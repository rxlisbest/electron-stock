import Db from './db'
export default {
  _where: '',
  _order: '',
  _limit: 10,
  _offset: 0,
  tableName: '',
  add: function (data, callback) {
    let sql = 'INSERT INTO `' + this.tableName + '` (' + Object.keys(data).join(', ') + ') VALUES (\'' + Object.values(data).join('\', \'') + '\')'
    this._unset()
    Db.run(sql, callback)
  },
  edit: function (where, data, callback) {
    this._where = this.where(where)
    let dataArr = []
    for (let k of Object.keys(data)) {
      dataArr.push(k + ' = \'' + data[k] + '\'')
    }
    let sql = 'UPDATE `' + this.tableName + '` SET ' + dataArr.join(', ') + ' ' + this._where
    this._unset()
    Db.run(sql, callback)
  },
  del: function (where, callback) {
    this._where = this.where(where)
    let sql = 'DELETE FROM `' + this.tableName + '`' + this._where
    this._unset()
    Db.run(sql, callback)
  },
  all: function (o, callback) {
    if (o.where !== undefined) {
      this._where = this.where(o.where)
    }
    if (o.order !== undefined) {
      this._order = this.order(o.order)
    }
    let sql = 'SELECT * FROM `' + this.tableName + '`' + this._where + this._order
    this._unset()
    Db.all(sql, callback)
  },
  pagination: async function (o, callback) {
    if (o.where !== undefined) {
      this._where = this.where(o.where)
    }
    if (o.order !== undefined) {
      this._order = this.order(o.order)
    }
    if (o.pageSize !== undefined && o.page !== undefined) {
      this._limit = o.pageSize
      this._offset = (o.page - 1) * o.pageSize
    } else {
      if (o.pageSize === undefined) {
        o.pageSize = this._limit
      }
      if (o.page === undefined) {
        o.page = 1
      }
    }
    let sql = 'SELECT * FROM `' + this.tableName + '`' + this._where + this._order + this.limit()
    let list = await new Promise((resolve, reject) => {
      Db.all(sql, function (err, rows) {
        if (err === null) {
          resolve(rows)
        } else {
          reject(err)
        }
      })
    })
    sql = 'SELECT COUNT(0) AS count FROM `' + this.tableName + '`' + this._where + this._order
    let row = await new Promise((resolve, reject) => {
      Db.get(sql, function (err, row) {
        if (err === null) {
          resolve(row)
        } else {
          reject(err)
        }
      })
    })
    let count = row.count

    let data = {}
    data.count = count
    data.page = o.page
    data.pageSize = o.pageSize
    data.pages = Math.ceil(count / o.pageSize)
    data.list = list
    callback(data)
    this._unset()
  },
  get: function (o, callback) {
    if (o.where !== undefined) {
      this._where = this.where(o.where)
    }
    if (o.order !== undefined) {
      this._order = this.order(o.order)
    }
    let sql = 'SELECT * FROM `' + this.tableName + '`' + this._where + this._order
    this._unset()
    Db.get(sql, callback)
  },
  where: function (where) {
    let whereArr = []
    for (var k of Object.keys(where)) {
      if (typeof where[k] === 'object') {
      }
      if (typeof where[k] === 'string') {
        whereArr.push(k + ' = \'' + where[k] + '\'')
      }
      switch (typeof where[k]) {
        case 'object':
          whereArr.push(k + ' ' + where[k][0] + ' \'' + where[k][1] + '\'')
          break
        case 'number':
          whereArr.push(k + ' = \'' + where[k] + '\'')
          break
        case 'string':
          whereArr.push(k + ' = \'' + where[k] + '\'')
          break
        default:
          whereArr.push(k + ' = \'' + where[k] + '\'')
          break
      }
    }
    return ' WHERE ' + whereArr.join(' AND ')
  },
  order: function (order) {
    if (order.length === '') {
      return ''
    }
    return ' ORDER BY ' + order
  },
  limit: function () {
    return ' LIMIT ' + this._offset + ', ' + this._limit
  },
  _unset: function () {
    this._where = ''
    this._order = ''
    this._limit = 10
    this._offset = 0
  }
}
