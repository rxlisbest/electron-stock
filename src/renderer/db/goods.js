import Db from './model'
let cloneDb = Object.create(Db)
cloneDb.tableName = 'goods'
export default cloneDb
