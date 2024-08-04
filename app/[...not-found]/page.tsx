import Button from "@/components/Button";
import styles from "./page.module.scss";
import Header from "@/components/Header";

import { faHome } from "@fortawesome/free-solid-svg-icons";

export default async function Page() {
  return (
    <main className={styles.not_found}>
      <Header />

      <section className={styles.not_found__section}>
        <h2>404</h2>
        <h3>Oops!</h3>
        <p>
          I&apos;m sorry to say that this page doesn&apos;t exist, but I&apos;ll
          gladly take you back to the home page! 😔
        </p>

        <Button
          href="/"
          icon={faHome}
          label="Go home"
          className={styles.not_found__section__button}
        ></Button>
      </section>
    </main>
  );
}
