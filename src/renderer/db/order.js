import Model from './model'
import Db from './db'

let cloneModel = Object.create(Model)
cloneModel.tableName = 'order'

let cloneDb = Object.create(Db)
// 下单
cloneModel.addOrder = async (order, cart, callback) => {
  let db = new cloneDb.sqlite3.Database(cloneDb.dbPath)
  db.run('BEGIN TRANSACTION;')
  let result = await new Promise((resolve, reject) => {
    db.run('INSERT INTO `order` (total, user_id, create_time) VALUES (?, ?, ?);', order.total, order.user_id, new Date().getTime(), (err) => {
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
    db.get('SELECT last_insert_rowid() as id FROM `order`;', (err, row) => {
      if (err === null) {
        resolve([err, row.id])
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
  // 订单商品
  let orderId = result[1]
  let p = db.prepare('INSERT INTO `order_goods` (name, goods_id, order_id, price, amount, unit, create_time) VALUES(?, ?, ?, ?, ?, ?, ?);')
  for (let v of cart) {
    if (v.order_amount > 0) {
      result = await new Promise((resolve, reject) => {
        p.run(v.name, v.id, orderId, v.price, v.order_amount, v.unit, new Date().getTime(), (err) => {
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
        let sql = 'UPDATE `goods` SET `amount` = `amount` - ' + v.order_amount + ' WHERE id = ' + v.id + ';'
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
    }
  }
  db.run('COMMIT TRANSACTION;')
  callback(orderId)
  // db.close()
}
// 下单
cloneModel.delOrder = async (orderId, callback) => {
  let db = new cloneDb.sqlite3.Database(cloneDb.dbPath)
  console.log(orderId)
  db.run('BEGIN TRANSACTION;')
  let result = await new Promise((resolve, reject) => {
    db.run('DELETE FROM `order` WHERE id = ?;', orderId, (err) => {
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
    db.all('SELECT * FROM `order_goods` WHERE order_id = ?;', orderId, (err, rows) => {
      if (err === null) {
        resolve([err, rows])
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
  // 订单商品
  let orderGoods = result[1]
  console.log(orderGoods)

  let p = db.prepare('DELETE FROM `order_goods` WHERE id = ?;')
  for (let v of orderGoods) {
    if (v.amount > 0) {
      result = await new Promise((resolve, reject) => {
        p.run(v.id, (err) => {
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
        let sql = 'UPDATE `goods` SET `amount` = `amount` + ' + v.amount + ' WHERE id = ' + v.goods_id + ';'
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
    }
  }
  db.run('COMMIT TRANSACTION;')
  callback()
  // db.close()
}
export default cloneModel
