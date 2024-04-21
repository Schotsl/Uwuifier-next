"use client";

import styles from "./DemoFieldLoader.module.scss";
import React from "react";

export default function DemoFieldLoader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__inner}></div>
    </div>
  );
}
