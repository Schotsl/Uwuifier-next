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
import { formatNumber } from "@/helper";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";

type DemoProps = {
  onUwuified: () => void;
};

export default function Demo({ onUwuified }: DemoProps) {
  const [output, setOutput] = useState("");
  const [typed, setTyped] = useState(false);
  const [input, setText] = useState(
    "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground."
  );

  const plausible = usePlausible();
  const uwuifier = new Uwuifier();

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
    timeout.current = setTimeout(() => {
      // Only increase the counter if the input is not empty
      const inputTrimmed = input.trim();
      const inputLength = inputTrimmed.length;

      if (inputLength > 0) {
        onUwuified();

        plausible("Uwuified sentence");
      }
    }, 1000);

    // Clear the timer on unmount or if the input changes
    return () => clearTimeout(timeout.current!);
  }, [input]);

  useEffect(() => {
    const uwuified = uwuifier.uwuifySentence(input);

    setOutput(uwuified);
  }, [input]);

  function handleInput(text: string) {
    setTyped(true);
    setText(text);
  }

  function handleFocus() {
    if (typed) {
      return;
    }

    setText("");
  }

  return (
    <div className={styles.demo}>
      <div className={styles.demo__wrapper}>
        <label className={styles.demo__wrapper__label} htmlFor="input">
          Input
        </label>
        <textarea
          id="input"
          value={input}
          onFocus={handleFocus}
          onChange={(e) => handleInput(e.target.value)}
          className={styles.demo__wrapper__input}
        />
      </div>

      <div className={styles.demo__wrapper}>
        <label className={styles.demo__wrapper__label} htmlFor="output">
          Output
        </label>

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

        <textarea
          id="output"
          value={output}
          className={styles.demo__wrapper__input}
          readOnly
        />

        <menu className={styles.demo__wrapper__buttons}>
          <Button icon={faShareFromSquare} />
          <Button icon={faCopy} label="Share text" />
        </menu>
      </div>
    </div>
  );
}
