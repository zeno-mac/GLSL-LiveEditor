import { startShader } from "./renderer.js";

const vertexShaderSource = `
  attribute vec2 aPosition;
  varying vec2 vUV;

  void main() {
    vUV = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const standardFragmentShaderSource= 
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

const mouseFragmentShaderSource=
`precision mediump float;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

void main() {
vec2 uv = gl_FragCoord.xy;

float dist = distance(uv, uMouse);
vec3 col = vec3(0.,0.,0.);    
float radius = 30.0;
float relDist = 1.0 -dist/radius;

if(dist <radius){
col= vec3(relDist*abs(cos(uTime)),relDist*abs(sin(uTime)),0);}

gl_FragColor = vec4(col, 1.0);

}

`;

const debouncedSendShader = debounce(sendShader, 300);
let input;

document.addEventListener("DOMContentLoaded", () => {
    input = document.getElementById("editor");
    input.value=standardFragmentShaderSource;
    input.addEventListener("input", debouncedSendShader);
    sendShader();
    
    document.getElementById("Compile").addEventListener("click", sendShader);
    document.getElementById("AddLive").addEventListener("click", removeLiveCompiling);
    document.getElementById("RemoveLive").addEventListener("click", addLiveCompiling);
    document.getElementById("SetStandardShader").addEventListener("click", setStandardShader);
    document.getElementById("SetMouseShader").addEventListener("click", setMouseShader);
    document.getElementById("DownloadShader").addEventListener("click", downloadShader);
});

function downloadShader(){
const link = document.createElement("a");
const content = input.value;
const file = new Blob([content], { type: 'text/plain' });
link.href = URL.createObjectURL(file);
link.download = "shader.frag";
link.click();
URL.revokeObjectURL(link.href);
}

function setStandardShader(){
  input.value=standardFragmentShaderSource;
  sendShader();
}

function setMouseShader(){
  input.value=mouseFragmentShaderSource;
  sendShader();
}

function removeLiveCompiling(){
    input.removeEventListener("input", debouncedSendShader);
}

function addLiveCompiling(){
    input.addEventListener("input", debouncedSendShader);
}

function sendShader(){
  const fragText = input.value;
  startShader(vertexShaderSource, fragText);
}

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}