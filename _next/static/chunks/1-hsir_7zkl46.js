(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,70217,e=>{"use strict";var t=e.i(43476),r=e.i(71645);let i={sm:"px-5 py-2.5 text-[0.875rem]",md:"px-7 py-3.5 text-[1rem]",lg:"px-[38px] py-[18px] text-[1.125rem]"},n=2*Math.PI,a=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,o=`#version 300 es
precision highp float;
uniform vec2 uCenter;
uniform vec2 uHalf;
uniform float uRadius;
uniform float uPx;
uniform float uSpot;
uniform vec2 uEntry;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform vec2 uWindow;
uniform float uThickness;
uniform float uGlow;
out vec4 outColor;

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float loopPosition(vec2 p, vec2 b, float r) {
  vec2 inner = b - r;
  float arc = 1.5707963 * r;
  float quarter = inner.x + inner.y + arc;
  vec2 a = abs(p);
  vec2 q = a - inner;
  float s = q.x > 0.0 && q.y > 0.0
    ? inner.y + atan(q.y, q.x) * r
    : (q.x > q.y ? min(a.y, inner.y) : inner.y + arc + inner.x - min(a.x, inner.x));
  if (p.x < 0.0) s = p.y >= 0.0 ? 2.0 * quarter - s : 2.0 * quarter + s;
  else if (p.y < 0.0) s = 4.0 * quarter - s;
  return s / max(4.0 * quarter, 0.0001);
}

float lobe(float position, float center) {
  float gap = abs(fract(position - center + 0.5) - 0.5);
  return 1.0 - smoothstep(uWindow.x, uWindow.x + uWindow.y, gap);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = roundedBox(p, uHalf, uRadius);
  float position = loopPosition(p, uHalf, uRadius);
  float key = lobe(position, uSpot);
  float back = lobe(position, uSpot + 0.5);
  float streak = key + back * 0.45;
  float width = max(uThickness * uPx * mix(1.0, max(key, back), 0.6), 0.35);
  float band = smoothstep(-width - 0.6, -width + 0.6, d) * (1.0 - smoothstep(-0.6, 0.6, d));
  float hair = smoothstep(-uPx - 0.6, -uPx + 0.6, d) * (1.0 - smoothstep(-0.6, 0.6, d));
  float inside = 1.0 - smoothstep(-0.6, 0.6, d);
  vec2 pool = (p - uEntry) / (uHalf.y * vec2(1.6, 1.1));
  float glow = streak * 0.2 * exp(-abs(d + width * 0.5) / (5.0 * uPx)) + inside * 0.08 * exp(-dot(pool, pool));
  float light = clamp((band * streak + glow * uGlow) * uIntensity, 0.0, 1.0);
  vec4 base = vec4(uBaseColor, 1.0) * hair * 0.6;
  outColor = vec4(uLineColor, 1.0) * light + base * (1.0 - light);
}`,l=["uCenter","uHalf","uRadius","uPx","uSpot","uEntry","uLineColor","uBaseColor","uIntensity","uWindow","uThickness","uGlow"],s=(e,t,r)=>Math.min(r,Math.max(t,e)),u=e=>e-Math.floor(e),d=(e,t,r,i,n)=>{let a,o=r-n,l=i-n,s=Math.PI/2*n,d=o+l+s,c=Math.abs(e),h=Math.abs(t),f=c-o,m=h-l;return a=f>0&&m>0?l+Math.atan2(m,f)*n:f>m?Math.min(h,l):l+s+o-Math.min(c,o),e<0?a=t>=0?2*d-a:2*d+a:t<0&&(a=4*d-a),u(a/Math.max(4*d,1e-4))},c=(e,t,r)=>{let i=e.createShader(t);return i?(e.shaderSource(i,r),e.compileShader(i),e.getShaderParameter(i,e.COMPILE_STATUS))?i:(e.deleteShader(i),null):null};e.s(["default",0,({children:e="Get Started",size:h="lg",radius:f=18,tint:m="#ffffff",tintOpacity:p=.04,blur:x=0,textColor:b="#f5f5f5",lineColor:v="#ffffff",baseColor:w="#525252",intensity:y=1,idleIntensity:g=.35,shineSize:M=10,shineFade:A=34,thickness:S=1.2,glow:R=1,speed:k=.35,followMouse:C=!0,proximity:E=250,autoAnimate:P=!1,disabled:L=!1,onClick:T,className:_="",type:q="button",style:I,...B})=>{let F=(0,r.useRef)(null),z=(0,r.useRef)(null),H=(0,r.useRef)(null),W={radius:Math.max(0,f),lineColor:String(v),baseColor:String(w),intensity:Math.max(0,y),idleIntensity:s(g,0,1),shineSize:Math.max(0,M),shineFade:Math.max(0,A),thickness:Math.max(0,S),glow:Math.max(0,R),speed:k,followMouse:C,proximity:Math.max(1,E),autoAnimate:P,disabled:L},G=(0,r.useRef)(W);return G.current=W,(0,r.useEffect)(()=>{let e,t,r,i=F.current,h=z.current,f=h?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!i||!h||!f)return;let m=(e=c(f,f.VERTEX_SHADER,a),t=c(f,f.FRAGMENT_SHADER,o),r=f.createProgram(),e&&t&&r?(f.attachShader(r,e),f.attachShader(r,t),f.bindAttribLocation(r,0,"aPosition"),f.linkProgram(r),f.deleteShader(e),f.deleteShader(t),f.getProgramParameter(r,f.LINK_STATUS))?r:(f.deleteProgram(r),null):null);if(!m)return;let p={};for(let e of l)p[e]=f.getUniformLocation(m,e);let x=f.createBuffer(),b=f.createVertexArray();f.bindVertexArray(b),f.bindBuffer(f.ARRAY_BUFFER,x),f.bufferData(f.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),f.STATIC_DRAW),f.enableVertexAttribArray(0),f.vertexAttribPointer(0,2,f.FLOAT,!1,0,0),f.bindVertexArray(null);let v=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),w=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,y=new Map,g={width:1,height:1,ratio:1},M={x:0,y:0,known:!1},A={spot:0,level:0,press:0,ready:!1},S=0,R=0,k=!0,C=e=>{let t=y.get(e);if(t)return t;let r=[1,1,1];if(v){v.clearRect(0,0,1,1),v.fillStyle="#000000",v.fillStyle=e,v.fillRect(0,0,1,1);let[t,i,n]=v.getImageData(0,0,1,1).data;r=[t/255,i/255,n/255]}return y.set(e,r),r},E=e=>Math.min(e.radius,g.width/2,g.height/2),P=e=>{let t=E(e),r=t*(1-Math.SQRT1_2);return d(r-g.width/2,g.height/2-r,g.width/2,g.height/2,t)},L=e=>{let{width:t,height:r}=g,i=h.width/(t+48),n=h.height/(r+48);f.viewport(0,0,h.width,h.height),f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT),f.useProgram(m),f.uniform2f(p.uCenter,(24+t/2)*i,(24+r/2)*n),f.uniform2f(p.uHalf,t/2*i,r/2*n),f.uniform1f(p.uRadius,Math.min(e.radius,t/2,r/2)*i),f.uniform1f(p.uPx,g.ratio);let a=Math.min(e.radius,t/2,r/2),[o,l]=((e,t,r,i)=>{let n=t-i,a=r-i,o=Math.PI/2*i,l=n+a+o,s=4*u(e)*l,d=1,c=1;s>3*l?(s=4*l-s,c=-1):s>2*l?(s-=2*l,d=-1,c=-1):s>l&&(s=2*l-s,d=-1);let h=n-(s-a-o),f=r;if(s<=a)h=t,f=s;else if(s<=a+o){let e=(s-a)/Math.max(i,1e-4);h=n+Math.cos(e)*i,f=a+Math.sin(e)*i}return[h*d,f*c]})(A.spot,t/2,r/2,a),s=1-Math.min(r/2*.35,Math.hypot(o,l))/Math.max(Math.hypot(o,l),1e-4);f.uniform1f(p.uSpot,A.spot),f.uniform2f(p.uEntry,o*s*i,l*s*n),f.uniform3fv(p.uLineColor,C(e.lineColor)),f.uniform3fv(p.uBaseColor,C(e.baseColor)),f.uniform1f(p.uIntensity,e.intensity*(A.level+.8*A.press)),f.uniform2f(p.uWindow,e.shineSize/360+.06*A.press,e.shineFade/360+1e-4),f.uniform1f(p.uThickness,e.thickness),f.uniform1f(p.uGlow,e.glow),f.bindVertexArray(b),f.drawArrays(f.TRIANGLES,0,3),f.bindVertexArray(null)},T=e=>{if(S=0,!k)return;let t=G.current,r=R?Math.min(.05,(e-R)/1e3):1/60;R=e;let a=(e=>{if(!e.followMouse||e.disabled||!M.known)return null;let t=i.getBoundingClientRect(),r=t.width/g.width||1,n=g.width/2,a=g.height/2,o=(M.x-t.left-t.width/2)/r,l=(t.top+t.height/2-M.y)/r,c=Math.hypot(Math.max(Math.abs(o)-n,0),Math.max(Math.abs(l)-a,0)),h=s(1-c/e.proximity,0,1),f=h*h*(3-2*h),m=d(o,l,n,a,E(e));if(c>0)return{spot:m,near:f};let p=s(Math.min(n-Math.abs(o),a-Math.abs(l))/(.8*a),0,1),x=P(e)-o/n*.06-l/a*.02,b=x-m-Math.round(x-m);return{spot:u(m+b*p*p*(3-2*p)),near:f}})(t),o=t.autoAnimate&&!w,l=!!a&&a.near>0;A.ready||(A.spot=P(t),A.level=t.autoAnimate?1:t.idleIntensity,A.ready=!0);let c=0;o&&!l?A.spot=u(A.spot+t.speed/n*r):(c=(l?a.spot:P(t))-A.spot,c-=Math.round(c),A.spot=u(A.spot+c*(1-Math.exp(-(8*r)))));let h=t.autoAnimate?1:t.idleIntensity+(1-t.idleIntensity)*(a?a.near:0);A.level+=(h-A.level)*(1-Math.exp(-(7*r))),A.press*=Math.exp(-(5*r)),L(t),Math.abs(c)>2e-4||Math.abs(h-A.level)>.001||A.press>.002||o&&!l?S=requestAnimationFrame(T):R=0},_=()=>{!S&&k&&(S=requestAnimationFrame(T))},q=e=>{let t=e?.borderBoxSize?.[0];g.width=Math.max(1,t?t.inlineSize:i.offsetWidth),g.height=Math.max(1,t?t.blockSize:i.offsetHeight),g.ratio=Math.min(window.devicePixelRatio||1,3),h.width=Math.max(1,Math.round((g.width+48)*g.ratio)),h.height=Math.max(1,Math.round((g.height+48)*g.ratio)),A.ready&&L(G.current),_()},I=e=>{M.x=e.clientX,M.y=e.clientY,M.known=!0,_()},B=e=>{M.x=e.clientX,M.y=e.clientY,M.known=!0,G.current.disabled||(A.press=1),_()},W=e=>{"mouse"!==e.pointerType&&(M.known=!1,_())},O=()=>{M.known=!1,_()},U=new ResizeObserver(e=>q(e[e.length-1]));U.observe(i);let V=new IntersectionObserver(e=>{(k=e.some(e=>e.isIntersecting))&&(R=0,_())});return V.observe(i),window.addEventListener("pointermove",I,{passive:!0}),window.addEventListener("pointerup",W,{passive:!0}),window.addEventListener("pointercancel",W,{passive:!0}),document.documentElement.addEventListener("pointerleave",O),i.addEventListener("pointerdown",B),q(),H.current=_,()=>{cancelAnimationFrame(S),H.current=null,U.disconnect(),V.disconnect(),window.removeEventListener("pointermove",I),window.removeEventListener("pointerup",W),window.removeEventListener("pointercancel",W),document.documentElement.removeEventListener("pointerleave",O),i.removeEventListener("pointerdown",B),f.deleteBuffer(x),f.deleteVertexArray(b),f.deleteProgram(m),setTimeout(()=>{h.isConnected||f.getExtension("WEBGL_lose_context")?.loseContext()},0)}},[]),(0,r.useEffect)(()=>{H.current?.()}),(0,t.jsxs)("button",{ref:F,type:q,disabled:L,onClick:T,className:`relative isolate m-0 inline-flex cursor-pointer items-center justify-center gap-[0.5em] border-0 [font-family:inherit] font-medium leading-none tracking-[0.01em] [color:var(--sb-text-color)] [border-radius:var(--sb-radius)] [background:color-mix(in_srgb,var(--sb-tint)_calc(var(--sb-tint-opacity)*100%),transparent)] shadow-[0_10px_24px_-14px_rgba(0,0,0,0.45)] [-webkit-backdrop-filter:blur(var(--sb-blur))] [backdrop-filter:blur(var(--sb-blur))] outline-none [-webkit-tap-highlight-color:transparent] transition-transform duration-250 ease-[cubic-bezier(0.2,0.8,0.2,1)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-[3px] focus-visible:[outline-color:color-mix(in_srgb,var(--sb-text-color)_55%,transparent)] disabled:cursor-default disabled:opacity-50 disabled:active:scale-100 ${i[h]??i.lg}${_?` ${_}`:""}`,style:{"--sb-radius":`${f}px`,"--sb-tint":m,"--sb-tint-opacity":p,"--sb-blur":`${x}px`,"--sb-text-color":b,...I},...B,children:[(0,t.jsx)("canvas",{ref:z,className:"pointer-events-none absolute -inset-6 z-[1] block h-[calc(100%+48px)] w-[calc(100%+48px)]","aria-hidden":"true"}),(0,t.jsx)("span",{className:"relative z-[2] inline-flex items-center gap-[inherit]",children:e})]})}])},45488,function(e){e.n(e.i(70217))}]);