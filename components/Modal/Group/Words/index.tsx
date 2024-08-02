import styles from "../ModalGroup.module.scss";

import { ChangeEvent } from "react";

type ModalGroupWordsProps = {
  words: number;
  onChange: (name: string, value: number) => void;
};

export default function ModalGroupWords({
  words,
  onChange,
}: ModalGroupWordsProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const valueParsed = parseFloat(value);

    onChange(name, valueParsed);
  };

  return (
    <div className={styles.group}>
      <div className={styles.group__input}>
        <label className={styles.group__input__label}>Words</label>

        <p className={styles.group__input__description}>
          Controls the percentage of words transformed into uwu style. At full
          setting (100%), all eligible words are uwuified, while lower settings
          reduce this effect for subtler changes.
        </p>

        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          name="words"
          value={words}
          onChange={handleChange}
          className={styles.group__input__slider}
        />
      </div>

      <div className={styles.group__divider}></div>
    </div>
  );
}
