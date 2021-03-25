import {createContext, ReactNode, useState, useEffect} from 'react'
import cookies from 'js-cookie'

type userProps = {
  name: string;
  image: string;
  id: string;
  token: string;
}

type devProps = {
  isDev: boolean;
  time: number;
}

interface userData  {
  username: string;
  userImage: string;
  userId: string;
  userToken: string;
  isLoggedIn: boolean;
  currentPage: string;
  setLoggedStatusTo: (state: boolean) => void;
  changeCurrentPageTo: (page: 'home' | 'logon' | 'account') => void;
  saveLoginCookies: () => void;
  deleteLoginCookies: () => void;
  changeAndSaveUserName: (name : string) => void;
  setUserData: ({}: userProps) => void;
  useDevSettings: ({}: devProps) => void;
  devSettings: devProps;
}

interface userProviderProps {
  children: ReactNode;
}



export const userContext = createContext({} as userData);

export function UserContextProvider({children}: userProviderProps) {
  
  const [devSettings, setDevSettings] = useState({} as devProps)
  
  const [username, setUsername] = useState('Visitante')
  const [userImage, setUserImage] = useState("/favicon.png")
  const [userId, setUserId] = useState("local")
  const [userToken, setUserToken] = useState(null)
  const [currentPage, setCurrentPage] = useState('logon')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function changeCurrentPageTo(page : string){
    setCurrentPage(page)
  }

  function setLoggedStatusTo(state){
    setIsLoggedIn(state)
  }
  
  function saveLoginCookies(){
      cookies.set('username', username,{expires:365})
      cookies.set('userId', userId,{expires:365})
      cookies.set('userImage', userImage,{expires:365})
      cookies.set('userToken', userToken, {expires: 365})
  }

  function deleteLoginCookies(){
    cookies.remove('username')
    cookies.remove('userId')
    cookies.remove('userImage')
    cookies.remove('userToken')
  }

  function setUserData({name, image, id, token}: userProps){
    setUserId(id)
    setUsername(name)
    setUserImage(image)
    setUserToken(token)
  }

  function changeAndSaveUserName(name : string) {
    setUsername(name)
    cookies.set('username', name,{expires:365})
  }
  
  function useDevSettings(devSetting: devProps){
    setDevSettings(devSetting)  
  }
  
  return (
    <userContext.Provider value={
      {
      username,
      userId,
      userToken,
      userImage,
      currentPage,
      isLoggedIn,
      setLoggedStatusTo,
      changeCurrentPageTo,
      saveLoginCookies,
      setUserData,
      deleteLoginCookies,
      changeAndSaveUserName,
      useDevSettings,
      devSettings
      }
    }>
    {children}
    </userContext.Provider>
  )
}