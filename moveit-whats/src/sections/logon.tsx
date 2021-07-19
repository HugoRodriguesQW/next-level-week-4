import styles from '../styles/pages/Logon.module.css'
import { useContext } from 'react'
import { userContext } from '../contexts/UserContext'

export function handleGithubLogin() {
  window.location.assign("/api/request")
}

export function Logon() {

  const {currentPage} = useContext(userContext)


  return (
    <>
    { currentPage === 'logon' ? (
    <div className={styles.overlay}>

    <div className={styles.LogonPageContainer}>
      <img  alt="Moveit" src="logon-logo.svg"/>

      <section>
        <strong>Bem-vindo</strong>
        <div className={styles.description}>
          <img alt="Github" src="/icons/github.svg"/>
          <p>Faça login com seu Github para continuar</p>
        </div>
        <button type="button" onClick={handleGithubLogin}>
          <img alt="Login" src="icons/login_arrow.svg"/>
        </button>
      </section>
    </div>
    
    </div>
    ): null }
    </>
    )
}