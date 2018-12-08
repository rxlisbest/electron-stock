import Model from './model'
import Db from './db'

let cloneModel = Object.create(Model)
cloneModel.tableName = 'goods'

let cloneDb = Object.create(Db)
// 删除入库
cloneModel.delGoodsLog = async (id, callback) => {
  let db = new cloneDb.sqlite3.Database(cloneDb.dbPath)
  db.run('BEGIN TRANSACTION;')

  let result = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM `goods_log` WHERE id = ?;', id, (err, row) => {
      if (err === null) {
        resolve([err, row])
      } else {
        resolve([err])
      }
    })
  })
  if (result[0] !== null) {
    console.error(result[0])
    db.run('ROLLBACK TRANSACTION;')
    db.close()
    return false
  }
  let goodsLog = result[1]

  result = await new Promise((resolve, reject) => {
    db.run('DELETE FROM `goods_log` WHERE id = ?;', id, (err) => {
      resolve(err)
    })
  })
  if (result !== null) {
    console.error(result)
    db.run('ROLLBACK TRANSACTION;')
    db.close()
    return false
  }

  result = await new Promise((resolve, reject) => {
    let sql = 'UPDATE `goods` SET `amount` = `amount` - ' + goodsLog.amount + ' WHERE id = ' + goodsLog.goods_id + ';'
    db.run(sql, (err) => {
      resolve(err)
    })
  })
  if (result !== null) {
    console.error(result)
    db.run('ROLLBACK TRANSACTION;')
    db.close()
    return false
  }
  db.run('COMMIT TRANSACTION;')
  callback()
}

// 入库
cloneModel.addGoodsLog = async (goods, callback) => {
  let db = new cloneDb.sqlite3.Database(cloneDb.dbPath)
  db.run('BEGIN TRANSACTION;')
  let result = await new Promise((resolve, reject) => {
    db.run('INSERT INTO `goods_log` (goods_id, price, amount, create_time) VALUES (?, ?, ?, ?);', goods.id, goods.price, goods.amount, new Date().getTime(), (err) => {
      resolve(err)
    })
  })
  if (result !== null) {
    console.error(result)
    db.run('ROLLBACK TRANSACTION;')
    db.close()
    return false
  }
  result = await new Promise((resolve, reject) => {
    // console.log(parseFloat(v.order_amount))
    let sql = 'UPDATE `goods` SET `amount` = `amount` + ' + goods.amount + ', `price` = ' + goods.price + ' WHERE id = ' + goods.id + ';'
    db.run(sql, (err) => {
      resolve(err)
    })
  })
  if (result !== null) {
    console.error(result)
    db.run('ROLLBACK TRANSACTION;')
    db.close()
    return false
  }
  db.run('COMMIT TRANSACTION;')
  callback()
}

export default cloneModel
