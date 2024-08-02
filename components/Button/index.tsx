"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import React, { useState } from "react";

type ButtonProps = {
  href?: string;
  icon?: IconDefinition;
  label?: string;
  color?: "yellow" | "grey";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  href,
  icon,
  label,
  color = "grey",
  className,
  onClick,
}: ButtonProps) {
  const [active, setActive] = useState(false);

  let buttonClass = `${styles.button} ${className}`;

  if (active) buttonClass += ` ${styles[`button--active`]}`;
  if (color === "yellow") buttonClass += ` ${styles[`button--yellow`]}`;

  const buttonContent = (
    <>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ color: "inherit", fontSize: 18 }}
        />
      )}
      {label}
    </>
  );

  function handleClick() {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 200);

    onClick && onClick();
  }

  return href ? (
    <a
      href={href}
      target="_blank"
      onClick={handleClick}
      className={buttonClass}
    >
      {buttonContent}
    </a>
  ) : (
    <button className={buttonClass} onClick={handleClick}>
      {buttonContent}
    </button>
  );
}
