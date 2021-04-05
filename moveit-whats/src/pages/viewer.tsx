import {GetServerSideProps} from 'next'
import { database } from './api/database';
import {useEffect} from 'react'

interface ViewerProps {
  user: {
    userProfile: {
      [profileField: string]: any;
    };
    userData: {
      [dataField: string]: any;
    }
  };
}

export default function Viewer(props: ViewerProps) {
  
  const {userProfile, userData} = props.user
  
  useEffect(()=> {
    history.replaceState({}, null, `/viewer/${userProfile.username}`)
  },[])
  
  return (
    <>
    <p>This is the viewer page</p>
    <p>name: {userProfile.username}</p>
    <p>id: {userProfile.userId}</p>
    <p>level: {userData.level}</p>
    <p>experience: {userData.currentExperience}</p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const targetId: string = ctx.query.id
  
  const user = {
    userProfile: {},
    userData: {}
  }
  
  if(!targetId){
   console.info('targetId is null', targetId)
    return {
     props: {},
     redirect: {
       permanent: false,
       destination: '/'
     }
   } 
  }
  
  await database.connect()
  const hasUserInDatabase = await database.has({id: targetId})
  if(!hasUserInDatabase){
    console.info('user not found', hasUserInDatabase)
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: `/error?type=usernotfound&message=${targetId}`
      }
    }
  }
  
  const dbUser = await database.get({id: targetId})
  Object.assign(user.userProfile, dbUser.userProfile)
  Object.assign(user.userData, dbUser.userData)
  
  return {
    props: {
      user
    }
  }
}