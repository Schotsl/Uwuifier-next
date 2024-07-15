import styles from "../ModalGroup.module.scss";

import { ChangeEvent } from "react";

type ModalGroupExclamationsProps = {
  exclamations: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function ModalGroupExclamations({
  exclamations,
  handleChange,
}: ModalGroupExclamationsProps) {
  return (
    <div className={styles.group}>
      <label className={styles.group__label}>Exclamations</label>
      <p className={styles.group__description}>
        Modifies how often standard exclamations are replaced with more
        expressive alternatives from the Uwuifier&apos;s array. A higher setting
        leads to more varied and expressive exclamations.
      </p>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        name="exclamations"
        value={exclamations}
        onChange={handleChange}
        className={styles.group__slider}
      />
    </div>
  );
}
