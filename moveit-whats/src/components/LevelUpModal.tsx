import styles from '../styles/components/LevelUpModal.module.css'
import { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengesContext'

export function LevelUpModal() {
  const {level, closeUpLevelModal} = useContext(challengesContext)
  return (
    <div className={styles.overlay}>
    <div className={styles.levelUpModalContainer}>
    <header>{level}</header>
    <strong>Parabéns</strong>
    <p>Você alcançou um novo level.</p>
    <button type="button"
    onClick={closeUpLevelModal}
    >
      <img src="icons/close.svg" alt="Fechar modal" />
    </button>
    </div>
    </div>
  )
}