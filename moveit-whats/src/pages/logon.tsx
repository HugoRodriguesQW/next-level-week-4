import styles from '../styles/pages/Logon.module.css'
import { useRouter } from 'next/router'

export function Logon() {

  function handleGithubLogin() {
    window.location.assign("/api/request")
  }


  return (
    <div className={styles.overlay}>

    <div className={styles.LogonPageContainer}>
      <img src="logon-logo.svg" alt="MoveIt" />

      <section>
        <strong>Bem-vindo</strong>
        <p>Faça login com seu Github para continuar</p>
      </section>
      <button type="button" onClick={handleGithubLogin}>Login</button>
      <section>
        Logar
      </section>
    </div>
    
    </div>
  )
}