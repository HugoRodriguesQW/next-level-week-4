import {createContext, ReactNode, useState, useEffect} from 'react'
import cookies from 'js-cookie'


type userProps = {
  name: string;
  image: string;
  id: string;
}

interface userData  {
  username: string;
  userImage: string;
  userId: string;
  isLoggedIn: boolean;
  currentPage: string;
  setLoggedStatusTo: (state: boolean) => void;
  changeCurrentPageTo: (page: 'home' | 'logon' | 'account') => void;
  saveLoginCookies: () => void;
  deleteLoginCookies: () => void;
  changeAndSaveUserName: (name : string) => void;
  setUserData: ({name, image, id}: userProps) => void;
}

interface userProviderProps {
  children: ReactNode;
}



export const userContext = createContext({} as userData);

export function UserContextProvider({children}: userProviderProps) {

  const [username, setUsername] = useState('Visitante')
  const [userImage, setUserImage] = useState("/favicon.png")
  const [userId, setUserId] = useState("local")
  const [currentPage, setCurrentPage] = useState('logon')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function changeCurrentPageTo(page){
    setCurrentPage(page)
  }

  function setLoggedStatusTo(state){
    setIsLoggedIn(state)
  }
  
  function saveLoginCookies(){
      cookies.set('username', username,{expires:365})
      cookies.set('userId', userId,{expires:365})
      cookies.set('userImage', userImage,{expires:365})
  }

  function deleteLoginCookies(){
    cookies.remove('username')
    cookies.remove('userId')
    cookies.remove('userImage')
  }

  function setUserData({name, image, id}: userProps){
    setUserId(id)
    setUsername(name)
    setUserImage(image)
  }

  function changeAndSaveUserName(name : string) {
    setUsername(name)
    cookies.set('username', name,{expires:365})
  }

  return (
    <userContext.Provider value={
      {
      username,
      userId,
      userImage,
      currentPage,
      isLoggedIn,
      setLoggedStatusTo,
      changeCurrentPageTo,
      saveLoginCookies,
      setUserData,
      deleteLoginCookies,
      changeAndSaveUserName
      }
    }>
    {children}
    </userContext.Provider>
  )
}