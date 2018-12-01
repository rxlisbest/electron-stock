import Db from './model'
let cloneDb = Object.create(Db)
cloneDb.tableName = 'order_goods'
export default cloneDb
