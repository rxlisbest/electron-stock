import Db from './db'

export default {
  run: () => {
    Db.run('' +
      'CREATE TABLE IF NOT EXISTS category (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'name VARCHAR(255),' +
      'create_time BIGINT(20) NOT NULL DEFAULT 0' +
      ')')
    // 商品表
    Db.run('' +
      'CREATE TABLE IF NOT EXISTS goods (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'name VARCHAR(255),' +
      'category_id INTEGER NOT NULL DEFAULT 0,' +
      'price DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
      'amount DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
      'unit VARCHAR(255),' +
      'create_time BIGINT(20) NOT NULL DEFAULT 0' +
      ')')
    // 商品入库表
    Db.run('' +
      'CREATE TABLE IF NOT EXISTS goods_log (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'goods_id INTEGER NOT NULL DEFAULT 0,' +
      'price DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
      'amount DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
      'create_time BIGINT(20) NOT NULL DEFAULT 0' +
      ')')
    // 订单表
    Db.run('' +
      'CREATE TABLE IF NOT EXISTS `order` (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'total DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
      'user_id INTEGER NOT NULL DEFAULT 0,' +
      'create_time BIGINT(20) NOT NULL DEFAULT 0' +
      ')')
    // 订单商品表
    Db.run('' +
      'CREATE TABLE IF NOT EXISTS `order_goods` (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'name VARCHAR(255),' +
      'goods_id INTEGER NOT NULL DEFAULT 0,' +
      'order_id INTEGER NOT NULL DEFAULT 0,' +
      'price DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
      'amount DECIMAL(8,2) NOT NULL DEFAULT 0.00,' +
      'unit VARCHAR(255),' +
      'create_time BIGINT(20) NOT NULL DEFAULT 0' +
      ')')
    // 用户表
    Db.run('' +
      'CREATE TABLE IF NOT EXISTS `user` (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
      'name VARCHAR(255),' +
      'phone VARCHAR(255),' +
      'create_time BIGINT(20) NOT NULL DEFAULT 0' +
      ')')
  }
}
