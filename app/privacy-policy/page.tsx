import styles from "./page.module.scss";

import Header from "@/components/Header";

export default async function Page() {
  return (
    <main className={styles.privacy_policy}>
      <Header />

      <section className={styles.privacy_policy__section}>
        <h2>Privacy Policy</h2>

        <section>
          <h3>Introduction</h3>
          <p>
            I value your privacy and am committed to protecting your personal
            information. This Privacy Policy outlines the types of information I
            collect, how I use it, and the steps I take to ensure your privacy.
          </p>
        </section>

        <section>
          <h3>Information Collection and use</h3>

          <h4>Analytics</h4>
          <p>
            I use Plausible Analytics to collect general usage data such as
            button presses (e.g., “Get on the App Store” or “Share Text”). This
            data is anonymized and stored securely in the EU. I only track the
            count of these actions and do not collect any content or personal
            information.
          </p>

          <h4>Uwuifier Feature</h4>
          <p>
            The “Uwuifier” feature processes all data locally on your device. I
            do not store or cache any data processed through this feature. The
            only information I collect is the count of sentences uwufied. This
            data is anonymized and stored in the EU using Plausible Analytics to
            ensure privacy. I do not track the content of the sentences, only
            the number of times the feature is used.
          </p>

          <h4>Un-uwuifier Feature</h4>
          <p>
            The “Un-uwuifier” feature requires server-side processing using
            neural networks due to its compute-intensive nature. For efficiency,
            I cache the input and output data. The input is used as a key to
            encrypt the output with a random initial vector. This encryption
            ensures that even if the database is compromised, the content
            remains secure and unreadable without the original input. No other
            caching is performed, ensuring your privacy is maintained.
          </p>

          <h4>Error Reporting and Debugging</h4>
          <p>
            I use Sentry for error reporting and debugging. This includes the
            replay feature, which allows me to replay user sessions to identify
            and fix issues. To protect your privacy, all text fields in these
            sessions are blurred out, ensuring that no personal information is
            visible.
          </p>
        </section>

        <section>
          <h3>Data security</h3>
          <p>
            I implement industry-standard security measures to protect your data
            from unauthorized access, alteration, disclosure, or destruction. My
            data processing practices comply with the General Data Protection
            Regulation (GDPR) to ensure your privacy is protected.
          </p>
        </section>

        <section>
          <h3>Third-Party Services</h3>
          <p>
            My use of third-party services (Plausible Analytics and Sentry) is
            governed by their respective privacy policies. I ensure that these
            services adhere to stringent privacy standards and data protection
            regulations.
          </p>
        </section>

        <section>
          <h3>Your Rights</h3>
          <p>
            Since I do not store any personal information, there is no personal
            data for you to request access to, correct, or delete. I ensure that
            all collected data is anonymized and used solely for the purposes
            outlined in this Privacy Policy.
          </p>
        </section>

        <section>
          <h3>Changes to this Privacy Policy</h3>
          <p>
            I may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated revision date. I encourage
            you to review this Privacy Policy periodically to stay informed
            about how I am protecting your information.
          </p>
        </section>

        <section>
          <h3>Contact Me</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact me at{" "}
            <a href="mailto:uwuifier@sjorsvanholst.nl">
              uwuifier@sjorsvanholst.nl
            </a>
            .
          </p>

          <p>
            If there are any additional details or specific legal requirements
            you need included, please let me know!
          </p>
        </section>
      </section>
    </main>
  );
}
