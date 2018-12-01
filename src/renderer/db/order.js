import Db from './model'
let cloneDb = Object.create(Db)
cloneDb.tableName = 'order'
export default cloneDb
