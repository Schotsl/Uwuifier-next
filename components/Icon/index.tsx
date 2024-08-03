"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Icon.module.scss";
import React from "react";

type IconProps = {
  aria: string;
  icon: IconDefinition;
  className?: string;
  onClick?: () => void;
};

export default function Icon({ aria, icon, className, onClick }: IconProps) {
  const iconClass = `${styles.icon} ${className}`;

  return (
    <button className={iconClass} aria-label={aria} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={styles.icon__inner} />
    </button>
  );
}
