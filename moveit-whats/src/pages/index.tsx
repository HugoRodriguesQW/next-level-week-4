import {GetServerSideProps} from 'next'

import { useState } from 'react';
import { HomeApp } from './home';
import { Logon } from './logon';
import { getUserWithGithubToken } from './api/login';

type propsData = {
currentExperience: number;
level: number;
challengesCompleted: number;
}

export default function Home (props:propsData) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
   {isLoggedIn? HomeApp(props) : Logon()}
    </>
  )
  
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  console.info(ctx.query?.code)
  const {level,  currentExperience, 
  challengesCompleted} = ctx.req.cookies;


  return {
    props: {
      level: Number(level),  
      currentExperience:Number(currentExperience), 
      challengesCompleted:Number(challengesCompleted)
    }
  }
}
