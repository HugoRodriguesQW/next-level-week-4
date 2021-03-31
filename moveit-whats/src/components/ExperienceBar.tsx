import styles from '../styles/components/ExperienceBar.module.css';
import { useContext, useEffect, useState } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';

export function ExperienceBar() {
  const {currentExperience, experienceToNextLevel} = useContext(challengesContext)
  const percentToNextLevel = Math.round( (currentExperience / experienceToNextLevel) * 100 )
  const [experienceBarSize, setExpSize] = useState(0)

  useEffect(()=> {
  if(document && experienceBarSize <= percentToNextLevel) {
  setTimeout( () => {
    setExpSize(experienceBarSize+1)
    document.documentElement.style.setProperty('--size-bar', `${experienceBarSize}%`);
  }, 10 )
  } else if (document && experienceBarSize > (percentToNextLevel + 1)) {
    setExpSize(0)
  } else if (document && experienceBarSize === 100) {
    setExpSize(0)
  }
  }, [experienceBarSize, percentToNextLevel])

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
