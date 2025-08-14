
let animationFrameId = null;



let mouse = [0., 0.];
let canvas;

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("shaderCanvas");
  let rect = canvas.getBoundingClientRect();
  canvas.height = rect.height;
  canvas.width = rect.width;
  window.addEventListener("resize", (e)=>{
    let rect = canvas.getBoundingClientRect();
    canvas.height = rect.height;
    canvas.width = rect.width;
  })
  canvas.addEventListener("mousemove", (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left);
    let y = (e.clientY - rect.top);
    mouse = [x, canvas.height - y]; // inverti Y perché WebGL ha Y che parte dal basso

  }
  );
});

function startShader(vertexShaderSource, fragmentShaderSource) {
  const gl = canvas.getContext("webgl");
  if (!gl) {
    alert("WebGL not supported");
    return;
  }

  let program;
  try {
    program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
  } catch (e) {
    console.error(e.message);
    return;
  }

  const positions = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    -1, 1,
    1, -1,
    1, 1,
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const aPositionLoc = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPositionLoc);
  gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

  const timeLoc = gl.getUniformLocation(program, "uTime");
  const resLoc = gl.getUniformLocation(program, "uResolution");
  const mouseLoc = gl.getUniformLocation(program, "uMouse");
  gl.useProgram(program);
  gl.uniform2f(resLoc, canvas.width, canvas.height);

  function render() {
    const now = performance.now() / 1000;
    gl.useProgram(program);
    gl.uniform1f(timeLoc, now);
    gl.uniform2f(mouseLoc, mouse[0], mouse[1]);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationFrameId = requestAnimationFrame(render);
  }

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }

  render();
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

export { startShader };


