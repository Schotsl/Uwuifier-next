"use client";

import styles from "./Intro.module.scss";

import IntroDemo from "@/components/Intro/Demo";
import IntroHeader from "@/components/Intro/Header";

import { setCookie } from "cookies-next";
import { useState } from "react";
import { usePlausible } from "next-plausible";

type IntroProps = {
  initialTotal: number;
  initialPersonal: number;
};

export default function Intro({ initialTotal, initialPersonal }: IntroProps) {
  const [offset, setOffset] = useState(0);
  const [personal, setPersonal] = useState(initialPersonal);

  const plausible = usePlausible();

  function onUwuified() {
    setOffset((offset) => offset + 1);
    setPersonal((personal) => personal + 1);

    const personalIncreased = personal + 1;
    const personalStringified = personalIncreased.toString();

    // Set personal count to cookie
    setCookie("personal", personalStringified, {
      sameSite: "strict",
    });

    if (personalIncreased == 25) plausible("Uwuified 25 sentences");
    if (personalIncreased == 50) plausible("Uwuified 50 sentences");
    if (personalIncreased == 100) plausible("Uwuified 100 sentences");
    if (personalIncreased == 250) plausible("Uwuified 250 sentences");
    if (personalIncreased == 500) plausible("Uwuified 500 sentences");
  }

  return (
    <main className={styles.intro}>
      <IntroHeader offset={offset} initial={initialTotal} personal={personal} />

      <IntroDemo onUwuified={onUwuified} />
    </main>
  );
}
