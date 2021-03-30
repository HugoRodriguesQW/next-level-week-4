import styles from '../styles/pages/Logon.module.css'
import { useContext } from 'react'
import { userContext } from '../contexts/UserContext'

export function Logon() {

  const {currentPage} = useContext(userContext)
  function handleGithubLogin() {
    window.location.assign("/api/request")
  }


  return (
    <>
    { currentPage === 'logon' ? (
    <div className={styles.overlay}>

    <div className={styles.LogonPageContainer}>
      <img src="logon-logo.svg" alt="MoveIt" />

      <section>
        <strong>Bem-vindo</strong>
        <div className={styles.description}>
          <img src="/icons/github.svg" alt="Github" />
          <p>Faça login com seu Github para continuar</p>
        </div>
        <button type="button" onClick={handleGithubLogin}>
          <img src="icons/login_arrow.svg" alt="Login" />
        </button>
      </section>
    </div>
    
    </div>
    ): null }
    </>
    )
}