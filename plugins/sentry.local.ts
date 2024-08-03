import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const {
    public: { sentry },
  } = useRuntimeConfig();

  if (!sentry.dsn) {
    return;
  }

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: sentry.dsn,
    environment: sentry.environment,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 0.2,
    tracePropagationTargets: [
      "localhost",
      "http://localhost:3000",
      "https://marinabot.com.br",
    ],

    replaysSessionSampleRate: 0.5,
    replaysOnErrorSampleRate: 0.5,
  });
});
