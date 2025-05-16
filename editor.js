document.addEventListener("DOMContentLoaded", () => {
    let input = document.getElementById("editor");
    input.addEventListener("input", debounce(startShader));
});

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function write(){
    document.getElementById("text").innerHTML=(new Date()).getMilliseconds();
}


function removeLive(){
    let input = document.getElementById("editor");
    input.addEventListener("input", debounce(write));
}

function addLive(){
    let input = document.getElementById("editor");
    input.removeEventListener("input", debounce(write));
    input.addEventListener("input", debounce(write));
}

function startShader(){
    const canvas = document.getElementById("shaderCanvas");
    const gl = canvas.getContext("webgl");
    if (gl === null) {alert("Unable to initialize WebGL. Your browser or machine may not support it.",)}
      // Set clear color to black, fully opaque
  gl.clearColor(1.0, 0.0, 0.0, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

}