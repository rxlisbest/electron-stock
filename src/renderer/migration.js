var sqlite3 = require('sqlite3').verbose()
const path = require('path')
var db = new sqlite3.Database(path.join(__dirname, 'electron-stock.db'))

// 创建表
db.serialize(function () {
  // 分类表
  db.run('' +
    'CREATE TABLE IF NOT EXISTS category (' +
    'id INTEGER AUTO_INCREMENT,' +
    'name VARCHAR(255),' +
    'create_time BIGINT(20) NOT NULL DEFAULT 0,' +
    'PRIMARY KEY(id)' +
    ')')
  // 商品表
  db.run('' +
    'CREATE TABLE IF NOT EXISTS goods (' +
    'id INTEGER AUTO_INCREMENT,' +
    'name VARCHAR(255),' +
    'category_id INTEGER NOT NULL DEFAULT 0,' +
    'price DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
    'amount DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
    'create_time BIGINT(20) NOT NULL DEFAULT 0,' +
    'PRIMARY KEY(id)' +
    ')')
  // 订单表
  db.run('' +
    'CREATE TABLE IF NOT EXISTS `order` (' +
    'id INTEGER AUTO_INCREMENT,' +
    'name VARCHAR(255),' +
    'goods_id INTEGER NOT NULL DEFAULT 0,' +
    'price DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
    'amount DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
    'create_time BIGINT(20) NOT NULL DEFAULT 0,' +
    'user_id INTEGER NOT NULL DEFAULT 0,' +
    'PRIMARY KEY(id)' +
    ')')
  // 用户表
  db.run('' +
    'CREATE TABLE IF NOT EXISTS user (' +
    'id INTEGER AUTO_INCREMENT,' +
    'name VARCHAR(255),' +
    'phone VARCHAR(255),' +
    'create_time BIGINT(20) NOT NULL DEFAULT 0,' +
    'PRIMARY KEY(id)' +
    ')')
})

export default {
  sqlite3: sqlite3
}
