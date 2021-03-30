import {createContext, ReactNode, useState, useEffect} from 'react'
import cookies from 'js-cookie'
import  Fetch  from '../pages/api/fetch';
import { UpdateWriteOpResult } from 'mongodb';

type userProps = {
  name: string;
  image: string;
  id: string;
  token: string;
}

interface userData  {
  username: string;
  userImage: string;
  userId: string;
  userToken: string;
  isLoggedIn: boolean;
  isOnline: boolean;
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
  const [userId, setUserId] = useState(null)
  const [userToken, setUserToken] = useState(null)
  const [currentPage, setCurrentPage] = useState('logon')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [isOnline, setIsOnline] = useState(true)

  function changeCurrentPageTo(page : string){
    setCurrentPage(page)
  }

  function setLoggedStatusTo(state: boolean){
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
    if(isOnline === false){ return }
    const res: UpdateWriteOpResult = await Fetch({
    id: userId, token: userToken,
    action: 'update', update: {'userProfile.username': name }
    })

    if(res.result.ok) setUsername(name)
  }

  useEffect(()=> {
    window.addEventListener('offline', () => setIsOnline(false))
    window.addEventListener('online', () => setIsOnline(true))
  }, [])
  
  return (
    <userContext.Provider value={
      {
      username,
      userId,
      userToken,
      userImage,
      currentPage,
      isLoggedIn,
      isOnline,
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