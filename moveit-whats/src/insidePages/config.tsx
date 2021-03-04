import { useContext } from "react"
import { userContext } from "../contexts/UserContext"
import styles from "../styles/pages/Config.module.css"
import { Profile } from "../components/Profile"

export function Config () {
  const {currentPage, username} = useContext(userContext)

  return (
    <>
    {currentPage === 'account' ?(
    <div className={styles.overlay}>
      <div className={styles.configContainer}>
        <strong className={styles.mainTitle}>Configurações</strong>
        <form className={styles.configList}>
        <section>
          <div>
            <p>Conta</p>
            <div className={styles.whiteBackground}>
              <Profile />
            </div>
          </div>
          <div>
            <p>Nome de usuário</p>
            <input type="label" placeholder={username} defaultValue={username}/>
          </div>
          </section>
          <section>
           <div className={styles.preferencesBox}>
            <p>Preferências</p>
            <div>
             <div><div>
             <input type="checkbox" name="sounds" />
             <p>Som quando surgir um novo desafio</p>
             </div></div>
              <div><div>
             <input type="checkbox" name="notification" />
             <p>Notificação de novo desafio</p>
             </div></div>
             <div><div>
             <input type="checkbox" name="hideImageProfile" />
             <p>Esconder imagem de perfil</p>
             </div></div>
            </div>
          </div>
          <div className={styles.configButtonContainer} >
            <button type="button" className={styles.saveConfigButton} >
              Salvar
            </button>
          </div>
        </section>
        </form>
      </div>
      </div>
    ): null
    }
    </>
  )
}