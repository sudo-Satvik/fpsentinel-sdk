import { onLCP, onCLS, onINP, onFCP, onTTFB, Metric } from "web-vitals";
import { enqueueEvent } from "./queue";
import { getISOTimestamp } from "../utils/time";

let isTracking = false;

function handleMetric(metric: Metric) {
  let type: "lcp" | "cls" | "inp" | "fcp" | "ttfb";
  
  switch (metric.name) {
    case "LCP":
      type = "lcp";
      break;
    case "CLS":
      type = "cls";
      break;
    case "INP":
      type = "inp";
      break;
    case "FCP":
      type = "fcp";
      break;
    case "TTFB":
      type = "ttfb";
      break;
    default:
      return;
  }

  enqueueEvent({
    type,
    value: metric.value,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: getISOTimestamp()
  });
}

export function startWebVitalsTracking() {
  if (isTracking) return;
  isTracking = true;
  
  if (typeof window === "undefined") return;

  onLCP(handleMetric);
  onCLS(handleMetric);
  onINP(handleMetric);
  onFCP(handleMetric);
  onTTFB(handleMetric);
}
