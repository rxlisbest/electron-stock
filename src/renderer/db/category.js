import Db from './model'
let cloneDb = Object.create(Db)
cloneDb.tableName = 'category'
export default cloneDb
