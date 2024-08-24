/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");
const { withSentryConfig } = require("@sentry/nextjs");

// Cut off at sentry.io
const reportURL = process.env.NEXT_PUBLIC_SENTRY_REPORT;
const reportURLStripped = `${reportURL.split("sentry.io")[0]}sentry.io`;

const contentSecurityPolicy = `
  img-src 'self' data: blob:;
  font-src 'self' data:;
  style-src 'self' 'unsafe-inline';
  worker-src 'self' blob:;
  object-src 'none';
  script-src 'self' blob: 'unsafe-inline' 'unsafe-eval';
  connect-src 'self' data: ${reportURLStripped} wss://rqautahsvsoneozemjth.supabase.co https://rqautahsvsoneozemjth.supabase.co;
  report-to csp-endpoint;
  report-uri ${reportURLStripped};
  upgrade-insecure-requests;
`;

const reportTo = {
  group: "csp-endpoint",
  max_age: 10886400,
  endpoints: [
    {
      url: reportURL,
    },
  ],
};

module.exports = withPlausibleProxy({
  customDomain: "https://plausible.hedium.nl",
})(
  withSentryConfig(
    {
      async headers() {
        return [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Content-Security-Policy",
                value: contentSecurityPolicy.replace(/\n/g, ""),
              },
              {
                key: "Report-To",
                value: JSON.stringify(reportTo),
              },
            ],
          },
        ];
      },
    },
    {
      org: process.env.NEXT_PUBLIC_SENTRY_ORG,
      project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,

      silent: !process.env.CI,
      authToken: process.env.SENTRY_AUTH_TOKEN,

      // Enable source maps and React annotations
      widenClientFileUpload: true,
      reactComponentAnnotation: {
        enabled: true,
      },
    },
  ),
);
