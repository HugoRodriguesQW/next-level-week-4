import styles from '../styles/components/MenuBar.module.css'
import { useContext } from 'react'
import { userContext } from '../contexts/UserContext'
import { useRouter } from 'next/router'

export function MenuBar (){
  const router = useRouter()
  const {isLoggedIn, currentPage, changeCurrentPageTo, deleteLoginCookies, isOnline} = useContext(userContext)
  
  function openLoginPage(){
    changeCurrentPageTo("logon")
  }

  function openMainPage(){
    changeCurrentPageTo("home")
  }

  function openAccountPage(){
    changeCurrentPageTo("account")
  }

  function Logout(){
    deleteLoginCookies()
    router.reload()
  }

  

  return (
    <aside className={
      currentPage === 'logon' ? `${styles.menuBarContainerInsideLogon} ${styles.menuBarContainer}` : 
      styles.menuBarContainer}>
      <img alt="MoveIt" src="/white-logo.svg" />
      <div className={styles.menuItemsContainer}>
        <button type="button" 
        className={currentPage === "home" ? styles.currentPageButton : ""}
        onClick={isOnline? openMainPage : null}>
        <img alt="Início" src="/icons/home.svg" />
        </button>
        
        <button type="button" 
        className={currentPage === "logon" || currentPage === "account" ? styles.currentPageButton : ""}
        onClick={isOnline? (isLoggedIn? openAccountPage : openLoginPage) : null}>
          {isLoggedIn? (<img alt="Conta" src="/icons/settings.svg" />) :
          (<img alt="Login"  src="/icons/session.svg"/>)}
        </button>
      </div>
      <div>
        {isLoggedIn?
        <button type="button" className={styles.logoutButton}
        onClick={isOnline? Logout : null}>
          Sair
        </button>
        : null}
      </div>
    </aside>
  )
}