import styles from '../styles/pages/Logon.module.css'

export function Logon() {

  function handleGithubLogin() {
    window.location.assign("https://github.com/login/oauth/access_token=7944e9912272e60e2b6be286917cae98247f42e3&client_id=e51ba7edf1b3164eaf91&client_")
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