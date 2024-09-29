import * as Sentry from '@sentry/react';
import { env } from '~/constants/env';

export const logger = {
  error: Sentry.captureException,
  message: Sentry.captureMessage,
};

export const setMonitoringUser = Sentry.setUser;
export const setMonitoringScope = Sentry.withScope;
export const setMonitoringAdditionalData = Sentry.setExtra;

export function initMonitoring({ enabled = true } = {}) {
  if (enabled === false) {
    return;
  }

  Sentry.init({
    enabled: true,
    dsn: env.SENTRY_DSN,
    environment: env.MODE,
    normalizeDepth: 10,

    // last short commit hash (`git rev-parse --short HEAD`)
    release: env.SENTRY_RELEASE,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1,

    // Capture headers and cookies for http requests
    sendDefaultPii: true,

    integrations: [
      Sentry.captureConsoleIntegration({
        levels: ['debug'],
      }),

      Sentry.httpClientIntegration({
        failedRequestTargets: [new RegExp(env.API_URL)],
      }),
    ],
  });
}

if (env.MODE === 'production') {
  // https://docs.sentry.io/product/session-replay/
  import('@sentry/react').then((lazyLoadedSentry) => {
    Sentry.addIntegration(lazyLoadedSentry.replayIntegration());
  });
}
