import {createContext, ReactNode, useState, Dispatch} from 'react'

interface PageMenuData  {
  isLoggedIn: boolean;
  currentPage: string;
  changeLoggedStatus: (state: boolean) => void;
  changeCurrentPage: (page: 'main' | 'loggon') => void;
}

interface pageProviderProps {
  children: ReactNode;
}

export const pageMenuContext = createContext({} as PageMenuData);

export function PageMenuContextProvider({children}: pageProviderProps) {

  const [currentPage, setCurrentPage] = useState('main')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function changeCurrentPage(page){
    setCurrentPage(page)
  }

  function changeLoggedStatus(state){
    setIsLoggedIn(state)
  }
  
  return (
    <pageMenuContext.Provider value={
      {
      currentPage,
      isLoggedIn,
      changeLoggedStatus,
      changeCurrentPage
      }
    }>
      {children}
    </pageMenuContext.Provider>
  )
}