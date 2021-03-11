import {createContext, ReactNode, useState, useEffect, useContext} from 'react'
import cookies from 'js-cookie'
import { userContext } from './UserContext';


interface configData {
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
}

type configProviderProps = {
  children: ReactNode;
  sounds: boolean;
  notifications: boolean;
  hideProfileImage: boolean;
}

export const ConfigContext = createContext({} as configData);

export function ConfigProvider({children, ...rest}: configProviderProps) {

  const {username, changeAndSaveUserName} = useContext(userContext)
  const [localname, setLocalname] = useState(username)

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
    console.info('setado', 'name', name, 'user', username, 'local', localname)
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

  function saveConfig(){
    cookies.set('enableSounds', String(sounds))
    cookies.set('enableNotification', String(notifications))
    cookies.set('hideProfileImageStatus', String(hideProfileImage))
    changeAndSaveUserName(localname)
    setSavedStatus(true)
  }

  useEffect(()=> {
    const userName = cookies.get('username')
    const enableSounds = cookies.get('enableSounds')
    const enableNotification = cookies.get('enableNotification')
    const hideProfileImageStatus = cookies.get('hideProfileImageStatus')

    setSavedStatus(
      userName == localname &&
      enableSounds == String(sounds) &&
      enableNotification == String(notifications) &&
      hideProfileImageStatus == String(hideProfileImage)
    )
    
  },[sounds, notifications, hideProfileImage, localname])

  useEffect(()=> {
    setLocalname(username)
  }, [username])

  return (
    <ConfigContext.Provider value={
      {
      sounds,
      notifications,
      checkAndSetNewName,
      hideProfileImage,
      hasBlockedWords,
      enableDisableSounds,
      enableDisableNotifications,
      showHideProfileImage,
      saveConfig,
      isCurrentSaved
      }
    }>
      {children}
    </ConfigContext.Provider>
  )
}