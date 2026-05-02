export type FPSentinelConfig = {
  apiKey: string;
  endpoint?: string;
  batchSize?: number;
  batchInterval?: number;
  trackFps?: boolean;
  trackFrameDrops?: boolean;
  trackWebVitals?: boolean;
  trackLongTasks?: boolean;
  frameDropThreshold?: number;
  fpsReportInterval?: number;
  fpsChangeThreshold?: number;
};

export type EventType = "fps" | "frame_drop" | "lcp" | "cls" | "inp" | "fcp" | "ttfb" | "long_task" | "jank";

export type PerformanceEvent = {
  type: EventType;
  value: number;
  url: string;
  userAgent: string;
  timestamp: string;
};

export type Payload = {
  apiKey: string;
  sessionId: string;
  events: PerformanceEvent[];
};
