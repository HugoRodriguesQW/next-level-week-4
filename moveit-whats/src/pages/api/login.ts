import dotenv from 'dotenv'




export function getUserWithGithubToken(request) {
  console.log(request)
}

function requestGithubAuth (response) {
  dotenv.config()
  const clientID=process.env.GITHUB_ID
  const clientSecret=process.env.GITHUB_SECRET
  const redirectURL="https://3000-tomato-penguin-tfiu5w4j.ws-us03.gitpod.io/"

  const url=`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURL}`  
  response.redirect(url)
}