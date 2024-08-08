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
import { SpeedInsights } from "@vercel/speed-insights/next";
import { UwuifierProvider } from "@/context/UwuifierContext";
import Footer from "@/components/Footer";

config.autoAddCss = false;

const url = new URL("https://uwuifier.com/");
const alt = "Uwuifier banner of an exploding face";
const title = "Uwuifier Translator";
const image = "https://uwuifier.com/banner-1200x630.png";
const description = `Discover the ultimate app and website to transform your text with fun and cute uwu and owo styles. Uwuifier, also known as the Owoifier Translator, is the most advanced uwu and owo text generator on the web. Customize your translations to convert any text, sentence, or word into adorable, stutter-filled, and emotive phrases. Excluding URLs and @mentions, this tool provides a wide range of kawaii options. Plus, it offers an un-uwuifier feature to filter and revert any annoying uwuified texts from your friends back to normal. Perfect for all your weeb and playful text transformation needs!`;

export const metadata: Metadata = {
  title,
  keywords: [
    "uwuify",
    "owoify",
    "uwuifier",
    "owoifier",
    "uwu generator",
    "owo generator",
    "kawaii text",
    "cute text generator",
    "uwu filter",
    "owo filter",
    "text to uwu",
    "text to owo",
    "uwu translator",
    "owo translator",
    "un-uwuifier",
  ],
  description,
  metadataBase: url,

  openGraph: {
    url,
    type: "website",
    title,
    images: [{ url: image, alt, width: 1200, height: 630 }],
    locale: "en_US",
    siteName: title,
    description,
  },

  authors: [{ name: "Sjors van Holst", url: "https://sjorsvanholst.nl" }],
};

const supabase = createServerComponentClient({ cookies });
const openSans = Open_Sans({
  weight: ["400", "700", "600"],
  subsets: ["latin"],
});

async function loadStatistics() {
  try {
    const { data, error } = await supabase
      .from("statistics")
      .select("uwuified_sentence")
      .single();

    if (error) {
      throw error;
    }

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
        <UwuifierProvider>
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
            <body>
              {children}
              <Footer />

              {/* This has to be placed in the body */}
              <SpeedInsights />
            </body>
          </html>
        </UwuifierProvider>
      </CountProvider>
    </PlausibleProvider>
  );
}
