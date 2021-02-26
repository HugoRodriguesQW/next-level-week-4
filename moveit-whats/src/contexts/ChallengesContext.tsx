import {createContext, useState, ReactNode, useEffect} from 'react';
import challenges from '../../challenges.json'
import cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal';

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
  closeUpLevelModal: () => void;
}

type ChallengesProviderProps = {
  children: ReactNode;
  currentExperience: number;
  level: number;
  challengesCompleted: number;
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
  }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)

  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const experienceToNextLevel = Math.pow((level+1 ) * 4, 2)

  const [challengesCompleted, setchallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  
  useEffect(()=> {
    Notification.requestPermission();
  }, [])

  useEffect(()=> {
    cookies.set('level', String(level))
    cookies.set('currentExperience', String(currentExperience))
    cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])
  
  function levelUp () {
    setLevel(level+1)
    setIsLevelUpModalOpen(true)
    setTimeout(closeUpLevelModal, 4000)
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

  function closeUpLevelModal () {
    setIsLevelUpModalOpen(false)
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
      completeChallenge,
      closeUpLevelModal
      }
    }>
    {children}
    {isLevelUpModalOpen ? (<LevelUpModal />) : null }
    </challengesContext.Provider>
  )
}