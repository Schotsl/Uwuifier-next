"use client";

import IntroDemo from "@/components/Intro/Demo";
import IntroHeader from "@/components/Intro/Header";

import { useState } from "react";

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

  function onUwuified() {
    setOffset((offset) => offset + 1);
    setPersonal((personal) => personal + 1);

    const personalIncreased = personal + 1;
    const personalStringified = personalIncreased.toString();

    localStorage.setItem("personal", personalStringified);
  }

  return (
    <>
      <IntroHeader offset={offset} initial={initial} personal={personal} />

      <IntroDemo onUwuified={onUwuified} />
    </>
  );
}
