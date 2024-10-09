"use client";

import image from "@/public/side.webp";
import styles from "./IntroHeader.module.scss";

import Image from "next/image";
import React from "react";
import Button from "@/components/Button";
import Uwuifier from "uwuifier";
import HeaderSpinner from "./Spinner";

import { useCount } from "@/context/CountContext";
import { formatNumber } from "@/helper";
import {
  faAppStoreIos,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";

import { usePlausible } from "next-plausible";

export default function Header() {
  const { personal, global, globalLoading, personalLoading } = useCount();

  const uwuifier = new Uwuifier();
  const plausible = usePlausible();

  const startSentence = uwuifier.uwuifySentence("And ");
  const endSentence = uwuifier.uwuifySentence(" of those were your fault!");

  return (
    <header className={styles.header}>
      <Image
        src={image}
        alt="Uwuifier"
        sizes="(max-width: 600px) 84px, 244px"
        priority={true}
        className={styles.header__image}
      />

      <div className={styles.header__content}>
        <h1 className={styles.header__content__title}>
          This month we&apos;ve <b>Uwuified</b> over{" "}
          <div className={styles.header__content__title__loader}>
            {/* TODO: This needs cleaning up */}
            {globalLoading ? (
              <span className={styles.header__content__title__loader__blur}>
                {formatNumber(99999)}
              </span>
            ) : (
              <span className={styles.header__content__title__loader__normal}>
                {formatNumber(global)}
              </span>
            )}

            {globalLoading && <HeaderSpinner />}
          </div>{" "}
          sentences!
        </h1>

        <h2 className={styles.header__content__subtitle}>
          {startSentence}{" "}
          <div className={styles.header__content__subtitle__loader}>
            {personalLoading ? (
              <span className={styles.header__content__subtitle__loader__blur}>
                {formatNumber(999)}
              </span>
            ) : (
              <span
                className={styles.header__content__subtitle__loader__normal}
              >
                {formatNumber(personal)}
              </span>
            )}

            {personalLoading && <HeaderSpinner small />}
          </div>{" "}
          {endSentence}
        </h2>

        <div className={styles.header__content__buttons}>
          <Button
            icon={faAppStoreIos}
            aria="Get on the App Store"
            href="https://apps.apple.com/us/app/uwuifier/id1623454749"
            label="Get on the App Store"
            color="yellow"
            onClick={() => plausible("App Store viewed")}
            className={styles.header__content__buttons__button}
          />

          <Button
            icon={faGooglePlay}
            aria="Get on the Play Store"
            href="https://play.google.com/store/apps/details?id=com.sjorsvanholst.uwuifier"
            label="Get on the Play Store"
            color="yellow"
            onClick={() => plausible("Play Store viewed")}
            className={styles.header__content__buttons__button}
          />
        </div>
      </div>
    </header>
  );
}
