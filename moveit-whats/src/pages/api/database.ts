import { NextApiRequest, NextApiResponse } from "next";

import { MongoClient, Db } from "mongodb"
import { FetchProps } from "./fetch";
import nc from 'next-connect'
import url from 'url'


let cachedDb:Db = null
let databaseClient:MongoClient = null

export interface User {
  userProfile: {
    [profileData: string]: any
  };
  userSettings: {
    [SettingData: string]: any
  };
  userData: {
    [Data: string]: any
  };
}

export interface DatabaseUpdate {
  update?: {
    [field: string]: any
  };
}

export interface DatabaseAction {
  action : "update" | "get" | "create" | "has"
}

export const database = {
  async connect (){
    const secret = process.env.MONGODB_URI

    if(!databaseClient?.isConnected()) cachedDb = null
    if(cachedDb) return cachedDb

    databaseClient = await MongoClient.connect(secret, {
    useNewUrlParser: true, useUnifiedTopology: true })
    cachedDb = databaseClient.db(url.parse(secret).pathname.substr(1))
    return cachedDb
  },
  async update (props: {id: string, update?: Object}){
    if(!props.update) return null
    const res = await cachedDb?.collection('subscribers')?.updateOne(
    {'userProfile.userId': props.id}, 
    { $set: props.update})
    return res
  },
  async get (identy: {id: string}){
    const user: User = await cachedDb?.collection('subscribers')?.findOne(
    {'userProfile.userId': identy.id})
    return user ?? null

  },
  async create ({user}: {user?: User}){
    if(!user)   return null
    const res = await cachedDb?.collection('subscribers')?.insertOne(user)
    return res
  },
  async has (identy: {id: string}){
    const hasOnDatabase = 
    await cachedDb?.collection('subscribers')?.findOne({'userProfile.userId': identy.id}) != null
    return hasOnDatabase
  },
  async grantAcess(acess: {id: string, token: string}) {
    const grant =
    await cachedDb?.collection('subscribers')?.findOne({'userProfile.userId': acess.id, 
    'userProfile.userToken': acess.token}) != null
    return grant ? 'Accepted' : 'Refused'
  }
}

const handler = nc<NextApiRequest, NextApiResponse>()
.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await database.connect()

  const body: FetchProps    = await JSON.parse(req.body)
  const {id, token, action} = body 
  const exec                = database[action]
  
  const NotRequirePermission = ['has', 'get']

  if(! NotRequirePermission.includes(action) ){
    const acess = await database.grantAcess({id, token})
    if (acess === 'Refused') { 
      res.json({'error': 'refused'})
      return 
    }
  }

  if(exec) {
    const response = await exec(body)
    res.json(response)
    return
  }
})

export default handler