import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    sampleRate: 1.0,
    tracesSampleRate: 0.33,
    beforeSend(event) {
      if (
        event.exception ||
        event.level === 'error' ||
        event.level === 'fatal'
      ) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
    },
  });
}
