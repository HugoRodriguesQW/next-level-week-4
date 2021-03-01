import {GetServerSideProps} from 'next'

import { useState } from 'react';
import { HomeApp } from './home';
import { Logon } from './logon';

import dotenv from 'dotenv'
import {NowRequest, NowResponse} from '@vercel/node'
import { URLSearchParams } from 'url'
import cookies from 'js-cookie'

type propsData = {
currentUser: string;
currentExperience: number;
level: number;
challengesCompleted: number;
}

export default function Home (props:propsData) {
  if(props.currentUser) {
    cookies.set('username', props.currentUser)
    console.log(props.currentUser)
  }
  
  return (
    <>
   {props.currentUser? HomeApp(props) : Logon()}
    </>
  )
  
}


function getCredentials(){
  dotenv.config()
  return {
    client_id: process.env.GITHUB_ID,
    client_secret: process.env.GITHUB_SECRET,
    redirect_uri: process.env.GITHUB_URI,
    token: process.env.GITHUB_TOKEN
  }
}

async function getAcessToken(code) {
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


async function getGithubUser(token) {
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const code = ctx.query?.code

  let nickname = null
  function setNickName (nick) {
    nickname = nick
  }

  if( code ) {
    const token = await getAcessToken(code)
    const userData = await getGithubUser(token)
    setNickName(userData?.login)
  }

  const {username, level,  currentExperience, 
  challengesCompleted} = ctx.req.cookies;

  if(!nickname && username) {
    setNickName(username)
  }

  return {
    props: {
      currentUser: nickname,
      level: Number(level),  
      currentExperience:Number(currentExperience), 
      challengesCompleted:Number(challengesCompleted)
    }
  }
}
