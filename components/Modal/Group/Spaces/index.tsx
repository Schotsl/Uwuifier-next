import styles from "../ModalGroup.module.scss";

import { ChangeEvent } from "react";

type ModalGroupSpacesProps = {
  faces: number;
  actions: number;
  stutters: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function ModalGroupSpaces({
  faces,
  actions,
  stutters,
  handleChange,
}: ModalGroupSpacesProps) {
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
          step="0.01"
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
          step="0.01"
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
          step="0.01"
          value={stutters}
          onChange={handleChange}
          className={styles.group__input__slider}
        />
      </div>

      <div className={styles.group__divider}></div>
    </div>
  );
}
