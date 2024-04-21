"use client";

import image from "@/public/side.webp";
import styles from "./IntroHeader.module.scss";

import Image from "next/image";
import React from "react";
import Button from "@/components/Button";
import Uwuifier from "uwuifier";

import { useCount } from "@/context/CountContext";
import { formatNumber } from "@/helper";
import {
  faAppStoreIos,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  const { personal, global } = useCount();

  const uwuifier = new Uwuifier();

  const startSentence = uwuifier.uwuifySentence("And ");
  const endSentence = uwuifier.uwuifySentence(" of those were your fault!");

  return (
    <header className={styles.header}>
      <Image className={styles.header__image} src={image} alt="Uwuifier" />

      <div className={styles.header__content}>
        <h1>
          This month we&apos;ve <b>Uwuified</b> over {formatNumber(global)}{" "}
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
