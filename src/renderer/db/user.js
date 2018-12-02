import Db from './model'
let cloneDb = Object.create(Db)
cloneDb.tableName = 'user'
export default cloneDb
