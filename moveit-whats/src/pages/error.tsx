import {GetServerSideProps} from 'next'
import { database } from './api/database';
import {useEffect} from 'react'

interface ErrorProps {
  type: string;
  message: string;
}

export default function Viewer(props: ErrorProps) {
  const {type, message} = props
  
  useEffect(()=> {
    history.replaceState({}, null, `/error`)
  },[])
  
  return (
    <>
    {type === 'usernotfound' ?  (
      <p>User not found : (</p>  
    ) : null
    }
    <div>{message}</div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const type = ctx.query?.type?.toString()
  const message = ctx.query?.type?.toString()
  
  if(!type || !message){
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
  
  
  
  return {
    props: {
      type, message
    }
  }
}