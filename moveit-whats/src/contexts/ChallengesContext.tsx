import {createContext, useState, ReactNode} from 'react';
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
  function levelUp () {
    setLevel(level+1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  return (
    <challengesContext.Provider value={
      {level, levelUp, 
      currentExperience,
      experienceToNextLevel,
      challengesCompleted,
      activeChallenge,
      startNewChallenge,
      resetChallenge
      }
    }>
      {children}
    </challengesContext.Provider>
  )
}