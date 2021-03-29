import {createContext, ReactNode, useState, useEffect, useContext} from 'react'
import { userContext } from './UserContext';
import { lightTheme, darkTheme} from '../styles/theme'
import Fetch from '../pages/api/fetch';
import { UpdateWriteOpResult } from 'mongodb';

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
  
  const {username, changeAndSaveUserName, userId, userToken, isOnline} = useContext(userContext)
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
  
 function setTheme(theme: Object){
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
    if(isOnline === false){ return }
    const res: UpdateWriteOpResult = await Fetch({
    id: userId, token: userToken,
    action: 'update', update: {
      'userSettings.sounds': sounds,
      'userSettings.notifications': notifications,
      'userSettings.hideProfileImage': hideProfileImage,
      'userSettings.darkMode': darkMode,
    }
    })

    if(res.result.ok){
    changeAndSaveUserName(localname)
    setSavedStatus(true)
    }
  }

  useEffect(()=> {
    async function checkConfigChanges(){
    if(isOnline === false){ return }
    const user = await Fetch({
      id: userId, token: userToken, action: 'get', update: null
    })

    const settings = user.userSettings
    setSavedStatus(
      user.userProfile.username == localname &&
      settings.sounds == sounds &&
      settings.notifications == notifications &&
      settings.hideProfileImage == hideProfileImage &&
      settings.darkMode == darkMode
    )

    console.info(
      'name', user.userProfile == localname,
      'sounds', settings.sounds == sounds,
      'notifications', settings.notifications == notifications,
      'hideProfileImage', settings.hideProfileImage == hideProfileImage,
      'darkMode', settings.darkMode == darkMode,
      settings
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
