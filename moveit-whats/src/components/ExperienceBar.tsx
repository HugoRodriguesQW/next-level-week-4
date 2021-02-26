import styles from '../styles/components/ExperienceBar.module.css';
import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';

export function ExperienceBar() {
  const {currentExperience, experienceToNextLevel} = useContext(challengesContext)
  const percentToNextLevel = Math.round( (currentExperience / experienceToNextLevel) * 100 )

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width : `${percentToNextLevel}%`}} />
        <span className={styles.currentExperience} style={{left : `${percentToNextLevel}%`}}>{currentExperience} xp</span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}