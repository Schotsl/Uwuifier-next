"use client";

import styles from "./IntroDemo.module.scss";

import React from "react";
import Uwuifier from "uwuifier";

import { State } from "@/types";
import { useCount } from "@/context/CountContext";
import { MutableRefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faShareFromSquare,
  faRepeat,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { usePlausible } from "next-plausible";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import DemoField from "./Field";

enum Translation {
  UWU_TO_ENG = "UWU_TO_ENG",
  ENG_TO_UWU = "ENG_TO_UWU",
}

export default function Demo() {
  const { onUwuified } = useCount();

  const uwuifier = new Uwuifier();

  const [typed, setTyped] = useState(false);
  const [state, setState] = useState<State>(State.IDLE);
  const [error, setError] = useState("");

  // prettier-ignore
  const [input, setInput] = useState("According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground.");
  const [output, setOutput] = useState(uwuifier.uwuifySentence(input));

  const [translation, setTranslation] = useState<Translation>(
    Translation.ENG_TO_UWU,
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

        if (translation === Translation.UWU_TO_ENG) {
          const url =
            "https://rqautahsvsoneozemjth.supabase.co/functions/v1/un-uwuifier";

          const body = JSON.stringify({ input: inputTrimmed });
          const method = "POST";
          const headers = { "Content-Type": "application/json" };

          const response = await fetch(url, { body, method, headers });
          const responseJSON = await response.json();

          if (responseJSON.error) {
            setError(responseJSON.error);
            setState(State.ERROR);

            return;
          }

          setState(State.SUCCESS);
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
      setState(State.LOADING);
    }
  }

  function handleSwitch() {
    const updated =
      translation === Translation.ENG_TO_UWU
        ? Translation.UWU_TO_ENG
        : Translation.ENG_TO_UWU;

    setState(State.SUCCESS);
    setTranslation(updated);

    const copy = input;

    setInput(output);
    setOutput(copy);
  }

  return (
    <div className={styles.demo}>
      <DemoField
        id="input"
        label="Input"
        value={input}
        language={translation === Translation.ENG_TO_UWU ? "English" : "UwU"}
        onChange={handleInput}
      />

      <DemoField
        id="output"
        label="Output"
        error={error}
        state={state}
        value={output}
        language={translation === Translation.ENG_TO_UWU ? "UwU" : "English"}
        readonly={true}
        headerButtons={[
          <button
            key={0}
            onClick={handleSwitch}
            className={styles.demo__switch}
          >
            <FontAwesomeIcon
              icon={faRepeat}
              className={styles.demo__switch__icon}
            />
          </button>,
          <button
            key={0}
            onClick={handleSwitch}
            className={styles.demo__switch}
          >
            <FontAwesomeIcon
              icon={faGear}
              className={styles.demo__switch__icon}
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
