/** @type {import('next').NextConfig} */

const { withPlausibleProxy } = require("next-plausible");
const { withSentryConfig } = require("@sentry/nextjs");

const contentSecurityReport = process.env.NEXT_PUBLIC_SENTRY_REPORT;
const contentSecurityPolicy = `
  img-src 'self';
  font-src 'self';
  style-src 'self' 'unsafe-inline';
  worker-src 'self' blob:;
  object-src 'none';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  connect-src 'self' ${contentSecurityReport} wss://rqautahsvsoneozemjth.supabase.co https://rqautahsvsoneozemjth.supabase.co;
  report-to csp-endpoint;
  report-uri ${contentSecurityReport};
  upgrade-insecure-requests;
`;

const reportTo = {
  group: "csp-endpoint",
  max_age: 10886400,
  endpoints: [
    {
      url: contentSecurityReport,
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
      org: "sjors-van-holst-0c97a3b77",
      silent: true,
      release: "1.0.0",
      project: "uwuifier",
    },
    {
      disableLogger: true,
      hideSourceMaps: true,
      transpileClientSDK: true,
      widenClientFileUpload: true,
      automaticVercelMonitors: true,
    },
  ),
);
