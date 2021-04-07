import {GetServerSideProps} from 'next'
import { database } from './api/database';
import {useEffect} from 'react'

import styles from '../styles/pages/Viewer.module.css'

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

interface userStatusLabelsProps {
	['dataName': string]: string
}

export default function Viewer(props: ViewerProps) {
  
  const {userProfile, userData} = props.user
  
  const userStatusLabels: userStatusLabelsProps = {
	  level: 'Level',
	  currentExperience: 'Xp',
	  completedChallenges: 'Desafios Completos'
  }
  
  useEffect(()=> {
    history.replaceState({}, null, `/viewer/${userProfile.username}`)
  },[])
  
  return (
    <>
	<div class={styles.profileContainer}>
		<img src={userProfile.userImage} alt={userProfile.username}/>
		<strong>{userProfile.username}</strong>
		<div class={styles.profileStatusContainer}>
		<ul>
		{
			Object.keys(userData).map( key => {
				const name = userStatusLabels[key]
				return <li>name {userData[key]}</li>
			})
		}
		</ul>
		</div>
		 
		<div class={styles.sessionButtonsContainer}>
			<button class={styles.transferSessionButton}>Transferir</button>
			<button class={styles.loginButton}>Login</button>
			<button class={styles.logoutButton}>Logout</button>
		</div>
	</div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const targetId= ctx.query.id?.toString()
  
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