import styles from '../styles/components/LeftBarMenu.module.css'

export function LeftBarMenu (){
  return (
    <aside className={styles.leftBarMenuContainer}>
      <img alt="MoveIt" src="/favicon.png"></img>
      <div className={styles.menuItemsContainer}>
        <button type="button" className={styles.main}>
          Main/Default
        </button>
        <button type="button" className={styles.logon}>
          Login/Account
        </button>
      </div>
      <div>
        <button type="button" className={styles.logon}>
            Logout
        </button>
      </div>
    </aside>
  )
}