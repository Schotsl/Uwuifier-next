import { ChangeEvent } from "react";
import { roundNumber } from "@/helper";

import styles from "../ModalGroup.module.scss";

type ModalGroupSpacesProps = {
  faces: number;
  actions: number;
  stutters: number;
  onChange: ([{ name, value }]: { name: string; value: number }[]) => void;
};

export default function ModalGroupSpaces({
  faces,
  actions,
  stutters,
  onChange,
}: ModalGroupSpacesProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = parseFloat(event.target.value);

    let changes: { name: string; value: number }[] = [];

    if (name === "faces") {
      const total = roundNumber(value + actions + stutters, 2);

      if (total > 1) {
        const excess = total - 1;
        const actionsRatio = actions / (actions + stutters);
        const stuttersRatio = stutters / (actions + stutters);

        changes.push({
          name: "actions",
          value: roundNumber(actions - excess * actionsRatio, 2),
        });

        changes.push({
          name: "stutters",
          value: roundNumber(stutters - excess * stuttersRatio, 2),
        });
      }

      changes.push({ name: "faces", value });
    }

    if (name === "actions") {
      const total = roundNumber(faces + value + stutters, 2);

      if (total > 1) {
        const excess = total - 1;
        const facesRatio = faces / (faces + stutters);
        const stuttersRatio = stutters / (faces + stutters);

        changes.push({
          name: "faces",
          value: roundNumber(faces - excess * facesRatio),
        });

        changes.push({
          name: "stutters",
          value: roundNumber(stutters - excess * stuttersRatio),
        });
      }

      changes.push({ name: "actions", value });
    }

    if (name === "stutters") {
      const total = roundNumber(faces + actions + value, 2);

      if (total > 1) {
        const excess = total - 1;
        const facesRatio = faces / (faces + actions);
        const actionsRatio = actions / (faces + actions);

        changes.push({
          name: "faces",
          value: roundNumber(faces - excess * facesRatio),
        });

        changes.push({
          name: "actions",
          value: roundNumber(actions - excess * actionsRatio),
        });
      }

      changes.push({ name: "stutters", value });
    }

    onChange(changes);
  };

  return (
    <div className={styles.group}>
      <div className={styles.group__input}>
        <label className={styles.group__input__label}>Faces</label>
        <p className={styles.group__input__description}>
          Adjusts how frequently cute emoticon faces, like UwU, appear in the
          text. Increase the slider for more frequent faces, adding a playful
          touch.
        </p>

        <input
          type="range"
          min="0"
          max="1"
          name="faces"
          step="0.001"
          value={faces}
          onChange={handleChange}
          className={styles.group__input__slider}
        />
      </div>

      <div className={styles.group__divider}></div>

      <div className={styles.group__input}>
        <label className={styles.group__input__label}>Actions</label>
        <p className={styles.group__input__description}>
          Determines the likelihood of inserting playful actions, such as
          notices buldge, into the text. Higher settings result in more actions,
          enhancing the whimsical aspect.
        </p>

        <input
          type="range"
          min="0"
          max="1"
          name="actions"
          step="0.001"
          value={actions}
          onChange={handleChange}
          className={styles.group__input__slider}
        />
      </div>

      <div className={styles.group__divider}></div>

      <div className={styles.group__input}>
        <label className={styles.group__input__label}>Stutters</label>
        <p className={styles.group__input__description}>
          Sets the rate at which words start with stutters, like s-s-stutter.
          Moving the slider up increases the frequency of stutters, emphasizing
          the characteristic uwu speech pattern.
        </p>

        <input
          type="range"
          min="0"
          max="1"
          name="stutters"
          step="0.001"
          value={stutters}
          onChange={handleChange}
          className={styles.group__input__slider}
        />
      </div>

      <div className={styles.group__divider}></div>
    </div>
  );
}
