import * as Sentry from "@sentry/vue";

async function lazyLoadSentryIntegrations() {
    // don't load on server
    if (!process.client) return;

    //@ts-ignore
    const { Replay } = await import("@sentry/vue");
    Sentry.addIntegration(new Replay({
        maskAllText: false,
        blockAllMedia: false,
    }));
}

function getSentryIntegrations() {
    // don't load on server
    if (!process.client) return [];

    const router = useRouter();
    //@ts-ignore
    const browserTracing = new Sentry.BrowserTracing({
      //@ts-ignore
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    });

    return [browserTracing];
}



export default defineNuxtPlugin({
    name: 'sentry',
    parallel: true,
    async setup(nuxtApp) {
        const vueApp = nuxtApp.vueApp;

        const config = useRuntimeConfig();


        Sentry.init({
            app: vueApp,
            dsn: config.public.SENTRY_DSN_PUBLIC ?? null,
            integrations: getSentryIntegrations(),

            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: config.public.SENTRY_TRACES_SAMPLE_RATE as number,

            // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
            // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

            // This sets the sample rate. You may want this to be 100% while
            // in development and sample at a lower rate in production
            replaysSessionSampleRate: config.public.SENTRY_REPLAY_SAMPLE_RATE as number,

            // If the entire session is not sampled, use the below sample rate to sample
            // sessions when an error occurs.
            replaysOnErrorSampleRate: config.public.SENTRY_ERROR_REPLAY_SAMPLE_RATE as number,
        });

        // Lazy-load the replay integration to reduce bundle size
        lazyLoadSentryIntegrations();

    }
});
