"use client";

import styles from "./Loader.module.scss";
import React from "react";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__inner}></div>
    </div>
  );
}
