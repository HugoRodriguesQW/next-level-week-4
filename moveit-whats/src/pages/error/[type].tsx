import {GetServerSideProps} from 'next'
import { database } from './api/database';
import {useEffect} from 'react'

import styles from '../../styles/pages/Error.module.css'
interface ErrorProps {
  type: string;
}

interface PageCardsData {
  (): {
    title: string,
    image: boolean;
    button: boolean;
  };
}

export default function Error(props: ErrorProps) {
  const {type} = props
  
  const PageCards =  {
    usernotfound() {
      return {
        title: 'Usuário não encontrado',
        image: true,
        button: true
      }
    }
  } as PageCardsData
  
  const cardFunction = PageCards[type]
  if(!cardFunction){
    return (
      <p>Um erro ocorreu.</p>
    )
  }
  
  const {title, image, button} = cardFunction()
  
  function redirectToMainPage() {
    if(!window) return
    window.location.replace('/')
  }
  
  return (
    <div className={styles.errorContainer}>
    <div className={styles.backgroundRain} />
    <div className={styles.errorContent}>
      {image? (
      <img alt="moveit logo" src="/favicon.png" />
      ): null }
      
      <strong>{title}</strong>
      
      {button? (
      <button onClick={redirectToMainPage}>Início</button>
      ): null}
    </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const type = ctx.query?.type?.toString() ?? null
  
  return {
    props: {
      type
    }
  }
}