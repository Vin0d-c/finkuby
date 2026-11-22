(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,48585,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let o=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,l=`#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uResolution;
uniform float uDpr;
uniform float uScale;
uniform float uTime;
uniform float uBeamX;
uniform vec4 uSurface;
uniform float uRadius;
uniform vec3 uIntro;
uniform vec4 uPour;
uniform vec2 uRun;
uniform vec4 uLens;
uniform sampler2D uReveal;
uniform vec4 uRevealMap;
uniform vec2 uRevealInfo;
uniform float uAtmosphere;
uniform vec4 uAmount;
uniform vec4 uShape;
uniform vec4 uExtra;
uniform float uTheme;
uniform vec3 uTint[16];

#define BEAM uTint[0]
#define LEFT uTint[1]
#define RIGHT uTint[2]
#define CYAN uTint[3]
#define PINK uTint[4]
#define LILAC uTint[5]
#define SKY uTint[6]
#define PURPLE uTint[7]
#define DEEP uTint[8]
#define MIST uTint[9]
#define NAVY uTint[10]
#define WARM uTint[11]
#define EMBER uTint[12]
#define WHITE uTint[13]
#define HAZE uTint[14]
#define LAVENDER uTint[15]

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

float sq(float x) {
  return x * x;
}

float roundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

vec3 spill(float e, float fall, float strength, float front, float t, out vec3 glow) {
  glow = vec3(0.0);
  if (strength < 0.0005) return vec3(0.0);
  float f = max(fall, 0.0);
  float d = max(e, 0.0);
  float u = d / (6.0 + 0.28 * f);
  float start = smoothstep(-6.0, 12.0, fall);
  float fade = exp(-sq(max(f - 125.0, 0.0) / 40.0));
  float streak = 0.88 + 0.24 * noise(vec2(u * 6.0, f / 22.0 - t * 1.7));
  float bright = pow(strength, 1.5);
  float soft = sqrt(strength);
  float warmth = smoothstep(90.0, 130.0, f);
  vec3 coreK = mix(WHITE, WARM, warmth * exp(-d / 9.0));
  float core = mix(9.0, 2.6, warmth) * exp(-sq(d / (3.5 + 0.04 * f))) * exp(-sq(max(f - 130.0, 0.0) / 38.0));
  float wall = 24.0 * exp(-sq(d / 1.1)) * exp(-sq(max(f - 100.0, 0.0) / 30.0));
  float bandCenter = 0.7 - 0.3 * smoothstep(30.0, 110.0, f);
  float offset = u - bandCenter;
  float decay = (1.05 - bandCenter) / 1.31;
  float profile = offset < 0.0 ? exp(-sq(offset / 0.3)) : exp(-offset / decay);
  profile *= 1.0 - smoothstep(1.0, 1.4, u);
  vec3 bandA = mix(CYAN, PINK, smoothstep(50.0, 75.0, f));
  bandA = mix(bandA, LILAC, smoothstep(100.0, 125.0, f));
  vec3 bandB = mix(SKY, PURPLE, smoothstep(50.0, 75.0, f));
  vec3 fanK = mix(bandA, bandB, smoothstep(0.06, 0.18, offset));
  fanK = mix(fanK, DEEP, smoothstep(0.22, 0.42, offset));
  vec3 thread = WHITE * wall * bright + coreK * core * streak * bright;
  glow += fanK * 4.5 * profile * fade * streak * bright;
  glow += MIST * 0.7 * exp(-max(u - 1.0, 0.0) / 0.9) * smoothstep(0.7, 1.2, u) * fade * soft;
  glow += EMBER * 0.35 * exp(-sq((f - 165.0) / 22.0)) * exp(-d / 25.0) * bright;
  float lag = u * (6.0 + 0.28 * f) * 0.35;
  float reveal = 1.0 - smoothstep(front - 70.0, front + 8.0, f + lag);
  glow *= start * reveal;
  return thread * start * reveal;
}

vec3 easeLight(vec3 light, float amount) {
  return -log(max(1.0 - amount * (1.0 - exp(-light)), vec3(0.0001)));
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 p = frag / uScale;
  float t = uTime;
  float bx = uBeamX / uScale;
  float sl = uSurface.x / uScale;
  float sy = uSurface.y / uScale;
  float sr = uSurface.z / uScale;
  float sb = uSurface.w / uScale;
  float radius = uRadius / uScale;
  float dx = p.x - bx;
  float adx = abs(dx);
  float h = sy - p.y;
  float hp = max(h, 0.0);
  float above = smoothstep(-0.5, 0.5, h);
  float side = smoothstep(-24.0, 24.0, dx);
  vec3 sideK = mix(mix(LAVENDER, LEFT, smoothstep(40.0, 140.0, adx)), RIGHT, side);
  float beamWidth = uShape.x;
  float flare = uShape.y;
  float spread = 250.0 * uShape.z;
  float reachL = max(bx - sl, 1.0);
  float reachR = max(sr - bx, 1.0);
  float reach = dx < 0.0 ? reachL : reachR;
  float layerLen = clamp(0.29 * reach, 20.0, 100.0) * sqrt(uShape.z);
  float run = uRun.x;
  float runMask = 1.0 - smoothstep(run - 34.0, run + 6.0, adx);
  float bead = exp(-sq((adx - run + 16.0) / (18.0 + 0.04 * run))) * uRun.y;
  float flowMask = (1.0 - smoothstep(0.75 * spread, 1.1 * spread, adx)) * runMask;
  float edgeMask = (1.0 - smoothstep(0.8 * spread, 1.25 * spread, adx)) * runMask;
  float bloom = uIntro.y;
  vec2 center = vec2((sl + sr) * 0.5, (sy + sb) * 0.5);
  vec2 halfSize = vec2((sr - sl) * 0.5, (sb - sy) * 0.5);
  float sd = roundBox(p - center, halfSize, radius);
  float outline = max(sd, 0.0);
  float below = max(p.y - sy - radius, 0.0);
  float hug = smoothstep(-0.5, 0.5, sd) * exp(-sq(below / 14.0));
  float hugWide = smoothstep(-0.5, 0.5, sd) * exp(-sq(below / 40.0));

  vec3 col = vec3(0.0);

  float breathe = 1.0 + uExtra.x * (0.12 * sin(t * 1.5708) + 0.08 * (noise(vec2(t * 0.5, 3.0)) - 0.5));

  float front = uIntro.x / uScale;
  float drop = smoothstep(front + 10.0, front - 110.0, p.y);
  float falling = 1.0 - smoothstep(sy - 24.0, sy, front);
  float top = mix(0.3, 1.0, smoothstep(0.0, 0.3 * sy, p.y));
  float beamCore = 24.0 * exp(-adx / (2.0 * beamWidth));
  float beamHalo = 1.3 * exp(-adx / (6.0 * beamWidth)) + 0.3 * exp(-adx / (22.0 * beamWidth));
  vec3 haloK = mix(BEAM, sideK, exp(-hp / 80.0));
  col += (BEAM * beamCore + haloK * beamHalo) * top * above * drop;
  float head = exp(-sq((p.y - front) / 24.0)) * falling;
  col += mix(WHITE, BEAM, 0.35) * head * (7.0 * exp(-adx / (2.6 * beamWidth)) + 1.0 * exp(-adx / (14.0 * beamWidth)));

  float psi = adx * (outline + 1.0);
  float rise = max(hp - 17.9 * flare, 0.0);
  float skirtAmp = 16.6 * (exp(-sq(rise / (11.8 * flare))) + 0.3 * exp(-rise / (60.0 * flare)));
  float skirtSpread = mix(134.0, 155.0, side) * breathe * flare * flare * mix(0.35, 1.0, min(bloom, 1.0)) * max(bloom, 1.0);
  float skirt = skirtAmp * exp(-psi / skirtSpread) * exp(-sq(adx / (max(layerLen, 60.0 * sqrt(uShape.z)) * 1.48))) * hug;
  col += sideK * skirt * flowMask * min(bloom, 1.0);

  float layer = 12.0 * exp(-adx / layerLen) * exp(-outline / (0.19 * layerLen)) * (1.0 + 0.4 * bead);
  col += sideK * layer * hug * flowMask * min(bloom, 1.0);
  float washMask = smoothstep(sl - 60.0, sl + 6.0, p.x) * (1.0 - smoothstep(sr - 6.0, sr + 45.0, p.x));
  float wash = 1.4 * exp(-adx / 100.0) * exp(-outline / 30.0);
  col += mix(BEAM, sideK, 0.25) * wash * hugWide * washMask * flowMask * min(bloom, 1.0);
  float highWash = 0.7 * exp(-adx / 140.0) * exp(-outline / 60.0);
  col += mix(BEAM, NAVY, 0.5) * highWash * hugWide * washMask * runMask * min(bloom, 1.0);

  float sideSign = dx < 0.0 ? 0.0 : 1.0;
  float along = 0.5 * log((hp + 1.0) / (adx + 1.0));
  float lineScale = 6.0;
  float lp = log(max(psi, 1.0) / (120.0 * flare * flare)) * lineScale;
  float lineIndex = floor(lp) + sideSign * 97.0;
  float wobble = 0.22 * (noise(vec2(lineIndex * 3.7, t * 0.4 + along)) - 0.5);
  float lf = fract(lp + wobble) - 0.5;
  float gradient = lineScale * length(vec2(hp + 1.0, adx)) / max(psi, 1.0) / uScale;
  float halfWidth = max(0.35 * gradient, 0.0001);
  float drawWidth = max(halfWidth, 0.6 * gradient);
  float lineShape = exp(-lf * lf / (drawWidth * drawWidth)) * (halfWidth / drawWidth);
  float lineOn = step(0.3, hash(vec2(lineIndex, 1.3)));
  float lineFlow = smoothstep(0.25, 0.85, noise(vec2(lineIndex * 5.3 + 2.0, along * 3.0 + t * 1.1)));
  float flareArea = 120.0 * flare * flare;
  float lineEnvelope = smoothstep(0.85 * flareArea, 1.4 * flareArea, psi) * (1.0 - smoothstep(3.2 * flareArea, 7.5 * flareArea, psi));
  lineEnvelope *= exp(-adx / (layerLen * 1.5)) * hug * flowMask * (1.0 - smoothstep(35.0 * flare, 80.0 * flare, hp));
  float lineBright = mix(0.35, 1.0, hash(vec2(lineIndex, 4.0)));
  col += mix(sideK, WHITE, 0.6) * lineShape * lineOn * lineFlow * lineEnvelope * lineBright * 2.6 * uAmount.w * min(bloom, 1.0);

  float edgeGlow = 22.8 * exp(-sq(adx / (150.0 * uShape.z))) * edgeMask * (1.0 + 0.9 * bead);
  float onTop = 1.0 - smoothstep(sy + radius, sy + radius + 10.0, p.y);
  float edgeLine = (exp(-sq(max(sd, 0.0) / 0.9)) + 0.12 * exp(-max(sd, 0.0) / 3.0)) * edgeGlow * onTop;
  col += mix(sideK, WHITE, 0.6) * edgeLine * min(bloom, 1.0);

  float pour = uShape.w;
  float baseline = exp(-sq(130.0 / 150.0));
  float strengthR = exp(-sq(reachR / (150.0 * uShape.z))) * (1.0 - smoothstep(0.8 * spread, 1.25 * spread, reachR)) / baseline * pour;
  float strengthL = exp(-sq(reachL / (150.0 * uShape.z))) * (1.0 - smoothstep(0.8 * spread, 1.25 * spread, reachL)) / baseline * pour;
  float fallY = p.y - sy - 0.3 * radius;
  float rightHalf = smoothstep(center.x - 4.0, center.x + 4.0, p.x);
  float haloR = exp(-length(p - vec2(sr - 0.3 * radius, sy + 0.3 * radius)) / 40.0) * sqrt(strengthR);
  float haloL = exp(-length(p - vec2(sl + 0.3 * radius, sy + 0.3 * radius)) / 40.0) * sqrt(strengthL);
  vec3 glowR;
  vec3 glowL;
  col += spill(sd, fallY, strengthR, uPour.y, t, glowR) * rightHalf;
  col += spill(sd, fallY, strengthL, uPour.x, t, glowL) * (1.0 - rightHalf);
  col += easeLight(glowR * rightHalf + NAVY * 0.9 * haloR, uPour.w);
  col += easeLight(glowL * (1.0 - rightHalf) + NAVY * 0.9 * haloL, uPour.z);

  vec2 toLens = frag - uLens.xy;
  float lens = exp(-dot(toLens, toLens) / sq(uLens.z)) * uLens.w;
  col *= 1.0 + 0.35 * lens * hug;
  float fogAmount = uAmount.y * uAtmosphere;
  float near = exp(-adx / 150.0);
  float envelope = near * (0.3 + 0.4 * exp(-hp / 50.0) + 1.2 * exp(-p.y / 120.0));
  if (fogAmount > 0.001 && h > -2.0 && envelope * max(0.25, 6.0 * exp(-adx / 50.0)) > 0.002) {
    vec2 fq = vec2(dx / 1.7, h) / 85.0 + vec2(t * 0.012, -t * 0.03) + uExtra.zw;
    vec2 fw = vec2(fbm(fq * 1.3 + vec2(1.7, 9.2) + t * 0.03), fbm(fq * 1.3 + vec2(8.3, 2.8) - t * 0.025));
    float cloud = fbm(fq + 1.4 * fw);
    float density = smoothstep(0.5, 0.78, cloud);
    float lit = exp(-adx / 50.0);
    float fogMask = smoothstep(-2.0, 20.0, h);
    float reached = smoothstep(front + 80.0, front - 40.0, p.y);
    vec3 fog = (HAZE * 0.45 + BEAM * 6.0 * lit * reached) * density * envelope * fogMask;
    float surfaceLit = exp(-adx / (layerLen * 1.3)) * exp(-outline / 28.0) * hugWide * flowMask * washMask * min(bloom, 1.0);
    fog += sideK * 2.2 * surfaceLit * (smoothstep(0.38, 0.72, cloud) - 0.35) * fogMask;
    float smoke = smoothstep(0.3, 0.75, cloud);
    fog += BEAM * 0.35 * exp(-adx / (22.0 * beamWidth)) * (0.35 + 0.9 * smoke) * fogMask * top * drop;
    col += fog * fogAmount * (1.0 + 1.2 * lens) * mix(1.0, 0.45, uTheme);
  }

  if (uRevealInfo.y > 0.001 && uLens.w > 0.002) {
    vec2 toReveal = frag - uLens.xy;
    float reveal = exp(-dot(toReveal, toReveal) / sq(uRevealInfo.x)) * uLens.w;
    vec2 uv = frag * uRevealMap.xy + uRevealMap.zw;
    float onImage = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
    vec4 ui = texture(uReveal, uv);
    float ink = max(ui.r, max(ui.g, ui.b)) * onImage;
    float lit = clamp(col.b * 0.9, 0.0, 1.0) * (1.0 - smoothstep(0.9, 2.2, col.b));
    float clearance = smoothstep(60.0 * sqrt(beamWidth), 150.0 * sqrt(beamWidth), adx);
    col += mix(BEAM, WHITE, 0.4) * ink * reveal * lit * clearance * uRevealInfo.y * 2.2;
  }

  float haze = col.b;
  float dotGrid = 1.0 - smoothstep(0.16, 0.32, length(fract(frag / 3.0) - 0.5));
  col += BEAM * dotGrid * clamp(haze, 0.0, 1.5) * (1.0 - smoothstep(1.5, 4.0, haze)) * (0.18 + 0.3 * lens) * uExtra.y;
  if (lens > 0.002) {
    vec2 drift = frag - vec2(0.0, t * 14.0);
    vec2 sparkCell = floor(drift / 7.0);
    vec2 sparkPos = (sparkCell + 0.2 + 0.6 * vec2(hash(sparkCell + 5.1), hash(sparkCell + 2.3))) * 7.0;
    float sparkDist = length(drift - sparkPos);
    float sparkOn = step(0.8, hash(sparkCell + 8.8));
    float sparkTwinkle = 0.5 + 0.5 * sin(t * 5.0 + hash(sparkCell + 3.7) * 6.283);
    col += WHITE * exp(-sparkDist * sparkDist / 0.35) * sparkOn * sparkTwinkle * lens * clamp(haze * 1.5, 0.0, 1.0) * 1.6 * uAmount.z;
  }

  float dustAmount = uAmount.z;
  if (dustAmount > 0.001) {
    float dustLp = log(max(psi, 1.0) / (120.0 * flare * flare)) * 2.2;
    vec2 flowCell = vec2(dustLp / 1.1, (along + t * 0.22) / 0.06);
    vec2 cellId = floor(flowCell) + vec2(sideSign * 131.0, 0.0);
    vec2 cellJitter = vec2(hash(cellId + 1.7), hash(cellId + 8.3));
    vec2 particleFlow = (floor(flowCell) + 0.1 + cellJitter * 0.8) * vec2(1.1, 0.06);
    float particlePsi = 120.0 * flare * flare * exp(particleFlow.x / 2.2);
    float particleAlong = particleFlow.y - t * 0.22;
    float particleX = sqrt(particlePsi * exp(-2.0 * particleAlong)) - 1.0;
    float particleH = sqrt(particlePsi * exp(2.0 * particleAlong)) - 1.0;
    float particleDist = length(vec2(adx - particleX, hp - particleH)) * uScale;
    float particleOn = step(0.62, hash(cellId + 3.1));
    float particleTwinkle = 0.5 + 0.5 * sin(t * 5.0 + hash(cellId + 9.2) * 6.283);
    float dustZone = exp(-sq(log(max(psi, 1.0) / (200.0 * flare * flare)) / 0.55)) * hug * flowMask * smoothstep(0.0, 6.0, outline);
    col += WHITE * exp(-particleDist * particleDist / 0.3) * particleOn * particleTwinkle * dustZone * 3.0 * dustAmount * min(bloom, 1.0);

    vec2 glitterCell = vec2(dx / 3.0, (p.y - t * 26.0) / 9.0);
    vec2 glitterId = floor(glitterCell);
    vec2 glitterJitter = vec2(hash(glitterId + 4.4), hash(glitterId + 2.9));
    vec2 glitterPos = (glitterId + 0.15 + glitterJitter * 0.7) * vec2(3.0, 9.0);
    float glitterDist = length(vec2(dx, p.y - t * 26.0) - glitterPos) * uScale;
    float glitterOn = step(0.7, hash(glitterId + 6.6));
    float glitterTwinkle = 0.5 + 0.5 * sin(t * 6.0 + hash(glitterId + 1.1) * 6.283);
    float glitterZone = exp(-adx / (5.0 * beamWidth)) * smoothstep(1.5, 4.0, adx / beamWidth) * above * smoothstep(25.0, 70.0, hp) * top * drop;
    col += WHITE * exp(-glitterDist * glitterDist / 0.25) * glitterOn * glitterTwinkle * glitterZone * 2.2 * dustAmount * uAtmosphere;
  }

  col *= uAmount.x * (1.0 + uIntro.z * 0.9 * exp(-length(vec2(dx, h * 1.6)) / 70.0));
  col *= smoothstep(-0.75, 0.25, sd * uScale);

  vec3 emit = 1.0 - exp(-col * mix(1.0, 0.6, uTheme));
  float peak = max(emit.r, max(emit.g, emit.b));
  if (uTheme > 0.5) {
    float low = min(emit.r, min(emit.g, emit.b));
    float chroma = peak - low;
    vec3 hue = (emit - low) / max(chroma, 0.0001);
    float alpha = clamp(pow(chroma, 1.35) * 1.3, 0.0, 1.0) * 0.9;
    outColor = vec4((hue * 0.82 + 0.06) * alpha, alpha);
  } else {
    outColor = vec4(emit, peak);
  }
}`,r=[[0,1],[-11.5,.77],[9.5,.95],[-53.5,.79],[39.5,.77],[16,.81],[-16.3,.92],[13.3,.96],[3,1.01],[1,.68],[1,1.15],[142.5,.51],[113.6,.28],[-7.5,.13],[-2.7,.32],[7.5,.81]],i=(e,t,a)=>Math.min(a,Math.max(t,e)),n=e=>{let[t,a]=(([e,t,a])=>{let o=Math.max(e,t,a),l=o-Math.min(e,t,a),r=0;return l>0&&(r=o===e?(t-a)/l%6:o===t?(a-e)/l+2:(e-t)/l+4),[(60*r+360)%360,o>0?l/o:0]})(e),o=a/.78,l=new Float32Array(3*r.length);return r.forEach(([e,a],r)=>{l.set(((e,t)=>{let a=(e%360+360)%360/60,o=t*(1-Math.abs(a%2-1)),l=1-t,[r,i,n]=a<1?[t,o,0]:a<2?[o,t,0]:a<3?[0,t,o]:a<4?[0,o,t]:a<5?[o,0,t]:[t,0,o];return[r+l,i+l,n+l]})(t+e,i(.78*a*o,0,1)),3*r)}),l},s=(e,t,a)=>{let o=e.createShader(t);return o?(e.shaderSource(o,a),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS))?o:(e.deleteShader(o),null):null},f=({surfaceRef:e,beamPosition:r=.6,surfaceLevel:f=1,color:u="#3847ff",intensity:h=1.8,beamWidth:m=1.5,flare:d=1.5,spread:p=1.5,spill:c=1,fog:x=.2,dust:g=1.6,streaks:v=1.5,dots:b=1,pulse:T=1.5,speed:w=1.5,seed:E=3,mouseInteraction:R=!0,revealImage:A,revealRadius:M=220,revealOpacity:y=.6,intro:L=!0,theme:S="dark",paused:I=!1,dpr:k,...P})=>{let W=(0,a.useRef)(null),q=(0,a.useRef)(null),B=(0,a.useRef)(null),C={surfaceRef:e,beamPosition:i(r,0,1),surfaceLevel:i(f,0,1),color:String(u),intensity:Math.max(0,h),beamWidth:i(m,.2,5),flare:i(d,.2,4),spread:i(p,.1,4),spill:Math.max(0,c),fog:Math.max(0,x),dust:Math.max(0,g),streaks:Math.max(0,v),dots:Math.max(0,b),pulse:Math.max(0,T),speed:w,seed:E,mouseInteraction:R,revealImage:A,revealRadius:Math.max(1,M),revealOpacity:i(y,0,1),intro:L,theme:S,paused:I,dpr:k},_=(0,a.useRef)(C);_.current=C,(0,a.useEffect)(()=>{let e,t,a,r=W.current,f=q.current,u=f?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!r||!f||!u)return;let h=(e=s(u,u.VERTEX_SHADER,o),t=s(u,u.FRAGMENT_SHADER,l),a=u.createProgram(),e&&t&&a?(u.attachShader(a,e),u.attachShader(a,t),u.linkProgram(a),u.deleteShader(e),u.deleteShader(t),u.getProgramParameter(a,u.LINK_STATUS))?a:(u.deleteProgram(a),null):null);if(!h)return;let m=((e,t,a)=>{let o={};for(let l of a)o[l]=e.getUniformLocation(t,l);return o})(u,h,["uResolution","uDpr","uScale","uTime","uBeamX","uSurface","uRadius","uIntro","uPour","uRun","uLens","uReveal","uRevealMap","uRevealInfo","uAtmosphere","uAmount","uShape","uExtra","uTheme","uTint"]),d=u.createVertexArray(),p=u.createBuffer();u.bindVertexArray(d),u.bindBuffer(u.ARRAY_BUFFER,p),u.bufferData(u.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),u.STATIC_DRAW);let c=u.getAttribLocation(h,"aPosition");u.enableVertexAttribArray(c),u.vertexAttribPointer(c,2,u.FLOAT,!1,0,0),u.bindVertexArray(null);let x=u.createTexture();u.bindTexture(u.TEXTURE_2D,x),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,1,1,0,u.RGBA,u.UNSIGNED_BYTE,new Uint8Array([0,0,0,0])),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MAG_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE);let g=document.createElement("canvas");g.width=1,g.height=1;let v=g.getContext("2d",{willReadFrequently:!0}),b=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,T={time:0,introTime:_.current.intro&&!b?0:5,width:1,height:1,ratio:1,colorKey:"",tints:n([.22,.28,1]),observed:null,pointer:{x:0,y:0,inside:!1},lens:{x:0,y:0,vx:0,vy:0,strength:0,placed:!1},reveal:{src:"",ready:!1,width:1,height:1,image:null}},w=0,E=0,R=!0,A=!0,M=()=>{let e=Math.max(1,r.clientWidth),t=Math.max(1,r.clientHeight),a=Math.min(_.current.dpr||window.devicePixelRatio||1,2),o=Math.max(e,t)*a,l=o>2048?2048*a/o:a,i=Math.max(1,Math.round(e*l)),n=Math.max(1,Math.round(t*l));(f.width!==i||f.height!==n)&&(f.width=i,f.height=n),T.width=e,T.height=t,T.ratio=f.width/e,y()},y=()=>{let e,t=_.current;t.color!==T.colorKey&&(T.colorKey=t.color,T.tints=n((e=>{if(!v)return[.22,.28,1];v.clearRect(0,0,1,1),v.fillStyle="#3847ff",v.fillStyle=e,v.fillRect(0,0,1,1);let[t,a,o]=v.getImageData(0,0,1,1).data;return[t/255,a/255,o/255]})(t.color)));let{width:a,height:o}=T,l=Math.max(.2,Math.min(a/585,o/507)),s=((e,t,a)=>{let o=e.surfaceRef?.current??null;if(o!==T.observed&&(T.observed&&C.unobserve(T.observed),o&&C.observe(o),T.observed=o),o){let e=r.getBoundingClientRect(),t=o.getBoundingClientRect();if(t.width>0){let a=getComputedStyle(o),l=Math.max(parseFloat(a.borderTopLeftRadius)||0,parseFloat(a.borderTopRightRadius)||0);return{left:t.left-e.left,top:t.top-e.top,right:t.right-e.left,bottom:t.bottom-e.top,radius:Math.min(l,t.width/2,t.height/2),real:!0}}}return{left:-(2*t),top:e.surfaceLevel*a,right:3*t,bottom:3*a,radius:0,real:!1}})(t,a,o),p=t.beamPosition*a;if(s.real){let e=s.radius+6;p>=s.left&&p<=s.right?p=i(p,s.left+e,s.right-e):s={left:-(2*a),top:o,right:3*a,bottom:3*o,radius:0,real:!1}}let c=-.15*o,g=s.top-c+.3*o,b=T.introTime,w=b>=5,E=w?s.top+.3*o:c+g*Math.pow(i(b/1.25,0,1),1.3),R=b-1.25*Math.pow(Math.max(0,s.top-c)/g,1/1.3),M=w?1:R<=0?0:1-Math.exp(-4.96*R)*(Math.cos((e=8*Math.sqrt(1-.3844))*R)+4.96/e*Math.sin(e*R)),y=w||R<=0?0:Math.exp(-R/.35)*(1-Math.exp(-R/.05)),L=250*t.spread*1.3+80,S=w?1e5:R<=0?-40:L*(1-Math.exp(-1.15*R)),I=w||R<=0?0:Math.exp(-1.15*R)*(1-Math.exp(-R/.08)),k=e=>{if(w)return[1e3,1];if(R<=0)return[-e,0];let t=Math.min(e,.97*L),a=R- -Math.log(1-t/L)/1.15,o=i((a+.15)/.8,0,1),l=o*o*o*(o*(6*o-15)+10);return a<=0?[S-t,l]:[1.15*(L-t)*a+260*a*a,l]},[P,W]=k((p-s.left)/l),[q,D]=k((s.right-p)/l),U=w?1:R<=0?.3*(1-Math.pow(1-i(b/1.25,0,1),3)):.3+.7*(1-Math.exp(-1.3*R)),H=Number(t.seed)||0;u.viewport(0,0,f.width,f.height),u.clearColor(0,0,0,0),u.clear(u.COLOR_BUFFER_BIT),u.useProgram(h),u.uniform2f(m.uResolution,a,o),u.uniform1f(m.uDpr,T.ratio),u.uniform1f(m.uScale,l),u.uniform1f(m.uTime,T.time),u.uniform1f(m.uBeamX,p),u.uniform4f(m.uSurface,s.left,s.top,s.right,s.bottom),u.uniform1f(m.uRadius,s.radius),u.uniform3f(m.uIntro,E,M,y),u.uniform4f(m.uPour,P,q,W,D),u.uniform2f(m.uRun,S,I),u.uniform4f(m.uLens,T.lens.x,T.lens.y,95*l,T.lens.strength),(e=>{let t=e.revealImage?String(e.revealImage):"",a=T.reveal;if(t===a.src||(a.src=t,a.ready=!1,a.image&&(a.image.onload=null),!t))return;let o=new Image;o.crossOrigin="anonymous",o.decoding="async",o.onload=()=>{if(!A||a.src!==t)return;let e=o.naturalWidth||o.width||1,l=o.naturalHeight||o.height||1,r=Math.min(1,2048/Math.max(e,l)),i=document.createElement("canvas");i.width=Math.max(1,Math.round(e*r)),i.height=Math.max(1,Math.round(l*r)),i.getContext("2d")?.drawImage(o,0,0,i.width,i.height),u.bindTexture(u.TEXTURE_2D,x),u.pixelStorei(u.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),u.texImage2D(u.TEXTURE_2D,0,u.RGBA,u.RGBA,u.UNSIGNED_BYTE,i),u.pixelStorei(u.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.width=i.width,a.height=i.height,a.ready=!0,B.current?.()},o.src=t,a.image=o})(t);let{reveal:F}=T,K=Math.max(a/F.width,o/F.height),N=F.width*K,X=F.height*K;u.activeTexture(u.TEXTURE0),u.bindTexture(u.TEXTURE_2D,x),u.uniform1i(m.uReveal,0),u.uniform4f(m.uRevealMap,1/N,1/X,(N-a)/2/N,(X-o)/2/X),u.uniform2f(m.uRevealInfo,t.revealRadius,F.ready?t.revealOpacity:0),u.uniform1f(m.uAtmosphere,U),u.uniform4f(m.uAmount,t.intensity,t.fog,t.dust,t.streaks),u.uniform4f(m.uShape,t.beamWidth,t.flare,t.spread,t.spill),u.uniform4f(m.uExtra,t.pulse,t.dots,34.34+7.31*H,11.58+3.17*H),u.uniform1f(m.uTheme,+("light"===t.theme)),u.uniform3fv(m.uTint,T.tints),u.bindVertexArray(d),u.drawArrays(u.TRIANGLES,0,3),u.bindVertexArray(null)},L=e=>{if(w=0,!A||!R||document.hidden)return;let t=_.current,a=E?Math.min(.05,(e-E)/1e3):1/60;E=e;let o=!t.paused&&!b;o&&(T.time+=a*t.speed);let l=T.introTime<5;l&&(T.introTime=Math.min(5,T.introTime+a));let{pointer:r,lens:i}=T,n=t.mouseInteraction&&r.inside&&!b;n&&!i.placed&&(i.x=r.x,i.y=r.y,i.vx=0,i.vy=0,i.placed=!0);let s=120*(r.x-i.x)-19*i.vx,f=120*(r.y-i.y)-19*i.vy;i.vx+=s*a,i.vy+=f*a,i.x+=i.vx*a,i.y+=i.vy*a;let u=+!!n;i.strength+=(u-i.strength)*(1-Math.exp(-a/(u>i.strength?.3:.55))),i.strength<.001&&!n&&(i.placed=!1),y();let h=Math.abs(T.lens.strength-(t.mouseInteraction&&T.pointer.inside?1:0))>.002||Math.hypot(T.lens.vx,T.lens.vy)>.5;o||l||h?w=requestAnimationFrame(L):E=0},S=()=>{!w&&A&&R&&!document.hidden&&(w=requestAnimationFrame(L))},I=e=>{let t=r.getBoundingClientRect(),a=e.clientX-t.left,o=e.clientY-t.top;T.pointer.x=a,T.pointer.y=o,T.pointer.inside=a>=0&&o>=0&&a<=t.width&&o<=t.height,S()},k=()=>{T.pointer.inside=!1,S()},P=()=>{E=0,S()},C=new ResizeObserver(M);C.observe(r);let D=new IntersectionObserver(e=>{(R=e.some(e=>e.isIntersecting))&&(E=0,S())});return D.observe(r),window.addEventListener("pointermove",I,{passive:!0}),document.documentElement.addEventListener("pointerleave",k),document.addEventListener("visibilitychange",P),M(),S(),B.current=()=>{w||y(),S()},()=>{A=!1,cancelAnimationFrame(w),B.current=null,C.disconnect(),D.disconnect(),window.removeEventListener("pointermove",I),document.documentElement.removeEventListener("pointerleave",k),document.removeEventListener("visibilitychange",P),u.deleteTexture(x),u.deleteBuffer(p),u.deleteVertexArray(d),u.deleteProgram(h)}},[]),(0,a.useEffect)(()=>{B.current?.()});let{className:D="",...U}=P;return(0,t.jsx)("div",{ref:W,className:`pointer-events-none relative h-full w-full${D?` ${D}`:""}`,...U,children:(0,t.jsx)("canvas",{ref:q,className:"absolute inset-0 block h-full w-full","aria-hidden":"true"})})};e.s(["LaserFlow",0,f,"default",0,f])},83123,function(e){e.n(e.i(48585))}]);