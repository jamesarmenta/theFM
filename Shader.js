const GL = require("gl-react");
const React = require("react");

const shaders = GL.Shaders.create({
  hueRotate: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D image;
uniform sampler2D hole;
uniform sampler2D holetwo;

float rand(vec2 p){return fract(cos(dot(p,vec2(23.14069263277926,2.665144142690225)))*123456.);}

vec4 avg(vec4 one, vec4 two){
  float red = (one.r+two.r)/2.0;
  float green = (one.g+two.g)/2.0;
  float blue = (one.b+two.b)/2.0;

  return vec4(red,green,blue,1);
}

vec4 blur(vec2 uv){
  vec4 sum = vec4(0,0,0,0);
  float offset = 0.005;

  sum += texture2D(image, vec2(uv.x-offset,uv.y+offset));
  sum += texture2D(image, vec2(uv.x+offset,uv.y+offset));
  sum += texture2D(image, vec2(uv.x,uv.y));
  sum += texture2D(image, vec2(uv.x-offset,uv.y-offset));
  sum += texture2D(image, vec2(uv.x+offset,uv.y-offset));

  return sum / vec4(5.0,5.0,5.0,5.0);
}

void main() {
  vec4 c = texture2D(image,uv);
  vec4 final = c;

  vec4 rp1 = texture2D(image,vec2(0.5,0.5));
  float offset = rand(vec2(rp1.r,rp1.g))/2.0;

  vec4 h1 = texture2D(hole,vec2(uv.y+offset,uv.x+offset));
  vec4 h2 = texture2D(holetwo,vec2(uv.x-offset,uv.y-offset));

  //ghosting??
  vec4 abv = texture2D(image,vec2(uv.x*offset,uv.y*offset));
  float abvSum = abv.r + abv.g + abv.b;
  float cSum = c.r + c.g + c.b;

  if(abvSum>cSum&&abvSum>2.7){final = final+0.055;}

  if((h1.r<0.1 && h1.a>0.1) || (h2.r<0.1 && h2.a>0.1)){
    //lighten and blur
    final = blur(uv)+offset;
  }

  //IMPORTANT
  //lighten on every refresh
  //this changes the value of uv point .5,.5,
  //allowing offset value to change each time
  final = final*1.005;


  gl_FragColor = final;
}
    `
  }
});

module.exports = GL.createComponent(
  ({ image, hole, holetwo }) =>
  <GL.Node
    shader={shaders.hueRotate}
    uniforms={{ image, hole, holetwo }}
  />
, { displayName: "HueRotate" });