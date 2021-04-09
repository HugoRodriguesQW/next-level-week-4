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
      <img alt={`${username} Profile`}
      src={hideProfileImage? '/favicon.png' : userImage} />
      <p styles={styles.floatLevelBox}>{level}</p>
      <div>
        <strong>{username}</strong>
        <p>Desafios Completos {challengesCompleted}</p>
        <p>XP {currentExperience}</p>
      </div>
    </div>
  )
}