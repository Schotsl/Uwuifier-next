import "./layout.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";
import PlausibleProvider from "next-plausible";

import { config } from "@fortawesome/fontawesome-svg-core";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { CountProvider } from "@/context/CountContext";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Uwuifier",
};

const supabase = createServerComponentClient({ cookies });
const openSans = Open_Sans({
  weight: ["400", "700", "600"],
  subsets: ["latin"],
});

async function loadStatistics() {
  try {
    const { data } = await supabase
      .from("statistics")
      .select("uwuified_sentence")
      .single();

    if (!data) {
      return 0;
    }

    return data.uwuified_sentence;
  } catch (error) {
    return 0;
  }
}

function loadPersonal() {
  const store = cookies();

  const personal = store.get("personal")?.value || "0";
  const personalParsed = parseInt(personal);

  return personalParsed;
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const initialTotal = await loadStatistics();
  const initialPersonal = loadPersonal();

  return (
    <PlausibleProvider
      domain="uwuifier.com"
      enabled={true}
      selfHosted={true}
      customDomain="https://plausible.hedium.nl"
    >
      <CountProvider
        initialGlobal={initialTotal}
        initialPersonal={initialPersonal}
      >
        <html lang="en" className={openSans.className}>
          <head>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />

            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />

            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#303030" />
          </head>
          <body>{children}</body>
        </html>
      </CountProvider>
    </PlausibleProvider>
  );
}
