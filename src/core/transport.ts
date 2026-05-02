import { Payload } from "../types";

export function sendEvents(endpoint: string, payload: Payload) {
  if (!endpoint) return;

  const data = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([data], { type: 'application/json' });
    const success = navigator.sendBeacon(endpoint, blob);
    if (success) return;
  }

  if (typeof fetch !== "undefined") {
    fetch(endpoint, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
    }).catch(() => {});
  }
}
