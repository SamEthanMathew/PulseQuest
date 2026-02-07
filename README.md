# PulseQuest (iOS Branch)

Haptics-first maze exploration game with **native phone vibrations** and **procedural audio**.

## Deployment Options

### Option 1: HTTP Server (Browser Testing)

Quick testing via Python HTTP server - audio works, haptics only on Android browsers.

```bash
# Simple serve
npm run serve
# Then open http://localhost:8000

# Or package into archive first
npm run package:gz
bash scripts/serve.sh vibequest-web.tar.gz
```

### Option 2: Capacitor iOS App (Native Haptics)

Full native app with iPhone Taptic Engine support - requires Mac + Xcode.

```bash
# On Mac:
npm install
npm install -D @capacitor/ios
npx cap add ios
npx cap sync ios
npx cap open ios
# Then build in Xcode
```

## Current Size

| File | Size |
|------|------|
| index.html | ~18.5 KB |
| js/audio.js | ~5.5 KB |
| js/haptics.js | ~2.3 KB |
| **Total** | **~26.3 KB** |

## Controls

| Key | Action |
|-----|--------|
| W / ↑ | Move forward |
| A / ← | Turn left |
| D / → | Turn right |
| S / Shift | Scan |
| R | Recap |
| Enter | Start / Restart |

## Audio & Haptic Feedback

| Event | Sound | Haptic |
|-------|-------|--------|
| Move to empty | Short beep | Light tap |
| Hit wall | Low thud | Error buzz |
| Hit hazard | Warning buzz | Warning pulse |
| Stress reset | Heavy thud | Heavy thud |
| Win (beacon) | Ascending chime | Success pattern |
| Turn L/R | Click | Selection tick |
| Scan | Sonar ping | Medium tap |
| Background | Ocean ambient | — |

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run serve` | Start HTTP server on port 8000 |
| `npm run package:gz` | Create .tar.gz archive |
| `npm run package:br` | Create .tar.br archive (brotli) |
| `npm run package:zst` | Create .tar.zst archive (zstd) |
| `npm run cap:sync` | Sync web assets to native projects |
| `npm run cap:open:ios` | Open iOS project in Xcode |

## Settings

- **Spectator**: Toggle fog of war
- **Demo**: Simplified UI mode  
- **Mute**: Toggle audio
- **Training**: Test individual haptic/audio patterns
