import {GetServerSideProps} from 'next'
import { database } from '../api/database';
import {useEffect, useContext} from 'react'
import {userContext} from '../../contexts/UserContext'

import styles from '../../styles/pages/Viewer.module.css'
import {ViewerProfile} from '../../components/ViewerProfile'

import {User} from '../api/database'

interface ViewerProps {
  user: User;
}

interface userStatusLabelsProps {
	[dataName: string]: any
}

export default function Viewer(props: ViewerProps) {
  
  const {userProfile, userData, userSettings} = props.user ?? {}

  console.info(userProfile, userData, userSettings)
  
  return (
    <div className={styles.viewerContainer}>
      <div className={styles.viewerProfile}>
        <ViewerProfile props={{...userProfile, ...userData, ...userSettings}} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const username = ctx.params?.username.toString() ?? null

  await database.connect()
  
  const user = await database.getByName({username})
  
  
  if(!user){
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: `/error?type=usernotfound&message=${username}`
      }
    }
  }
  
  delete user._id

  return {
    props: {
      user
    }
  }
}