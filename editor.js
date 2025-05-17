const vertexShaderSource = `
  attribute vec2 aPosition;
  varying vec2 vUV;

  void main() {
    vUV = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const debouncedSendShader = debounce(sendShader, 300);

document.addEventListener("DOMContentLoaded", () => {
    let input = document.getElementById("editor");
    input.addEventListener("input", debouncedSendShader);
    sendShader();
});

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function removeLiveCompiling(){
    let input = document.getElementById("editor");
    input.removeEventListener("input", debouncedSendShader);
}

function addLiveCompiling(){
    let input = document.getElementById("editor");
    input.removeEventListener("input", debouncedSendShader);
    input.addEventListener("input", debouncedSendShader);
}


function sendShader(){
  const fragText = document.getElementById("editor").value;
  startShader(vertexShaderSource, fragText);
}


function startShader(vertexShaderSource, fragmentShaderSource){
  const canvas = document.getElementById("shaderCanvas");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    alert("WebGL not supported");
    return;
  }

  // 1. Crea il programma shader
  let program;
  try {
    program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
  } catch (e) {
    console.error(e.message);
    return;
  }

  // 2. Crea quad fullscreen (due triangoli)
  const positions = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  // 3. Setup attributi
  const aPositionLoc = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPositionLoc);
  gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

  // 4. Disegna
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

}

function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("Shader compile error: " + error);
  }
  return shader;
}

function createShaderProgram(gl, vSource, fSource) {
  const vertexShader = compileShader(gl, vSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fSource, gl.FRAGMENT_SHADER);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error("Program link error: " + error);
  }
  return program;
}



