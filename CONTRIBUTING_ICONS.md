# Contributing Game Icons to NS-RPC

## How to Add Your Game Icons

### Step 1: Upload Icon to Discord Developer Portal
1. Go to https://discord.com/developers/applications/1507780464306425866
2. Click "Rich Presence" → "Art Assets"
3. Click "Upload Asset"
4. Upload a PNG image (512x512px recommended)
5. Name it with a simple slug format (lowercase, underscores, no special chars)
   - Example: `mario_kart_8_deluxe` or `zelda_botw`
6. Note the asset name

### Step 2: Add to community_assets.json
1. Edit `community_assets.json`
2. Add your game to the `games` object:
   ```json
   "Your Game Title": "your_asset_name"
   ```
3. Keep games alphabetically sorted by title
4. Use exact game titles as they appear in the app

### Step 3: Submit Pull Request
1. Fork the repository
2. Commit your changes
3. Submit a pull request
4. Include which game(s) you added in the description

## Example Contribution

```json
"Balatro": "balatro",
"Bayonetta": "bayonetta",
"Bayonetta 2": "bayonetta_2",
"Bayonetta 3": "bayonetta_3",
"Bayonetta Origins: Cereza and the Lost Demon": "bayonetta_origins"
```

## Guidelines

- **Asset Names**: Use lowercase, underscores for spaces, no special characters
- **Game Titles**: Must match exactly as they appear in the game list
- **Icons**: Should be clear, recognizable game artwork
- **Format**: PNG, 512x512px minimum
- **Originality**: Use official game art or fan art you have rights to share

## Supported Games

Any Nintendo Switch game can be added! Check if your game is already in the list before submitting.

## Questions?

Open an issue if you have questions about contributing!
