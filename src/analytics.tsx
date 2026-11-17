import { useEffect } from "react";
import { useLocation } from "react-router";
import posthog from "posthog-js";

const projectKey = import.meta.env.VITE_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_POSTHOG_HOST || "https://eu.i.posthog.com";
const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const analyticsEnabled = Boolean(projectKey) && !isLocalHost;

export function initializeAnalytics() {
  if (!analyticsEnabled) return;

  posthog.init(projectKey, {
    api_host: apiHost,
    defaults: "2026-08-30",
    autocapture: {
      dom_event_allowlist: ["click"],
      element_allowlist: ["a", "button"],
      css_selector_ignorelist: [
        ".ph-no-autocapture",
        "[data-ph-no-autocapture]",
        "form",
        "input",
        "textarea",
        "select",
        "[contenteditable='true']",
      ],
      capture_copied_text: false,
    },
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
  });
}

function isPrivatePath(pathname: string) {
  return /^\/(app|aplikuj|auth)(\/|$)/.test(pathname);
}

export function AnalyticsPageview() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!analyticsEnabled || isPrivatePath(pathname)) return;

    posthog.capture("$pageview", {
      $current_url: `${window.location.origin}/#${pathname}`,
      $title: document.title,
    });
  }, [pathname]);

  return null;
}
