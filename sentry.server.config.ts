import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DNS,
  debug: false,
  enabled: process.env.NODE_ENV !== "development",
  tracesSampleRate: 1,
});
