# GLSL Live Editor

**GLSL Live Editor** is a minimal WebGL-based tool for writing and previewing GLSL shaders in real-time, directly in the browser.

## Features

- Live fragment shader editing
- Basic vertex shader setup
- Real-time WebGL rendering
- Built-in uniforms: `uTime`, `uResolution`, `uMouse`

## Files

- `editor.html` – main page with the UI and canvas  
- `editor.js` – handles editor input and debounce  
- `renderer.js` – compiles shaders, sets uniforms, renders  
- `editor.css` – styling  
- `README.md` – this file  

## Usage

1. Start a local HTTP server (e.g. with Python):
   ```bash
   python -m http.server 8000
   ```
2. Open `http://localhost:8000/editor.html` in a browser.
3. Write GLSL in the editor and see the result instantly.

## License

MIT License
