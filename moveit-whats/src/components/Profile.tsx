import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';

export function Profile() {
  const {level} = useContext(challengesContext)
  return (
    <div className={styles.profileContainer}>
      <img alt="Hugo Rodrigues" src="https://github.com/hugorodriguesqw.png" />
      <div>
        <strong>Hugo Rodrigues</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}