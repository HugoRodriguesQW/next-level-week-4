import { ChallengesProvider } from "../contexts/ChallengesContext";
import { ExperienceBar } from "../components/ExperienceBar";
import { CountdownProvider } from "../contexts/CountdownContext";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import Head from "next/head";

import styles from '../styles/pages/Home.module.css';

interface HomeAppData {
  currentUser: string;
  currentExperience: number;
  level: number;
  challengesCompleted: number;
}

export function HomeApp (props:HomeAppData) {
  return (
     <ChallengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
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
  )
}