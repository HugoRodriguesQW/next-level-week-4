import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json'

type challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

type ChallengesContextData = {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: challenge;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

type ChallengesProviderProps = {
  children: ReactNode;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)

  const [currentExperience, setCurrentExperience] = useState(0)
  const experienceToNextLevel = Math.pow((level+1 ) * 4, 2)

  const [challengesCompleted, setchallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  useEffect(()=> {
    Notification.requestPermission();
  }, [])

  function levelUp () {
    setLevel(level+1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)

    new Notification('Novo desafio', {
      body: `Valendo ${challenge.amount}xp!`
    })

    new Audio('/notification.mp3').play()
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
      if(!activeChallenge) {
        return
      }
      const {amount} = activeChallenge;
      let finalExp =currentExperience + amount;
      if (finalExp >= experienceToNextLevel) {
        finalExp = finalExp - experienceToNextLevel
        levelUp()
      }
      
      setCurrentExperience(finalExp)
      setchallengesCompleted(challengesCompleted + 1)
      resetChallenge()
  }

  return (
    <challengesContext.Provider value={
      {level, levelUp, 
      currentExperience,
      experienceToNextLevel,
      challengesCompleted,
      activeChallenge,
      startNewChallenge,
      resetChallenge,
      completeChallenge
      }
    }>
      {children}
    </challengesContext.Provider>
  )
}