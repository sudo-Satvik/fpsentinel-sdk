import { enqueueEvent } from "./queue";
import { getISOTimestamp } from "../utils/time";

let observer: PerformanceObserver | null = null;

export function startLongTaskTracking() {
  if (typeof window === "undefined" || !window.PerformanceObserver) return;

  try {
    observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        enqueueEvent({
          type: "long_task",
          value: entry.duration,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: getISOTimestamp()
        });
      });
    });

    observer.observe({ entryTypes: ["longtask"] });
  } catch (e) {
    // Silent fail if longtask observer not supported
  }
}

export function stopLongTaskTracking() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
