import dotenv from 'dotenv'

export function getCredentials(){
  dotenv.config()
  return {
    client_id: process.env.GITHUB_ID,
    client_secret: process.env.GITHUB_SECRET,
  }
}

export async function getGithubUser(code) {
  const token = await getAcessToken(code)
  if(token){
  const userData = await getUserData(token)
  const {id, login, avatar_url} = userData
  return {
    userId: id ?? null,
    username: login  ?? null,
    userImage: avatar_url ?? null
  }
  }
  return null
}

async function getAcessToken(code: string) {
  const {client_id, client_secret} = getCredentials()
  const res = await fetch('https://github.com/login/oauth/access_token', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  })
  const data = await res.text()
  const params = new URLSearchParams(data)
  return params.get('access_token')
}


async function getUserData(token: string) {
  const res = await fetch('https://api.github.com/user', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      Authorization: `bearer ${token}`
    })
  })
  const data = await res.json()
  return data
}