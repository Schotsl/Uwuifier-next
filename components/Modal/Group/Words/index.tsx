import styles from "../ModalGroup.module.scss";

import { ChangeEvent } from "react";

type ModalGroupWordsProps = {
  words: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function ModalGroupWords({
  words,
  handleChange,
}: ModalGroupWordsProps) {
  return (
    <div className={styles.group}>
      <label className={styles.group__label}>Words</label>

      <p className={styles.group__description}>
        Controls the percentage of words transformed into uwu style. At full
        setting (100%), all eligible words are uwuified, while lower settings
        reduce this effect for subtler changes.
      </p>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        name="words"
        value={words}
        onChange={handleChange}
        className={styles.group__slider}
      />
    </div>
  );
}
