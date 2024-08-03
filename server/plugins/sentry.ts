import * as Sentry from "@sentry/node";

const runtimeConfig = useRuntimeConfig();

Sentry.init({
  dsn: runtimeConfig.public.sentryDns,
  environment: runtimeConfig.public.sentryEnv,
});

export default Sentry;
