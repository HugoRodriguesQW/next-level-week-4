import styles from '../styles/components/ViewerProfile.module.css'
import {User} from '../pages/api/database'

interface ViewerProfileProps {
  props: User;
}

export function ViewerProfile({props} : ViewerProfileProps) {
 
  const {username, userImage} = props.userProfile
  const {level, challengesCompleted, currentExperience} = props.userData
  const {hideProfileImage} = props.userSettings

  
  return (
    <div className={styles.viewerProfileContainer}>
      <div className={styles.floatLeft}>
      <img alt={`${username} Profile`}
      src={hideProfileImage? '/favicon.png' : userImage} />
      <span className={styles.floatLevelBox}>{level}</span>
      </div>
      <div className={styles.floatRight}>
        <strong>{username}</strong>
        <p><span>Desafios Completos</span><span>{challengesCompleted}</span></p>
        <p><span>Level</span><span>{level}</span></p>
        <p><span>XP</span><span>{currentExperience}</span></p>
      </div>
    </div>
  )
}
