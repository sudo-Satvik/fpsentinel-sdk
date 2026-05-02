import { enqueueEvent } from "./queue";
import { getISOTimestamp } from "../utils/time";

let isTracking = false;
let frameCount = 0;
let lastTime = 0;
let rafId: number;
let lastRecordedFps = -1;

export function startFpsTracking(interval: number = 1000, threshold: number = 2) {
  if (isTracking) return;
  isTracking = true;
  
  if (typeof window === "undefined" || !window.requestAnimationFrame || !window.performance) return;
  
  lastTime = performance.now();

  const loop = (currentTime: number) => {
    frameCount++;
    const delta = currentTime - lastTime;
    
    if (delta >= interval) {
      const fps = Math.round((frameCount * 1000) / delta);
      
      if (lastRecordedFps === -1 || Math.abs(fps - lastRecordedFps) >= threshold) {
        enqueueEvent({
          type: "fps",
          value: fps,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: getISOTimestamp()
        });
        lastRecordedFps = fps;
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    rafId = requestAnimationFrame(loop);
  };
  
  rafId = requestAnimationFrame(loop);
}

export function stopFpsTracking() {
  isTracking = false;
  if (rafId && typeof window !== "undefined") {
    cancelAnimationFrame(rafId);
  }
}
