import {GetServerSideProps} from 'next'
import { URLSearchParams } from 'url'
import cookies from 'js-cookie'
import {useEffect, useContext } from 'react';

import { getGithubUser } from './api/login';
import { userContext } from '../contexts/UserContext'
import { HomeApp } from '../insidePages/home';
import { Logon } from '../insidePages/logon';
import { Config } from '../insidePages/config';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { ConfigProvider } from '../contexts/ConfigContext';

type propsData = {
userData: {
  username: string;
  userImage: string;
  userId: string;
};
config: {
  hideProfileImage: boolean;
  sounds: boolean;
  notifications: boolean;
};
currentUser: string;
currentExperience: number;
level: number;
challengesCompleted: number;
}

export default function Home (props:propsData) {
  const userData = props.userData
  const { username, userImage, userId, setUserData, 
  setLoggedStatusTo, saveLoginCookies, changeCurrentPageTo} = useContext(userContext)

  useEffect( ()=> {
    if(window.location.search){
    history.pushState({}, null, '/');
    }
    if(userData.userId  && userData.username && userData.userImage){
    console.log(userData.userId)
    setUserData({
    name: userData.username,
    image: userData.userImage,
    id: userData.userId
    })
    setLoggedStatusTo(true)
    changeCurrentPageTo('home')
  }
  }, [])

  useEffect( ()=> {
    if( userData.userId  && userData.username && userData.userImage){
    saveLoginCookies()
    }
  }, [username, userImage, userId])

  
  return (
  <>
  <ConfigProvider 
  sounds={props.config.sounds}
  notifications={props.config.notifications}
  hideProfileImage={props.config.hideProfileImage}
  >
  <ChallengesProvider
  level={props.level}
  currentExperience={props.currentExperience}
  challengesCompleted={props.challengesCompleted}
  >
  <Logon />
  <Config />
  <HomeApp />
  </ChallengesProvider>
  </ConfigProvider>
  </>
  )
  
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const code = ctx.query?.code
  const userData = new Object()

  const {level,  currentExperience, 
  challengesCompleted, username, userImage, userId} = ctx.req.cookies;

  const {enableSounds, enableNotification, hideProfileImageStatus} = ctx.req.cookies;
  
  const config = {
    sounds: (enableSounds == 'true'),
    notifications: (enableNotification == 'true'),
    hideProfileImage: (hideProfileImageStatus == 'true')
  }
  
  Object.assign(userData, {username, userImage, userId})

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
      config,
      level: Number(level),  
      currentExperience:Number(currentExperience), 
      challengesCompleted:Number(challengesCompleted)
    } as propsData
  }
}
