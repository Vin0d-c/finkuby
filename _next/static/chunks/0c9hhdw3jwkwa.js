(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,79298,e=>{"use strict";var t=e.i(43476),r=e.i(71645);e.i(97379);var a=e.i(72804);let i=[["path",{d:"M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z",stroke:"currentColor",strokeWidth:"1.5",key:"0"}],["path",{d:"M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}]],o=[["path",{d:"M7.42857 3.36201C11.3996 0.664089 17.136 2.12432 19.2301 6.41803M10.8571 21.9236C15.5839 22.5822 20 18.8952 20 14.2103V10.3333M7.42857 20.6058C5.35602 19.1977 4 16.8583 4 14.2103V9.75757C4 8.57285 4.27144 7.44988 4.75704 6.44444",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"0"}],["path",{d:"M16 13.8C16 16.1196 14.2091 18 12 18C9.79086 18 8 16.1196 8 13.8V10.2C8 9.55584 8.13811 8.94555 8.38493 8.4M12 6C14.2091 6 16 7.8804 16 10.2",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"1"}],["path",{d:"M12 10.5L12 13.5",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",key:"2"}]],n={dark:{"--rc-base":"#1d1c22","--rc-shadow":"0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)","--rc-ink":"#f4f4f5","--rc-muted":"rgba(244, 244, 245, 0.6)","--rc-tile":"linear-gradient(180deg, #3a3644 0%, #27242f 100%)","--rc-tile-edge":"rgba(255, 255, 255, 0.07)","--rc-tile-highlight":"rgba(255, 255, 255, 0.12)","--rc-tile-shadow":"0 4px 10px -4px rgba(0, 0, 0, 0.7)","--rc-rim":"rgba(255, 255, 255, 0.07)","--rc-rim-highlight":"rgba(255, 255, 255, 0.1)"},light:{"--rc-base":"#e7e7ea","--rc-shadow":"0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)","--rc-ink":"#18181b","--rc-muted":"rgba(24, 24, 27, 0.6)","--rc-tile":"linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)","--rc-tile-edge":"rgba(24, 24, 27, 0.08)","--rc-tile-highlight":"rgba(255, 255, 255, 1)","--rc-tile-shadow":"0 4px 10px -5px rgba(24, 24, 27, 0.25)","--rc-rim":"rgba(24, 24, 27, 0.08)","--rc-rim-highlight":"rgba(255, 255, 255, 0.8)"}},l={borderRadius:"var(--rc-radius)",background:"var(--rc-base)",boxShadow:"var(--rc-shadow)",transform:"translate3d(0, var(--rc-lift, 0px), 0) rotateX(var(--rc-rotate-x, 0deg)) rotateY(var(--rc-rotate-y, 0deg))",opacity:"var(--rc-presence, 1)",isolation:"isolate",willChange:"transform"},c={borderRadius:"var(--rc-tile-radius)",background:"var(--rc-tile)",boxShadow:"var(--rc-tile-shadow)",color:"var(--rc-muted)"},u={boxShadow:"inset 0 0 0 1px var(--rc-tile-edge), inset 0 1px 0 var(--rc-tile-highlight)"},s={boxShadow:"inset 0 0 0 1px var(--rc-rim), inset 0 1px 0 var(--rc-rim-highlight)"},f=`#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,d=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uVideo;
uniform sampler2D uCam;
uniform vec4 uVideoMap;
uniform vec4 uCamMap;
uniform vec2 uWeights;
uniform vec2 uLod;
float level(sampler2D source) {
  vec3 mean = pow(textureLod(source, vec2(0.5), 14.0).rgb, vec3(2.2));
  return pow(dot(mean, vec3(0.2126, 0.7152, 0.0722)), 1.0 / 2.2);
}
void main() {
  vec3 color = vec3(0.0);
  float mean = 0.0;
  if (uWeights.x > 0.0) {
    color += textureLod(uVideo, vUv * uVideoMap.xy + uVideoMap.zw, uLod.x).rgb * uWeights.x;
    mean += level(uVideo) * uWeights.x;
  }
  if (uWeights.y > 0.0) {
    color += textureLod(uCam, vUv * uCamMap.xy + uCamMap.zw, uLod.y).rgb * uWeights.y;
    mean += level(uCam) * uWeights.y;
  }
  fragColor = vec4(color, mean);
}`,m=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uTexture;
uniform vec2 uStep;
uniform float uSigma;
void main() {
  vec4 sum = texture(uTexture, vUv);
  if (uSigma < 0.35) {
    fragColor = sum;
    return;
  }
  float falloff = -0.5 / (uSigma * uSigma);
  int radius = int(min(ceil(uSigma * 2.8), 40.0));
  float total = 1.0;
  for (int i = 1; i <= 40; i++) {
    if (i > radius) break;
    float offset = float(i);
    float weight = exp(offset * offset * falloff);
    sum += (texture(uTexture, vUv + uStep * offset) + texture(uTexture, vUv - uStep * offset)) * weight;
    total += 2.0 * weight;
  }
  fragColor = sum / total;
}`,h=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uEnv;
uniform vec2 uEnvSize;
uniform vec2 uSize;
uniform float uRadius;
uniform float uScale;
uniform mat3 uRotate;
uniform float uCapture;
uniform float uBlur;
uniform float uRough;
uniform float uMetal;
uniform vec3 uTint;
uniform float uGray;
uniform float uWarp;
uniform float uWarpScale;
uniform float uShine;
uniform float uBevel;
uniform float uGlare;
uniform vec2 uPointer;
uniform float uTheme;

const float VIEW = 900.0;
const float OVERSCAN = 1.20;
const float CONTENT = 46.0;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.103, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy) * 2.0 - 1.0;
}

vec3 gradientNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);
  vec2 ga = hash2(i);
  vec2 gb = hash2(i + vec2(1.0, 0.0));
  vec2 gc = hash2(i + vec2(0.0, 1.0));
  vec2 gd = hash2(i + vec2(1.0, 1.0));
  float va = dot(ga, f);
  float vb = dot(gb, f - vec2(1.0, 0.0));
  float vc = dot(gc, f - vec2(0.0, 1.0));
  float vd = dot(gd, f - vec2(1.0, 1.0));
  float k = va - vb - vc + vd;
  float value = va + u.x * (vb - va) + u.y * (vc - va) + u.x * u.y * k;
  vec2 slope = ga + u.x * (gb - ga) + u.y * (gc - ga) + u.x * u.y * (ga - gb - gc + gd) + du * (u.yx * k + vec2(vb, vc) - va);
  return vec3(value, slope);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float erf(float x) {
  float x2 = x * x;
  return sign(x) * sqrt(1.0 - exp(-x2 * (1.2732395 + 0.147 * x2) / (1.0 + 0.147 * x2)));
}

float band(float x, float halfWidth, float sigma) {
  float s = 1.4142136 * max(sigma, 0.0001);
  return 0.5 * (erf((x + halfWidth) / s) - erf((x - halfWidth) / s));
}

float strip(vec2 q, vec2 center, vec2 dir, float halfWidth, vec2 sigma) {
  vec2 normal = vec2(-dir.y, dir.x);
  return band(dot(q - center, normal), halfWidth, length(sigma * normal));
}

const vec2 SWEEP = vec2(0.5, 0.86);
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

float softbox(vec2 q, vec2 sigma) {
  float key = strip(q, vec2(-0.1, -0.16), normalize(SWEEP), 0.022, sigma + 0.018);
  float top = band(q.y + 0.6, 0.12, sigma.y + 0.05);
  float side = band(q.x - 0.46, 0.05, sigma.x + 0.05);
  return key + top * 0.8 + side * 0.35;
}

float room(vec2 q, vec2 sigma) {
  float fall = smoothstep(-0.55, 0.5, q.y);
  float flag = strip(q, vec2(0.24, -0.02), normalize(SWEEP), 0.09, sigma + 0.08);
  return mix(0.85, 0.12, fall) * (1.0 - 0.6 * flag);
}

vec4 sampleEnv(vec2 uv) {
  vec2 st = uv * uEnvSize - 0.5;
  vec2 i = floor(st);
  vec2 f = st - i;
  vec2 f2 = f * f;
  vec2 f3 = f2 * f;
  vec2 w0 = (1.0 - 3.0 * f + 3.0 * f2 - f3) / 6.0;
  vec2 w1 = (4.0 - 6.0 * f2 + 3.0 * f3) / 6.0;
  vec2 w2 = (1.0 + 3.0 * f + 3.0 * f2 - 3.0 * f3) / 6.0;
  vec2 w3 = f3 / 6.0;
  vec2 g0 = w0 + w1;
  vec2 g1 = w2 + w3;
  vec2 c0 = (i + 0.5 + w1 / g0 - 1.0) / uEnvSize;
  vec2 c1 = (i + 0.5 + w3 / g1 + 1.0) / uEnvSize;
  vec4 a = texture(uEnv, c0) * g0.x + texture(uEnv, vec2(c1.x, c0.y)) * g1.x;
  vec4 b = texture(uEnv, vec2(c0.x, c1.y)) * g0.x + texture(uEnv, c1) * g1.x;
  return a * g0.y + b * g1.y;
}

vec3 toLinear(vec3 c) {
  return pow(max(c, 0.0), vec3(2.2));
}

void main() {
  vec2 p = vec2(vUv.x - 0.5, 0.5 - vUv.y) * uSize;
  vec2 halfSize = uSize * 0.5;
  float r = min(uRadius, min(halfSize.x, halfSize.y));
  vec2 corner = abs(p) - halfSize + r;
  vec2 side = vec2(p.x >= 0.0 ? 1.0 : -1.0, p.y >= 0.0 ? 1.0 : -1.0);
  float d;
  vec2 outward;
  if (corner.x > 0.0 && corner.y > 0.0) {
    d = length(corner) - r;
    outward = normalize(corner) * side;
  } else if (corner.x > corner.y) {
    d = corner.x - r;
    outward = vec2(side.x, 0.0);
  } else {
    d = corner.y - r;
    outward = vec2(0.0, side.y);
  }
  float coverage = clamp(0.5 - d * uScale, 0.0, 1.0);

  float chamferWidth = min(uBevel, max(r, 1.0));
  float chamfer = chamferWidth > 0.01 ? 1.0 - smoothstep(0.0, chamferWidth, -d) : 0.0;
  vec2 slope = outward * chamfer;

  vec2 wp = p / (220.0 * uWarpScale);
  vec3 w1 = gradientNoise(wp);
  vec3 w2 = gradientNoise(wp * 2.07 + 13.7);
  vec2 ripple = (w1.yz + w2.yz * 0.5) * uWarp;
  slope += ripple * 0.008;

  float grain = valueNoise(vec2(p.x * 0.008, p.y * 0.55)) * 0.45 + valueNoise(vec2(p.x * 0.019 + 3.7, p.y * 0.23)) * 0.35 + valueNoise(vec2(p.x * 0.004 + 9.2, p.y * 0.09)) * 0.2;
  float brush = uRough * uRough;
  slope.y += (grain - 0.5) * brush * 0.004;

  vec3 normal = uRotate * normalize(vec3(slope, 1.0));
  vec3 position = uRotate * vec3(p, 0.0);
  vec3 view = normalize(position - vec3(0.0, 0.0, VIEW));
  vec3 bounce = reflect(view, normal);
  vec2 q = bounce.xy / max(bounce.z, 0.2);

  vec2 footprint = fwidth(q);
  vec2 sigma = sqrt(vec2(uBlur / VIEW) * vec2(uBlur / VIEW) + footprint * footprint * 0.5);
  sigma += vec2(0.004, 0.05) * uRough;

  vec2 shift = clamp((q - p / VIEW) * CONTENT + ripple * 10.0, -uSize, uSize);
  vec2 cp = (p + shift) / (uSize * OVERSCAN);
  vec4 reflected = uCapture > 0.0 ? sampleEnv(vec2(0.5 + cp.x, 0.5 - cp.y)) : vec4(0.0, 0.0, 0.0, 1.0);
  vec3 captured = toLinear(reflected.rgb) * (0.5 / max(pow(reflected.a, 2.2), 0.02));
  captured = mix(vec3(dot(captured, LUMA)), captured, 1.0 - uGray);
  captured = pow(max(captured * 1.2, 0.0), vec3(mix(2.0, 1.5, uTheme)));

  vec3 scene = mix(vec3(room(q, sigma)), captured, uCapture * (1.0 - chamfer) * mix(1.0, 0.6, uTheme));
  scene *= 1.0 + (grain - 0.5) * brush * 0.3;

  vec2 toPointer = (uPointer - p) / (120.0 + uBlur * 4.0);
  vec2 spread = toPointer * vec2(1.0, 1.0 / (1.0 + 2.5 * uRough));
  float reach = dot(spread, spread);
  float glint = max(1.0 + 3.0 * dot(slope, toPointer), 0.0);
  float glare = (exp(-reach * 1.6) + exp(-reach * 0.35) * 0.15) * glint * uGlare * (1.0 + 0.8 * (grain - 0.5) * brush);
  float highlight = (softbox(q, sigma) * uShine + glare) * mix(0.4, 1.0, uMetal);

  vec3 dark = vec3(0.005, 0.005, 0.006) + uTint * (scene * 0.05 * uMetal + highlight * 0.36);
  vec3 light = uTint * (vec3(0.83, 0.83, 0.85) * (1.0 - 0.45 * uMetal * (1.0 - clamp(scene, 0.0, 1.0))) + highlight * 0.35);
  vec3 color = mix(dark, light, uTheme);
  color = min(color, 0.7) + 0.3 * (1.0 - exp(-max(color - 0.7, 0.0) / 0.3));
  color = pow(clamp(color, 0.0, 1.0), vec3(1.0 / 2.2));

  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  color = clamp(color, 0.0, 1.0);
  fragColor = vec4(color * coverage, coverage);
}`,v=(e,t,r)=>Math.min(r,Math.max(t,e)),p=e=>"number"==typeof e?`${e}px`:e,g=(e,t,r)=>{let a=e.createShader(t);return a?(e.shaderSource(a,r),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS))?a:(console.error(e.getShaderInfoLog(a)),e.deleteShader(a),null):null},x=(e,t)=>{let r=g(e,e.VERTEX_SHADER,f),a=g(e,e.FRAGMENT_SHADER,t),i=r&&a?e.createProgram():null;if(!r||!a||!i)return r&&e.deleteShader(r),a&&e.deleteShader(a),null;if(e.attachShader(i,r),e.attachShader(i,a),e.bindAttribLocation(i,0,"aPosition"),e.linkProgram(i),e.deleteShader(r),e.deleteShader(a),!e.getProgramParameter(i,e.LINK_STATUS))return console.error(e.getProgramInfoLog(i)),e.deleteProgram(i),null;let o={},n=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let t=0;t<n;t++){let r=e.getActiveUniform(i,t);r&&(o[r.name]=e.getUniformLocation(i,r.name))}return{program:i,uniforms:o}},b=(e,t,r,a)=>{let i=e/Math.max(1,t),o=i>r?r/i:1,n=i>r?1:i/r,l=a?-o:o;return[l,-n,.5-.5*l,.5+.5*n]},E=(e,t,r,a)=>{let i=e/Math.max(1,t);return Math.max(0,Math.log2(Math.max(1,e*(i>a?a/i:1)/Math.max(1,r)))-.5)},w=(0,r.memo)(({name:e="Alexander Doe",role:f="Senior Developer",badge:g="Verified",status:w="Active",statusColor:y="#22c55e",idLabel:T="ID number",idValue:S="8901 2345 6789",children:R,theme:M="dark",shade:C,videoSrc:A,webcam:L=!1,onWebcamError:P,tint:N="#ffffff",metalness:U=1,roughness:k=.3,blurStrength:_=6,grayscale:W=1,warp:I=.6,warpScale:F=1,shine:D=1,bevel:z=3,glare:j=.5,enableTilt:B=!0,tiltStrength:G=12,intro:V=!0,width:X=320,height:O=500,radius:q=24,className:$="",style:Y})=>{let H=(0,r.useRef)(null),K=(0,r.useRef)(null),Z=(0,r.useRef)(null),J=(0,r.useRef)(null),Q=(0,r.useRef)(null),ee=(0,r.useRef)(null),et=(0,r.useRef)(P),[er,ea]=(0,r.useState)(0),ei="light"===M?"light":"dark",eo={tint:(e=>{let t=String(e||"").trim(),r=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(r){let e=3===r[1].length?r[1].replace(/./g,e=>e+e):r[1];return[0,2,4].map(t=>parseInt(e.slice(t,t+2),16)/255)}let a=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(t);return a?[a[1],a[2],a[3]].map(e=>v(parseFloat(e)/255,0,1)):[1,1,1]})(N).map(e=>Math.pow(e,2.2)),metalness:v(U,0,1),roughness:v(k,0,1),blurStrength:v(_,0,40),grayscale:v(W,0,1),warp:v(I,0,2),warpScale:v(F,.2,4),shine:v(D,0,3),bevel:v(z,0,16),glare:v(j,0,1),enableTilt:B,tiltStrength:v(G,0,30),radius:Math.max(0,q),theme:void 0===C?+("light"===ei):v(C,0,1),intro:V},en=(0,r.useRef)(eo);en.current=eo,et.current=P,(0,r.useEffect)(()=>{ee.current?.()}),(0,r.useLayoutEffect)(()=>{let e=H.current;e&&en.current.intro&&(window.matchMedia("(prefers-reduced-motion: reduce)").matches||(e.style.setProperty("--rc-presence","0"),e.style.setProperty("--rc-lift","14px")))},[]),(0,r.useEffect)(()=>{let e=H.current,t=K.current,r=Z.current,a=J.current,i=Q.current;if(!e||!t||!r||!a||!i)return;let o=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=(e=>{let t=e.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"default"});if(!t)return null;let r=x(t,d),a=x(t,m),i=x(t,h);if(!r||!a||!i){for(let e of[r,a,i])e&&t.deleteProgram(e.program);return null}let o=(e,r)=>{let a=t.createTexture();return t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,e?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,r),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),a},n=()=>{let e=o(!1,t.MIRRORED_REPEAT),r=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),t.bindFramebuffer(t.FRAMEBUFFER,null),{texture:e,framebuffer:r,width:1,height:1}},l=(e,r,a)=>{(e.width!==r||e.height!==a)&&(e.width=r,e.height=a,t.bindTexture(t.TEXTURE_2D,e.texture),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,r,a,0,t.RGBA,t.UNSIGNED_BYTE,null))},c=t.createVertexArray();t.bindVertexArray(c);let u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.disable(t.BLEND),t.disable(t.DEPTH_TEST);let s={video:o(!0,t.CLAMP_TO_EDGE),cam:o(!0,t.CLAMP_TO_EDGE)},f=n(),p=n(),g=n(),w=new Float32Array(9),y=(r,a)=>(t.bindFramebuffer(t.FRAMEBUFFER,r?r.framebuffer:null),t.viewport(0,0,r?r.width:e.width,r?r.height:e.height),t.useProgram(a.program),a.uniforms),T=(e,r)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,r)};return{upload:(e,r)=>{try{return t.bindTexture(t.TEXTURE_2D,s[e]),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),t.generateMipmap(t.TEXTURE_2D),!0}catch{return!1}},renderEnv:({width:e,height:i,scale:o,blur:n,roughness:c,video:u,cam:d})=>{let m=v(2.5/Math.max(n,.01),.12,o),h=Math.max(8,Math.ceil(1.2*e*m)),x=Math.max(8,Math.ceil(1.2*i*m));l(f,h,x),l(p,h,x),l(g,h,x);let w=e/Math.max(1,i),S=1-(1-u.mix)*(1-d.mix),R=S>0?d.mix/S:0,M=y(f,r);T(0,s.video),T(1,s.cam),t.uniform1i(M.uVideo,0),t.uniform1i(M.uCam,1),t.uniform4fv(M.uVideoMap,u.ready?b(u.width,u.height,w,!1):[1,1,0,0]),t.uniform4fv(M.uCamMap,d.ready?b(d.width,d.height,w,!0):[1,1,0,0]),t.uniform2f(M.uWeights,u.ready&&S>0?1-R:0,d.ready?R:0),t.uniform2f(M.uLod,u.ready?E(u.width,u.height,h,w):0,d.ready?E(d.width,d.height,h,w):0),t.drawArrays(t.TRIANGLES,0,3),M=y(p,a),T(0,f.texture),t.uniform1i(M.uTexture,0),t.uniform2f(M.uStep,1/h,0),t.uniform1f(M.uSigma,n*m),t.drawArrays(t.TRIANGLES,0,3),M=y(g,a),T(0,p.texture),t.uniform1i(M.uTexture,0),t.uniform2f(M.uStep,0,1/x),t.uniform1f(M.uSigma,(n*(1+1.5*c)+10*c)*m),t.drawArrays(t.TRIANGLES,0,3)},renderPlate:({width:r,height:a,rotateX:o,rotateY:n,capture:l,glare:c,pointerX:u,pointerY:s,settings:f})=>{let d=Math.cos(o),m=Math.sin(o),h=Math.cos(n),v=Math.sin(n);w.set([h,m*v,-d*v,0,d,m,v,-m*h,d*h]);let p=y(null,i);T(0,g.texture),t.uniform1i(p.uEnv,0),t.uniform2f(p.uEnvSize,g.width,g.height),t.uniform2f(p.uSize,r,a),t.uniform1f(p.uRadius,f.radius),t.uniform1f(p.uScale,e.width/Math.max(1,r)),t.uniformMatrix3fv(p.uRotate,!1,w),t.uniform1f(p.uCapture,l),t.uniform1f(p.uBlur,f.blurStrength),t.uniform1f(p.uRough,f.roughness),t.uniform1f(p.uMetal,f.metalness),t.uniform3fv(p.uTint,f.tint),t.uniform1f(p.uGray,f.grayscale),t.uniform1f(p.uWarp,f.warp),t.uniform1f(p.uWarpScale,f.warpScale),t.uniform1f(p.uShine,f.shine),t.uniform1f(p.uBevel,f.bevel),t.uniform1f(p.uGlare,c),t.uniform2f(p.uPointer,u,s),t.uniform1f(p.uTheme,f.theme),t.drawArrays(t.TRIANGLES,0,3)},dispose:()=>{if(!t.isContextLost()){for(let e of[f,p,g])t.deleteFramebuffer(e.framebuffer),t.deleteTexture(e.texture);for(let e of(t.deleteTexture(s.video),t.deleteTexture(s.cam),t.deleteBuffer(u),t.deleteVertexArray(c),[r,a,i]))t.deleteProgram(e.program)}}}})(r),l={p:0,v:0,target:0},c={p:0,v:0,target:0},u={p:0,target:0},s={x:0,y:0},f={width:t.offsetWidth,height:t.offsetHeight,scale:1},p=e=>({element:e,src:"",time:-1,ready:!1,failed:!1,width:0,height:0,mix:0}),g={video:p(a),cam:p(i)},w=1,y=0,T=0,S=null,R=0,M=0,C=!0,A="hidden"!==document.visibilityState,L=!1,P="",N=!1,U=()=>{let{enableTilt:t,tiltStrength:r}=en.current,a=t&&!o?r:0,i=e.style;i.setProperty("--rc-rotate-x",`${(c.p*a).toFixed(3)}deg`),i.setProperty("--rc-rotate-y",`${(-l.p*a).toFixed(3)}deg`);let n=1-Math.pow(1-w,3);i.setProperty("--rc-presence",n.toFixed(4)),i.setProperty("--rc-lift",`${((1-n)*14).toFixed(2)}px`)},k=(e,t)=>{let r=t.element,a=r.srcObject?"stream":r.currentSrc;if(a!==t.src&&(t.src=a,t.failed=!1,t.time=-1),!a)return t.ready=!1,!1;if(r.error)return t.failed=!0,!1;if(r.readyState<2||!r.videoWidth)return!1;let i=r.currentTime;return(!t.ready||i!==t.time)&&(n&&n.upload(e,r)?(t.time=i,t.width=r.videoWidth,t.height=r.videoHeight,t.ready=!0,!0):(t.failed=!0,!1))},_=(e,t)=>{let r=e.ready&&!e.failed&&e.src?1:0,a=e.mix;return e.mix+=(r-e.mix)*(1-Math.exp(-t/.35)),.002>Math.abs(r-e.mix)&&(e.mix=r),e.mix!==a},W=()=>{f.width=t.offsetWidth,f.height=t.offsetHeight,f.scale=Math.min(window.devicePixelRatio||1,2);let e=Math.max(1,Math.round(f.width*f.scale)),a=Math.max(1,Math.round(f.height*f.scale));(r.width!==e||r.height!==a)&&(r.width=e,r.height=a),N=!0},I=e=>{if(R=0,L)return;let t=Math.min(.05,(e-M)/1e3||0);M=e;let r=e<T,a=r?24:120,i=r?9:16,d=Math.max(1,Math.ceil(t/(1/120))),m=t/d;for(let e=0;e<d;e++)for(let e of[l,c])e.v+=(a*(e.target-e.p)-i*e.v)*m,e.p+=e.v*m;let h=u.target>u.p?.18:r?.9:.45;u.p+=(u.target-u.p)*(1-Math.exp(-t/h)),w<1&&(w=v((e-y)/650,0,1));let p=Math.abs(l.target-l.p)>5e-4||Math.abs(c.target-c.p)>5e-4||Math.abs(l.v)>5e-4||Math.abs(c.v)>5e-4||Math.abs(u.target-u.p)>.002||w<1;p||(l.p=l.target,c.p=c.target,l.v=0,c.v=0,u.p=u.target),U();let x=!1;if(n){for(let e of(g.cam.mix<1&&k("video",g.video)&&(N=!0),k("cam",g.cam)&&(N=!0),[g.video,g.cam]))!e.src||e.failed||e.element.paused||(x=!0),_(e,t)&&(N=!0),e.mix>0&&e.mix<1&&(x=!0);let e=en.current,r=`${e.blurStrength}|${e.roughness}|${f.width}|${f.height}|${f.scale}`;r!==P&&(P=r,N=!0),N&&(g.video.mix>0||g.cam.mix>0)&&n.renderEnv({width:f.width,height:f.height,scale:f.scale,blur:e.blurStrength,roughness:e.roughness,video:g.video,cam:g.cam}),N=!1;let a=(e.enableTilt&&!o?e.tiltStrength:0)*(Math.PI/180);n.renderPlate({width:f.width,height:f.height,rotateX:c.p*a,rotateY:-l.p*a,capture:1-(1-g.video.mix)*(1-g.cam.mix),glare:e.glare*u.p,pointerX:s.x,pointerY:s.y,settings:e})}(p||x)&&C&&A&&(R=requestAnimationFrame(I))},F=()=>{!R&&!L&&C&&A&&(M=performance.now(),R=requestAnimationFrame(I))};ee.current=F;let D=(e,t,r=!0)=>{l.target=v(e,-1,1),c.target=v(t,-1,1),u.target=+!!r,T=0,F()},z=t=>{let r=e.getBoundingClientRect();if(!r.width||!r.height)return;let a=(t.clientX-r.left)/r.width*2-1,i=(t.clientY-r.top)/r.height*2-1;s.x=a*f.width*.5,s.y=i*f.height*.5,D(a,i)},j=e=>{"mouse"===e.pointerType&&z(e)},B=e=>{("mouse"===e.pointerType||e.pointerId===S)&&z(e)},G=e=>{"mouse"===e.pointerType&&D(0,0,!1)},V=e=>{"mouse"!==e.pointerType&&(S=e.pointerId,z(e))},X=e=>{e.pointerId===S&&(S=null,D(0,0,!1))};e.addEventListener("pointerenter",j),e.addEventListener("pointermove",B),e.addEventListener("pointerleave",G),e.addEventListener("pointerdown",V),e.addEventListener("pointerup",X),e.addEventListener("pointercancel",X);let O=e=>{e.preventDefault(),L=!0,cancelAnimationFrame(R),R=0},q=()=>ea(e=>e+1);r.addEventListener("webglcontextlost",O),r.addEventListener("webglcontextrestored",q);let $=new ResizeObserver(()=>{W(),F()});$.observe(t),W();let Y=new IntersectionObserver(e=>{if(C=e.some(e=>e.isIntersecting),!o)for(let e of[a,i])C&&(e.currentSrc||e.srcObject)?e.play().catch(()=>{}):C||!e.currentSrc||e.srcObject||e.pause();F()});Y.observe(e);let et=()=>{A="hidden"!==document.visibilityState,F()};document.addEventListener("visibilitychange",et);let ei=()=>F(),eo=["loadeddata","playing","seeked","emptied","error"];for(let e of[a,i])for(let t of eo)e.addEventListener(t,ei);return en.current.intro&&!o&&0===er&&(l.p=.62,c.p=-.55,u.p=1,s.x=.62*f.width*.5,s.y=-.55*f.height*.5,w=0,y=performance.now(),T=performance.now()+1400),U(),F(),()=>{for(let t of(cancelAnimationFrame(R),ee.current=null,$.disconnect(),Y.disconnect(),document.removeEventListener("visibilitychange",et),e.removeEventListener("pointerenter",j),e.removeEventListener("pointermove",B),e.removeEventListener("pointerleave",G),e.removeEventListener("pointerdown",V),e.removeEventListener("pointerup",X),e.removeEventListener("pointercancel",X),r.removeEventListener("webglcontextlost",O),r.removeEventListener("webglcontextrestored",q),[a,i]))for(let e of eo)t.removeEventListener(e,ei);n?.dispose()}},[er]),(0,r.useEffect)(()=>{let e=J.current;if(e){if(!A){e.removeAttribute("src"),e.load(),ee.current?.();return}return e.src=A,window.matchMedia("(prefers-reduced-motion: reduce)").matches||e.play().catch(()=>{}),ee.current?.(),()=>e.pause()}},[A]),(0,r.useEffect)(()=>{let e=Q.current;if(!L||!e)return;let t=navigator.mediaDevices;if(!t||!t.getUserMedia)return void et.current?.(Error("Camera access is not available in this browser."));let r=null,a=!1;return t.getUserMedia({video:{facingMode:"user",width:{ideal:640},height:{ideal:480}},audio:!1}).then(t=>{a?t.getTracks().forEach(e=>e.stop()):(r=t,e.srcObject=t,e.play().catch(()=>{}),ee.current?.())}).catch(e=>{a||et.current?.(e)}),()=>{a=!0,r?.getTracks().forEach(e=>e.stop()),e.srcObject=null,ee.current?.()}},[L]);let el=Math.max(0,q),ec={...n[ei],"--rc-width":p(X),"--rc-height":p(O),"--rc-radius":`${el}px`,"--rc-pad":`${Math.round(v(.8*el,16,22))}px`,"--rc-tile-radius":`${Math.round(v(.5*el,8,14))}px`,"--rc-status":y,width:"var(--rc-width)",height:"var(--rc-height)",perspective:"900px",color:"var(--rc-ink)"};return(0,t.jsxs)("div",{ref:H,className:`relative box-border max-w-full touch-pan-y select-none ${$}`.trim(),style:{...ec,...Y},children:[(0,t.jsxs)("div",{ref:K,className:"relative box-border h-full w-full overflow-hidden",style:l,children:[(0,t.jsx)("canvas",{ref:Z,className:"absolute inset-0 block h-full w-full","aria-hidden":"true"}),(0,t.jsx)("div",{className:"relative z-[1] box-border flex h-full flex-col p-[var(--rc-pad)]",children:R??(0,t.jsxs)(t.Fragment,{children:[(g||w)&&(0,t.jsxs)("div",{className:"flex items-center gap-3 text-[13px] leading-5",children:[g&&(0,t.jsxs)("span",{className:"inline-flex items-center gap-1.5 font-medium [color:var(--rc-ink)]",children:[(0,t.jsx)(a.f,{icon:i,size:16,strokeWidth:1.8}),g]}),w&&(0,t.jsxs)("span",{className:"ml-auto inline-flex items-center gap-2 [color:var(--rc-muted)]",children:[(0,t.jsx)("span",{className:"h-1.5 w-1.5 rounded-full [background:var(--rc-status)]"}),w]})]}),(0,t.jsxs)("div",{className:"mt-auto",children:[e&&(0,t.jsx)("h3",{className:"m-0 text-[24px] font-medium leading-[1.15] tracking-[-0.02em] [color:var(--rc-ink)] [text-wrap:balance]",children:e}),f&&(0,t.jsx)("p",{className:"mb-0 mt-1 text-[14px] leading-[1.4] [color:var(--rc-muted)]",children:f})]}),(T||S)&&(0,t.jsxs)("div",{className:"mt-6 flex items-end justify-between gap-4",children:[(0,t.jsxs)("div",{className:"flex min-w-0 flex-col gap-1",children:[T&&(0,t.jsx)("span",{className:"text-[12px] leading-4 [color:var(--rc-muted)]",children:T}),S&&(0,t.jsx)("span",{className:"overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[15px] leading-5 tracking-[0.02em] tabular-nums [color:var(--rc-ink)]",children:S})]}),(0,t.jsxs)("span",{className:"relative box-border flex h-11 w-11 flex-none items-center justify-center",style:c,children:[(0,t.jsx)("span",{className:"pointer-events-none absolute inset-0 rounded-[inherit]",style:u}),(0,t.jsx)(a.f,{icon:o,size:22,strokeWidth:1.6})]})]})]})}),(0,t.jsx)("span",{className:"pointer-events-none absolute inset-0 z-[2] rounded-[inherit]",style:s})]}),(0,t.jsx)("video",{ref:J,className:"pointer-events-none absolute left-0 top-0 h-px w-px opacity-0",muted:!0,loop:!0,playsInline:!0,crossOrigin:"anonymous","aria-hidden":"true"}),(0,t.jsx)("video",{ref:Q,className:"pointer-events-none absolute left-0 top-0 h-px w-px opacity-0",muted:!0,playsInline:!0,"aria-hidden":"true"})]})});e.s(["default",0,w],79298)},31834,function(e){e.n(e.i(79298))}]);