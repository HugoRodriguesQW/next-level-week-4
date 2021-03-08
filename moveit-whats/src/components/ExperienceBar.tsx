import styles from '../styles/components/ExperienceBar.module.css';
import { useContext, useEffect } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';

export function ExperienceBar() {
  const {currentExperience, experienceToNextLevel} = useContext(challengesContext)
  const percentToNextLevel = Math.round( (currentExperience / experienceToNextLevel) * 100 )

  useEffect(()=> {
  if( document ) {
  document.documentElement.style.setProperty('--size-bar', `${percentToNextLevel}%`);
  }
  }, [percentToNextLevel])

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div />
        <span className={styles.currentExperience} style={{left : `${percentToNextLevel}%`}}>{currentExperience} xp</span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}