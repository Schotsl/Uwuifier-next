"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import React from "react";

type ButtonProps = {
  icon?: IconDefinition;
  label?: string;
  color?: "yellow" | "grey";
};

export default function Button({ icon, label, color = "grey" }: ButtonProps) {
  const buttonClass =
    color === "yellow"
      ? `${styles.button} ${styles.button__yellow}`
      : `${styles.button}`;

  return (
    <button className={buttonClass}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ color: "inherit", fontSize: 18 }}
        />
      )}

      {label}
    </button>
  );
}
