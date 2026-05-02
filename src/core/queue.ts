import { PerformanceEvent } from "../types";
import { sendEvents } from "./transport";
import { getSessionId } from "../utils/uuid";

let queue: PerformanceEvent[] = [];
let batchSizeLimit = 10;
let batchInterval = 5000;
let intervalId: ReturnType<typeof setInterval> | null = null;
let currentApiKey = "";
let currentEndpoint = "";

export function initQueue(apiKey: string, endpoint: string, batchSize: number, interval: number) {
  currentApiKey = apiKey;
  currentEndpoint = endpoint;
  batchSizeLimit = batchSize;
  batchInterval = interval;

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(flushQueue, batchInterval);

  if (typeof window !== "undefined") {
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        flushQueue();
      }
    });
  }
}

export function enqueueEvent(event: PerformanceEvent) {
  queue.push(event);
  
  if (queue.length > 500) {
    queue.shift();
  }
}

export function flushQueue() {
  if (queue.length === 0) return;

  const eventsToSend = [...queue];
  queue = [];

  const payload = {
    apiKey: currentApiKey,
    sessionId: getSessionId(),
    events: eventsToSend,
  };

  sendEvents(currentEndpoint, payload);
}
