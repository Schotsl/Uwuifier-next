"use client";

import styles from "./IntroDemo.module.scss";

import React from "react";
import Button from "@/components/Button";
import DemoField from "./Field";

import { Language } from "@/types";
import { setValue } from "@/helper";
import { useCount } from "@/context/CountContext";
import { useRouter } from "next/navigation";
import { useUwuifier } from "@/context/UwuifierContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useSearchParams } from "next/navigation";
import { MutableRefObject, useState, useEffect, useRef } from "react";
import {
  faCheckSquare,
  faCopy,
  faGear,
  faRepeat,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import DemoCopy from "./Copy";
import DemoShare from "./Share";
import { usePlausible } from "next-plausible";

export default function Demo() {
  const { translateSentence, error, state, language, updateTranslation } =
    useUwuifier();

  const { onUwuified } = useCount();

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const plausible = usePlausible();

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

  function handleInput(input: string) {
    awaitTranslation(input);
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

    plausible(`Switched language to ${language}`);
  }

  function handleModal() {
    const updated = setValue(params, "modal", true);

    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });

    plausible("Open settings");
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
            onClick={handleLanguage}
            className={styles.demo__switch}
          >
            <FontAwesomeIcon
              icon={faRepeat}
              className={styles.demo__switch__icon}
            />
          </button>,
          <button
            key={"settings"}
            onClick={handleModal}
            className={styles.demo__switch}
          >
            <FontAwesomeIcon
              icon={faGear}
              className={styles.demo__switch__icon}
            />
          </button>,
        ]}
        footerButtons={[
          <DemoCopy key={0} output={output} />,
          <DemoShare key={1} output={output} />,
        ]}
      />
    </div>
  );
}
