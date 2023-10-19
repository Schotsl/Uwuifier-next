"use client";

import React from "react";
import Uwuifier from "uwuifier";

import { MutableRefObject } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { usePlausible } from "next-plausible";
import { useState } from "react";
import { formatNumber } from "@/helper";
import { useEffect, useRef } from "react";

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
    <div>
      <textarea
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={handleFocus}
      />
      <textarea value={output} readOnly />
    </div>
  );
}
