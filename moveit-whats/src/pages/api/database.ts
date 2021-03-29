import { NextApiRequest, NextApiResponse } from "next";
import { IncomingHttpHeaders } from "http";

import { MongoClient, Db } from "mongodb"
import nc from 'next-connect'
import url from 'url'


let cachedDb:Db = null
let databaseClient:MongoClient = null

interface User {
  userProfile: Object;
  userSettings: Object;
  userData: Object;
}

interface NextApiRequestExtended extends NextApiRequest {
  headers: FetchProps
}


interface FetchProps extends IncomingHttpHeaders {
  id: string;
  token: string;
  action: string;
  update: string;
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

export function generateDatabaseToken(){
  const tokenProps = process.env.TOKEN_PROPS.split(',')
  const token = new Array(
    Math.round(Math.random()*3**10),
    Math.round(Math.random()*2**10)).map(s => {return ([s,
      tokenProps[Math.round(Object.keys(tokenProps).length * Math.random()) -1 ] ].join(''))
    }).join('_')

  return token
}
 

const handler = nc<NextApiRequest, NextApiResponse>()
.get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
  const {id, token, action} = req.headers
  
  await database.connect()

  const exec = database[action]

  const acess = await database.grantAcess({id, token})

  if (acess === 'Refused') { 
    res.send("Acess Refused")
    return 
  }

  if(req.headers?.update) {
    req.headers.update = await JSON.parse(req.headers.update)
  }

  if(exec) {
    const response = await exec(req.headers)
    res.json(response)
    return
  }
  
})

export default handler