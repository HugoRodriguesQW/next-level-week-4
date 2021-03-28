import {createContext, ReactNode, useState, useEffect} from 'react'
import cookies from 'js-cookie'
import { connectToDatabase, updateUserData } from '../pages/api/mongodb';

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
}

interface userProviderProps {
  children: ReactNode;
}



export const userContext = createContext({} as userData);

export function UserContextProvider({children}: userProviderProps) {

  
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
      cookies.set('userId', userId,{expires:60})
      cookies.set('userToken', userToken, {expires: 60})
  }

  function deleteLoginCookies(){
    cookies.remove('userId')
    cookies.remove('userToken')
  }

  function setUserData({name, image, id, token}: userProps){
    setUserId(id)
    setUsername(name)
    setUserImage(image)
    setUserToken(token)
  }

  async function changeAndSaveUserName(name : string) {
    setUsername(name)
    //const db = await connectToDatabase()
    //updateUserData({userId: userId, userToken: null},
     // {
     //   'userProfile.$.username': name
     // }, db)
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
      changeAndSaveUserName
      }
    }>
    {children}
    </userContext.Provider>
  )
}