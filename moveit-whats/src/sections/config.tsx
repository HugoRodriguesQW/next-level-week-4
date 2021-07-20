import { useContext, useState, useEffect } from "react"
import { userContext } from "../contexts/UserContext"
import styles from "../styles/pages/Config.module.css"
import { Profile } from "../components/Profile"
import { ConfigContext } from "../contexts/ConfigContext"

export function Config () {
  const {currentPage, username} = useContext(userContext)
  const {sounds, notifications, hideProfileImage, isCurrentSaved, 
  showHideProfileImage, enableDisableNotifications, checkAndSetNewName,
  enableDisableSounds, saveConfig, hasBlockedWords,
  darkMode, enableDisableDarkMode} = useContext(ConfigContext)

  return (
    <>
    {currentPage === 'account' ?(
    <div className={styles.overlay}>
      <div className={styles.configContainer}>
        <strong className={styles.mainTitle}>Configurações</strong>
        <div className={styles.configList}>
        <section>
          <div>
            <p>Conta</p>
            <div className={styles.whiteBackground} 
            onClick={()=>{window.open(`${window.location.origin}/view/${username}`)}}
            >
              <Profile />
            </div>
          </div>
          <div>
            <p>Nome de usuário</p>
            <input type="label" placeholder={username} defaultValue={username}
            onChange={({target}) => checkAndSetNewName(target.value)} />
            <em className={hasBlockedWords ? styles.invalidLabelText : `${styles.invalidLabelText} ${styles.invalidLabelDisabled}`}> 
            Altere somente para maiúsculo/minúsculo</em>
          </div>
          </section>
          <section>
           <div className={styles.preferencesBox}>
            <p>Preferências</p>
            <div>
              <div>
                <div>
                <input type="checkbox" name="sounds" checked={sounds}
                onChange={enableDisableSounds} />
                <p>Som quando surgir um novo desafio</p>
                </div>
              </div>
              
              <div>
                <div>
                <input type="checkbox" name="notification" checked={notifications}
                onChange={enableDisableNotifications} />
                <p>Notificação de novo desafio</p>
                </div>
              </div>
              
              <div>
                <div>
                <input type="checkbox" name="hideImageProfile" checked={hideProfileImage} 
                onChange={showHideProfileImage} />
                <p>Esconder imagem de perfil</p>
                </div>
              </div>
              
              <div>
                <div>
                <input type="checkbox" name="darkMode" checked={darkMode} 
                onChange={enableDisableDarkMode} />
                <p>Modo escuro</p>
                </div>
              </div>
              
            </div>
          </div>
          <div className={styles.configButtonContainer} >
            
            <button type="button" className={isCurrentSaved ? styles.savedConfigButton : null} 
            onClick={isCurrentSaved ? null : saveConfig}>
              {isCurrentSaved ? "Salvo" : "Salvar"}
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