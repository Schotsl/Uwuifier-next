"use client";

import styles from "./IntroDemo.module.scss";

import React from "react";
import DemoField from "./Field";

import { Language } from "@/types";
import { setValue } from "@/helper";
import { useCount } from "@/context/CountContext";
import { useRouter } from "next/navigation";
import { useUwuifier } from "@/context/UwuifierContext";
import { usePathname, useSearchParams } from "next/navigation";
import { MutableRefObject, useState, useEffect, useRef } from "react";
import { faGear, faRepeat } from "@fortawesome/free-solid-svg-icons";
import DemoCopy from "./Copy";
import DemoShare from "./Share";
import { usePlausible } from "next-plausible";
import Icon from "../Icon";

export default function Demo() {
  const {
    error,
    state,
    language,
    uwuifySentence,
    switchLanguage,
    translateSentence,
  } = useUwuifier();

  const { onUwuified } = useCount();

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const plausible = usePlausible();

  // prettier-ignore
  const exampleNormal = `According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground.`;
  const exampleUwuified = uwuifySentence(exampleNormal);

  const [input, setInput] = useState(
    language === Language.ORG_TO_UWU ? exampleNormal : exampleUwuified,
  );

  const [output, setOutput] = useState(
    language === Language.ORG_TO_UWU ? exampleUwuified : exampleNormal,
  );

  const [typed, setTyped] = useState(false);

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
  }

  function handleLanguage() {
    const tempInput = input;
    const tempOutput = output;

    setInput(tempOutput);
    setOutput(tempInput);

    switchLanguage();

    plausible(`Switched language to ${language}`);
  }

  function handleModal() {
    const updated = setValue(params, "modal", true);

    router.replace(`${pathname}?${updated.toString()}`, { scroll: false });

    plausible("Open settings");
  }

  useEffect(() => {
    if (language !== Language.ORG_TO_UWU) {
      return;
    }

    // Re-uwuify the input whenever the Uwuifier settings change
    const output = uwuifySentence(input);

    setOutput(output);
  }, [uwuifySentence]);

  return (
    <div className={styles.demo}>
      <DemoField
        id="input"
        label="Input"
        value={input}
        language={language === Language.ORG_TO_UWU ? "Original" : "UwU"}
        onChange={awaitTranslation}
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
          <Icon
            key={"switch"}
            icon={faRepeat}
            aria={
              language === Language.ORG_TO_UWU
                ? "Switch to UwU"
                : "Switch to Original"
            }
            onClick={handleLanguage}
            className={styles.demo__switch}
          />,
          <Icon
            key={"settings"}
            icon={faGear}
            aria="Open settings"
            onClick={handleModal}
            className={styles.demo__switch}
          />,
        ]}
        footerButtons={[
          <DemoCopy key={0} output={output} />,
          <DemoShare key={1} output={output} />,
        ]}
      />
    </div>
  );
}
