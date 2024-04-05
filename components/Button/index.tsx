"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import React from "react";

type ButtonProps = {
  href?: string;
  icon?: IconDefinition;
  label?: string;
  color?: "yellow" | "grey";
  className?: string;
};

const Button = ({
  href,
  icon,
  label,
  color = "grey",
  className,
}: ButtonProps) => {
  const buttonClass =
    color === "yellow"
      ? `${styles.button} ${styles.button__yellow} ${className}`
      : `${styles.button} ${className}`;

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

  // Conditionally render <a> or <button>
  if (href) {
    return (
      <a className={buttonClass} href={href} target="_blank">
        {buttonContent}
      </a>
    );
  }

  return <button className={buttonClass}>{buttonContent}</button>;
};

export default Button;
