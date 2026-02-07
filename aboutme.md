# ⟁ PulseQuest

**PulseQuest** is a minimalist, atmospheric navigation game built for the web. Players must guide a boat through a dense fog to find a hidden beacon, relying on limited vision, procedural audio, and haptic feedback.

## ⛵ Game Mechanics

- **The Fog**: You can only see tiles within a 2-unit radius of your boat. Visibility is a key challenge.
- **Scanning**: Use the **Sonar Scan** (S) to reveal the tile types directly ahead, to your left, and to your right.
- **Stress & Hazards**: 
  - **Empty Water (E)**: Safe passage.
  - **Walls (W)**: Solid obstacles. Hitting one triggers a physical thud.
  - **Hazards (H)**: Treacherous areas. Entering one increases your **Stress**.
  - **Reset**: If your stress reaches **3**, your boat is overwhelmed and you are reset to the starting position.
- **The Beacon (B)**: Your ultimate objective. Finding the beacon (🗼) wins the level.

## ⌨️ Controls

| Action | Keyboard | UI Button |
| :--- | :--- | :--- |
| **Move Forward** | `W` or `ArrowUp` | ⛵ Move |
| **Turn Left** | `A` or `ArrowLeft` | ◀ |
| **Turn Right** | `D` or `ArrowRight` | ▶ |
| **Scan** | `S` or `Shift` | ◎ Scan |
| **Recap** | `R` | ↻ Recap |
| **Quick Start/Reset**| `Enter` | Tap Overlay |

## 🛠️ Technical Details

VibeQuest is a "no-asset" game, meaning it uses no external audio files or complex sprite sheets, keeping its footprint extremely small.

- **Procedural Audio**: All sound effects (sonar pings, engine hums, hazard buzzes) are synthesized in real-time using the **Web Audio API**.
- **Audio-Based Haptics**: On mobile devices, the game uses low-frequency audio waves to create physical vibrations through the speaker, bypassing traditional haptic API limitations on certain platforms.
- **Spectator Mode**: Can be toggled to reveal the entire map for testing or demo purposes.
- **Training Mode**: Allows players to familiarize themselves with the specific audio and haptic signatures of each tile type.

---
*Created for TartanHacks.*
