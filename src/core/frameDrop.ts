import { enqueueEvent } from "./queue";
import { getISOTimestamp } from "../utils/time";

let isTracking = false;
let lastFrameTime: number;
let rafId: number;
let threshold = 50;

export function startFrameDropTracking(customThreshold?: number) {
  if (isTracking) return;
  isTracking = true;
  
  if (customThreshold) {
    threshold = customThreshold;
  }

  if (typeof window === "undefined" || !window.requestAnimationFrame || !window.performance) return;
  
  lastFrameTime = performance.now();

  const loop = (currentTime: number) => {
    const delta = currentTime - lastFrameTime;
    
    if (delta > threshold && delta < 1000) {
      enqueueEvent({
        type: "frame_drop",
        value: delta,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: getISOTimestamp()
      });
    }
    
    lastFrameTime = currentTime;
    rafId = requestAnimationFrame(loop);
  };
  
  rafId = requestAnimationFrame(loop);
}

export function stopFrameDropTracking() {
  isTracking = false;
  if (rafId && typeof window !== "undefined") {
    cancelAnimationFrame(rafId);
  }
}
