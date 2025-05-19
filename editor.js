import { startShader } from "./renderer.js";

const vertexShaderSource = `
  attribute vec2 aPosition;
  varying vec2 vUV;

  void main() {
    vUV = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const debouncedSendShader = debounce(sendShader, 300);
let input;

document.addEventListener("DOMContentLoaded", () => {
    input = document.getElementById("editor");
    input.addEventListener("input", debouncedSendShader);
    sendShader();
    
    document.getElementById("Compile").addEventListener("click", sendShader);
    document.getElementById("AddLive").addEventListener("click", removeLiveCompiling);
    document.getElementById("RemoveLive").addEventListener("click", addLiveCompiling);
});



function removeLiveCompiling(){
    input.removeEventListener("input", debouncedSendShader);
}

function addLiveCompiling(){
    input.removeEventListener("input", debouncedSendShader);
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