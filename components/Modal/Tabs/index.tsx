import styles from "./ModalTabs.module.scss";

import { useState } from "react";

type ModelTabsProps = {
  active: string;
  onActive: (active: string) => void;
};

export default function ModelTabs({ active, onActive }: ModelTabsProps) {
  return (
    <ul className={styles.tabs}>
      <li
        className={
          active === "words"
            ? `${styles.tabs__tab} ${styles["tabs__tab--active"]}`
            : `${styles.tabs__tab}`
        }
      >
        <button
          className={styles.tabs__tab__button}
          onClick={() => onActive("words")}
        >
          Words
        </button>
      </li>
      <li
        className={
          active === "exclamations"
            ? `${styles.tabs__tab} ${styles["tabs__tab--active"]}`
            : `${styles.tabs__tab}`
        }
      >
        <button
          className={styles.tabs__tab__button}
          onClick={() => onActive("exclamations")}
        >
          Exclamations
        </button>
      </li>
      <li
        className={
          active === "spaces"
            ? `${styles.tabs__tab} ${styles["tabs__tab--active"]}`
            : `${styles.tabs__tab}`
        }
      >
        <button
          className={styles.tabs__tab__button}
          onClick={() => onActive("spaces")}
        >
          Spaces
        </button>
      </li>
    </ul>
  );
}
