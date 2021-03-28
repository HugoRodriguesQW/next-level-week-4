import {createContext, ReactNode, useState, useEffect, useContext} from 'react'
import cookies from 'js-cookie'
import { userContext } from './UserContext';
import { lightTheme, darkTheme} from '../styles/theme'
// import { updateUserData, connectToDatabase, getUserFromDatabase } from '../pages/api/mongodb';

interface configData {
  darkMode: boolean;
  sounds: boolean;
  notifications: boolean;
  hideProfileImage: boolean;
  isCurrentSaved: boolean;
  hasBlockedWords: boolean;
  checkAndSetNewName: (name: string) => void;
  enableDisableSounds: () => void;
  enableDisableNotifications: () => void;
  showHideProfileImage: () => void;
  saveConfig: () => void;
  enableDisableDarkMode: () => void;
}

type configProviderProps = {
  children: ReactNode;
  sounds: boolean;
  notifications: boolean;
  hideProfileImage: boolean;
  darkMode: boolean;
}

export const ConfigContext = createContext({} as configData);

export function ConfigProvider({children, ...rest}: configProviderProps) {
  
  const {username, changeAndSaveUserName, userId, userToken} = useContext(userContext)
  const [localname, setLocalname] = useState(username)
  
  const [darkMode, setDarkMode] = useState(rest.darkMode ?? false)
  const [sounds, setSoundsState] = useState(rest.sounds ?? true)
  const [notifications, setNotificationsState] = useState(rest.notifications ?? true)
  const [hideProfileImage, setProfileImageState] = useState(rest.hideProfileImage ?? false)

  const [isCurrentSaved, setSavedStatus] = useState(true)

  const [hasBlockedWords, setHasBlockedWords] = useState(false)
  
  
  useEffect(()=> {
    requestNotificationPermission()
  }, [])
  
  useEffect(()=> {
    if( notifications && Notification.permission !== "granted") {
    if( Notification.permission === 'denied') {
      alert('As notificações estão bloqueadas pelo navegador.')
    }
    setNotificationsState(false)
    requestNotificationPermission()
    }
  }, [notifications]) 
  
  
  
  useEffect(()=> {
    if(darkMode){
      setTheme(darkTheme)
    }else{
      setTheme(lightTheme)
    }
  }, [darkMode])
  
 function setTheme(theme){
  if(document){
  for(const key in theme){
    document.documentElement.style.setProperty(key, theme[key])
  }
  }
 }
 
 function requestNotificationPermission(){
    Notification.requestPermission().then( function (permission) {
      if( permission === 'granted') {
        setNotificationsState(true)
      }
    })
  }

  function checkAndSetNewName(name: string) {
    if( name.toLowerCase() != username.toLowerCase() ) { 
      setHasBlockedWords(true)
      return 
    }
    setHasBlockedWords(false)

    setLocalname(name)
    }

  function enableDisableSounds(){
    setSoundsState(sounds ? false : true)
  }
  function enableDisableNotifications(){
    setNotificationsState(notifications ? false : true)
  }

  function showHideProfileImage(){
    setProfileImageState(hideProfileImage ? false : true)
  }
  
  function enableDisableDarkMode() {
    setDarkMode(darkMode ? false : true)
  }

  async function saveConfig(){
    //const db = await connectToDatabase()
    //updateUserData({userId, userToken: null}, {
     // "userSettings.$.sounds": sounds,
     // "userSettings.$.notifications": notifications,
     // "userSettings.$.hideProfileImage": hideProfileImage,
     // "userSettings.$.darkMode": darkMode
    //}, db)

    changeAndSaveUserName(localname)
    setSavedStatus(true)
  }

  useEffect(()=> {
    async function checkConfigChanges(){
    const db = await connectToDatabase()

    const userData = await getUserFromDatabase({userId, userToken}, db)

    const conf = userData.userSettings
    setSavedStatus(
      conf.userName == localname &&
      conf.sounds == sounds &&
      conf.notifications == notifications &&
      conf.hideProfileImage == hideProfileImage &&
      conf.darkMode == darkMode
    )
    }
    checkConfigChanges()
  },[sounds, notifications, hideProfileImage, localname, darkMode])

  useEffect(()=> {
    setLocalname(username)
  }, [username])

  return (
    <ConfigContext.Provider value={
      {
      darkMode,
      sounds,
      notifications,
      checkAndSetNewName,
      hideProfileImage,
      hasBlockedWords,
      enableDisableSounds,
      enableDisableNotifications,
      showHideProfileImage,
      saveConfig,
      isCurrentSaved,
      enableDisableDarkMode
      }
    }>
      {children}
    </ConfigContext.Provider>
  )
}
