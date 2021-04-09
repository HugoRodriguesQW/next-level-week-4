import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';
import { userContext } from '../contexts/UserContext';
import { ConfigContext } from '../contexts/ConfigContext';


export function Profile() {
  const {level} = useContext(challengesContext)
  const {userImage, username} = useContext(userContext)
  const {hideProfileImage} = useContext(ConfigContext)
  
  
  return (
    <div className={styles.profileContainer}>
      <img alt={`${username} Profile`} 
      src={hideProfileImage? '/favicon.png' : userImage} />
      <div>
        <strong>{username}</strong>
        <p>
          <img src="/icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}