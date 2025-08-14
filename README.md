# GLSL Live Editor

**GLSL Live Editor** is a minimal WebGL-based tool for writing and previewing GLSL shaders in real-time, directly in the browser.

## Features

- Live fragment shader editing with auto-compilation
- Real-time WebGL rendering
- Built-in uniforms: `uTime`, `uResolution`, `uMouse`
- Load/save shader files (.frag, .glsl)
- Tab indentation support
- Dark mode interface

## Files

- `index.html` – main page with the UI and canvas  
- `editor.js` – handles editor input, file operations, and UI  
- `renderer.js` – compiles shaders, sets uniforms, renders  
- `editor.css` – dark mode styling  
- `README.md` – this file  

## Usage

Open the editor directly in your browser:  
[https://zeno-mac.github.io/GLSL-LiveEditor/](https://zeno-mac.github.io/GLSL-LiveEditor/)

## License

MIT License
