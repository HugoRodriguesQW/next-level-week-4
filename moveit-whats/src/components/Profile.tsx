import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img alt="Hugo Rodrigues" src="https://github.com/hugorodriguesqw.png" />
      <div>
        <strong>Hugo Rodrigues</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  )
}