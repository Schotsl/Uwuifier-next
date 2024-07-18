"use client";

import styles from "./IntroDemo.module.scss";

import Link from "next/link";
import React from "react";
import { useUwuifier } from "@/context/UwuifierContext";

import { State } from "@/types";
import { setValue } from "@/helper";
import { useCount } from "@/context/CountContext";
import { MutableRefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useSearchParams } from "next/navigation";
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
import { useRouter } from "next/navigation";

enum Translation {
  UWU_TO_ORG = "UWU_TO_ORG",
  ORG_TO_UWU = "ORG_TO_UWU",
}

export default function Demo() {
  const { uwuifySentence } = useUwuifier();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const mode = params.get("mode");

  const translation =
    mode === "eng-to-uwu" ? Translation.ORG_TO_UWU : Translation.UWU_TO_ORG;

  const { onUwuified } = useCount();

  const [typed, setTyped] = useState(false);
  const [state, setState] = useState<State>(State.IDLE);
  const [error, setError] = useState("");

  // prettier-ignore
  const [input, setInput] = useState("According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground.");
  const [output, setOutput] = useState(uwuifySentence(input));

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

        if (translation === Translation.UWU_TO_ORG) {
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

    //   if (translation === Translation.ORG_TO_UWU) {
    //     const uwuified = uwuifier.uwuifySentence(input);

    //     setOutput(uwuified);
    //   } else {
    //     setState(State.LOADING);
    //   }
  }

  useEffect(() => {
    if (translation === Translation.UWU_TO_ORG) {
      return;
    }

    const uwuified = uwuifySentence(input);

    setOutput(uwuified);
  }, [input, translation]);

  useEffect(() => {
    setState(State.SUCCESS);

    const copy = input;

    setInput(output);
    setOutput(copy);
  }, [translation]);

  const handleChange = (name: string, value?: string | number | boolean) => {
    const updated = setValue(params, name, value);
    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.demo}>
      <DemoField
        id="input"
        label="Input"
        value={input}
        language={translation === Translation.ORG_TO_UWU ? "Original" : "UwU"}
        onChange={handleInput}
      />

      <DemoField
        id="output"
        label="Output"
        error={error}
        state={state}
        value={output}
        language={translation === Translation.ORG_TO_UWU ? "UwU" : "Original"}
        readonly={true}
        headerButtons={[
          <button
            key={"switch"}
            className={styles.demo__switch}
            onClick={() =>
              handleChange(
                "mode",
                translation === Translation.ORG_TO_UWU
                  ? Translation.UWU_TO_ORG
                  : Translation.ORG_TO_UWU
              )
            }
          >
            <FontAwesomeIcon
              icon={faRepeat}
              className={styles.demo__switch__icon}
            />
          </button>,
          <button
            key={"settings"}
            onClick={() => handleChange("modal", true)}
            className={styles.demo__switch}
          >
            <FontAwesomeIcon
              icon={faGear}
              className={styles.demo__switch__icon}
            />
          </button>,
        ]}
        footerButtons={[
          <Button key={0} icon={faCopy} />,
          <Button key={1} icon={faShareFromSquare} label="Share text" />,
        ]}
      />
    </div>
  );
}
