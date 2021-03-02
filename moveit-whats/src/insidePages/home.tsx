import { ChallengesProvider } from "../contexts/ChallengesContext";
import { ExperienceBar } from "../components/ExperienceBar";
import { CountdownProvider } from "../contexts/CountdownContext";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import Head from "next/head";

import styles from '../styles/pages/Home.module.css';
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";

interface HomeAppProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function HomeApp ({
  level, currentExperience,  challengesCompleted
}: HomeAppProps) {
  const {currentPage} = useContext(userContext)
  return (
    <>
     <ChallengesProvider
    level={level}
    currentExperience={currentExperience}
    challengesCompleted={challengesCompleted}
    >
    <div className={styles.container}>
       <Head>
        <title>Iníco | MoveIt</title>
       </Head>
    
      <ExperienceBar />
    
      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          < ChallengeBox />
        </div>
      </section>
      </CountdownProvider>
    </div>
    </ChallengesProvider>
    </>
  )
}