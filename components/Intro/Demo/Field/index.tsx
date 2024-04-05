import React, { ReactNode } from "react";

import Loader from "@/components/Loader";
import styles from "./DenoField.module.scss";

type DemoFieldProps = {
  id: string;
  value: string;
  label: string;
  loading?: boolean;
  readonly?: boolean;
  headerButtons?: ReactNode[];
  footerButtons?: ReactNode[];
  onChange?: (value: string) => void;
};

export default function DemoField({
  id,
  value,
  label,
  loading,
  readonly,
  headerButtons,
  footerButtons,
  onChange,
}: DemoFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.field__label} htmlFor={id}>
        {label}
      </label>

      {headerButtons}

      <div className={styles.field__wrapper}>
        <textarea
          id={id}
          value={value}
          className={
            loading
              ? `${styles.field__wrapper__input} ${styles.field__wrapper__input__loading}`
              : `${styles.field__wrapper__input}`
          }
          readOnly={readonly}
          onChange={(event) => onChange && onChange(event.target.value)}
        />

        {loading && <Loader />}
      </div>

      <menu className={styles.field__buttons}>{footerButtons}</menu>
    </div>
  );
}
