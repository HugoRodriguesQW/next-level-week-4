import { MongoClient, Db } from "mongodb"
import url from 'url'

export let cachedDb:Db = null

export async function connectToDatabase(uri){ 
  
  if(cachedDb){
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return client.db(url.parse(uri).pathname.substr(1))
}

export function generateDatabaseToken(){
  const tokenProps = process.env.TOKEN_PROPS.split(',')
  const token = new Array(
    Math.round(Math.random()*3**10),
    Math.round(Math.random()*2**10)).map(s => {return (s + 
      tokenProps[Math.round(Object.keys(tokenProps).length * Math.random()) -1 ])
    }).join('')

  return token
}
 
export async function findUserOnDatabase(userToken: string, database: Db){
  const user = await database.collection('subscribers').findOne({identy: userToken})
  return user ?? null
}

export async function createUserInDatabase(token: string, user: Object, database: Db) {
  database.collection('subscribers').insertOne(Object.assign(user, {identy: token}))
}