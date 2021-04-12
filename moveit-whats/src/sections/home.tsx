import { ChallengesProvider } from "../contexts/ChallengesContext";
import { ExperienceBar } from "../components/ExperienceBar";
import { CountdownProvider } from "../contexts/CountdownContext";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";


import styles from '../styles/pages/Home.module.css';
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";

export function HomeApp () {
  const {currentPage} = useContext(userContext)
  return (
  <div className={styles.container}>
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
  )
}