import styles from "./page.module.scss";

import Header from "@/components/Header";

export default async function Page() {
  return (
    <main className={styles.terms_of_service}>
      <Header />

      <section className={styles.terms_of_service__section}>
        <h2>Terms of Service</h2>

        <section>
          <h3>Introduction</h3>
          <p>
            These Terms of Service (“Terms”) govern your use of the Uwuifier
            website, app, and API (collectively, the “Service”). By using the
            Service, you agree to comply with and be bound by these Terms. If
            you do not agree with these Terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h3>Use of the Service</h3>
          <h4>Eligibility</h4>
          <p>
            You must be at least 13 years old to use the Service. By using the
            Service, you represent and warrant that you meet this age
            requirement.
          </p>

          <h4>License</h4>
          <p>
            I grant you a limited, non-exclusive, non-transferable, revocable
            license to use the Service for personal, non-commercial purposes in
            accordance with these Terms.
          </p>
        </section>

        <section>
          <h3>Prohibited Conduct</h3>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal or unauthorized purpose.</li>
            <li>Modify, adapt, hack, or reverse engineer the Service.</li>
            <li>
              Violate any laws in your jurisdiction while using the Service.
            </li>
            <li>
              Interfere with or disrupt the integrity or performance of the
              Service.
            </li>
          </ul>
        </section>

        <section>
          <h4>Intellectual Property</h4>
          <p>
            All content, features, and functionality on the Service, including
            but not limited to text, graphics, logos, and software, are the
            intellectual property of Uwuifier and are protected by applicable
            copyright, trademark, and other intellectual property laws. You may
            not use, reproduce, or distribute any content from the Service
            without my express written permission.
          </p>

          <p>
            The Uwuifier package, available as open-source software, has its own
            license and is not governed by these Terms. Please refer to the
            license included with the Uwuifier package for terms governing its
            use.
          </p>
        </section>

        <section>
          <h4>Limitation of Liability</h4>
          <p>
            To the fullest extent permitted by law, Uwuifier and I shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses, resulting from:
          </p>

          <ul>
            <li>Your use or inability to use the Service.</li>
            <li>
              Any unauthorized access to or use of my servers and/or any
              personal information stored therein.
            </li>
            <li>
              Any bugs, viruses, trojan horses, or the like that may be
              transmitted to or through the Service by any third party.
            </li>
            <li>
              Any errors or omissions in any content or for any loss or damage
              incurred as a result of your use of any content posted, emailed,
              transmitted, or otherwise made available through the Service.
            </li>
          </ul>
        </section>

        <section>
          <h4>Indemnification</h4>

          <p>
            You agree to indemnify, defend, and hold harmless Uwuifier and
            myself from and against any claims, liabilities, damages, losses,
            and expenses, including without limitation reasonable legal and
            accounting fees, arising out of or in any way connected with your
            access to or use of the Service or your violation of these Terms.
          </p>
        </section>

        <section>
          <h4>Changes to These Terms</h4>

          <p>
            I may modify these Terms from time to time. Any changes will be
            posted on this page with an updated revision date. Your continued
            use of the Service after any changes to these Terms constitutes your
            acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h4>Governing Law</h4>

          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of The Netherlands, without regard to its conflict of law
            principles.
          </p>
        </section>

        <section>
          <h3>Contact Me</h3>
          <p>
            If you have any questions or concerns about these Terms, please
            contact me at{" "}
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
