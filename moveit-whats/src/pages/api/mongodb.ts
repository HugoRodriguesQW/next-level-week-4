import { MongoClient, Db } from "mongodb"
import url from 'url'

import dotenv from 'dotenv'
export let cachedDb:Db = null

export interface  MongoFilter {
  readonly userToken: string,
  readonly userId: string
}

export async function connectToDatabase(){ 
   dotenv.config()
  const uri = process.env.MONGODB_URI

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
    Math.round(Math.random()*2**10)).map(s => {return ([s,
      tokenProps[Math.round(Object.keys(tokenProps).length * Math.random()) -1 ] ].join(''))
    }).join('_')

  return token
}
 
export async function getUserFromDatabase({userId, userToken} : MongoFilter, database: Db){
  const user = await database.collection('subscribers').findOne(
  {'userProfile.userId': userId, 'userProfile.userToken': userToken})
  return user ?? null
}

export async function hasUserInDatabase({userId} : MongoFilter, database: Db){
  const has = await database.collection('subscribers').findOne({'userProfile.userId': userId}) != null
  return has
}

export async function createUserInDatabase(user: Object, database: Db) {
  const res = await database.collection('subscribers').insertOne(user)
  return res.result.ok === 1
}

export async function updateUserData({userId} : MongoFilter, update: Object, database: Db){
  const res = await database.collection('subscribers').updateOne(
    {'userProfile.userId': userId}, 
    { $set: update})
  return res.result.ok === 1
}