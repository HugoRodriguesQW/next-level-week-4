import {createContext, ReactNode, useState, useEffect} from 'react'
import cookies from 'js-cookie'

interface configData {
  sounds: boolean;
  notifications: boolean;
  hideProfileImage: boolean;
  isCurrentSaved: boolean;
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

  const [sounds, setSoundsState] = useState(rest.sounds ?? true)
  const [notifications, setNotificationsState] = useState(rest.notifications ?? true)
  const [hideProfileImage, setProfileImageState] = useState(rest.hideProfileImage ?? false)

  const [isCurrentSaved, setSavedStatus] = useState(true)

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
    setSavedStatus(true)
  }

  useEffect(()=> {
    const enableSounds = cookies.get('enableSounds')
    const enableNotification = cookies.get('enableNotification')
    const hideProfileImageStatus = cookies.get('hideProfileImageStatus')

    setSavedStatus( 
      enableSounds == String(sounds) &&
      enableNotification == String(notifications) &&
      hideProfileImageStatus == String(hideProfileImage)
    )
    
  },[sounds, notifications, hideProfileImage])

  return (
    <ConfigContext.Provider value={
      {
      sounds,
      notifications,
      hideProfileImage,
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