# NS-RPC Enhanced

The definitive way to display your Nintendo Switch games in Discord. 🎮

## Features

### Core Features
- Display that you are using your Switch across all of Discord
- Select from an extensive list of games to show off
- Set a custom status message to let everyone know exactly what you're doing
- Pin your favourite games into a quick list
- Experience a clean and organized user interface

### Enhanced Features ✨
- **Add Custom Games**: Paste your own Nintendo Switch games (one per line) directly into the app
- **Remove Games**: Delete any game from the list with a single click
- **Persistent Storage**: All custom games and removals are automatically saved and restored when you restart the app
- **Auto Deduplication**: Duplicate games are automatically removed when adding new titles
- **Improved UI**: Better organized buttons with flexbox layout

## Prerequisites

All you need to get going is some common sense and the [Discord App](https://discordapp.com) installed on the same machine.

Users running Windows 10 or earlier _may_ encounter issues running NS-RPC due to Wails' use of **Microsoft WebView2** on Windows. **If** you do encounter problems, ensure this is installed.

## Installing

Pre-built binaries for Windows, macOS, and Linux are available in the [Releases](https://github.com/druidsareus/NS-RPC/releases) section.

### macOS
- Download `NS-RPC.dmg`
- Extract and drag `NS-RPC.app` to your Applications folder

### Windows
- Download `NS-RPC.exe`
- Run the executable directly

### Linux
- Build from source (see Development section below)

## How to Use

### Adding Custom Games
1. Click the **"Add Custom Games"** button
2. In the dialog, paste your Nintendo Switch game titles (one per line)
3. Click **"Add"** - duplicates are automatically removed
4. Custom games are instantly saved to `~/NS-RPC/custom_games.json`
5. Click **"Back"** to return to the main screen

Example:
```
The Legend of Zelda: Breath of the Wild
Mario Kart 8 Deluxe
Super Smash Bros. Ultimate
```

### Removing Games
1. Click the **"Remove Game"** button
2. Select the game you want to remove from the dropdown
3. Click the **trash icon** to delete it
4. Changes are automatically saved
5. Click **"Back"** to return to the main screen

### Setting Your Status
1. Select a game from the dropdown
2. Enter a custom status (e.g., "Online", "Playing with Friends", "Speed Running")
3. Click **"Play"** to update your Discord status
4. Click **"Idle"** to reset to the home screen

### Managing Pins
1. Select a game and click the **pin icon** to add it to your quick list
2. Click **"Switch Pins"** to view your pinned games
3. Click the pin icon again on a pinned game to remove it

## Data Persistence

### Default Games
- Loaded from the online repository on startup
- Located at: `https://raw.githubusercontent.com/druidsareus/NS-RPC/master/games.json`

### Custom Games & Removals
- Saved to: `~/NS-RPC/custom_games.json` (on macOS/Linux) or `%USERPROFILE%\NS-RPC\custom_games.json` (on Windows)
- Automatically loaded when the app starts
- Persists across app sessions

### Pinned Games
- Saved to: `~/NS-RPC/pinned.json` (on macOS/Linux) or `%USERPROFILE%\NS-RPC\pinned.json` (on Windows)

## Development

This app is built using [Wails](https://wails.io) (🏴󠁧󠁢󠁷󠁬󠁳󠁿 with pride) and [SolidJS](https://solidjs.com).

### Prerequisites
- Go 1.18 or higher
- Node.js and Yarn
- Wails CLI: `go install github.com/wailsapp/wails/v2/cmd/wails@latest`

### Building

Install dependencies:
```bash
cd frontend
yarn install
cd ..
```

Build for your platform:

**macOS (Universal - Intel + Apple Silicon)**
```bash
wails build --platform darwin/universal
```

**macOS (Intel only)**
```bash
wails build --platform darwin/amd64
```

**macOS (Apple Silicon only)**
```bash
wails build --platform darwin/arm64
```

**Windows (64-bit)**
```bash
wails build --platform windows/amd64
```

**Linux (64-bit)**
```bash
wails build --platform linux/amd64
```

The built app will be in `build/bin/`.

## Technical Details

### Backend (Go)
Key functions added for custom games management:
- `AddCustomGames(gameInput string)` - Parse and add new games from user input
- `RemoveGame(title string)` - Remove a game from the list
- `LoadCustomGames()` - Load persisted custom games on startup
- `SaveCustomGames()` - Save custom games to disk

### Frontend (SolidJS/Tailwind)
- Custom games input panel with textarea
- Remove game selection panel with trash icon
- Improved button layout using Tailwind flexbox utilities
- Better state management for UI panels

## What's Rewritten?

The original NS-RPC used Electron and was codebase that the original author wasn't happy maintaining. This version uses Wails instead, which the author prefers for its lighter footprint and simpler development experience. The frontend now uses SolidJS for its speed and lack of jank compared to React.

## Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request!

## Support

Need help? Join the [Discord server](https://discord.gg/StDcdMu) for support and to chat with other users.

## License

See LICENSE file for details.

---

**Original Project**: [Da532/NS-RPC](https://github.com/Da532/NS-RPC) by AlmightyCX  
**Enhanced Fork**: Custom games management and improved UI
