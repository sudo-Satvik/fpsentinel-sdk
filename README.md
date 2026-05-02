<div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px">
<img src="./assets/logo.ico" alt="FPSentinel Logo" width="40" height="40" />
<span style="font-size: 28px; font-weight: bold">FPSentinel</span>
</div>

[![npm version](https://img.shields.io/badge/npm-v1.0.0-darkgreen.svg)](https://www.npmjs.com/package/fpsentinel)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**FPSentinel** is a lightweight, zero-config frontend performance monitoring SDK. Track real-time FPS, detect frame drops, capture Core Web Vitals, and observe long tasks with minimal overhead.

---

## 🚀 Getting Started

### Installation

Install the SDK as a development dependency using your preferred package manager:

```bash
# npm
npm install -D fpsentinel

# pnpm
pnpm add -D fpsentinel

# yarn
yarn add -D fpsentinel
```

### Quick Start

Initialize FPSentinel with your API key. The SDK automatically starts tracking performance metrics and batches them for efficient delivery.

```typescript
import { initFPSentinel } from 'fpsentinel';

initFPSentinel({
  apiKey: 'YOUR_API_KEY',
  endpoint: 'https://api.fpsentinel.com/v1/ingest', // Optional: your ingest endpoint
});
```

> [!TIP]
> You can find your **API Key** in the Projects page of your FPSentinel Dashboard.

---

## ⚙️ Configuration

Customize the SDK behavior with the following options:

```typescript
initFPSentinel({
  apiKey: 'fps_live_...',        // Required: Your project API key
  endpoint: '/api/ingest',       // Custom ingest endpoint (default: '/api/ingest')
  batchSize: 50,                 // Max events per batch (default: 50)
  batchInterval: 5000,           // Send frequency in ms (default: 5000)
  trackFps: true,                // Enable FPS tracking (default: true)
  trackFrameDrops: true,         // Enable frame drop detection (default: true)
  trackWebVitals: true,          // Enable Web Vitals (LCP, CLS, INP, FCP, TTFB)
  trackLongTasks: true,          // Enable JS long task detection
  frameDropThreshold: 50,        // Threshold for frame drop in ms (default: 50)
  fpsReportInterval: 5000,       // FPS calculation window in ms (default: 5000)
  fpsChangeThreshold: 2,         // Only report FPS if changed by X (default: 2)
});
```

### Options API

| Option | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | — | **Required**. Your project API key. |
| `endpoint` | `string` | `'/api/ingest'` | The URL where performance data is sent. |
| `batchSize` | `number` | `50` | Maximum number of events to include in one API call. |
| `batchInterval` | `number` | `5000` | How often to flush the event queue (in milliseconds). |
| `trackFps` | `boolean` | `true` | Whether to monitor Frames Per Second. |
| `trackFrameDrops` | `boolean` | `true` | Whether to detect individual dropped frames (jank). |
| `trackWebVitals` | `boolean` | `true` | Capture LCP, CLS, INP, FCP, and TTFB. |
| `trackLongTasks` | `boolean` | `true` | Detect JavaScript execution blocking the main thread. |
| `frameDropThreshold`| `number` | `50` | Delta in ms to consider a frame "dropped". |
| `fpsReportInterval` | `number` | `5000` | Interval to calculate and report average FPS. |
| `fpsChangeThreshold`| `number` | `2` | Minimum FPS delta required to trigger a report. |

---

## ✨ Features

### 📊 FPS Tracking
Monitors the smoothness of your UI by calculating Frames Per Second using `requestAnimationFrame`. To save bandwidth, it only reports when a "meaningful change" (default ±2 FPS) is detected.

### 📉 Frame Drop & Jank
Detects individual frames that take longer than your threshold (default 50ms) to render. High frame drop counts correlate directly with perceived "jank" or "stutter".

### ⚡ Core Web Vitals
Automatically captures critical performance metrics as defined by Google:
- **LCP**: Largest Contentful Paint
- **CLS**: Cumulative Layout Shift
- **INP**: Interaction to Next Paint
- **FCP**: First Contentful Paint
- **TTFB**: Time to First Byte

### 🧵 Long Tasks
Uses the `PerformanceObserver` API to detect when JavaScript execution blocks the main thread for more than 50ms, helping you identify performance bottlenecks in your code.

### 📦 Event Batching
Events are stored in memory and dispatched every 5 seconds (configurable) using `navigator.sendBeacon` (with a `fetch` fallback). This ensures zero impact on your application's main thread and page load performance.

---

## 🛡️ License

MIT © [FPSentinel](https://fpsentinel.com)
