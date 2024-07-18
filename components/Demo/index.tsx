"use client";

import styles from "./IntroDemo.module.scss";

import Link from "next/link";
import React from "react";
import { useUwuifier } from "@/context/UwuifierContext";

import { Language, State } from "@/types";
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

export default function Demo() {
  const { translateSentence, error, state, language, updateTranslation } =
    useUwuifier();

  const { onUwuified } = useCount();

  // prettier-ignore
  const [input, setInput] = useState(`According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground.`);
  const [typed, setTyped] = useState(false);
  const [output, setOutput] = useState("");

  // We'll use this over-typed ref to store the timeout
  const timeout: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  function schedulePlausible() {
    // Clear any existing timer whenever input changes
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async () => {
      // Only increase the counter if the input is not empty
      const inputTrimmed = input.trim();
      const inputLength = inputTrimmed.length;

      if (inputLength > 0) {
        onUwuified();
      }
    }, 1000);
  }

  async function awaitTranslation(input: string) {
    setInput(input);

    // We'll only schedule the plausible event if the user has typed something
    if (typed) {
      schedulePlausible();
    } else {
      setTyped(true);
    }

    const output = await translateSentence(input);

    setOutput(output);

    // Clear the timer on unmount or if the input changes
    return () => clearTimeout(timeout.current!);
  }

  function handleLanguage() {
    const language = Language.ORG_TO_UWU
      ? Language.UWU_TO_ORG
      : Language.ORG_TO_UWU;

    const tempInput = input;
    const tempOutput = output;

    setInput(tempOutput);
    setOutput(tempInput);

    updateTranslation(language);
  }

  function handleInput(input: string) {
    awaitTranslation(input);
  }

  useEffect(() => {
    awaitTranslation(input);
  }, []);

  return (
    <div className={styles.demo}>
      <DemoField
        id="input"
        label="Input"
        value={input}
        language={language === Language.ORG_TO_UWU ? "Original" : "UwU"}
        onChange={handleInput}
      />

      <DemoField
        id="output"
        label="Output"
        error={error}
        state={state}
        value={output}
        language={language === Language.ORG_TO_UWU ? "UwU" : "Original"}
        readonly={true}
        headerButtons={[
          <button
            key={"switch"}
            className={styles.demo__switch}
            onClick={handleLanguage}
          >
            <FontAwesomeIcon
              icon={faRepeat}
              className={styles.demo__switch__icon}
            />
          </button>,
          <button
            key={"settings"}
            // onClick={() => handleChange("modal", true)}
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
