"use client";

import styles from "./Intro.module.scss";

import IntroDemo from "@/components/Intro/Demo";
import IntroHeader from "@/components/Intro/Header";

import { useState } from "react";
import { usePlausible } from "next-plausible";

type IntroProps = {
  initial: number;
};

export default function Intro({ initial }: IntroProps) {
  const [offset, setOffset] = useState(0);
  const [personal, setPersonal] = useState(() => {
    const personalRaw = localStorage.getItem("personal") || "0";
    const personalParsed = parseInt(personalRaw);

    return personalParsed;
  });

  const plausible = usePlausible();

  function onUwuified() {
    setOffset((offset) => offset + 1);
    setPersonal((personal) => personal + 1);

    const personalIncreased = personal + 1;
    const personalStringified = personalIncreased.toString();

    localStorage.setItem("personal", personalStringified);

    if (personalIncreased == 25) plausible("Uwuified 25 sentences");
    if (personalIncreased == 50) plausible("Uwuified 50 sentences");
    if (personalIncreased == 100) plausible("Uwuified 100 sentences");
    if (personalIncreased == 250) plausible("Uwuified 250 sentences");
    if (personalIncreased == 500) plausible("Uwuified 500 sentences");
  }

  return (
    <main className={styles.intro}>
      <IntroHeader offset={offset} initial={initial} personal={personal} />

      <IntroDemo onUwuified={onUwuified} />
    </main>
  );
}
