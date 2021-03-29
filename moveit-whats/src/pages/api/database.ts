import { NextApiRequest, NextApiResponse } from "next";
import { IncomingHttpHeaders } from "http";

import { MongoClient, Db } from "mongodb"
import { FetchProps } from "./fetch";
import nc from 'next-connect'
import url from 'url'



let cachedDb:Db = null
let databaseClient:MongoClient = null

interface User {
  userProfile: Object;
  userSettings: Object;
  userData: Object;
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
  async update (props: {id: string, update: Object}){
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
  async create (user: User){
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
  const body: FetchProps = await JSON.parse(req.body)
  const {id, token, action} = body 
  
  await database.connect()

  const exec = database[action]

  const acess = await database.grantAcess({id, token})

  if (acess === 'Refused') { 
    res.send(req.body)
    return 
  }

  if(exec) {
    const response = await exec(body)
    res.json(response)
    return
  }
  
})

export default handler
