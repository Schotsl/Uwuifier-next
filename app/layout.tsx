import "./layout.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Metadata } from "next";
import { ReactNode } from "react";

config.autoAddCss = false;

export const dynamic = "force-dynamic";

import PlausibleProvider from "next-plausible";

export const metadata: Metadata = {
  title: "Uwuifier",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PlausibleProvider
      domain="uwuifier.com"
      enabled={true}
      selfHosted={true}
      customDomain="https://plausible.hedium.nl"
    >
      <html lang="en">
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
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#303030" />
        </head>
        <body>{children}</body>
      </html>
    </PlausibleProvider>
  );
}
