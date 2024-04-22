"use client";

import styles from "./IntroDemo.module.scss";

import Link from "next/link";
import React from "react";
import Uwuifier from "uwuifier";

import { State } from "@/types";
import { useCount } from "@/context/CountContext";
import { MutableRefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams, usePathname } from "next/navigation";
import {
  faCopy,
  faShareFromSquare,
  faRepeat,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";
import DemoField from "./Field";

enum Translation {
  UWU_TO_ENG = "UWU_TO_ENG",
  ENG_TO_UWU = "ENG_TO_UWU",
}

export default function Demo() {
  const [uwuifier, setUwuifier] = useState(new Uwuifier());

  const params = useSearchParams();

  const mode = params.get("mode");

  const stringFaces = params.get("faces");
  const stringWords = params.get("words");
  const stringActions = params.get("actions");
  const stringStutters = params.get("stutters");
  const stringExclamation = params.get("exclamations");

  const faces = stringFaces ? parseFloat(stringFaces) : 0.5;
  const words = stringWords ? parseFloat(stringWords) : 1;
  const actions = stringActions ? parseFloat(stringActions) : 0.075;
  const stutters = stringStutters ? parseFloat(stringStutters) : 0.1;
  const exclamations = stringExclamation ? parseFloat(stringExclamation) : 0.5;

  const translation =
    mode === "eng-to-uwu" ? Translation.ENG_TO_UWU : Translation.UWU_TO_ENG;

  useEffect(() => {
    const uwuifier = new Uwuifier({
      spaces: {
        faces,
        actions,
        stutters,
      },
      words,
      exclamations,
    });

    setUwuifier(uwuifier);
  }, [words, faces, actions, stutters, exclamations]);

  const { onUwuified } = useCount();

  const [typed, setTyped] = useState(false);
  const [state, setState] = useState<State>(State.IDLE);
  const [error, setError] = useState("");

  // prettier-ignore
  const [input, setInput] = useState("According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground.");
  const [output, setOutput] = useState(uwuifier.uwuifySentence(input));

  // We'll use this over-typed ref to store the timeout
  const timeout: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  // useEffect(() => {
  //   // We don't want too send a event when the app starts
  //   if (!typed) {
  //     return;
  //   }

  //   // Clear any existing timer whenever input changes
  //   if (timeout.current) {
  //     clearTimeout(timeout.current);
  //   }

  //   // Set a new timer for 1 second
  //   timeout.current = setTimeout(async () => {
  //     // Only increase the counter if the input is not empty
  //     const inputTrimmed = input.trim();
  //     const inputLength = inputTrimmed.length;

  //     if (inputLength > 0) {
  //       onUwuified();

  //       if (translation === Translation.UWU_TO_ENG) {
  //         const url =
  //           "https://rqautahsvsoneozemjth.supabase.co/functions/v1/un-uwuifier";

  //         const body = JSON.stringify({ input: inputTrimmed });
  //         const method = "POST";
  //         const headers = { "Content-Type": "application/json" };

  //         const response = await fetch(url, { body, method, headers });
  //         const responseJSON = await response.json();

  //         if (responseJSON.error) {
  //           setError(responseJSON.error);
  //           setState(State.ERROR);

  //           return;
  //         }

  //         setState(State.SUCCESS);
  //         setOutput(responseJSON.output);
  //       }
  //     }
  //   }, 1000);

  //   // Clear the timer on unmount or if the input changes
  //   return () => clearTimeout(timeout.current!);
  // }, [input]);

  async function handleInput(input: string) {
    setTyped(true);
    setInput(input);

    //   if (translation === Translation.ENG_TO_UWU) {
    //     const uwuified = uwuifier.uwuifySentence(input);

    //     setOutput(uwuified);
    //   } else {
    //     setState(State.LOADING);
    //   }
  }

  useEffect(() => {
    if (translation === Translation.UWU_TO_ENG) {
      return;
    }

    const uwuified = uwuifier.uwuifySentence(input);

    setOutput(uwuified);
  }, [input, uwuifier, translation]);

  useEffect(() => {
    setState(State.SUCCESS);

    const copy = input;

    setInput(output);
    setOutput(copy);
  }, [translation]);

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
          <Link
            key={0}
            href={`?mode=${translation === Translation.ENG_TO_UWU ? "uwu-to-eng" : "eng-to-uwu"}`}
            // onClick={handleSwitch}
            className={styles.demo__switch}
          >
            <FontAwesomeIcon
              icon={faRepeat}
              className={styles.demo__switch__icon}
            />
          </Link>,
          <Link
            key={0}
            href="?modal=true"
            // onClick={handleSwitch}
            className={styles.demo__switch}
          >
            <FontAwesomeIcon
              icon={faGear}
              className={styles.demo__switch__icon}
            />
          </Link>,
        ]}
        footerButtons={[
          <Button key={0} icon={faShareFromSquare} />,
          <Button key={1} icon={faCopy} label="Share text" />,
        ]}
      />
    </div>
  );
}
