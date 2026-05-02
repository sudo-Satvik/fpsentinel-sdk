import { FPSentinelConfig } from "./types";
import { initQueue } from "./core/queue";
import { startFpsTracking } from "./core/fps";
import { startFrameDropTracking } from "./core/frameDrop";
import { startWebVitalsTracking } from "./core/webVitals";
import { startLongTaskTracking } from "./core/longTasks";
import { getSessionId } from "./utils/uuid";

export * from "./types";

let initialized = false;

/**
 * Initializes the FPSentinel SDK
 * @param config Configuration options
 */
export function initFPSentinel(config: FPSentinelConfig) {
  if (initialized) {
    return;
  }

  const {
    apiKey,
    endpoint = "/api/ingest",
    batchSize = 50,
    batchInterval = 5000,
    trackFps = true,
    trackFrameDrops = true,
    trackWebVitals = true,
    trackLongTasks = true,
    frameDropThreshold = 50,
    fpsReportInterval = 5000,
    fpsChangeThreshold = 2
  } = config;

  if (!apiKey) {
    console.error("FPSentinel requires an apiKey to initialize.");
    return;
  }

  getSessionId();

  initQueue(apiKey, endpoint, batchSize, batchInterval);

  if (trackFps) {
    startFpsTracking(fpsReportInterval, fpsChangeThreshold);
  }

  if (trackFrameDrops) {
    startFrameDropTracking(frameDropThreshold);
  }

  if (trackWebVitals) {
    startWebVitalsTracking();
  }

  if (trackLongTasks) {
    startLongTaskTracking();
  }

  initialized = true;
}
