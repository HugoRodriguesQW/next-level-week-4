import styles from '../styles/components/CompletedChallenges.module.css'
import { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengesContext'

export function CompletedChallenges() {
  const {challengesCompleted} = useContext(challengesContext)
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}