import {createContext, useState, ReactNode, useEffect, useContext} from 'react';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';
import { ConfigContext } from '../contexts/ConfigContext'

import Fetch from '../pages/api/fetch';
import { userContext } from './UserContext';

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

interface ChallengesProviderProps  {
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
  
  const {userId, userToken, isOnline} = useContext(userContext)
  
  const {sounds, notifications} = useContext(ConfigContext) 
  
  const [level, setLevel] = useState(rest.level ?? 1)

  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const experienceToNextLevel = Math.round(Math.pow((level+1 ) * 8 - (0.4 * level), 2))

  const [challengesCompleted, setchallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  useEffect(()=> {
    if(isOnline === false) return 
    
    Fetch(
    {id: userId, token: userToken, action: 'update', 
    update:{
      'userData.level': level,
      'userData.currentExperience': currentExperience,
      'userData.challengesCompleted': challengesCompleted
    }})
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
    
    if( notifications ) {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }

    if( sounds ) {
      new Audio('/notification.mp3').play()
    }
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
