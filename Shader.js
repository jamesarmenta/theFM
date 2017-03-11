const GL = require("gl-react");
const React = require("react");

const shaders = GL.Shaders.create({
  hueRotate: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D image;
uniform sampler2D hole;


void main() {
  vec4 c = texture2D(image,uv);
  vec4 h = texture2D(hole,uv);
  vec4 final = c;
  
  if(h.r<0.1){final = vec4(0,0,0,1);}

  gl_FragColor = final;
}
    `
  }
});

module.exports = GL.createComponent(
  ({ image, hole }) =>
  <GL.Node
    shader={shaders.hueRotate}
    uniforms={{ image, hole }}
  />
, { displayName: "HueRotate" });