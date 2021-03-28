import {GetServerSideProps} from 'next'
import {useEffect, useContext } from 'react';

import { getGithubUser } from './api/login';
import { HomeApp } from '../insidePages/home';
import { Logon } from '../insidePages/logon';
import { Config } from '../insidePages/config';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { ConfigProvider } from '../contexts/ConfigContext';
import { userContext } from '../contexts/UserContext'

import { connectToDatabase, generateDatabaseToken, getUserFromDatabase, createUserInDatabase, 
         hasUserInDatabase, 
         updateUserData} from './api/mongodb';

type propsData = {
userProfile: userProps;
userSettings: configProps;
userData: dataProps;
}

interface dataProps {
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
  
  const {userProfile, userData, userSettings} = props

  const { username, userImage, userId, setUserData, 
  setLoggedStatusTo, saveLoginCookies, changeCurrentPageTo} = useContext(userContext)
  
  useEffect( ()=> {
    if(window.location.search){
    history.pushState({}, null, '/');
    }
    
    if(userProfile.userId  && userProfile.username && userProfile.userImage){

    setUserData({
    name: userProfile.username,
    image: userProfile.userImage,
    id: userProfile.userId,
    token: userProfile.userToken
    })
    setLoggedStatusTo(true)
    changeCurrentPageTo('home')
    }
  }, [])

  useEffect( ()=> {
    if( userProfile.userId  && userProfile.username && userProfile.userImage){
    saveLoginCookies()
    }
  }, [username, userImage, userId])

  
  return (
  <>
  <ConfigProvider 
  sounds={userSettings.sounds}
  notifications={userSettings.notifications}
  hideProfileImage={userSettings.hideProfileImage}
  darkMode={userSettings.darkMode}
  >
  <ChallengesProvider
  level={userData.level}
  currentExperience={userData.currentExperience}
  challengesCompleted={userData.challengesCompleted}
  >
  <Logon />
  <Config />
  <HomeApp />yar
  </ChallengesProvider>
  </ConfigProvider>
  </>
  )
  
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const db = await connectToDatabase()

  const GithubAuthCode = ctx.query?.code


  const userProfile = {
    userImage: null,
    username: null,
    userId: ctx.req.cookies?.userId ?? null,
    userToken: ctx.req.cookies?.userToken ?? null
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

  async function processGithubAuthCode(){
    const githubUserProfile = await getGithubUser(GithubAuthCode)

    if(githubUserProfile) {
      Object.assign(userProfile, githubUserProfile)
      const hasUser = await hasUserInDatabase(userProfile, db)

      if(hasUser){
        const newAcessToken = generateDatabaseToken()
        
        const succeddedUpdate = await updateUserData(
        userProfile,{"userProfile.userToken": newAcessToken}, db)
    
        if(succeddedUpdate) userProfile.userToken = newAcessToken
        return 
      }

      userProfile.userToken = generateDatabaseToken()
      await createUserInDatabase({userProfile, userSettings, userData }, db)
    }
  }

  async function getUserDataFromDB(){
    const databaseResponse = await getUserFromDatabase(
      userProfile, db)
    
    if(databaseResponse){
      Object.assign(userProfile, databaseResponse.userProfile)
      Object.assign(userSettings, databaseResponse.userSettings)
      Object.assign(userData, databaseResponse.userData)
      return
    }
  }

  if(GithubAuthCode) await processGithubAuthCode()
  if(userProfile.userId && userProfile.userToken) await getUserDataFromDB()

  return {
    props: {
      userProfile,
      userSettings,
      userData
    } as propsData
  }
}
