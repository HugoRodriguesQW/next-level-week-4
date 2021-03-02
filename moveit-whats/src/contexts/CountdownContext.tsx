import {createContext, ReactNode, useState, useEffect, useContext} from 'react';
import { challengesContext } from './ChallengesContext';

type CountdownContextData = {
  minutes: number;
  second: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

type CountdownProviderProps = {
  children: ReactNode;
}

export const countdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}:CountdownProviderProps) {
  let countdownTimeout : NodeJS.Timeout;
  const {startNewChallenge} = useContext(challengesContext)

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const second =  time % 60

  function startCountdown() {
    setIsActive(true)
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

  function resetCountdown() {
    setTime(0.1 * 60)
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
  }

  return (
    <countdownContext.Provider value= {
    {
      minutes,
      second,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </countdownContext.Provider>
  )
}