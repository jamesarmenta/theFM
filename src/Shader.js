const GL = require("gl-react");
const React = require("react");

const shaders = GL.Shaders.create({
  hueRotate: {
    frag: `
precision highp float;
varying vec2 uv;
uniform sampler2D image;
uniform float random;
uniform float offset;
uniform sampler2D hole;
uniform sampler2D holetwo;
uniform sampler2D holethree;

// float rand(vec2 p){return fract(cos(dot(p,vec2(23.14069263277926,2.665144142690225)))*123456.);}

float avg(vec4 pixel){
    float total = pixel[0]+pixel[1]+pixel[2];
    return total / 3.0;
}

vec4 blur(vec2 uv){
  vec4 sum = vec4(0,0,0,0);
  float displace = 0.005;

  sum += texture2D(image, vec2(uv.x-displace,uv.y+displace));
  sum += texture2D(image, vec2(uv.x+displace,uv.y+displace));
  sum += texture2D(image, vec2(uv.x,uv.y));
  sum += texture2D(image, vec2(uv.x-displace,uv.y-displace));
  sum += texture2D(image, vec2(uv.x+displace,uv.y-displace));

  return sum / vec4(5.0,5.0,5.0,5.0);
}

void main() {
  vec4 c = texture2D(image,uv);
  vec4 final = c;
  float offset2 = (random*2.0-1.0)/2.0;
  float offset3 = (offset+offset2)/2.0;

  vec4 rp1 = texture2D(image,vec2(random,random));

  vec4 h1 = texture2D(hole,vec2(uv.x+offset,uv.y+offset2));
  vec4 h2 = texture2D(holetwo,vec2(uv.x+offset2,uv.y+offset3));
  vec4 h3 = texture2D(holethree,vec2(uv.x+offset2,uv.y+offset));

  //ghosting??
  vec4 abv = texture2D(image,vec2(uv.x,uv.y+offset3));
  float abvSum = abv.r + abv.g + abv.b;
  float cSum = c.r + c.g + c.b;

  if(abvSum>cSum&&abvSum>2.7){final = final+.01;}

  if((h1.r<0.1 && h1.a>0.1) || (h2.r<0.1 && h2.a>0.1) || (h3.r<0.1 && h3.a>0.1)){
    //blur
    final = blur(uv)+(random/2.0);
  }

  //pixel sort
  // if(random < .25 && c[0] > .7){
  //   vec4 b = texture2D(image, vec2(uv.x, uv.y + random*.05));
  //   vec4 c = texture2D(image, uv);
  //   vec4 t = texture2D(image, vec2(uv.x, uv.y - random*.05));

  //   if (avg(b) > avg(c)) {
  //       final = b;
  //   } else if (avg(t) < avg(c)) {
  //       final = t;
  //   }
  // }

  gl_FragColor = final;
}
    `
  }
});

module.exports = GL.createComponent(
  ({ image, random, offset, hole, holetwo, holethree }) =>
  <GL.Node
    shader={shaders.hueRotate}
    uniforms={{ image, random, offset, hole, holetwo, holethree }}
  />
, { displayName: "HueRotate" });