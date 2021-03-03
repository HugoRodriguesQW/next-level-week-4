import { useContext } from "react"
import { userContext } from "../contexts/UserContext"
import styles from "../styles/pages/Config.module.css"
import { Profile } from "../components/Profile"

export function Config () {
  const {currentPage} = useContext(userContext)

  return (
    <>
    {currentPage === 'account' ?(
    <div className={styles.overlay}>
      <div className={styles.configContainer}>
        <strong className={styles.mainTitle}>Configurações</strong>
        <div className={styles.configList}>
        <section className={styles.configList}>
          <div>
            <p>Conta</p>
            <div className={styles.whiteBackground}>
              <Profile />
            </div>
          </div>
          <div>
            <p>Nome de usuário</p>
            <input type="label" defaultValue="username" />
          </div>
          </section>
          <section>
           <div>
            <p>Preferências</p>
            <div>
             <p>Opção 1</p>
             <p>Opção 2</p>
             <p>Opção 3</p>
            </div>
          </div>
          <div className={styles.configButtonContainer} >
            <button type="button" className={styles.saveConfigButton} >
              Salvar
            </button>
          </div>
        </section>
        </div>
      </div>
      </div>
    ): null
    }
    </>
  )
}