import posthog from "posthog-js";

type LogAttributes = Record<string, boolean | number | string>;

function isPostHogConfigured() {
  return Boolean(
    import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN && import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  );
}

export const posthogLog = {
  info(message: string, attributes: LogAttributes) {
    if (isPostHogConfigured()) posthog.logger.info(message, attributes);
  },
};
