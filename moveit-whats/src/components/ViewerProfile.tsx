import styles from '../styles/components/ViewerProfile.module.css'

interface ViewerProfileProps {
  username: string;
  userImage: string;
  level: Number;
  challengesCompleted: Number;
  currentExperience: Number;
  hideProfileImage: boolean;
}

export function ViewerProfile({props}: ViewerProfileProps) {
 
  const {username, userImage} = props
  const {level, challengesCompleted, currentExperience} = props
  const {hideProfileImage} = props

  
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