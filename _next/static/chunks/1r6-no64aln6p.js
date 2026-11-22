(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,27987,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let n=`#version 300 es
layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec2 aCenter;
layout(location = 2) in vec4 aState;
uniform mat3 uView;
uniform vec2 uCanvas;
uniform vec2 uOffset;
uniform vec2 uLine;
uniform float uStretch;
uniform float uHead;
uniform float uPad;
uniform float uFar;
out vec2 vLocal;
out vec2 vHalf;
out float vEmphasis;
out float vFlash;
out float vAngle;
out float vShown;
void main() {
  float angle = aState.x;
  float emphasis = aState.y;
  float halfLength = uLine.x * (1.0 + uStretch * emphasis);
  float halfWidth = uLine.y;
  vec2 extent = vec2(halfLength + uPad, max(halfWidth, uHead * halfLength) + uPad);
  vec2 local = aCorner * extent;
  vec2 axis = vec2(cos(angle), sin(angle));
  vec2 point = aCenter + axis * local.x + vec2(-axis.y, axis.x) * local.y;
  vec3 screen = uView * vec3(point, 1.0);
  vec2 scale = vec2(2.0 / uCanvas.x, -2.0 / uCanvas.y);
  vec2 shift = vec2(-1.0 + 2.0 * uOffset.x / uCanvas.x, 1.0 - 2.0 * uOffset.y / uCanvas.y);
  gl_Position = vec4(screen.xy * scale + shift * screen.z, 0.0, screen.z);
  float depth = (uView * vec3(aCenter, 1.0)).z;
  vLocal = local;
  vHalf = vec2(halfLength, halfWidth);
  vEmphasis = emphasis;
  vFlash = aState.z;
  vAngle = angle;
  vShown = aState.w * (1.0 - smoothstep(uFar * 0.45, uFar, depth));
}`,r=`#version 300 es
precision highp float;
in vec2 vLocal;
in vec2 vHalf;
in float vEmphasis;
in float vFlash;
in float vAngle;
in float vShown;
out vec4 fragColor;
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uAccentMix;
uniform float uOpacity;
uniform float uFade;
uniform int uShape;
uniform float uHead;
uniform float uRainbow;
uniform float uTone;
uniform float uPeriod;
uniform vec2 uCanvas;
uniform vec2 uOffset;
uniform vec2 uPixels;
uniform vec2 uEdge;

float ndot(vec2 a, vec2 b) {
  return a.x * b.x - a.y * b.y;
}

float rhombus(vec2 p, vec2 b) {
  p = abs(p);
  float h = clamp(ndot(b - 2.0 * p, b) / dot(b, b), -1.0, 1.0);
  float d = length(p - 0.5 * b * vec2(1.0 - h, 1.0 + h));
  return d * sign(p.x * b.y + p.y * b.x - b.x * b.y);
}

float triangle(vec2 p, vec2 q) {
  p.x = abs(p.x);
  vec2 a = p - q * clamp(dot(p, q) / dot(q, q), 0.0, 1.0);
  vec2 b = p - q * vec2(clamp(p.x / q.x, 0.0, 1.0), 1.0);
  float s = -sign(q.y);
  vec2 d = min(vec2(dot(a, a), s * (p.x * q.y - p.y * q.x)), vec2(dot(b, b), s * (p.y - q.y)));
  return -sqrt(d.x) * sign(d.y);
}

float capsule(vec2 p, float from, float to, float radius) {
  float x = clamp(p.x, from, to);
  return length(vec2(p.x - x, p.y)) - radius;
}

float feather(float distance, float zone) {
  if (zone <= 0.0) return 1.0;
  float t = clamp(distance / zone, 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec3 spectrum(float hue, float tone) {
  vec3 k = clamp(abs(fract(hue + vec3(0.0, 2.0, 1.0) / 3.0) * 6.0 - 3.0) - 1.0, 0.0, 1.0);
  k = k * k * (3.0 - 2.0 * k);
  float chroma = (1.0 - abs(2.0 * tone - 1.0)) * 0.92;
  return tone + chroma * (k - 0.5);
}

void main() {
  vec2 p = vLocal;
  float aa = max(length(fwidth(p)) * 0.7071, 0.0001);
  float halfWidth = max(vHalf.y, aa * 0.5);
  float thin = vHalf.y / halfWidth;
  float halfLength = max(vHalf.x, halfWidth);
  float d;
  if (uShape == 1) {
    float head = min(halfLength * 0.9, max(halfWidth * 4.5, halfLength * 0.55));
    float wing = max(uHead * halfLength, halfWidth * 2.2);
    float shaft = capsule(p, -halfLength + halfWidth, halfLength - head * 0.6, halfWidth);
    float tip = triangle(vec2(p.y, halfLength - p.x), vec2(wing, head));
    d = min(shaft, tip);
  } else if (uShape == 2) {
    d = rhombus(p, vec2(halfLength, max(uHead * halfLength, halfWidth)));
  } else {
    d = capsule(p, -halfLength + halfWidth, halfLength - halfWidth, halfWidth);
  }
  float coverage = clamp(0.5 - d / aa, 0.0, 1.0) * thin;
  if (coverage <= 0.0) discard;

  float emphasis = clamp(vEmphasis + vFlash, 0.0, 1.0);
  vec3 color = mix(uColor, uAccent, uAccentMix * emphasis);
  if (uShape == 2) {
    float north = smoothstep(-aa, aa, p.x);
    color = mix(uColor, uAccent, north);
  }
  if (uRainbow > 0.5) {
    float hue = fract(vAngle / uPeriod);
    vec3 tint = spectrum(hue, uTone);
    color = uShape == 2 ? mix(tint, uColor, 1.0 - smoothstep(-aa, aa, p.x)) : tint;
  }
  float alpha = uOpacity * mix(1.0 - uFade, 1.0, clamp(vEmphasis, 0.0, 1.0));
  alpha = clamp(alpha + vFlash * 0.6, 0.0, 1.0) * coverage * vShown;
  vec2 point = vec2(gl_FragCoord.x, uPixels.y - gl_FragCoord.y) * (uCanvas / uPixels) - uOffset;
  vec2 inside = min(point, uCanvas - 2.0 * uOffset - point);
  alpha *= feather(inside.x, uEdge.x) * feather(inside.y, uEdge.y);
  fragColor = vec4(color * alpha, alpha);
}`,i=["orbit","attract","spiral","dipole"],l={line:0,arrow:1,needle:2},o=2*Math.PI,h=(e,t,a)=>Math.min(a,Math.max(t,e)),f=e=>e*e*e*(e*(6*e-15)+10),s=(e,t)=>{let a=t/2;return((e+a)%t+t)%t-a},u=e=>{let t=String(e||"").trim(),a=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(a){let e=3===a[1].length?a[1].replace(/./g,e=>e+e):a[1];return[0,2,4].map(t=>parseInt(e.slice(t,t+2),16)/255)}let n=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(t);if(n)return[n[1],n[2],n[3]].map(e=>h(parseFloat(e)/255,0,1));if("u">typeof document){let e=document.createElement("canvas").getContext("2d");if(e){e.fillStyle="#000000",e.fillStyle=t;let a=String(e.fillStyle);if("#000000"!==a||/^(#0{3}|#0{6}|black)$/i.test(t))return u(a)}}return[.94,.94,.94]},c=(e,t,a)=>{let n=e.createShader(t);return n?(e.shaderSource(n,a),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))?n:(console.error(e.getShaderInfoLog(n)),e.deleteShader(n),null):null},m=(e,t)=>{let a=[];for(let n=0;n<3;n++)for(let r=0;r<3;r++)a.push(e[3*n]*t[r]+e[3*n+1]*t[r+3]+e[3*n+2]*t[r+6]);return a},d=e=>{let[t,a,n,r,i,l,o,h,f]=e,s=i*f-l*h,u=l*o-r*f,c=r*h-i*o,m=t*s+a*u+n*c;return[s,n*h-a*f,a*l-n*i,u,t*f-n*o,n*r-t*l,c,a*o-t*h,t*i-a*r].map(e=>e/m)},p=(e,t,a)=>{let n=e[6]*t+e[7]*a+e[8];return[(e[0]*t+e[1]*a+e[2])/n,(e[3]*t+e[4]*a+e[5])/n,n]};e.s(["default",0,({spacing:e=30,rows:v,columns:x,containerSize:M,lineColor:g="#efefef",accentColor:y,lineWidth:w=2,lineHeight:b=18,baseAngle:A=-10,mode:F="orbit",shape:R="line",rainbow:S=!1,radius:E=200,fade:L=.65,edgeFade:P=0,stretch:C=.4,reach:B=0,scatter:I=0,inertia:_=.35,bounce:O=.3,ripple:T=.3,clickPulse:U=!0,intro:Y=!0,idle:q=!1,tiltX:W=0,tiltY:H=0,maxDevicePixelRatio:k=2,className:D="",style:N})=>{let V=(0,a.useRef)(null),$=(0,a.useRef)(null),z=(0,a.useRef)(null),X=(0,a.useRef)(null),[j,K]=(0,a.useState)(0),G="number"==typeof M?`${M}px`:M,J=!!G,Q=u(g),Z=y?u(y):null,ee={square:J,spacing:Math.max(4,Number(e)||30),rows:v?h(Math.round(v),1,400):0,columns:x?h(Math.round(x),1,400):0,lineWidth:w,lineHeight:b,baseAngle:A*Math.PI/180,mode:i.includes(F)?F:"orbit",shape:void 0!==l[R]?R:"line",color:Q,accent:Z??("needle"===R?u("#f43f5e"):Q),accentMix:+!!Z,rainbow:S,tone:h((Math.max(...Q)+Math.min(...Q))/2,.42,.66),radius:Math.max(1,E),fade:h(L,0,1),edgeFade:h(P,0,1),stretch:h(C,0,2),reach:Math.max(0,B),scatter:h(I,0,1),inertia:h(_,0,1),bounce:h(O,0,1),ripple:h(T,0,1),clickPulse:U,intro:Y,idle:q,tiltX:h(W,-70,70),tiltY:h(H,-70,70),maxRatio:h(k,.5,3)},et=(0,a.useRef)(ee);return et.current=ee,(0,a.useEffect)(()=>{X.current?.()}),(0,a.useEffect)(()=>{let e=V.current,t=$.current,a=z.current;if(!e||!t||!a)return;let i=t.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"default"}),u=i?(e=>{let t=c(e,e.VERTEX_SHADER,n),a=c(e,e.FRAGMENT_SHADER,r),i=t&&a?e.createProgram():null;if(!t||!a||!i)return t&&e.deleteShader(t),a&&e.deleteShader(a),null;if(e.attachShader(i,t),e.attachShader(i,a),e.linkProgram(i),e.deleteShader(t),e.deleteShader(a),!e.getProgramParameter(i,e.LINK_STATUS))return console.error(e.getProgramInfoLog(i)),e.deleteProgram(i),null;let l={},o=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let t=0;t<o;t++){let a=e.getActiveUniform(i,t);a&&(l[a.name]=e.getUniformLocation(i,a.name))}return{program:i,uniforms:l}})(i):null;if(!i||!u)return;let v=window.matchMedia("(prefers-reduced-motion: reduce)").matches,x=i.createVertexArray();i.bindVertexArray(x);let M=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,M),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW),i.enableVertexAttribArray(0),i.vertexAttribPointer(0,2,i.FLOAT,!1,0,0);let g=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,g),i.enableVertexAttribArray(1),i.vertexAttribPointer(1,2,i.FLOAT,!1,0,0),i.vertexAttribDivisor(1,1);let y=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,y),i.enableVertexAttribArray(2),i.vertexAttribPointer(2,4,i.FLOAT,!1,0,0),i.vertexAttribDivisor(2,1),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA);let w={width:1,height:1,pad:0,ratio:1,view:null,length:20,thickness:2,fill:!0,edgePad:1,minScale:1,maxScale:1,introSpeed:700,bounds:[0,0,0,0],key:""},b={x:0,y:0,vx:0,vy:0,time:0,seen:!1,inside:!1,away:0},A={x:0,y:0,heading:0},F=[],R=0,S=new Float32Array(0),E=new Int32Array(0),L=new Float32Array(0),P=new Float32Array(0),C=new Float32Array(0),B=new Float32Array(0),I=new Float32Array(0),_=new Float32Array(0),O=new Float32Array(0),T=new Uint8Array(0),U=new Float32Array(0),Y=-1,q=et.current.intro&&!v&&0===j,W=0,H=0,k=0,D=!0,N="hidden"!==document.visibilityState,G=!1,J=!0,Q=e=>"number"==typeof e?e:(a.style.width=String(e),a.getBoundingClientRect().width),Z=(e,t,a,n)=>{let r=a-S[2*t],i=n-S[2*t+1];if("dipole"===e.mode){let e=Math.hypot(r,i)||1,t=-r/e,a=-i/e,n=Math.cos(A.heading),l=Math.sin(A.heading),o=n*t+l*a;return Math.atan2(3*o*a-l,3*o*t-n)}let l=Math.atan2(i,r);return"attract"===e.mode?l:"spiral"===e.mode?l+Math.PI/4:l+Math.PI/2},ee=a=>{if(W=0,G)return;let n=et.current,r=h((a-H)/1e3||0,0,.05);H=Math.max(H,a),k+=r,J&&(()=>{let a=et.current,n=e.getBoundingClientRect(),r=Math.max(1,n.width),l=Math.max(1,n.height),o=Math.max(1,Q(a.lineHeight)),h=Math.max(.25,Q(a.lineWidth)),f=!a.square,s=f&&(0!==a.tiltX||0!==a.tiltY),u=((e,t,a,n,r)=>{let i=e*Math.PI/180,l=t*Math.PI/180,o=1.25*Math.max(a,n),h=[Math.cos(l),0,0,Math.sin(i)*Math.sin(l),Math.cos(i),0,Math.sin(l)*Math.cos(i)/o,-Math.sin(i)/o,1];if(r){let e=m([1,0,a/2,0,1,n/2,0,0,1],h);return{forward:e,inverse:d(e),minScale:1,maxScale:1}}let f=[[-a/2,-n/2],[a/2,-n/2],[a/2,n/2],[-a/2,n/2]].map(([e,t])=>p(h,e,t)),s=f.map(e=>e[0]),u=f.map(e=>e[1]),c=Math.min(1,a/Math.max(1,Math.max(...s)-Math.min(...s)),n/Math.max(1,Math.max(...u)-Math.min(...u))),v=m([c,0,a/2-(Math.max(...s)+Math.min(...s))/2*c,0,c,n/2-(Math.max(...u)+Math.min(...u))/2*c,0,0,1],h),x=f.map(e=>c/Math.abs(e[2]));return{forward:v,inverse:d(v),minScale:Math.min(...x),maxScale:Math.max(...x)}})(a.tiltX,a.tiltY,r,l,f),c=Math.min(window.devicePixelRatio||1,a.maxRatio),v=Math.max(1,Math.round(a.columns||(a.rows?a.rows*r/l:r/a.spacing))),x=Math.max(1,Math.round(a.rows||(a.columns?a.columns*l/r:l/a.spacing)));if(v*x>3e4){let e=Math.sqrt(v*x/3e4);v=Math.max(1,Math.floor(v/e)),x=Math.max(1,Math.floor(x/e))}let M=[f,v,x,r.toFixed(1),l.toFixed(1),s?`${a.tiltX},${a.tiltY}`:""].join("|");M!==w.key&&(w.key=M,((e,t,a,n,r,l)=>{let o=e/n,h=t/r,f=l?((e,t,a,n,r)=>{let i=e.inverse,l=2*Math.max(n,r),o=[[-l,-l],[t+l,-l],[t+l,a+l],[-l,a+l]],h=([e,t])=>i[6]*e+i[7]*t+i[8]-.25,f=[];if(o.forEach((e,t)=>{let a=o[(t+1)%o.length],n=h(e),r=h(a);if(n>=0&&f.push(e),n>=0!=r>=0){let t=n/(n-r);f.push([e[0]+(a[0]-e[0])*t,e[1]+(a[1]-e[1])*t])}}),f.length<3)return null;let s=1/0,u=1/0,c=-1/0,m=-1/0;for(let[e,t]of f){let a=p(i,e,t);s=Math.min(s,a[0]),u=Math.min(u,a[1]),c=Math.max(c,a[0]),m=Math.max(m,a[1])}return{fromColumn:Math.floor((s+t/2)/n-.5)-1,toColumn:Math.ceil((c+t/2)/n-.5)+1,fromRow:Math.floor((u+a/2)/r-.5)-1,toRow:Math.ceil((m+a/2)/r-.5)+1}})(a,e,t,o,h):{fromColumn:0,toColumn:n-1,fromRow:0,toRow:r-1},s=p(a.forward,0,0),u=[];if(f)for(let n=f.fromRow;n<=f.toRow;n++){let r=(n+.5)*h-t/2;for(let i=f.fromColumn;i<=f.toColumn;i++){let f=(i+.5)*o-e/2,[c,m,d]=p(a.forward,f,r);if(l){if(d<=0||d>4)continue;let a=.49*Math.min(o,h)/d;if(c<-a||c>e+a||m<-a||m>t+a)continue}u.push({x:f,y:r,column:i,row:n,w:d,distance:Math.hypot(c-s[0],m-s[1])})}}u.length>3e4&&(u.sort((e,t)=>e.w-t.w),u.length=3e4);let c=new Map;for(let e=0;e<R;e++)c.set(65536*E[2*e]+E[2*e+1],e);let m=u.length,d={centers:new Float32Array(2*m),cells:new Int32Array(2*m),reveal:new Float32Array(m),seeds:new Float32Array(m),rests:new Float32Array(m),angles:new Float32Array(m),speeds:new Float32Array(m),seenX:new Float32Array(m),seenY:new Float32Array(m),pending:new Uint8Array(m)},v=0,x=1/0,M=0,b=[1/0,1/0,-1/0,-1/0];u.forEach((e,t)=>{let a;d.centers[2*t]=e.x,d.centers[2*t+1]=e.y,d.cells[2*t]=e.column,d.cells[2*t+1]=e.row,d.reveal[t]=e.distance,d.seeds[t]=(((a=Math.imul((a=Math.imul((a=Math.imul(e.column+40503,0x85ebca77)^Math.imul(e.row+9973,0xc2b2ae3d))^a>>>15,0x27d4eb2f))^a>>>13,0x165667b1))^a>>>16)>>>0)/0x100000000*2-1,v=Math.max(v,e.distance),x=Math.min(x,e.w),M=Math.max(M,e.w),b[0]=Math.min(b[0],e.x),b[1]=Math.min(b[1],e.y),b[2]=Math.max(b[2],e.x),b[3]=Math.max(b[3],e.y);let n=c.get(65536*e.column+e.row);if(void 0===n){d.pending[t]=1;return}d.angles[t]=B[n],d.speeds[t]=I[n],d.seenX[t]=_[n],d.seenY[t]=O[n]}),R=m,({centers:S,cells:E,reveal:L,seeds:C,rests:P,angles:B,speeds:I,seenX:_,seenY:O,pending:T}=d),U=new Float32Array(4*m),w.introSpeed=Math.max(700,v/1.1),w.bounds=m?b:[0,0,0,0],w.minScale=m?1/M:1,w.maxScale=m?1/x:1,i.bindBuffer(i.ARRAY_BUFFER,g),i.bufferData(i.ARRAY_BUFFER,S,i.STATIC_DRAW),i.bindBuffer(i.ARRAY_BUFFER,y),i.bufferData(i.ARRAY_BUFFER,U.byteLength||16,i.DYNAMIC_DRAW)})(r,l,u,v,x,s));let b=f?w.minScale:u.minScale,A=f?w.maxScale:u.maxScale,F=f?0:Math.ceil((o*(1+a.stretch)+2*h)*Math.max(1,A)+8),Y=r+2*F,q=l+2*F;t.style.left=`${-F}px`,t.style.top=`${-F}px`,t.style.width=`${Y}px`,t.style.height=`${q}px`;let W=Math.max(1,Math.round(Y*c)),H=Math.max(1,Math.round(q*c));(t.width!==W||t.height!==H)&&(t.width=W,t.height=H),Object.assign(w,{width:r,height:l,pad:F,ratio:c,view:u,length:o,thickness:h,fill:f,edgePad:2/(c*Math.max(.05,b))})})(),J=!1;let c="line"===n.shape?Math.PI:o,M=n.scatter*Math.PI*.5;for(let e=0;e<R;e++)P[e]=n.baseAngle+Math.PI/2+C[e]*M;let V=n.idle&&!v&&(!b.seen||b.away>1.2);b.seen&&!b.inside&&(b.away+=r);let $=b.seen?b.x:0,z=b.seen?b.y:0;if(V){let e=.32*Math.min(w.width,w.height);$=Math.cos(.37*k)*e+Math.sin(.21*k)*e*.35,z=Math.sin(.53*k+1.3)*e*.8}let X=1-Math.exp(-r/(b.seen&&!V?.035:.6));if(A.x+=($-A.x)*X,A.y+=(z-A.y)*X,Math.hypot(b.vx,b.vy)>40){let e=s(Math.atan2(b.vy,b.vx)-A.heading,o);A.heading+=e*(1-Math.exp(-r/.25))}b.vx*=Math.exp(-r/.12),b.vy*=Math.exp(-r/.12),q&&Y<0&&(Y=k);let j=q?k-Y:1/0,K=!1,ea=n.inertia<=0||v?0:Math.pow(6+42*Math.pow(1-n.inertia,2),2),en=ea?2*Math.sqrt(ea)*(1-.75*n.bounce):0,er=ea?Math.max(1,Math.ceil(r/(1/240))):0,ei=er?r/er:0,el=v?0:n.ripple/900,eo=n.radius,eh=.55*n.reach,ef=n.reach;for(let e=F.length-1;e>=0;e--)k-F[e].start>F[e].life&&F.splice(e,1);let es=!1;for(let e=0;e<R;e++){let t=S[2*e],a=S[2*e+1],i=1===T[e];if(i)_[e]=A.x,O[e]=A.y;else{let n=el*Math.hypot(A.x-t,A.y-a),i=n>0?1-Math.exp(-r/n):1;_[e]+=(A.x-_[e])*i,O[e]+=(A.y-O[e])*i,Math.abs(A.x-_[e])+Math.abs(A.y-O[e])>.05&&(es=!0)}let l=_[e],u=O[e],m=Math.hypot(l-t,u-a),d=Z(n,e,l,u),p=P[e];if(ef>0){let e=h((ef-m)/Math.max(1,ef-eh),0,1);d=p+s(d-p,c)*f(e)}let v=1;if(q){let t=(j-L[e]/w.introSpeed)/.65,a=f(h(t,0,1));t<1&&(K=!0),d=p+s(d-p,c)*a,v=h(2.5*t,0,1)}if(i)B[e]=q?p:d,I[e]=0,T[e]=0;else if(ea){let t=B[e],a=I[e];for(let e=0;e<er;e++)a+=(ea*s(d-t,c)-en*a)*ei,t+=a*ei;.002>Math.abs(a)&&5e-4>Math.abs(s(d-t,c))?(t+=s(d-t,c),a=0):es=!0,(t>40||t<-40)&&(t=s(t,o)),B[e]=t,I[e]=a}else B[e]=B[e]+s(d-B[e],c),I[e]=0;let x=0,M=0;for(let e of F){let n=(k-e.start)*520,r=Math.hypot(t-e.x,a-e.y),i=(n-r)/176.8;i>0&&i<1&&(x+=f(i)*c);let l=(n-r-88.4)/60;M+=Math.exp(-l*l)*Math.max(0,1-(k-e.start)/e.life)}let g=Math.exp(-(m*m)/(eo*eo))*v;U[4*e]=B[e]+x,U[4*e+1]=g,U[4*e+2]=Math.min(1,.9*M)*v,U[4*e+3]=v}if(q&&!K&&k-Y>.2&&(q=!1),Math.abs($-A.x)+Math.abs(z-A.y)>.05&&(es=!0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,t.width,t.height),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),R&&w.view){let e=u.uniforms;i.useProgram(u.program),i.uniformMatrix3fv(e.uView,!0,w.view.forward),i.uniform2f(e.uCanvas,w.width+2*w.pad,w.height+2*w.pad),i.uniform2f(e.uOffset,w.pad,w.pad),i.uniform2f(e.uLine,w.length/2,w.thickness/2),i.uniform1f(e.uStretch,n.stretch),i.uniform1f(e.uHead,"needle"===n.shape?.16:.32*("arrow"===n.shape)),i.uniform1f(e.uPad,w.edgePad),i.uniform1f(e.uFar,w.fill?4:1e6),i.uniform3fv(e.uColor,n.color),i.uniform3fv(e.uAccent,n.accent),i.uniform1f(e.uAccentMix,n.accentMix),i.uniform1f(e.uOpacity,1),i.uniform1f(e.uFade,n.fade),i.uniform1i(e.uShape,l[n.shape]),i.uniform1f(e.uRainbow,+!!n.rainbow),i.uniform1f(e.uTone,n.tone),i.uniform1f(e.uPeriod,c),i.uniform2f(e.uPixels,t.width,t.height),i.uniform2f(e.uEdge,.34*n.edgeFade*w.width,.44*n.edgeFade*w.height),i.bindVertexArray(x),i.bindBuffer(i.ARRAY_BUFFER,y),i.bufferSubData(i.ARRAY_BUFFER,0,U),i.drawArraysInstanced(i.TRIANGLE_STRIP,0,4,R)}(es||q||F.length>0||V)&&D&&N&&(W=requestAnimationFrame(ee))},ea=()=>{!W&&!G&&D&&N&&(H=performance.now(),W=requestAnimationFrame(ee))};X.current=()=>{J=!0,ea()};let en=(t,a)=>{if(!w.view)return null;let n=e.getBoundingClientRect(),[r,i,l]=p(w.view.inverse,t-n.left,a-n.top);return l<=0?null:{x:r,y:i,inside:t>=n.left&&t<=n.right&&a>=n.top&&a<=n.bottom}},er=e=>{let t=en(e.clientX,e.clientY);if(!t)return;let a=performance.now(),n=Math.max(1,a-b.time)/1e3;b.seen&&n<.2&&(b.vx=.6*b.vx+(t.x-b.x)/n*.4,b.vy=.6*b.vy+(t.y-b.y)/n*.4),b.time=a,b.x=t.x,b.y=t.y,b.seen=!0,b.inside=t.inside,t.inside&&(b.away=0),ea()},ei=e=>{if(er(e),!et.current.clickPulse||v||!R)return;let t=en(e.clientX,e.clientY);if(!t||!(w.fill?t.inside:Math.abs(t.x)<=w.width/2&&Math.abs(t.y)<=w.height/2))return;let[a,n,r,i]=w.bounds,l=Math.max(Math.hypot(t.x-a,t.y-n),Math.hypot(t.x-r,t.y-n),Math.hypot(t.x-a,t.y-i),Math.hypot(t.x-r,t.y-i));F.push({x:t.x,y:t.y,start:k,life:Math.min(6,l/520+.34+.1)}),F.length>6&&F.shift(),ea()},el=()=>{b.inside=!1,ea()};window.addEventListener("pointermove",er,{passive:!0}),window.addEventListener("pointerdown",ei,{passive:!0}),document.documentElement.addEventListener("pointerleave",el);let eo=e=>{e.preventDefault(),G=!0,cancelAnimationFrame(W),W=0},eh=()=>K(e=>e+1);t.addEventListener("webglcontextlost",eo),t.addEventListener("webglcontextrestored",eh);let ef=new ResizeObserver(()=>{J=!0,ea()});ef.observe(e);let es=()=>{J=!0,ea()};window.addEventListener("resize",es);let eu=new IntersectionObserver(e=>{D=e.some(e=>e.isIntersecting),ea()});eu.observe(e);let ec=()=>{N="hidden"!==document.visibilityState,ea()};return document.addEventListener("visibilitychange",ec),ea(),()=>{cancelAnimationFrame(W),X.current=null,ef.disconnect(),eu.disconnect(),window.removeEventListener("pointermove",er),window.removeEventListener("pointerdown",ei),window.removeEventListener("resize",es),document.documentElement.removeEventListener("pointerleave",el),document.removeEventListener("visibilitychange",ec),t.removeEventListener("webglcontextlost",eo),t.removeEventListener("webglcontextrestored",eh),i.isContextLost()||(i.deleteBuffer(M),i.deleteBuffer(g),i.deleteBuffer(y),i.deleteVertexArray(x),i.deleteProgram(u.program))}},[j]),(0,t.jsxs)("div",{ref:V,className:`relative ${J?"aspect-square max-w-full":"h-full w-full overflow-hidden"}${D?` ${D}`:""}`,style:J?{width:G,...N}:N,children:[(0,t.jsx)("canvas",{ref:$,className:"pointer-events-none absolute block","aria-hidden":"true"}),(0,t.jsx)("span",{ref:z,className:"pointer-events-none invisible absolute left-0 top-0 h-0","aria-hidden":"true"})]})}])},44588,function(e){e.n(e.i(27987))}]);