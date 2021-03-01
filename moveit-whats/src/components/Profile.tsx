import styles from '../styles/components/Profile.module.css';
import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengesContext';

type userProps = {
  username: string;
  userImage: string;
  userId: string;
  userToken: string;
}

export type userDataProps = userProps

export function Profile({username, userImage}: userProps) {

  const {level} = useContext(challengesContext)
  const name = username ?? "Visitante"
  const image = userImage  ?? '/favicon.png'
  return (
    <div className={styles.profileContainer}>
      <img alt={`${name} Profile`} src={image} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}