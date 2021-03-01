import styles from '../styles/components/LeftBarMenu.module.css'
import { useContext } from 'react'
import { pageMenuContext } from '../contexts/PageMenuContext'

export function LeftBarMenu (){

  const {isLoggedIn, currentPage, changeLoggedStatus,
  changeCurrentPage} = useContext(pageMenuContext)
  
  console.log(useContext(pageMenuContext))

  function openLoginPage(){
    changeCurrentPage("loggon")
  }

  function openMainPage(){
    changeCurrentPage("main")
  }

  function Logout(){
    console.log('Exluindo Cookies e recarregando a página')
  }

  function openAccountPage(){
    console.log("Indo para página da conta") 
  }

  return (
    <aside className={styles.leftBarMenuContainer}>
      <img alt="MoveIt" src="/favicon.png"></img>
      <div className={styles.menuItemsContainer}>
        <button type="button" className={styles.main}
        onClick={openMainPage}>
          Início
        </button>
        
        <button type="button" className={styles.logon}
        onClick={isLoggedIn? openAccountPage : openLoginPage}>
          {isLoggedIn? "Conta" : "Login"}
        </button>
      </div>
      <div>
        {isLoggedIn?
        <button type="button" className={styles.logon}
        onClick={Logout}>
            Logout
        </button>
        : null}
      </div>
    </aside>
  )
}