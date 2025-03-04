# Simulation Input Decks Extension

A Visual Studio Code extension that provides support for simulation input deck files (`.fem` and `.rad`), featuring customizable rulers for precise formatting.

## Features

- Automatic ruler placement for `.fem` files (every 8 characters, up to 160 characters)
- Automatic ruler placement for `.rad` files (every 10 characters, up to 160 characters)
- Language support for `.fem` and `.rad` files

## Installation

1. Download the `.vsix` file from the releases page
2. Open VS Code
3. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
4. Type "Install from VSIX" and select the command
5. Choose the downloaded `.vsix` file

## Configuration

You can customize the ruler positions in your VS Code settings:

1. Open Settings (`Ctrl+,` or `Cmd+,`)
2. Search for "Simulation Input Decks"
3. Modify the arrays for either:
   - `simulationInputDecks.femRulers`: Ruler positions for `.fem` files
   - `simulationInputDecks.radRulers`: Ruler positions for `.rad` files

Default settings:
- `.fem` files: `[8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160]`
- `.rad` files: `[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160]`

## Usage

1. Open or create a file with `.fem` or `.rad` extension
2. Rulers will automatically appear at the configured positions:
   - `.fem` files: Rulers at positions 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160
   - `.rad` files: Rulers at positions 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160

## License

MIT

## Contributing

Feel free to open issues or submit pull requests on the GitHub repository.
