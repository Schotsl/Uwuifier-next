"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Icon.module.scss";
import React from "react";

type IconProps = {
  icon: IconDefinition;
  className?: string;
  onClick?: () => void;
};

export default function Icon({ icon, className, onClick }: IconProps) {
  const iconClass = `${styles.icon} ${className}`;

  return (
    <button className={iconClass} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className={styles.icon__inner} />
    </button>
  );
}
