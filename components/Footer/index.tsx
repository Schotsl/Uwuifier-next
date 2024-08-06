import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__list}>
        <li className={styles.footer__list__item}>
          <a
            href="/terms-of-service"
            className={styles.footer__list__item__link}
          >
            Terms of Service
          </a>
        </li>

        <li className={styles.footer__list__item}>/</li>

        <li className={styles.footer__list__item}>
          <a href="/privacy-policy" className={styles.footer__list__item__link}>
            Privacy Policy
          </a>
        </li>
      </ul>
    </footer>
  );
}
