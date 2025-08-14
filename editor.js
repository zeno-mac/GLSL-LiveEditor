import { startShader } from "./renderer.js";

const vertexShaderSource = `
  attribute vec2 aPosition;
  varying vec2 vUV;

  void main() {
    vUV = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const standardFragmentShaderSource =
  `precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUV;

void main() {
vec2 uv = vUV;
vec3 col = 0.5 + 0.5 * cos(uTime + uv.xyx + vec3(0, 2, 4));
gl_FragColor = vec4(col, 1.0);
}
`;

const mouseFragmentShaderSource =
  `precision mediump float;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

void main() {
vec2 uv = gl_FragCoord.xy;

float dist = distance(uv, uMouse);
vec3 col = vec3(0.,0.,0.);    
float radius = 100.0;
float relDist = 1.0 -dist/radius;

if(dist <radius){
col= vec3(relDist*abs(cos(uTime)),relDist*abs(sin(uTime)),0);}

gl_FragColor = vec4(col, 1.0);

}

`;

const debouncedSendShader = debounce(sendShader, 300);
let input;
let liveCompiling = true;
document.addEventListener("DOMContentLoaded", () => {
  input = document.getElementById("editor");
  input.value = standardFragmentShaderSource;
  input.addEventListener("input", debouncedSendShader);
  sendShader();
  document.getElementById("Compile").addEventListener("click", sendShader);
  document.getElementById("ToggleLive").classList.add("live-active");
  document.getElementById("ToggleLive").addEventListener("click", toggleLiveCompiling);
  document.getElementById("SetStandardShader").addEventListener("click", setStandardShader);
  document.getElementById("SetMouseShader").addEventListener("click", setMouseShader);
  document.getElementById("DownloadShader").addEventListener("click", downloadShader);
  document.getElementById("LoadShader").addEventListener("click", () => {
    document.getElementById("LoadedShaderFile").click();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === "Tab") {
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      let target = e.target;
      let value = target.value;
      if (e.shiftKey) {
        target.value = value.substring(0, start - 4)
          + value.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start - 4;
      }
      else {
        target.value = value.substring(0, start)
          + "    "
          + value.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }
      e.preventDefault();
      debouncedSendShader();
    }
  }, false);
  document.getElementById("LoadedShaderFile").addEventListener("change", loadShader);
});

function loadShader() {
  const file = document.getElementById("LoadedShaderFile").files[0];
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = (e) => {
    input.value = e.target.result;
    sendShader();
  };
}

function downloadShader() {
  const link = document.createElement("a");
  const content = input.value;
  const file = new Blob([content], { type: 'text/plain' });
  link.href = URL.createObjectURL(file);
  link.download = "shader.frag";
  link.click();
  URL.revokeObjectURL(link.href);
}

function setStandardShader() {
  input.value = standardFragmentShaderSource;
  sendShader();
}

function setMouseShader() {
  input.value = mouseFragmentShaderSource;
  sendShader();
}

function toggleLiveCompiling() {
  let button = document.getElementById("ToggleLive");
  if (liveCompiling) {
    input.removeEventListener("input", debouncedSendShader);
    button.classList.remove("live-active");
    button.classList.add("live-inactive");
    liveCompiling = false;
  } else {
    input.addEventListener("input", debouncedSendShader);
    button.classList.remove("live-inactive");
    button.classList.add("live-active");
    liveCompiling = true;
  }
}

function sendShader() {
  const fragText = input.value;
  startShader(vertexShaderSource, fragText);
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
