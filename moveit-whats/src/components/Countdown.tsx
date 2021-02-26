import styles from '../styles/components/Countdown.module.css'
import { useState, useEffect, useContext} from 'react'
import { challengesContext } from '../contexts/ChallengesContext';

let countdownTimeout : NodeJS.Timeout;

export function Countdown() {
  const {startNewChallenge} = useContext(challengesContext)

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const second =  time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(second).padStart(2, '0').split('')
  
  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    setTime(0.1 * 60)
    clearTimeout(countdownTimeout)
    setIsActive(false)
  }

  useEffect(()=> {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=> {setTime(time-1)}, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

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
      onClick={isActive? resetCountdown : startCountdown}>
        {isActive? 'Abandonar ciclo' : 'Iniciar um ciclo'}
      </button>
      )}
  
    </div>
  )
}