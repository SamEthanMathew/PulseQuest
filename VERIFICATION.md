# PulseQuest - Axon Verification Guide

## Quick Verification (Mimics Judging Script)

```bash
# Build and package
npm run build
npm run pack

# Verify size
npm run size

# Local testing (opens http://localhost:8000)
npm run verify
```

## Manual Verification Steps

### 1. Check Compressed Size

```bash
ls -lh pulsequest.tar.br
# Must be < 15KB (15,360 bytes)
```

### 2. Extract Archive

```bash
mkdir test-extraction
cd test-extraction
brotli -d ../pulsequest.tar.br -o pulsequest.tar
tar -xf pulsequest.tar
# Should create index.html in current directory
```

### 3. Serve Locally

```bash
python3 -m http.server 8000
# Open http://localhost:8000 in Android Chrome
```

### 4. Offline Test

1. Open DevTools Network tab
2. Reload page
3. Verify ONLY `index.html` loads (no external requests)
4. Disable network in DevTools
5. Reload - game should still work
6. Test all features: tap controls, distance scan

### 5. Mobile Testing

1. Serve on local network: `python3 -m http.server 8000`
2. Find local IP: `ifconfig` or `ipconfig`
3. Open `http://YOUR_IP:8000` on Android Chrome (Moto g 2025)
4. Test touch controls:
   - Tap left = move forward
   - Tap right = turn right
   - Hold both = distance scan (vibration feedback)
5. Test viewport: rotate device, hide/show address bar
6. Add to home screen for PWA test

## Requirements Checklist

- [ ] Compressed artifact < 15KB (15,360 bytes)
- [ ] Extracts to `index.html` at archive root
- [ ] Loads at `http://localhost:8000`
- [ ] Zero network requests (check DevTools)
- [ ] Fully playable on Android Chrome
- [ ] Touch controls work (tap zones + buttons)
- [ ] Distance scan vibration works (closer = longer buzz)
- [ ] Works offline (airplane mode test)
- [ ] Viewport fits 360×740 minimum (no scrolling)
- [ ] Audio/haptics functional

## Control Scheme

### Tap Zones (Primary)
```
┌─────────────┬─────────────┐
│   TAP LEFT  │  TAP RIGHT  │
│   = MOVE    │  = TURN 90° │
│   FORWARD   │  CLOCKWISE  │
└─────────────┴─────────────┘
     HOLD BOTH = DISTANCE SCAN
```

### Keyboard (Desktop)
- W/↑ = Move forward
- A/← = Turn left  
- D/→ = Turn right
- Shift+D = Toggle debug viewport info

### Fallback Buttons
- ⛵ Move (Tap Left)
- ⟳ Turn (Tap Right)

## Moto g (2025) Specific Tests

**Device Specs:**
- Display: 6.7" LCD, 1604×720 (HD+)
- Viewport: ~360×800 CSS pixels
- Minimum: 360×740 with address bar

**Test Cases:**
1. Initial load: No scrollbars, all UI visible
2. Address bar toggle: Layout adjusts smoothly
3. Portrait/landscape: Transitions cleanly
4. Tap zones: Left/right detection accurate
5. Distance vibration: Shorter when far, longer when close
6. Debug (Shift+D): Shows correct dimensions

## Build Pipeline

```
web/index.html (+ JS files)
  ↓ inline.js
dist/index.html (~26KB)
  ↓ minify.js
dist/index.html (~17KB minified)
  ↓ pack.sh
pulsequest.tar (~19KB)
  ↓ brotli -q 11
pulsequest.tar.br (~6KB compressed)
```

## Troubleshooting

**Size too large?**
- Remove debug readout (saves ~400 bytes)
- Check for leftover console.log statements
- Ensure minification ran successfully

**Network errors in console?**
- Expected! no-network-guard.js blocks all requests
- Only error if it tries to make actual network calls

**Viewport issues?**
- Test in Chrome DevTools mobile emulation first
- Use Shift+D to see debug info
- Check safe-area insets are computed

**Tap zones not working?**
- Ensure `touchstart`/`touchend` events fire
- Check console for JavaScript errors
- Test with fallback buttons first

## Success Criteria

✅ Game loads instantly (< 1s)
✅ No network requests after initial load
✅ Fully playable with tap zones alone
✅ Distance scan vibration intensity correlates to proximity
✅ No scrolling/zooming on mobile
✅ Archive size < 15KB
✅ Works offline in airplane mode
