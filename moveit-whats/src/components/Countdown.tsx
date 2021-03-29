import styles from '../styles/components/Countdown.module.css'
import { useState, useEffect, useContext} from 'react'
import { countdownContext } from '../contexts/CountdownContext'
import { userContext } from '../contexts/UserContext'

export function Countdown() {

  const {isOnline} = useContext(userContext)
  const {minutes, second, hasFinished,
        isActive, resetCountdown, startCountdown} = useContext(countdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(second).padStart(2, '0').split('')
  
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
      <button disabled className={styles.countdownButton}>
        Ciclo Encerrado
      </button>
      ) : (
      <button type="button" 
      className={isActive? `${styles.countdownButton} ${styles.countdownButtonActive}` : styles.countdownButton}
      onClick={isOnline? (isActive? resetCountdown : startCountdown) : null}>
        {isActive? 'Abandonar ciclo' : 'Iniciar um ciclo'}
      </button>
      )}
  
    </div>
  )
}