import styles from "./Spinner.module.scss";

type HeaderSpinnerProps = {
  small?: boolean;
};

export default function HeaderSpinner({ small = false }: HeaderSpinnerProps) {
  const spinnerClass = small
    ? `${styles.spinner} ${styles["spinner--small"]}`
    : `${styles.spinner}`;

  return <div className={spinnerClass}></div>;
}
