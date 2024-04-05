"use client";

import image from "@/public/side.webp";
import styles from "./IntroHeader.module.scss";

import Image from "next/image";
import React from "react";
import Uwuifier from "uwuifier";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState } from "react";
import { formatNumber } from "@/helper";
import {
  faAppStoreIos,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useRef } from "react";
import Button from "@/components/Button";

type HeaderProps = {
  offset: number;
  initial: number;
  personal: number;
};

export default function Header({ offset, initial, personal }: HeaderProps) {
  const [count, setCount] = useState(initial);

  const reference = useRef(offset);

  const supabase = createClientComponentClient();
  const uwuifier = new Uwuifier();

  const startSentence = uwuifier.uwuifySentence("And ");
  const endSentence = uwuifier.uwuifySentence(" of those were your fault!");

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
    <header className={styles.header}>
      <Image className={styles.header__image} src={image} alt="Uwuifier" />

      <div className={styles.header__content}>
        <h1>
          This month we've <b>Uwuified</b> over {formatNumber(count + offset)}{" "}
          sentences!
        </h1>
        <h2>
          {startSentence} {formatNumber(personal)} {endSentence}
        </h2>

        <div className={styles.header__content__buttons}>
          <Button
            label="Get on the App Store"
            color="yellow"
            icon={faAppStoreIos}
            href="https://apps.apple.com/us/app/uwuifier/id1623454749"
            className={styles.header__content__buttons__button}
          />

          <Button
            label="Get on the Play Store"
            color="yellow"
            icon={faGooglePlay}
            href="https://play.google.com/store/apps/details?id=com.sjorsvanholst.uwuifier"
            className={styles.header__content__buttons__button}
          />
        </div>
      </div>
    </header>
  );
}
