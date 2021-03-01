import {GetServerSideProps} from 'next'
import { URLSearchParams } from 'url'
import cookies from 'js-cookie'

import { useState, useEffect } from 'react';
import { HomeApp } from './home';
import { Logon } from './logon';

import { getCredentials, getGithubUser } from './api/login';
import { userDataProps } from '../components/Profile';
import { LeftBarMenu } from '../components/LeftBarMenu';

type propsData = {
userData: userDataProps;
currentUser: string;
currentExperience: number;
level: number;
challengesCompleted: number;
}

export default function Home (props:propsData) {
  const [logged, setLogged] = useState(false)

  const userData = props.userData
  
  for (const prop in props.userData){
    if(userData[prop]){
      cookies.set(prop, userData[prop],{expires:365})
    }
  }

  useEffect( ()=> {
    if(window.location.search){
    history.pushState({}, null, '/');
    }
    if( userData ) {
    setLogged(true)
    }
  }, [])
  
  
  return (
    <>
    <LeftBarMenu />
   {logged? HomeApp(props) : HomeApp(props)}
    </>
  )
  
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const code = ctx.query?.code
  const userData = {} as userDataProps

  const {level,  currentExperience, 
  challengesCompleted, username, userImage, userId, userToken} = ctx.req.cookies;

  Object.assign(userData, {username, userImage, userId, userToken})

  if( code ) {
    const githubData = await getGithubUser(code)
    if(githubData != "token_error"){
      Object.assign(userData, githubData)
    }
  }

  for (const data in userData) {
    userData[data] = userData[data] ?? null
  }
  return {
    props: {
      userData,
      level: Number(level),  
      currentExperience:Number(currentExperience), 
      challengesCompleted:Number(challengesCompleted)
    }
  }
}
