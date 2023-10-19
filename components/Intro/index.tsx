"use client";

import IntroDemo from "@/components/Intro/Demo";
import IntroHeader from "@/components/Intro/Header";

import { useState } from "react";

type IntroProps = {
  initial: number;
};

export default function Intro({ initial }: IntroProps) {
  const [offset, setOffset] = useState(0);

  return (
    <>
      <IntroHeader offset={offset} initial={initial} personal={10} />

      <IntroDemo onUwuified={() => setOffset(offset + 1)} />
    </>
  );
}
