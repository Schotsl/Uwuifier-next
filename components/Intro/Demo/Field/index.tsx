import React, { ReactNode } from "react";

import Loader from "@/components/Loader";
import styles from "./DenoField.module.scss";
import { State } from "@/types";

type DemoFieldProps = {
  id: string;
  value: string;
  label: string;
  language: string;

  error?: string;
  state?: State;

  readonly?: boolean;
  headerButtons?: ReactNode[];
  footerButtons?: ReactNode[];
  onChange?: (value: string) => void;
};

export default function DemoField({
  id,
  value,
  label,
  language,
  error = "",
  state = State.SUCCESS,
  readonly,
  headerButtons,
  footerButtons,
  onChange,
}: DemoFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.field__label} htmlFor={id}>
        <div className={styles.field__label__wrapper}>
          {label}

          <label className={styles.field__label__wrapper__language}>
            {language}
          </label>
        </div>
      </label>

      {headerButtons}

      <div className={styles.field__wrapper}>
        <textarea
          id={id}
          value={value}
          className={
            state === State.LOADING || state === State.ERROR
              ? `${styles.field__wrapper__input} ${styles.field__wrapper__input__loading}`
              : `${styles.field__wrapper__input}`
          }
          readOnly={readonly}
          onChange={(event) => onChange && onChange(event.target.value)}
        />

        {state === State.LOADING && <Loader />}
        {state === State.ERROR && (
          <span className={styles.field__wrapper__error}>{error}</span>
        )}
      </div>

      <menu className={styles.field__buttons}>{footerButtons}</menu>
    </div>
  );
}
