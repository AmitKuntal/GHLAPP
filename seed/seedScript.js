const client = require('./../db/db.js')

function queryExecutor(query){
    return client.query(query).then((res)=>{
     console.log(query);
   }).catch((err)=> console.log(err))
 }
 function deleteTable(tableName){
   query = `DROP TABLE IF EXISTS ${tableName};`
   return queryExecutor(query)
 }
 function createTable()
 {
   query = "CREATE TABLE events(\
            id SERIAL PRIMARY KEY     NOT NULL,\
            dateTime      timestamp    NOT NULL\
      );"
  
   return queryExecutor(query)
 }
 
  
 client.connect()
   .then(() => deleteTable('events'))
   .then(()=> createTable())
   .then(()=>client.end()).catch((err)=> console.log(err))