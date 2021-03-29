
import styles from '../styles/components/OfflineStatus.module.css'
import { useContext, createElement, useState } from 'react'
import { userContext } from '../contexts/UserContext'

export function OfflineStatus(){

  const {isOnline} = useContext(userContext)
  
  return(
    <>
    <div className={[styles.OfflineStatusContainer, isOnline ? styles.Online : null].join(' ')}>
      <div className={styles.OfflineStatusBar}></div>
      <div className={styles.OffLineStatusContent}></div>
    </div>

    <img className={styles.hidenOfflineIcon} src="/icons/offline.svg" />
    </>
  )
}