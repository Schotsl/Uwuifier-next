"use client";

import styles from "./IntroDemo.module.scss";

import React from "react";
import Uwuifier from "uwuifier";

import { MutableRefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faShareFromSquare,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

import { usePlausible } from "next-plausible";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import DemoField from "./Field";

type DemoProps = {
  onUwuified: () => void;
};

enum Translation {
  UWU_TO_ENG = "UWU_TO_ENG",
  ENG_TO_UWU = "ENG_TO_UWU",
}

export default function Demo({ onUwuified }: DemoProps) {
  const plausible = usePlausible();
  const uwuifier = new Uwuifier();

  const [typed, setTyped] = useState(false);

  // prettier-ignore
  const [input, setInput] = useState("According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground.");
  const [output, setOutput] = useState(uwuifier.uwuifySentence(input));

  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState<Translation>(
    Translation.ENG_TO_UWU
  );

  // We'll use this over-typed ref to store the timeout
  const timeout: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  useEffect(() => {
    // We don't want too send a event when the app starts
    if (!typed) {
      return;
    }

    // Clear any existing timer whenever input changes
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // Set a new timer for 1 second
    timeout.current = setTimeout(async () => {
      // Only increase the counter if the input is not empty
      const inputTrimmed = input.trim();
      const inputLength = inputTrimmed.length;

      if (inputLength > 0) {
        onUwuified();

        plausible("Uwuified sentence");

        if (translation === Translation.UWU_TO_ENG) {
          const url =
            "https://rqautahsvsoneozemjth.supabase.co/functions/v1/un-uwuifier";

          const body = JSON.stringify({ input: inputTrimmed });
          const method = "POST";
          const headers = { "Content-Type": "application/json" };

          const response = await fetch(url, { body, method, headers });
          const responseJSON = await response.json();

          setLoading(false);
          setOutput(responseJSON.output);
        }
      }
    }, 1000);

    // Clear the timer on unmount or if the input changes
    return () => clearTimeout(timeout.current!);
  }, [input]);

  async function handleInput(input: string) {
    setTyped(true);
    setInput(input);

    if (translation === Translation.ENG_TO_UWU) {
      const uwuified = uwuifier.uwuifySentence(input);

      setOutput(uwuified);
    } else {
      setLoading(true);
    }
  }

  function handleSwitch() {
    const updated =
      translation === Translation.ENG_TO_UWU
        ? Translation.UWU_TO_ENG
        : Translation.ENG_TO_UWU;

    setLoading(false);
    setTranslation(updated);

    if (updated === Translation.UWU_TO_ENG) {
      const copy = input;

      setInput(output);
      setOutput(copy);
    }
  }

  return (
    <div className={styles.demo}>
      <DemoField
        id="input"
        label="Input"
        value={input}
        onChange={handleInput}
      />

      <DemoField
        id="output"
        label="Output"
        value={output}
        loading={loading}
        readonly={true}
        headerButtons={[
          <button key={0} onClick={handleSwitch}>
            <FontAwesomeIcon
              icon={faRepeat}
              style={{
                top: 20,
                left: 24,
                color: "#000",
                fontSize: 16,
                position: "absolute",
              }}
              className="fas fa-check"
            />
          </button>,
        ]}
        footerButtons={[
          <Button key={0} icon={faShareFromSquare} />,
          <Button key={1} icon={faCopy} label="Share text" />,
        ]}
      />
    </div>
  );
}
