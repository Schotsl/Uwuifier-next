import styles from "../ModalGroup.module.scss";

import { ChangeEvent } from "react";

type ModalGroupExclamationsProps = {
  exclamations: number;
  onChange: ([{ name, value }]: { name: string; value: number }[]) => void;
};

export default function ModalGroupExclamations({
  exclamations,
  onChange,
}: ModalGroupExclamationsProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const valueParsed = parseFloat(value);

    onChange([{ name, value: valueParsed }]);
  };

  return (
    <div className={styles.group}>
      <div className={styles.group__input}>
        <label className={styles.group__input__label}>Exclamations</label>

        <p className={styles.group__input__description}>
          Modifies how often standard exclamations are replaced with more
          expressive alternatives from the Uwuifier&apos;s array. A higher
          setting leads to more varied and expressive exclamations.
        </p>

        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          name="exclamations"
          value={exclamations}
          onChange={handleChange}
          className={styles.group__input__slider}
        />
      </div>

      <div className={styles.group__divider}></div>
    </div>
  );
}
