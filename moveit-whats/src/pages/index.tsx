import {GetServerSideProps} from 'next'
import { URLSearchParams } from 'url'
import cookies from 'js-cookie'
import {useEffect, useContext } from 'react';

import { getGithubUser } from './api/login';
import { HomeApp } from '../insidePages/home';
import { Logon } from '../insidePages/logon';
import { Config } from '../insidePages/config';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { ConfigProvider } from '../contexts/ConfigContext';
import { userContext } from '../contexts/UserContext'

import {MongoClient, Db} from 'mongodb'
import { connectToDatabase, generateDatabaseToken, findUserOnDatabase, createUserInDatabase } from './api/mongodb';

type propsData = {
userData: userProps;
config: configProps;
currentUser: string;
currentExperience: number;
level: number;
challengesCompleted: number;
}


interface userProps {
  username: string;
  userImage: string;
  userId: string;
  userToken: string;
}

interface configProps {
  hideProfileImage: boolean;
  sounds: boolean;
  notifications: boolean;
  darkMode: boolean;
}

export default function Home (props:propsData) {

  const userData = props.userData

  const { username, userImage, userId, setUserData, useDevSettings, 
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
    id: userData.userId,
    token: userData.userToken
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
  darkMode={props.config.darkMode}
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
  const db:Db = await connectToDatabase(process.env.MONGODB_URI)

  const GithubAuthCode = ctx.query?.code


  const userProfile = {
    userImage: null,
    username: null,
    userId: ctx.req.cookies.userToken ?? null,
    userToken: ctx.req.cookies.userToken ?? null
  }

  const userSettings = {
    sounds: true,
    notifications: false,
    hideProfileImage: false,
    darkMode: false
  }

  const userData = {
    currentExperience: 0,
    challengesCompleted: 0,
    level: 0,
  }

  
  if(GithubAuthCode) {
    const githubUserProfile = await getGithubUser(GithubAuthCode)
    if(githubUserProfile){
      Object.assign(userProfile, githubUserProfile)
    }else{
      userProfile.userToken = generateDatabaseToken()
      await createUserInDatabase(userProfile.userToken, {
      userProfile,
      userSettings,
      userData
      }, db)
    }
  }
  
  await getUserDataFromDB()

  async function getUserDataFromDB(){
    const databaseUser = await findUserOnDatabase(
      String(userProfile.userToken), db)
    
    if(databaseUser){
      Object.assign(userProfile, databaseUser.userProfile)
      Object.assign(userSettings, databaseUser.userSettings)
      Object.assign(userData, databaseUser.userData)
    }
  }

  return {
    props: {
      userData: userProfile,
      config : userSettings,
      level: userData.level,  
      currentExperience: userData.currentExperience, 
      challengesCompleted: userData.challengesCompleted
    } as propsData
  }
}
