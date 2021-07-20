import {GetServerSideProps} from 'next'
import { database } from '../api/database';
import {useEffect, useContext} from 'react'
import {userContext} from '../../contexts/UserContext'

import styles from '../../styles/pages/Viewer.module.css'
import {ViewerProfile} from '../../components/ViewerProfile'

import {User} from '../api/database'
import {propsData} from '../index'
import { handleGithubLogin } from '../../sections/logon';

interface ViewerProps {
  user: User;
}

interface userStatusLabelsProps {
	[dataName: string]: any
}

export default function Viewer(props: ViewerProps) {
  
  const {userProfile, userData, userSettings} = props.user ?? {} as propsData

  return (
    <div className={styles.viewerContainer}>
      <div className={styles.viewerContent}>
        <ViewerProfile props={{userProfile, userData, userSettings}} />
        <button className={styles.loginButton} onClick={handleGithubLogin}>Início</button>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  if(ctx.req.url === '/view/favicon.png')  return {props:{}}
   
  const username = ctx.query?.username.toString() ?? null
  
  await database.connect()
  const user = await database.getByName({username})
  
  if(!user){
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: `/error/usernotfound`
      }
    }
  }
  
  user._id = String(user._id)

  return {
    props: {
      user
    }
  }
  
}