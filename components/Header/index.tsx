"use client";

import React from "react";
import Uwuifier from "uwuifier";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState } from "react";
import { formatNumber } from "@/helper";
import { useEffect, useRef } from "react";

type HeaderProps = {
  offset: number;
  initial: number;
  personal: number;
};

export default function Header({ offset, initial, personal }: HeaderProps) {
  const supabase = createClientComponentClient();
  const uwuifier = new Uwuifier();

  const [count, setCount] = useState(initial);

  const startSentence = uwuifier.uwuifySentence("And ");
  const endSentence = uwuifier.uwuifySentence(" of those were your fault!");

  const reference = useRef(offset);

  useEffect(() => {
    // Adjust the offset to prevent double counting
    reference.current = offset;
  }, [offset]);

  async function subscribeStatistics() {
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          table: "statistics",
          schema: "public",
        },
        (payload) => {
          setCount(payload.new.uwuified_sentence - reference.current);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }

  useEffect(() => {
    subscribeStatistics();
  }, []);

  return (
    <h2>
      {startSentence} {formatNumber(count)} {endSentence}
    </h2>
  );
}
