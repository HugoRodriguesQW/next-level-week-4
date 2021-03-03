import dotenv from 'dotenv'
import {NowRequest, NowResponse} from '@vercel/node'
import { URLSearchParams } from 'url'

function getCredentials(){
  dotenv.config()
  return {
    client_id: process.env.GITHUB_ID,
    client_secret: process.env.GITHUB_SECRET,
  }
}
export default (req: NowRequest, res: NowResponse) => {
  const {client_id} = getCredentials()
  const url=`https://github.com/login/oauth/authorize?client_id=${client_id}`  
  res.redirect(url)
}

