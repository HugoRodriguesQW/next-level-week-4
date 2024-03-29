import { useContext } from 'react'
import { challengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/ChallengeBox.module.css'
import { countdownContext } from '../contexts/CountdownContext'

export function ChallengeBox() {
  const {activeChallenge, resetChallenge, completeChallenge} = useContext(challengesContext)
  const {resetCountdown} = useContext(countdownContext)
  function handleChallengeSucceeded(){
    resetCountdown()
    completeChallenge()
  }

  function handleChallengeFailed(){
    resetChallenge()
    resetCountdown()
  }


  return (
    <div className={styles.challengeBoxContainer}>
    { activeChallenge ? (
      <div className={styles.challengeActive}>
        <header>
          Ganhe {activeChallenge.amount} xp
        </header>
        <main>
          <img alt={activeChallenge.type} src={`icons/${activeChallenge.type}.svg`} />
          <strong>Novo desafio</strong>
          <p>{activeChallenge.description}</p>
        </main>
        <footer>
          <button type="button" className={styles.challengeFailButton}
          onClick={handleChallengeFailed}
          >Falhei</button>
          
          <button type="button" className={styles.challengeSucceededButton}
          onClick={handleChallengeSucceeded}
          >Completei</button>
        </footer>
      </div>
      ) : (
      <div className={styles.challengeNotActive}>
        <strong>Finalize um ciclo para receber um desafio</strong>
        <p>
          <img alt="level UP" src="icons/level-up.svg"/>
          Avançe de level completando desafios
        </p>
      </div>
    )
    }
    </div>
  )
}