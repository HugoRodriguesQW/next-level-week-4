import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import { userContext } from '../contexts/UserContext';


export function Profile() {
  const {level} = useContext(challengesContext)
  const {userImage, username} = useContext(userContext)
  
  return (
    <div className={styles.profileContainer}>
      <img alt={`${username} Profile`} src={userImage} />
      <div>
        <strong>{username}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}