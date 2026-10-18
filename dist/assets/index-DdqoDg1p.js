(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Na="170",zh=0,cc=1,Fh=2,kl=1,Bl=2,Fn=3,Vn=0,Wt=1,Ot=2,li=0,ji=1,lc=2,hc=3,dc=4,kh=5,Ai=100,Bh=101,Hh=102,Gh=103,Wh=104,Vh=200,Xh=201,qh=202,Yh=203,Do=204,Uo=205,Kh=206,jh=207,Zh=208,Jh=209,$h=210,Qh=211,ed=212,td=213,nd=214,Oo=0,zo=1,Fo=2,Qi=3,ko=4,Bo=5,Ho=6,Go=7,Hl=0,id=1,sd=2,hi=0,rd=1,od=2,ad=3,cd=4,ld=5,hd=6,dd=7,uc="attached",ud="detached",Gl=300,es=301,ts=302,Wo=303,Vo=304,Br=306,ns=1e3,ai=1001,Nr=1002,zt=1003,Wl=1004,Rs=1005,jt=1006,wr=1007,Hn=1008,Xn=1009,Vl=1010,Xl=1011,Fs=1012,Ia=1013,Pi=1014,gn=1015,Gs=1016,La=1017,Da=1018,is=1020,ql=35902,Yl=1021,Kl=1022,cn=1023,jl=1024,Zl=1025,Zi=1026,ss=1027,Ua=1028,Oa=1029,Jl=1030,za=1031,Fa=1033,Sr=33776,Tr=33777,br=33778,Er=33779,Xo=35840,qo=35841,Yo=35842,Ko=35843,jo=36196,Zo=37492,Jo=37496,$o=37808,Qo=37809,ea=37810,ta=37811,na=37812,ia=37813,sa=37814,ra=37815,oa=37816,aa=37817,ca=37818,la=37819,ha=37820,da=37821,Ar=36492,ua=36494,fa=36495,$l=36283,pa=36284,ma=36285,ga=36286,ks=2300,Bs=2301,qr=2302,fc=2400,pc=2401,mc=2402,fd=2500,pd=0,Ql=1,_a=2,md=3200,gd=3201,eh=0,_d=1,oi="",Rt="srgb",Bt="srgb-linear",Hr="linear",lt="srgb",Ii=7680,gc=519,xd=512,vd=513,yd=514,th=515,Md=516,wd=517,Sd=518,Td=519,xa=35044,_c="300 es",Gn=2e3,Ir=2001;class us{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xc=1234567;const Ns=Math.PI/180,rs=180/Math.PI;function _n(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nt[s&255]+Nt[s>>8&255]+Nt[s>>16&255]+Nt[s>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]).toLowerCase()}function Mt(s,e,t){return Math.max(e,Math.min(t,s))}function ka(s,e){return(s%e+e)%e}function bd(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Ed(s,e,t){return s!==e?(t-s)/(e-s):0}function Is(s,e,t){return(1-t)*s+t*e}function Ad(s,e,t,n){return Is(s,e,1-Math.exp(-t*n))}function Rd(s,e=1){return e-Math.abs(ka(s,e*2)-e)}function Pd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Cd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Nd(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Id(s,e){return s+Math.random()*(e-s)}function Ld(s){return s*(.5-Math.random())}function Dd(s){s!==void 0&&(xc=s);let e=xc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ud(s){return s*Ns}function Od(s){return s*rs}function zd(s){return(s&s-1)===0&&s!==0}function Fd(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function kd(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Bd(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),d=r((e-n)/2),u=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*d,c*u,a*l);break;case"YZY":s.set(c*u,a*h,c*d,a*l);break;case"ZXZ":s.set(c*d,c*u,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function pn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ot(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const nh={DEG2RAD:Ns,RAD2DEG:rs,generateUUID:_n,clamp:Mt,euclideanModulo:ka,mapLinear:bd,inverseLerp:Ed,lerp:Is,damp:Ad,pingpong:Rd,smoothstep:Pd,smootherstep:Cd,randInt:Nd,randFloat:Id,randFloatSpread:Ld,seededRandom:Dd,degToRad:Ud,radToDeg:Od,isPowerOfTwo:zd,ceilPowerOfTwo:Fd,floorPowerOfTwo:kd,setQuaternionFromProperEuler:Bd,normalize:ot,denormalize:pn};class ye{constructor(e=0,t=0){ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,n,i,r,o,a,c,l){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],x=i[1],v=i[4],y=i[7],P=i[2],E=i[5],R=i[8];return r[0]=o*_+a*x+c*P,r[3]=o*m+a*v+c*E,r[6]=o*p+a*y+c*R,r[1]=l*_+h*x+d*P,r[4]=l*m+h*v+d*E,r[7]=l*p+h*y+d*R,r[2]=u*_+f*x+g*P,r[5]=u*m+f*v+g*E,r[8]=u*p+f*y+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,g=t*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=u*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Yr.makeScale(e,t)),this}rotate(e){return this.premultiply(Yr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Yr=new Xe;function ih(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Hs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Hd(){const s=Hs("canvas");return s.style.display="block",s}const vc={};function Ps(s){s in vc||(vc[s]=!0,console.warn(s))}function Gd(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Wd(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Vd(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const je={enabled:!0,workingColorSpace:Bt,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===lt&&(s.r=Wn(s.r),s.g=Wn(s.g),s.b=Wn(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===lt&&(s.r=Ji(s.r),s.g=Ji(s.g),s.b=Ji(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===oi?Hr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Wn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ji(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const yc=[.64,.33,.3,.6,.15,.06],Mc=[.2126,.7152,.0722],wc=[.3127,.329],Sc=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tc=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);je.define({[Bt]:{primaries:yc,whitePoint:wc,transfer:Hr,toXYZ:Sc,fromXYZ:Tc,luminanceCoefficients:Mc,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:yc,whitePoint:wc,transfer:lt,toXYZ:Sc,fromXYZ:Tc,luminanceCoefficients:Mc,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}});let Li;class Xd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Li===void 0&&(Li=Hs("canvas")),Li.width=e.width,Li.height=e.height;const n=Li.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Wn(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Wn(t[n]/255)*255):t[n]=Wn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qd=0;class sh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qd++}),this.uuid=_n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Kr(i[o].image)):r.push(Kr(i[o]))}else r=Kr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Kr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Xd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Yd=0;class Tt extends us{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=ai,i=ai,r=jt,o=Hn,a=cn,c=Xn,l=Tt.DEFAULT_ANISOTROPY,h=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=_n(),this.name="",this.source=new sh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ns:e.x=e.x-Math.floor(e.x);break;case ai:e.x=e.x<0?0:1;break;case Nr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ns:e.y=e.y-Math.floor(e.y);break;case ai:e.y=e.y<0?0:1;break;case Nr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Gl;Tt.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,n=0,i=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,y=(f+1)/2,P=(p+1)/2,E=(h+u)/4,R=(d+_)/4,C=(g+m)/4;return v>y&&v>P?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=E/n,r=R/n):y>P?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=E/i,r=C/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=R/r,i=C/r),this.set(n,i,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(d-_)/x,this.z=(u-h)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Kd extends us{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Tt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new sh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ci extends Kd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class rh extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jd extends Tt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=zt,this.minFilter=zt,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ui{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const u=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==u||l!==f||h!==g){let m=1-a;const p=c*u+l*f+h*g+d*_,x=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const P=Math.sqrt(v),E=Math.atan2(P,p*x);m=Math.sin(m*E)/P,a=Math.sin(a*E)/P}const y=a*x;if(c=c*m+u*y,l=l*m+f*y,h=h*m+g*y,d=d*m+_*y,m===1-a){const P=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=P,l*=P,h*=P,d*=P}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*d+c*f-l*u,e[t+1]=c*g+h*u+l*d-a*f,e[t+2]=l*g+h*f+a*u-c*d,e[t+3]=h*g-a*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(r/2),u=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=i+c*d+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jr.copy(this).projectOnVector(e),this.sub(jr)}reflect(e){return this.sub(jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jr=new D,bc=new ui;class Yn{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ks.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(e.matrixWorld),this.union(Ks)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vs),js.subVectors(this.max,vs),Di.subVectors(e.a,vs),Ui.subVectors(e.b,vs),Oi.subVectors(e.c,vs),Zn.subVectors(Ui,Di),Jn.subVectors(Oi,Ui),pi.subVectors(Di,Oi);let t=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-pi.z,pi.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,pi.z,0,-pi.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-pi.y,pi.x,0];return!Zr(t,Di,Ui,Oi,js)||(t=[1,0,0,0,1,0,0,0,1],!Zr(t,Di,Ui,Oi,js))?!1:(Zs.crossVectors(Zn,Jn),t=[Zs.x,Zs.y,Zs.z],Zr(t,Di,Ui,Oi,js))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Nn=[new D,new D,new D,new D,new D,new D,new D,new D],dn=new D,Ks=new Yn,Di=new D,Ui=new D,Oi=new D,Zn=new D,Jn=new D,pi=new D,vs=new D,js=new D,Zs=new D,mi=new D;function Zr(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){mi.fromArray(s,r);const a=i.x*Math.abs(mi.x)+i.y*Math.abs(mi.y)+i.z*Math.abs(mi.z),c=e.dot(mi),l=t.dot(mi),h=n.dot(mi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Zd=new Yn,ys=new D,Jr=new D;class bn{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Zd.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ys.subVectors(e,this.center);const t=ys.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ys,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ys.copy(e.center).add(Jr)),this.expandByPoint(ys.copy(e.center).sub(Jr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new D,$r=new D,Js=new D,$n=new D,Qr=new D,$s=new D,eo=new D;class Ws{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){$r.copy(e).add(t).multiplyScalar(.5),Js.copy(t).sub(e).normalize(),$n.copy(this.origin).sub($r);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Js),a=$n.dot(this.direction),c=-$n.dot(Js),l=$n.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*c-a,u=o*a-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy($r).addScaledVector(Js,u),f}intersectSphere(e,t){In.subVectors(e.center,this.origin);const n=In.dot(this.direction),i=In.dot(In)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,i=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,i=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,n,i,r){Qr.subVectors(t,e),$s.subVectors(n,e),eo.crossVectors(Qr,$s);let o=this.direction.dot(eo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$n.subVectors(this.origin,e);const c=a*this.direction.dot($s.crossVectors($n,$s));if(c<0)return null;const l=a*this.direction.dot(Qr.cross($n));if(l<0||c+l>o)return null;const h=-a*$n.dot(eo);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class He{constructor(e,t,n,i,r,o,a,c,l,h,d,u,f,g,_,m){He.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,d,u,f,g,_,m)}set(e,t,n,i,r,o,a,c,l,h,d,u,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new He().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/zi.setFromMatrixColumn(e,0).length(),r=1/zi.setFromMatrixColumn(e,1).length(),o=1/zi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=o*h,f=o*d,g=a*h,_=a*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=u-_*l,t[9]=-a*c,t[2]=_-u*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,g=l*h,_=l*d;t[0]=u+_*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=_+u*a,t[10]=o*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,g=l*h,_=l*d;t[0]=u-_*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=_-u*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const u=o*h,f=o*d,g=a*h,_=a*d;t[0]=c*h,t[4]=g*l-f,t[8]=u*l+_,t[1]=c*d,t[5]=_*l+u,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const u=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-u*d,t[8]=g*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*d+g,t[10]=u-_*d}else if(e.order==="XZY"){const u=o*c,f=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+_,t[5]=o*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jd,e,$d)}lookAt(e,t,n){const i=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Qn.crossVectors(n,Xt),Qn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Qn.crossVectors(n,Xt)),Qn.normalize(),Qs.crossVectors(Xt,Qn),i[0]=Qn.x,i[4]=Qs.x,i[8]=Xt.x,i[1]=Qn.y,i[5]=Qs.y,i[9]=Xt.y,i[2]=Qn.z,i[6]=Qs.z,i[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],v=n[7],y=n[11],P=n[15],E=i[0],R=i[4],C=i[8],w=i[12],M=i[1],N=i[5],H=i[9],z=i[13],X=i[2],Z=i[6],L=i[10],I=i[14],U=i[3],V=i[7],j=i[11],Q=i[15];return r[0]=o*E+a*M+c*X+l*U,r[4]=o*R+a*N+c*Z+l*V,r[8]=o*C+a*H+c*L+l*j,r[12]=o*w+a*z+c*I+l*Q,r[1]=h*E+d*M+u*X+f*U,r[5]=h*R+d*N+u*Z+f*V,r[9]=h*C+d*H+u*L+f*j,r[13]=h*w+d*z+u*I+f*Q,r[2]=g*E+_*M+m*X+p*U,r[6]=g*R+_*N+m*Z+p*V,r[10]=g*C+_*H+m*L+p*j,r[14]=g*w+_*z+m*I+p*Q,r[3]=x*E+v*M+y*X+P*U,r[7]=x*R+v*N+y*Z+P*V,r[11]=x*C+v*H+y*L+P*j,r[15]=x*w+v*z+y*I+P*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*d-i*l*d-r*a*u+n*l*u+i*a*f-n*c*f)+_*(+t*c*f-t*l*u+r*o*u-i*o*f+i*l*h-r*c*h)+m*(+t*l*d-t*a*f-r*o*d+n*o*f+r*a*h-n*l*h)+p*(-i*a*h-t*c*d+t*a*u+i*o*d-n*o*u+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=d*m*l-_*u*l+_*c*f-a*m*f-d*c*p+a*u*p,v=g*u*l-h*m*l-g*c*f+o*m*f+h*c*p-o*u*p,y=h*_*l-g*d*l+g*a*f-o*_*f-h*a*p+o*d*p,P=g*d*c-h*_*c-g*a*u+o*_*u+h*a*m-o*d*m,E=t*x+n*v+i*y+r*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/E;return e[0]=x*R,e[1]=(_*u*r-d*m*r-_*i*f+n*m*f+d*i*p-n*u*p)*R,e[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*p+n*c*p)*R,e[3]=(d*c*r-a*u*r-d*i*l+n*u*l+a*i*f-n*c*f)*R,e[4]=v*R,e[5]=(h*m*r-g*u*r+g*i*f-t*m*f-h*i*p+t*u*p)*R,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*p-t*c*p)*R,e[7]=(o*u*r-h*c*r+h*i*l-t*u*l-o*i*f+t*c*f)*R,e[8]=y*R,e[9]=(g*d*r-h*_*r-g*n*f+t*_*f+h*n*p-t*d*p)*R,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*p+t*a*p)*R,e[11]=(h*a*r-o*d*r-h*n*l+t*d*l+o*n*f-t*a*f)*R,e[12]=P*R,e[13]=(h*_*i-g*d*i+g*n*u-t*_*u-h*n*m+t*d*m)*R,e[14]=(g*a*i-o*_*i-g*n*c+t*_*c+o*n*m-t*a*m)*R,e[15]=(o*d*i-h*a*i+h*n*c-t*d*c-o*n*u+t*a*u)*R,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,g=r*d,_=o*h,m=o*d,p=a*d,x=c*l,v=c*h,y=c*d,P=n.x,E=n.y,R=n.z;return i[0]=(1-(_+p))*P,i[1]=(f+y)*P,i[2]=(g-v)*P,i[3]=0,i[4]=(f-y)*E,i[5]=(1-(u+p))*E,i[6]=(m+x)*E,i[7]=0,i[8]=(g+v)*R,i[9]=(m-x)*R,i[10]=(1-(u+_))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=zi.set(i[0],i[1],i[2]).length();const o=zi.set(i[4],i[5],i[6]).length(),a=zi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],un.copy(this);const l=1/r,h=1/o,d=1/a;return un.elements[0]*=l,un.elements[1]*=l,un.elements[2]*=l,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,t.setFromRotationMatrix(un),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Gn){const c=this.elements,l=2*r/(t-e),h=2*r/(n-i),d=(t+e)/(t-e),u=(n+i)/(n-i);let f,g;if(a===Gn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ir)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Gn){const c=this.elements,l=1/(t-e),h=1/(n-i),d=1/(o-r),u=(t+e)*l,f=(n+i)*h;let g,_;if(a===Gn)g=(o+r)*d,_=-2*d;else if(a===Ir)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const zi=new D,un=new He,Jd=new D(0,0,0),$d=new D(1,1,1),Qn=new D,Qs=new D,Xt=new D,Ec=new He,Ac=new ui;class Tn{constructor(e=0,t=0,n=0,i=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Mt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ec.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ec,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ac.setFromEuler(this),this.setFromQuaternion(Ac,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class Ba{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qd=0;const Rc=new D,Fi=new ui,Ln=new He,er=new D,Ms=new D,eu=new D,tu=new ui,Pc=new D(1,0,0),Cc=new D(0,1,0),Nc=new D(0,0,1),Ic={type:"added"},nu={type:"removed"},ki={type:"childadded",child:null},to={type:"childremoved",child:null};class _t extends us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=_n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_t.DEFAULT_UP.clone();const e=new D,t=new Tn,n=new ui,i=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new He},normalMatrix:{value:new Xe}}),this.matrix=new He,this.matrixWorld=new He,this.matrixAutoUpdate=_t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ba,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(Pc,e)}rotateY(e){return this.rotateOnAxis(Cc,e)}rotateZ(e){return this.rotateOnAxis(Nc,e)}translateOnAxis(e,t){return Rc.copy(e).applyQuaternion(this.quaternion),this.position.add(Rc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pc,e)}translateY(e){return this.translateOnAxis(Cc,e)}translateZ(e){return this.translateOnAxis(Nc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?er.copy(e):er.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Ms,er,this.up):Ln.lookAt(er,Ms,this.up),this.quaternion.setFromRotationMatrix(Ln),i&&(Ln.extractRotation(i.matrixWorld),Fi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ic),ki.child=e,this.dispatchEvent(ki),ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nu),to.child=e,this.dispatchEvent(to),to.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ic),ki.child=e,this.dispatchEvent(ki),ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,e,eu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,tu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}_t.DEFAULT_UP=new D(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new D,Dn=new D,no=new D,Un=new D,Bi=new D,Hi=new D,Lc=new D,io=new D,so=new D,ro=new D,oo=new et,ao=new et,co=new et;class mn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),fn.subVectors(e,t),i.cross(fn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){fn.subVectors(i,t),Dn.subVectors(n,t),no.subVectors(e,t);const o=fn.dot(fn),a=fn.dot(Dn),c=fn.dot(no),l=Dn.dot(Dn),h=Dn.dot(no),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Un.x),c.addScaledVector(o,Un.y),c.addScaledVector(a,Un.z),c)}static getInterpolatedAttribute(e,t,n,i,r,o){return oo.setScalar(0),ao.setScalar(0),co.setScalar(0),oo.fromBufferAttribute(e,t),ao.fromBufferAttribute(e,n),co.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(oo,r.x),o.addScaledVector(ao,r.y),o.addScaledVector(co,r.z),o}static isFrontFacing(e,t,n,i){return fn.subVectors(n,t),Dn.subVectors(e,t),fn.cross(Dn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),fn.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Bi.subVectors(i,n),Hi.subVectors(r,n),io.subVectors(e,n);const c=Bi.dot(io),l=Hi.dot(io);if(c<=0&&l<=0)return t.copy(n);so.subVectors(e,i);const h=Bi.dot(so),d=Hi.dot(so);if(h>=0&&d<=h)return t.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Bi,o);ro.subVectors(e,r);const f=Bi.dot(ro),g=Hi.dot(ro);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Hi,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Lc.subVectors(r,i),a=(d-h)/(d-h+(f-g)),t.copy(i).addScaledVector(Lc,a);const p=1/(m+_+u);return o=_*p,a=u*p,t.copy(n).addScaledVector(Bi,o).addScaledVector(Hi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const oh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},tr={h:0,s:0,l:0};function lo(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Fe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=je.workingColorSpace){if(e=ka(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=lo(o,r,e+1/3),this.g=lo(o,r,e),this.b=lo(o,r,e-1/3)}return je.toWorkingColorSpace(this,i),this}setStyle(e,t=Rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){const n=oh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wn(e.r),this.g=Wn(e.g),this.b=Wn(e.b),this}copyLinearToSRGB(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return je.fromWorkingColorSpace(It.copy(this),e),Math.round(Mt(It.r*255,0,255))*65536+Math.round(Mt(It.g*255,0,255))*256+Math.round(Mt(It.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(It.copy(this),t);const n=It.r,i=It.g,r=It.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Rt){je.fromWorkingColorSpace(It.copy(this),e);const t=It.r,n=It.g,i=It.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ei),this.setHSL(ei.h+e,ei.s+t,ei.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ei),e.getHSL(tr);const n=Is(ei.h,tr.h,t),i=Is(ei.s,tr.s,t),r=Is(ei.l,tr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Fe;Fe.NAMES=oh;let iu=0;class Sn extends us{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=_n(),this.name="",this.blending=ji,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Do,this.blendDst=Uo,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=Qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ji&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Do&&(n.blendSrc=this.blendSrc),this.blendDst!==Uo&&(n.blendDst=this.blendDst),this.blendEquation!==Ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class wt extends Sn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vt=new D,nr=new ye;class Ft{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xa,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xa&&(e.usage=this.usage),e}}class ah extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ch extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class st extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}let su=0;const Jt=new He,ho=new _t,Gi=new D,qt=new Yn,ws=new Yn,At=new D;class Pt extends us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=_n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ih(e)?ch:ah)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return ho.lookAt(e),ho.updateMatrix(),this.applyMatrix4(ho.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new st(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ws.setFromBufferAttribute(a),this.morphTargetsRelative?(At.addVectors(qt.min,ws.min),qt.expandByPoint(At),At.addVectors(qt.max,ws.max),qt.expandByPoint(At)):(qt.expandByPoint(ws.min),qt.expandByPoint(ws.max))}qt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)At.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(At));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)At.fromBufferAttribute(a,l),c&&(Gi.fromBufferAttribute(e,l),At.add(Gi)),i=Math.max(i,n.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new D,c[C]=new D;const l=new D,h=new D,d=new D,u=new ye,f=new ye,g=new ye,_=new D,m=new D;function p(C,w,M){l.fromBufferAttribute(n,C),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,M),u.fromBufferAttribute(r,C),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,M),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const N=1/(f.x*g.y-g.x*f.y);isFinite(N)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(N),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(N),a[C].add(_),a[w].add(_),a[M].add(_),c[C].add(m),c[w].add(m),c[M].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let C=0,w=x.length;C<w;++C){const M=x[C],N=M.start,H=M.count;for(let z=N,X=N+H;z<X;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const v=new D,y=new D,P=new D,E=new D;function R(C){P.fromBufferAttribute(i,C),E.copy(P);const w=a[C];v.copy(w),v.sub(P.multiplyScalar(P.dot(w))).normalize(),y.crossVectors(E,w);const N=y.dot(c[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,N)}for(let C=0,w=x.length;C<w;++C){const M=x[C],N=M.start,H=M.count;for(let z=N,X=N+H;z<X;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new D,r=new D,o=new D,a=new D,c=new D,l=new D,h=new D,d=new D;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new Ft(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pt,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Dc=new He,gi=new Ws,ir=new bn,Uc=new D,sr=new D,rr=new D,or=new D,uo=new D,ar=new D,Oc=new D,cr=new D;class T extends _t{constructor(e=new Pt,t=new wt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){ar.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],d=r[c];h!==0&&(uo.fromBufferAttribute(d,e),o?ar.addScaledVector(uo,h):ar.addScaledVector(uo.sub(t),h))}t.add(ar)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(r),gi.copy(e.ray).recast(e.near),!(ir.containsPoint(gi.origin)===!1&&(gi.intersectSphere(ir,Uc)===null||gi.origin.distanceToSquared(Uc)>(e.far-e.near)**2))&&(Dc.copy(r).invert(),gi.copy(e.ray).applyMatrix4(Dc),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,P=v;y<P;y+=3){const E=a.getX(y),R=a.getX(y+1),C=a.getX(y+2);i=lr(this,p,e,n,l,h,d,E,R,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);i=lr(this,o,e,n,l,h,d,x,v,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,P=v;y<P;y+=3){const E=y,R=y+1,C=y+2;i=lr(this,p,e,n,l,h,d,E,R,C),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,v=m+1,y=m+2;i=lr(this,o,e,n,l,h,d,x,v,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ru(s,e,t,n,i,r,o,a){let c;if(e.side===Wt?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Vn,a),c===null)return null;cr.copy(a),cr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(cr);return l<t.near||l>t.far?null:{distance:l,point:cr.clone(),object:s}}function lr(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,sr),s.getVertexPosition(c,rr),s.getVertexPosition(l,or);const h=ru(s,e,t,n,sr,rr,or,Oc);if(h){const d=new D;mn.getBarycoord(Oc,sr,rr,or,d),i&&(h.uv=mn.getInterpolatedAttribute(i,a,c,l,d,new ye)),r&&(h.uv1=mn.getInterpolatedAttribute(r,a,c,l,d,new ye)),o&&(h.normal=mn.getInterpolatedAttribute(o,a,c,l,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new D,materialIndex:0};mn.getNormal(sr,rr,or,u.normal),h.face=u,h.barycoord=d}return h}class le extends Pt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(d,2));function g(_,m,p,x,v,y,P,E,R,C,w){const M=y/R,N=P/C,H=y/2,z=P/2,X=E/2,Z=R+1,L=C+1;let I=0,U=0;const V=new D;for(let j=0;j<L;j++){const Q=j*N-z;for(let oe=0;oe<Z;oe++){const Te=oe*M-H;V[_]=Te*x,V[m]=Q*v,V[p]=X,l.push(V.x,V.y,V.z),V[_]=0,V[m]=0,V[p]=E>0?1:-1,h.push(V.x,V.y,V.z),d.push(oe/R),d.push(1-j/C),I+=1}}for(let j=0;j<C;j++)for(let Q=0;Q<R;Q++){const oe=u+Q+Z*j,Te=u+Q+Z*(j+1),q=u+(Q+1)+Z*(j+1),ae=u+(Q+1)+Z*j;c.push(oe,Te,ae),c.push(Te,q,ae),U+=6}a.addGroup(f,U,w),f+=U,u+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new le(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function os(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Dt(s){const e={};for(let t=0;t<s.length;t++){const n=os(s[t]);for(const i in n)e[i]=n[i]}return e}function ou(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function lh(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const au={clone:os,merge:Dt};var cu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class di extends Sn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cu,this.fragmentShader=lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=ou(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class hh extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new He,this.projectionMatrix=new He,this.projectionMatrixInverse=new He,this.coordinateSystem=Gn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ti=new D,zc=new ye,Fc=new ye;class Ut extends hh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rs*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ti.x,ti.y).multiplyScalar(-e/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ti.x,ti.y).multiplyScalar(-e/ti.z)}getViewSize(e,t){return this.getViewBounds(e,zc,Fc),t.subVectors(Fc,zc)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wi=-90,Vi=1;class hu extends _t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ut(Wi,Vi,e,t);i.layers=this.layers,this.add(i);const r=new Ut(Wi,Vi,e,t);r.layers=this.layers,this.add(r);const o=new Ut(Wi,Vi,e,t);o.layers=this.layers,this.add(o);const a=new Ut(Wi,Vi,e,t);a.layers=this.layers,this.add(a);const c=new Ut(Wi,Vi,e,t);c.layers=this.layers,this.add(c);const l=new Ut(Wi,Vi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class dh extends Tt{constructor(e,t,n,i,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:es,super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class du extends Ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new dh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new le(5,5,5),r=new di({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:li});r.uniforms.tEquirect.value=t;const o=new T(i,r),a=t.minFilter;return t.minFilter===Hn&&(t.minFilter=jt),new hu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const fo=new D,uu=new D,fu=new Xe;class bi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=fo.subVectors(n,t).cross(uu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(fo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||fu.getNormalMatrix(e),i=this.coplanarPoint(fo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new bn,hr=new D;class Ha{constructor(e=new bi,t=new bi,n=new bi,i=new bi,r=new bi,o=new bi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gn){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],x=i[13],v=i[14],y=i[15];if(n[0].setComponents(c-r,u-l,m-f,y-p).normalize(),n[1].setComponents(c+r,u+l,m+f,y+p).normalize(),n[2].setComponents(c+o,u+h,m+g,y+x).normalize(),n[3].setComponents(c-o,u-h,m-g,y-x).normalize(),n[4].setComponents(c-a,u-d,m-_,y-v).normalize(),t===Gn)n[5].setComponents(c+a,u+d,m+_,y+v).normalize();else if(t===Ir)n[5].setComponents(a,d,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(hr.x=i.normal.x>0?e.max.x:e.min.x,hr.y=i.normal.y>0?e.max.y:e.min.y,hr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(hr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function uh(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function pu(s){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,d=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const h=c.array,d=c.updateRanges;if(s.bindBuffer(l,a),d.length===0)s.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(s.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}class Vs extends Pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=e/a,u=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const x=p*u-o;for(let v=0;v<l;v++){const y=v*d-r;g.push(y,-x,0),_.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){const v=x+l*p,y=x+l*(p+1),P=x+1+l*(p+1),E=x+1+l*p;f.push(v,y,E),f.push(y,P,E)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(_,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.width,e.height,e.widthSegments,e.heightSegments)}}var mu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_u=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Su=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Eu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Au=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ru=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Uu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Fu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ku=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Hu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xu="gl_FragColor = linearToOutputTexel( gl_FragColor );",qu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ju=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ju=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$u=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ef=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,af=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,df=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ff=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,pf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_f=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ef=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Af=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Nf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,If=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Df=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ff=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$f=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ep=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,np=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ip=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,op=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ap=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,pp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Sp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Tp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ep=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Np=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ip=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Dp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Op=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:mu,alphahash_pars_fragment:gu,alphamap_fragment:_u,alphamap_pars_fragment:xu,alphatest_fragment:vu,alphatest_pars_fragment:yu,aomap_fragment:Mu,aomap_pars_fragment:wu,batching_pars_vertex:Su,batching_vertex:Tu,begin_vertex:bu,beginnormal_vertex:Eu,bsdfs:Au,iridescence_fragment:Ru,bumpmap_pars_fragment:Pu,clipping_planes_fragment:Cu,clipping_planes_pars_fragment:Nu,clipping_planes_pars_vertex:Iu,clipping_planes_vertex:Lu,color_fragment:Du,color_pars_fragment:Uu,color_pars_vertex:Ou,color_vertex:zu,common:Fu,cube_uv_reflection_fragment:ku,defaultnormal_vertex:Bu,displacementmap_pars_vertex:Hu,displacementmap_vertex:Gu,emissivemap_fragment:Wu,emissivemap_pars_fragment:Vu,colorspace_fragment:Xu,colorspace_pars_fragment:qu,envmap_fragment:Yu,envmap_common_pars_fragment:Ku,envmap_pars_fragment:ju,envmap_pars_vertex:Zu,envmap_physical_pars_fragment:cf,envmap_vertex:Ju,fog_vertex:$u,fog_pars_vertex:Qu,fog_fragment:ef,fog_pars_fragment:tf,gradientmap_pars_fragment:nf,lightmap_pars_fragment:sf,lights_lambert_fragment:rf,lights_lambert_pars_fragment:of,lights_pars_begin:af,lights_toon_fragment:lf,lights_toon_pars_fragment:hf,lights_phong_fragment:df,lights_phong_pars_fragment:uf,lights_physical_fragment:ff,lights_physical_pars_fragment:pf,lights_fragment_begin:mf,lights_fragment_maps:gf,lights_fragment_end:_f,logdepthbuf_fragment:xf,logdepthbuf_pars_fragment:vf,logdepthbuf_pars_vertex:yf,logdepthbuf_vertex:Mf,map_fragment:wf,map_pars_fragment:Sf,map_particle_fragment:Tf,map_particle_pars_fragment:bf,metalnessmap_fragment:Ef,metalnessmap_pars_fragment:Af,morphinstance_vertex:Rf,morphcolor_vertex:Pf,morphnormal_vertex:Cf,morphtarget_pars_vertex:Nf,morphtarget_vertex:If,normal_fragment_begin:Lf,normal_fragment_maps:Df,normal_pars_fragment:Uf,normal_pars_vertex:Of,normal_vertex:zf,normalmap_pars_fragment:Ff,clearcoat_normal_fragment_begin:kf,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:Hf,iridescence_pars_fragment:Gf,opaque_fragment:Wf,packing:Vf,premultiplied_alpha_fragment:Xf,project_vertex:qf,dithering_fragment:Yf,dithering_pars_fragment:Kf,roughnessmap_fragment:jf,roughnessmap_pars_fragment:Zf,shadowmap_pars_fragment:Jf,shadowmap_pars_vertex:$f,shadowmap_vertex:Qf,shadowmask_pars_fragment:ep,skinbase_vertex:tp,skinning_pars_vertex:np,skinning_vertex:ip,skinnormal_vertex:sp,specularmap_fragment:rp,specularmap_pars_fragment:op,tonemapping_fragment:ap,tonemapping_pars_fragment:cp,transmission_fragment:lp,transmission_pars_fragment:hp,uv_pars_fragment:dp,uv_pars_vertex:up,uv_vertex:fp,worldpos_vertex:pp,background_vert:mp,background_frag:gp,backgroundCube_vert:_p,backgroundCube_frag:xp,cube_vert:vp,cube_frag:yp,depth_vert:Mp,depth_frag:wp,distanceRGBA_vert:Sp,distanceRGBA_frag:Tp,equirect_vert:bp,equirect_frag:Ep,linedashed_vert:Ap,linedashed_frag:Rp,meshbasic_vert:Pp,meshbasic_frag:Cp,meshlambert_vert:Np,meshlambert_frag:Ip,meshmatcap_vert:Lp,meshmatcap_frag:Dp,meshnormal_vert:Up,meshnormal_frag:Op,meshphong_vert:zp,meshphong_frag:Fp,meshphysical_vert:kp,meshphysical_frag:Bp,meshtoon_vert:Hp,meshtoon_frag:Gp,points_vert:Wp,points_frag:Vp,shadow_vert:Xp,shadow_frag:qp,sprite_vert:Yp,sprite_frag:Kp},fe={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},wn={basic:{uniforms:Dt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:Dt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:Dt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:Dt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:Dt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:Dt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:Dt([fe.points,fe.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:Dt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:Dt([fe.common,fe.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:Dt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:Dt([fe.sprite,fe.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:Dt([fe.common,fe.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:Dt([fe.lights,fe.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};wn.physical={uniforms:Dt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const dr={r:0,b:0,g:0},xi=new Tn,jp=new He;function Zp(s,e,t,n,i,r,o){const a=new Fe(0);let c=r===!0?0:1,l,h,d=null,u=0,f=null;function g(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v)),v}function _(x){let v=!1;const y=g(x);y===null?p(a,c):y&&y.isColor&&(p(y,1),v=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(x,v){const y=g(v);y&&(y.isCubeTexture||y.mapping===Br)?(h===void 0&&(h=new T(new le(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:os(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),xi.copy(v.backgroundRotation),xi.x*=-1,xi.y*=-1,xi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(jp.makeRotationFromEuler(xi)),h.material.toneMapped=je.getTransfer(y.colorSpace)!==lt,(d!==y||u!==y.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new T(new Vs(2,2),new di({name:"BackgroundMaterial",uniforms:os(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=je.getTransfer(y.colorSpace)!==lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,v){x.getRGB(dr,lh(s)),n.buffers.color.setClear(dr.r,dr.g,dr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(a,c)},render:_,addToRenderList:m}}function Jp(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,o=!1;function a(M,N,H,z,X){let Z=!1;const L=d(z,H,N);r!==L&&(r=L,l(r.object)),Z=f(M,z,H,X),Z&&g(M,z,H,X),X!==null&&e.update(X,s.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,y(M,N,H,z),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function d(M,N,H){const z=H.wireframe===!0;let X=n[M.id];X===void 0&&(X={},n[M.id]=X);let Z=X[N.id];Z===void 0&&(Z={},X[N.id]=Z);let L=Z[z];return L===void 0&&(L=u(c()),Z[z]=L),L}function u(M){const N=[],H=[],z=[];for(let X=0;X<t;X++)N[X]=0,H[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:H,attributeDivisors:z,object:M,attributes:{},index:null}}function f(M,N,H,z){const X=r.attributes,Z=N.attributes;let L=0;const I=H.getAttributes();for(const U in I)if(I[U].location>=0){const j=X[U];let Q=Z[U];if(Q===void 0&&(U==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),U==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor)),j===void 0||j.attribute!==Q||Q&&j.data!==Q.data)return!0;L++}return r.attributesNum!==L||r.index!==z}function g(M,N,H,z){const X={},Z=N.attributes;let L=0;const I=H.getAttributes();for(const U in I)if(I[U].location>=0){let j=Z[U];j===void 0&&(U==="instanceMatrix"&&M.instanceMatrix&&(j=M.instanceMatrix),U==="instanceColor"&&M.instanceColor&&(j=M.instanceColor));const Q={};Q.attribute=j,j&&j.data&&(Q.data=j.data),X[U]=Q,L++}r.attributes=X,r.attributesNum=L,r.index=z}function _(){const M=r.newAttributes;for(let N=0,H=M.length;N<H;N++)M[N]=0}function m(M){p(M,0)}function p(M,N){const H=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;H[M]=1,z[M]===0&&(s.enableVertexAttribArray(M),z[M]=1),X[M]!==N&&(s.vertexAttribDivisor(M,N),X[M]=N)}function x(){const M=r.newAttributes,N=r.enabledAttributes;for(let H=0,z=N.length;H<z;H++)N[H]!==M[H]&&(s.disableVertexAttribArray(H),N[H]=0)}function v(M,N,H,z,X,Z,L){L===!0?s.vertexAttribIPointer(M,N,H,X,Z):s.vertexAttribPointer(M,N,H,z,X,Z)}function y(M,N,H,z){_();const X=z.attributes,Z=H.getAttributes(),L=N.defaultAttributeValues;for(const I in Z){const U=Z[I];if(U.location>=0){let V=X[I];if(V===void 0&&(I==="instanceMatrix"&&M.instanceMatrix&&(V=M.instanceMatrix),I==="instanceColor"&&M.instanceColor&&(V=M.instanceColor)),V!==void 0){const j=V.normalized,Q=V.itemSize,oe=e.get(V);if(oe===void 0)continue;const Te=oe.buffer,q=oe.type,ae=oe.bytesPerElement,pe=q===s.INT||q===s.UNSIGNED_INT||V.gpuType===Ia;if(V.isInterleavedBufferAttribute){const de=V.data,be=de.stride,Ie=V.offset;if(de.isInstancedInterleavedBuffer){for(let Ge=0;Ge<U.locationSize;Ge++)p(U.location+Ge,de.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Ge=0;Ge<U.locationSize;Ge++)m(U.location+Ge);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let Ge=0;Ge<U.locationSize;Ge++)v(U.location+Ge,Q/U.locationSize,q,j,be*ae,(Ie+Q/U.locationSize*Ge)*ae,pe)}else{if(V.isInstancedBufferAttribute){for(let de=0;de<U.locationSize;de++)p(U.location+de,V.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let de=0;de<U.locationSize;de++)m(U.location+de);s.bindBuffer(s.ARRAY_BUFFER,Te);for(let de=0;de<U.locationSize;de++)v(U.location+de,Q/U.locationSize,q,j,Q*ae,Q/U.locationSize*de*ae,pe)}}else if(L!==void 0){const j=L[I];if(j!==void 0)switch(j.length){case 2:s.vertexAttrib2fv(U.location,j);break;case 3:s.vertexAttrib3fv(U.location,j);break;case 4:s.vertexAttrib4fv(U.location,j);break;default:s.vertexAttrib1fv(U.location,j)}}}}x()}function P(){C();for(const M in n){const N=n[M];for(const H in N){const z=N[H];for(const X in z)h(z[X].object),delete z[X];delete N[H]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;const N=n[M.id];for(const H in N){const z=N[H];for(const X in z)h(z[X].object),delete z[X];delete N[H]}delete n[M.id]}function R(M){for(const N in n){const H=n[N];if(H[M.id]===void 0)continue;const z=H[M.id];for(const X in z)h(z[X].object),delete z[X];delete H[M.id]}}function C(){w(),o=!0,r!==i&&(r=i,l(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:w,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function $p(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,d){d!==0&&(s.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function a(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,n,1)}function c(l,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_]*u[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Qp(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(R){return!(R!==cn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const C=R===Gs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Xn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==gn&&!C)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:P,maxSamples:E}}function em(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new bi,a=new Xe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,v=x*4;let y=p.clippingState||null;c.value=y,y=h(g,u,v,f);for(let P=0;P!==v;++P)y[P]=t[P];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,y=f;v!==_;++v,y+=4)o.copy(d[v]).applyMatrix4(x,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function tm(s){let e=new WeakMap;function t(o,a){return a===Wo?o.mapping=es:a===Vo&&(o.mapping=ts),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Wo||a===Vo)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new du(c.height);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Ga extends hh{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Yi=4,kc=[.125,.215,.35,.446,.526,.582],Ri=20,po=new Ga,Bc=new Fe;let mo=null,go=0,_o=0,xo=!1;const Ei=(1+Math.sqrt(5))/2,Xi=1/Ei,Hc=[new D(-Ei,Xi,0),new D(Ei,Xi,0),new D(-Xi,0,Ei),new D(Xi,0,Ei),new D(0,Ei,-Xi),new D(0,Ei,Xi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Gc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){mo=this._renderer.getRenderTarget(),go=this._renderer.getActiveCubeFace(),_o=this._renderer.getActiveMipmapLevel(),xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(mo,go,_o),this._renderer.xr.enabled=xo,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===es||e.mapping===ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),mo=this._renderer.getRenderTarget(),go=this._renderer.getActiveCubeFace(),_o=this._renderer.getActiveMipmapLevel(),xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Gs,format:cn,colorSpace:Bt,depthBuffer:!1},i=Wc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nm(r)),this._blurMaterial=im(r,e,t)}return i}_compileMaterial(e){const t=new T(this._lodPlanes[0],e);this._renderer.compile(t,po)}_sceneToCubeUV(e,t,n,i){const a=new Ut(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Bc),h.toneMapping=hi,h.autoClear=!1;const f=new wt({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}),g=new T(new le,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Bc),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):x===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const v=this._cubeSize;ur(i,x*v,p>2?v:0,v,v),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===es||e.mapping===ts;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vc());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new T(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;ur(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,po)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hc[(i-r-1)%Hc.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new T(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ri-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ri;m>Ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ri}`);const p=[];let x=0;for(let R=0;R<Ri;++R){const C=R/_,w=Math.exp(-C*C/2);p.push(w),R===0?x+=w:R<m&&(x+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/x;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:v}=this;u.dTheta.value=g,u.mipInt.value=v-n;const y=this._sizeLods[i],P=3*y*(i>v-Yi?i-v+Yi:0),E=4*(this._cubeSize-y);ur(t,P,E,3*y,2*y),c.setRenderTarget(t),c.render(d,po)}}function nm(s){const e=[],t=[],n=[];let i=s;const r=s-Yi+1+kc.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Yi?c=kc[o-s+Yi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),v=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let E=0;E<f;E++){const R=E%3*2/3-1,C=E>2?0:-1,w=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];x.set(w,_*g*E),v.set(u,m*g*E);const M=[E,E,E,E,E,E];y.set(M,p*g*E)}const P=new Pt;P.setAttribute("position",new Ft(x,_)),P.setAttribute("uv",new Ft(v,m)),P.setAttribute("faceIndex",new Ft(y,p)),e.push(P),i>Yi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Wc(s,e,t){const n=new Ci(s,e,t);return n.texture.mapping=Br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ur(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function im(s,e,t){const n=new Float32Array(Ri),i=new D(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Vc(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Xc(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Wa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function sm(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Wo||c===Vo,h=c===es||c===ts;if(l||h){let d=e.get(a);const u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return t===null&&(t=new Gc(s)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Gc(s)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function rm(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ps("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function om(s,e,t,n){const i={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}u.removeEventListener("dispose",o),delete i[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)e.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let v=0,y=x.length;v<y;v+=3){const P=x[v+0],E=x[v+1],R=x[v+2];u.push(P,E,E,R,R,P)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,y=x.length/3-1;v<y;v+=3){const P=v+0,E=v+1,R=v+2;u.push(P,E,E,R,R,P)}}else return;const m=new(ih(u)?ch:ah)(u,1);m.version=_;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function am(s,e,t){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){s.drawElements(n,f,r,u*o),t.update(f,n,1)}function l(u,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,u*o,g),t.update(f,n,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function d(u,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,_,0,g);let p=0;for(let x=0;x<g;x++)p+=f[x]*_[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function cm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function lm(s,e,t){const n=new WeakMap,i=new et;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let M=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),_===!0&&(y=2),m===!0&&(y=3);let P=a.attributes.position.count*y,E=1;P>e.maxTextureSize&&(E=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const R=new Float32Array(P*E*4*d),C=new rh(R,P,E,d);C.type=gn,C.needsUpdate=!0;const w=y*4;for(let N=0;N<d;N++){const H=p[N],z=x[N],X=v[N],Z=P*E*4*N;for(let L=0;L<H.count;L++){const I=L*w;g===!0&&(i.fromBufferAttribute(H,L),R[Z+I+0]=i.x,R[Z+I+1]=i.y,R[Z+I+2]=i.z,R[Z+I+3]=0),_===!0&&(i.fromBufferAttribute(z,L),R[Z+I+4]=i.x,R[Z+I+5]=i.y,R[Z+I+6]=i.z,R[Z+I+7]=0),m===!0&&(i.fromBufferAttribute(X,L),R[Z+I+8]=i.x,R[Z+I+9]=i.y,R[Z+I+10]=i.z,R[Z+I+11]=X.itemSize===4?i.w:1)}}u={count:d,texture:C,size:new ye(P,E)},n.set(a,u),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function hm(s,e,t,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=e.get(c,h);if(i.get(d)!==l&&(e.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class fh extends Tt{constructor(e,t,n,i,r,o,a,c,l,h=Zi){if(h!==Zi&&h!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Zi&&(n=Pi),n===void 0&&h===ss&&(n=is),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:zt,this.minFilter=c!==void 0?c:zt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ph=new Tt,qc=new fh(1,1),mh=new rh,gh=new jd,_h=new dh,Yc=[],Kc=[],jc=new Float32Array(16),Zc=new Float32Array(9),Jc=new Float32Array(4);function fs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Yc[i];if(r===void 0&&(r=new Float32Array(i),Yc[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function bt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Et(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Gr(s,e){let t=Kc[e];t===void 0&&(t=new Int32Array(e),Kc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function dm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function um(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;s.uniform2fv(this.addr,e),Et(t,e)}}function fm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;s.uniform3fv(this.addr,e),Et(t,e)}}function pm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;s.uniform4fv(this.addr,e),Et(t,e)}}function mm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,n))return;Jc.set(n),s.uniformMatrix2fv(this.addr,!1,Jc),Et(t,n)}}function gm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,n))return;Zc.set(n),s.uniformMatrix3fv(this.addr,!1,Zc),Et(t,n)}}function _m(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,n))return;jc.set(n),s.uniformMatrix4fv(this.addr,!1,jc),Et(t,n)}}function xm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function vm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;s.uniform2iv(this.addr,e),Et(t,e)}}function ym(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;s.uniform3iv(this.addr,e),Et(t,e)}}function Mm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;s.uniform4iv(this.addr,e),Et(t,e)}}function wm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Sm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;s.uniform2uiv(this.addr,e),Et(t,e)}}function Tm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;s.uniform3uiv(this.addr,e),Et(t,e)}}function bm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;s.uniform4uiv(this.addr,e),Et(t,e)}}function Em(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(qc.compareFunction=th,r=qc):r=ph,t.setTexture2D(e||r,i)}function Am(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||gh,i)}function Rm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||_h,i)}function Pm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||mh,i)}function Cm(s){switch(s){case 5126:return dm;case 35664:return um;case 35665:return fm;case 35666:return pm;case 35674:return mm;case 35675:return gm;case 35676:return _m;case 5124:case 35670:return xm;case 35667:case 35671:return vm;case 35668:case 35672:return ym;case 35669:case 35673:return Mm;case 5125:return wm;case 36294:return Sm;case 36295:return Tm;case 36296:return bm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return Am;case 35680:case 36300:case 36308:case 36293:return Rm;case 36289:case 36303:case 36311:case 36292:return Pm}}function Nm(s,e){s.uniform1fv(this.addr,e)}function Im(s,e){const t=fs(e,this.size,2);s.uniform2fv(this.addr,t)}function Lm(s,e){const t=fs(e,this.size,3);s.uniform3fv(this.addr,t)}function Dm(s,e){const t=fs(e,this.size,4);s.uniform4fv(this.addr,t)}function Um(s,e){const t=fs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Om(s,e){const t=fs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function zm(s,e){const t=fs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Fm(s,e){s.uniform1iv(this.addr,e)}function km(s,e){s.uniform2iv(this.addr,e)}function Bm(s,e){s.uniform3iv(this.addr,e)}function Hm(s,e){s.uniform4iv(this.addr,e)}function Gm(s,e){s.uniform1uiv(this.addr,e)}function Wm(s,e){s.uniform2uiv(this.addr,e)}function Vm(s,e){s.uniform3uiv(this.addr,e)}function Xm(s,e){s.uniform4uiv(this.addr,e)}function qm(s,e,t){const n=this.cache,i=e.length,r=Gr(t,i);bt(n,r)||(s.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||ph,r[o])}function Ym(s,e,t){const n=this.cache,i=e.length,r=Gr(t,i);bt(n,r)||(s.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||gh,r[o])}function Km(s,e,t){const n=this.cache,i=e.length,r=Gr(t,i);bt(n,r)||(s.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||_h,r[o])}function jm(s,e,t){const n=this.cache,i=e.length,r=Gr(t,i);bt(n,r)||(s.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||mh,r[o])}function Zm(s){switch(s){case 5126:return Nm;case 35664:return Im;case 35665:return Lm;case 35666:return Dm;case 35674:return Um;case 35675:return Om;case 35676:return zm;case 5124:case 35670:return Fm;case 35667:case 35671:return km;case 35668:case 35672:return Bm;case 35669:case 35673:return Hm;case 5125:return Gm;case 36294:return Wm;case 36295:return Vm;case 36296:return Xm;case 35678:case 36198:case 36298:case 36306:case 35682:return qm;case 35679:case 36299:case 36307:return Ym;case 35680:case 36300:case 36308:case 36293:return Km;case 36289:case 36303:case 36311:case 36292:return jm}}class Jm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cm(t.type)}}class $m{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zm(t.type)}}class Qm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const vo=/(\w+)(\])?(\[|\.)?/g;function $c(s,e){s.seq.push(e),s.map[e.id]=e}function eg(s,e,t){const n=s.name,i=n.length;for(vo.lastIndex=0;;){const r=vo.exec(n),o=vo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){$c(t,l===void 0?new Jm(a,s,e):new $m(a,s,e));break}else{let d=t.map[a];d===void 0&&(d=new Qm(a),$c(t,d)),t=d}}}class Rr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);eg(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Qc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const tg=37297;let ng=0;function ig(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const el=new Xe;function sg(s){je._getMatrix(el,je.workingColorSpace,s);const e=`mat3( ${el.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(s)){case Hr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function tl(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+ig(s.getShaderSource(e),o)}else return i}function rg(s,e){const t=sg(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function og(s,e){let t;switch(e){case rd:t="Linear";break;case od:t="Reinhard";break;case ad:t="Cineon";break;case cd:t="ACESFilmic";break;case hd:t="AgX";break;case dd:t="Neutral";break;case ld:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const fr=new D;function ag(){je.getLuminanceCoefficients(fr);const s=fr.x.toFixed(4),e=fr.y.toFixed(4),t=fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cs).join(`
`)}function lg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Cs(s){return s!==""}function nl(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function il(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dg=/^[ \t]*#include +<([\w\d./]+)>/gm;function va(s){return s.replace(dg,fg)}const ug=new Map;function fg(s,e){let t=Ye[e];if(t===void 0){const n=ug.get(e);if(n!==void 0)t=Ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return va(t)}const pg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sl(s){return s.replace(pg,mg)}function mg(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function rl(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Bl?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Fn&&(e="SHADOWMAP_TYPE_VSM"),e}function _g(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case es:case ts:e="ENVMAP_TYPE_CUBE";break;case Br:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ts:e="ENVMAP_MODE_REFRACTION";break}return e}function vg(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Hl:e="ENVMAP_BLENDING_MULTIPLY";break;case id:e="ENVMAP_BLENDING_MIX";break;case sd:e="ENVMAP_BLENDING_ADD";break}return e}function yg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Mg(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=gg(t),l=_g(t),h=xg(t),d=vg(t),u=yg(t),f=cg(t),g=lg(r),_=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Cs).join(`
`),p.length>0&&(p+=`
`)):(m=[rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cs).join(`
`),p=[rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hi?"#define TONE_MAPPING":"",t.toneMapping!==hi?Ye.tonemapping_pars_fragment:"",t.toneMapping!==hi?og("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,rg("linearToOutputTexel",t.outputColorSpace),ag(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cs).join(`
`)),o=va(o),o=nl(o,t),o=il(o,t),a=va(a),a=nl(a,t),a=il(a,t),o=sl(o),a=sl(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===_c?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_c?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=x+m+o,y=x+p+a,P=Qc(i,i.VERTEX_SHADER,v),E=Qc(i,i.FRAGMENT_SHADER,y);i.attachShader(_,P),i.attachShader(_,E),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(N){if(s.debug.checkShaderErrors){const H=i.getProgramInfoLog(_).trim(),z=i.getShaderInfoLog(P).trim(),X=i.getShaderInfoLog(E).trim();let Z=!0,L=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,P,E);else{const I=tl(i,P,"vertex"),U=tl(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+H+`
`+I+`
`+U)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(z===""||X==="")&&(L=!1);L&&(N.diagnostics={runnable:Z,programLog:H,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:p}})}i.deleteShader(P),i.deleteShader(E),C=new Rr(i,_),w=hg(i,_)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,tg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ng++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=E,this}let wg=0;class Sg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Tg(e),t.set(e,n)),n}}class Tg{constructor(e){this.id=wg++,this.code=e,this.usedTimes=0}}function bg(s,e,t,n,i,r,o){const a=new Ba,c=new Sg,l=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return l.add(w),w===0?"uv":`uv${w}`}function m(w,M,N,H,z){const X=H.fog,Z=z.geometry,L=w.isMeshStandardMaterial?H.environment:null,I=(w.isMeshStandardMaterial?t:e).get(w.envMap||L),U=I&&I.mapping===Br?I.image.height:null,V=g[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const j=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Q=j!==void 0?j.length:0;let oe=0;Z.morphAttributes.position!==void 0&&(oe=1),Z.morphAttributes.normal!==void 0&&(oe=2),Z.morphAttributes.color!==void 0&&(oe=3);let Te,q,ae,pe;if(V){const rt=wn[V];Te=rt.vertexShader,q=rt.fragmentShader}else Te=w.vertexShader,q=w.fragmentShader,c.update(w),ae=c.getVertexShaderID(w),pe=c.getFragmentShaderID(w);const de=s.getRenderTarget(),be=s.state.buffers.depth.getReversed(),Ie=z.isInstancedMesh===!0,Ge=z.isBatchedMesh===!0,Je=!!w.map,Le=!!w.matcap,ct=!!I,O=!!w.aoMap,tt=!!w.lightMap,Oe=!!w.bumpMap,Be=!!w.normalMap,Ne=!!w.displacementMap,re=!!w.emissiveMap,$=!!w.metalnessMap,A=!!w.roughnessMap,S=w.anisotropy>0,W=w.clearcoat>0,ee=w.dispersion>0,se=w.iridescence>0,te=w.sheen>0,Pe=w.transmission>0,ge=S&&!!w.anisotropyMap,Me=W&&!!w.clearcoatMap,$e=W&&!!w.clearcoatNormalMap,ce=W&&!!w.clearcoatRoughnessMap,we=se&&!!w.iridescenceMap,De=se&&!!w.iridescenceThicknessMap,ze=te&&!!w.sheenColorMap,Se=te&&!!w.sheenRoughnessMap,Ze=!!w.specularMap,qe=!!w.specularColorMap,ht=!!w.specularIntensityMap,F=Pe&&!!w.transmissionMap,me=Pe&&!!w.thicknessMap,J=!!w.gradientMap,ne=!!w.alphaMap,ve=w.alphaTest>0,_e=!!w.alphaHash,We=!!w.extensions;let xt=hi;w.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(xt=s.toneMapping);const Ct={shaderID:V,shaderType:w.type,shaderName:w.name,vertexShader:Te,fragmentShader:q,defines:w.defines,customVertexShaderID:ae,customFragmentShaderID:pe,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Ge,batchingColor:Ge&&z._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&z.instanceColor!==null,instancingMorph:Ie&&z.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:de===null?s.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Bt,alphaToCoverage:!!w.alphaToCoverage,map:Je,matcap:Le,envMap:ct,envMapMode:ct&&I.mapping,envMapCubeUVHeight:U,aoMap:O,lightMap:tt,bumpMap:Oe,normalMap:Be,displacementMap:u&&Ne,emissiveMap:re,normalMapObjectSpace:Be&&w.normalMapType===_d,normalMapTangentSpace:Be&&w.normalMapType===eh,metalnessMap:$,roughnessMap:A,anisotropy:S,anisotropyMap:ge,clearcoat:W,clearcoatMap:Me,clearcoatNormalMap:$e,clearcoatRoughnessMap:ce,dispersion:ee,iridescence:se,iridescenceMap:we,iridescenceThicknessMap:De,sheen:te,sheenColorMap:ze,sheenRoughnessMap:Se,specularMap:Ze,specularColorMap:qe,specularIntensityMap:ht,transmission:Pe,transmissionMap:F,thicknessMap:me,gradientMap:J,opaque:w.transparent===!1&&w.blending===ji&&w.alphaToCoverage===!1,alphaMap:ne,alphaTest:ve,alphaHash:_e,combine:w.combine,mapUv:Je&&_(w.map.channel),aoMapUv:O&&_(w.aoMap.channel),lightMapUv:tt&&_(w.lightMap.channel),bumpMapUv:Oe&&_(w.bumpMap.channel),normalMapUv:Be&&_(w.normalMap.channel),displacementMapUv:Ne&&_(w.displacementMap.channel),emissiveMapUv:re&&_(w.emissiveMap.channel),metalnessMapUv:$&&_(w.metalnessMap.channel),roughnessMapUv:A&&_(w.roughnessMap.channel),anisotropyMapUv:ge&&_(w.anisotropyMap.channel),clearcoatMapUv:Me&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:$e&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:De&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(w.sheenRoughnessMap.channel),specularMapUv:Ze&&_(w.specularMap.channel),specularColorMapUv:qe&&_(w.specularColorMap.channel),specularIntensityMapUv:ht&&_(w.specularIntensityMap.channel),transmissionMapUv:F&&_(w.transmissionMap.channel),thicknessMapUv:me&&_(w.thicknessMap.channel),alphaMapUv:ne&&_(w.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Be||S),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Z.attributes.uv&&(Je||ne),fog:!!X,useFog:w.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:be,skinning:z.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:oe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&N.length>0,shadowMapType:s.shadowMap.type,toneMapping:xt,decodeVideoTexture:Je&&w.map.isVideoTexture===!0&&je.getTransfer(w.map.colorSpace)===lt,decodeVideoTextureEmissive:re&&w.emissiveMap.isVideoTexture===!0&&je.getTransfer(w.emissiveMap.colorSpace)===lt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Ot,flipSided:w.side===Wt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:We&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&w.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ct.vertexUv1s=l.has(1),Ct.vertexUv2s=l.has(2),Ct.vertexUv3s=l.has(3),l.clear(),Ct}function p(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const N in w.defines)M.push(N),M.push(w.defines[N]);return w.isRawShaderMaterial===!1&&(x(M,w),v(M,w),M.push(s.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function x(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function v(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function y(w){const M=g[w.type];let N;if(M){const H=wn[M];N=au.clone(H.uniforms)}else N=w.uniforms;return N}function P(w,M){let N;for(let H=0,z=h.length;H<z;H++){const X=h[H];if(X.cacheKey===M){N=X,++N.usedTimes;break}}return N===void 0&&(N=new Mg(s,M,w,r),h.push(N)),N}function E(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function R(w){c.remove(w)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:P,releaseProgram:E,releaseShaderCache:R,programs:h,dispose:C}}function Eg(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Ag(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function ol(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function al(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(d,u,f,g,_,m){let p=s[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},s[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function a(d,u,f,g,_,m){const p=o(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(d,u,f,g,_,m){const p=o(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(d,u){t.length>1&&t.sort(d||Ag),n.length>1&&n.sort(u||ol),i.length>1&&i.sort(u||ol)}function h(){for(let d=e,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function Rg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new al,s.set(n,[o])):i>=r.length?(o=new al,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Pg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Fe};break;case"SpotLight":t={position:new D,direction:new D,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new D,halfWidth:new D,halfHeight:new D};break}return s[e.id]=t,t}}}function Cg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Ng=0;function Ig(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Lg(s){const e=new Pg,t=Cg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const i=new D,r=new He,o=new He;function a(l){let h=0,d=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,x=0,v=0,y=0,P=0,E=0,R=0;l.sort(Ig);for(let w=0,M=l.length;w<M;w++){const N=l[w],H=N.color,z=N.intensity,X=N.distance,Z=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=H.r*z,d+=H.g*z,u+=H.b*z;else if(N.isLightProbe){for(let L=0;L<9;L++)n.probe[L].addScaledVector(N.sh.coefficients[L],z);R++}else if(N.isDirectionalLight){const L=e.get(N);if(L.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const I=N.shadow,U=t.get(N);U.shadowIntensity=I.intensity,U.shadowBias=I.bias,U.shadowNormalBias=I.normalBias,U.shadowRadius=I.radius,U.shadowMapSize=I.mapSize,n.directionalShadow[f]=U,n.directionalShadowMap[f]=Z,n.directionalShadowMatrix[f]=N.shadow.matrix,x++}n.directional[f]=L,f++}else if(N.isSpotLight){const L=e.get(N);L.position.setFromMatrixPosition(N.matrixWorld),L.color.copy(H).multiplyScalar(z),L.distance=X,L.coneCos=Math.cos(N.angle),L.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),L.decay=N.decay,n.spot[_]=L;const I=N.shadow;if(N.map&&(n.spotLightMap[P]=N.map,P++,I.updateMatrices(N),N.castShadow&&E++),n.spotLightMatrix[_]=I.matrix,N.castShadow){const U=t.get(N);U.shadowIntensity=I.intensity,U.shadowBias=I.bias,U.shadowNormalBias=I.normalBias,U.shadowRadius=I.radius,U.shadowMapSize=I.mapSize,n.spotShadow[_]=U,n.spotShadowMap[_]=Z,y++}_++}else if(N.isRectAreaLight){const L=e.get(N);L.color.copy(H).multiplyScalar(z),L.halfWidth.set(N.width*.5,0,0),L.halfHeight.set(0,N.height*.5,0),n.rectArea[m]=L,m++}else if(N.isPointLight){const L=e.get(N);if(L.color.copy(N.color).multiplyScalar(N.intensity),L.distance=N.distance,L.decay=N.decay,N.castShadow){const I=N.shadow,U=t.get(N);U.shadowIntensity=I.intensity,U.shadowBias=I.bias,U.shadowNormalBias=I.normalBias,U.shadowRadius=I.radius,U.shadowMapSize=I.mapSize,U.shadowCameraNear=I.camera.near,U.shadowCameraFar=I.camera.far,n.pointShadow[g]=U,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=N.shadow.matrix,v++}n.point[g]=L,g++}else if(N.isHemisphereLight){const L=e.get(N);L.skyColor.copy(N.color).multiplyScalar(z),L.groundColor.copy(N.groundColor).multiplyScalar(z),n.hemi[p]=L,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==x||C.numPointShadows!==v||C.numSpotShadows!==y||C.numSpotMaps!==P||C.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=y+P-E,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,C.directionalLength=f,C.pointLength=g,C.spotLength=_,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=x,C.numPointShadows=v,C.numSpotShadows=y,C.numSpotMaps=P,C.numLightProbes=R,n.version=Ng++)}function c(l,h){let d=0,u=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const v=l[p];if(v.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),d++}else if(v.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const y=n.point[u];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),u++}else if(v.isHemisphereLight){const y=n.hemi[_];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function cl(s){const e=new Lg(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Dg(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new cl(s),e.set(i,[a])):r>=o.length?(a=new cl(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Ug extends Sn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Og extends Sn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const zg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function kg(s,e,t){let n=new Ha;const i=new ye,r=new ye,o=new et,a=new Ug({depthPacking:gd}),c=new Og,l={},h=t.maxTextureSize,d={[Vn]:Wt,[Wt]:Vn,[Ot]:Ot},u=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:zg,fragmentShader:Fg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Pt;g.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new T(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kl;let p=this.type;this.render=function(E,R,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const w=s.getRenderTarget(),M=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),H=s.state;H.setBlending(li),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const z=p!==Fn&&this.type===Fn,X=p===Fn&&this.type!==Fn;for(let Z=0,L=E.length;Z<L;Z++){const I=E[Z],U=I.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",I,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;i.copy(U.mapSize);const V=U.getFrameExtents();if(i.multiply(V),r.copy(U.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/V.x),i.x=r.x*V.x,U.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/V.y),i.y=r.y*V.y,U.mapSize.y=r.y)),U.map===null||z===!0||X===!0){const Q=this.type!==Fn?{minFilter:zt,magFilter:zt}:{};U.map!==null&&U.map.dispose(),U.map=new Ci(i.x,i.y,Q),U.map.texture.name=I.name+".shadowMap",U.camera.updateProjectionMatrix()}s.setRenderTarget(U.map),s.clear();const j=U.getViewportCount();for(let Q=0;Q<j;Q++){const oe=U.getViewport(Q);o.set(r.x*oe.x,r.y*oe.y,r.x*oe.z,r.y*oe.w),H.viewport(o),U.updateMatrices(I,Q),n=U.getFrustum(),y(R,C,U.camera,I,this.type)}U.isPointLightShadow!==!0&&this.type===Fn&&x(U,C),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(w,M,N)};function x(E,R){const C=e.update(_);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ci(i.x,i.y)),u.uniforms.shadow_pass.value=E.map.texture,u.uniforms.resolution.value=E.mapSize,u.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(R,null,C,u,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(R,null,C,f,_,null)}function v(E,R,C,w){let M=null;const N=C.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)M=N;else if(M=C.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const H=M.uuid,z=R.uuid;let X=l[H];X===void 0&&(X={},l[H]=X);let Z=X[z];Z===void 0&&(Z=M.clone(),X[z]=Z,R.addEventListener("dispose",P)),M=Z}if(M.visible=R.visible,M.wireframe=R.wireframe,w===Fn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,C.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=s.properties.get(M);H.light=C}return M}function y(E,R,C,w,M){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Fn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,E.matrixWorld);const z=e.update(E),X=E.material;if(Array.isArray(X)){const Z=z.groups;for(let L=0,I=Z.length;L<I;L++){const U=Z[L],V=X[U.materialIndex];if(V&&V.visible){const j=v(E,V,w,M);E.onBeforeShadow(s,E,R,C,z,j,U),s.renderBufferDirect(C,null,z,j,E,U),E.onAfterShadow(s,E,R,C,z,j,U)}}}else if(X.visible){const Z=v(E,X,w,M);E.onBeforeShadow(s,E,R,C,z,Z,null),s.renderBufferDirect(C,null,z,Z,E,null),E.onAfterShadow(s,E,R,C,z,Z,null)}}const H=E.children;for(let z=0,X=H.length;z<X;z++)y(H[z],R,C,w,M)}function P(E){E.target.removeEventListener("dispose",P);for(const C in l){const w=l[C],M=E.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const Bg={[Oo]:zo,[Fo]:Ho,[ko]:Go,[Qi]:Bo,[zo]:Oo,[Ho]:Fo,[Go]:ko,[Bo]:Qi};function Hg(s,e){function t(){let F=!1;const me=new et;let J=null;const ne=new et(0,0,0,0);return{setMask:function(ve){J!==ve&&!F&&(s.colorMask(ve,ve,ve,ve),J=ve)},setLocked:function(ve){F=ve},setClear:function(ve,_e,We,xt,Ct){Ct===!0&&(ve*=xt,_e*=xt,We*=xt),me.set(ve,_e,We,xt),ne.equals(me)===!1&&(s.clearColor(ve,_e,We,xt),ne.copy(me))},reset:function(){F=!1,J=null,ne.set(-1,0,0,0)}}}function n(){let F=!1,me=!1,J=null,ne=null,ve=null;return{setReversed:function(_e){if(me!==_e){const We=e.get("EXT_clip_control");me?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);const xt=ve;ve=null,this.setClear(xt)}me=_e},getReversed:function(){return me},setTest:function(_e){_e?de(s.DEPTH_TEST):be(s.DEPTH_TEST)},setMask:function(_e){J!==_e&&!F&&(s.depthMask(_e),J=_e)},setFunc:function(_e){if(me&&(_e=Bg[_e]),ne!==_e){switch(_e){case Oo:s.depthFunc(s.NEVER);break;case zo:s.depthFunc(s.ALWAYS);break;case Fo:s.depthFunc(s.LESS);break;case Qi:s.depthFunc(s.LEQUAL);break;case ko:s.depthFunc(s.EQUAL);break;case Bo:s.depthFunc(s.GEQUAL);break;case Ho:s.depthFunc(s.GREATER);break;case Go:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ne=_e}},setLocked:function(_e){F=_e},setClear:function(_e){ve!==_e&&(me&&(_e=1-_e),s.clearDepth(_e),ve=_e)},reset:function(){F=!1,J=null,ne=null,ve=null,me=!1}}}function i(){let F=!1,me=null,J=null,ne=null,ve=null,_e=null,We=null,xt=null,Ct=null;return{setTest:function(rt){F||(rt?de(s.STENCIL_TEST):be(s.STENCIL_TEST))},setMask:function(rt){me!==rt&&!F&&(s.stencilMask(rt),me=rt)},setFunc:function(rt,ln,Pn){(J!==rt||ne!==ln||ve!==Pn)&&(s.stencilFunc(rt,ln,Pn),J=rt,ne=ln,ve=Pn)},setOp:function(rt,ln,Pn){(_e!==rt||We!==ln||xt!==Pn)&&(s.stencilOp(rt,ln,Pn),_e=rt,We=ln,xt=Pn)},setLocked:function(rt){F=rt},setClear:function(rt){Ct!==rt&&(s.clearStencil(rt),Ct=rt)},reset:function(){F=!1,me=null,J=null,ne=null,ve=null,_e=null,We=null,xt=null,Ct=null}}}const r=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,v=null,y=null,P=null,E=null,R=new Fe(0,0,0),C=0,w=!1,M=null,N=null,H=null,z=null,X=null;const Z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let L=!1,I=0;const U=s.getParameter(s.VERSION);U.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(U)[1]),L=I>=1):U.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),L=I>=2);let V=null,j={};const Q=s.getParameter(s.SCISSOR_BOX),oe=s.getParameter(s.VIEWPORT),Te=new et().fromArray(Q),q=new et().fromArray(oe);function ae(F,me,J,ne){const ve=new Uint8Array(4),_e=s.createTexture();s.bindTexture(F,_e),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let We=0;We<J;We++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(me,0,s.RGBA,1,1,ne,0,s.RGBA,s.UNSIGNED_BYTE,ve):s.texImage2D(me+We,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ve);return _e}const pe={};pe[s.TEXTURE_2D]=ae(s.TEXTURE_2D,s.TEXTURE_2D,1),pe[s.TEXTURE_CUBE_MAP]=ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[s.TEXTURE_2D_ARRAY]=ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),pe[s.TEXTURE_3D]=ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),de(s.DEPTH_TEST),o.setFunc(Qi),Oe(!1),Be(cc),de(s.CULL_FACE),O(li);function de(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function be(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function Ie(F,me){return d[F]!==me?(s.bindFramebuffer(F,me),d[F]=me,F===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=me),F===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=me),!0):!1}function Ge(F,me){let J=f,ne=!1;if(F){J=u.get(me),J===void 0&&(J=[],u.set(me,J));const ve=F.textures;if(J.length!==ve.length||J[0]!==s.COLOR_ATTACHMENT0){for(let _e=0,We=ve.length;_e<We;_e++)J[_e]=s.COLOR_ATTACHMENT0+_e;J.length=ve.length,ne=!0}}else J[0]!==s.BACK&&(J[0]=s.BACK,ne=!0);ne&&s.drawBuffers(J)}function Je(F){return g!==F?(s.useProgram(F),g=F,!0):!1}const Le={[Ai]:s.FUNC_ADD,[Bh]:s.FUNC_SUBTRACT,[Hh]:s.FUNC_REVERSE_SUBTRACT};Le[Gh]=s.MIN,Le[Wh]=s.MAX;const ct={[Vh]:s.ZERO,[Xh]:s.ONE,[qh]:s.SRC_COLOR,[Do]:s.SRC_ALPHA,[$h]:s.SRC_ALPHA_SATURATE,[Zh]:s.DST_COLOR,[Kh]:s.DST_ALPHA,[Yh]:s.ONE_MINUS_SRC_COLOR,[Uo]:s.ONE_MINUS_SRC_ALPHA,[Jh]:s.ONE_MINUS_DST_COLOR,[jh]:s.ONE_MINUS_DST_ALPHA,[Qh]:s.CONSTANT_COLOR,[ed]:s.ONE_MINUS_CONSTANT_COLOR,[td]:s.CONSTANT_ALPHA,[nd]:s.ONE_MINUS_CONSTANT_ALPHA};function O(F,me,J,ne,ve,_e,We,xt,Ct,rt){if(F===li){_===!0&&(be(s.BLEND),_=!1);return}if(_===!1&&(de(s.BLEND),_=!0),F!==kh){if(F!==m||rt!==w){if((p!==Ai||y!==Ai)&&(s.blendEquation(s.FUNC_ADD),p=Ai,y=Ai),rt)switch(F){case ji:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lc:s.blendFunc(s.ONE,s.ONE);break;case hc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case dc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case ji:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case lc:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case hc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case dc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}x=null,v=null,P=null,E=null,R.set(0,0,0),C=0,m=F,w=rt}return}ve=ve||me,_e=_e||J,We=We||ne,(me!==p||ve!==y)&&(s.blendEquationSeparate(Le[me],Le[ve]),p=me,y=ve),(J!==x||ne!==v||_e!==P||We!==E)&&(s.blendFuncSeparate(ct[J],ct[ne],ct[_e],ct[We]),x=J,v=ne,P=_e,E=We),(xt.equals(R)===!1||Ct!==C)&&(s.blendColor(xt.r,xt.g,xt.b,Ct),R.copy(xt),C=Ct),m=F,w=!1}function tt(F,me){F.side===Ot?be(s.CULL_FACE):de(s.CULL_FACE);let J=F.side===Wt;me&&(J=!J),Oe(J),F.blending===ji&&F.transparent===!1?O(li):O(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const ne=F.stencilWrite;a.setTest(ne),ne&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),re(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?de(s.SAMPLE_ALPHA_TO_COVERAGE):be(s.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(F){M!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),M=F)}function Be(F){F!==zh?(de(s.CULL_FACE),F!==N&&(F===cc?s.cullFace(s.BACK):F===Fh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):be(s.CULL_FACE),N=F}function Ne(F){F!==H&&(L&&s.lineWidth(F),H=F)}function re(F,me,J){F?(de(s.POLYGON_OFFSET_FILL),(z!==me||X!==J)&&(s.polygonOffset(me,J),z=me,X=J)):be(s.POLYGON_OFFSET_FILL)}function $(F){F?de(s.SCISSOR_TEST):be(s.SCISSOR_TEST)}function A(F){F===void 0&&(F=s.TEXTURE0+Z-1),V!==F&&(s.activeTexture(F),V=F)}function S(F,me,J){J===void 0&&(V===null?J=s.TEXTURE0+Z-1:J=V);let ne=j[J];ne===void 0&&(ne={type:void 0,texture:void 0},j[J]=ne),(ne.type!==F||ne.texture!==me)&&(V!==J&&(s.activeTexture(J),V=J),s.bindTexture(F,me||pe[F]),ne.type=F,ne.texture=me)}function W(){const F=j[V];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ee(){try{s.compressedTexImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function se(){try{s.compressedTexImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function te(){try{s.texSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{s.texSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ge(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Me(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $e(){try{s.texStorage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ce(){try{s.texStorage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(){try{s.texImage2D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function De(){try{s.texImage3D.apply(s,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ze(F){Te.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),Te.copy(F))}function Se(F){q.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),q.copy(F))}function Ze(F,me){let J=l.get(me);J===void 0&&(J=new WeakMap,l.set(me,J));let ne=J.get(F);ne===void 0&&(ne=s.getUniformBlockIndex(me,F.name),J.set(F,ne))}function qe(F,me){const ne=l.get(me).get(F);c.get(me)!==ne&&(s.uniformBlockBinding(me,ne,F.__bindingPointIndex),c.set(me,ne))}function ht(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},V=null,j={},d={},u=new WeakMap,f=[],g=null,_=!1,m=null,p=null,x=null,v=null,y=null,P=null,E=null,R=new Fe(0,0,0),C=0,w=!1,M=null,N=null,H=null,z=null,X=null,Te.set(0,0,s.canvas.width,s.canvas.height),q.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:de,disable:be,bindFramebuffer:Ie,drawBuffers:Ge,useProgram:Je,setBlending:O,setMaterial:tt,setFlipSided:Oe,setCullFace:Be,setLineWidth:Ne,setPolygonOffset:re,setScissorTest:$,activeTexture:A,bindTexture:S,unbindTexture:W,compressedTexImage2D:ee,compressedTexImage3D:se,texImage2D:we,texImage3D:De,updateUBOMapping:Ze,uniformBlockBinding:qe,texStorage2D:$e,texStorage3D:ce,texSubImage2D:te,texSubImage3D:Pe,compressedTexSubImage2D:ge,compressedTexSubImage3D:Me,scissor:ze,viewport:Se,reset:ht}}function ll(s,e,t,n){const i=Gg(n);switch(t){case Yl:return s*e;case jl:return s*e;case Zl:return s*e*2;case Ua:return s*e/i.components*i.byteLength;case Oa:return s*e/i.components*i.byteLength;case Jl:return s*e*2/i.components*i.byteLength;case za:return s*e*2/i.components*i.byteLength;case Kl:return s*e*3/i.components*i.byteLength;case cn:return s*e*4/i.components*i.byteLength;case Fa:return s*e*4/i.components*i.byteLength;case Sr:case Tr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case br:case Er:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case qo:case Ko:return Math.max(s,16)*Math.max(e,8)/4;case Xo:case Yo:return Math.max(s,8)*Math.max(e,8)/2;case jo:case Zo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Jo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case $o:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case ea:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case ta:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case na:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case ia:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case sa:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ra:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case oa:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case aa:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ca:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case la:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case ha:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case da:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ar:case ua:case fa:return Math.ceil(s/4)*Math.ceil(e/4)*16;case $l:case pa:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ma:case ga:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Gg(s){switch(s){case Xn:case Vl:return{byteLength:1,components:1};case Fs:case Xl:case Gs:return{byteLength:2,components:1};case La:case Da:return{byteLength:2,components:4};case Pi:case Ia:case gn:return{byteLength:4,components:1};case ql:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Wg(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ye,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,S){return f?new OffscreenCanvas(A,S):Hs("canvas")}function _(A,S,W){let ee=1;const se=$(A);if((se.width>W||se.height>W)&&(ee=W/Math.max(se.width,se.height)),ee<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const te=Math.floor(ee*se.width),Pe=Math.floor(ee*se.height);d===void 0&&(d=g(te,Pe));const ge=S?g(te,Pe):d;return ge.width=te,ge.height=Pe,ge.getContext("2d").drawImage(A,0,0,te,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+te+"x"+Pe+")."),ge}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){s.generateMipmap(A)}function x(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(A,S,W,ee,se=!1){if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let te=S;if(S===s.RED&&(W===s.FLOAT&&(te=s.R32F),W===s.HALF_FLOAT&&(te=s.R16F),W===s.UNSIGNED_BYTE&&(te=s.R8)),S===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(te=s.R8UI),W===s.UNSIGNED_SHORT&&(te=s.R16UI),W===s.UNSIGNED_INT&&(te=s.R32UI),W===s.BYTE&&(te=s.R8I),W===s.SHORT&&(te=s.R16I),W===s.INT&&(te=s.R32I)),S===s.RG&&(W===s.FLOAT&&(te=s.RG32F),W===s.HALF_FLOAT&&(te=s.RG16F),W===s.UNSIGNED_BYTE&&(te=s.RG8)),S===s.RG_INTEGER&&(W===s.UNSIGNED_BYTE&&(te=s.RG8UI),W===s.UNSIGNED_SHORT&&(te=s.RG16UI),W===s.UNSIGNED_INT&&(te=s.RG32UI),W===s.BYTE&&(te=s.RG8I),W===s.SHORT&&(te=s.RG16I),W===s.INT&&(te=s.RG32I)),S===s.RGB_INTEGER&&(W===s.UNSIGNED_BYTE&&(te=s.RGB8UI),W===s.UNSIGNED_SHORT&&(te=s.RGB16UI),W===s.UNSIGNED_INT&&(te=s.RGB32UI),W===s.BYTE&&(te=s.RGB8I),W===s.SHORT&&(te=s.RGB16I),W===s.INT&&(te=s.RGB32I)),S===s.RGBA_INTEGER&&(W===s.UNSIGNED_BYTE&&(te=s.RGBA8UI),W===s.UNSIGNED_SHORT&&(te=s.RGBA16UI),W===s.UNSIGNED_INT&&(te=s.RGBA32UI),W===s.BYTE&&(te=s.RGBA8I),W===s.SHORT&&(te=s.RGBA16I),W===s.INT&&(te=s.RGBA32I)),S===s.RGB&&W===s.UNSIGNED_INT_5_9_9_9_REV&&(te=s.RGB9_E5),S===s.RGBA){const Pe=se?Hr:je.getTransfer(ee);W===s.FLOAT&&(te=s.RGBA32F),W===s.HALF_FLOAT&&(te=s.RGBA16F),W===s.UNSIGNED_BYTE&&(te=Pe===lt?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)}return(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function y(A,S){let W;return A?S===null||S===Pi||S===is?W=s.DEPTH24_STENCIL8:S===gn?W=s.DEPTH32F_STENCIL8:S===Fs&&(W=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Pi||S===is?W=s.DEPTH_COMPONENT24:S===gn?W=s.DEPTH_COMPONENT32F:S===Fs&&(W=s.DEPTH_COMPONENT16),W}function P(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==zt&&A.minFilter!==jt?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function E(A){const S=A.target;S.removeEventListener("dispose",E),C(S),S.isVideoTexture&&h.delete(S)}function R(A){const S=A.target;S.removeEventListener("dispose",R),M(S)}function C(A){const S=n.get(A);if(S.__webglInit===void 0)return;const W=A.source,ee=u.get(W);if(ee){const se=ee[S.__cacheKey];se.usedTimes--,se.usedTimes===0&&w(A),Object.keys(ee).length===0&&u.delete(W)}n.remove(A)}function w(A){const S=n.get(A);s.deleteTexture(S.__webglTexture);const W=A.source,ee=u.get(W);delete ee[S.__cacheKey],o.memory.textures--}function M(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(S.__webglFramebuffer[ee]))for(let se=0;se<S.__webglFramebuffer[ee].length;se++)s.deleteFramebuffer(S.__webglFramebuffer[ee][se]);else s.deleteFramebuffer(S.__webglFramebuffer[ee]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[ee])}else{if(Array.isArray(S.__webglFramebuffer))for(let ee=0;ee<S.__webglFramebuffer.length;ee++)s.deleteFramebuffer(S.__webglFramebuffer[ee]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let ee=0;ee<S.__webglColorRenderbuffer.length;ee++)S.__webglColorRenderbuffer[ee]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[ee]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const W=A.textures;for(let ee=0,se=W.length;ee<se;ee++){const te=n.get(W[ee]);te.__webglTexture&&(s.deleteTexture(te.__webglTexture),o.memory.textures--),n.remove(W[ee])}n.remove(A)}let N=0;function H(){N=0}function z(){const A=N;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),N+=1,A}function X(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function Z(A,S){const W=n.get(A);if(A.isVideoTexture&&Ne(A),A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){const ee=A.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(W,A,S);return}}t.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+S)}function L(A,S){const W=n.get(A);if(A.version>0&&W.__version!==A.version){q(W,A,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+S)}function I(A,S){const W=n.get(A);if(A.version>0&&W.__version!==A.version){q(W,A,S);return}t.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+S)}function U(A,S){const W=n.get(A);if(A.version>0&&W.__version!==A.version){ae(W,A,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+S)}const V={[ns]:s.REPEAT,[ai]:s.CLAMP_TO_EDGE,[Nr]:s.MIRRORED_REPEAT},j={[zt]:s.NEAREST,[Wl]:s.NEAREST_MIPMAP_NEAREST,[Rs]:s.NEAREST_MIPMAP_LINEAR,[jt]:s.LINEAR,[wr]:s.LINEAR_MIPMAP_NEAREST,[Hn]:s.LINEAR_MIPMAP_LINEAR},Q={[xd]:s.NEVER,[Td]:s.ALWAYS,[vd]:s.LESS,[th]:s.LEQUAL,[yd]:s.EQUAL,[Sd]:s.GEQUAL,[Md]:s.GREATER,[wd]:s.NOTEQUAL};function oe(A,S){if(S.type===gn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===jt||S.magFilter===wr||S.magFilter===Rs||S.magFilter===Hn||S.minFilter===jt||S.minFilter===wr||S.minFilter===Rs||S.minFilter===Hn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,V[S.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,V[S.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,V[S.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,j[S.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,j[S.minFilter]),S.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,Q[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===zt||S.minFilter!==Rs&&S.minFilter!==Hn||S.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");s.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Te(A,S){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",E));const ee=S.source;let se=u.get(ee);se===void 0&&(se={},u.set(ee,se));const te=X(S);if(te!==A.__cacheKey){se[te]===void 0&&(se[te]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,W=!0),se[te].usedTimes++;const Pe=se[A.__cacheKey];Pe!==void 0&&(se[A.__cacheKey].usedTimes--,Pe.usedTimes===0&&w(S)),A.__cacheKey=te,A.__webglTexture=se[te].texture}return W}function q(A,S,W){let ee=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ee=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ee=s.TEXTURE_3D);const se=Te(A,S),te=S.source;t.bindTexture(ee,A.__webglTexture,s.TEXTURE0+W);const Pe=n.get(te);if(te.version!==Pe.__version||se===!0){t.activeTexture(s.TEXTURE0+W);const ge=je.getPrimaries(je.workingColorSpace),Me=S.colorSpace===oi?null:je.getPrimaries(S.colorSpace),$e=S.colorSpace===oi||ge===Me?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let ce=_(S.image,!1,i.maxTextureSize);ce=re(S,ce);const we=r.convert(S.format,S.colorSpace),De=r.convert(S.type);let ze=v(S.internalFormat,we,De,S.colorSpace,S.isVideoTexture);oe(ee,S);let Se;const Ze=S.mipmaps,qe=S.isVideoTexture!==!0,ht=Pe.__version===void 0||se===!0,F=te.dataReady,me=P(S,ce);if(S.isDepthTexture)ze=y(S.format===ss,S.type),ht&&(qe?t.texStorage2D(s.TEXTURE_2D,1,ze,ce.width,ce.height):t.texImage2D(s.TEXTURE_2D,0,ze,ce.width,ce.height,0,we,De,null));else if(S.isDataTexture)if(Ze.length>0){qe&&ht&&t.texStorage2D(s.TEXTURE_2D,me,ze,Ze[0].width,Ze[0].height);for(let J=0,ne=Ze.length;J<ne;J++)Se=Ze[J],qe?F&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,Se.width,Se.height,we,De,Se.data):t.texImage2D(s.TEXTURE_2D,J,ze,Se.width,Se.height,0,we,De,Se.data);S.generateMipmaps=!1}else qe?(ht&&t.texStorage2D(s.TEXTURE_2D,me,ze,ce.width,ce.height),F&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ce.width,ce.height,we,De,ce.data)):t.texImage2D(s.TEXTURE_2D,0,ze,ce.width,ce.height,0,we,De,ce.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){qe&&ht&&t.texStorage3D(s.TEXTURE_2D_ARRAY,me,ze,Ze[0].width,Ze[0].height,ce.depth);for(let J=0,ne=Ze.length;J<ne;J++)if(Se=Ze[J],S.format!==cn)if(we!==null)if(qe){if(F)if(S.layerUpdates.size>0){const ve=ll(Se.width,Se.height,S.format,S.type);for(const _e of S.layerUpdates){const We=Se.data.subarray(_e*ve/Se.data.BYTES_PER_ELEMENT,(_e+1)*ve/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,_e,Se.width,Se.height,1,we,We)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,Se.width,Se.height,ce.depth,we,Se.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,J,ze,Se.width,Se.height,ce.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?F&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,J,0,0,0,Se.width,Se.height,ce.depth,we,De,Se.data):t.texImage3D(s.TEXTURE_2D_ARRAY,J,ze,Se.width,Se.height,ce.depth,0,we,De,Se.data)}else{qe&&ht&&t.texStorage2D(s.TEXTURE_2D,me,ze,Ze[0].width,Ze[0].height);for(let J=0,ne=Ze.length;J<ne;J++)Se=Ze[J],S.format!==cn?we!==null?qe?F&&t.compressedTexSubImage2D(s.TEXTURE_2D,J,0,0,Se.width,Se.height,we,Se.data):t.compressedTexImage2D(s.TEXTURE_2D,J,ze,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?F&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,Se.width,Se.height,we,De,Se.data):t.texImage2D(s.TEXTURE_2D,J,ze,Se.width,Se.height,0,we,De,Se.data)}else if(S.isDataArrayTexture)if(qe){if(ht&&t.texStorage3D(s.TEXTURE_2D_ARRAY,me,ze,ce.width,ce.height,ce.depth),F)if(S.layerUpdates.size>0){const J=ll(ce.width,ce.height,S.format,S.type);for(const ne of S.layerUpdates){const ve=ce.data.subarray(ne*J/ce.data.BYTES_PER_ELEMENT,(ne+1)*J/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ne,ce.width,ce.height,1,we,De,ve)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,we,De,ce.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ze,ce.width,ce.height,ce.depth,0,we,De,ce.data);else if(S.isData3DTexture)qe?(ht&&t.texStorage3D(s.TEXTURE_3D,me,ze,ce.width,ce.height,ce.depth),F&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,we,De,ce.data)):t.texImage3D(s.TEXTURE_3D,0,ze,ce.width,ce.height,ce.depth,0,we,De,ce.data);else if(S.isFramebufferTexture){if(ht)if(qe)t.texStorage2D(s.TEXTURE_2D,me,ze,ce.width,ce.height);else{let J=ce.width,ne=ce.height;for(let ve=0;ve<me;ve++)t.texImage2D(s.TEXTURE_2D,ve,ze,J,ne,0,we,De,null),J>>=1,ne>>=1}}else if(Ze.length>0){if(qe&&ht){const J=$(Ze[0]);t.texStorage2D(s.TEXTURE_2D,me,ze,J.width,J.height)}for(let J=0,ne=Ze.length;J<ne;J++)Se=Ze[J],qe?F&&t.texSubImage2D(s.TEXTURE_2D,J,0,0,we,De,Se):t.texImage2D(s.TEXTURE_2D,J,ze,we,De,Se);S.generateMipmaps=!1}else if(qe){if(ht){const J=$(ce);t.texStorage2D(s.TEXTURE_2D,me,ze,J.width,J.height)}F&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,we,De,ce)}else t.texImage2D(s.TEXTURE_2D,0,ze,we,De,ce);m(S)&&p(ee),Pe.__version=te.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function ae(A,S,W){if(S.image.length!==6)return;const ee=Te(A,S),se=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+W);const te=n.get(se);if(se.version!==te.__version||ee===!0){t.activeTexture(s.TEXTURE0+W);const Pe=je.getPrimaries(je.workingColorSpace),ge=S.colorSpace===oi?null:je.getPrimaries(S.colorSpace),Me=S.colorSpace===oi||Pe===ge?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const $e=S.isCompressedTexture||S.image[0].isCompressedTexture,ce=S.image[0]&&S.image[0].isDataTexture,we=[];for(let ne=0;ne<6;ne++)!$e&&!ce?we[ne]=_(S.image[ne],!0,i.maxCubemapSize):we[ne]=ce?S.image[ne].image:S.image[ne],we[ne]=re(S,we[ne]);const De=we[0],ze=r.convert(S.format,S.colorSpace),Se=r.convert(S.type),Ze=v(S.internalFormat,ze,Se,S.colorSpace),qe=S.isVideoTexture!==!0,ht=te.__version===void 0||ee===!0,F=se.dataReady;let me=P(S,De);oe(s.TEXTURE_CUBE_MAP,S);let J;if($e){qe&&ht&&t.texStorage2D(s.TEXTURE_CUBE_MAP,me,Ze,De.width,De.height);for(let ne=0;ne<6;ne++){J=we[ne].mipmaps;for(let ve=0;ve<J.length;ve++){const _e=J[ve];S.format!==cn?ze!==null?qe?F&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve,0,0,_e.width,_e.height,ze,_e.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve,Ze,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qe?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve,0,0,_e.width,_e.height,ze,Se,_e.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve,Ze,_e.width,_e.height,0,ze,Se,_e.data)}}}else{if(J=S.mipmaps,qe&&ht){J.length>0&&me++;const ne=$(we[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,me,Ze,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(ce){qe?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,we[ne].width,we[ne].height,ze,Se,we[ne].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ze,we[ne].width,we[ne].height,0,ze,Se,we[ne].data);for(let ve=0;ve<J.length;ve++){const We=J[ve].image[ne].image;qe?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve+1,0,0,We.width,We.height,ze,Se,We.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve+1,Ze,We.width,We.height,0,ze,Se,We.data)}}else{qe?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ze,Se,we[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ze,ze,Se,we[ne]);for(let ve=0;ve<J.length;ve++){const _e=J[ve];qe?F&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve+1,0,0,ze,Se,_e.image[ne]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve+1,Ze,ze,Se,_e.image[ne])}}}m(S)&&p(s.TEXTURE_CUBE_MAP),te.__version=se.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function pe(A,S,W,ee,se,te){const Pe=r.convert(W.format,W.colorSpace),ge=r.convert(W.type),Me=v(W.internalFormat,Pe,ge,W.colorSpace),$e=n.get(S),ce=n.get(W);if(ce.__renderTarget=S,!$e.__hasExternalTextures){const we=Math.max(1,S.width>>te),De=Math.max(1,S.height>>te);se===s.TEXTURE_3D||se===s.TEXTURE_2D_ARRAY?t.texImage3D(se,te,Me,we,De,S.depth,0,Pe,ge,null):t.texImage2D(se,te,Me,we,De,0,Pe,ge,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),Be(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ee,se,ce.__webglTexture,0,Oe(S)):(se===s.TEXTURE_2D||se>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ee,se,ce.__webglTexture,te),t.bindFramebuffer(s.FRAMEBUFFER,null)}function de(A,S,W){if(s.bindRenderbuffer(s.RENDERBUFFER,A),S.depthBuffer){const ee=S.depthTexture,se=ee&&ee.isDepthTexture?ee.type:null,te=y(S.stencilBuffer,se),Pe=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=Oe(S);Be(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ge,te,S.width,S.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,ge,te,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,te,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Pe,s.RENDERBUFFER,A)}else{const ee=S.textures;for(let se=0;se<ee.length;se++){const te=ee[se],Pe=r.convert(te.format,te.colorSpace),ge=r.convert(te.type),Me=v(te.internalFormat,Pe,ge,te.colorSpace),$e=Oe(S);W&&Be(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,$e,Me,S.width,S.height):Be(S)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,$e,Me,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Me,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function be(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(S.depthTexture);ee.__renderTarget=S,(!ee.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Z(S.depthTexture,0);const se=ee.__webglTexture,te=Oe(S);if(S.depthTexture.format===Zi)Be(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,te):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(S.depthTexture.format===ss)Be(S)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,te):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Ie(A){const S=n.get(A),W=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const ee=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),ee){const se=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,ee.removeEventListener("dispose",se)};ee.addEventListener("dispose",se),S.__depthDisposeCallback=se}S.__boundDepthTexture=ee}if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");be(S.__webglFramebuffer,A)}else if(W){S.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[ee]),S.__webglDepthbuffer[ee]===void 0)S.__webglDepthbuffer[ee]=s.createRenderbuffer(),de(S.__webglDepthbuffer[ee],A,!1);else{const se=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,te=S.__webglDepthbuffer[ee];s.bindRenderbuffer(s.RENDERBUFFER,te),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,te)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),de(S.__webglDepthbuffer,A,!1);else{const ee=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,se=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,se),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,se)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ge(A,S,W){const ee=n.get(A);S!==void 0&&pe(ee.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&Ie(A)}function Je(A){const S=A.texture,W=n.get(A),ee=n.get(S);A.addEventListener("dispose",R);const se=A.textures,te=A.isWebGLCubeRenderTarget===!0,Pe=se.length>1;if(Pe||(ee.__webglTexture===void 0&&(ee.__webglTexture=s.createTexture()),ee.__version=S.version,o.memory.textures++),te){W.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[ge]=[];for(let Me=0;Me<S.mipmaps.length;Me++)W.__webglFramebuffer[ge][Me]=s.createFramebuffer()}else W.__webglFramebuffer[ge]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let ge=0;ge<S.mipmaps.length;ge++)W.__webglFramebuffer[ge]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(Pe)for(let ge=0,Me=se.length;ge<Me;ge++){const $e=n.get(se[ge]);$e.__webglTexture===void 0&&($e.__webglTexture=s.createTexture(),o.memory.textures++)}if(A.samples>0&&Be(A)===!1){W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ge=0;ge<se.length;ge++){const Me=se[ge];W.__webglColorRenderbuffer[ge]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[ge]);const $e=r.convert(Me.format,Me.colorSpace),ce=r.convert(Me.type),we=v(Me.internalFormat,$e,ce,Me.colorSpace,A.isXRRenderTarget===!0),De=Oe(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,De,we,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,W.__webglColorRenderbuffer[ge])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),de(W.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(te){t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture),oe(s.TEXTURE_CUBE_MAP,S);for(let ge=0;ge<6;ge++)if(S.mipmaps&&S.mipmaps.length>0)for(let Me=0;Me<S.mipmaps.length;Me++)pe(W.__webglFramebuffer[ge][Me],A,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Me);else pe(W.__webglFramebuffer[ge],A,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(S)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let ge=0,Me=se.length;ge<Me;ge++){const $e=se[ge],ce=n.get($e);t.bindTexture(s.TEXTURE_2D,ce.__webglTexture),oe(s.TEXTURE_2D,$e),pe(W.__webglFramebuffer,A,$e,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,0),m($e)&&p(s.TEXTURE_2D)}t.unbindTexture()}else{let ge=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ge=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ge,ee.__webglTexture),oe(ge,S),S.mipmaps&&S.mipmaps.length>0)for(let Me=0;Me<S.mipmaps.length;Me++)pe(W.__webglFramebuffer[Me],A,S,s.COLOR_ATTACHMENT0,ge,Me);else pe(W.__webglFramebuffer,A,S,s.COLOR_ATTACHMENT0,ge,0);m(S)&&p(ge),t.unbindTexture()}A.depthBuffer&&Ie(A)}function Le(A){const S=A.textures;for(let W=0,ee=S.length;W<ee;W++){const se=S[W];if(m(se)){const te=x(A),Pe=n.get(se).__webglTexture;t.bindTexture(te,Pe),p(te),t.unbindTexture()}}}const ct=[],O=[];function tt(A){if(A.samples>0){if(Be(A)===!1){const S=A.textures,W=A.width,ee=A.height;let se=s.COLOR_BUFFER_BIT;const te=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Pe=n.get(A),ge=S.length>1;if(ge)for(let Me=0;Me<S.length;Me++)t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Me=0;Me<S.length;Me++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(se|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(se|=s.STENCIL_BUFFER_BIT)),ge){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Pe.__webglColorRenderbuffer[Me]);const $e=n.get(S[Me]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,$e,0)}s.blitFramebuffer(0,0,W,ee,0,0,W,ee,se,s.NEAREST),c===!0&&(ct.length=0,O.length=0,ct.push(s.COLOR_ATTACHMENT0+Me),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ct.push(te),O.push(te),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,O)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ge)for(let Me=0;Me<S.length;Me++){t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.RENDERBUFFER,Pe.__webglColorRenderbuffer[Me]);const $e=n.get(S[Me]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Pe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Me,s.TEXTURE_2D,$e,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const S=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function Oe(A){return Math.min(i.maxSamples,A.samples)}function Be(A){const S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ne(A){const S=o.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function re(A,S){const W=A.colorSpace,ee=A.format,se=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==Bt&&W!==oi&&(je.getTransfer(W)===lt?(ee!==cn||se!==Xn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}function $(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=H,this.setTexture2D=Z,this.setTexture2DArray=L,this.setTexture3D=I,this.setTextureCube=U,this.rebindTextures=Ge,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=Be}function Vg(s,e){function t(n,i=oi){let r;const o=je.getTransfer(i);if(n===Xn)return s.UNSIGNED_BYTE;if(n===La)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Da)return s.UNSIGNED_SHORT_5_5_5_1;if(n===ql)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Vl)return s.BYTE;if(n===Xl)return s.SHORT;if(n===Fs)return s.UNSIGNED_SHORT;if(n===Ia)return s.INT;if(n===Pi)return s.UNSIGNED_INT;if(n===gn)return s.FLOAT;if(n===Gs)return s.HALF_FLOAT;if(n===Yl)return s.ALPHA;if(n===Kl)return s.RGB;if(n===cn)return s.RGBA;if(n===jl)return s.LUMINANCE;if(n===Zl)return s.LUMINANCE_ALPHA;if(n===Zi)return s.DEPTH_COMPONENT;if(n===ss)return s.DEPTH_STENCIL;if(n===Ua)return s.RED;if(n===Oa)return s.RED_INTEGER;if(n===Jl)return s.RG;if(n===za)return s.RG_INTEGER;if(n===Fa)return s.RGBA_INTEGER;if(n===Sr||n===Tr||n===br||n===Er)if(o===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xo||n===qo||n===Yo||n===Ko)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Xo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===jo||n===Zo||n===Jo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===jo||n===Zo)return o===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Jo)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===$o||n===Qo||n===ea||n===ta||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===ca||n===la||n===ha||n===da)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===$o)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qo)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ea)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ta)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===na)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ia)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sa)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ra)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===oa)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===aa)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ca)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===la)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ha)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===da)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ar||n===ua||n===fa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ar)return o===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ua)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$l||n===pa||n===ma||n===ga)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ar)return r.COMPRESSED_RED_RGTC1_EXT;if(n===pa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ma)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ga)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===is?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class Xg extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ue extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qg={type:"move"};class yo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(qg)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ue;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Yg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Kg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Tt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new di({vertexShader:Yg,fragmentShader:Kg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new T(new Vs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zg extends us{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const _=new jg,m=t.getContextAttributes();let p=null,x=null;const v=[],y=[],P=new ye;let E=null;const R=new Ut;R.viewport=new et;const C=new Ut;C.viewport=new et;const w=[R,C],M=new Xg;let N=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ae=v[q];return ae===void 0&&(ae=new yo,v[q]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(q){let ae=v[q];return ae===void 0&&(ae=new yo,v[q]=ae),ae.getGripSpace()},this.getHand=function(q){let ae=v[q];return ae===void 0&&(ae=new yo,v[q]=ae),ae.getHandSpace()};function z(q){const ae=y.indexOf(q.inputSource);if(ae===-1)return;const pe=v[ae];pe!==void 0&&(pe.update(q.inputSource,q.frame,l||o),pe.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",Z);for(let q=0;q<v.length;q++){const ae=y[q];ae!==null&&(y[q]=null,v[q].disconnect(ae))}N=null,H=null,_.reset(),e.setRenderTarget(p),f=null,u=null,d=null,i=null,x=null,Te.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",X),i.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(P),i.renderState.layers===void 0){const ae={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ae),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Ci(f.framebufferWidth,f.framebufferHeight,{format:cn,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ae=null,pe=null,de=null;m.depth&&(de=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=m.stencil?ss:Zi,pe=m.stencil?is:Pi);const be={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:r};d=new XRWebGLBinding(i,t),u=d.createProjectionLayer(be),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new Ci(u.textureWidth,u.textureHeight,{format:cn,type:Xn,depthTexture:new fh(u.textureWidth,u.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Te.setContext(i),Te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(q){for(let ae=0;ae<q.removed.length;ae++){const pe=q.removed[ae],de=y.indexOf(pe);de>=0&&(y[de]=null,v[de].disconnect(pe))}for(let ae=0;ae<q.added.length;ae++){const pe=q.added[ae];let de=y.indexOf(pe);if(de===-1){for(let Ie=0;Ie<v.length;Ie++)if(Ie>=y.length){y.push(pe),de=Ie;break}else if(y[Ie]===null){y[Ie]=pe,de=Ie;break}if(de===-1)break}const be=v[de];be&&be.connect(pe)}}const L=new D,I=new D;function U(q,ae,pe){L.setFromMatrixPosition(ae.matrixWorld),I.setFromMatrixPosition(pe.matrixWorld);const de=L.distanceTo(I),be=ae.projectionMatrix.elements,Ie=pe.projectionMatrix.elements,Ge=be[14]/(be[10]-1),Je=be[14]/(be[10]+1),Le=(be[9]+1)/be[5],ct=(be[9]-1)/be[5],O=(be[8]-1)/be[0],tt=(Ie[8]+1)/Ie[0],Oe=Ge*O,Be=Ge*tt,Ne=de/(-O+tt),re=Ne*-O;if(ae.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(re),q.translateZ(Ne),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),be[10]===-1)q.projectionMatrix.copy(ae.projectionMatrix),q.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const $=Ge+Ne,A=Je+Ne,S=Oe-re,W=Be+(de-re),ee=Le*Je/A*$,se=ct*Je/A*$;q.projectionMatrix.makePerspective(S,W,ee,se,$,A),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function V(q,ae){ae===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ae.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let ae=q.near,pe=q.far;_.texture!==null&&(_.depthNear>0&&(ae=_.depthNear),_.depthFar>0&&(pe=_.depthFar)),M.near=C.near=R.near=ae,M.far=C.far=R.far=pe,(N!==M.near||H!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),N=M.near,H=M.far),R.layers.mask=q.layers.mask|2,C.layers.mask=q.layers.mask|4,M.layers.mask=R.layers.mask|C.layers.mask;const de=q.parent,be=M.cameras;V(M,de);for(let Ie=0;Ie<be.length;Ie++)V(be[Ie],de);be.length===2?U(M,R,C):M.projectionMatrix.copy(R.projectionMatrix),j(q,M,de)};function j(q,ae,pe){pe===null?q.matrix.copy(ae.matrixWorld):(q.matrix.copy(pe.matrixWorld),q.matrix.invert(),q.matrix.multiply(ae.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ae.projectionMatrix),q.projectionMatrixInverse.copy(ae.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=rs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(q){c=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Q=null;function oe(q,ae){if(h=ae.getViewerPose(l||o),g=ae,h!==null){const pe=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let de=!1;pe.length!==M.cameras.length&&(M.cameras.length=0,de=!0);for(let Ie=0;Ie<pe.length;Ie++){const Ge=pe[Ie];let Je=null;if(f!==null)Je=f.getViewport(Ge);else{const ct=d.getViewSubImage(u,Ge);Je=ct.viewport,Ie===0&&(e.setRenderTargetTextures(x,ct.colorTexture,u.ignoreDepthValues?void 0:ct.depthStencilTexture),e.setRenderTarget(x))}let Le=w[Ie];Le===void 0&&(Le=new Ut,Le.layers.enable(Ie),Le.viewport=new et,w[Ie]=Le),Le.matrix.fromArray(Ge.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(Ge.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(Je.x,Je.y,Je.width,Je.height),Ie===0&&(M.matrix.copy(Le.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),de===!0&&M.cameras.push(Le)}const be=i.enabledFeatures;if(be&&be.includes("depth-sensing")){const Ie=d.getDepthInformation(pe[0]);Ie&&Ie.isValid&&Ie.texture&&_.init(e,Ie,i.renderState)}}for(let pe=0;pe<v.length;pe++){const de=y[pe],be=v[pe];de!==null&&be!==void 0&&be.update(de,ae,l||o)}Q&&Q(q,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),g=null}const Te=new uh;Te.setAnimationLoop(oe),this.setAnimationLoop=function(q){Q=q},this.dispose=function(){}}}const vi=new Tn,Jg=new He;function $g(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,lh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,v,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,x,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Wt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Wt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),v=x.envMap,y=x.envMapRotation;v&&(m.envMap.value=v,vi.copy(y),vi.x*=-1,vi.y*=-1,vi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),m.envMapRotation.value.setFromMatrix4(Jg.makeRotationFromEuler(vi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Wt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Qg(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,v){const y=v.program;n.uniformBlockBinding(x,y)}function l(x,v){let y=i[x.id];y===void 0&&(g(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",m));const P=v.program;n.updateUBOMapping(x,P);const E=e.render.frame;r[x.id]!==E&&(u(x),r[x.id]=E)}function h(x){const v=d();x.__bindingPointIndex=v;const y=s.createBuffer(),P=x.__size,E=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,P,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,y),y}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const v=i[x.id],y=x.uniforms,P=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let E=0,R=y.length;E<R;E++){const C=Array.isArray(y[E])?y[E]:[y[E]];for(let w=0,M=C.length;w<M;w++){const N=C[w];if(f(N,E,w,P)===!0){const H=N.__offset,z=Array.isArray(N.value)?N.value:[N.value];let X=0;for(let Z=0;Z<z.length;Z++){const L=z[Z],I=_(L);typeof L=="number"||typeof L=="boolean"?(N.__data[0]=L,s.bufferSubData(s.UNIFORM_BUFFER,H+X,N.__data)):L.isMatrix3?(N.__data[0]=L.elements[0],N.__data[1]=L.elements[1],N.__data[2]=L.elements[2],N.__data[3]=0,N.__data[4]=L.elements[3],N.__data[5]=L.elements[4],N.__data[6]=L.elements[5],N.__data[7]=0,N.__data[8]=L.elements[6],N.__data[9]=L.elements[7],N.__data[10]=L.elements[8],N.__data[11]=0):(L.toArray(N.__data,X),X+=I.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,H,N.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,v,y,P){const E=x.value,R=v+"_"+y;if(P[R]===void 0)return typeof E=="number"||typeof E=="boolean"?P[R]=E:P[R]=E.clone(),!0;{const C=P[R];if(typeof E=="number"||typeof E=="boolean"){if(C!==E)return P[R]=E,!0}else if(C.equals(E)===!1)return C.copy(E),!0}return!1}function g(x){const v=x.uniforms;let y=0;const P=16;for(let R=0,C=v.length;R<C;R++){const w=Array.isArray(v[R])?v[R]:[v[R]];for(let M=0,N=w.length;M<N;M++){const H=w[M],z=Array.isArray(H.value)?H.value:[H.value];for(let X=0,Z=z.length;X<Z;X++){const L=z[X],I=_(L),U=y%P,V=U%I.boundary,j=U+V;y+=V,j!==0&&P-j<I.storage&&(y+=P-j),H.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=y,y+=I.storage}}}const E=y%P;return E>0&&(y+=P-E),x.__size=y,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}class e0{constructor(e={}){const{canvas:t=Hd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const x=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rt,this.toneMapping=hi,this.toneMappingExposure=1;const y=this;let P=!1,E=0,R=0,C=null,w=-1,M=null;const N=new et,H=new et;let z=null;const X=new Fe(0);let Z=0,L=t.width,I=t.height,U=1,V=null,j=null;const Q=new et(0,0,L,I),oe=new et(0,0,L,I);let Te=!1;const q=new Ha;let ae=!1,pe=!1;const de=new He,be=new He,Ie=new D,Ge=new et,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Le=!1;function ct(){return C===null?U:1}let O=n;function tt(b,k){return t.getContext(b,k)}try{const b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Na}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",_e,!1),O===null){const k="webgl2";if(O=tt(k,b),O===null)throw tt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Oe,Be,Ne,re,$,A,S,W,ee,se,te,Pe,ge,Me,$e,ce,we,De,ze,Se,Ze,qe,ht,F;function me(){Oe=new rm(O),Oe.init(),qe=new Vg(O,Oe),Be=new Qp(O,Oe,e,qe),Ne=new Hg(O,Oe),Be.reverseDepthBuffer&&u&&Ne.buffers.depth.setReversed(!0),re=new cm(O),$=new Eg,A=new Wg(O,Oe,Ne,$,Be,qe,re),S=new tm(y),W=new sm(y),ee=new pu(O),ht=new Jp(O,ee),se=new om(O,ee,re,ht),te=new hm(O,se,ee,re),ze=new lm(O,Be,A),ce=new em($),Pe=new bg(y,S,W,Oe,Be,ht,ce),ge=new $g(y,$),Me=new Rg,$e=new Dg(Oe),De=new Zp(y,S,W,Ne,te,f,c),we=new kg(y,te,Be),F=new Qg(O,re,Be,Ne),Se=new $p(O,Oe,re),Ze=new am(O,Oe,re),re.programs=Pe.programs,y.capabilities=Be,y.extensions=Oe,y.properties=$,y.renderLists=Me,y.shadowMap=we,y.state=Ne,y.info=re}me();const J=new Zg(y,O);this.xr=J,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=Oe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Oe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(b){b!==void 0&&(U=b,this.setSize(L,I,!1))},this.getSize=function(b){return b.set(L,I)},this.setSize=function(b,k,Y=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=b,I=k,t.width=Math.floor(b*U),t.height=Math.floor(k*U),Y===!0&&(t.style.width=b+"px",t.style.height=k+"px"),this.setViewport(0,0,b,k)},this.getDrawingBufferSize=function(b){return b.set(L*U,I*U).floor()},this.setDrawingBufferSize=function(b,k,Y){L=b,I=k,U=Y,t.width=Math.floor(b*Y),t.height=Math.floor(k*Y),this.setViewport(0,0,b,k)},this.getCurrentViewport=function(b){return b.copy(N)},this.getViewport=function(b){return b.copy(Q)},this.setViewport=function(b,k,Y,K){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,k,Y,K),Ne.viewport(N.copy(Q).multiplyScalar(U).round())},this.getScissor=function(b){return b.copy(oe)},this.setScissor=function(b,k,Y,K){b.isVector4?oe.set(b.x,b.y,b.z,b.w):oe.set(b,k,Y,K),Ne.scissor(H.copy(oe).multiplyScalar(U).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(b){Ne.setScissorTest(Te=b)},this.setOpaqueSort=function(b){V=b},this.setTransparentSort=function(b){j=b},this.getClearColor=function(b){return b.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(b=!0,k=!0,Y=!0){let K=0;if(b){let B=!1;if(C!==null){const he=C.texture.format;B=he===Fa||he===za||he===Oa}if(B){const he=C.texture.type,xe=he===Xn||he===Pi||he===Fs||he===is||he===La||he===Da,Ee=De.getClearColor(),Ae=De.getClearAlpha(),ke=Ee.r,Ve=Ee.g,Re=Ee.b;xe?(g[0]=ke,g[1]=Ve,g[2]=Re,g[3]=Ae,O.clearBufferuiv(O.COLOR,0,g)):(_[0]=ke,_[1]=Ve,_[2]=Re,_[3]=Ae,O.clearBufferiv(O.COLOR,0,_))}else K|=O.COLOR_BUFFER_BIT}k&&(K|=O.DEPTH_BUFFER_BIT),Y&&(K|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),Me.dispose(),$e.dispose(),$.dispose(),S.dispose(),W.dispose(),te.dispose(),ht.dispose(),F.dispose(),Pe.dispose(),J.dispose(),J.removeEventListener("sessionstart",ec),J.removeEventListener("sessionend",tc),fi.stop()};function ne(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const b=re.autoReset,k=we.enabled,Y=we.autoUpdate,K=we.needsUpdate,B=we.type;me(),re.autoReset=b,we.enabled=k,we.autoUpdate=Y,we.needsUpdate=K,we.type=B}function _e(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function We(b){const k=b.target;k.removeEventListener("dispose",We),xt(k)}function xt(b){Ct(b),$.remove(b)}function Ct(b){const k=$.get(b).programs;k!==void 0&&(k.forEach(function(Y){Pe.releaseProgram(Y)}),b.isShaderMaterial&&Pe.releaseShaderCache(b))}this.renderBufferDirect=function(b,k,Y,K,B,he){k===null&&(k=Je);const xe=B.isMesh&&B.matrixWorld.determinant()<0,Ee=Dh(b,k,Y,K,B);Ne.setMaterial(K,xe);let Ae=Y.index,ke=1;if(K.wireframe===!0){if(Ae=se.getWireframeAttribute(Y),Ae===void 0)return;ke=2}const Ve=Y.drawRange,Re=Y.attributes.position;let Qe=Ve.start*ke,dt=(Ve.start+Ve.count)*ke;he!==null&&(Qe=Math.max(Qe,he.start*ke),dt=Math.min(dt,(he.start+he.count)*ke)),Ae!==null?(Qe=Math.max(Qe,0),dt=Math.min(dt,Ae.count)):Re!=null&&(Qe=Math.max(Qe,0),dt=Math.min(dt,Re.count));const ut=dt-Qe;if(ut<0||ut===1/0)return;ht.setup(B,K,Ee,Y,Ae);let Gt,nt=Se;if(Ae!==null&&(Gt=ee.get(Ae),nt=Ze,nt.setIndex(Gt)),B.isMesh)K.wireframe===!0?(Ne.setLineWidth(K.wireframeLinewidth*ct()),nt.setMode(O.LINES)):nt.setMode(O.TRIANGLES);else if(B.isLine){let Ce=K.linewidth;Ce===void 0&&(Ce=1),Ne.setLineWidth(Ce*ct()),B.isLineSegments?nt.setMode(O.LINES):B.isLineLoop?nt.setMode(O.LINE_LOOP):nt.setMode(O.LINE_STRIP)}else B.isPoints?nt.setMode(O.POINTS):B.isSprite&&nt.setMode(O.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)nt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Oe.get("WEBGL_multi_draw"))nt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ce=B._multiDrawStarts,Cn=B._multiDrawCounts,it=B._multiDrawCount,hn=Ae?ee.get(Ae).bytesPerElement:1,Ni=$.get(K).currentProgram.getUniforms();for(let Vt=0;Vt<it;Vt++)Ni.setValue(O,"_gl_DrawID",Vt),nt.render(Ce[Vt]/hn,Cn[Vt])}else if(B.isInstancedMesh)nt.renderInstances(Qe,ut,B.count);else if(Y.isInstancedBufferGeometry){const Ce=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Cn=Math.min(Y.instanceCount,Ce);nt.renderInstances(Qe,ut,Cn)}else nt.render(Qe,ut)};function rt(b,k,Y){b.transparent===!0&&b.side===Ot&&b.forceSinglePass===!1?(b.side=Wt,b.needsUpdate=!0,Ys(b,k,Y),b.side=Vn,b.needsUpdate=!0,Ys(b,k,Y),b.side=Ot):Ys(b,k,Y)}this.compile=function(b,k,Y=null){Y===null&&(Y=b),p=$e.get(Y),p.init(k),v.push(p),Y.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),b!==Y&&b.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const K=new Set;return b.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const he=B.material;if(he)if(Array.isArray(he))for(let xe=0;xe<he.length;xe++){const Ee=he[xe];rt(Ee,Y,B),K.add(Ee)}else rt(he,Y,B),K.add(he)}),v.pop(),p=null,K},this.compileAsync=function(b,k,Y=null){const K=this.compile(b,k,Y);return new Promise(B=>{function he(){if(K.forEach(function(xe){$.get(xe).currentProgram.isReady()&&K.delete(xe)}),K.size===0){B(b);return}setTimeout(he,10)}Oe.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let ln=null;function Pn(b){ln&&ln(b)}function ec(){fi.stop()}function tc(){fi.start()}const fi=new uh;fi.setAnimationLoop(Pn),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(b){ln=b,J.setAnimationLoop(b),b===null?fi.stop():fi.start()},J.addEventListener("sessionstart",ec),J.addEventListener("sessionend",tc),this.render=function(b,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(k),k=J.getCamera()),b.isScene===!0&&b.onBeforeRender(y,b,k,C),p=$e.get(b,v.length),p.init(k),v.push(p),be.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),q.setFromProjectionMatrix(be),pe=this.localClippingEnabled,ae=ce.init(this.clippingPlanes,pe),m=Me.get(b,x.length),m.init(),x.push(m),J.enabled===!0&&J.isPresenting===!0){const he=y.xr.getDepthSensingMesh();he!==null&&Xr(he,k,-1/0,y.sortObjects)}Xr(b,k,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(V,j),Le=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Le&&De.addToRenderList(m,b),this.info.render.frame++,ae===!0&&ce.beginShadows();const Y=p.state.shadowsArray;we.render(Y,b,k),ae===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=m.opaque,B=m.transmissive;if(p.setupLights(),k.isArrayCamera){const he=k.cameras;if(B.length>0)for(let xe=0,Ee=he.length;xe<Ee;xe++){const Ae=he[xe];ic(K,B,b,Ae)}Le&&De.render(b);for(let xe=0,Ee=he.length;xe<Ee;xe++){const Ae=he[xe];nc(m,b,Ae,Ae.viewport)}}else B.length>0&&ic(K,B,b,k),Le&&De.render(b),nc(m,b,k);C!==null&&(A.updateMultisampleRenderTarget(C),A.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(y,b,k),ht.resetDefaultState(),w=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],ae===!0&&ce.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Xr(b,k,Y,K){if(b.visible===!1)return;if(b.layers.test(k.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(k);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||q.intersectsSprite(b)){K&&Ge.setFromMatrixPosition(b.matrixWorld).applyMatrix4(be);const xe=te.update(b),Ee=b.material;Ee.visible&&m.push(b,xe,Ee,Y,Ge.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||q.intersectsObject(b))){const xe=te.update(b),Ee=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ge.copy(b.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Ge.copy(xe.boundingSphere.center)),Ge.applyMatrix4(b.matrixWorld).applyMatrix4(be)),Array.isArray(Ee)){const Ae=xe.groups;for(let ke=0,Ve=Ae.length;ke<Ve;ke++){const Re=Ae[ke],Qe=Ee[Re.materialIndex];Qe&&Qe.visible&&m.push(b,xe,Qe,Y,Ge.z,Re)}}else Ee.visible&&m.push(b,xe,Ee,Y,Ge.z,null)}}const he=b.children;for(let xe=0,Ee=he.length;xe<Ee;xe++)Xr(he[xe],k,Y,K)}function nc(b,k,Y,K){const B=b.opaque,he=b.transmissive,xe=b.transparent;p.setupLightsView(Y),ae===!0&&ce.setGlobalState(y.clippingPlanes,Y),K&&Ne.viewport(N.copy(K)),B.length>0&&qs(B,k,Y),he.length>0&&qs(he,k,Y),xe.length>0&&qs(xe,k,Y),Ne.buffers.depth.setTest(!0),Ne.buffers.depth.setMask(!0),Ne.buffers.color.setMask(!0),Ne.setPolygonOffset(!1)}function ic(b,k,Y,K){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[K.id]===void 0&&(p.state.transmissionRenderTarget[K.id]=new Ci(1,1,{generateMipmaps:!0,type:Oe.has("EXT_color_buffer_half_float")||Oe.has("EXT_color_buffer_float")?Gs:Xn,minFilter:Hn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const he=p.state.transmissionRenderTarget[K.id],xe=K.viewport||N;he.setSize(xe.z,xe.w);const Ee=y.getRenderTarget();y.setRenderTarget(he),y.getClearColor(X),Z=y.getClearAlpha(),Z<1&&y.setClearColor(16777215,.5),y.clear(),Le&&De.render(Y);const Ae=y.toneMapping;y.toneMapping=hi;const ke=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),p.setupLightsView(K),ae===!0&&ce.setGlobalState(y.clippingPlanes,K),qs(b,Y,K),A.updateMultisampleRenderTarget(he),A.updateRenderTargetMipmap(he),Oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Re=0,Qe=k.length;Re<Qe;Re++){const dt=k[Re],ut=dt.object,Gt=dt.geometry,nt=dt.material,Ce=dt.group;if(nt.side===Ot&&ut.layers.test(K.layers)){const Cn=nt.side;nt.side=Wt,nt.needsUpdate=!0,sc(ut,Y,K,Gt,nt,Ce),nt.side=Cn,nt.needsUpdate=!0,Ve=!0}}Ve===!0&&(A.updateMultisampleRenderTarget(he),A.updateRenderTargetMipmap(he))}y.setRenderTarget(Ee),y.setClearColor(X,Z),ke!==void 0&&(K.viewport=ke),y.toneMapping=Ae}function qs(b,k,Y){const K=k.isScene===!0?k.overrideMaterial:null;for(let B=0,he=b.length;B<he;B++){const xe=b[B],Ee=xe.object,Ae=xe.geometry,ke=K===null?xe.material:K,Ve=xe.group;Ee.layers.test(Y.layers)&&sc(Ee,k,Y,Ae,ke,Ve)}}function sc(b,k,Y,K,B,he){b.onBeforeRender(y,k,Y,K,B,he),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(y,k,Y,K,b,he),B.transparent===!0&&B.side===Ot&&B.forceSinglePass===!1?(B.side=Wt,B.needsUpdate=!0,y.renderBufferDirect(Y,k,K,B,b,he),B.side=Vn,B.needsUpdate=!0,y.renderBufferDirect(Y,k,K,B,b,he),B.side=Ot):y.renderBufferDirect(Y,k,K,B,b,he),b.onAfterRender(y,k,Y,K,B,he)}function Ys(b,k,Y){k.isScene!==!0&&(k=Je);const K=$.get(b),B=p.state.lights,he=p.state.shadowsArray,xe=B.state.version,Ee=Pe.getParameters(b,B.state,he,k,Y),Ae=Pe.getProgramCacheKey(Ee);let ke=K.programs;K.environment=b.isMeshStandardMaterial?k.environment:null,K.fog=k.fog,K.envMap=(b.isMeshStandardMaterial?W:S).get(b.envMap||K.environment),K.envMapRotation=K.environment!==null&&b.envMap===null?k.environmentRotation:b.envMapRotation,ke===void 0&&(b.addEventListener("dispose",We),ke=new Map,K.programs=ke);let Ve=ke.get(Ae);if(Ve!==void 0){if(K.currentProgram===Ve&&K.lightsStateVersion===xe)return oc(b,Ee),Ve}else Ee.uniforms=Pe.getUniforms(b),b.onBeforeCompile(Ee,y),Ve=Pe.acquireProgram(Ee,Ae),ke.set(Ae,Ve),K.uniforms=Ee.uniforms;const Re=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Re.clippingPlanes=ce.uniform),oc(b,Ee),K.needsLights=Oh(b),K.lightsStateVersion=xe,K.needsLights&&(Re.ambientLightColor.value=B.state.ambient,Re.lightProbe.value=B.state.probe,Re.directionalLights.value=B.state.directional,Re.directionalLightShadows.value=B.state.directionalShadow,Re.spotLights.value=B.state.spot,Re.spotLightShadows.value=B.state.spotShadow,Re.rectAreaLights.value=B.state.rectArea,Re.ltc_1.value=B.state.rectAreaLTC1,Re.ltc_2.value=B.state.rectAreaLTC2,Re.pointLights.value=B.state.point,Re.pointLightShadows.value=B.state.pointShadow,Re.hemisphereLights.value=B.state.hemi,Re.directionalShadowMap.value=B.state.directionalShadowMap,Re.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Re.spotShadowMap.value=B.state.spotShadowMap,Re.spotLightMatrix.value=B.state.spotLightMatrix,Re.spotLightMap.value=B.state.spotLightMap,Re.pointShadowMap.value=B.state.pointShadowMap,Re.pointShadowMatrix.value=B.state.pointShadowMatrix),K.currentProgram=Ve,K.uniformsList=null,Ve}function rc(b){if(b.uniformsList===null){const k=b.currentProgram.getUniforms();b.uniformsList=Rr.seqWithValue(k.seq,b.uniforms)}return b.uniformsList}function oc(b,k){const Y=$.get(b);Y.outputColorSpace=k.outputColorSpace,Y.batching=k.batching,Y.batchingColor=k.batchingColor,Y.instancing=k.instancing,Y.instancingColor=k.instancingColor,Y.instancingMorph=k.instancingMorph,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function Dh(b,k,Y,K,B){k.isScene!==!0&&(k=Je),A.resetTextureUnits();const he=k.fog,xe=K.isMeshStandardMaterial?k.environment:null,Ee=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Bt,Ae=(K.isMeshStandardMaterial?W:S).get(K.envMap||xe),ke=K.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ve=!!Y.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Re=!!Y.morphAttributes.position,Qe=!!Y.morphAttributes.normal,dt=!!Y.morphAttributes.color;let ut=hi;K.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ut=y.toneMapping);const Gt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,nt=Gt!==void 0?Gt.length:0,Ce=$.get(K),Cn=p.state.lights;if(ae===!0&&(pe===!0||b!==M)){const Zt=b===M&&K.id===w;ce.setState(K,b,Zt)}let it=!1;K.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==Cn.state.version||Ce.outputColorSpace!==Ee||B.isBatchedMesh&&Ce.batching===!1||!B.isBatchedMesh&&Ce.batching===!0||B.isBatchedMesh&&Ce.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ce.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ce.instancing===!1||!B.isInstancedMesh&&Ce.instancing===!0||B.isSkinnedMesh&&Ce.skinning===!1||!B.isSkinnedMesh&&Ce.skinning===!0||B.isInstancedMesh&&Ce.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ce.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ce.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ce.instancingMorph===!1&&B.morphTexture!==null||Ce.envMap!==Ae||K.fog===!0&&Ce.fog!==he||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ce.numPlanes||Ce.numIntersection!==ce.numIntersection)||Ce.vertexAlphas!==ke||Ce.vertexTangents!==Ve||Ce.morphTargets!==Re||Ce.morphNormals!==Qe||Ce.morphColors!==dt||Ce.toneMapping!==ut||Ce.morphTargetsCount!==nt)&&(it=!0):(it=!0,Ce.__version=K.version);let hn=Ce.currentProgram;it===!0&&(hn=Ys(K,k,B));let Ni=!1,Vt=!1,_s=!1;const ft=hn.getUniforms(),xn=Ce.uniforms;if(Ne.useProgram(hn.program)&&(Ni=!0,Vt=!0,_s=!0),K.id!==w&&(w=K.id,Vt=!0),Ni||M!==b){Ne.buffers.depth.getReversed()?(de.copy(b.projectionMatrix),Wd(de),Vd(de),ft.setValue(O,"projectionMatrix",de)):ft.setValue(O,"projectionMatrix",b.projectionMatrix),ft.setValue(O,"viewMatrix",b.matrixWorldInverse);const Kn=ft.map.cameraPosition;Kn!==void 0&&Kn.setValue(O,Ie.setFromMatrixPosition(b.matrixWorld)),Be.logarithmicDepthBuffer&&ft.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ft.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Vt=!0,_s=!0)}if(B.isSkinnedMesh){ft.setOptional(O,B,"bindMatrix"),ft.setOptional(O,B,"bindMatrixInverse");const Zt=B.skeleton;Zt&&(Zt.boneTexture===null&&Zt.computeBoneTexture(),ft.setValue(O,"boneTexture",Zt.boneTexture,A))}B.isBatchedMesh&&(ft.setOptional(O,B,"batchingTexture"),ft.setValue(O,"batchingTexture",B._matricesTexture,A),ft.setOptional(O,B,"batchingIdTexture"),ft.setValue(O,"batchingIdTexture",B._indirectTexture,A),ft.setOptional(O,B,"batchingColorTexture"),B._colorsTexture!==null&&ft.setValue(O,"batchingColorTexture",B._colorsTexture,A));const xs=Y.morphAttributes;if((xs.position!==void 0||xs.normal!==void 0||xs.color!==void 0)&&ze.update(B,Y,hn),(Vt||Ce.receiveShadow!==B.receiveShadow)&&(Ce.receiveShadow=B.receiveShadow,ft.setValue(O,"receiveShadow",B.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(xn.envMap.value=Ae,xn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&k.environment!==null&&(xn.envMapIntensity.value=k.environmentIntensity),Vt&&(ft.setValue(O,"toneMappingExposure",y.toneMappingExposure),Ce.needsLights&&Uh(xn,_s),he&&K.fog===!0&&ge.refreshFogUniforms(xn,he),ge.refreshMaterialUniforms(xn,K,U,I,p.state.transmissionRenderTarget[b.id]),Rr.upload(O,rc(Ce),xn,A)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Rr.upload(O,rc(Ce),xn,A),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ft.setValue(O,"center",B.center),ft.setValue(O,"modelViewMatrix",B.modelViewMatrix),ft.setValue(O,"normalMatrix",B.normalMatrix),ft.setValue(O,"modelMatrix",B.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const Zt=K.uniformsGroups;for(let Kn=0,jn=Zt.length;Kn<jn;Kn++){const ac=Zt[Kn];F.update(ac,hn),F.bind(ac,hn)}}return hn}function Uh(b,k){b.ambientLightColor.needsUpdate=k,b.lightProbe.needsUpdate=k,b.directionalLights.needsUpdate=k,b.directionalLightShadows.needsUpdate=k,b.pointLights.needsUpdate=k,b.pointLightShadows.needsUpdate=k,b.spotLights.needsUpdate=k,b.spotLightShadows.needsUpdate=k,b.rectAreaLights.needsUpdate=k,b.hemisphereLights.needsUpdate=k}function Oh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,k,Y){$.get(b.texture).__webglTexture=k,$.get(b.depthTexture).__webglTexture=Y;const K=$.get(b);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=Y===void 0,K.__autoAllocateDepthBuffer||Oe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,k){const Y=$.get(b);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(b,k=0,Y=0){C=b,E=k,R=Y;let K=!0,B=null,he=!1,xe=!1;if(b){const Ae=$.get(b);if(Ae.__useDefaultFramebuffer!==void 0)Ne.bindFramebuffer(O.FRAMEBUFFER,null),K=!1;else if(Ae.__webglFramebuffer===void 0)A.setupRenderTarget(b);else if(Ae.__hasExternalTextures)A.rebindTextures(b,$.get(b.texture).__webglTexture,$.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Re=b.depthTexture;if(Ae.__boundDepthTexture!==Re){if(Re!==null&&$.has(Re)&&(b.width!==Re.image.width||b.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(b)}}const ke=b.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(xe=!0);const Ve=$.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ve[k])?B=Ve[k][Y]:B=Ve[k],he=!0):b.samples>0&&A.useMultisampledRTT(b)===!1?B=$.get(b).__webglMultisampledFramebuffer:Array.isArray(Ve)?B=Ve[Y]:B=Ve,N.copy(b.viewport),H.copy(b.scissor),z=b.scissorTest}else N.copy(Q).multiplyScalar(U).floor(),H.copy(oe).multiplyScalar(U).floor(),z=Te;if(Ne.bindFramebuffer(O.FRAMEBUFFER,B)&&K&&Ne.drawBuffers(b,B),Ne.viewport(N),Ne.scissor(H),Ne.setScissorTest(z),he){const Ae=$.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ae.__webglTexture,Y)}else if(xe){const Ae=$.get(b.texture),ke=k||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ae.__webglTexture,Y||0,ke)}w=-1},this.readRenderTargetPixels=function(b,k,Y,K,B,he,xe){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xe!==void 0&&(Ee=Ee[xe]),Ee){Ne.bindFramebuffer(O.FRAMEBUFFER,Ee);try{const Ae=b.texture,ke=Ae.format,Ve=Ae.type;if(!Be.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=b.width-K&&Y>=0&&Y<=b.height-B&&O.readPixels(k,Y,K,B,qe.convert(ke),qe.convert(Ve),he)}finally{const Ae=C!==null?$.get(C).__webglFramebuffer:null;Ne.bindFramebuffer(O.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(b,k,Y,K,B,he,xe){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=$.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xe!==void 0&&(Ee=Ee[xe]),Ee){const Ae=b.texture,ke=Ae.format,Ve=Ae.type;if(!Be.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=b.width-K&&Y>=0&&Y<=b.height-B){Ne.bindFramebuffer(O.FRAMEBUFFER,Ee);const Re=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Re),O.bufferData(O.PIXEL_PACK_BUFFER,he.byteLength,O.STREAM_READ),O.readPixels(k,Y,K,B,qe.convert(ke),qe.convert(Ve),0);const Qe=C!==null?$.get(C).__webglFramebuffer:null;Ne.bindFramebuffer(O.FRAMEBUFFER,Qe);const dt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Gd(O,dt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Re),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,he),O.deleteBuffer(Re),O.deleteSync(dt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,k=null,Y=0){b.isTexture!==!0&&(Ps("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,b=arguments[1]);const K=Math.pow(2,-Y),B=Math.floor(b.image.width*K),he=Math.floor(b.image.height*K),xe=k!==null?k.x:0,Ee=k!==null?k.y:0;A.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,Y,0,0,xe,Ee,B,he),Ne.unbindTexture()},this.copyTextureToTexture=function(b,k,Y=null,K=null,B=0){b.isTexture!==!0&&(Ps("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,b=arguments[1],k=arguments[2],B=arguments[3]||0,Y=null);let he,xe,Ee,Ae,ke,Ve,Re,Qe,dt;const ut=b.isCompressedTexture?b.mipmaps[B]:b.image;Y!==null?(he=Y.max.x-Y.min.x,xe=Y.max.y-Y.min.y,Ee=Y.isBox3?Y.max.z-Y.min.z:1,Ae=Y.min.x,ke=Y.min.y,Ve=Y.isBox3?Y.min.z:0):(he=ut.width,xe=ut.height,Ee=ut.depth||1,Ae=0,ke=0,Ve=0),K!==null?(Re=K.x,Qe=K.y,dt=K.z):(Re=0,Qe=0,dt=0);const Gt=qe.convert(k.format),nt=qe.convert(k.type);let Ce;k.isData3DTexture?(A.setTexture3D(k,0),Ce=O.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(A.setTexture2DArray(k,0),Ce=O.TEXTURE_2D_ARRAY):(A.setTexture2D(k,0),Ce=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);const Cn=O.getParameter(O.UNPACK_ROW_LENGTH),it=O.getParameter(O.UNPACK_IMAGE_HEIGHT),hn=O.getParameter(O.UNPACK_SKIP_PIXELS),Ni=O.getParameter(O.UNPACK_SKIP_ROWS),Vt=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ut.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ut.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ae),O.pixelStorei(O.UNPACK_SKIP_ROWS,ke),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ve);const _s=b.isDataArrayTexture||b.isData3DTexture,ft=k.isDataArrayTexture||k.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const xn=$.get(b),xs=$.get(k),Zt=$.get(xn.__renderTarget),Kn=$.get(xs.__renderTarget);Ne.bindFramebuffer(O.READ_FRAMEBUFFER,Zt.__webglFramebuffer),Ne.bindFramebuffer(O.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let jn=0;jn<Ee;jn++)_s&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,$.get(b).__webglTexture,B,Ve+jn),b.isDepthTexture?(ft&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,$.get(k).__webglTexture,B,dt+jn),O.blitFramebuffer(Ae,ke,he,xe,Re,Qe,he,xe,O.DEPTH_BUFFER_BIT,O.NEAREST)):ft?O.copyTexSubImage3D(Ce,B,Re,Qe,dt+jn,Ae,ke,he,xe):O.copyTexSubImage2D(Ce,B,Re,Qe,dt+jn,Ae,ke,he,xe);Ne.bindFramebuffer(O.READ_FRAMEBUFFER,null),Ne.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ft?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(Ce,B,Re,Qe,dt,he,xe,Ee,Gt,nt,ut.data):k.isCompressedArrayTexture?O.compressedTexSubImage3D(Ce,B,Re,Qe,dt,he,xe,Ee,Gt,ut.data):O.texSubImage3D(Ce,B,Re,Qe,dt,he,xe,Ee,Gt,nt,ut):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,B,Re,Qe,he,xe,Gt,nt,ut.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,B,Re,Qe,ut.width,ut.height,Gt,ut.data):O.texSubImage2D(O.TEXTURE_2D,B,Re,Qe,he,xe,Gt,nt,ut);O.pixelStorei(O.UNPACK_ROW_LENGTH,Cn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,it),O.pixelStorei(O.UNPACK_SKIP_PIXELS,hn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ni),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Vt),B===0&&k.generateMipmaps&&O.generateMipmap(Ce),Ne.unbindTexture()},this.copyTextureToTexture3D=function(b,k,Y=null,K=null,B=0){return b.isTexture!==!0&&(Ps("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,K=arguments[1]||null,b=arguments[2],k=arguments[3],B=arguments[4]||0),Ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,k,Y,K,B)},this.initRenderTarget=function(b){$.get(b).__webglFramebuffer===void 0&&A.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),Ne.unbindTexture()},this.resetState=function(){E=0,R=0,C=null,Ne.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}class Va{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Fe(e),this.near=t,this.far=n}clone(){return new Va(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class t0 extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class n0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xa,this.updateRanges=[],this.version=0,this.uuid=_n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Lt=new D;class Xa{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Xa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const hl=new D,dl=new et,ul=new et,i0=new D,fl=new He,pr=new D,Mo=new bn,pl=new He,wo=new Ws;class s0 extends T{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=uc,this.bindMatrix=new He,this.bindMatrixInverse=new He,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Yn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,pr),this.boundingBox.expandByPoint(pr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new bn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,pr),this.boundingSphere.expandByPoint(pr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mo.copy(this.boundingSphere),Mo.applyMatrix4(i),e.ray.intersectsSphere(Mo)!==!1&&(pl.copy(i).invert(),wo.copy(e.ray).applyMatrix4(pl),!(this.boundingBox!==null&&wo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,wo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===uc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ud?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;dl.fromBufferAttribute(i.attributes.skinIndex,e),ul.fromBufferAttribute(i.attributes.skinWeight,e),hl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=ul.getComponent(r);if(o!==0){const a=dl.getComponent(r);fl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(i0.copy(hl).applyMatrix4(fl),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class xh extends _t{constructor(){super(),this.isBone=!0,this.type="Bone"}}class vh extends Tt{constructor(e=null,t=1,n=1,i,r,o,a,c,l=zt,h=zt,d,u){super(null,o,a,c,l,h,i,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ml=new He,r0=new He;class qa{constructor(e=[],t=[]){this.uuid=_n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new He)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new He;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:r0;ml.multiplyMatrices(a,t[r]),ml.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new qa(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new vh(t,e,e,cn,gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new xh),this.bones.push(o),this.boneInverses.push(new He().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class ya extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const qi=new He,gl=new He,mr=[],_l=new Yn,o0=new He,Ss=new T,Ts=new bn;class a0 extends T{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ya(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,o0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qi),_l.copy(e.boundingBox).applyMatrix4(qi),this.boundingBox.union(_l)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new bn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,qi),Ts.copy(e.boundingSphere).applyMatrix4(qi),this.boundingSphere.union(Ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ss.geometry=this.geometry,Ss.material=this.material,Ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ts.copy(this.boundingSphere),Ts.applyMatrix4(n),e.ray.intersectsSphere(Ts)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,qi),gl.multiplyMatrices(n,qi),Ss.matrixWorld=gl,Ss.raycast(e,mr);for(let o=0,a=mr.length;o<a;o++){const c=mr[o];c.instanceId=r,c.object=this,t.push(c)}mr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ya(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new vh(new Float32Array(i*this.count),i,this.count,Ua,gn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class yh extends Sn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Lr=new D,Dr=new D,xl=new He,bs=new Ws,gr=new bn,So=new D,vl=new D;class Ya extends _t{constructor(e=new Pt,t=new yh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Lr.fromBufferAttribute(t,i-1),Dr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Lr.distanceTo(Dr);e.setAttribute("lineDistance",new st(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(i),gr.radius+=r,e.ray.intersectsSphere(gr)===!1)return;xl.copy(i).invert(),bs.copy(e.ray).applyMatrix4(xl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),x=h.getX(_+1),v=_r(this,e,bs,c,p,x);v&&t.push(v)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=_r(this,e,bs,c,_,m);p&&t.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=l){const p=_r(this,e,bs,c,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=_r(this,e,bs,c,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function _r(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(Lr.fromBufferAttribute(o,i),Dr.fromBufferAttribute(o,r),t.distanceSqToSegment(Lr,Dr,So,vl)>n)return;So.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(So);if(!(c<e.near||c>e.far))return{distance:c,point:vl.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const yl=new D,Ml=new D;class c0 extends Ya{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)yl.fromBufferAttribute(t,i),Ml.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+yl.distanceTo(Ml);e.setAttribute("lineDistance",new st(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class l0 extends Ya{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Mh extends Sn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const wl=new He,Ma=new Ws,xr=new bn,vr=new D;class h0 extends _t{constructor(e=new Pt,t=new Mh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=r,e.ray.intersectsSphere(xr)===!1)return;wl.copy(i).invert(),Ma.copy(e.ray).applyMatrix4(wl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=u,_=f;g<_;g++){const m=l.getX(g);vr.fromBufferAttribute(d,m),Sl(vr,m,c,i,e,t,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,_=f;g<_;g++)vr.fromBufferAttribute(d,g),Sl(vr,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Sl(s,e,t,n,i,r,o){const a=Ma.distanceSqToPoint(s);if(a<t){const c=new D;Ma.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class d0 extends Tt{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class En{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new ye:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new D,i=[],r=[],o=[],a=new D,c=new He;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Mt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Mt(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ka extends En{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ye){const n=t,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class u0 extends Ka{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ja(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+n*a}}}const yr=new D,To=new ja,bo=new ja,Eo=new ja;class f0 extends En{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new D){const n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(yr.subVectors(i[0],i[1]).add(i[0]),l=yr);const d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(yr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=yr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),To.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,_,m),bo.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,_,m),Eo.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(To.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),bo.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Eo.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(To.calc(c),bo.calc(c),Eo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new D().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Tl(s,e,t,n,i){const r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function p0(s,e){const t=1-s;return t*t*e}function m0(s,e){return 2*(1-s)*s*e}function g0(s,e){return s*s*e}function Ls(s,e,t,n){return p0(s,e)+m0(s,t)+g0(s,n)}function _0(s,e){const t=1-s;return t*t*t*e}function x0(s,e){const t=1-s;return 3*t*t*s*e}function v0(s,e){return 3*(1-s)*s*s*e}function y0(s,e){return s*s*s*e}function Ds(s,e,t,n,i){return _0(s,e)+x0(s,t)+v0(s,n)+y0(s,i)}class wh extends En{constructor(e=new ye,t=new ye,n=new ye,i=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ye){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ds(e,i.x,r.x,o.x,a.x),Ds(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class M0 extends En{constructor(e=new D,t=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new D){const n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ds(e,i.x,r.x,o.x,a.x),Ds(e,i.y,r.y,o.y,a.y),Ds(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Sh extends En{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class w0 extends En{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Th extends En{constructor(e=new ye,t=new ye,n=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ye){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ls(e,i.x,r.x,o.x),Ls(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class S0 extends En{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){const n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Ls(e,i.x,r.x,o.x),Ls(e,i.y,r.y,o.y),Ls(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bh extends En{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){const n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(Tl(a,c.x,l.x,h.x,d.x),Tl(a,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ye().fromArray(i))}return this}}var bl=Object.freeze({__proto__:null,ArcCurve:u0,CatmullRomCurve3:f0,CubicBezierCurve:wh,CubicBezierCurve3:M0,EllipseCurve:Ka,LineCurve:Sh,LineCurve3:w0,QuadraticBezierCurve:Th,QuadraticBezierCurve3:S0,SplineCurve:bh});class T0 extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new bl[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new bl[i.type]().fromJSON(i))}return this}}class b0 extends T0{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Sh(this.currentPoint.clone(),new ye(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const r=new Th(this.currentPoint.clone(),new ye(e,t),new ye(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){const a=new wh(this.currentPoint.clone(),new ye(e,t),new ye(n,i),new ye(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new bh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,o,a,c),this}absellipse(e,t,n,i,r,o,a,c){const l=new Ka(e,t,n,i,r,o,a,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Za extends Pt{constructor(e=[new ye(0,-.5),new ye(.5,0),new ye(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Mt(i,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/t,d=new D,u=new ye,f=new D,g=new D,_=new D;let m=0,p=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:m=e[x+1].x-e[x].x,p=e[x+1].y-e[x].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let x=0;x<=t;x++){const v=n+x*h*i,y=Math.sin(v),P=Math.cos(v);for(let E=0;E<=e.length-1;E++){d.x=e[E].x*y,d.y=e[E].y,d.z=e[E].x*P,o.push(d.x,d.y,d.z),u.x=x/t,u.y=E/(e.length-1),a.push(u.x,u.y);const R=c[3*E+0]*y,C=c[3*E+1],w=c[3*E+0]*P;l.push(R,C,w)}}for(let x=0;x<t;x++)for(let v=0;v<e.length-1;v++){const y=v+x*e.length,P=y,E=y+e.length,R=y+e.length+1,C=y+1;r.push(P,E,C),r.push(R,C,E)}this.setIndex(r),this.setAttribute("position",new st(o,3)),this.setAttribute("uv",new st(a,2)),this.setAttribute("normal",new st(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Za(e.points,e.segments,e.phiStart,e.phiLength)}}class St extends Za{constructor(e=1,t=1,n=4,i=8){const r=new b0;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new St(e.radius,e.length,e.capSegments,e.radialSegments)}}class as extends Pt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new D,h=new ye;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new st(o,3)),this.setAttribute("normal",new st(a,3)),this.setAttribute("uv",new st(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new as(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ie extends Pt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const _=[],m=n/2;let p=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new st(d,3)),this.setAttribute("normal",new st(u,3)),this.setAttribute("uv",new st(f,2));function x(){const y=new D,P=new D;let E=0;const R=(t-e)/n;for(let C=0;C<=r;C++){const w=[],M=C/r,N=M*(t-e)+e;for(let H=0;H<=i;H++){const z=H/i,X=z*c+a,Z=Math.sin(X),L=Math.cos(X);P.x=N*Z,P.y=-M*n+m,P.z=N*L,d.push(P.x,P.y,P.z),y.set(Z,R,L).normalize(),u.push(y.x,y.y,y.z),f.push(z,1-M),w.push(g++)}_.push(w)}for(let C=0;C<i;C++)for(let w=0;w<r;w++){const M=_[w][C],N=_[w+1][C],H=_[w+1][C+1],z=_[w][C+1];(e>0||w!==0)&&(h.push(M,N,z),E+=3),(t>0||w!==r-1)&&(h.push(N,H,z),E+=3)}l.addGroup(p,E,0),p+=E}function v(y){const P=g,E=new ye,R=new D;let C=0;const w=y===!0?e:t,M=y===!0?1:-1;for(let H=1;H<=i;H++)d.push(0,m*M,0),u.push(0,M,0),f.push(.5,.5),g++;const N=g;for(let H=0;H<=i;H++){const X=H/i*c+a,Z=Math.cos(X),L=Math.sin(X);R.x=w*L,R.y=m*M,R.z=w*Z,d.push(R.x,R.y,R.z),u.push(0,M,0),E.x=Z*.5+.5,E.y=L*.5*M+.5,f.push(E.x,E.y),g++}for(let H=0;H<i;H++){const z=P+H,X=N+H;y===!0?h.push(X,X+1,z):h.push(X+1,X,z),C+=3}l.addGroup(p,C,y===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ie(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ue extends ie{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ue(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wr extends Pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],o=[];a(i),l(n),h(),this.setAttribute("position",new st(r,3)),this.setAttribute("normal",new st(r.slice(),3)),this.setAttribute("uv",new st(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new D,y=new D,P=new D;for(let E=0;E<t.length;E+=3)f(t[E+0],v),f(t[E+1],y),f(t[E+2],P),c(v,y,P,x)}function c(x,v,y,P){const E=P+1,R=[];for(let C=0;C<=E;C++){R[C]=[];const w=x.clone().lerp(y,C/E),M=v.clone().lerp(y,C/E),N=E-C;for(let H=0;H<=N;H++)H===0&&C===E?R[C][H]=w:R[C][H]=w.clone().lerp(M,H/N)}for(let C=0;C<E;C++)for(let w=0;w<2*(E-C)-1;w++){const M=Math.floor(w/2);w%2===0?(u(R[C][M+1]),u(R[C+1][M]),u(R[C][M])):(u(R[C][M+1]),u(R[C+1][M+1]),u(R[C+1][M]))}}function l(x){const v=new D;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(x),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function h(){const x=new D;for(let v=0;v<r.length;v+=3){x.x=r[v+0],x.y=r[v+1],x.z=r[v+2];const y=m(x)/2/Math.PI+.5,P=p(x)/Math.PI+.5;o.push(y,1-P)}g(),d()}function d(){for(let x=0;x<o.length;x+=6){const v=o[x+0],y=o[x+2],P=o[x+4],E=Math.max(v,y,P),R=Math.min(v,y,P);E>.9&&R<.1&&(v<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),P<.2&&(o[x+4]+=1))}}function u(x){r.push(x.x,x.y,x.z)}function f(x,v){const y=x*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function g(){const x=new D,v=new D,y=new D,P=new D,E=new ye,R=new ye,C=new ye;for(let w=0,M=0;w<r.length;w+=9,M+=6){x.set(r[w+0],r[w+1],r[w+2]),v.set(r[w+3],r[w+4],r[w+5]),y.set(r[w+6],r[w+7],r[w+8]),E.set(o[M+0],o[M+1]),R.set(o[M+2],o[M+3]),C.set(o[M+4],o[M+5]),P.copy(x).add(v).add(y).divideScalar(3);const N=m(P);_(E,M+0,x,N),_(R,M+2,v,N),_(C,M+4,y,N)}}function _(x,v,y,P){P<0&&x.x===1&&(o[v]=x.x-1),y.x===0&&y.z===0&&(o[v]=P/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.vertices,e.indices,e.radius,e.details)}}class gt extends Wr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new gt(e.radius,e.detail)}}class Ht extends Wr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ht(e.radius,e.detail)}}class cs extends Pt{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let d=e;const u=(t-e)/i,f=new D,g=new ye;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const x=p+m,v=x,y=x+n+1,P=x+n+2,E=x+1;a.push(v,y,E),a.push(y,P,E)}}this.setIndex(a),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(l,3)),this.setAttribute("uv",new st(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pt extends Pt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],d=new D,u=new D,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const x=[],v=p/n;let y=0;p===0&&o===0?y=.5/t:p===n&&c===Math.PI&&(y=-.5/t);for(let P=0;P<=t;P++){const E=P/t;d.x=-e*Math.cos(i+E*r)*Math.sin(o+v*a),d.y=e*Math.cos(o+v*a),d.z=e*Math.sin(i+E*r)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(E+y,1-v),x.push(l++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const v=h[p][x+1],y=h[p][x],P=h[p+1][x],E=h[p+1][x+1];(p!==0||o>0)&&f.push(v,y,E),(p!==n-1||c<Math.PI)&&f.push(y,P,E)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(_,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qn extends Pt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new D,d=new D,u=new D;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*r,m=f/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,x=(i+1)*f+g;o.push(_,m,x),o.push(m,p,x)}this.setIndex(o),this.setAttribute("position",new st(a,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class G extends Sn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=eh,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class An extends G{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ye(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Mr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function E0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function A0(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function El(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function Eh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class Xs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class R0 extends Xs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fc,endingEnd:fc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case pc:r=e,a=2*t-n;break;case mc:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case pc:o=e,c=2*n-t;break;case mc:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-u*m+2*u*_-u*g,x=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*g+1,v=(-1-f)*m+(1.5+f)*_+.5*g,y=f*m-f*_;for(let P=0;P!==a;++P)r[P]=p*o[h+P]+x*o[l+P]+v*o[c+P]+y*o[d+P];return r}}class P0 extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*d+o[c+u]*h;return r}}class C0 extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Rn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Mr(t,this.TimeBufferType),this.values=Mr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Mr(e.times,Array),values:Mr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new C0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new P0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new R0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ks:t=this.InterpolantFactoryMethodDiscrete;break;case Bs:t=this.InterpolantFactoryMethodLinear;break;case qr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ks;case this.InterpolantFactoryMethodLinear:return Bs;case this.InterpolantFactoryMethodSmooth:return qr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&E0(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qr,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{const d=a*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){const _=t[d+g];if(_!==t[u+g]||_!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=Bs;class ps extends Rn{constructor(e,t,n){super(e,t,n)}}ps.prototype.ValueTypeName="bool";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=ks;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;class Ah extends Rn{}Ah.prototype.ValueTypeName="color";class ls extends Rn{}ls.prototype.ValueTypeName="number";class N0 extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let l=e*a;for(let h=l+a;l!==h;l+=4)ui.slerpFlat(r,0,o,l-a,o,l,c);return r}}class hs extends Rn{InterpolantFactoryMethodLinear(e){return new N0(this.times,this.values,this.getValueSize(),e)}}hs.prototype.ValueTypeName="quaternion";hs.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends Rn{constructor(e,t,n){super(e,t,n)}}ms.prototype.ValueTypeName="string";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=ks;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;class ds extends Rn{}ds.prototype.ValueTypeName="vector";class I0{constructor(e="",t=-1,n=[],i=fd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=_n(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(D0(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Rn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=A0(c);c=El(c,1,h),l=El(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ls(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const d=h[1];let u=i[d];u||(i[d]=u=[]),u.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,u,f,g,_){if(f.length!==0){const m=[],p=[];Eh(f,m,p,g),m.length!==0&&_.push(new d(u,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let d=0;d<l.length;d++){const u=l[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let _=0;_<u[g].morphTargets.length;_++)f[u[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let x=0;x!==u[g].morphTargets.length;++x){const v=u[g];m.push(v.time),p.push(v.morphTarget===_?1:0)}i.push(new ls(".morphTargetInfluence["+_+"]",m,p))}c=f.length*o}else{const f=".bones["+t[d].name+"]";n(ds,f+".position",u,"pos",i),n(hs,f+".quaternion",u,"rot",i),n(ds,f+".scale",u,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function L0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ls;case"vector":case"vector2":case"vector3":case"vector4":return ds;case"color":return Ah;case"quaternion":return hs;case"bool":case"boolean":return ps;case"string":return ms}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function D0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=L0(s.type);if(s.times===void 0){const t=[],n=[];Eh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const ci={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class U0{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const O0=new U0;class gs{constructor(e){this.manager=e!==void 0?e:O0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}gs.DEFAULT_MATERIAL_NAME="__DEFAULT";const On={};class z0 extends Error{constructor(e,t){super(e),this.response=t}}class Rh extends gs{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ci.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(On[e]!==void 0){On[e].push({onLoad:t,onProgress:n,onError:i});return}On[e]=[],On[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=On[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){x();function x(){d.read().then(({done:v,value:y})=>{if(v)p.close();else{_+=y.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let E=0,R=h.length;E<R;E++){const C=h[E];C.onProgress&&C.onProgress(P)}p.enqueue(y),x()}},v=>{p.error(v)})}}});return new Response(m)}else throw new z0(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{ci.add(e,l);const h=On[e];delete On[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=On[e];if(h===void 0)throw this.manager.itemError(e),l;delete On[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class F0 extends gs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ci.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Hs("img");function c(){h(),ci.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(d){h(),i&&i(d),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class k0 extends gs{constructor(e){super(e)}load(e,t,n,i){const r=new Tt,o=new F0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Vr extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ao=new He,Al=new D,Rl=new D;class Ja{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new He,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ha,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Al.setFromMatrixPosition(e.matrixWorld),t.position.copy(Al),Rl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Rl),t.updateMatrixWorld(),Ao.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ao),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ao)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class B0 extends Ja{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=rs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class H0 extends Vr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new B0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Pl=new He,Es=new D,Ro=new D;class G0 extends Ja{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ye(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Es.setFromMatrixPosition(e.matrixWorld),n.position.copy(Es),Ro.copy(n.position),Ro.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ro),n.updateMatrixWorld(),i.makeTranslation(-Es.x,-Es.y,-Es.z),Pl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pl)}}class kt extends Vr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new G0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class W0 extends Ja{constructor(){super(new Ga(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ph extends Vr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new W0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class V0 extends Vr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Us{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class X0 extends gs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ci.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ci.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),ci.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ci.add(e,c),r.manager.itemStart(e)}}const $a="\\[\\]\\.:\\/",q0=new RegExp("["+$a+"]","g"),Qa="[^"+$a+"]",Y0="[^"+$a.replace("\\.","")+"]",K0=/((?:WC+[\/:])*)/.source.replace("WC",Qa),j0=/(WCOD+)?/.source.replace("WCOD",Y0),Z0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qa),J0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qa),$0=new RegExp("^"+K0+j0+Z0+J0+"$"),Q0=["material","materials","bones","map"];class e_{constructor(e,t,n){const i=n||at.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class at{constructor(e,t,n){this.path=t,this.parsedPath=n||at.parseTrackName(t),this.node=at.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new at.Composite(e,t,n):new at(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(q0,"")}static parseTrackName(e){const t=$0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Q0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=at.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[i];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}at.Composite=e_;at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray];at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Cl=new He;class t_{constructor(e,t,n=0,i=1/0){this.ray=new Ws(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ba,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Cl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Cl),this}intersectObject(e,t=!0,n=[]){return wa(e,this,n,t),n.sort(Nl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)wa(e[i],this,n,t);return n.sort(Nl),n}}function Nl(s,e){return s.distance-e.distance}function wa(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)wa(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Na}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Na);const yi=Math.PI*2,tn=[{x:0,z:-5.5},{x:0,z:-14},{x:.6,z:-21.5},{x:3.8,z:-28.5},{x:9.2,z:-34.8},{x:15.8,z:-40.2},{x:22,z:-45}],Ur={x:22,z:-45,radius:4.2},yt={x:25.4,z:-47.8,rotationY:-.885},Sa={x:22.7,z:-47},nn=[{x:4.3,z:-3.4},{x:10.2,z:-8.1},{x:17.5,z:-11.8},{x:25.4,z:-14},{x:33.5,z:-14.8},{x:41,z:-14.2}],Or={x:41,z:-14.2,radius:4.2},$t={x:46.8,z:-14.2,radius:4.8},Ta={x:45,z:-14.2},sn=[{x:5.4,z:1.2},{x:12.7,z:2.9},{x:20.2,z:5.8},{x:27.6,z:10.2},{x:34.8,z:15.6},{x:42,z:21}],Os={x:42,z:21,radius:4.2},Yt={x:37.6,z:17.7,rotationY:Math.atan2(7.2,5.4)},ba={x:43.4,z:19.8},rn=[{x:2.4,z:5},{x:5.6,z:11.7},{x:9.2,z:19.2},{x:12.6,z:27},{x:15.2,z:35},{x:16.5,z:42.5}],zr={x:16.5,z:42.5,radius:5.4},Qt={x:16.5,z:43.8,radius:7.2},Ea={x:16.8,z:44.8},on=[{x:-2.4,z:5},{x:-6.2,z:12.2},{x:-10.8,z:20},{x:-15.5,z:28.2},{x:-19.2,z:36.5},{x:-21,z:44}],Fr={x:-21,z:44,radius:4.8},yn={x:-22.5,z:52,radius:8.5},Aa={x:-22.2,z:50.8},an=[{x:-5.4,z:1.2},{x:-12.8,z:2.8},{x:-20.5,z:5.4},{x:-28.2,z:9.6},{x:-35.8,z:14.8},{x:-42.8,z:20.6}],kr={x:-42.8,z:20.6,radius:5.6},Mn={x:-44.2,z:22.8,radius:7.8},Pr={x:-41.8,z:21.6},Ra={x:-42.6,z:23.2},mt=[{id:1,name:"1. Silberstollen-Pfad",directionLabel:"Norden",angleRad:0*yi/7,subtitle:"Ein gewundener Bergpfad zum alten Stollen und dem Graumännchen.",colorHex:7048315},{id:2,name:"2. Nixenteich-Pfad",directionLabel:"Nordost",angleRad:1*yi/7,subtitle:"Führt zu einem stillen Waldteich, in dem die Nixe über einem verfluchten Schatz wacht.",colorHex:4106396},{id:3,name:"3. Quellenweg",directionLabel:"Südost",angleRad:2*yi/7,subtitle:"Führt über eine Brücke mit geschlossenem Wehr und Stausee, bewacht vom Riesen.",colorHex:5014924},{id:4,name:"4. Holzfäller-Pfad",directionLabel:"Südsüdost",angleRad:3*yi/7,subtitle:"Führt auf eine Waldlichtung mit einem Holzfällerlager, in dem das Holzweibchen wartet.",colorHex:12090686},{id:5,name:"5. Höllenschlund-Pfad",directionLabel:"Südsüdwest",angleRad:4*yi/7,subtitle:"Führt an den Rand eines flammenden Höllenschlunds, in dessen Mitte der Teufel wartet.",colorHex:13907992},{id:6,name:"6. Jägerpfad",directionLabel:"Südwest",angleRad:5*yi/7,subtitle:"Führt zu einer Jagdhütte mit Kräutergarten, wo der Wilde Jäger mit dem Holzweibchen streitet.",colorHex:4749890},{id:7,name:"7. Sternenwald-Pfad",directionLabel:"Nordwest",angleRad:6*yi/7,subtitle:"Dichtes Blätterdach mit leuchtenden Farnen.",colorHex:6445708}];function n_(){const s=new ue;s.userData={interactableType:"devil"};const e=new G({color:11017244,roughness:.65,metalness:.2}),t=new G({color:6360847,roughness:.75}),n=new G({color:1708562,roughness:.85,metalness:.3}),i=new G({color:2234916,emissive:5573120,emissiveIntensity:.35,roughness:.45,metalness:.5}),r=new G({color:1837835,roughness:.9,side:Ot}),o=new G({color:2368550,metalness:.8,roughness:.3}),a=new G({color:16729088,emissive:16737792,emissiveIntensity:.9,roughness:.2}),c=new T(new ie(.18,.24,1.1,8),t);c.position.set(-.35,1.85,0),c.castShadow=!0,s.add(c);const l=new T(new ie(.18,.24,1.1,8),t);l.position.set(.35,1.85,0),l.castShadow=!0,s.add(l);const h=new T(new le(.3,.22,.4),n);h.position.set(-.35,1.35,.05),h.castShadow=!0,s.add(h);const d=new T(new le(.3,.22,.4),n);d.position.set(.35,1.35,.05),d.castShadow=!0,s.add(d);const u=new ue;u.position.set(0,2.7,0),s.add(u);const f=new T(new ie(.48,.36,1.25,8),e);f.castShadow=!0,u.add(f);const g=new T(new le(.72,.55,.28),t);g.position.set(0,.18,.24),u.add(g);const _=new T(new le(1,1.6,.08),r);_.position.set(0,-.15,-.32),_.rotation.x=.1,u.add(_);const m=new ue;m.position.set(0,.85,0),u.add(m);const p=new T(new le(.52,.58,.52),e);p.castShadow=!0,m.add(p);const x=new wt({color:16768256}),v=new T(new le(.1,.07,.05),x);v.position.set(-.16,.08,.28),m.add(v);const y=new T(new le(.1,.07,.05),x);y.position.set(.16,.08,.28),m.add(y);const P=new T(new Ue(.12,.42,4),n);P.position.set(0,-.38,.22),P.rotation.x=.35,m.add(P);const E=Q=>{const oe=new ue,Te=new T(new Ue(.14,.65,6),i);Te.position.set(0,.3,0),oe.add(Te);const q=new T(new Ue(.09,.45,6),a);return q.position.set(Q*.1,.72,-.05),q.rotation.z=Q*.4,oe.add(q),oe.position.set(Q*.26,.35,-.05),oe.rotation.z=Q*.45,oe.rotation.x=-.25,oe};m.add(E(-1)),m.add(E(1));const R=new T(new ie(.13,.16,.95,6),e);R.position.set(-.62,.05,.08),R.rotation.z=.35,R.rotation.x=-.2,u.add(R);const C=new T(new ie(.13,.16,.95,6),e);C.position.set(.62,.05,.18),C.rotation.z=-.32,C.rotation.x=-.55,u.add(C);const w=new ue;w.position.set(.85,.2,.55),w.rotation.x=.15,w.rotation.z=-.08,u.add(w);const M=new T(new ie(.045,.045,2.7,8),o);w.add(M);const N=new T(new le(.55,.06,.06),o);N.position.y=1.05,w.add(N);const H=new T(new Ue(.06,.65,5),a);H.position.y=1.42,w.add(H);const z=new T(new Ue(.05,.55,5),a);z.position.set(-.24,1.36,0),w.add(z);const X=new T(new Ue(.05,.55,5),a);X.position.set(.24,1.36,0),w.add(X);const Z=new ue;Z.position.set(0,-.45,-.3),u.add(Z);const L=new T(new ie(.06,.08,1.2,6),t);L.position.set(.15,-.45,-.35),L.rotation.x=-.7,L.rotation.y=.3,Z.add(L);const I=new T(new Ue(.12,.32,4),n);I.position.set(.3,-.85,-.75),I.rotation.x=-1.2,Z.add(I);const U=new G({color:16724736,emissive:16729088,emissiveIntensity:.95,roughness:.25,metalness:.3,flatShading:!0}),V=new T(new Ht(.28,0),U);V.scale.set(.9,1.45,.9),V.position.set(0,4.3,0),s.add(V);const j=new kt(16729088,1.2,5.5);return j.position.set(0,4.3,0),s.add(j),s.traverse(Q=>{Q.isMesh&&(Q.userData={interactableType:"devil"})}),{group:s,update:(Q,oe,Te)=>{const q=new D;s.getWorldPosition(q);const ae=oe.x-q.x,pe=oe.z-q.z;if(Math.hypot(ae,pe)<26){const Ie=Math.atan2(ae,pe);s.rotation.y=nh.lerp(s.rotation.y,Ie,.06)}u.position.y=2.7+Math.sin(Q*2.2)*.04,u.rotation.z=Math.sin(Q*1.5)*.02,Z.rotation.y=Math.sin(Q*3)*.25,w.rotation.z=-.08+Math.sin(Q*2)*.04;const be=Math.sin(Q*4);V.position.y=4.3+Math.sin(Q*2.8)*.08,V.rotation.y+=.025,Te?(U.emissiveIntensity=1.4+be*.5,j.intensity=2.4+be*.8):(U.emissiveIntensity=.85+be*.35,j.intensity=1.2+be*.4)}}}function i_(){const s=new ue;s.name="GiantNpc";const e=new wt({transparent:!0,opacity:0,depthWrite:!1}),t=new T(new ie(.85,.9,3.1,12),e);t.position.y=1.55,t.userData={interactableType:"giant"},s.add(t);const n=new G({color:10917248,roughness:.72,emissive:0}),i=new G({color:4864810,roughness:.88,emissive:0}),r=new G({color:3561784,roughness:.9,flatShading:!0,emissive:0}),o=new G({color:6050633,roughness:.85}),a=new G({color:5594723,roughness:.85,flatShading:!0}),c=new G({color:4336151,roughness:.9}),l=new ue;s.add(l);for(const R of[-1,1]){const C=new T(new ie(.24,.28,1.05,10),i);C.position.set(R*.34,.52,0),C.castShadow=!0,l.add(C)}const h=new T(new ie(.62,.54,1.25,12),i);h.position.set(0,1.52,0),h.castShadow=!0,l.add(h);const d=new T(new ie(.57,.57,.18,12),c);d.position.set(0,1.08,0),l.add(d);for(const R of[-1,1]){const C=new T(new gt(.38,0),r);C.scale.set(1.15,.78,1.05),C.position.set(R*.68,2.04,0),C.castShadow=!0,l.add(C)}const u=new T(new pt(.32,14,12),n);u.position.set(0,2.42,.04),u.castShadow=!0,l.add(u);const f=new T(new Ue(.31,.68,10),o);f.rotation.x=Math.PI,f.position.set(0,2.08,.18),f.castShadow=!0,l.add(f);const g=new T(new le(.42,.09,.18),o);g.position.set(0,2.52,.28),l.add(g);const _=new T(new St(.16,.72,8,10),n);_.position.set(-.76,1.55,.08),_.rotation.z=.16,_.castShadow=!0,l.add(_);const m=new T(new St(.16,.72,8,10),n);m.position.set(.76,1.58,.18),m.rotation.z=-.14,m.rotation.x=-.25,m.castShadow=!0,l.add(m);const p=new T(new ie(.065,.08,2.55,8),c);p.position.set(.84,1.28,.42),p.castShadow=!0,l.add(p);const x=new T(new le(.58,.38,.82),a);x.position.set(.84,2.45,.42),x.castShadow=!0,l.add(x);const v=new G({color:8377574,emissive:2652298,emissiveIntensity:.9,roughness:.22,metalness:.4}),y=new T(new Ht(.2,0),v);y.position.y=3.22,s.add(y);const P=new kt(8377574,1.05,6);return P.position.set(0,2.85,.5),s.add(P),s.traverse(R=>{R.isMesh&&(R.userData={interactableType:"giant"})}),s.rotation.y=-2.1,{group:s,update:(R,C,w)=>{const M=Math.sin(R*1.6);l.scale.set(1+M*.012,1+M*.015,1+M*.012),y.position.y=3.22+Math.sin(R*2.3)*.08,y.rotation.y=R*1.25;const N=C.x-s.position.x,H=C.z-s.position.z,z=Math.hypot(N,H);z<10&&z>.1&&(s.rotation.y=Math.atan2(N,H));const X=w?2958360:0;i.emissive.setHex(X),r.emissive.setHex(w?1914398:0),v.emissive.setHex(w?7398911:2652298)}}}function Il(s,e){if(e===pd)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===_a||e===Ql){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===_a)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class s_ extends gs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new l_(t)}),this.register(function(t){return new h_(t)}),this.register(function(t){return new v_(t)}),this.register(function(t){return new y_(t)}),this.register(function(t){return new M_(t)}),this.register(function(t){return new u_(t)}),this.register(function(t){return new f_(t)}),this.register(function(t){return new p_(t)}),this.register(function(t){return new m_(t)}),this.register(function(t){return new c_(t)}),this.register(function(t){return new g_(t)}),this.register(function(t){return new d_(t)}),this.register(function(t){return new x_(t)}),this.register(function(t){return new __(t)}),this.register(function(t){return new o_(t)}),this.register(function(t){return new w_(t)}),this.register(function(t){return new S_(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Us.extractUrlBase(e);o=Us.resolveURL(l,this.path)}else o=Us.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Rh(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ch){try{o[Ke.KHR_BINARY_GLTF]=new T_(e)}catch(d){i&&i(d);return}r=JSON.parse(o[Ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new z_(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case Ke.KHR_MATERIALS_UNLIT:o[d]=new a_;break;case Ke.KHR_DRACO_MESH_COMPRESSION:o[d]=new b_(r,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:o[d]=new E_;break;case Ke.KHR_MESH_QUANTIZATION:o[d]=new A_;break;default:u.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function r_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class o_{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Fe(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Bt);const d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ph(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new kt(h),l.distance=d;break;case"spot":l=new H0(h),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Bn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class a_{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return wt}extendParams(e,t,n){const i=[];e.color=new Fe(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Bt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Rt))}return Promise.all(i)}}class c_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class l_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ye(a,a)}return Promise.all(r)}}class h_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class d_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class u_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Fe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Bt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Rt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class f_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class p_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Fe().setRGB(a[0],a[1],a[2],Bt),Promise.all(r)}}class m_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class g_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Fe().setRGB(a[0],a[1],a[2],Bt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Rt)),Promise.all(r)}}class __{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class x_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class v_{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class y_{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class M_{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class w_{constructor(e){this.name=Ke.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,d=i.byteStride,u=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,d,u,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*d);return o.decodeGltfBuffer(new Uint8Array(f),h,d,u,i.mode,i.filter),f})})}else return null}}class S_{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==en.TRIANGLES&&l.mode!==en.TRIANGLE_STRIP&&l.mode!==en.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),d=h.isGroup?h.children:[h],u=l[0].count,f=[];for(const g of d){const _=new He,m=new D,p=new ui,x=new D(1,1,1),v=new a0(g.geometry,g.material,u);for(let y=0;y<u;y++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,y),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,y),c.SCALE&&x.fromBufferAttribute(c.SCALE,y),v.setMatrixAt(y,_.compose(m,p,x));for(const y in c)if(y==="_COLOR_0"){const P=c[y];v.instanceColor=new ya(P.array,P.itemSize,P.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,c[y]);_t.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),f.push(v)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Ch="glTF",As=12,Ll={JSON:1313821514,BIN:5130562};class T_{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,As),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ch)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-As,r=new DataView(e,As);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Ll.JSON){const l=new Uint8Array(e,As+o,a);this.content=n.decode(l)}else if(c===Ll.BIN){const l=As+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class b_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const d=Pa[h]||h.toLowerCase();a[d]=o[h]}for(const h in e.attributes){const d=Pa[h]||h.toLowerCase();if(o[h]!==void 0){const u=n.accessors[e.attributes[h]],f=$i[u.componentType];l[d]=f.name,c[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}d(f)},a,l,Bt,u)})})}}class E_{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class A_{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}}class Nh extends Xs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,d=(n-t)/h,u=d*d,f=u*d,g=e*l,_=g-l,m=-2*f+3*u,p=f-u,x=1-m,v=p-u+d;for(let y=0;y!==a;y++){const P=o[_+y+a],E=o[_+y+c]*h,R=o[g+y+a],C=o[g+y]*h;r[y]=x*P+v*E+m*R+p*C}return r}}const R_=new ui;class P_ extends Nh{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return R_.fromArray(r).normalize().toArray(r),r}}const en={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},$i={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Dl={9728:zt,9729:jt,9984:Wl,9985:wr,9986:Rs,9987:Hn},Ul={33071:ai,33648:Nr,10497:ns},Po={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Pa={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ni={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},C_={CUBICSPLINE:void 0,LINEAR:Bs,STEP:ks},Co={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function N_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new G({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vn})),s.DefaultMaterial}function Mi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Bn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function I_(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const d=e[l];if(n){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):s.attributes.position;o.push(u)}if(i){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):s.attributes.normal;a.push(u)}if(r){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):s.attributes.color;c.push(u)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],d=l[1],u=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=d),r&&(s.morphAttributes.color=u),s.morphTargetsRelative=!0,s})}function L_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function D_(s){let e;const t=s.extensions&&s.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+No(t.attributes):e=s.indices+":"+No(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+No(s.targets[n]);return e}function No(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ca(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function U_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const O_=new He;class z_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new r_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new k0(this.options.manager):this.textureLoader=new X0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Rh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Mi(r,a,i),Bn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Us.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Po[i.type],a=$i[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Ft(l,o,c))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Po[i.type],l=$i[i.componentType],h=l.BYTES_PER_ELEMENT,d=h*c,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==d){const p=Math.floor(u/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let v=t.cache.get(x);v||(_=new l(a,p*f,i.count*f/h),v=new n0(_,f/h),t.cache.add(x,v)),m=new Xa(v,c,u%f/h,g)}else a===null?_=new l(i.count*c):_=new l(a,u,i.count*c),m=new Ft(_,c,g);if(i.sparse!==void 0){const p=Po.SCALAR,x=$i[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,P=new x(o[1],v,i.sparse.count*p),E=new l(o[2],y,i.sparse.count*c);a!==null&&(m=new Ft(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,C=P.length;R<C;R++){const w=P[R];if(m.setX(w,E[R*c]),c>=2&&m.setY(w,E[R*c+1]),c>=3&&m.setZ(w,E[R*c+2]),c>=4&&m.setW(w,E[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const u=(r.samplers||{})[o.sampler]||{};return h.magFilter=Dl[u.magFilter]||jt,h.minFilter=Dl[u.minFilter]||Hn,h.wrapS=Ul[u.wrapS]||ns,h.wrapT=Ul[u.wrapT]||ns,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==zt&&h.minFilter!==jt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(d){l=!0;const u=new Blob([d],{type:o.mimeType});return c=a.createObjectURL(u),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(d){return new Promise(function(u,f){let g=u;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Tt(_);m.needsUpdate=!0,u(m)}),t.load(Us.resolveURL(d,r.path),g,void 0,f)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),Bn(d,o),d.userData.mimeType=o.mimeType||U_(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Ke.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Mh,Sn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new yh,Sn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return G}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[Ke.KHR_MATERIALS_UNLIT]){const d=i[Ke.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),l.push(d.extendParams(a,r,t))}else{const d=r.pbrMetallicRoughness||{};if(a.color=new Fe(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;a.color.setRGB(u[0],u[1],u[2],Bt),a.opacity=u[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,Rt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Ot);const h=r.alphaMode||Co.OPAQUE;if(h===Co.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Co.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==wt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ye(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==wt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==wt){const d=r.emissiveFactor;a.emissive=new Fe().setRGB(d[0],d[1],d[2],Bt)}return r.emissiveTexture!==void 0&&o!==wt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Rt)),Promise.all(l).then(function(){const d=new o(a);return r.name&&(d.name=r.name),Bn(d,r),t.associations.set(d,{materials:e}),r.extensions&&Mi(i,d,r),d})}createUniqueName(e){const t=at.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Ol(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=D_(l),d=i[h];if(d)o.push(d.promise);else{let u;l.extensions&&l.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?u=r(l):u=Ol(new Pt,l,t),i[h]={primitive:l,promise:u},o.push(u)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?N_(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],d=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=o[f];let p;const x=l[f];if(m.mode===en.TRIANGLES||m.mode===en.TRIANGLE_STRIP||m.mode===en.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new s0(_,x):new T(_,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===en.TRIANGLE_STRIP?p.geometry=Il(p.geometry,Ql):m.mode===en.TRIANGLE_FAN&&(p.geometry=Il(p.geometry,_a));else if(m.mode===en.LINES)p=new c0(_,x);else if(m.mode===en.LINE_STRIP)p=new Ya(_,x);else if(m.mode===en.LINE_LOOP)p=new l0(_,x);else if(m.mode===en.POINTS)p=new h0(_,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&L_(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Bn(p,r),m.extensions&&Mi(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&Mi(i,d[0],r),d[0];const u=new ue;r.extensions&&Mi(i,u,r),t.associations.set(u,{meshes:e});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ut(nh.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ga(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Bn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const d=o[l];if(d){a.push(d);const u=new He;r!==null&&u.fromArray(r.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new qa(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let d=0,u=i.channels.length;d<u;d++){const f=i.channels[d],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],g=d[2],_=d[3],m=d[4],p=[];for(let x=0,v=u.length;x<v;x++){const y=u[x],P=f[x],E=g[x],R=_[x],C=m[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const w=n._createAnimationTracks(y,P,E,R,C);if(w)for(let M=0;M<w.length;M++)p.push(w[M])}return new I0(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],d=l[1],u=l[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,O_)});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new xh:l.length>1?h=new ue:l.length===1?h=l[0]:h=new _t,h!==l[0])for(let d=0,u=l.length;d<u;d++)h.add(l[d]);if(r.name&&(h.userData.name=r.name,h.name=o),Bn(h,r),r.extensions&&Mi(n,h,r),r.matrix!==void 0){const d=new He;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new ue;n.name&&(r.name=i.createUniqueName(n.name)),Bn(r,n),n.extensions&&Mi(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,d=c.length;h<d;h++)r.add(c[h]);const l=h=>{const d=new Map;for(const[u,f]of i.associations)(u instanceof Sn||u instanceof Tt)&&d.set(u,f);return h.traverse(u=>{const f=i.associations.get(u);f!=null&&d.set(u,f)}),d};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,c=[];ni[r.path]===ni.weights?e.traverse(function(u){u.morphTargetInfluences&&c.push(u.name?u.name:u.uuid)}):c.push(a);let l;switch(ni[r.path]){case ni.weights:l=ls;break;case ni.rotation:l=hs;break;case ni.position:case ni.scale:l=ds;break;default:switch(n.itemSize){case 1:l=ls;break;case 2:case 3:default:l=ds;break}break}const h=i.interpolation!==void 0?C_[i.interpolation]:Bs,d=this._getArrayFromAccessor(n);for(let u=0,f=c.length;u<f;u++){const g=new l(c[u]+"."+ni[r.path],t.array,d,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ca(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof hs?P_:Nh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function F_(s,e,t){const n=e.attributes,i=new Yn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new D(c[0],c[1],c[2]),new D(l[0],l[1],l[2])),a.normalized){const h=Ca($i[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new D,c=new D;for(let l=0,h=r.length;l<h;l++){const d=r[l];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,g=u.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),u.normalized){const _=Ca($i[u.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new bn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Ol(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(const o in n){const a=Pa[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return je.workingColorSpace!==Bt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${je.workingColorSpace}" not supported.`),Bn(s,e),F_(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?I_(s,e.targets,t):s})}function k_(){const s=new ue;s.name="GreyManNpc";const e=new wt({transparent:!0,opacity:0,depthWrite:!1}),t=new T(new ie(.48,.48,1.7,12),e);t.position.y=.85,t.userData={interactableType:"grey_man"},s.add(t);const n=new ue,i=new G({color:6844536,roughness:.85}),r=new T(new Ue(.38,1.2,10),i);r.position.y=.6,r.castShadow=!0,n.add(r),s.add(n);const o=[];new s_().load("/assets/models/grey-man.glb",u=>{const f=u.scene;f.scale.setScalar(1.65),f.position.set(0,0,0),f.traverse(g=>{const _=g;if(_.isMesh){_.castShadow=!0,_.receiveShadow=!0,_.userData={interactableType:"grey_man"};const m=Array.isArray(_.material)?_.material:[_.material];for(const p of m)p&&"emissive"in p&&o.push(p)}}),s.remove(n),s.add(f)},void 0,u=>{console.warn("Graumännchen-GLB konnte nicht geladen werden, nutze Platzhalter:",u)});const c=new G({color:13624565,emissive:5076633,emissiveIntensity:.85,roughness:.2,metalness:.5}),l=new T(new Ht(.16,0),c);l.position.y=1.92,l.userData={interactableType:"grey_man"},s.add(l);const h=new kt(10405352,.95,5);return h.position.set(0,1.85,.45),s.add(h),{group:s,update:(u,f,g)=>{l.position.y=1.92+Math.sin(u*2.5+1)*.07,l.rotation.y=-u*1.3;const _=f.x-s.position.x,m=f.z-s.position.z,p=Math.hypot(_,m);p<8&&p>.1&&(s.rotation.y=Math.atan2(_,m));const x=g?2504778:0;for(const v of o)v.emissive.setHex(x);c.emissive.setHex(g?9159922:5076633)}}}function B_(){const s=new ue;s.name="GuideNpc";const e=new G({color:2968114,roughness:.85,flatShading:!0}),t=new G({color:4863781,roughness:.82,flatShading:!0}),n=new G({color:4007702,roughness:.75,flatShading:!0}),i=new G({color:13938828,roughness:.72}),r=new G({color:1447188,roughness:.9}),o=new G({color:2242598,roughness:.82,flatShading:!0}),a=new G({color:4336152,roughness:.7}),c=new G({color:4665372,roughness:.9}),l=new G({color:12884540,metalness:.7,roughness:.32}),h=new G({color:16769669,emissive:14063906,emissiveIntensity:.9,roughness:.2,transparent:!0,opacity:.85}),d=new G({color:5076283,roughness:.65}),u=new G({color:14858347,emissive:9070624,emissiveIntensity:.6,roughness:.25,metalness:.2});for(const O of[-1,1]){const tt=new T(new ie(.12,.1,.68,8),n);tt.position.set(O*.19,.34,0),tt.castShadow=!0,s.add(tt);const Oe=new T(new le(.22,.2,.28),n);Oe.position.set(O*.19,.1,.04),Oe.castShadow=!0,s.add(Oe)}const f=new T(new Ue(.58,.76,12),e);f.position.y=.58,f.castShadow=!0,s.add(f);const g=new T(new ie(.33,.4,.52,10),e);g.position.y=1,g.castShadow=!0,s.add(g);const _=new T(new pt(.36,12,10),e);_.position.set(0,.94,.09),_.scale.set(1.08,.92,1.15),_.castShadow=!0,s.add(_);const m=new T(new Ue(.48,.38,12),t);m.position.y=1.19,m.castShadow=!0,s.add(m);const p=new T(new ie(.39,.41,.1,12),n);p.position.set(0,.84,.06),s.add(p);const x=new T(new le(.14,.11,.05),l);x.position.set(0,.84,.46),s.add(x);const v=new ue;v.position.set(-.38,.72,.08);const y=new T(new le(.14,.24,.24),n);y.rotation.z=.12,y.castShadow=!0,v.add(y);const P=new T(new le(.04,.05,.02),l);P.position.set(-.06,-.02,.125),v.add(P),s.add(v);const E=new T(new le(.042,.48,.02),n);E.position.set(-.26,.95,.24),E.rotation.set(-.32,.25,-.52),s.add(E);const R=new T(new le(.042,.46,.02),n);R.position.set(-.28,.95,-.12),R.rotation.set(.3,-.22,-.48),s.add(R);const C=new T(new pt(.18,12,12),i);C.position.set(0,1.41,0),C.castShadow=!0,s.add(C);const w=new ue;w.position.set(0,1.3,.08);const M=new T(new Ue(.2,.35,10),r);M.rotation.x=.38,M.castShadow=!0,w.add(M);const N=new T(new pt(.16,8,8),r);N.position.set(0,.06,.04),N.scale.set(1.2,.85,1.1),w.add(N);for(const O of[-1,1]){const tt=new T(new pt(.09,6,6),r);tt.position.set(O*.12,.08,-.02),tt.scale.set(.8,1.3,.9),w.add(tt)}s.add(w);const H=new T(new le(.24,.06,.09),r);H.position.set(0,1.38,.17),s.add(H);const z=new G({color:4022600,emissive:1321755,emissiveIntensity:.4});for(const O of[-1,1]){const tt=new T(new pt(.024,8,8),z);tt.position.set(O*.07,1.44,.165),s.add(tt)}const X=new ue;X.position.set(0,1.53,-.02),X.rotation.x=-.08;const Z=new T(new ie(.46,.48,.045,14),o);Z.scale.set(1.08,1,1.18),X.add(Z);const L=new T(new ie(.26,.27,.065,12),a);L.position.y=.05,X.add(L);const I=new T(new Ue(.26,.38,10),o);I.position.y=.22,X.add(I);const U=new T(new le(.045,.13,.02),d);U.position.set(.19,.1,.13),U.rotation.z=-.45,X.add(U),s.add(X);const V=new T(new St(.085,.38,6,8),e);V.position.set(-.42,1.04,.02),V.rotation.z=.22,V.castShadow=!0,s.add(V);const j=new T(new St(.085,.38,6,8),e);j.position.set(.4,1.04,.1),j.rotation.z=-.32,j.rotation.x=-.32,j.castShadow=!0,s.add(j);const Q=new ue;Q.position.set(.56,0,.22),Q.rotation.x=.06;const oe=new T(new ie(.032,.044,1.82,8),c);oe.position.y=.91,oe.castShadow=!0,Q.add(oe);const Te=new T(new ie(.042,.042,.28,8),n);Te.position.y=1.16,Q.add(Te);const q=new T(new pt(.065,8,8),l);q.position.y=1.84,q.scale.set(.9,1.3,.9),Q.add(q);const ae=new T(new le(.18,.025,.025),l);ae.position.set(-.06,1.72,.06),ae.rotation.y=.35,Q.add(ae);const pe=new ue;pe.position.set(-.12,1.7,.08);const de=new T(new qn(.03,.008,5,8),l);pe.add(de);const be=new T(new Ue(.095,.07,4),l);be.position.y=-.05,be.rotation.y=Math.PI/4,pe.add(be);const Ie=new T(new le(.11,.15,.11),h);Ie.position.y=-.15,pe.add(Ie);const Ge=new T(new le(.12,.03,.12),l);Ge.position.y=-.23,pe.add(Ge);const Je=new kt(16760427,1.3,6);Je.position.y=-.15,pe.add(Je),Q.add(pe),s.add(Q);const Le=new T(new Ht(.16,0),u);return Le.position.y=2.08,s.add(Le),s.traverse(O=>{O.isMesh&&(O.userData={interactableType:"npc"})}),{group:s,update:(O,tt,Oe)=>{Le.position.y=2.08+Math.sin(O*2.6)*.06,Le.rotation.y=O*1.3,pe.rotation.z=Math.sin(O*2.2)*.08,pe.rotation.x=Math.cos(O*1.8)*.06;const Be=.95+Math.sin(O*7.5)*.12+Math.cos(O*13)*.08;Je.intensity=1.3*Be,h.emissiveIntensity=.9*Be;const Ne=tt.x-s.position.x,re=tt.z-s.position.z,$=Math.hypot(Ne,re);if($<7.5&&$>.1){const W=Math.atan2(Ne,re);s.rotation.y=W}const A=Oe?2374434:0;e.emissive.setHex(A),o.emissive.setHex(A),u.emissiveIntensity=Oe?1.25:.6;const S=Oe?1.22:1;Le.scale.set(S,S,S)}}}function H_(){const s=new ue;s.userData={interactableType:"hell_chasm"};const e=new G({color:1841431,roughness:.95,metalness:.15,flatShading:!0}),t=new G({color:1314840,roughness:.35,metalness:.7,flatShading:!0}),n=new G({color:16726784,emissive:16730112,emissiveIntensity:.95,roughness:.3,metalness:.1}),i=new G({color:3346949,emissive:8921600,emissiveIntensity:.4,roughness:.85,flatShading:!0}),r=new T(new ie(8.6,7.8,.5,32),e);r.position.y=.1,r.receiveShadow=!0,r.userData={interactableType:"hell_chasm"},s.add(r);const o=new T(new ie(7.8,7.8,.22,32),n);o.position.y=.22,o.userData={interactableType:"hell_chasm"},s.add(o);const a=[];for(let P=0;P<9;P++){const E=P*Math.PI*2/9+.18,R=3.6+P%3*1.4,C=new T(new ie(.85+P%2*.4,1.1+P%2*.3,.15,6),i);C.position.set(Math.sin(E)*R,.28,Math.cos(E)*R),C.rotation.y=P*.7,C.userData={interactableType:"hell_chasm"},s.add(C),a.push(C)}const c=new T(new ie(2.2,3.1,1.1,10),t);c.position.set(.3,.55,-1.2),c.castShadow=!0,c.receiveShadow=!0,c.userData={interactableType:"hell_chasm"},s.add(c);const l=new T(new ie(1.6,1.9,.4,8),e);l.position.set(.3,1.15,-1.2),l.receiveShadow=!0,l.userData={interactableType:"hell_chasm"},s.add(l);for(let P=0;P<22;P++){const E=P*Math.PI*2/22,R=E>2.6&&E<3.7,C=8.1+Math.sin(P*3)*.5,w=R?.6+P%3*.25:1.3+P%5*.45,M=1.1+P%3*.4,N=new T(new Ue(M,w,5),e);N.position.set(Math.sin(E)*C,w*.45,Math.cos(E)*C),N.rotation.y=P*.8,N.rotation.z=Math.sin(P*1.5)*.15,N.castShadow=!0,N.receiveShadow=!0,N.userData={interactableType:"hell_chasm"},s.add(N)}const h=[],u=[16768256,16742144,16720384,16755200].map(P=>new wt({color:P,transparent:!0,opacity:.88}));[[-1.2,.45,-2.4],[1.8,.45,-2.2],[-1.6,.45,-.4],[2.1,.45,-.3],[-.5,.55,.2],[1.2,.55,.1],[-4.5,.35,-3.2],[4.2,.35,-2.8],[-3.8,.35,2.5],[3.5,.35,2.8],[-5.6,.35,.2],[5.4,.35,-.4],[-2.2,.35,4.6],[2,.35,4.8],[.1,.35,5.2],[-3,.35,-5.2],[2.8,.35,-5],[-.2,.35,-6.1]].forEach(([P,E,R],C)=>{const w=u[C%u.length],M=new Ue(.35+C%3*.15,1.4+C%4*.35,4),N=new T(M,w);N.position.set(P,E+.6,R),N.rotation.y=C*.9,s.add(N),h.push({mesh:N,baseScaleY:1+C%3*.3,speed:6+C%5*1.5,phase:C*.65})});const g=28,_=new le(.08,.12,.08),m=new wt({color:16763938}),p=[];for(let P=0;P<g;P++){const E=new T(_,m),R=P*Math.PI*2/g+Math.sin(P)*.5,C=1.5+P%6*.9,w=.4+P%10*.35;E.position.set(Math.sin(R)*C,w,Math.cos(R)*C-.5),s.add(E),p.push({mesh:E,startY:.3,speedY:.9+P%4*.45,angle:R,radius:C})}const x=new kt(16733440,3.2,22);x.position.set(.3,2.8,-1.2),x.castShadow=!0,s.add(x);const v=new kt(16720384,2.4,18);v.position.set(-2.5,1.8,1.5),s.add(v);const y=new kt(16755200,1.8,16);return y.position.set(3.2,1.6,-1),s.add(y),{group:s,update:P=>{for(const w of h){const M=Math.sin(P*w.speed+w.phase);w.mesh.scale.y=w.baseScaleY*(.75+.35*M),w.mesh.scale.x=.85+.2*Math.cos(P*(w.speed*.8)+w.phase),w.mesh.rotation.y+=.025}for(let w=0;w<p.length;w++){const M=p[w];M.mesh.position.y+=M.speedY*.018,M.mesh.position.x=Math.sin(M.angle+P*.5)*M.radius,M.mesh.position.z=Math.cos(M.angle+P*.5)*M.radius-.5,M.mesh.position.y>4.5&&(M.mesh.position.y=M.startY)}for(let w=0;w<a.length;w++)a[w].position.y=.28+Math.sin(P*1.8+w)*.025;const E=.85+.25*Math.sin(P*9.2)+.15*Math.sin(P*14.8),R=.85+.25*Math.cos(P*11.5)+.15*Math.sin(P*7.1),C=.85+.2*Math.sin(P*8.4);x.intensity=3.2*E,v.intensity=2.4*R,y.intensity=1.8*C}}}function G_(){const s=new ue;s.name="HuntingLodge";const e=new G({color:4862750,roughness:.88,flatShading:!0}),t=new G({color:3022611,roughness:.92,flatShading:!0}),n=new G({color:5920078,roughness:.95,flatShading:!0}),i=new G({color:14208696,roughness:.65,flatShading:!0}),r=new G({color:16758861,emissive:13400596,emissiveIntensity:.7,roughness:.3}),o=new G({color:6046248,roughness:.85,flatShading:!0}),a=new G({color:3351833,roughness:.98}),c=new G({color:3038246,roughness:.8}),l=new G({color:9067704,roughness:.6,emissive:3479892,emissiveIntensity:.25}),h=new G({color:4941465,roughness:.7}),d=new G({color:11465448,emissive:2782057,emissiveIntensity:.55,roughness:.3}),u=new G({color:16423707,roughness:.6}),f=new G({color:4859920,roughness:.75}),g=new G({color:2035975,roughness:.9}),_=new G({color:2496009,roughness:.6}),m=new G({color:7223318,roughness:.8}),p=new G({color:15262165,roughness:.8}),x=new G({color:13949142,roughness:.9,transparent:!0,opacity:.45}),v=new ue;v.position.set(-2.4,0,3.2);const y=new T(new le(4.4,.3,3.8),e);y.position.y=.15,y.receiveShadow=!0,v.add(y);const P=8,E=.14;for(let re=0;re<P;re++){const $=.3+E+re*(E*1.85),A=new T(new ie(E,E,4.3,8),e);A.rotation.z=Math.PI/2,A.position.set(0,$,-1.75),A.castShadow=!0,A.receiveShadow=!0,v.add(A);const S=new T(new ie(E,E,3.6,8),e);S.rotation.x=Math.PI/2,S.position.set(-2.05,$,0),S.castShadow=!0,S.receiveShadow=!0,v.add(S);const W=new T(new ie(E,E,3.6,8),e);W.rotation.x=Math.PI/2,W.position.set(2.05,$,0),W.castShadow=!0,W.receiveShadow=!0,v.add(W);for(const ee of[-1.45,1.45]){const se=new T(new ie(E,E,1.25,8),e);se.rotation.z=Math.PI/2,se.position.set(ee,$,1.75),se.castShadow=!0,se.receiveShadow=!0,v.add(se)}}const R=new T(new ie(E,E,4.3,8),e);R.rotation.z=Math.PI/2,R.position.set(0,2.35,1.75),R.castShadow=!0,v.add(R);const C=new T(new le(2.8,.14,4.4),t);C.position.set(-1.15,2.9,0),C.rotation.z=.58,C.castShadow=!0,C.receiveShadow=!0,v.add(C);const w=new T(new le(2.8,.14,4.4),t);w.position.set(1.15,2.9,0),w.rotation.z=-.58,w.castShadow=!0,w.receiveShadow=!0,v.add(w);for(const re of[1.74,-1.74]){const $=new T(new Ue(2.2,1.4,4),e);$.position.set(0,3,re),$.rotation.y=Math.PI/4,$.scale.set(1,1,.08),$.castShadow=!0,v.add($)}const M=new T(new le(.85,2.8,.95),n);M.position.set(-2.2,1.4,-.6),M.castShadow=!0,v.add(M);const N=new T(new le(.65,1.8,.75),n);N.position.set(-2.2,3.5,-.6),N.castShadow=!0,v.add(N);const H=[];for(let re=0;re<5;re++){const $=new T(new pt(.18+re*.05,7,7),x);$.position.set(-2.2,4.4+re*.45,-.6),v.add($),H.push($)}const z=new ue;z.position.set(0,2.52,1.88);const X=new T(new pt(.09,8,8),i);X.scale.set(1,1.4,.6),z.add(X);for(const re of[-1,1]){const $=new T(new ie(.022,.038,.58,6),i);$.position.set(re*.22,.24,.04),$.rotation.z=-re*.72,$.rotation.x=-.15,z.add($);for(let A=1;A<=3;A++){const S=new T(new Ue(.02,.22,5),i);S.position.set(re*(.12+A*.09),.18+A*.1,.06),S.rotation.z=-re*(.35+A*.2),S.rotation.x=.25,z.add(S)}}v.add(z);const Z=new T(new le(.65,.65,.08),r);Z.position.set(1.45,1.35,1.82),v.add(Z);for(let re=0;re<4;re++)for(let $=0;$<3;$++){const A=new T(new ie(.07,.07,.75,6),e);A.rotation.x=Math.PI/2,A.position.set(-1.85,.38+re*.14,1.4-$*.16),A.castShadow=!0,v.add(A)}v.traverse(re=>{re.isMesh&&(re.userData={interactableType:"hunting_lodge"})}),s.add(v);const L=new ue;L.position.set(-2.5,0,-1.8);for(const re of[-.9,.9]){const $=new T(new le(3.2,.12,1.25),a);$.position.set(0,.06,re),$.receiveShadow=!0,L.add($)}const I=[new D(-1.9,0,-1.8),new D(-.6,0,-1.8),new D(.6,0,-1.8),new D(1.9,0,-1.8),new D(-1.9,0,-.6),new D(-1.9,0,.6),new D(-1.9,0,1.8),new D(-.6,0,1.8),new D(.6,0,1.8),new D(1.9,0,1.8),new D(1.9,0,-1),new D(1.9,0,1)];for(const re of I){const $=new T(new ie(.045,.055,.85,6),o);$.position.set(re.x,.42,re.z),$.castShadow=!0,L.add($)}const U=[{x:0,z:-1.8,len:3.8,rotY:0},{x:-1.9,z:0,len:3.6,rotY:Math.PI/2},{x:0,z:1.8,len:3.8,rotY:0},{x:1.9,z:-1.4,len:.8,rotY:Math.PI/2},{x:1.9,z:1.4,len:.8,rotY:Math.PI/2}];for(const re of U)for(const $ of[.28,.62]){const A=new T(new le(re.len,.05,.03),o);A.position.set(re.x,$,re.z),A.rotation.y=re.rotY,A.castShadow=!0,L.add(A)}const V=new T(new ie(.36,.32,.45,10),e);V.position.set(1.4,.22,1.35),V.castShadow=!0,L.add(V);const j=new T(new as(.32,10),new G({color:4029320,roughness:.1,metalness:.2}));j.rotation.x=-Math.PI/2,j.position.set(1.4,.41,1.35),L.add(j);const Q=[];for(let re=-1.2;re<=1.2;re+=.42){const $=new ue;$.position.set(re,.12,-1.15);for(let S=0;S<3;S++){const W=new T(new ie(.015,.02,.32,5),c);W.position.set((S-1)*.06,.16,0),W.rotation.z=(S-1)*.15,$.add(W);const ee=new T(new Ue(.045,.16,6),h);ee.position.set((S-1)*.06,.34,0),$.add(ee)}L.add($),Q.push($);const A=new ue;A.position.set(re+.15,.12,-.65);for(let S=0;S<4;S++){const W=new T(new ie(.012,.016,.38,5),c);W.position.set((S-1.5)*.05,.19,S%2*.03),A.add(W);const ee=new T(new St(.03,.14,4,6),l);ee.position.set((S-1.5)*.05,.38,S%2*.03),A.add(ee)}L.add(A),Q.push(A)}for(const re of[-1.2,-.8,.8,1.2]){const $=new ue;$.position.set(re,.12,.9);const A=new T(new ie(.018,.022,.24,5),c);A.position.y=.12,$.add(A);const S=new T(new pt(.065,7,7),u);S.position.y=.24,S.scale.set(1,.45,1),$.add(S),L.add($),Q.push($)}const oe=new ue;oe.position.set(0,.12,.9);for(let re=0;re<5;re++){const $=re*Math.PI*2/5,A=new T(new ie(.015,.02,.34,5),c);A.position.set(Math.cos($)*.12,.17,Math.sin($)*.12),A.rotation.x=Math.sin($)*.22,A.rotation.z=-Math.cos($)*.22,oe.add(A);const S=new T(new Ht(.065,0),d);S.position.set(Math.cos($)*.15,.35,Math.sin($)*.15),S.scale.set(.8,1.5,.8),oe.add(S)}const Te=new kt(7793632,.85,3.2);Te.position.set(0,.45,0),oe.add(Te),L.add(oe),Q.push(oe),L.traverse(re=>{re.isMesh&&(re.userData={interactableType:"herb_garden"})}),s.add(L);const q=new ue;q.position.set(.6,0,-2.4),q.rotation.y=.45;const ae=new T(new St(.42,1.25,8,10),f);ae.rotation.x=Math.PI/2,ae.position.y=1.35,ae.castShadow=!0,q.add(ae);const pe=new T(new le(.68,.2,.62),_);pe.position.set(0,1.58,.05),pe.castShadow=!0,q.add(pe);const de=new T(new ie(.24,.34,.85,8),f);de.position.set(0,1.82,.65),de.rotation.x=-.55,de.castShadow=!0,q.add(de);const be=new T(new Ue(.22,.68,8),f);be.position.set(0,2.12,.98),be.rotation.x=1.2,be.castShadow=!0,q.add(be);for(const re of[-1,1]){const $=new T(new Ue(.05,.16,5),f);$.position.set(re*.1,2.38,.88),$.rotation.z=-re*.25,q.add($)}const Ie=new T(new le(.08,.72,.18),g);Ie.position.set(0,1.95,.58),Ie.rotation.x=-.55,q.add(Ie);const Ge=[[-.26,.48],[.26,.48],[-.26,-.48],[.26,-.48]];for(const[re,$]of Ge){const A=new T(new ie(.09,.075,1.35,7),f);A.position.set(re,.68,$),A.castShadow=!0,q.add(A);const S=new T(new ie(.08,.095,.12,7),g);S.position.set(re,.06,$),q.add(S)}const Je=new T(new Ue(.12,.78,6),g);Je.position.set(0,1.32,-.72),Je.rotation.x=.35,Je.castShadow=!0,q.add(Je),q.traverse(re=>{re.isMesh&&(re.userData={interactableType:"wild_hunter"})}),s.add(q);const Le=new ue;Le.position.set(1.2,0,-.9),Le.rotation.y=1.95;const ct=new T(new St(.18,.54,7,8),m);ct.rotation.x=Math.PI/2,ct.position.y=.45,ct.castShadow=!0,Le.add(ct);const O=new T(new pt(.19,7,7),p);O.position.set(0,.46,.18),O.scale.set(.9,1,.8),Le.add(O);const tt=new T(new pt(.13,8,8),m);tt.position.set(0,.65,.38),tt.castShadow=!0,Le.add(tt);const Oe=new T(new le(.11,.09,.16),p);Oe.position.set(0,.62,.5),Le.add(Oe);for(const re of[-1,1]){const $=new T(new St(.04,.14,4,6),m);$.position.set(re*.12,.62,.36),$.rotation.z=-re*.45,Le.add($)}for(const[re,$]of[[-.12,.22],[.12,.22],[-.12,-.2],[.12,-.2]]){const A=new T(new ie(.042,.038,.42,6),p);A.position.set(re,.21,$),A.castShadow=!0,Le.add(A)}const Be=new T(new Ue(.04,.32,5),m);return Be.position.set(0,.52,-.32),Be.rotation.x=.75,Be.castShadow=!0,Le.add(Be),Le.traverse(re=>{re.isMesh&&(re.userData={interactableType:"wild_hunter"})}),s.add(Le),{group:s,update:re=>{for(let A=0;A<H.length;A++){const S=H[A],W=(re*.75+A*.35)%2;S.position.y=4.2+W*1.35,S.position.x=-2.2+Math.sin(re*1.5+A)*.12;const ee=.8+W*.55;S.scale.set(ee,ee,ee),S.material.opacity=Math.max(0,.55-W/2*.5)}Je.rotation.z=Math.sin(re*1.8)*.22,de.rotation.x=-.55+Math.sin(re*1.2)*.04,Be.rotation.y=Math.sin(re*6)*.45,ct.scale.y=1+Math.sin(re*3)*.03;const $=Math.sin(re*2.2);for(let A=0;A<Q.length;A++)Q[A].rotation.z=$*(.04+A%3*.015);Te.intensity=.85+Math.sin(re*2.5)*.35}}}function W_(){const s=new ue;s.name="LogCabin";const e=new G({color:7228206,roughness:.88}),t=new G({color:4862495,roughness:.92}),n=new G({color:5717286,roughness:.95}),i=new T(new le(3.8,.25,3),n);i.position.y=.125,i.receiveShadow=!0,s.add(i);const r=.14,o=7;for(let u=0;u<o;u++){const f=.25+r+u*(r*1.85),g=new T(new ie(r,r,3.8,10),e);g.rotation.z=Math.PI/2,g.position.set(0,f,-1.3),g.castShadow=!0,g.receiveShadow=!0,s.add(g);const _=new T(new ie(r,r,2.8,10),e);_.rotation.x=Math.PI/2,_.position.set(-1.7,f,0),_.castShadow=!0,_.receiveShadow=!0,s.add(_);const m=new T(new ie(r,r,2.8,10),e);m.rotation.x=Math.PI/2,m.position.set(1.7,f,0),m.castShadow=!0,m.receiveShadow=!0,s.add(m)}for(const u of[-1.7,1.7]){const f=new T(new ie(.15,.17,2.2,10),e);f.position.set(u,1.2,1.25),f.castShadow=!0,s.add(f)}const a=new T(new ie(.13,.13,3.7,10),e);a.rotation.z=Math.PI/2,a.position.set(0,2.22,1.25),a.castShadow=!0,a.receiveShadow=!0,s.add(a);const c=new T(new le(3.1,.15,.55),n);c.position.set(0,.65,-.85),c.castShadow=!0,s.add(c);const l=new T(new le(2.5,.16,3.5),t);l.position.set(-1.05,2.55,0),l.rotation.z=.42,l.castShadow=!0,s.add(l);const h=new T(new le(2.5,.16,3.5),t);h.position.set(1.05,2.55,0),h.rotation.z=-.42,h.castShadow=!0,s.add(h);const d=V_(e,t);return d.position.set(0,2.42,1.62),s.add(d),s}function V_(s,e){const t=new ue,n=new G({color:2830131,roughness:.55,metalness:.7});for(const d of[-.58,.58]){const u=new T(new le(.06,.34,.36),n);u.position.set(d,.08,-.18),u.castShadow=!0,t.add(u)}const i=1.68,r=.48,o=.08,a=new T(new le(i,r,o),s);a.castShadow=!0,a.receiveShadow=!0,t.add(a);for(const d of[-r/2+.03,r/2-.03]){const u=new T(new le(i+.06,.055,o+.025),e);u.position.set(0,d,0),u.castShadow=!0,t.add(u)}const c=X_("7 Wege"),l=new G({map:c??void 0,color:c?16777215:14464116,roughness:.72,metalness:.05}),h=new T(new Vs(i-.06,r-.1),l);return h.position.z=o/2+.004,t.add(h),t}function X_(s){if(typeof document>"u")return null;const e=document.createElement("canvas");e.width=512,e.height=160;const t=e.getContext("2d");if(!t)return null;const n=t.createLinearGradient(0,0,0,e.height);n.addColorStop(0,"#4e331e"),n.addColorStop(.5,"#5d3e25"),n.addColorStop(1,"#442c19"),t.fillStyle=n,t.fillRect(0,0,e.width,e.height),t.strokeStyle="rgba(35, 20, 10, 0.35)",t.lineWidth=3;for(let o=16;o<e.height;o+=22)t.beginPath(),t.moveTo(0,o),t.bezierCurveTo(e.width*.33,o+(o%40-20)*.25,e.width*.66,o-(o%40-20)*.25,e.width,o),t.stroke();t.strokeStyle="#c89d54",t.lineWidth=4,t.strokeRect(14,14,e.width-28,e.height-28),t.fillStyle="#262a2e";for(const[o,a]of[[28,28],[e.width-28,28],[28,e.height-28],[e.width-28,e.height-28]])t.beginPath(),t.arc(o,a,6,0,Math.PI*2),t.fill();t.font='bold 86px Georgia, "Times New Roman", serif',t.textAlign="center",t.textBaseline="middle",t.fillStyle="#1f1209",t.fillText(s,e.width/2+4,e.height/2+5);const i=t.createLinearGradient(0,32,0,e.height-32);i.addColorStop(0,"#fff3d1"),i.addColorStop(.55,"#f0c878"),i.addColorStop(1,"#cfa04e"),t.fillStyle=i,t.fillText(s,e.width/2,e.height/2+1);const r=new d0(e);return r.needsUpdate=!0,r}function q_(){const s=new ue;s.name="LumberjackCamp";const e=new G({color:5059616,roughness:.92,flatShading:!0}),t=new G({color:14267260,roughness:.78}),n=new G({color:13147490,roughness:.82,flatShading:!0}),i=new G({color:6045222,roughness:.9}),r=new G({color:12096346,roughness:.96}),o=new G({color:4541524,roughness:.42,metalness:.75,flatShading:!0}),a=new G({color:6449003,roughness:.92,flatShading:!0}),c=new G({color:3892022,roughness:.88,flatShading:!0}),l=[[-3.4,.2,2.1],[3.5,-.2,2.2],[-1.6,1.6,1.35],[.3,1.1,1.5]];for(const[I,U,V]of l){const j=new T(new ie(V,V+.2,.03,18),r);j.position.set(I,.036,U),j.receiveShadow=!0,j.userData={interactableType:"lumber_camp"},s.add(j)}const h=new ue;h.position.set(-3.7,0,.2),h.rotation.y=.35;for(const[I,U,V]of[[-1.25,-.55,1.75],[1.25,-.55,1.75],[-1.25,.55,2.05],[1.25,.55,2.05]]){const j=new T(new ie(.08,.09,V,8),e);j.position.set(I,V/2,U),j.castShadow=!0,j.userData={interactableType:"lumber_camp"},h.add(j)}const d=new T(new le(2.85,.1,1.45),i);d.position.set(0,1.95,0),d.rotation.x=-.24,d.castShadow=!0,d.receiveShadow=!0,d.userData={interactableType:"lumber_camp"},h.add(d);for(let I=0;I<6;I++)for(let V=0;V<9;V++){const j=-1.04+V*.26+I%2*.06,Q=.14+I*.22,oe=new T(new ie(.11,.12,.92,7),(I+V)%2===0?n:e);oe.rotation.x=Math.PI/2,oe.rotation.z=(I*3+V)%5*.03,oe.position.set(j,Q,0),oe.castShadow=!0,oe.userData={interactableType:"lumber_camp"},h.add(oe);const Te=new T(new as(.095,7),t);Te.position.set(j,Q,.465),Te.userData={interactableType:"lumber_camp"},h.add(Te)}s.add(h);const u=new ue;u.position.set(3.75,0,-.3),u.rotation.y=-.32;const f=[[-.55,.24,3.2],[0,.25,3.3],[.55,.24,3.1],[-.28,.66,3],[.28,.66,3.05],[0,1.06,2.85]];for(const[I,U,V]of f){const j=new T(new ie(.24,.26,V,10),e);j.rotation.x=Math.PI/2,j.position.set(I,U,0),j.castShadow=!0,j.receiveShadow=!0,j.userData={interactableType:"lumber_camp"},u.add(j);for(const Q of[-1,1]){const oe=new T(new as(.22,10),t);oe.position.set(I,U,Q*(V/2+.005)),Q===-1&&(oe.rotation.y=Math.PI),oe.userData={interactableType:"lumber_camp"},u.add(oe)}}const g=new ue;g.position.set(-1.35,0,.4);for(const I of[-.55,.55])for(const U of[-.38,.38]){const V=new T(new le(.09,1.05,.09),i);V.position.set(0,.48,I),V.rotation.z=U,V.castShadow=!0,V.userData={interactableType:"lumber_camp"},g.add(V)}const _=new T(new ie(.18,.19,1.85,9),e);_.rotation.x=Math.PI/2,_.position.set(0,.78,0),_.castShadow=!0,_.userData={interactableType:"lumber_camp"},g.add(_);const m=new T(new le(1.15,.14,.018),o);m.position.set(.12,.86,.1),m.rotation.z=-.18,m.castShadow=!0,m.userData={interactableType:"lumber_camp"},g.add(m);for(const I of[-.46,.7]){const U=new T(new ie(.025,.025,.28,7),n);U.position.set(I,.94-I*.15,.1),U.userData={interactableType:"lumber_camp"},g.add(U)}u.add(g),s.add(u);const p=new ue;p.position.set(-1.65,0,1.55);const x=new T(new ie(.42,.46,.68,10),e);x.position.y=.34,x.castShadow=!0,x.receiveShadow=!0,x.userData={interactableType:"lumber_camp"},p.add(x);const v=new T(new ie(.39,.39,.02,10),t);v.position.y=.685,v.userData={interactableType:"lumber_camp"},p.add(v);const y=new ue;y.position.set(.05,.72,0),y.rotation.z=.48,y.rotation.y=.3;const P=new T(new le(.28,.16,.045),o);P.position.set(.06,.02,0),P.castShadow=!0,P.userData={interactableType:"lumber_camp"},y.add(P);const E=new T(new ie(.026,.032,.78,8),n);E.position.set(-.04,.38,0),E.castShadow=!0,E.userData={interactableType:"lumber_camp"},y.add(E),p.add(y);for(const[I,U,V]of[[-.65,.25,.4],[-.52,-.35,1.2],[.58,.3,-.7],[.62,-.22,.9]]){const j=new T(new ie(.09,.1,.48,5),n);j.rotation.z=Math.PI/2,j.rotation.y=V,j.position.set(I,.09,U),j.castShadow=!0,j.userData={interactableType:"lumber_camp"},p.add(j)}s.add(p);const R=new ue;R.position.set(2.05,0,1.65);for(let I=0;I<9;I++){const U=I/9*Math.PI*2,V=new T(new gt(.16,0),a);V.position.set(Math.cos(U)*.52,.09,Math.sin(U)*.52),V.scale.set(1.1,.75,1),V.castShadow=!0,V.userData={interactableType:"lumber_camp"},R.add(V)}const C=new G({color:16739098,emissive:15091712,emissiveIntensity:1.2,roughness:.4,flatShading:!0}),w=new T(new Ue(.24,.52,7),C);w.position.y=.28,w.userData={interactableType:"lumber_camp"},R.add(w);const M=new kt(16747579,1.15,7.5);M.position.set(0,.65,0),R.add(M),s.add(R);const N=new ue;N.position.set(.3,0,1.55);const H=new T(new ie(.68,.88,.62,12),e);H.position.y=.31,H.castShadow=!0,H.receiveShadow=!0,H.userData={interactableType:"wood_woman"},N.add(H);const z=new T(new ie(.64,.64,.025,12),t);z.position.y=.625,z.userData={interactableType:"wood_woman"},N.add(z);const X=new T(new gt(.28,1),c);X.position.set(-.48,.42,.22),X.scale.set(1.2,.55,1.1),N.add(X),s.add(N);const Z=[[-5.2,-2.6,.48,.52],[-5.8,1.4,.55,.6],[-4.6,3.8,.44,.46],[-2.1,4.5,.58,.64],[.4,4.8,.5,.54],[2.9,4.3,.52,.58],[5.1,2.8,.46,.5],[5.9,-.4,.6,.66],[4.8,-3.2,.45,.48],[-2.8,-3.8,.42,.46],[2.6,-3.9,.44,.5]];for(const[I,U,V,j]of Z){const Q=new ue;Q.position.set(I,0,U);const oe=new T(new ie(V,V*1.28,j,9),e);oe.position.y=j/2,oe.castShadow=!0,oe.receiveShadow=!0,oe.userData={interactableType:"lumber_camp"},Q.add(oe);const Te=new T(new ie(V*.94,V*.94,.02,9),t);Te.position.y=j+.01,Te.userData={interactableType:"lumber_camp"},Q.add(Te),s.add(Q)}return{group:s,update:I=>{const U=.88+.12*Math.sin(I*7.5)+.06*Math.cos(I*13.2);w.scale.set(1,U,1),M.intensity=1.05*U}}}function Y_(){const s=new ue;s.name="MountainCave";const e=new G({color:3883592,roughness:.94,flatShading:!0}),t=new G({color:5397347,roughness:.9,flatShading:!0}),n=new G({color:7042430,roughness:.86,flatShading:!0}),i=new G({color:4021306,roughness:.92,flatShading:!0}),r=new G({color:4862495,roughness:.9}),o=new G({color:3547924,roughness:.92}),a=new G({color:3093561,metalness:.7,roughness:.45}),c=new wt({color:329482}),l=new G({color:14216447,metalness:.88,roughness:.2,emissive:3232368,emissiveIntensity:.75}),h=new G({color:16769690,emissive:16754740,emissiveIntensity:1.4,roughness:.2}),d=new T(new gt(5.6,1),e);d.position.set(0,4.8,-5.6),d.scale.set(1.25,1.45,.95),d.rotation.set(.15,.5,-.1),d.castShadow=!0,d.receiveShadow=!0,s.add(d);const u=new T(new gt(3.8,1),t);u.position.set(-3.8,4.9,-4.6),u.scale.set(1.05,1.35,.9),u.rotation.set(-.2,.8,.15),u.castShadow=!0,u.receiveShadow=!0,s.add(u);const f=new T(new gt(4.1,1),t);f.position.set(3.9,5.2,-4.8),f.scale.set(1.1,1.4,.92),f.rotation.set(.2,-.6,-.12),f.castShadow=!0,f.receiveShadow=!0,s.add(f);const g=new T(new gt(3.2,1),n);g.position.set(-3.5,2.1,-2.1),g.scale.set(1.12,1.15,.95),g.rotation.set(.1,.35,-.08),g.castShadow=!0,g.receiveShadow=!0,s.add(g);const _=new T(new gt(2.1,1),e);_.position.set(-2.3,1.6,-.75),_.scale.set(1,1.1,.85),_.castShadow=!0,_.receiveShadow=!0,s.add(_);const m=new T(new gt(3.4,1),n);m.position.set(3.6,2.2,-2.2),m.scale.set(1.15,1.2,.95),m.rotation.set(-.1,-.4,.08),m.castShadow=!0,m.receiveShadow=!0,s.add(m);const p=new T(new gt(2.2,1),e);p.position.set(2.35,1.65,-.75),p.scale.set(1,1.12,.85),p.castShadow=!0,p.receiveShadow=!0,s.add(p);const x=new T(new gt(2.4,1),t);x.position.set(0,3.55,-.45),x.scale.set(1.55,.68,.95),x.rotation.x=.12,x.castShadow=!0,x.receiveShadow=!0,s.add(x);for(const[L,I,U,V,j,Q]of[[0,4.15,-.35,1.6,.28,.9],[-3.1,3.45,-1.5,1.3,.3,.85],[3.2,3.6,-1.6,1.4,.3,.85],[-2.1,.35,.65,.9,.25,.7],[2.2,.35,.6,.85,.25,.7]]){const oe=new T(new gt(.95,1),i);oe.position.set(L,I,U),oe.scale.set(V,j,Q),oe.receiveShadow=!0,s.add(oe)}for(const[L,I,U,V]of[[-1.75,.38,.92,.48],[-2.45,.28,.88,.36],[1.78,.42,.9,.52],[2.5,.3,.85,.38]]){const j=new T(new gt(V,0),n);j.position.set(L,I,U),j.rotation.set(L,U,.4),j.castShadow=!0,j.receiveShadow=!0,s.add(j)}const v=new T(new le(2.35,2.65,2.2),c);v.position.set(0,1.32,-.2),s.add(v);const y=new T(new ie(1.15,1.15,2.2,16),c);y.rotation.x=Math.PI/2,y.position.set(0,2.2,-.2),s.add(y);const P=1.32,E=2.05,R=9;for(let L=0;L<R;L++){const I=L/(R-1),U=Math.PI*(.08+I*.84),V=-Math.cos(U)*P,j=E+Math.sin(U)*P*.82,Q=L===Math.floor(R/2),oe=new T(new le(Q?.46:.38,Q?.52:.42,.55),L%2===0?n:t);oe.position.set(V,j,.78),oe.rotation.z=U-Math.PI/2,oe.castShadow=!0,oe.receiveShadow=!0,s.add(oe)}const C=new T(new ie(.19,.23,2.68,8),r);C.position.set(-1.22,1.34,.96),C.rotation.z=-.04,C.castShadow=!0,C.receiveShadow=!0,s.add(C);const w=new T(new ie(.19,.23,2.68,8),r);w.position.set(1.22,1.34,.96),w.rotation.z=.04,w.castShadow=!0,w.receiveShadow=!0,s.add(w);const M=new T(new ie(.21,.21,3.05,8),r);M.rotation.z=Math.PI/2,M.position.set(0,2.64,.98),M.castShadow=!0,M.receiveShadow=!0,s.add(M);for(const L of[-1,1]){const I=new T(new le(.16,.68,.18),o);I.position.set(L*.95,2.34,.96),I.rotation.z=L*.72,I.castShadow=!0,s.add(I);const U=new T(new ie(.22,.22,.1,8),a);U.position.set(L*1.21,1.95,.96),s.add(U)}const N=new T(new le(2.5,.24,.09),o);N.position.set(0,2.08,1.1),N.rotation.z=-.05,N.castShadow=!0,s.add(N);for(const L of[.35,.72,1.08]){const I=new T(new le(1.35,.07,.18),o);I.position.set(0,.035,L),I.receiveShadow=!0,s.add(I)}for(const L of[-.42,.42]){const I=new T(new le(.06,.08,1.15),a);I.position.set(L,.09,.65),I.receiveShadow=!0,s.add(I)}const H=new T(new le(.06,.06,.26),a);H.position.set(1.22,1.82,1.12),s.add(H);const z=new T(new ie(.09,.07,.22,8),h);z.position.set(1.22,1.68,1.2),s.add(z);const X=new T(new Ue(.13,.1,8),a);X.position.set(1.22,1.81,1.2),s.add(X);const Z=new kt(16757844,1.1,6.5);Z.position.set(1.22,1.68,1.32),s.add(Z);for(const[L,I,U,V]of[[-1.72,1.38,.82,.3],[-1.95,1.62,.76,-.4],[1.68,1.25,.8,-.25],[1.55,2.25,.72,.5],[-.95,3.05,.62,.2]]){const j=new T(new Ht(.2,0),l);j.position.set(L,I,U),j.scale.set(1.65,.65,.75),j.rotation.z=V,s.add(j)}return s.traverse(L=>{L.isMesh&&(L.userData={interactableType:"cave"})}),s}function K_(){const s=new ue;s.name="NixieNpc";const e=new wt({transparent:!0,opacity:0,depthWrite:!1}),t=new T(new ie(.68,.78,2,12),e);t.position.y=1,t.userData={interactableType:"nixie"},s.add(t);const n=new G({color:2398606,emissive:469800,emissiveIntensity:.35,roughness:.25,metalness:.45}),i=new G({color:5231045,emissive:933176,emissiveIntensity:.4,roughness:.3,metalness:.25}),r=new G({color:14281960,roughness:.45,emissive:0}),o=new G({color:1796963,roughness:.35,metalness:.3,emissive:0}),a=new G({color:1527124,roughness:.55,emissive:0}),c=new G({color:16765276,emissive:12090644,emissiveIntensity:.75,roughness:.2,metalness:.85}),l=new ue;l.position.y=.58,s.add(l);const h=new T(new pt(.28,12,10),n);h.scale.set(1.05,.75,1.15),h.position.set(0,.08,.05),h.castShadow=!0,l.add(h);const d=new T(new ie(.19,.25,.52,12),n);d.position.set(0,-.02,.32),d.rotation.x=Math.PI/2.8,d.castShadow=!0,l.add(d);const u=new T(new ie(.09,.18,.48,12),n);u.position.set(0,-.26,.56),u.rotation.x=Math.PI/5.2,u.castShadow=!0,l.add(u);const f=new ue;f.position.set(0,-.44,.68);const g=new T(new Ue(.18,.36,8),i);g.scale.set(1,1,.28),g.position.set(-.12,-.04,.12),g.rotation.x=Math.PI/2.3,g.rotation.z=.48,f.add(g);const _=new T(new Ue(.18,.36,8),i);_.scale.set(1,1,.28),_.position.set(.12,-.04,.12),_.rotation.x=Math.PI/2.3,_.rotation.z=-.48,f.add(_),l.add(f);const m=new T(new ie(.17,.21,.52,12),o);m.position.set(0,.38,-.02),m.castShadow=!0,l.add(m);const p=new T(new St(.16,.18,8,10),r);p.rotation.z=Math.PI/2,p.position.set(0,.58,-.02),p.castShadow=!0,l.add(p);const x=new T(new pt(.17,14,12),r);x.position.set(0,.82,0),x.castShadow=!0,l.add(x);const v=new T(new pt(.182,14,12),a);v.position.set(0,.85,-.03),l.add(v);const y=new T(new Ue(.22,.68,10),a);y.position.set(0,.56,-.14),y.rotation.x=.18,y.castShadow=!0,l.add(y);const P=new T(new qn(.165,.022,8,18),c);P.rotation.x=Math.PI/2-.15,P.position.set(0,.94,.01),l.add(P);const E=new T(new St(.055,.34,6,8),r);E.position.set(-.24,.42,.08),E.rotation.z=.28,E.rotation.x=-.35,l.add(E);const R=new T(new St(.055,.34,6,8),r);R.position.set(.23,.46,.16),R.rotation.z=-.25,R.rotation.x=-.75,l.add(R);const C=new T(new Ht(.09,1),c);C.position.set(.26,.56,.36),l.add(C);const w=new G({color:7271142,emissive:1878172,emissiveIntensity:.9,roughness:.2,metalness:.4}),M=new T(new Ht(.16,0),w);M.position.y=1.92,s.add(M);const N=new kt(6088408,1,5.2);return N.position.set(0,1.65,.4),s.add(N),s.traverse(z=>{z.isMesh&&(z.userData={interactableType:"nixie"})}),s.rotation.y=-Math.PI/2,{group:s,update:(z,X,Z)=>{l.position.y=.58+Math.sin(z*2.1)*.025,f.rotation.x=Math.sin(z*3.2)*.18,C.rotation.y=z*1.8,M.position.y=1.92+Math.sin(z*2.6+.5)*.07,M.rotation.y=z*1.35;const L=X.x-s.position.x,I=X.z-s.position.z,U=Math.hypot(L,I);U<9&&U>.1&&(s.rotation.y=Math.atan2(L,I));const V=Z?1722950:0;o.emissive.setHex(V),a.emissive.setHex(V),n.emissive.setHex(Z?2059878:469800),w.emissive.setHex(Z?8454132:1878172)}}}function j_(){const s=new ue;s.name="NixiePond";const e=new G({color:992810,roughness:.95}),t=new T(new ie(4.65,4.3,.06,36),e);t.position.y=.01,t.receiveShadow=!0,t.userData={interactableType:"pond"},s.add(t);const n=new G({color:1994616,emissive:733496,emissiveIntensity:.45,roughness:.14,metalness:.28,transparent:!0,opacity:.84}),i=new T(new ie(4.55,4.5,.05,40),n);i.position.y=.07,i.receiveShadow=!0,i.userData={interactableType:"pond"},s.add(i);const r=new wt({color:9169120,side:Ot,transparent:!0,opacity:.32}),o=new T(new cs(1.15,1.23,32),r);o.rotation.x=-Math.PI/2,o.position.set(-1.8,.098,0),s.add(o);const a=new wt({color:16767357,side:Ot,transparent:!0,opacity:.28}),c=new T(new cs(.65,.73,28),a);c.rotation.x=-Math.PI/2,c.position.set(-2.65,.099,.85),s.add(c);const l=new G({color:4937308,roughness:.86,flatShading:!0}),h=new G({color:6451061,roughness:.82,flatShading:!0}),d=new G({color:3498299,roughness:.92,flatShading:!0}),u=new ue;u.position.set(-1.8,0,0);const f=new T(new ie(.78,1.05,.62,9),l);f.position.set(0,.28,0),f.castShadow=!0,f.receiveShadow=!0,f.userData={interactableType:"nixie"},u.add(f);const g=new T(new ie(.68,.78,.14,8),h);g.position.set(.04,.54,-.03),g.castShadow=!0,g.receiveShadow=!0,g.userData={interactableType:"nixie"},u.add(g);const _=new T(new gt(.46,0),h);_.scale.set(1.15,.65,.95),_.position.set(.55,.22,.38),_.castShadow=!0,_.receiveShadow=!0,_.userData={interactableType:"nixie"},u.add(_);const m=new T(new gt(.32,0),d);m.scale.set(1.3,.35,1.1),m.position.set(-.32,.56,-.28),u.add(m),s.add(u);const p=new ue;p.position.set(-2.65,.03,.85);const x=new G({color:16766034,emissive:13208082,emissiveIntensity:.95,roughness:.18,metalness:.85}),v=new G({color:12147967,emissive:8069026,emissiveIntensity:1.25,roughness:.15,metalness:.5}),y=new T(new ie(.42,.52,.08,12),x);y.position.y=.02,y.userData={interactableType:"pond"},p.add(y);const P=new T(new qn(.22,.045,8,16),x);P.rotation.x=Math.PI/2-.18,P.position.set(0,.08,0),P.userData={interactableType:"pond"},p.add(P);const E=new T(new Ht(.13,0),v);E.position.set(0,.11,0),E.userData={interactableType:"pond"},p.add(E);const R=new kt(16763467,1.2,4.2);R.position.set(0,.35,0),p.add(R),s.add(p);const C=26;for(let L=0;L<C;L++){const I=L/C*Math.PI*2,U=Math.cos(I)<-.65,V=4.48+L%3*.16,j=Math.cos(I)*V,Q=Math.sin(I)*V,oe=U?.34:.45+L%4*.14,Te=new T(new gt(oe,0),L%2===0?l:h);if(Te.scale.set(1.25,U?.32:.65+L%3*.18,1.05),Te.position.set(j,U?.06:.18,Q),Te.rotation.y=I+L*.5,Te.castShadow=!0,Te.receiveShadow=!0,Te.userData={interactableType:"pond"},s.add(Te),L%3===0&&!U){const q=new T(new gt(oe*.72,0),d);q.scale.set(1.2,.35,1),q.position.set(j*.97,.32,Q*.97),s.add(q)}}const w=new G({color:2977342,roughness:.75}),M=new G({color:16242406,emissive:4857910,emissiveIntensity:.3,roughness:.4}),N=[[-.6,-1.9,.36,!0],[-.2,-2.4,.28,!1],[1.4,-1.5,.38,!0],[1.8,1.2,.34,!1],[1.2,1.7,.32,!0],[-.8,2.2,.35,!0],[-1.4,2.5,.27,!1],[-3.1,-1.3,.3,!0]];for(const[L,I,U,V]of N){const j=new T(new ie(U,U,.015,14),w);if(j.position.set(L,.1,I),s.add(j),V){const Q=new T(new Ue(.1,.12,7),M);Q.position.set(L,.15,I),s.add(Q)}}const H=new G({color:4614965,roughness:.85}),z=new G({color:4860952,roughness:.9}),X=[-1.2,-.6,.1,.8,1.45,2.15,-2.1];for(const L of X)for(let I=0;I<5;I++){const U=L+(I-2)*.045,V=4.15+I%2*.22,j=Math.cos(U)*V,Q=Math.sin(U)*V,oe=1.15+I%3*.24,Te=new T(new ie(.018,.026,oe,6),H);if(Te.position.set(j,oe/2,Q),Te.rotation.z=(I-2)*.05,Te.castShadow=!0,s.add(Te),I%2===0){const q=new T(new ie(.038,.038,.22,7),z);q.position.set(j,oe-.16,Q),s.add(q)}}return{group:s,update:L=>{const I=.5+.5*Math.sin(L*1.8),U=.5+.5*Math.sin(L*2.3+1.4);o.scale.setScalar(.95+I*.16),r.opacity=.18+(1-I)*.22,c.scale.setScalar(.9+U*.22),a.opacity=.16+(1-U)*.24,E.rotation.y=L*1.5,R.intensity=1.05+Math.sin(L*3.1)*.35}}}function Z_(){const s=new ue;s.name="Signpost";const e=new G({color:6045222,roughness:.9}),t=new T(new ie(.45,.58,.35,10),new G({color:7304048,roughness:.95}));t.position.y=.175,t.receiveShadow=!0,t.userData={interactableType:"signpost"},s.add(t);const n=3.1,i=new T(new ie(.13,.16,n,12),e);i.position.y=n/2+.2,i.castShadow=!0,i.userData={interactableType:"signpost"},s.add(i);const r=new T(new Ue(.2,.3,12),e);r.position.y=n+.35,r.userData={interactableType:"signpost"},s.add(r);const o=new Map;return mt.forEach((c,l)=>{const h=new ue,d=2.95-l*.24;h.position.set(0,d,0),h.rotation.y=-c.angleRad+Math.PI/2;const u=new G({color:c.colorHex,roughness:.65,emissive:0});o.set(c.id,u);const f=new T(new le(.95,.16,.06),u);f.position.x=.52,f.castShadow=!0,f.userData={interactableType:"sign",pathId:c.id},h.add(f);const g=new T(new Ue(.11,.22,4),u);g.rotation.z=-Math.PI/2,g.rotation.x=Math.PI/4,g.position.x=1.08,g.userData={interactableType:"sign",pathId:c.id},h.add(g),s.add(h)}),{group:s,highlightSign:(c,l=null)=>{o.forEach((h,d)=>{d===c?h.emissive.setHex(5587985):d===l?h.emissive.setHex(3352842):h.emissive.setHex(0)})}}}function J_(){const s=new ue;s.name="TreasureChest";const e=new G({color:5912606,roughness:.85,emissive:0}),t=new G({color:12096070,roughness:.4,metalness:.65,emissive:0}),n=new G({color:2496268,roughness:.95}),i=new G({color:16767083,emissive:14393384,emissiveIntensity:.9,roughness:.25}),r=.92,o=.44,a=.58,c=new T(new le(r,o,a),e);c.position.y=o/2,c.castShadow=!0,c.receiveShadow=!0,s.add(c);const l=new T(new le(r-.1,.04,a-.1),n);l.position.y=o-.01,s.add(l);const h=new T(new Ht(.14,1),i);h.position.set(0,o+.02,0),h.scale.set(1.6,.55,1.1),s.add(h);const d=new kt(16764764,0,3.2);d.position.set(0,o+.22,.05),s.add(d);for(const v of[-.32,.32]){const y=new T(new le(.06,o+.01,a+.02),t);y.position.set(v,o/2,0),y.castShadow=!0,s.add(y)}const u=new T(new le(.14,.18,.04),t);u.position.set(0,o-.04,a/2+.015),s.add(u);const f=new ue;f.position.set(0,o,-a/2),s.add(f);const g=.22,_=new T(new le(r,g,a),e);_.position.set(0,g/2,a/2),_.castShadow=!0,_.receiveShadow=!0,f.add(_);const m=new T(new ie(a/2,a/2,r,12,1,!1,0,Math.PI),e);m.rotation.z=Math.PI/2,m.rotation.y=Math.PI/2,m.scale.set(1,.45,1),m.position.set(0,g,a/2),m.castShadow=!0,f.add(m);for(const v of[-.32,.32]){const y=new T(new le(.065,g+.06,a+.02),t);y.position.set(v,g/2+.02,a/2),y.castShadow=!0,f.add(y)}s.traverse(v=>{v.isMesh&&(v.userData={interactableType:"chest"})});let p=0;return{group:s,update:(v,y,P)=>{const E=y?-1.25:0,R=Math.min(1,v*8.5);p+=(E-p)*R,f.rotation.x=p;const C=Math.min(1,Math.abs(p)/1.25);d.intensity=C*1.3,h.visible=C>.05,e.emissive.setHex(P?2825484:0),t.emissive.setHex(P?3877902:0)}}}function $_(){const s=new ue;s.name="WeirBridgeScene";const e=new G({color:6055017,roughness:.88,flatShading:!0}),t=new G({color:4409935,roughness:.92,flatShading:!0}),n=new G({color:7228978,roughness:.85}),i=new G({color:4862494,roughness:.9}),r=new G({color:3093819,roughness:.45,metalness:.75}),o=new G({color:3696188,roughness:.92,flatShading:!0}),a=new ue;for(const L of[-2.95,2.95]){const I=new T(new le(2.7,.36,.75),e);I.position.set(0,.08,L),I.receiveShadow=!0,I.castShadow=!0,I.userData={interactableType:"path",pathId:3},a.add(I)}for(const L of[-.95,0,.95]){const I=new T(new le(.22,.18,6.1),i);I.position.set(L,.04,0),I.castShadow=!0,a.add(I)}const c=16;for(let L=0;L<c;L++){const I=-2.65+L/(c-1)*5.3,U=new T(new le(2.36,.06,.28),n);U.position.set(0,.075,I),U.receiveShadow=!0,U.castShadow=!0,U.userData={interactableType:"path",pathId:3},a.add(U)}for(const L of[-1,1]){const I=L*1.22;for(const j of[-2.7,-1.35,0,1.35,2.7]){const Q=new T(new le(.24,.95,.24),e);Q.position.set(I,.48,j),Q.castShadow=!0,Q.receiveShadow=!0,Q.userData={interactableType:"weir"},a.add(Q)}const U=new T(new le(.12,.1,5.5),i);U.position.set(I,.88,0),U.castShadow=!0,U.userData={interactableType:"weir"},a.add(U);const V=new T(new le(.09,.08,5.5),n);V.position.set(I,.52,0),V.castShadow=!0,V.userData={interactableType:"weir"},a.add(V)}s.add(a);const l=new ue;l.position.set(-1.38,0,0);for(const L of[-1.75,1.75]){const I=new T(new le(.55,2.35,.55),t);I.position.set(0,1.15,L),I.castShadow=!0,I.receiveShadow=!0,I.userData={interactableType:"weir"},l.add(I)}const h=new T(new le(.42,.28,4.1),i);h.position.set(0,2.25,0),h.castShadow=!0,h.userData={interactableType:"weir"},l.add(h);const d=new T(new le(.18,1.45,3.1),i);d.position.set(0,.68,0),d.castShadow=!0,d.receiveShadow=!0,d.userData={interactableType:"weir"},l.add(d);for(const L of[.35,.75,1.15]){const I=new T(new le(.22,.08,3.12),r);I.position.set(0,L,0),I.userData={interactableType:"weir"},l.add(I)}for(const L of[-.85,.85]){const I=new T(new ie(.055,.055,2.3,8),r);I.position.set(0,1.45,L),I.userData={interactableType:"weir"},l.add(I)}const u=new T(new qn(.42,.055,8,20),r);u.rotation.y=Math.PI/2,u.position.set(.22,1.65,1.75),u.userData={interactableType:"weir"},l.add(u);for(let L=0;L<4;L++){const I=new T(new ie(.03,.03,.82,6),r);I.rotation.x=L*Math.PI/4,I.position.set(.22,1.65,1.75),I.userData={interactableType:"weir"},l.add(I)}s.add(l);const f=new G({color:1797764,emissive:667192,emissiveIntensity:.42,roughness:.15,metalness:.25,transparent:!0,opacity:.88}),g=new T(new ie(3.9,3.7,.72,32),f);g.scale.set(1.18,1,.92),g.position.set(-5.4,.08,0),g.receiveShadow=!0,g.userData={interactableType:"weir"},s.add(g);const _=new T(new le(2.1,.72,3.15),f);_.position.set(-2.35,.08,0),_.userData={interactableType:"weir"},s.add(_);const m=new T(new gt(1.65,1),e);m.scale.set(1.1,1.35,1.2),m.position.set(-9.5,1.1,-.4),m.castShadow=!0,m.receiveShadow=!0,m.userData={interactableType:"weir"},s.add(m);const p=new G({color:9234687,emissive:2521231,emissiveIntensity:.65,roughness:.2,transparent:!0,opacity:.85}),x=new T(new ie(.28,.55,1.45,12),p);x.position.set(-8.35,.85,-.35),x.rotation.z=-.35,s.add(x);const v=new T(new cs(.55,.72,24),new wt({color:11924735,side:Ot,transparent:!0,opacity:.45}));v.rotation.x=-Math.PI/2,v.position.set(-7.9,.455,-.35),s.add(v);const y=[[-2.8,-2.2,.65],[-4.2,-3.3,.78],[-6.1,-3.5,.82],[-8,-2.6,.95],[-8.4,2.1,.88],[-6.6,3.3,.76],[-4.5,3.4,.72],[-2.6,2.2,.62]];for(const[L,I,U]of y){const V=new T(new gt(U,0),e);V.scale.set(1.2,.72,1.05),V.position.set(L,.35,I),V.castShadow=!0,V.receiveShadow=!0,s.add(V)}const P=new ue;P.position.set(-5.2,.38,3.1);const E=new T(new gt(1.45,0),t);E.scale.set(1.35,1.15,.85),E.position.set(0,.95,.55),E.castShadow=!0,P.add(E);const R=new T(new Ue(1.85,1.1,7),o);R.position.set(0,1.85,.35),R.castShadow=!0,P.add(R);const C=new T(new le(1.6,.45,.7),e);C.position.set(1.35,.22,-.35),C.castShadow=!0,P.add(C),s.add(P);const w=new G({color:5853507,roughness:.95}),M=new G({color:2852766,emissive:866370,emissiveIntensity:.35,roughness:.2,transparent:!0,opacity:.82}),N=new T(new le(9.8,.04,2.85),w);N.position.set(3.5,.015,0),N.receiveShadow=!0,s.add(N);const H=new T(new le(9.6,.05,.85),M);H.position.set(3.4,.03,0),H.userData={interactableType:"weir"},s.add(H);const z=new wt({color:14678271,transparent:!0,opacity:.55}),X=new T(new le(.32,.07,2.6),z);X.position.set(-1.18,.045,0),s.add(X);for(let L=0;L<12;L++){const I=-.4+L*.72;for(const U of[-1,1]){const V=new T(new gt(.24+L%3*.08,0),L%2===0?e:t);V.scale.set(1.2,.55,1),V.position.set(I,.08,U*(1.15+L%2*.2)),V.castShadow=!0,s.add(V)}}return{group:s,update:L=>{const I=.5+.5*Math.sin(L*2.6);v.scale.setScalar(.92+I*.22),z.opacity=.4+I*.25}}}function Q_(){const s=new ue;s.name="WildHunterNpc";const e=new G({color:2969385,roughness:.85,flatShading:!0}),t=new G({color:4665114,roughness:.78,flatShading:!0}),n=new G({color:13938828,roughness:.72}),i=new G({color:4862750,roughness:.9}),r=new G({color:2309665,roughness:.82,flatShading:!0}),o=new G({color:15592941,roughness:.5,flatShading:!0}),a=new G({color:5912603,roughness:.7}),c=new G({color:14066744,metalness:.75,roughness:.28}),l=new G({color:4765766,emissive:2057758,emissiveIntensity:.65,roughness:.2,metalness:.3});for(const L of[-1,1]){const I=new T(new ie(.1,.085,.72,8),t);I.position.set(L*.16,.36,0),I.castShadow=!0,s.add(I);const U=new T(new le(.18,.22,.28),t);U.position.set(L*.16,.11,.04),U.castShadow=!0,s.add(U)}const h=new T(new le(.56,.65,.34),e);h.position.y=.98,h.castShadow=!0,s.add(h);const d=new T(new le(.12,.68,.36),t);d.position.set(0,.98,0),d.rotation.z=.38,s.add(d);const u=new T(new le(.58,.1,.36),t);u.position.y=.72,s.add(u);const f=new T(new le(.14,.12,.04),c);f.position.set(0,.72,.18),s.add(f);const g=new ue;g.position.set(.32,.74,.05),g.rotation.z=-.45,g.rotation.y=.3;const _=new T(new qn(.11,.024,7,14,Math.PI*1.4),c);g.add(_);const m=new T(new Ue(.065,.12,8),c);m.position.set(.1,.08,0),m.rotation.z=-1.2,g.add(m),s.add(g);const p=new T(new ie(.08,.065,.62,8),t);p.position.set(-.16,1.12,-.22),p.rotation.z=-.32,p.castShadow=!0,s.add(p);for(let L=0;L<3;L++){const I=new T(new Ue(.03,.16,5),o);I.position.set(-.19+L*.03,1.46,-.22),s.add(I)}const x=new T(new qn(.38,.025,6,16,Math.PI*.9),a);x.position.set(-.24,1.1,-.05),x.rotation.y=Math.PI/2,x.rotation.x=-.4,x.castShadow=!0,s.add(x);const v=new T(new pt(.19,12,12),n);v.position.set(0,1.44,0),v.castShadow=!0,s.add(v);const y=new T(new Ue(.15,.24,8),i);y.position.set(0,1.34,.12),y.rotation.x=.45,s.add(y);const P=new G({color:4026450,emissive:1587234,emissiveIntensity:.4});for(const L of[-1,1]){const I=new T(new pt(.024,8,8),P);I.position.set(L*.07,1.46,.18),s.add(I)}const E=new ue;E.position.set(0,1.54,0),E.rotation.x=-.12;const R=new T(new ie(.36,.38,.04,12),r);R.scale.set(1.15,1,1.25),E.add(R);const C=new T(new Ue(.24,.32,9),r);C.position.y=.16,E.add(C);const w=new T(new Ue(.045,.36,5),o);w.position.set(.16,.3,-.06),w.rotation.z=-.45,w.rotation.x=.2,E.add(w),s.add(E);const M=new ue;M.position.set(-.32,1.18,0);const N=new T(new St(.075,.36,6,8),e);N.position.y=-.18,N.castShadow=!0,M.add(N),s.add(M);const H=new ue;H.position.set(.32,1.18,0);const z=new T(new St(.075,.36,6,8),e);z.position.set(0,-.12,.12),z.rotation.x=-.65,z.castShadow=!0,H.add(z),s.add(H);const X=new T(new Ht(.15,0),l);return X.position.y=2.08,s.add(X),s.traverse(L=>{L.isMesh&&(L.userData={interactableType:"wild_hunter"})}),{group:s,update:(L,I,U)=>{X.position.y=2.08+Math.sin(L*2.6)*.06,X.rotation.y=L*1.4,l.emissiveIntensity=U?1.25:.65;const V=U?1.25:1;X.scale.set(V,V,V),H.rotation.x=-.25+Math.sin(L*2.8)*.22,M.rotation.z=.15+Math.sin(L*2.1)*.08;const j=I.x-s.position.x,Q=I.z-s.position.z,oe=Math.hypot(j,Q);if(oe<8.5&&oe>.1)s.rotation.y=Math.atan2(j,Q);else{const Te=Math.atan2(-42.6-s.position.x,23.2-s.position.z);s.rotation.y=Te}}}}function zl(s={}){const{interactableType:e="wood_woman",defaultFacingTarget:t}=s,n=new ue;n.name="WoodWomanNpc";const i=new G({color:5848357,roughness:.9,flatShading:!0}),r=new G({color:4156216,roughness:.85,flatShading:!0}),o=new G({color:12088106,roughness:.78,flatShading:!0}),a=new G({color:13215874,roughness:.75}),c=new G({color:13946820,roughness:.85}),l=new G({color:4665372,roughness:.9}),h=new G({color:6465604,emissive:1916946,emissiveIntensity:.35,roughness:.5}),d=new G({color:14261070,emissive:9394973,emissiveIntensity:.55,roughness:.25,metalness:.2}),u=new T(new Ue(.42,.72,9),i);u.position.y=.36,u.castShadow=!0,u.receiveShadow=!0,n.add(u);const f=new T(new le(.36,.52,.14),o);f.position.set(0,.38,.24),f.rotation.x=-.14,f.castShadow=!0,n.add(f);const g=new T(new ie(.22,.3,.46,9),i);g.position.y=.84,g.castShadow=!0,n.add(g);const _=new T(new Ue(.36,.42,9),r);_.position.y=.96,_.castShadow=!0,n.add(_);const m=new ue;m.position.set(0,.92,-.24),m.rotation.z=.22;for(let M=-2;M<=2;M++){const N=new T(new ie(.025,.03,.58,6),l);N.position.set(M*.04,0,Math.abs(M)%2*.03),N.castShadow=!0,m.add(N)}n.add(m);const p=new T(new pt(.18,12,12),a);p.position.set(0,1.22,.03),p.castShadow=!0,n.add(p);const x=new T(new pt(.195,10,10,0,Math.PI*2,0,Math.PI*.68),r);x.position.set(0,1.24,.01),x.rotation.x=-.25,x.castShadow=!0,n.add(x);for(const M of[-1,1]){const N=new T(new St(.03,.16,4,6),c);N.position.set(M*.14,1.14,.08),n.add(N)}const v=new G({color:16765565,emissive:10905620,emissiveIntensity:.45});for(const M of[-1,1]){const N=new T(new pt(.022,8,8),v);N.position.set(M*.06,1.23,.19),n.add(N)}const y=new T(new St(.055,.28,6,8),r);y.position.set(-.26,.86,.08),y.rotation.z=.28,y.rotation.x=-.35,y.castShadow=!0,n.add(y);const P=new T(new St(.055,.28,6,8),r);P.position.set(.26,.86,.12),P.rotation.z=-.25,P.rotation.x=-.55,P.castShadow=!0,n.add(P);const E=new ue;E.position.set(.32,0,.24);const R=new T(new ie(.032,.042,1.38,8),l);R.position.y=.69,R.castShadow=!0,E.add(R);for(const M of[-1,1]){const N=new T(new Ue(.055,.16,5),h);N.position.set(M*.05,1.4,0),N.rotation.z=-M*.65,E.add(N)}n.add(E);const C=new T(new Ht(.14,0),d);return C.position.y=1.72,n.add(C),n.traverse(M=>{M.isMesh&&(M.userData={interactableType:e})}),{group:n,update:(M,N,H)=>{C.position.y=1.72+Math.sin(M*2.5)*.05,C.rotation.y=M*1.3,E.rotation.z=Math.sin(M*1.8)*.035,d.emissiveIntensity=H?1.15:.55;const z=H?1.22:1;C.scale.set(z,z,z);const X=N.x-n.position.x,Z=N.z-n.position.z,L=Math.hypot(X,Z);if(L<8.5&&L>.1){const I=Math.atan2(X,Z);n.rotation.y=I}else if(t){const I=t.x-n.position.x,U=t.z-n.position.z;n.rotation.y=Math.atan2(I,U)}}}}class Ki{static instance;stemMat=new G({color:15789016,roughness:.85,flatShading:!0});stemBoleteMat=new G({color:14668728,roughness:.88,flatShading:!0});flyAgaricCapMat=new G({color:13117988,roughness:.5,flatShading:!0});dotMat=new G({color:16777215,roughness:.6});boleteCapMat=new G({color:5517846,roughness:.65,flatShading:!0});boleteSpongeMat=new G({color:14272651,roughness:.9,flatShading:!0});chanterelleMat=new G({color:15573793,roughness:.7,flatShading:!0});mossMat=new G({color:2704162,roughness:.95,flatShading:!0});constructor(){}static get(){return Ki.instance||(Ki.instance=new Ki),Ki.instance}}function ex(s,e){const t=new ue,n=new T(new ie(.035*s,.055*s,.28*s,7),e.stemMat);n.position.y=.14*s,n.castShadow=!0,t.add(n);const i=new T(new qn(.045*s,.012*s,4,8),e.stemMat);i.position.y=.21*s,i.rotation.x=Math.PI/2,t.add(i);const r=new T(new pt(.14*s,8,7,0,Math.PI*2,0,Math.PI*.56),e.flyAgaricCapMat);r.position.y=.26*s,r.scale.set(1.15,.95,1.15),r.castShadow=!0,t.add(r);const o=[[0,.13*s,0],[.08*s,.09*s,.04*s],[-.07*s,.08*s,.06*s],[.05*s,.07*s,-.07*s],[-.06*s,.09*s,-.05*s]];for(const[a,c,l]of o){const h=new T(new pt(.018*s,4,4),e.dotMat);h.position.set(a,.26*s+c,l),t.add(h)}return t}function tx(s,e){const t=new ue,n=new T(new ie(.055*s,.085*s,.26*s,8),e.stemBoleteMat);n.position.y=.13*s,n.castShadow=!0,t.add(n);const i=new T(new ie(.14*s,.14*s,.03*s,8),e.boleteSpongeMat);i.position.y=.25*s,t.add(i);const r=new T(new pt(.155*s,8,7,0,Math.PI*2,0,Math.PI*.52),e.boleteCapMat);return r.position.y=.26*s,r.scale.set(1.1,.82,1.1),r.castShadow=!0,t.add(r),t}function nx(s,e){const t=new ue,n=new T(new ie(.045*s,.025*s,.22*s,7),e.chanterelleMat);n.position.y=.11*s,n.castShadow=!0,t.add(n);const i=new T(new Ue(.13*s,.08*s,7),e.chanterelleMat);return i.position.y=.22*s,i.rotation.x=Math.PI,i.scale.set(1.1,1,.95),i.castShadow=!0,t.add(i),t}function Fl(s={}){const e=new ue;e.name="MushroomCluster";const t=s.type??"fly_agaric",n=s.scale??1,i=Ki.get(),r=new T(new ie(.24*n,.3*n,.02*n,7),i.mossMat);return r.position.y=.01*n,r.receiveShadow=!0,e.add(r),[{x:0,z:0,s:1,rx:.04,rz:-.06},{x:.11*n,z:.06*n,s:.68,rx:.12,rz:.14},{x:-.09*n,z:.08*n,s:.52,rx:-.08,rz:-.16}].forEach((a,c)=>{let l,h=t;t==="mixed"&&(h=c===0?"bolete":c===1?"fly_agaric":"chanterelle"),h==="bolete"?l=tx(a.s*n,i):h==="chanterelle"?l=nx(a.s*n,i):l=ex(a.s*n,i),l.position.set(a.x,0,a.z),l.rotation.x=a.rx,l.rotation.z=a.rz,e.add(l)}),s.rotationY&&(e.rotation.y=s.rotationY),{group:e}}class ix{scene;camera;renderer;canvas;playerGroup;targetMarker;signpost;guideNpc;greyManNpc;nixiePond;nixieNpc;weirBridge;giantNpc;lumberCamp;woodWomanNpc;hellChasm;devilNpc;huntingLodge;wildHunterNpc;woodWomanLodgeNpc;treasureChest;pathMeshes=new Map;pathGemstones=new Map;pickableObjects=[];raycaster=new t_;pointerNdc=new ye;cameraOrbitAngle=0;cameraPitch=.56;cameraDistance=11;hoveredPathId=null;isNpcHovered=!1;isGreyManHovered=!1;isNixieHovered=!1;isGiantHovered=!1;isWoodWomanHovered=!1;isDevilHovered=!1;isWildHunterHovered=!1;isWoodWomanLodgeHovered=!1;isChestHovered=!1;lastPlayerPos={x:0,z:5.2};elapsedSeconds=0;constructor(e){this.canvas=e,this.scene=new t0;const t=14476e3;this.scene.background=new Fe(t),this.scene.fog=new Va(t,9.5,22),this.camera=new Ut(55,window.innerWidth/window.innerHeight,.1,95),this.renderer=new e0({canvas:e,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Bl,this.setupLights(),this.buildTerrainAndPaths();const n=W_();n.position.set(0,0,0),n.rotation.y=0,n.traverse(r=>{r.isMesh&&(r.userData={interactableType:"hut"},this.pickableObjects.push(r))}),this.scene.add(n),this.treasureChest=J_(),this.treasureChest.group.position.set(.85,0,2),this.treasureChest.group.rotation.y=-.15,this.treasureChest.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.treasureChest.group),this.signpost=Z_(),this.signpost.group.position.set(2.3,0,2.4),this.signpost.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.signpost.group),this.guideNpc=B_(),this.guideNpc.group.position.set(-1.85,0,2.05),this.guideNpc.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.guideNpc.group);const i=Y_();i.position.set(yt.x,0,yt.z),i.rotation.y=yt.rotationY,i.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(i),this.greyManNpc=k_(),this.greyManNpc.group.position.set(Sa.x,0,Sa.z),this.greyManNpc.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.greyManNpc.group),this.nixiePond=j_(),this.nixiePond.group.position.set($t.x,0,$t.z),this.nixiePond.group.traverse(r=>{r.isMesh&&r.userData?.interactableType&&this.pickableObjects.push(r)}),this.scene.add(this.nixiePond.group),this.nixieNpc=K_(),this.nixieNpc.group.position.set(Ta.x,0,Ta.z),this.nixieNpc.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.nixieNpc.group),this.weirBridge=$_(),this.weirBridge.group.position.set(Yt.x,0,Yt.z),this.weirBridge.group.rotation.y=Yt.rotationY,this.weirBridge.group.traverse(r=>{r.isMesh&&r.userData?.interactableType&&this.pickableObjects.push(r)}),this.scene.add(this.weirBridge.group),this.giantNpc=i_(),this.giantNpc.group.position.set(ba.x,0,ba.z),this.giantNpc.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.giantNpc.group),this.lumberCamp=q_(),this.lumberCamp.group.position.set(Qt.x,0,Qt.z),this.lumberCamp.group.traverse(r=>{r.isMesh&&r.userData?.interactableType&&this.pickableObjects.push(r)}),this.scene.add(this.lumberCamp.group),this.woodWomanNpc=zl(),this.woodWomanNpc.group.position.set(Ea.x,0,Ea.z),this.woodWomanNpc.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.woodWomanNpc.group),this.hellChasm=H_(),this.hellChasm.group.position.set(yn.x,0,yn.z),this.hellChasm.group.traverse(r=>{r.isMesh&&r.userData?.interactableType&&this.pickableObjects.push(r)}),this.scene.add(this.hellChasm.group),this.devilNpc=n_(),this.devilNpc.group.position.set(Aa.x,0,Aa.z),this.devilNpc.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.devilNpc.group),this.huntingLodge=G_(),this.huntingLodge.group.position.set(Mn.x,0,Mn.z),this.huntingLodge.group.traverse(r=>{r.isMesh&&r.userData?.interactableType&&this.pickableObjects.push(r)}),this.scene.add(this.huntingLodge.group),this.wildHunterNpc=Q_(),this.wildHunterNpc.group.position.set(Pr.x,0,Pr.z),this.wildHunterNpc.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.wildHunterNpc.group),this.woodWomanLodgeNpc=zl({interactableType:"wood_woman_lodge",defaultFacingTarget:Pr}),this.woodWomanLodgeNpc.group.position.set(Ra.x,0,Ra.z),this.woodWomanLodgeNpc.group.traverse(r=>{r.isMesh&&this.pickableObjects.push(r)}),this.scene.add(this.woodWomanLodgeNpc.group),this.buildForestRing(),this.buildCurvedPath1Trees(),this.buildCurvedPath2Trees(),this.buildCurvedPath3Trees(),this.buildCurvedPath4Trees(),this.buildCurvedPath5Trees(),this.buildCurvedPath6Trees(),this.buildForestMushrooms(),this.targetMarker=this.createTargetMarker(),this.scene.add(this.targetMarker),this.playerGroup=this.createPlayerMarker(),this.scene.add(this.playerGroup),window.addEventListener("resize",this.onResize)}setupLights(){const e=new V0(15002600,.78);this.scene.add(e);const t=new Ph(16773590,1.15);t.position.set(16,36,14),t.castShadow=!0,t.shadow.mapSize.width=2048,t.shadow.mapSize.height=2048,t.shadow.camera.near=2,t.shadow.camera.far=110;const n=55;t.shadow.camera.left=-n,t.shadow.camera.right=n,t.shadow.camera.top=n,t.shadow.camera.bottom=-n,this.scene.add(t)}buildTerrainAndPaths(){const e=new T(new as(110,48),new G({color:2373671,roughness:.96}));e.rotation.x=-Math.PI/2,e.receiveShadow=!0,this.scene.add(e);const t=new T(new ie(6.8,7,.06,36),new G({color:7034946,roughness:.92}));t.position.y=.03,t.receiveShadow=!0,t.userData={interactableType:"ground"},this.scene.add(t),this.pickableObjects.push(t);const n=52;mt.forEach(i=>{const r=new G({color:8086859,roughness:.9,emissive:0});if(this.pathMeshes.set(i.id,r),i.id===1){this.buildCurvedPathMeshes(1,tn,Ur,i.angleRad,r,i.colorHex);return}if(i.id===2){this.buildCurvedPathMeshes(2,nn,Or,i.angleRad,r,i.colorHex);return}if(i.id===3){this.buildCurvedPathMeshes(3,sn,{x:Os.x,z:Os.z,radius:3.1},i.angleRad,r,i.colorHex);return}if(i.id===4){this.buildCurvedPathMeshes(4,rn,zr,i.angleRad,r,i.colorHex);return}if(i.id===5){this.buildCurvedPathMeshes(5,on,Fr,i.angleRad,r,i.colorHex);return}if(i.id===6){this.buildCurvedPathMeshes(6,an,kr,i.angleRad,r,i.colorHex);return}const o=new ue;o.rotation.y=-i.angleRad;const a=new T(new le(2.2,.05,n),r);a.position.set(0,.03,-30.5),a.receiveShadow=!0,a.userData={interactableType:"path",pathId:i.id},o.add(a),this.pickableObjects.push(a);const c=this.createPathGemstone(i.id,i.colorHex);c.position.set(1.45,0,-6.8),o.add(c),this.scene.add(o)})}createPathGemstone(e,t){const n=new ue,i=new T(new ie(.28,.36,.26,8),new G({color:5067865,roughness:.9,flatShading:!0}));i.position.y=.13,i.castShadow=!0,i.receiveShadow=!0,i.userData={interactableType:"sign",pathId:e},n.add(i),this.pickableObjects.push(i);const r=new G({color:t,roughness:.2,metalness:.35,emissive:0,emissiveIntensity:0,flatShading:!0}),o=new T(new Ht(.28,0),r);o.scale.set(1,1.45,1),o.position.y=.62,o.castShadow=!0,o.userData={interactableType:"sign",pathId:e},n.add(o),this.pickableObjects.push(o);const a=new kt(t,0,4.5);return a.position.set(0,.72,0),n.add(a),this.pathGemstones.set(e,{mesh:o,material:r,light:a,baseColor:t}),n}buildCurvedPathMeshes(e,t,n,i,r,o){for(let d=0;d<t.length-1;d++){if(e===3&&d===t.length-2)continue;const u=t[d],f=t[d+1],g=f.x-u.x,_=f.z-u.z,m=Math.hypot(g,_)+.35,p=(u.x+f.x)/2,x=(u.z+f.z)/2,v=Math.atan2(g,_),y=new T(new le(2.2,.05,m),r);y.position.set(p,.03,x),y.rotation.y=v,y.receiveShadow=!0,y.userData={interactableType:"path",pathId:e},this.scene.add(y),this.pickableObjects.push(y);const P=new T(new ie(2.2/2,2.2/2,.05,16),r);P.position.set(f.x,.03,f.z),P.receiveShadow=!0,P.userData={interactableType:"path",pathId:e},this.scene.add(P),this.pickableObjects.push(P)}const c=new T(new ie(n.radius,n.radius+.2,.06,28),r);c.position.set(n.x,.03,n.z),c.receiveShadow=!0,c.userData={interactableType:"path",pathId:e},this.scene.add(c),this.pickableObjects.push(c);const l=new ue;l.rotation.y=-i;const h=this.createPathGemstone(e,o);h.position.set(1.45,0,-6.8),l.add(h),this.scene.add(l)}createTreeMesh(e,t,n,i,r){const o=new ue,a=new T(new ie(.22*e,.32*e,1.8*e,8),n);a.position.y=.9*e,a.castShadow=!0,o.add(a);const c=t?i:r,l=new T(new Ue(1.35*e,2.6*e,9),c);l.position.y=2.6*e,l.castShadow=!0,o.add(l);const h=new T(new Ue(1*e,2.2*e,9),c);return h.position.y=4*e,h.castShadow=!0,o.add(h),o}isNearCurvedCorridor(e,t,n,i,r=3.2){if(Math.hypot(e-i.x,t-i.z)<i.radius+2.8)return!0;for(let o=0;o<n.length-1;o++){const a=n[o],c=n[o+1],l=c.x-a.x,h=c.z-a.z,d=Math.max(0,Math.min(1,((e-a.x)*l+(t-a.z)*h)/(l*l+h*h))),u=a.x+d*l,f=a.z+d*h;if(Math.hypot(e-u,t-f)<r)return!0}return!1}isNearPath1Corridor(e,t,n=3.2){return this.isNearCurvedCorridor(e,t,tn,Ur,n)}isNearPath2Corridor(e,t,n=3.2){return Math.hypot(e-$t.x,t-$t.z)<$t.radius+2.5?!0:this.isNearCurvedCorridor(e,t,nn,Or,n)}isNearPath3Corridor(e,t,n=3.2){return Math.hypot(e-Yt.x,t-Yt.z)<10.6?!0:this.isNearCurvedCorridor(e,t,sn,Os,n)}isNearPath4Corridor(e,t,n=3.2){return Math.hypot(e-Qt.x,t-Qt.z)<Qt.radius+1.8?!0:this.isNearCurvedCorridor(e,t,rn,zr,n)}isNearPath5Corridor(e,t,n=3.2){return Math.hypot(e-yn.x,t-yn.z)<yn.radius+1.8?!0:this.isNearCurvedCorridor(e,t,on,Fr,n)}isNearPath6Corridor(e,t,n=3.2){return Math.hypot(e-Mn.x,t-Mn.z)<Mn.radius+1.8?!0:this.isNearCurvedCorridor(e,t,an,kr,n)}isNearStraightPath(e,t,n,i=4.5,r=56,o=2.8){const a=Math.sin(n),c=-Math.cos(n),l=a*i,h=c*i,d=a*r,u=c*r,f=d-l,g=u-h,_=f*f+g*g;if(_<1e-4)return!1;const m=Math.max(0,Math.min(1,((e-l)*f+(t-h)*g)/_)),p=l+m*f,x=h+m*g;return Math.hypot(e-p,t-x)<o}isPositionOnGreenGrass(e,t){return!(Math.hypot(e,t)<8.2||Math.hypot(e,t)>70||this.isNearPath1Corridor(e,t,2.8)||this.isNearPath2Corridor(e,t,2.8)||this.isNearPath3Corridor(e,t,2.8)||this.isNearPath4Corridor(e,t,2.8)||this.isNearPath5Corridor(e,t,4)||this.isNearPath6Corridor(e,t,2.8)||this.isNearStraightPath(e,t,mt[6].angleRad,4.5,56,2.8)||Math.hypot(e-$t.x,t-$t.z)<$t.radius+2||Math.hypot(e-Yt.x,t-Yt.z)<11||Math.hypot(e-Qt.x,t-Qt.z)<Qt.radius+2||Math.hypot(e-yn.x,t-yn.z)<yn.radius+2.5||Math.hypot(e-Mn.x,t-Mn.z)<Mn.radius+2||Math.hypot(e-yt.x,t-yt.z)<7)}buildForestRing(){const e=new G({color:5191202,roughness:.9}),t=new G({color:2377515,roughness:.85}),n=new G({color:3365942,roughness:.85});for(let i=0;i<mt.length;i++){const r=mt[i].angleRad+Math.PI/7;for(let o=9.2;o<=44;o+=3.8)for(const a of[-.16,0,.16]){const c=r+a+Math.sin(o*(i+1))*.05,l=Math.sin(c)*o,h=-Math.cos(c)*o;if(this.isNearPath1Corridor(l,h,3)||this.isNearPath2Corridor(l,h,3)||this.isNearPath3Corridor(l,h,3)||this.isNearPath4Corridor(l,h,3)||this.isNearPath5Corridor(l,h,3)||this.isNearPath6Corridor(l,h,3))continue;const d=.85+(i*7+Math.round(o))%5*.14,u=this.createTreeMesh(d,(i+Math.round(o))%2===0,e,t,n);u.position.set(l,0,h),this.scene.add(u)}}}buildCurvedPath1Trees(){const e=new G({color:5191202,roughness:.9}),t=new G({color:2377515,roughness:.85}),n=new G({color:3365942,roughness:.85});for(let a=1;a<tn.length-1;a++){const c=tn[a-1],l=tn[a],h=tn[a+1],d=h.x-c.x,u=h.z-c.z,f=Math.hypot(d,u)||1,g=-u/f,_=d/f;for(const m of[-1,1])for(const p of[3.4,6.2]){const x=l.x+g*m*p,v=l.z+_*m*p;if(this.isNearPath1Corridor(x,v,2.7)||this.isNearPath2Corridor(x,v,2.7)||this.isNearPath3Corridor(x,v,2.7)||this.isNearPath4Corridor(x,v,2.7))continue;const y=.95+(a+Math.round(p))%3*.15,P=this.createTreeMesh(y,(a+m)%2===0,e,t,n);P.position.set(x,0,v),this.scene.add(P)}}const i=Math.cos(yt.rotationY),r=Math.sin(yt.rotationY),o=[[-6.4,.8,1.25,!0],[-7.6,-1.5,1.38,!1],[-5.8,3.2,1.12,!1],[-8.5,2.1,1.3,!0],[-7.2,5.2,1.18,!0],[-9.8,-.4,1.42,!1],[-10.4,3.6,1.22,!0],[-6,-4.2,1.35,!0],[6.6,.7,1.28,!1],[7.8,-1.6,1.4,!0],[5.9,3.3,1.15,!0],[8.6,2.2,1.32,!1],[7.3,5.3,1.2,!1],[10,-.5,1.45,!0],[10.5,3.7,1.25,!1],[6.2,-4.3,1.36,!1]];for(const[a,c,l,h]of o){const d=yt.x+a*i+c*r,u=yt.z-a*r+c*i,f=this.createTreeMesh(l,h,e,t,n);f.position.set(d,0,u),this.scene.add(f)}}buildCurvedPath2Trees(){const e=new G({color:5191202,roughness:.9}),t=new G({color:2377515,roughness:.85}),n=new G({color:3365942,roughness:.85});for(let r=1;r<nn.length-1;r++){const o=nn[r-1],a=nn[r],c=nn[r+1],l=c.x-o.x,h=c.z-o.z,d=Math.hypot(l,h)||1,u=-h/d,f=l/d;for(const g of[-1,1])for(const _ of[3.4,6.2]){const m=a.x+u*g*_,p=a.z+f*g*_;if(this.isNearPath2Corridor(m,p,2.7)||this.isNearPath1Corridor(m,p,2.7)||this.isNearPath3Corridor(m,p,2.7)||this.isNearPath4Corridor(m,p,2.7))continue;const x=.95+(r+Math.round(_))%3*.15,v=this.createTreeMesh(x,(r+g)%2===0,e,t,n);v.position.set(m,0,p),this.scene.add(v)}}[-1.85,-1.45,-1.05,-.65,-.25,.15,.55,.95,1.35,1.75,2.1].forEach((r,o)=>{for(const a of[6.8,9.6]){const c=$t.x+Math.cos(r+(a>8?.14:0))*a,l=$t.z+Math.sin(r+(a>8?.14:0))*a;if(this.isNearPath2Corridor(c,l,2.6)||this.isNearPath3Corridor(c,l,2.6)||this.isNearPath4Corridor(c,l,2.6))continue;const h=1.05+o%3*.16,d=this.createTreeMesh(h,o%2===0,e,t,n);d.position.set(c,0,l),this.scene.add(d)}})}buildCurvedPath3Trees(){const e=new G({color:5191202,roughness:.9}),t=new G({color:2377515,roughness:.85}),n=new G({color:3365942,roughness:.85});for(let a=1;a<sn.length-2;a++){const c=sn[a-1],l=sn[a],h=sn[a+1],d=h.x-c.x,u=h.z-c.z,f=Math.hypot(d,u)||1,g=-u/f,_=d/f;for(const m of[-1,1])for(const p of[3.4,6.2]){const x=l.x+g*m*p,v=l.z+_*m*p;if(this.isNearPath3Corridor(x,v,2.7)||this.isNearPath2Corridor(x,v,2.7)||this.isNearPath1Corridor(x,v,2.7)||this.isNearPath4Corridor(x,v,2.7))continue;const y=.95+(a+Math.round(p))%3*.15,P=this.createTreeMesh(y,(a+m)%2===0,e,t,n);P.position.set(x,0,v),this.scene.add(P)}}const i=Math.cos(Yt.rotationY),r=Math.sin(Yt.rotationY),o=[[-10.8,-3.5,1.32,!0],[-11.2,.4,1.24,!1],[-10.4,4.2,1.38,!0],[-7.5,7.6,1.28,!1],[-3.8,9.8,1.35,!0],[.5,10.6,1.22,!1],[4.6,9.6,1.3,!0],[7.8,6.8,1.18,!1]];for(const[a,c,l,h]of o){const d=Yt.x+a*i+c*r,u=Yt.z-a*r+c*i,f=this.createTreeMesh(l,h,e,t,n);f.position.set(d,0,u),this.scene.add(f)}}buildCurvedPath4Trees(){const e=new G({color:5191202,roughness:.9}),t=new G({color:2377515,roughness:.85}),n=new G({color:3365942,roughness:.85});for(let r=1;r<rn.length-1;r++){const o=rn[r-1],a=rn[r],c=rn[r+1],l=c.x-o.x,h=c.z-o.z,d=Math.hypot(l,h)||1,u=-h/d,f=l/d;for(const g of[-1,1])for(const _ of[3.4,6.2]){const m=a.x+u*g*_,p=a.z+f*g*_;if(this.isNearPath4Corridor(m,p,2.7)||this.isNearPath3Corridor(m,p,2.7)||this.isNearPath2Corridor(m,p,2.7)||this.isNearPath1Corridor(m,p,2.7))continue;const x=.95+(r+Math.round(_))%3*.15,v=this.createTreeMesh(x,(r+g)%2===0,e,t,n);v.position.set(m,0,p),this.scene.add(v)}}[-.9,-.45,0,.45,.9,1.35,1.8,2.25,2.7,3.15,3.6,4].forEach((r,o)=>{for(const a of[8.8,11.4]){const c=Qt.x+Math.cos(r+(a>10?.16:0))*a,l=Qt.z+Math.sin(r+(a>10?.16:0))*a;if(this.isNearPath4Corridor(c,l,2.6))continue;const h=1.1+o%3*.15,d=this.createTreeMesh(h,o%2===0,e,t,n);d.position.set(c,0,l),this.scene.add(d)}})}buildCurvedPath5Trees(){const e=new G({color:2234904,roughness:.95}),t=new G({color:1841687,roughness:.9}),n=new G({color:2892830,roughness:.9}),i=new G({color:1446675,roughness:.9,flatShading:!0});for(let r=1;r<on.length-1;r++){const o=on[r-1],a=on[r],c=on[r+1],l=c.x-o.x,h=c.z-o.z,d=Math.hypot(l,h)||1,u=-h/d,f=l/d;for(const g of[-1,1])for(const _ of[3.5,6.4]){const m=a.x+u*g*_,p=a.z+f*g*_;if(!this.isNearPath5Corridor(m,p,2.7))if((r+Math.round(_))%3===0){const x=new T(new Ue(.8+r%2*.4,1.8+r%3*.5,5),i);x.position.set(m,.9,p),x.rotation.y=(r+g)*.7,x.castShadow=!0,this.scene.add(x)}else{const x=.95+(r+Math.round(_))%3*.16,v=this.createTreeMesh(x,(r+g)%2===0,e,t,n);v.position.set(m,0,p),this.scene.add(v)}}}}buildCurvedPath6Trees(){const e=new G({color:5191202,roughness:.9}),t=new G({color:2377515,roughness:.85}),n=new G({color:3365942,roughness:.85});for(let r=1;r<an.length-1;r++){const o=an[r-1],a=an[r],c=an[r+1],l=c.x-o.x,h=c.z-o.z,d=Math.hypot(l,h)||1,u=-h/d,f=l/d;for(const g of[-1,1])for(const _ of[3.4,6.2]){const m=a.x+u*g*_,p=a.z+f*g*_;if(this.isNearPath6Corridor(m,p,2.7)||this.isNearPath5Corridor(m,p,2.7)||this.isNearPath1Corridor(m,p,2.7))continue;const x=.95+(r+Math.round(_))%3*.15,v=this.createTreeMesh(x,(r+g)%2===0,e,t,n);v.position.set(m,0,p),this.scene.add(v)}}const i=[[-49.5,18.5,1.25,!0],[-50.2,22.8,1.35,!1],[-48.8,27.2,1.2,!0],[-44.5,30.2,1.3,!1],[-40.2,28.5,1.15,!0],[-37.5,25.8,1.22,!1],[-38.2,16.5,1.18,!0],[-42.6,15.2,1.32,!1],[-46.8,14.8,1.28,!0]];for(const[r,o,a,c]of i)if(!this.isNearPath6Corridor(r,o,3.2)){const l=this.createTreeMesh(a,c,e,t,n);l.position.set(r,0,o),this.scene.add(l)}}buildForestMushrooms(){for(let t=0;t<mt.length;t++){const n=mt[t].angleRad+Math.PI/7;for(let i=10.2;i<=36;i+=3.8){if((t*3+Math.round(i))%3!==0)continue;const r=(t+Math.round(i))%2===0?.08:-.08,o=n+r,a=Math.sin(o)*i,c=-Math.cos(o)*i,l=o+1.25,h=a+Math.cos(l)*.55,d=c+Math.sin(l)*.55;if(!this.isPositionOnGreenGrass(h,d))continue;const u=["fly_agaric","bolete","chanterelle","mixed"],f=u[(t+Math.round(i/2))%u.length],g=.82+(t+Math.round(i))%3*.12,_=Fl({type:f,scale:g,rotationY:l});_.group.position.set(h,0,d),this.scene.add(_.group)}}const e=[{x:-4.8,z:-9.8,type:"fly_agaric",scale:.95},{x:5.2,z:-9.8,type:"bolete",scale:1.05},{x:10.8,z:-2.6,type:"chanterelle",scale:.9},{x:8.8,z:7.2,type:"fly_agaric",scale:1},{x:-8.8,z:7.2,type:"mixed",scale:.92},{x:-11,z:-2.4,type:"bolete",scale:.95},{x:-4.8,z:-18.5,type:"fly_agaric",scale:.95},{x:-4.6,z:-25.8,type:"bolete",scale:1},{x:2.2,z:-35.5,type:"chanterelle",scale:.9},{x:8.2,z:-43,type:"mixed",scale:.88},{x:12.8,z:-17.5,type:"chanterelle",scale:1},{x:18.5,z:-21.8,type:"fly_agaric",scale:.92},{x:27.2,z:-24.5,type:"bolete",scale:1.05},{x:14.8,z:-2.2,type:"bolete",scale:1.05},{x:21.2,z:4.5,type:"chanterelle",scale:.95},{x:25.8,z:8.8,type:"fly_agaric",scale:1},{x:9.8,z:18.2,type:"fly_agaric",scale:1.05},{x:14.2,z:25.8,type:"bolete",scale:.95},{x:17.8,z:34.2,type:"mixed",scale:1},{x:-16.8,z:10.8,type:"fly_agaric",scale:1},{x:-24.8,z:14.5,type:"bolete",scale:1.05},{x:-32.5,z:15.2,type:"mixed",scale:.95},{x:-35.2,z:28.5,type:"chanterelle",scale:.95}];for(const t of e){if(!this.isPositionOnGreenGrass(t.x,t.z))continue;const n=Fl({type:t.type,scale:t.scale,rotationY:Math.sin(t.x*2.3+t.z)*Math.PI});n.group.position.set(t.x,0,t.z),this.scene.add(n.group)}}createTargetMarker(){const e=new cs(.28,.42,24);e.rotateX(-Math.PI/2);const t=new wt({color:14858347,side:Ot,transparent:!0,opacity:.85}),n=new T(e,t);return n.position.y=.08,n.visible=!1,n}createPlayerMarker(){const e=new ue,t=new T(new St(.28,.65,8,12),new G({color:14858347,roughness:.45}));t.position.y=.65,t.castShadow=!0,e.add(t);const n=new T(new Ue(.4,.85,12),new G({color:3894860,roughness:.7}));return n.position.y=.55,n.castShadow=!0,e.add(n),e}getCameraOrbitAngle(){return this.cameraOrbitAngle}rotateCamera(e,t=0){this.cameraOrbitAngle+=e,this.cameraPitch=Math.max(.25,Math.min(1.15,this.cameraPitch+t))}zoomCamera(e){this.cameraDistance=Math.max(5.5,Math.min(14.5,this.cameraDistance+e))}setHoveredPathId(e){this.hoveredPathId=e}setNpcHovered(e){this.isNpcHovered=e}setGreyManHovered(e){this.isGreyManHovered=e}setNixieHovered(e){this.isNixieHovered=e}setGiantHovered(e){this.isGiantHovered=e}setWoodWomanHovered(e){this.isWoodWomanHovered=e}setDevilHovered(e){this.isDevilHovered=e}setWildHunterHovered(e){this.isWildHunterHovered=e}setWoodWomanLodgeHovered(e){this.isWoodWomanLodgeHovered=e}setChestHovered(e){this.isChestHovered=e}raycastFromMouse(e,t){const n=this.canvas.getBoundingClientRect();if(n.width===0||n.height===0)return null;this.pointerNdc.x=(e-n.left)/n.width*2-1,this.pointerNdc.y=-((t-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.pointerNdc,this.camera);const i=this.raycaster.intersectObjects(this.pickableObjects,!1);if(i.length===0)return null;for(const o of i){const a=o.object.userData,c={x:o.point.x,z:o.point.z};if(a.interactableType==="wild_hunter")return{kind:"wild_hunter",point:c};if(a.interactableType==="wood_woman_lodge")return{kind:"wood_woman_lodge",point:c};if(a.interactableType==="hunting_lodge")return{kind:"hunting_lodge",point:c};if(a.interactableType==="herb_garden")return{kind:"herb_garden",point:c};if(a.interactableType==="devil")return{kind:"devil",point:c};if(a.interactableType==="hell_chasm")return{kind:"hell_chasm",point:c};if(a.interactableType==="wood_woman")return{kind:"wood_woman",point:c};if(a.interactableType==="lumber_camp")return{kind:"lumber_camp",point:c};if(a.interactableType==="giant")return{kind:"giant",point:c};if(a.interactableType==="weir")return{kind:"weir",point:c};if(a.interactableType==="nixie")return{kind:"nixie",point:c};if(a.interactableType==="pond")return{kind:"pond",point:c};if(a.interactableType==="grey_man")return{kind:"grey_man",point:c};if(a.interactableType==="cave")return{kind:"cave",point:c};if(a.interactableType==="npc")return{kind:"npc",point:c};if(a.interactableType==="chest")return{kind:"chest",point:c};if(a.interactableType==="sign"&&typeof a.pathId=="number")return{kind:"sign",pathId:a.pathId,point:c};if(a.interactableType==="hut")return{kind:"hut",point:c};if(a.interactableType==="signpost")return{kind:"signpost",point:c};if(a.interactableType==="path"&&typeof a.pathId=="number")return{kind:"path",pathId:a.pathId,point:c}}const r=i[0];return{kind:"ground",point:{x:r.point.x,z:r.point.z}}}update(e,t,n=null,i=.016,r=!1,o=!1){this.elapsedSeconds+=i;const a=e.x-this.lastPlayerPos.x,c=e.z-this.lastPlayerPos.z;if(Math.hypot(a,c)>.002){const g=Math.atan2(a,c);this.playerGroup.rotation.y=g}this.lastPlayerPos={x:e.x,z:e.z},this.playerGroup.position.set(e.x,0,e.z),this.guideNpc.update(this.elapsedSeconds,e,this.isNpcHovered||r),this.greyManNpc.update(this.elapsedSeconds,e,this.isGreyManHovered||r),this.nixiePond.update(this.elapsedSeconds),this.nixieNpc.update(this.elapsedSeconds,e,this.isNixieHovered||r),this.weirBridge.update(this.elapsedSeconds),this.giantNpc.update(this.elapsedSeconds,e,this.isGiantHovered||r),this.lumberCamp.update(this.elapsedSeconds),this.woodWomanNpc.update(this.elapsedSeconds,e,this.isWoodWomanHovered||r),this.hellChasm.update(this.elapsedSeconds),this.devilNpc.update(this.elapsedSeconds,e,this.isDevilHovered||r),this.huntingLodge.update(this.elapsedSeconds),this.wildHunterNpc.update(this.elapsedSeconds,e,this.isWildHunterHovered||r),this.woodWomanLodgeNpc.update(this.elapsedSeconds,e,this.isWoodWomanLodgeHovered||r),this.treasureChest.update(i,o,this.isChestHovered),n?(this.targetMarker.visible=!0,this.targetMarker.position.set(n.x,.08,n.z)):this.targetMarker.visible=!1,this.signpost.highlightSign(t,this.hoveredPathId),this.pathMeshes.forEach((g,_)=>{_===t?g.emissive.setHex(2892300):_===this.hoveredPathId?g.emissive.setHex(1774855):g.emissive.setHex(0)});const l=.5+.5*Math.sin(this.elapsedSeconds*3.2);this.pathGemstones.forEach((g,_)=>{const m=_>=1&&_<=6;(t!==null?_===t&&m:m)?(g.material.emissive.setHex(g.baseColor),g.material.emissiveIntensity=1.05+l*.65,g.light.intensity=1.35+l*.75,g.mesh.position.y=.65+Math.sin(this.elapsedSeconds*2.4+_)*.05,g.mesh.rotation.y=this.elapsedSeconds*1.1):_===this.hoveredPathId||_===t?(g.material.emissive.setHex(g.baseColor),g.material.emissiveIntensity=.35,g.light.intensity=.3,g.mesh.position.y=.62):(g.material.emissive.setHex(0),g.material.emissiveIntensity=0,g.light.intensity=0,g.mesh.position.y=.62)});const h=Math.cos(this.cameraPitch)*this.cameraDistance,d=Math.sin(this.cameraPitch)*this.cameraDistance,u=e.x+Math.sin(this.cameraOrbitAngle)*h,f=e.z+Math.cos(this.cameraOrbitAngle)*h;this.camera.position.lerp(new D(u,d,f),.14),this.camera.lookAt(e.x,1,e.z),this.renderer.render(this.scene,this.camera)}onResize=()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)};dispose(){window.removeEventListener("resize",this.onResize),this.renderer.dispose()}}const vn="Waldhüter Arvid",zn="Hüter der Schutzhütte & Wächter der Sieben Wege",kn="Das Graumännchen",ii="Hüter des alten Silberstollens",si="Die Nixe vom Spiegelteich",wi="Wächterin auf dem Stein im Teich",ri="Der Riese am Wehr",Si="Wächter über Stausee und Quellwehr",Kt="Das Holzweibchen",Ti="Hüterin des Waldes im Holzfällerlager",Cr="Der Teufel",Io="Herr des Höllenschlundes",zs="Der Wilde Jäger",Lo="Herr der Jagdhütte",sx={1:"Der 1. Silberstollen-Pfad windet sich in einer langen Kurve hinauf zum alten Bergmassiv. Vor dem Höhleneingang wartet das Graumännchen: Eine neue Silberader könnte dort Mine und Arbeiter retten – doch ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot und Versprechen gilt.",2:"Der 2. Nixenteich-Pfad im Nordosten führt durch den Nebel zu einem stillen Waldteich. Auf einem Felsen im Wasser sitzt die Nixe. Auf dem Grund ihres Teichs funkelt ein verlockender Schatz – doch sei gewarnt: Er ist mit einem dunklen Fluch und drohendem Unglück verbunden.",3:"Der 3. Quellenweg im Südosten führt über eine Brücke, unter der ein Bach hindurchfließt. Ein geschlossenes Wehr an der Brücke staut den Bach zu einem kleinen Stausee zurück. Dort wacht der Riese: Die Quelle versorgt eigentlich das Tal – ihre Freigabe könnte dort eine Dürre lindern, zerstört jedoch die Heimat des Riesen.",4:"Der 4. Holzfäller-Pfad im Südsüdosten führt auf eine gerodete Waldlichtung zu einem Holzfällerlager. Dort triffst du das Holzweibchen zwischen Baumstümpfen und Holzstapeln: Das geschlagene Brennholz rettet die Dorfbewohner vor der bitteren Kälte – doch zu starke Fällungen gefährden den Wald und seine gesamte Umgebung.",5:"Der 5. Höllenschlund-Pfad im Südsüdwesten führt an den Rand eines tiefen, glühenden Abgrunds. Inmitten des Feuermeeres und der emporsteigenden Flammen erwartet dich der Teufel auf seinem Obsidianfelsen.",6:"Der 6. Jägerpfad im Südwesten führt durch eine Waldschneise zu einer Jagdhütte mit prachtvollem Kräutergarten. Dort steht der Wilde Jäger mit Pferd und Jagdhund und streitet erbittert mit einem Holzweibchen: Er wirft ihr Diebstahl kostbarer Kräuter vor, während sie beteuert, damit leidenden Waldtieren in höchster Not das Leben gerettet zu haben.",7:"Der Sternenwald-Pfad im Nordwesten liegt unter einem dichten Blätterdach. Dort leuchten selbst am Tag die Farne – ein Pfad für Entdecker und Rätselsucher."};function rx(){const s={root:{id:"root",speaker:vn,speakerRole:zn,text:"Sei gegrüßt an der Kreuzung der sieben Wege, Wandernde! Ich bin Arvid. Seit vielen Wintern stehe ich an diesem Scheideweg, halte die Laterne brennend und biete Schutz in dieser Hütte. Wer hier ankommt, steht vor einer Wahl, die nicht nur die Füße, sondern das Gewissen fordert. Wohin zieht es deinen Sinn?",options:[{id:"ask-paths",playerText:"Kannst du mir Hinweise zu den sieben Wegen geben?",nextNodeId:"paths_overview"},{id:"ask-arvid",playerText:"Wer bist du, Arvid? Wie kamst du an diese Waldkreuzung?",nextNodeId:"about_arvid"},{id:"ask-crossroads",playerText:"Was hat es mit dieser Waldkreuzung und der Hütte auf sich?",nextNodeId:"about_crossroads"},{id:"ask-philosophy",playerText:"Wie soll ich wählen, wenn jeder Pfad schwere Fragen aufwirft?",nextNodeId:"arvid_philosophy"},{id:"ask-beings",playerText:"Welche Wesen erwarten mich an den Pfaden?",nextNodeId:"arvid_beings"},{id:"ask-recommendation",playerText:"Welchen Weg würdest du mir zuerst empfehlen?",nextNodeId:"recommendation"},{id:"bye",playerText:"Ich sehe mich erst einmal weiter um. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},about_arvid:{id:"about_arvid",speaker:vn,speakerRole:zn,text:"Einst zog ich selbst als ruheloser Sucher durchs Wanderland. Ich bin jeden dieser sieben Pfade bis zu seinem Ende gegangen – durch Nebel, Felsstürze und lockende Spiegelungen. Als mein Vorgänger, der alte Hüter, seine Laterne niederlegte, erkannte ich: Das Größte ist nicht das endlose Weiterlaufen, sondern das Da-Sein für jene, die an der Weggabelung zögern. So gelobte ich, diese Kreuzung zu hüten.",options:[{id:"to-lantern",playerText:"Welche Bewandtnis hat die Messinglaterne an deinem Wanderstab?",nextNodeId:"arvid_lantern"},{id:"to-beings-from-arvid",playerText:"Du kennst also alle Wesen an den Pfaden persönlich?",nextNodeId:"arvid_beings"},{id:"to-philosophy-from-arvid",playerText:"Welche Lehre zogst du aus all deinen Wanderungen?",nextNodeId:"arvid_philosophy"},{id:"back-root-from-arvid",playerText:"Zurück zur Übersicht unserer Fragen.",nextNodeId:"root"},{id:"bye-arvid",playerText:"Danke für deine Geschichte, Arvid. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},arvid_lantern:{id:"arvid_lantern",speaker:vn,speakerRole:zn,text:"Diese Laterne wurde von den Bergleuten der alten Zechen aus Bergmessing geschmiedet und trägt ein Licht, das aus der stillen Herdglut der Schutzhütte stammt. Selbst wenn dichter weißer Waldnebel die Pfade verschluckt, dringt ihr warmer Bernsteinschein durchs Geäst. Sie erinnert jeden Wandernden daran: Es gibt immer einen sicheren Rückweg zur Zuflucht, ganz gleich, wie weit man sich hinausgewagt hat.",options:[{id:"lantern-to-arvid",playerText:"Erzähle mir mehr über deine eigene Wanderschaft.",nextNodeId:"about_arvid"},{id:"lantern-to-beings",playerText:"Welche Wesen hast du auf deinen Reisen getroffen?",nextNodeId:"arvid_beings"},{id:"back-root-lantern",playerText:"Verstanden, zurück zum Anfang.",nextNodeId:"root"}]},arvid_philosophy:{id:"arvid_philosophy",speaker:vn,speakerRole:zn,text:"Wisse dies: Kein Pfad im Wanderland ist rein leicht oder gänzlich dunkel. Ein Weg verlangt, dass du ein geheiligtes Verbot gegen blanke Menschennot abwägst; ein anderer lockt mit Reichtum, der eine Seele verfluchen kann; ein dritter fordert ein bitteres Opfer zwischen Durst im Tal und der Heimat eines Riesen. Wer nur den leichtesten Schritt sucht, strauchelt am tiefsten. Höre beiden Seiten zu, wenn Wesen streiten – und vertraue deinem eigenen Gewissen mehr als fremdem Drängen.",options:[{id:"philosophy-to-paths",playerText:"Zeige mir die sieben Wege, damit ich die Prüfungen abwägen kann.",nextNodeId:"paths_overview"},{id:"philosophy-to-beings",playerText:"Welche Gesichter und Wesen erwarten mich?",nextNodeId:"arvid_beings"},{id:"back-root-philosophy",playerText:"Danke für diese weisen Worte. Zurück zur Übersicht.",nextNodeId:"root"}]},arvid_beings:{id:"arvid_beings",speaker:vn,speakerRole:zn,text:"Im Norden hütet das treue Graumännchen den Silberstollen – ein ehrlicher Geist, doch gebunden an ein ehernes Versprechen. Im Nordosten sitzt die Nixe auf ihrem Stein im Spiegelteich; ihre Schönheit und ihr funkelndes Gold haben schon manchen ins Verderben gezogen. Im Südosten hadert der Riese am Wehr mit der Dürre des Tals, während im Süden das uralte Holzweibchen für den Atem des Forstes kämpft. Und am Jägerpfad pocht der Wilde Jäger stolz auf sein Revierrecht. Begegne ihnen allen mit Achtung, aber lass dich von Zorn oder Schmeicheln nicht verblenden.",options:[{id:"beings-to-paths",playerText:"Lass mich die Wege im Detail durchgehen.",nextNodeId:"paths_overview"},{id:"beings-to-rec",playerText:"Mit welchem Wesen sollte ich das Gespräch beginnen?",nextNodeId:"recommendation"},{id:"back-root-beings",playerText:"Zurück zum Hauptgespräch.",nextNodeId:"root"}]},about_crossroads:{id:"about_crossroads",speaker:vn,speakerRole:zn,text:"Alle sieben Pfade des Wanderlandes treffen an dieser Lichtung zusammen. Die Schutzhütte in der Mitte ist dein sicherer Ankerpunkt, und in der Schatztruhe davor ruht ein altes Licht-Artefakt für dunkle Wege.",options:[{id:"to-paths",playerText:"Erzähl mir mehr über die einzelnen sieben Wege.",nextNodeId:"paths_overview"},{id:"back-root",playerText:"Verstanden, zurück zu meiner vorigen Frage.",nextNodeId:"root"},{id:"bye",playerText:"Danke für die Erklärung! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},recommendation:{id:"recommendation",speaker:vn,speakerRole:zn,text:"Folge zuerst dem 1. Silberstollen-Pfad nach Norden! Er biegt im Nebel nach Nordosten ab und führt direkt zu einem Berg mit Höhleneingang. Dort wartet das Graumännchen mit einer dringenden Angelegenheit um eine neue Silberader.",options:[{id:"pick-1",playerText:"Erzähl mir genauer vom 1. Silberstollen-Pfad und dem Graumännchen.",nextNodeId:"path_1"},{id:"walk-grey-man",playerText:"Direkt auf dem 1. Weg bis zum Berg und dem Graumännchen wandern",nextNodeId:null,action:{type:"walk_to_grey_man"}},{id:"all-paths",playerText:"Lass mich aus allen sieben Wegen wählen.",nextNodeId:"paths_overview"},{id:"bye",playerText:"Danke, ich mache mich auf den Weg! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},paths_overview:{id:"paths_overview",speaker:vn,speakerRole:zn,text:"Jeder der sieben Wege trägt einen eigenen Charakter. Über welchen Pfad möchtest du einen Hinweis hören?",options:[...mt.map(e=>({id:`ask-path-${e.id}`,playerText:`${e.name} (${e.directionLabel})`,nextNodeId:`path_${e.id}`})),{id:"back-root",playerText:"Zurück zum Hauptgespräch",nextNodeId:"root"}]},grey_root:{id:"grey_root",speaker:kn,speakerRole:ii,text:"Glück auf, Wandernde! Gut, dass du den Weg durch den Nebel bis zu diesem Stollenmundloch gefunden hast. Eine neue Silberader tief hier im Berg könnte unsere Mine und die Arbeiter retten. Doch ihr Auffinden verlangt Licht in einem Stollen, für den ein altes Verbot beziehungsweise ein geschworenes Versprechen gilt.",options:[{id:"grey-ask-vein",playerText:"Warum hängt das Schicksal von Mine und Arbeitern an dieser neuen Silberader?",nextNodeId:"grey_silver_vein"},{id:"grey-ask-prohibition",playerText:"Was hat es mit dem Verbot und dem Versprechen für diesen Stollen auf sich?",nextNodeId:"grey_prohibition"},{id:"grey-ask-light",playerText:"Wie können wir die Silberader im Dunkeln finden, wenn Licht dort verboten ist?",nextNodeId:"grey_light_choice"},{id:"grey-bye",playerText:"Ich denke über deine Worte nach. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},grey_silver_vein:{id:"grey_silver_vein",speaker:kn,speakerRole:ii,text:"Die oberen Gänge sind taub geschlagen. Wenn bis zum Ende des Mondes kein frisches Erz gefördert wird, wird die Zeche für immer geschlossen und die Bergleute verlieren ihr Auskommen. Ich weiß, dass die reiche Silberader im tiefen Nordstollen verläuft – aber ohne Licht kann niemand ihr glitzerndes Band im Gestein erkennen.",options:[{id:"to-prohibition",playerText:"Erzähl mir von dem Verbot und dem Versprechen im tiefen Stollen.",nextNodeId:"grey_prohibition"},{id:"to-light-choice",playerText:"Welche Möglichkeiten haben wir, Licht in den Stollen zu bringen?",nextNodeId:"grey_light_choice"},{id:"back-grey-root",playerText:"Zurück zum Anfang unseres Gesprächs.",nextNodeId:"grey_root"}]},grey_prohibition:{id:"grey_prohibition",speaker:kn,speakerRole:ii,text:"Vor einer Generation stürzte der hintere First ein. Als die Eingeschlossenen gerettet wurden, gaben die Ältesten dem Berg das feierliche Versprechen, niemals wieder mit offenem Grubenfeuer oder Talglicht in diesen gesperrten Stollen einzufahren. Seitdem gilt das strenge Verbot: Kein offenes Licht darf die Schwelle passieren.",options:[{id:"ask-workaround",playerText:"Gilt das Verbot für jedes Licht – oder nur für offenes Grubenfeuer?",nextNodeId:"grey_light_choice"},{id:"ask-promise-weight",playerText:"Was wiegt schwerer: das alte Versprechen oder die Rettung der Arbeiter?",nextNodeId:"grey_dilemma"},{id:"back-grey-root",playerText:"Zurück zur Übersicht.",nextNodeId:"grey_root"}]},grey_light_choice:{id:"grey_light_choice",speaker:kn,speakerRole:ii,text:"Du hörst genau hin! Das Verbot untersagt offenes Grubenlicht, das den Berg wärmt und Rauch wirft. Doch in der Schatztruhe vor der Schutzhütte auf der Kreuzung liegt ein kalt leuchtender Waldkristall. Oder man bittet die Ältesten offen um Entbindung vom Versprechen, um die Arbeiter zu retten. Welchen Weg hältst du für richtig?",options:[{id:"choice-crystal",playerText:"Wir nutzen das kalte Kristalllicht aus der Truhe – so bleibt der Wortlaut des Versprechens gewahrt.",nextNodeId:"grey_resolution_crystal"},{id:"choice-honest-plea",playerText:"Ein Versprechen darf man nicht durch eine List umgehen – wir sollten das Verbot offen mit den Arbeitern prüfen.",nextNodeId:"grey_resolution_honest"},{id:"choice-strict-ban",playerText:"Das Versprechen an den Berg ist unantastbar – der Stollen muss dunkel bleiben.",nextNodeId:"grey_resolution_strict"}]},grey_dilemma:{id:"grey_dilemma",speaker:kn,speakerRole:ii,text:"Genau deshalb warte ich hier vor dem Höhleneingang auf jemanden von außerhalb. Ein gebrochener Schwur nimmt den Bergleuten ihre Ehre und ihren Schutz – doch eine geschlossene Mine nimmt ihnen das Brot. Nur wer beides achtet, findet den wahren Weg zur Silberader.",options:[{id:"dilemma-to-choice",playerText:"Lass uns überlegen, wie wir Licht in den Stollen bringen können.",nextNodeId:"grey_light_choice"},{id:"dilemma-back",playerText:"Zurück zum Hauptgespräch.",nextNodeId:"grey_root"}]},grey_resolution_crystal:{id:"grey_resolution_crystal",speaker:kn,speakerRole:ii,text:"Ein kluger Gedanke! Der stille Glanz aus der Truhe an der Schutzhütte trägt weder Flamme noch Rauch in den Stollen und bringt dennoch das Silber im Fels zum Aufleuchten. Wenn du die Truhe an der Hütte geöffnet hast, steht uns die Entdeckung der Silberader offen!",options:[{id:"back-grey-root",playerText:"Ich habe noch eine andere Frage zum Stollen.",nextNodeId:"grey_root"},{id:"close-grey",playerText:"Glück auf, Graumännchen! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},grey_resolution_honest:{id:"grey_resolution_honest",speaker:kn,speakerRole:ii,text:"Aufrichtigkeit ehrt dich! Ein Versprechen, das dem Schutz des Lebens diente, darf auch im Namen des Lebens gemeinsam erneuert werden. Mit dieser Haltung kannst du den Bergleuten und dem Berg gleichermaßen in die Augen blicken.",options:[{id:"back-grey-root",playerText:"Ich möchte noch etwas anderes fragen.",nextNodeId:"grey_root"},{id:"close-grey",playerText:"Glück auf! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},grey_resolution_strict:{id:"grey_resolution_strict",speaker:kn,speakerRole:ii,text:"Eine strenge, aber standhafte Entscheidung. Wer ein gegebenes Wort selbst in größter Not nicht bricht, bewahrt den Frieden mit dem Berg – auch wenn die Arbeiter dann nach neuen Wegen außerhalb der alten Stollen suchen müssen.",options:[{id:"back-grey-root",playerText:"Lass mich die anderen Möglichkeiten noch einmal abwägen.",nextNodeId:"grey_light_choice"},{id:"close-grey",playerText:"Glück auf! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},nixie_root:{id:"nixie_root",speaker:si,speakerRole:wi,text:"Tritt näher ans Ufer, Wandernde… Siehst du das goldene Schimmern hier unten im klaren Wasser neben meinem Stein? Ein verlockender Schatz ruht auf dem Grund dieses Teichs – doch wisse: Wer nach ihm greift, weckt einen alten Fluch und ruft drohendes Unglück herbei.",options:[{id:"nixie-ask-treasure",playerText:"Was für ein verlockender Schatz liegt dort unten im Teich?",nextNodeId:"nixie_treasure"},{id:"nixie-ask-curse",playerText:"Welcher Fluch und welches Unglück sind mit dem Schatz verbunden?",nextNodeId:"nixie_curse"},{id:"nixie-ask-choice",playerText:"Kann man das drohende Unglück abwenden, oder darf niemand den Schatz berühren?",nextNodeId:"nixie_temptation"},{id:"nixie-bye",playerText:"Ich trete lieber einen Schritt vom Ufer zurück. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},nixie_treasure:{id:"nixie_treasure",speaker:si,speakerRole:wi,text:"Es ist ein uralter Hort aus lauterem Wassergold, geschmiedet zu einer Krone und einem Kelch, die jedem, der sie anblickt, Reichtum und Glanz ohne Mühe versprechen. Schon viele Wandernde sahen ihr Spiegelbild im Gold und vergaßen darüber alles, was ihnen lieb war.",options:[{id:"to-nixie-curse",playerText:"Erzähl mir mehr über den Fluch, der auf diesem Gold liegt.",nextNodeId:"nixie_curse"},{id:"to-nixie-temptation",playerText:"Wie soll ich mich gegenüber einer solchen Versuchung verhalten?",nextNodeId:"nixie_temptation"},{id:"back-nixie-root",playerText:"Zurück zum Anfang unseres Gesprächs.",nextNodeId:"nixie_root"}]},nixie_curse:{id:"nixie_curse",speaker:si,speakerRole:wi,text:"Der Schatz wurde einst in blindem Neid geraubt und im Teich versenkt. Seitdem haftet ihm ein schwerer Fluch an: Wer das Gold aus Eigennutz aus den Fluten hebt, dem verwandelt sich jeder Gewinn in bitteres Unglück – die Quellen im Wald versiegen, und Zwietracht legt sich über das ganze Land.",options:[{id:"curse-to-temptation",playerText:"Gibt es einen Weg, mit dem Schatz und dem Fluch weise umzugehen?",nextNodeId:"nixie_temptation"},{id:"curse-to-root",playerText:"Zurück zur Übersicht.",nextNodeId:"nixie_root"}]},nixie_temptation:{id:"nixie_temptation",speaker:si,speakerRole:wi,text:"Das Wasser prüft das Herz jedes Einzelnen, der an dieses Ufer tritt. Das Gold funkelt zum Greifen nah vor dir im Teich. Wie entscheidest du dich angesichts des verlockenden Schatzes und des drohenden Unglücks?",options:[{id:"nixie-choice-renounce",playerText:"Ich widerstehe der Verlockung – kein Reichtum ist es wert, Unglück über das Land zu bringen.",nextNodeId:"nixie_resolution_renounce"},{id:"nixie-choice-cleanse",playerText:"Ich lasse den Schatz im Teich ruhen, damit das Wasser den Fluch für immer einschließt und hütet.",nextNodeId:"nixie_resolution_cleanse"},{id:"nixie-choice-take",playerText:"Die Verlockung ist zu groß – ich wage es trotzdem, nach dem Gold im Wasser zu greifen.",nextNodeId:"nixie_resolution_take"}]},nixie_resolution_renounce:{id:"nixie_resolution_renounce",speaker:si,speakerRole:wi,text:"Du hast ein klares Auge und ein freies Herz! Wer den schönen Schein durchschaut und dem verlockenden Gold entsagt, über den hat der Fluch keine Macht. Nimm meinen Segen des klaren Wassers mit auf deinen weiteren Weg.",options:[{id:"back-nixie-root",playerText:"Ich möchte dich noch etwas anderes fragen.",nextNodeId:"nixie_root"},{id:"close-nixie",playerText:"Leb wohl, Nixe vom Spiegelteich! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},nixie_resolution_cleanse:{id:"nixie_resolution_cleanse",speaker:si,speakerRole:wi,text:"Weise gesprochen! Solange der Schatz unangetastet auf dem Grund des Teichs unter meiner Wacht verbleibt, schläft das drohende Unglück unter den Wellen und der Spiegelteich bleibt eine friedliche Quelle für den ganzen Wald.",options:[{id:"back-nixie-root",playerText:"Zurück zum Anfang unseres Gesprächs.",nextNodeId:"nixie_root"},{id:"close-nixie",playerText:"Hab Dank für deine Warnung! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},nixie_resolution_take:{id:"nixie_resolution_take",speaker:si,speakerRole:wi,text:"Halt ein! Kaum berühren deine Finger die kalte Wasseroberfläche, zieht ein dunkler Schatten über den Teich und die Wellen schlagen eisig gegen meinen Stein. Spürst du die Kälte des Fluchs? Zieh deine Hand zurück, solange das Unglück noch schläft!",options:[{id:"reconsider-nixie",playerText:"Ich ziehe meine Hand rasch zurück und überdenke meine Wahl!",nextNodeId:"nixie_temptation"},{id:"close-nixie",playerText:"Ich trete vom Wasser zurück. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},giant_root:{id:"giant_root",speaker:ri,speakerRole:Si,text:"Halt vor dem Wehr, kleines Menschenkind! Du stehst auf meiner Brücke über dem Quellbach. Siehst du das geschlossene Wehr und den kleinen Stausee dahinter? Eine Bergquelle versorgt von hier aus eigentlich das Tal. Ihre Freigabe könnte unten im Tal eine schwere Dürre lindern – doch wenn das Wehr geöffnet wird, zerstört das meine Heimat!",options:[{id:"giant-ask-drought",playerText:"Wie steht es um die Quelle und die Dürre unten im Tal?",nextNodeId:"giant_source_drought"},{id:"giant-ask-home",playerText:"Warum würde die Freigabe der Quelle deine Heimat zerstören?",nextNodeId:"giant_homeland"},{id:"giant-ask-choice",playerText:"Was soll mit dem geschlossenen Wehr geschehen – das Tal retten oder deine Heimat schützen?",nextNodeId:"giant_dilemma"},{id:"giant-bye",playerText:"Ich blicke noch einen Moment auf das gestaute Wasser. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},giant_source_drought:{id:"giant_source_drought",speaker:ri,speakerRole:Si,text:"Unter dieser Brücke floss einst ein breiter Bach ins Tal hinab. Seit Wochen hat es im Unterland keinen Tropfen geregnet: Die Felder verdorren, die Brunnen sind leer, und nur das klare Wasser aus meiner Bergquelle hier im Stausee könnte die Dürre im Tal noch lindern.",options:[{id:"to-giant-home",playerText:"Und warum hältst du das Wehr an der Brücke dennoch geschlossen?",nextNodeId:"giant_homeland"},{id:"to-giant-dilemma",playerText:"Lass uns nach einer Entscheidung für das Wehr suchen.",nextNodeId:"giant_dilemma"},{id:"back-giant-root",playerText:"Zurück zum Anfang unseres Gesprächs.",nextNodeId:"giant_root"}]},giant_homeland:{id:"giant_homeland",speaker:ri,speakerRole:Si,text:"Dieser kleine Stausee und die Uferhöhlen unter den alten Baumwurzeln sind seit Jahrhunderten meine einzige Heimat! Das gestaute Wasser trägt das Wurzelwerk und schützt mein Felslager. Reißt man das Wehr auf, bricht das Ufer ein, die Flutwelle reißt mein Heim unter der Brücke fort und lässt nur nackten Schlamm zurück.",options:[{id:"home-to-dilemma",playerText:"Wie können wir zwischen der Dürre im Tal und deiner Heimat entscheiden?",nextNodeId:"giant_dilemma"},{id:"home-to-root",playerText:"Zurück zur Übersicht.",nextNodeId:"giant_root"}]},giant_dilemma:{id:"giant_dilemma",speaker:ri,speakerRole:Si,text:"Meine Hand ruht schwer auf dem eisernen Stellrad des Wehrs. Öffne ich es, lebt das Tal auf und meine Heimat vergeht. Halte ich es verschlossen, bleibt mein Heim bestehen, während das Tal verdorrt. Welchen Rat gibst du mir, Wandernde?",options:[{id:"giant-choice-compromise",playerText:"Heb das Wehr nur einen gemessenen Spalt weit an und stütze dein Ufer mit Felsblöcken – so fließt genug Wasser gegen die Dürre, ohne dass der Stausee einbricht.",nextNodeId:"giant_resolution_compromise"},{id:"giant-choice-open",playerText:"Das Leben eines ganzen Tals wiegt schwerer – gib die Quelle vollständig frei, um die Dürre zu beenden.",nextNodeId:"giant_resolution_open"},{id:"giant-choice-closed",playerText:"Niemand darf gezwungen werden, seine eigene Heimat zu zerstören – lass das Wehr geschlossen.",nextNodeId:"giant_resolution_closed"}]},giant_resolution_compromise:{id:"giant_resolution_compromise",speaker:ri,speakerRole:Si,text:"Bei den alten Felsen… daran hat mein schwerer Sinn noch nicht gedacht! Mit meiner Riesenkraft kann ich neue Steindämme vor meine Uferhöhle setzen und das Wehr Raste um Raste öffnen. So strömt der Bach wieder unter der Brücke ins dürre Tal, und mein kleiner Stausee bleibt dennoch erhalten!",options:[{id:"back-giant-root",playerText:"Ich möchte dich noch etwas anderes zum Wehr fragen.",nextNodeId:"giant_root"},{id:"close-giant",playerText:"Möge das Wasser Tal und Heimat gleichermaßen bewahren! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},giant_resolution_open:{id:"giant_resolution_open",speaker:ri,speakerRole:Si,text:"Ein schmerzhafter, aber selbstloser Rat. Wenn das Tal gerettet wird, will ich den Verlust meiner alten Wohnstätte am Stausee tragen und mir höher oben im Gebirge eine neue Zuflucht suchen.",options:[{id:"back-giant-root",playerText:"Lass uns die anderen Möglichkeiten noch einmal bedenken.",nextNodeId:"giant_dilemma"},{id:"close-giant",playerText:"Hab Dank für deine Größe, Hüter des Wehrs! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},giant_resolution_closed:{id:"giant_resolution_closed",speaker:ri,speakerRole:Si,text:"Du sprichst aus Mitgefühl für meine Heimat. Doch solange das Wehr ganz geschlossen bleibt, lässt mir das Stöhnen des ausgetrockneten Tals unter der Brücke keine Ruhe.",options:[{id:"back-giant-dilemma",playerText:"Vielleicht gibt es doch einen Weg, dem Tal zu helfen.",nextNodeId:"giant_dilemma"},{id:"close-giant",playerText:"Ich lasse dich über das Wehr wachen. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},wood_woman_root:{id:"wood_woman_root",speaker:Kt,speakerRole:Ti,text:"Sei gegrüßt auf dieser geschlagenen Lichtung, Wandernde… Siehst du die vielen frischen Baumstümpfe und die hohen Scheitstapel hier im Holzfällerlager? Das Brennholz rettet die Dorfbewohner unten im Tal vor der bitteren Kälte – doch zu starke Fällungen gefährden den Wald und seine gesamte Umgebung!",options:[{id:"wood-ask-cold",playerText:"Warum brauchen die Dorfbewohner so dringend so viel Brennholz?",nextNodeId:"wood_woman_village_cold"},{id:"wood-ask-forest",playerText:"Wie gefährden die starken Fällungen den Wald und seine Umgebung?",nextNodeId:"wood_woman_forest_danger"},{id:"wood-ask-choice",playerText:"Wie können wir die Dorfbewohner vor der Kälte schützen, ohne den Wald zu zerstören?",nextNodeId:"wood_woman_dilemma"},{id:"wood-bye",playerText:"Ich sehe mich noch im Holzfällerlager um. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},wood_woman_village_cold:{id:"wood_woman_village_cold",speaker:Kt,speakerRole:Ti,text:"Ein früher, schneidender Frost zieht aus den Bergen herab. In den Hütten des Dorfes frieren die Alten und die Kinder, und die Vorräte vom Vorjahr sind fast verbrannt. Darum rückten die Holzfäller mit Axt und Schrotsäge aus: Jedes Klafter Brennholz hier auf der Lichtung bedeutet Wärme und Überleben für die Familien im Dorf.",options:[{id:"to-wood-forest",playerText:"Und welchen Schaden richten die fortgesetzten Fällungen hier im Wald an?",nextNodeId:"wood_woman_forest_danger"},{id:"to-wood-dilemma",playerText:"Lass uns überlegen, wie viel Holz geschlagen werden darf.",nextNodeId:"wood_woman_dilemma"},{id:"back-wood-root",playerText:"Zurück zum Anfang unseres Gesprächs.",nextNodeId:"wood_woman_root"}]},wood_woman_forest_danger:{id:"wood_woman_forest_danger",speaker:Kt,speakerRole:Ti,text:"Schau auf die kahlen Stümpfe ringsum! Wenn die alten Schirmbäume alle auf einmal fallen, verliert der Waldboden seinen Halt: Bei Schneeschmelze und Regen rutscht die Erde ins Tal, der eisige Sturm fegt ungebremst durch die Schneisen, die Tiere verlieren ihren Schutz und die Lebensgeister der Bäume schwinden.",options:[{id:"forest-to-dilemma",playerText:"Welchen Ausweg gibt es zwischen der Kälte im Dorf und dem Schutz des Waldes?",nextNodeId:"wood_woman_dilemma"},{id:"forest-to-root",playerText:"Zurück zur Übersicht.",nextNodeId:"wood_woman_root"}]},wood_woman_dilemma:{id:"wood_woman_dilemma",speaker:Kt,speakerRole:Ti,text:"Die Holzfäller warten auf ein Zeichen, wie es auf dieser Lichtung weitergehen soll. Schlagen sie weiter wie bisher, übersteht das Dorf den Winter warm, aber der Wald und die Hänge ringsum nehmen schweren Schaden. Welchen Rat gibst du hier im Holzfällerlager?",options:[{id:"wood-choice-balance",playerText:"Nur Bruch- und Dürrholz sowie einzelne Stämme mit Maß entnehmen, die Baumstümpfe segnen und im Frühjahr für jeden Stamm junge Bäume nachpflanzen.",nextNodeId:"wood_woman_resolution_balance"},{id:"wood-choice-village",playerText:"Das Leben der frierenden Dorfbewohner geht vor – es muss so viel Brennholz geschlagen werden, bis alle Öfen versorgt sind.",nextNodeId:"wood_woman_resolution_village"},{id:"wood-choice-forest",playerText:"Die Fällungen müssen sofort gestoppt werden – kein weiterer Baum darf mehr der Axt zum Opfer fallen.",nextNodeId:"wood_woman_resolution_forest"}]},wood_woman_resolution_balance:{id:"wood_woman_resolution_balance",speaker:Kt,speakerRole:Ti,text:"Hab tausend Dank, du verständige Seele! Wer dem Wald nur nimmt, was er verkraftet, und ihm neues Leben zurückgibt, dem hilft auch das Holzweibchen: Ich lege meinen Moossegen auf die bereits gestapelten Scheite – sie werden im Dorf doppelt so lange glühen und wärmen, ohne dass der Hochwald kahlgeschlagen wird!",options:[{id:"back-wood-root",playerText:"Ich möchte dich noch etwas anderes zum Holzfällerlager fragen.",nextNodeId:"wood_woman_root"},{id:"close-wood",playerText:"Mögen Dorf und Wald gemeinsam durch den Winter kommen! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},wood_woman_resolution_village:{id:"wood_woman_resolution_village",speaker:Kt,speakerRole:Ti,text:"Dein Herz schlägt für die frierenden Menschen im Tal. In diesem Winter wird niemand im Dorf unter der Kälte leiden – doch wenn der Frühling kommt, werden die kahlen Hänge und der verletzte Wald uns alle mahnen, wie teuer diese Wärme erkauft wurde.",options:[{id:"back-wood-dilemma",playerText:"Lass mich die anderen Möglichkeiten noch einmal abwägen.",nextNodeId:"wood_woman_dilemma"},{id:"close-wood",playerText:"Leb wohl, Holzweibchen! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},wood_woman_resolution_forest:{id:"wood_woman_resolution_forest",speaker:Kt,speakerRole:Ti,text:"Die Bäume und die Tiere des Waldes atmen auf, wenn Axt und Säge schweigen. Doch vergiss nicht die Hütten unten im Tal – ganz ohne Brennholz wird die Kälte dort zur bitteren Prüfung werden.",options:[{id:"back-wood-dilemma",playerText:"Vielleicht finden wir doch einen Ausgleich für Dorf und Wald.",nextNodeId:"wood_woman_dilemma"},{id:"close-wood",playerText:"Behüte den Wald gut, Holzweibchen! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},devil_root:{id:"devil_root",speaker:Cr,speakerRole:Io,text:"Sieh an... Eine sterbliche Seele wagt sich bis an den Rand meines Höllenschlundes. Das Feuer brennt hier seit Anbeginn der Zeiten – und ich beobachte jeden Schritt auf den sieben Wegen.",options:[{id:"devil-ask-chasm",playerText:"Was ist das für ein Ort und warum brennt hier alles?",nextNodeId:"devil_about_chasm"},{id:"devil-ask-identity",playerText:"Bist du wahrhaftig der Teufel?",nextNodeId:"devil_about_identity"},{id:"devil-bye",playerText:"Ich sehe mich erst einmal weiter um. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},devil_about_chasm:{id:"devil_about_chasm",speaker:Cr,speakerRole:Io,text:"Dies ist der Schlund der Glut und der ewigen Prüfungen. Viele suchen Macht, viele fürchten das Feuer. Noch ist deine Stunde nicht gekommen, Wanderer – doch merke dir diesen Ort gut.",options:[{id:"devil-to-identity",playerText:"Wer bist du genau?",nextNodeId:"devil_about_identity"},{id:"devil-close-chasm",playerText:"Ich trete vorsichtig vom Kraterrand zurück. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},devil_about_identity:{id:"devil_about_identity",speaker:Cr,speakerRole:Io,text:"Man nennt mich den Versucher, den Fürsten der Glut, den Teufel. Noch trage ich dir keinen Handel an... doch wenn deine Reise voranschreitet, werden sich unsere Pfade erneut kreuzen.",options:[{id:"devil-to-chasm",playerText:"Erzähl mir mehr über diesen flammenden Abgrund.",nextNodeId:"devil_about_chasm"},{id:"devil-close-identity",playerText:"Ich werde wachsam bleiben. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},hunter_root:{id:"hunter_root",speaker:zs,speakerRole:Lo,text:"Halt, Wanderer! Tritt nicht zwischen uns – mein Jagdhund knurrt und mein Pferd schlägt aus vor Unruhe! Ich habe dieses Holzweibchen quer durch den Forst bis hierher an meine Jagdhütte verfolgt. Sie hat sich nachts in meinen umzäunten Kräutergarten geschlichen und die seltenen Heilsalben-Kräuter gestohlen! Ein Diebstahl bleibt ein Vergehen gegen die Ordnung des Waldes!",options:[{id:"hunter-ask-theft",playerText:"Welche Kräuter wirfst du dem Holzweibchen vor, gestohlen zu haben?",nextNodeId:"hunter_herbs"},{id:"hunter-ask-demand",playerText:"Was forderst du nun von ihr als Sühne?",nextNodeId:"hunter_demand"},{id:"hunter-switch-wood-woman",playerText:"Ich möchte hören, was das Holzweibchen zu ihrer Verteidigung sagt.",nextNodeId:"wood_lodge_root"},{id:"hunter-bye",playerText:"Klärt euren Streit mit Bedacht. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},hunter_herbs:{id:"hunter_herbs",speaker:zs,speakerRole:Lo,text:"Es handelt sich um die seltene Mondwurz und den Königs-Salbei! Ich hege diesen Kräutergarten seit vielen Wintern mit eigenen Händen. Aus den Blättern bereite ich Wundsalben für mein Jagdgespann und die Dorfleute. Wenn jeder nimmt, was ihm beliebt, bricht die Jagdordnung zusammen!",options:[{id:"hunter-to-demand",playerText:"Was verlangst du jetzt von ihr?",nextNodeId:"hunter_demand"},{id:"hunter-to-wood-view",playerText:"Lass mich die Gegenseite anhören.",nextNodeId:"wood_lodge_root"},{id:"hunter-close-herbs",playerText:"Ich verstehe deinen Zorn. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},hunter_demand:{id:"hunter_demand",speaker:zs,speakerRole:Lo,text:"Sie soll die restlichen Wurzeln sofort zurücklegen und geloben, diesen Zaun nie wieder heimlich zu überwinden! Ein Jäger achtet das Wild – aber er duldet keinen Raub in seinem eigenen Revier!",options:[{id:"hunter-to-wood-plea",playerText:"Ich rede mit dem Holzweibchen darüber.",nextNodeId:"wood_lodge_root"},{id:"hunter-close-demand",playerText:"Ich denke über deine Worte nach. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},wood_lodge_root:{id:"wood_lodge_root",speaker:Kt,speakerRole:"Verteidigerin des Waldes an der Jagdhütte",text:"Glaube dem stolzen Jäger kein bitteres Wort! Ja, ich pflückte von der Mondwurz aus seinem Garten – doch drüben im Brombeerdickicht lag eine junge Hirschkuh mit tief gerissener Flanke im Wundfieber! Ohne den Wurzelsaft wäre sie vor Morgengrauen verendet. Er sperrt Heilung hinter Zäunen ein, während der Wald leidet! Darf ein Zaun mehr wert sein als das lebendige Herz eines Geschöpfs?",options:[{id:"wood-ask-life",playerText:"Konntest du das Tier mit den Kräutern retten?",nextNodeId:"wood_lodge_life"},{id:"wood-ask-hunter-law",playerText:"Verstehst du denn auch die Sorge des Jägers um seinen gehegten Garten?",nextNodeId:"wood_lodge_hunter_view"},{id:"wood-switch-hunter",playerText:"Ich möchte hören, was der Wilde Jäger dazu entgegnet.",nextNodeId:"hunter_root"},{id:"wood-bye",playerText:"Möge sich eine gerechte Einigung finden. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},wood_lodge_life:{id:"wood_lodge_life",speaker:Kt,speakerRole:"Verteidigerin des Waldes an der Jagdhütte",text:"Das Fieber sank und die Wunde schloss sich! Die Hirschkuh atmet und steht wieder auf eigenen Läufen. Der Garten des Jägers wird im nächsten Frühjahr neu austreiben – doch ein verstorbenes Waldwesen kehrt nie wieder.",options:[{id:"wood-to-hunter-view",playerText:"Aber wie soll der Jäger dir vertrauen, wenn du im Dunkeln nimmst?",nextNodeId:"wood_lodge_hunter_view"},{id:"wood-to-hunter-direct",playerText:"Lass mich mit dem Jäger sprechen.",nextNodeId:"hunter_root"},{id:"wood-close-life",playerText:"Ein edler Beweggrund, doch ein schwieriges Dilemma. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]},wood_lodge_hunter_view:{id:"wood_lodge_hunter_view",speaker:Kt,speakerRole:"Verteidigerin des Waldes an der Jagdhütte",text:"Ich anerkenne seine Mühe um diesen Kräutergarten. Wäre der Jäger zugegen gewesen, hätte ich ihn um die Wurzeln gebeten. Wenn er mir vergibt, pflanze ich ihm im Frühling wilde Waldminze und Alant als Ausgleich an den Zaun.",options:[{id:"wood-to-hunter-offer",playerText:"Das ist ein faires Angebot. Ich trage es dem Wilden Jäger vor.",nextNodeId:"hunter_root"},{id:"wood-close-view",playerText:"Ich danke dir für deine ehrliche Sicht der Dinge. (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]}};for(const e of mt){const t=e.id===1?[{id:"walk-to-cave-1",playerText:"Den gesamten 1. Weg durch die Kurve bis zum Berg & Graumännchen wandern",nextNodeId:null,action:{type:"walk_to_grey_man"}}]:e.id===2?[{id:"walk-to-pond-2",playerText:"Den gesamten 2. Weg bis zum Waldteich und der Nixe wandern",nextNodeId:null,action:{type:"walk_to_nixie"}}]:e.id===3?[{id:"walk-to-weir-3",playerText:"Den gesamten 3. Weg über die Brücke bis zum Wehr und dem Riesen wandern",nextNodeId:null,action:{type:"walk_to_giant"}}]:e.id===4?[{id:"walk-to-wood-woman-4",playerText:"Den gesamten 4. Weg bis zum Holzfällerlager und dem Holzweibchen wandern",nextNodeId:null,action:{type:"walk_to_wood_woman"}}]:e.id===5?[{id:"walk-to-devil-5",playerText:"Den gesamten 5. Weg bis zum Höllenschlund und dem Teufel wandern",nextNodeId:null,action:{type:"walk_to_devil"}}]:e.id===6?[{id:"walk-to-wild-hunter-6",playerText:"Den gesamten 6. Weg bis zur Jagdhütte und dem Streit wandern",nextNodeId:null,action:{type:"walk_to_wild_hunter"}}]:[];s[`path_${e.id}`]={id:`path_${e.id}`,speaker:vn,speakerRole:zn,text:sx[e.id]??e.subtitle,options:[...t,{id:`go-path-${e.id}`,playerText:`Zum Wegeingang von „${e.name}“ gehen`,nextNodeId:null,action:{type:"select_path",pathId:e.id}},{id:"other-path",playerText:"Nach einem anderen der sieben Wege fragen",nextNodeId:"paths_overview"},{id:"close-path",playerText:"Danke für den Hinweis! (Gespräch beenden)",nextNodeId:null,action:{type:"close"}}]}}return s}const ox=rx();class ax{hutPos={x:0,z:0};hutHalfWidth=1.95;hutHalfDepth=1.55;chestPos={x:.85,z:2};chestCollisionRadius=.48;signpostPos={x:2.3,z:2.4};signpostCollisionRadius=.55;npcPos={x:-1.85,z:2.05};npcCollisionRadius=.48;greyManPos={...Sa};greyManCollisionRadius=.5;cavePos={x:yt.x,z:yt.z};caveCollisionRadius=3;caveFrontWallLz=1.55;caveLocalRockColliders=[{lx:0,lz:-1.45,radius:3},{lx:-3.5,lz:-2.1,radius:3.65},{lx:3.6,lz:-2.2,radius:3.85}];pondPos={x:$t.x,z:$t.z};pondCollisionRadius=4.25;nixiePos={...Ta};nixieTalkDistance=3.25;weirBridgePos={x:Yt.x,z:Yt.z};giantPos={...ba};giantCollisionRadius=.85;lumberCampPos={x:Qt.x,z:Qt.z};woodWomanPos={...Ea};woodWomanCollisionRadius=.55;hellChasmPos={x:yn.x,z:yn.z};hellChasmCollisionRadius=6.8;devilPos={...Aa};devilCollisionRadius=.85;devilTalkDistance=6.2;huntingLodgePos={x:Mn.x,z:Mn.z};wildHunterPos={...Pr};wildHunterCollisionRadius=.55;woodWomanLodgePos={...Ra};woodWomanLodgeCollisionRadius=.55;huntingCabinCenter={x:-46.6,z:26};huntingCabinHalfWidth=2.3;huntingCabinHalfDepth=2;horsePos={x:-43.6,z:20.4};horseCollisionRadius=.85;clearingRadius=6.5;pathHalfWidth=.95;maxRadius=26;playerPos={x:0,z:5.2};targetPos=null;selectedPathId=null;chestOpen=!1;getPlayerPosition(){return{...this.playerPos}}getTargetPosition(){return this.targetPos?{...this.targetPos}:null}getSignpostPosition(){return{...this.signpostPos}}getHutPosition(){return{...this.hutPos}}getNpcPosition(){return{...this.npcPos}}getGreyManPosition(){return{...this.greyManPos}}getNixiePosition(){return{...this.nixiePos}}getGiantPosition(){return{...this.giantPos}}getWoodWomanPosition(){return{...this.woodWomanPos}}getDevilPosition(){return{...this.devilPos}}getWildHunterPosition(){return{...this.wildHunterPos}}getWoodWomanLodgePosition(){return{...this.woodWomanLodgePos}}getChestPosition(){return{...this.chestPos}}isChestOpen(){return this.chestOpen}toggleChest(){return this.chestOpen=!this.chestOpen,this.chestOpen}setChestOpen(e){this.chestOpen=e}isNearNpc(){return Math.hypot(this.playerPos.x-this.npcPos.x,this.playerPos.z-this.npcPos.z)<=this.npcCollisionRadius+1.05}isNearGreyMan(){return Math.hypot(this.playerPos.x-this.greyManPos.x,this.playerPos.z-this.greyManPos.z)<=this.greyManCollisionRadius+1.25}isNearNixie(){return Math.hypot(this.playerPos.x-this.nixiePos.x,this.playerPos.z-this.nixiePos.z)<=this.nixieTalkDistance}isNearGiant(){return Math.hypot(this.playerPos.x-this.giantPos.x,this.playerPos.z-this.giantPos.z)<=this.giantCollisionRadius+1.45}isNearWoodWoman(){return Math.hypot(this.playerPos.x-this.woodWomanPos.x,this.playerPos.z-this.woodWomanPos.z)<=this.woodWomanCollisionRadius+1.45}isNearDevil(){return Math.hypot(this.playerPos.x-this.devilPos.x,this.playerPos.z-this.devilPos.z)<=this.devilTalkDistance}isNearWildHunter(){return Math.hypot(this.playerPos.x-this.wildHunterPos.x,this.playerPos.z-this.wildHunterPos.z)<=this.wildHunterCollisionRadius+1.45}isNearWoodWomanLodge(){return Math.hypot(this.playerPos.x-this.woodWomanLodgePos.x,this.playerPos.z-this.woodWomanLodgePos.z)<=this.woodWomanLodgeCollisionRadius+1.45}isNearChest(){return Math.hypot(this.playerPos.x-this.chestPos.x,this.playerPos.z-this.chestPos.z)<=this.chestCollisionRadius+1.05}isOnClearing(){return Math.hypot(this.playerPos.x,this.playerPos.z)<=this.clearingRadius+.15}setTargetToClearing(){return this.selectedPathId=null,this.setTargetPosition(0,4.2)}getSelectedPath(){return this.selectedPathId===null?null:mt.find(e=>e.id===this.selectedPathId)??null}selectPath(e){if(e===null)return this.selectedPathId=null,null;const t=mt.find(n=>n.id===e)??null;return this.selectedPathId=t?t.id:null,t}evaluateCurvedPathSegment(e,t,n,i,r){const o=n[r],a=n[r+1],c=a.x-o.x,l=a.z-o.z,h=Math.hypot(c,l);if(h<1e-6)return{cx:o.x,cz:o.z,radius:this.pathHalfWidth};const d=c/h,u=l/h,f=e-o.x,g=t-o.z,_=f*d+g*u;if(r===n.length-2){const p=this.pathHalfWidth,v=i-p,y=Math.hypot(f-_*d,g-_*u),P=Math.sqrt(Math.max(1e-4,h*h-v*v)),E=_+y*(v/P),R=Math.max(0,Math.min(1,E/h));return{cx:o.x+R*c,cz:o.z+R*l,radius:p+R*v}}const m=Math.max(0,Math.min(1,_/h));return{cx:o.x+m*c,cz:o.z+m*l,radius:this.pathHalfWidth}}isPointOnPath1(e,t){for(let i=0;i<tn.length-1;i++){const{cx:r,cz:o,radius:a}=this.evaluateCurvedPathSegment(e,t,tn,Ur.radius,i);if(Math.hypot(e-r,t-o)<=a+1e-4)return!0}return!1}isPointOnPath2(e,t){for(let i=0;i<nn.length-1;i++){const{cx:r,cz:o,radius:a}=this.evaluateCurvedPathSegment(e,t,nn,Or.radius,i);if(Math.hypot(e-r,t-o)<=a+1e-4)return!0}return!1}isPointOnPath3(e,t){for(let i=0;i<sn.length-1;i++){const{cx:r,cz:o,radius:a}=this.evaluateCurvedPathSegment(e,t,sn,Os.radius,i);if(Math.hypot(e-r,t-o)<=a+1e-4)return!0}return!1}isPointOnPath4(e,t){for(let i=0;i<rn.length-1;i++){const{cx:r,cz:o,radius:a}=this.evaluateCurvedPathSegment(e,t,rn,zr.radius,i);if(Math.hypot(e-r,t-o)<=a+1e-4)return!0}return!1}isPointOnPath5(e,t){for(let i=0;i<on.length-1;i++){const{cx:r,cz:o,radius:a}=this.evaluateCurvedPathSegment(e,t,on,Fr.radius,i);if(Math.hypot(e-r,t-o)<=a+1e-4)return!0}return!1}isPointOnPath6(e,t){for(let i=0;i<an.length-1;i++){const{cx:r,cz:o,radius:a}=this.evaluateCurvedPathSegment(e,t,an,kr.radius,i);if(Math.hypot(e-r,t-o)<=a+1e-4)return!0}return!1}isPointOnClearingOrPath(e,t){const i=Math.hypot(e,t);if(i<=this.clearingRadius+1e-4||this.isPointOnPath1(e,t)||this.isPointOnPath2(e,t)||this.isPointOnPath3(e,t)||this.isPointOnPath4(e,t)||this.isPointOnPath5(e,t)||this.isPointOnPath6(e,t))return!0;if(i>this.maxRadius+1e-4)return!1;for(const r of mt){if(r.id<=6)continue;const o=Math.sin(r.angleRad),a=-Math.cos(r.angleRad),c=e*o+t*a;if(c>=this.clearingRadius-.5&&c<=this.maxRadius+1e-4&&Math.abs(e*-a+t*o)<=this.pathHalfWidth+1e-4)return!0}return!1}toCaveLocal(e,t){const n=e-yt.x,i=t-yt.z,r=Math.cos(yt.rotationY),o=Math.sin(yt.rotationY);return{lx:n*r-i*o,lz:n*o+i*r}}fromCaveLocal(e,t){const n=Math.cos(yt.rotationY),i=Math.sin(yt.rotationY);return{x:yt.x+e*n+t*i,z:yt.z-e*i+t*n}}isCollidingWithObstacles(e,t){if(Math.abs(e-this.hutPos.x)<this.hutHalfWidth-1e-4&&Math.abs(t-this.hutPos.z)<this.hutHalfDepth-1e-4||Math.hypot(e-this.chestPos.x,t-this.chestPos.z)<this.chestCollisionRadius-1e-4||Math.hypot(e-this.signpostPos.x,t-this.signpostPos.z)<this.signpostCollisionRadius-1e-4||Math.hypot(e-this.npcPos.x,t-this.npcPos.z)<this.npcCollisionRadius-1e-4||Math.hypot(e-this.greyManPos.x,t-this.greyManPos.z)<this.greyManCollisionRadius-1e-4||Math.hypot(e-this.cavePos.x,t-this.cavePos.z)<this.caveCollisionRadius-1e-4)return!0;const r=this.toCaveLocal(e,t);if(Math.abs(r.lx)<8.5&&r.lz>-10&&r.lz<this.caveFrontWallLz-1e-4)return!0;for(const a of this.caveLocalRockColliders)if(Math.hypot(r.lx-a.lx,r.lz-a.lz)<a.radius-1e-4)return!0;return Math.hypot(e-this.pondPos.x,t-this.pondPos.z)<this.pondCollisionRadius-1e-4||Math.hypot(e-this.giantPos.x,t-this.giantPos.z)<this.giantCollisionRadius-1e-4||Math.hypot(e-this.woodWomanPos.x,t-this.woodWomanPos.z)<this.woodWomanCollisionRadius-1e-4||Math.hypot(e-this.devilPos.x,t-this.devilPos.z)<this.devilCollisionRadius-1e-4||Math.hypot(e-this.hellChasmPos.x,t-this.hellChasmPos.z)<this.hellChasmCollisionRadius-1e-4||Math.hypot(e-this.wildHunterPos.x,t-this.wildHunterPos.z)<this.wildHunterCollisionRadius-1e-4||Math.hypot(e-this.woodWomanLodgePos.x,t-this.woodWomanLodgePos.z)<this.woodWomanLodgeCollisionRadius-1e-4||Math.hypot(e-this.horsePos.x,t-this.horsePos.z)<this.horseCollisionRadius-1e-4||Math.abs(e-this.huntingCabinCenter.x)<this.huntingCabinHalfWidth-1e-4&&Math.abs(t-this.huntingCabinCenter.z)<this.huntingCabinHalfDepth-1e-4}isWalkable(e,t){return this.isPointOnClearingOrPath(e,t)&&!this.isCollidingWithObstacles(e,t)}projectOntoCurvedPath(e,t,n,i){let r={x:n[0].x,z:n[0].z},o=1/0;for(let a=0;a<n.length-1;a++){const{cx:c,cz:l,radius:h}=this.evaluateCurvedPathSegment(e,t,n,i,a),d=e-c,u=t-l,f=Math.hypot(d,u),g=f-h;if(g<=0)return{x:e,z:t};g<o&&(o=g,r=f<1e-6?{x:c,z:l}:{x:c+d/f*h,z:l+u/f*h})}return r}projectOntoWalkableSurface(e,t,n=null){if(this.isPointOnClearingOrPath(e,t)){if(n===null||Math.hypot(e,t)<=this.clearingRadius)return{x:e,z:t};const c=this.getClosestPathAt(e,t);if(c&&c.id===n)return{x:e,z:t}}const i=Math.hypot(e,t);let r=i===0?{x:0,z:this.clearingRadius}:{x:e/i*this.clearingRadius,z:t/i*this.clearingRadius},o=(e-r.x)**2+(t-r.z)**2;const a=n!==null?mt.filter(c=>c.id===n):mt;for(const c of a){if(c.id===1){const x=this.projectOntoCurvedPath(e,t,tn,Ur.radius),v=(e-x.x)**2+(t-x.z)**2;v<o&&(o=v,r=x);continue}if(c.id===2){const x=this.projectOntoCurvedPath(e,t,nn,Or.radius),v=(e-x.x)**2+(t-x.z)**2;v<o&&(o=v,r=x);continue}if(c.id===3){const x=this.projectOntoCurvedPath(e,t,sn,Os.radius),v=(e-x.x)**2+(t-x.z)**2;v<o&&(o=v,r=x);continue}if(c.id===4){const x=this.projectOntoCurvedPath(e,t,rn,zr.radius),v=(e-x.x)**2+(t-x.z)**2;v<o&&(o=v,r=x);continue}if(c.id===5){const x=this.projectOntoCurvedPath(e,t,on,Fr.radius),v=(e-x.x)**2+(t-x.z)**2;v<o&&(o=v,r=x);continue}if(c.id===6){const x=this.projectOntoCurvedPath(e,t,an,kr.radius),v=(e-x.x)**2+(t-x.z)**2;v<o&&(o=v,r=x);continue}const l=Math.sin(c.angleRad),h=-Math.cos(c.angleRad),d=-h,u=l,f=Math.max(this.clearingRadius-.2,Math.min(this.maxRadius,e*l+t*h)),g=Math.max(-this.pathHalfWidth,Math.min(this.pathHalfWidth,e*d+t*u)),_=l*f+d*g,m=h*f+u*g,p=(e-_)**2+(t-m)**2;p<o&&(o=p,r={x:_,z:m})}return r}pushOutOfCircle(e,t,n,i){const r=e-n.x,o=t-n.z,a=Math.hypot(r,o);if(a>=i)return{x:e,z:t};if(a<1e-4)return{x:n.x,z:n.z+i};const c=i/a;return{x:n.x+r*c,z:n.z+o*c}}resolveObstacleCollisions(e,t){let n=e,i=t;for(let r=0;r<3;r++){const o=this.pushOutOfCircle(n,i,this.chestPos,this.chestCollisionRadius);n=o.x,i=o.z;const a=this.pushOutOfCircle(n,i,this.signpostPos,this.signpostCollisionRadius);n=a.x,i=a.z;const c=this.pushOutOfCircle(n,i,this.npcPos,this.npcCollisionRadius);n=c.x,i=c.z;const l=this.pushOutOfCircle(n,i,this.greyManPos,this.greyManCollisionRadius);n=l.x,i=l.z;const h=this.pushOutOfCircle(n,i,this.cavePos,this.caveCollisionRadius);n=h.x,i=h.z;let d=this.toCaveLocal(n,i);for(const w of this.caveLocalRockColliders){const M=this.pushOutOfCircle(d.lx,d.lz,{x:w.lx,z:w.lz},w.radius);d={lx:M.x,lz:M.z}}Math.abs(d.lx)<8.5&&d.lz>-10&&d.lz<this.caveFrontWallLz&&(d.lz=this.caveFrontWallLz);const u=this.fromCaveLocal(d.lx,d.lz);n=u.x,i=u.z;const f=this.pushOutOfCircle(n,i,this.pondPos,this.pondCollisionRadius);n=f.x,i=f.z;const g=this.pushOutOfCircle(n,i,this.giantPos,this.giantCollisionRadius);n=g.x,i=g.z;const _=this.pushOutOfCircle(n,i,this.woodWomanPos,this.woodWomanCollisionRadius);n=_.x,i=_.z;const m=this.pushOutOfCircle(n,i,this.devilPos,this.devilCollisionRadius);n=m.x,i=m.z;const p=this.pushOutOfCircle(n,i,this.hellChasmPos,this.hellChasmCollisionRadius);n=p.x,i=p.z;const x=this.pushOutOfCircle(n,i,this.wildHunterPos,this.wildHunterCollisionRadius);n=x.x,i=x.z;const v=this.pushOutOfCircle(n,i,this.woodWomanLodgePos,this.woodWomanLodgeCollisionRadius);n=v.x,i=v.z;const y=this.pushOutOfCircle(n,i,this.horsePos,this.horseCollisionRadius);n=y.x,i=y.z;const P=n-this.huntingCabinCenter.x,E=i-this.huntingCabinCenter.z;if(Math.abs(P)<this.huntingCabinHalfWidth&&Math.abs(E)<this.huntingCabinHalfDepth){const w=this.huntingCabinHalfWidth-Math.abs(P),M=this.huntingCabinHalfDepth-Math.abs(E);w<M?n=this.huntingCabinCenter.x+(P>=0?this.huntingCabinHalfWidth:-this.huntingCabinHalfWidth):i=this.huntingCabinCenter.z+(E>=0?this.huntingCabinHalfDepth:-this.huntingCabinHalfDepth)}const R=n-this.hutPos.x,C=i-this.hutPos.z;if(Math.abs(R)<this.hutHalfWidth&&Math.abs(C)<this.hutHalfDepth){const w=this.hutHalfWidth-Math.abs(R),M=this.hutHalfDepth-Math.abs(C);w<M?n=this.hutPos.x+(R>=0?this.hutHalfWidth:-this.hutHalfWidth):i=this.hutPos.z+(C>=0?this.hutHalfDepth:-this.hutHalfDepth)}}return{x:n,z:i}}getClosestPathAt(e,t){if(this.isPointOnPath1(e,t))return mt[0];if(this.isPointOnPath2(e,t))return mt[1];if(this.isPointOnPath3(e,t))return mt[2];if(this.isPointOnPath4(e,t))return mt[3];if(this.isPointOnPath5(e,t))return mt[4];if(this.isPointOnPath6(e,t))return mt[5];let n=Math.atan2(e,-t);n<0&&(n+=Math.PI*2);let i=mt[0],r=1/0;for(const o of mt){let a=Math.abs(n-o.angleRad);a>Math.PI&&(a=Math.PI*2-a),a<r&&(r=a,i=o)}return r<.35?i:null}movePlayer(e,t){const i=Math.hypot(this.playerPos.x,this.playerPos.z)>this.clearingRadius?this.getClosestPathAt(this.playerPos.x,this.playerPos.z):null,r=this.playerPos.x+e,o=this.playerPos.z+t,a=this.projectOntoWalkableSurface(r,o,i?i.id:null),c=this.resolveObstacleCollisions(a.x,a.z),l=this.projectOntoWalkableSurface(c.x,c.z,i?i.id:null);return this.playerPos=this.resolveObstacleCollisions(l.x,l.z),this.getPlayerPosition()}setTargetPosition(e,t){const n=this.projectOntoWalkableSurface(e,t,null),i=this.resolveObstacleCollisions(n.x,n.z),r=this.projectOntoWalkableSurface(i.x,i.z,null);return this.targetPos=this.resolveObstacleCollisions(r.x,r.z),{...this.targetPos}}clearTargetPosition(){this.targetPos=null}setTargetToPathEntrance(e,t=9){const n=this.selectPath(e);return n?this.setTargetPosition(Math.sin(n.angleRad)*t,-Math.cos(n.angleRad)*t):null}setTargetToHut(){return this.setTargetPosition(-.3,this.hutPos.z+this.hutHalfDepth+.35)}setTargetToChest(){return this.setTargetPosition(this.chestPos.x,this.chestPos.z+this.chestCollisionRadius+.35)}setTargetToSignpost(){return this.setTargetPosition(this.signpostPos.x,this.signpostPos.z+this.signpostCollisionRadius+.35)}setTargetToNpc(){return this.setTargetPosition(this.npcPos.x,this.npcPos.z+this.npcCollisionRadius+.45)}setTargetToGreyMan(){return this.selectPath(1),this.setTargetPosition(this.greyManPos.x-.9,this.greyManPos.z+1.15)}setTargetToNixie(){return this.selectPath(2),this.setTargetPosition(this.pondPos.x-this.pondCollisionRadius-.3,this.nixiePos.z)}setTargetToGiant(){return this.selectPath(3),this.setTargetPosition(this.giantPos.x-1.5,this.giantPos.z+.8)}setTargetToWoodWoman(){return this.selectPath(4),this.setTargetPosition(this.woodWomanPos.x-.25,this.woodWomanPos.z-1.25)}setTargetToDevil(){return this.selectPath(5),this.setTargetPosition(this.devilPos.x+.9,this.devilPos.z-5.8)}setTargetToWildHunter(){return this.selectPath(6),this.setTargetPosition(this.wildHunterPos.x+.85,this.wildHunterPos.z-.45)}setTargetToWoodWomanLodge(){return this.selectPath(6),this.setTargetPosition(this.woodWomanLodgePos.x+.75,this.woodWomanLodgePos.z-.5)}getCurvedPathProgress(e,t,n){let i=0,r=1/0;for(let o=0;o<n.length-1;o++){const a=n[o],c=n[o+1],l=c.x-a.x,h=c.z-a.z,d=l*l+h*h,u=d<1e-6?0:Math.max(0,Math.min(1,((e-a.x)*l+(t-a.z)*h)/d)),f=a.x+u*l,g=a.z+u*h,_=(e-f)**2+(t-g)**2;_<r&&(r=_,i=o+u)}return i}getPointAtCurvedPathProgress(e,t){const n=t.length-2,i=Math.max(0,Math.min(n+1,e)),r=Math.min(n,Math.floor(i)),o=i-r,a=t[r],c=t[r+1];return{x:a.x+o*(c.x-a.x),z:a.z+o*(c.z-a.z)}}getNextCurvedWaypoint(e,t,n){const i=n(this.playerPos.x,this.playerPos.z),r=n(e.x,e.z);if(!i&&!r)return e;const o=this.getCurvedPathProgress(this.playerPos.x,this.playerPos.z,t),a=this.getCurvedPathProgress(e.x,e.z,t),c=a-o;if(Math.abs(c)<=.35)return e;const l=c>0?.38:-.38,h=c>0?Math.min(a,o+l):Math.max(a,o+l);return this.getPointAtCurvedPathProgress(h,t)}updateAutoWalk(e,t=6.5){if(!this.targetPos||e<=0)return this.getPlayerPosition();let n=this.targetPos;const i=Math.hypot(this.playerPos.x,this.playerPos.z),r=Math.hypot(this.targetPos.x,this.targetPos.z),o=i>this.clearingRadius?this.getClosestPathAt(this.playerPos.x,this.playerPos.z):null,a=r>this.clearingRadius?this.getClosestPathAt(this.targetPos.x,this.targetPos.z):null;o&&(!a||a.id!==o.id)?o.id===1?n=this.getNextCurvedWaypoint(tn[0],tn,(x,v)=>this.isPointOnPath1(x,v)):o.id===2?n=this.getNextCurvedWaypoint(nn[0],nn,(x,v)=>this.isPointOnPath2(x,v)):o.id===3?n=this.getNextCurvedWaypoint(sn[0],sn,(x,v)=>this.isPointOnPath3(x,v)):o.id===4?n=this.getNextCurvedWaypoint(rn[0],rn,(x,v)=>this.isPointOnPath4(x,v)):o.id===5?n=this.getNextCurvedWaypoint(on[0],on,(x,v)=>this.isPointOnPath5(x,v)):o.id===6?n=this.getNextCurvedWaypoint(an[0],an,(x,v)=>this.isPointOnPath6(x,v)):n={x:Math.sin(o.angleRad)*(this.clearingRadius-.6),z:-Math.cos(o.angleRad)*(this.clearingRadius-.6)}:a&&a.id===1?n=this.getNextCurvedWaypoint(this.targetPos,tn,(x,v)=>this.isPointOnPath1(x,v)):a&&a.id===2?n=this.getNextCurvedWaypoint(this.targetPos,nn,(x,v)=>this.isPointOnPath2(x,v)):a&&a.id===3?n=this.getNextCurvedWaypoint(this.targetPos,sn,(x,v)=>this.isPointOnPath3(x,v)):a&&a.id===4?n=this.getNextCurvedWaypoint(this.targetPos,rn,(x,v)=>this.isPointOnPath4(x,v)):a&&a.id===5?n=this.getNextCurvedWaypoint(this.targetPos,on,(x,v)=>this.isPointOnPath5(x,v)):a&&a.id===6&&(n=this.getNextCurvedWaypoint(this.targetPos,an,(x,v)=>this.isPointOnPath6(x,v))),(this.playerPos.z>this.hutHalfDepth-.1&&n.z<-.5||this.playerPos.z<-this.hutHalfDepth+.1&&n.z>.5)&&Math.abs(this.playerPos.x)<2.6&&i<=this.clearingRadius+.5&&(n={x:this.playerPos.x+n.x>.5?3.4:-3.2,z:0});const l=n.x-this.playerPos.x,h=n.z-this.playerPos.z,d=Math.hypot(l,h),u=t*e;if(d<=u||d<.05){const x={...this.playerPos};return this.movePlayer(l,h),n===this.targetPos&&Math.hypot(this.playerPos.x-this.targetPos.x,this.playerPos.z-this.targetPos.z)<.15?this.targetPos=null:n===this.targetPos&&Math.hypot(this.playerPos.x-x.x,this.playerPos.z-x.z)<.001&&(this.targetPos=null),this.getPlayerPosition()}const f=l/d*u,g=h/d*u,_=this.playerPos.x,m=this.playerPos.z;if(this.movePlayer(f,g),Math.hypot(this.playerPos.x-_,this.playerPos.z-m)<u*.35&&i<=this.clearingRadius+.5){const x=_*h-m*l>=0?1:-1,v=-h/d*u*x,y=l/d*u*x;this.movePlayer(v,y)}return this.getPlayerPosition()}movePlayerToPathEntrance(e,t=9){const n=this.selectPath(e);if(!n)return this.getPlayerPosition();this.targetPos=null;const i=Math.max(this.clearingRadius+.5,Math.min(this.maxRadius,t));return this.playerPos={x:Math.sin(n.angleRad)*i,z:-Math.cos(n.angleRad)*i},this.getPlayerPosition()}getActivePointOfInterest(){const e=this.isNearWildHunter(),t=this.isNearWoodWomanLodge();if(e&&t){const f=Math.hypot(this.playerPos.x-this.wildHunterPos.x,this.playerPos.z-this.wildHunterPos.z);return Math.hypot(this.playerPos.x-this.woodWomanLodgePos.x,this.playerPos.z-this.woodWomanLodgePos.z)<=f?{type:"wood_woman_lodge",name:Kt,label:"Vor dem Kräutergarten – sprich mit dem Holzweibchen über die Rettung der jungen Hirschkuh (Klick oder [F])."}:{type:"wild_hunter",name:zs,label:"Vor der Jagdhütte – sprich mit dem Wilden Jäger über die Jagdordnung und den Diebstahlvorwurf (Klick oder [F])."}}if(e)return{type:"wild_hunter",name:zs,label:"Vor der Jagdhütte – sprich mit dem Wilden Jäger über die Jagdordnung und den Diebstahlvorwurf (Klick oder [F])."};if(t)return{type:"wood_woman_lodge",name:Kt,label:"Vor dem Kräutergarten – sprich mit dem Holzweibchen über die Rettung der jungen Hirschkuh (Klick oder [F])."};if(Math.hypot(this.playerPos.x-(this.huntingLodgePos.x-2.5),this.playerPos.z-(this.huntingLodgePos.z-1.8))<3.8)return{type:"herb_garden",label:"Umzäunter Kräutergarten – Königs-Salbei, Lavendel und die seltene Mondwurz gedeihen hier in voller Pracht."};if(Math.hypot(this.playerPos.x-this.huntingLodgePos.x,this.playerPos.z-this.huntingLodgePos.z)<6.8)return{type:"hunting_lodge",label:"Jagdhütte des Wilden Jägers – mit Schindeldach, Steinkamin und Hirschgeweih über dem Eingang."};if(this.isNearDevil())return{type:"devil",name:Cr,label:"Inmitten des Höllenschlundes – sprich mit dem Teufel auf seinem Obsidianfelsen (Klick oder [F])."};if(Math.hypot(this.playerPos.x-this.hellChasmPos.x,this.playerPos.z-this.hellChasmPos.z)<this.hellChasmCollisionRadius+2.5)return{type:"hell_chasm",label:"Feuriger Höllenschlund – ein loderndes Meer aus Lava und Flammen, in dessen Mitte der Teufel thront."};if(this.isNearWoodWoman())return{type:"wood_woman",name:Kt,label:"Im Holzfällerlager auf der Waldlichtung – sprich mit dem Holzweibchen über das Brennholz gegen die Kälte und die Gefährdung des Waldes (Klick oder [F])."};if(Math.hypot(this.playerPos.x-this.lumberCampPos.x,this.playerPos.z-this.lumberCampPos.z)<4.8)return{type:"lumber_camp",label:"Holzfällerlager auf der Waldlichtung – Brennholz rettet das Dorf vor der Kälte, doch die starken Fällungen gefährden den Wald."};if(this.isNearGiant())return{type:"giant",name:ri,label:"Vor dem geschlossenen Wehr am Stausee – sprich mit dem Riesen über die Quelle, die Dürre im Tal und seine Heimat (Klick oder [F])."};if(Math.hypot(this.playerPos.x-this.weirBridgePos.x,this.playerPos.z-this.weirBridgePos.z)<3.6)return{type:"weir",label:"Brücke mit geschlossenem Wehr – der Quellbach wird hier zu einem kleinen Stausee zurückgestaut."};if(this.isNearNixie())return{type:"nixie",name:si,label:"Am Ufer des Spiegelteichs – sprich mit der Nixe auf dem Stein über den verlockenden Schatz und den Fluch (Klick oder [F])."};if(Math.hypot(this.playerPos.x-this.pondPos.x,this.playerPos.z-this.pondPos.z)<this.pondCollisionRadius+1.8)return{type:"pond",label:"Stiller Waldteich – unter der Wasseroberfläche funkelt ein verlockender Schatz, auf dem ein dunkler Fluch ruht."};if(this.isNearGreyMan())return{type:"grey_man",name:kn,label:"Vor dem Stollenmundloch – sprich mit dem Graumännchen über die neue Silberader, das Licht und das alte Verbot (Klick oder [F])."};if(Math.hypot(this.playerPos.x-this.cavePos.x,this.playerPos.z-this.cavePos.z)<this.caveCollisionRadius+1.8)return{type:"cave",label:"Alter Silberstollen im Berg – ein Verbot untersagt offenes Licht, doch im Inneren wartet die rettende Silberader."};if(this.isNearNpc())return{type:"npc",name:vn,label:"Waldhüter Arvid an der Schutzhütte – sprich mit ihm über die Kreuzung, seine Vergangenheit und den Rat der sieben Wege (Klick oder [F])."};if(this.isNearChest())return{type:"chest",isOpen:this.chestOpen,label:this.chestOpen?"Geöffnete Schatztruhe vor der Hütte – im Inneren schimmert ein kalt leuchtender Waldkristall. (Klick zum Schließen)":"Verschlossene Schatztruhe vor der Hütte – klicke auf die Truhe, um den Deckel zu öffnen."};if(Math.hypot(this.playerPos.x-this.signpostPos.x,this.playerPos.z-this.signpostPos.z)<this.signpostCollisionRadius+.85)return{type:"signpost",label:"Wegweiser mit 7 Schildern – wähle einen der sieben Wege (Klick oder Tasten 1–7)."};if(Math.abs(this.playerPos.x-this.hutPos.x)<this.hutHalfWidth+.75&&Math.abs(this.playerPos.z-this.hutPos.z)<this.hutHalfDepth+.75)return{type:"hut",label:"Schutzhütte aus Baumstämmen – ein sicherer Rastplatz in der Mitte der Kreuzung."};if(Math.hypot(this.playerPos.x,this.playerPos.z)>=this.clearingRadius){const f=this.getClosestPathAt(this.playerPos.x,this.playerPos.z);if(f)return this.selectedPathId=f.id,{type:"path",path:f}}return{type:"clearing",label:"Waldkreuzung – hier treffen sieben Waldwege aufeinander."}}}class cx{nodes;currentNodeId=null;constructor(e=ox){this.nodes=e}isOpen(){return this.currentNodeId!==null}getCurrentNode(){return this.currentNodeId?this.nodes[this.currentNodeId]??null:null}startDialogue(e="root"){return this.nodes[e]?(this.currentNodeId=e,this.getCurrentNode()):null}closeDialogue(){this.currentNodeId=null}selectOption(e){const t=this.getCurrentNode();if(!t)return{node:null,action:null};const n=t.options[e];if(!n)return{node:t,action:null};const i=n.action??null;return n.nextNodeId&&this.nodes[n.nextNodeId]?this.currentNodeId=n.nextNodeId:this.currentNodeId=null,{node:this.getCurrentNode(),action:i}}}class lx{ctx=null;noiseBuffer=null;stepLeftFoot=!1;nextBirdTimerSec=2.2;getContext(){if(typeof window>"u")return null;if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e)}return this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}),this.ctx}unlock(){this.getContext()}updateAmbientBirds(e,t=!1){if(!(e<=0)&&(this.nextBirdTimerSec-=e,this.nextBirdTimerSec<=0)){if(this.nextBirdTimerSec=3.5+Math.random()*4.3,!this.ctx||this.ctx.state!=="running")return;const n=t?.45:1;this.playDistantBirdCall(n),Math.random()<.35&&this.playDistantBirdCall(n*.72,.75+Math.random()*.45)}}playDistantBirdCall(e=1,t=0){const n=this.getContext();if(!n)return;const i=n.currentTime+t,r=Math.random()*1.5-.75,o=.92+Math.random()*.18,a=Math.floor(Math.random()*3);if(a===0)this.scheduleBirdSyllable(n,i,2450*o,2780*o,.085,.022*e,r),this.scheduleBirdSyllable(n,i+.11,2050*o,1880*o,.13,.02*e,r);else if(a===1){const c=3+Math.floor(Math.random()*2);for(let l=0;l<c;l++){const h=i+l*.095,d=(2850-l*190)*o,u=(3150-l*210)*o;this.scheduleBirdSyllable(n,h,d,u,.068,.018*e,r)}}else this.scheduleBirdSyllable(n,i,1680*o,2020*o,.14,.024*e,r),this.scheduleBirdSyllable(n,i+.17,2180*o,1920*o,.11,.019*e,r),this.scheduleBirdSyllable(n,i+.31,2340*o,2480*o,.08,.015*e,r)}scheduleBirdSyllable(e,t,n,i,r,o,a){const c=e.createOscillator(),l=e.createGain();if(c.type="sine",c.frequency.setValueAtTime(n,t),c.frequency.exponentialRampToValueAtTime(Math.max(400,i),t+r*.75),c.frequency.exponentialRampToValueAtTime(Math.max(400,i*.94),t+r),l.gain.setValueAtTime(1e-4,t),l.gain.linearRampToValueAtTime(o,t+r*.25),l.gain.exponentialRampToValueAtTime(1e-4,t+r),c.connect(l),typeof e.createStereoPanner=="function"){const h=e.createStereoPanner();h.pan.setValueAtTime(Math.max(-1,Math.min(1,a)),t),l.connect(h),h.connect(e.destination)}else l.connect(e.destination);c.start(t),c.stop(t+r+.015)}getNoiseBuffer(e){if(this.noiseBuffer&&this.noiseBuffer.sampleRate===e.sampleRate)return this.noiseBuffer;const n=Math.floor(e.sampleRate*.12),i=e.createBuffer(1,n,e.sampleRate),r=i.getChannelData(0);for(let o=0;o<n;o++)r[o]=Math.random()*2-1;return this.noiseBuffer=i,i}playFootstep(){const e=this.getContext();if(!e)return;const t=e.currentTime;this.stepLeftFoot=!this.stepLeftFoot;const n=.96+Math.random()*.08,i=(this.stepLeftFoot?112:124)*n,r=(this.stepLeftFoot?720:840)*n,o=e.createOscillator(),a=e.createGain();o.type="triangle",o.frequency.setValueAtTime(i,t),o.frequency.exponentialRampToValueAtTime(42,t+.055),a.gain.setValueAtTime(.001,t),a.gain.linearRampToValueAtTime(.075,t+.008),a.gain.exponentialRampToValueAtTime(8e-4,t+.06),o.connect(a),a.connect(e.destination),o.start(t),o.stop(t+.065);const c=e.createBufferSource();c.buffer=this.getNoiseBuffer(e);const l=e.createBiquadFilter();l.type="bandpass",l.frequency.setValueAtTime(r,t),l.Q.setValueAtTime(2.2,t);const h=e.createGain();h.gain.setValueAtTime(.001,t),h.gain.linearRampToValueAtTime(.055,t+.012),h.gain.exponentialRampToValueAtTime(8e-4,t+.075),c.connect(l),l.connect(h),h.connect(e.destination),c.start(t),c.stop(t+.08)}playChestOpenFanfare(){const e=this.getContext();if(!e)return;const t=e.currentTime,n=[{freq:392,start:0,duration:.115},{freq:440,start:.085,duration:.115},{freq:493.88,start:.17,duration:.115},{freq:587.33,start:.255,duration:.125},{freq:659.25,start:.34,duration:.135},{freq:739.99,start:.43,duration:.145}];for(const o of n)this.scheduleShimmerNote(e,o.freq,t+o.start,o.duration,.058);const i=t+.55,r=[{freq:392,gain:.048},{freq:493.88,gain:.044},{freq:587.33,gain:.042},{freq:783.99,gain:.036}];for(const o of r)this.scheduleShimmerNote(e,o.freq,i,.78,o.gain)}playChestCloseSound(){const e=this.getContext();if(!e)return;const t=e.currentTime,n=e.createOscillator(),i=e.createGain();n.type="triangle",n.frequency.setValueAtTime(255,t),n.frequency.exponentialRampToValueAtTime(92,t+.19),i.gain.setValueAtTime(.001,t),i.gain.linearRampToValueAtTime(.36,t+.01),i.gain.exponentialRampToValueAtTime(.001,t+.21),n.connect(i),i.connect(e.destination),n.start(t),n.stop(t+.22);const r=e.createOscillator(),o=e.createGain();r.type="square";const a=e.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(1100,t),r.frequency.setValueAtTime(560,t),r.frequency.exponentialRampToValueAtTime(185,t+.09),o.gain.setValueAtTime(.001,t),o.gain.linearRampToValueAtTime(.24,t+.006),o.gain.exponentialRampToValueAtTime(.001,t+.1),r.connect(a),a.connect(o),o.connect(e.destination),r.start(t),r.stop(t+.11);const c=e.createBufferSource();c.buffer=this.getNoiseBuffer(e);const l=e.createBiquadFilter();l.type="bandpass",l.frequency.setValueAtTime(760,t),l.Q.setValueAtTime(1.6,t);const h=e.createGain();h.gain.setValueAtTime(.001,t),h.gain.linearRampToValueAtTime(.3,t+.005),h.gain.exponentialRampToValueAtTime(.001,t+.085),c.connect(l),l.connect(h),h.connect(e.destination),c.start(t),c.stop(t+.095);const d=t+.022,u=e.createOscillator(),f=e.createGain();u.type="sine",u.frequency.setValueAtTime(1340,d),u.frequency.exponentialRampToValueAtTime(860,d+.055),f.gain.setValueAtTime(.001,d),f.gain.linearRampToValueAtTime(.16,d+.005),f.gain.exponentialRampToValueAtTime(.001,d+.06),u.connect(f),f.connect(e.destination),u.start(d),u.stop(d+.065)}scheduleShimmerNote(e,t,n,i,r){const o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(t,n);const a=e.createGain();a.gain.setValueAtTime(1e-4,n),a.gain.linearRampToValueAtTime(r,n+.016),a.gain.exponentialRampToValueAtTime(1e-4,n+i),o.connect(a),a.connect(e.destination),o.start(n),o.stop(n+i+.02);const c=e.createOscillator();c.type="triangle",c.frequency.setValueAtTime(t*2,n);const l=e.createGain();l.gain.setValueAtTime(1e-4,n),l.gain.linearRampToValueAtTime(r*.22,n+.012),l.gain.exponentialRampToValueAtTime(1e-4,n+i*.75),c.connect(l),l.connect(e.destination),c.start(n),c.stop(n+i)}}class hx{enabled=!0;lastSpokenText=null;isSupported(){return typeof window<"u"&&"speechSynthesis"in window&&typeof SpeechSynthesisUtterance<"u"}isEnabled(){return this.enabled}toggleEnabled(){if(this.enabled=!this.enabled,!this.enabled)this.stop();else if(this.lastSpokenText){const e=this.lastSpokenText;this.lastSpokenText=null,this.speak(e)}return this.enabled}speak(e){if(this.lastSpokenText=e,!(!this.enabled||!this.isSupported()))try{window.speechSynthesis.cancel();const t=new SpeechSynthesisUtterance(e);t.lang="de-DE",t.rate=.96,t.pitch=.92;const n=window.speechSynthesis.getVoices(),i=n.find(r=>r.lang.toLowerCase().startsWith("de")&&r.localService)??n.find(r=>r.lang.toLowerCase().startsWith("de"));i&&(t.voice=i),window.speechSynthesis.speak(t)}catch{}}stop(){if(this.lastSpokenText=null,!!this.isSupported())try{window.speechSynthesis.cancel()}catch{}}}class dx{constructor(e,t){this.callbacks=t,e.innerHTML="";const n=document.createElement("header");n.className="hud-header",this.activePathBadgeEl=document.createElement("div"),this.activePathBadgeEl.className="active-path-badge is-hidden",this.activePathBadgeEl.setAttribute("aria-live","polite"),this.dialogueModalEl=document.createElement("aside"),this.dialogueModalEl.className="dialogue-panel is-hidden",this.dialogueModalEl.style.marginLeft="auto",this.dialogueModalEl.setAttribute("role","dialog"),this.dialogueModalEl.setAttribute("aria-label","Gespräch mit NPC");const i=document.createElement("div");i.className="dialogue-header";const r=document.createElement("div");this.dialogueSpeakerEl=document.createElement("h2"),this.dialogueSpeakerEl.className="dialogue-speaker",this.dialogueRoleEl=document.createElement("span"),this.dialogueRoleEl.className="dialogue-role",r.append(this.dialogueSpeakerEl,this.dialogueRoleEl);const o=document.createElement("div");o.className="dialogue-header-actions",this.speechToggleBtn=document.createElement("button"),this.speechToggleBtn.type="button",this.speechToggleBtn.className="dialogue-close-btn",this.speechToggleBtn.textContent="🔊",this.speechToggleBtn.title="Sprachausgabe ein-/ausschalten",this.speechToggleBtn.addEventListener("click",()=>{const l=this.callbacks.onToggleSpeech();this.speechToggleBtn.textContent=l?"🔊":"🔇"});const a=document.createElement("button");a.type="button",a.className="dialogue-close-btn",a.textContent="✕",a.title="Gespräch schließen (Esc)",a.addEventListener("click",()=>this.callbacks.onCloseDialogue()),o.append(this.speechToggleBtn,a),i.append(r,o),this.dialogueTextEl=document.createElement("p"),this.dialogueTextEl.className="dialogue-text";const c=document.createElement("div");c.className="dialogue-player-label",c.textContent="Antwort wählen:",this.dialogueOptionsEl=document.createElement("div"),this.dialogueOptionsEl.className="dialogue-options",this.dialogueModalEl.append(i,this.dialogueTextEl,c,this.dialogueOptionsEl),n.append(this.activePathBadgeEl,this.dialogueModalEl),e.append(n)}activePathBadgeEl;dialogueModalEl;dialogueSpeakerEl;dialogueRoleEl;dialogueTextEl;dialogueOptionsEl;speechToggleBtn;lastDialogueNodeId=null;update(e,t,n,i=!1,r=!0){const o=t!==null?mt.find(a=>a.id===t)??null:null;o?(this.activePathBadgeEl.textContent=`🧭 ${o.name}`,this.activePathBadgeEl.classList.remove("is-hidden")):this.activePathBadgeEl.classList.add("is-hidden"),this.renderDialogue(n)}renderDialogue(e){if(!e){this.dialogueModalEl.classList.add("is-hidden"),this.lastDialogueNodeId=null;return}this.dialogueModalEl.classList.remove("is-hidden"),this.lastDialogueNodeId!==e.id&&(this.lastDialogueNodeId=e.id,this.dialogueSpeakerEl.textContent=e.speaker,this.dialogueRoleEl.textContent=e.speakerRole,this.dialogueTextEl.textContent=`„${e.text}“`,this.dialogueOptionsEl.innerHTML="",e.options.forEach((t,n)=>{const i=document.createElement("button");i.type="button",i.className="dialogue-option-btn",i.textContent=`${n+1}. ${t.playerText}`,i.addEventListener("click",()=>this.callbacks.onSelectDialogueOption(n)),this.dialogueOptionsEl.appendChild(i)}))}}class ux{canvas;state;dialogue;speech;sound;scene;hud;pressedKeys=new Set;animationFrameId=0;lastTime=performance.now();isPointerDown=!1;isDraggingCamera=!1;pointerDownButton=0;pointerStartX=0;pointerStartY=0;lastPointerX=0;lastPointerY=0;pendingTalkToNpc=!1;pendingTalkToGreyMan=!1;pendingTalkToNixie=!1;pendingTalkToGiant=!1;pendingTalkToWoodWoman=!1;pendingTalkToDevil=!1;pendingTalkToWildHunter=!1;pendingTalkToWoodWomanLodge=!1;pendingToggleChest=!1;stepDistanceAccumulator=1.15;constructor(e,t){this.canvas=e,this.state=new ax,this.dialogue=new cx,this.speech=new hx,this.sound=new lx,this.scene=new ix(e),this.hud=new dx(t,{onSelectPath:n=>{this.state.isOnClearing()&&(this.closeDialogueAndSpeech(),this.clearPendingActions(),this.state.setTargetToPathEntrance(n))},onReturnToClearing:()=>{this.closeDialogueAndSpeech(),this.clearPendingActions(),this.state.setTargetToClearing()},onTalkToNpc:()=>{this.initiateTalkToNpc()},onTalkToGreyMan:()=>{this.initiateTalkToGreyMan()},onToggleChest:()=>{this.initiateToggleChest()},onSelectDialogueOption:n=>{this.handleDialogueOption(n)},onCloseDialogue:()=>{this.closeDialogueAndSpeech()},onToggleSpeech:()=>this.speech.toggleEnabled()}),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),this.canvas.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),this.canvas.addEventListener("wheel",this.onWheel,{passive:!1}),this.canvas.addEventListener("contextmenu",this.onContextMenu)}start(){this.lastTime=performance.now(),this.loop(this.lastTime)}clearPendingActions(){this.pendingTalkToNpc=!1,this.pendingTalkToGreyMan=!1,this.pendingTalkToNixie=!1,this.pendingTalkToGiant=!1,this.pendingTalkToWoodWoman=!1,this.pendingTalkToDevil=!1,this.pendingTalkToWildHunter=!1,this.pendingTalkToWoodWomanLodge=!1,this.pendingToggleChest=!1}openDialogueNode(e){const t=this.dialogue.startDialogue(e);t&&this.speech.speak(t.text)}closeDialogueAndSpeech(){this.dialogue.closeDialogue(),this.speech.stop()}toggleChestWithSound(){this.state.toggleChest()?this.sound.playChestOpenFanfare():this.sound.playChestCloseSound()}initiateTalkToNpc(){this.clearPendingActions(),this.state.isNearNpc()?(this.state.clearTargetPosition(),this.openDialogueNode("root")):(this.pendingTalkToNpc=!0,this.state.setTargetToNpc())}initiateTalkToGreyMan(){this.clearPendingActions(),this.closeDialogueAndSpeech(),this.state.isNearGreyMan()?(this.state.clearTargetPosition(),this.openDialogueNode("grey_root")):(this.pendingTalkToGreyMan=!0,this.state.setTargetToGreyMan())}initiateTalkToNixie(){this.clearPendingActions(),this.closeDialogueAndSpeech(),this.state.isNearNixie()?(this.state.clearTargetPosition(),this.openDialogueNode("nixie_root")):(this.pendingTalkToNixie=!0,this.state.setTargetToNixie())}initiateTalkToGiant(){this.clearPendingActions(),this.closeDialogueAndSpeech(),this.state.isNearGiant()?(this.state.clearTargetPosition(),this.openDialogueNode("giant_root")):(this.pendingTalkToGiant=!0,this.state.setTargetToGiant())}initiateTalkToWoodWoman(){this.clearPendingActions(),this.closeDialogueAndSpeech(),this.state.isNearWoodWoman()?(this.state.clearTargetPosition(),this.openDialogueNode("wood_woman_root")):(this.pendingTalkToWoodWoman=!0,this.state.setTargetToWoodWoman())}initiateTalkToDevil(){this.clearPendingActions(),this.closeDialogueAndSpeech(),this.state.isNearDevil()?(this.state.clearTargetPosition(),this.openDialogueNode("devil_root")):(this.pendingTalkToDevil=!0,this.state.setTargetToDevil())}initiateTalkToWildHunter(){this.clearPendingActions(),this.closeDialogueAndSpeech(),this.state.isNearWildHunter()?(this.state.clearTargetPosition(),this.openDialogueNode("hunter_root")):(this.pendingTalkToWildHunter=!0,this.state.setTargetToWildHunter())}initiateTalkToWoodWomanLodge(){this.clearPendingActions(),this.closeDialogueAndSpeech(),this.state.isNearWoodWomanLodge()?(this.state.clearTargetPosition(),this.openDialogueNode("wood_lodge_root")):(this.pendingTalkToWoodWomanLodge=!0,this.state.setTargetToWoodWomanLodge())}initiateToggleChest(){this.clearPendingActions(),this.closeDialogueAndSpeech(),this.state.isNearChest()?(this.state.clearTargetPosition(),this.toggleChestWithSound()):(this.pendingToggleChest=!0,this.state.setTargetToChest())}handleDialogueOption(e){const{node:t,action:n}=this.dialogue.selectOption(e);t?this.speech.speak(t.text):this.speech.stop(),n?.type==="select_path"?(this.clearPendingActions(),this.state.setTargetToPathEntrance(n.pathId)):n?.type==="walk_to_grey_man"?this.initiateTalkToGreyMan():n?.type==="walk_to_nixie"?this.initiateTalkToNixie():n?.type==="walk_to_giant"?this.initiateTalkToGiant():n?.type==="walk_to_wood_woman"?this.initiateTalkToWoodWoman():n?.type==="walk_to_devil"?this.initiateTalkToDevil():n?.type==="walk_to_wild_hunter"&&this.initiateTalkToWildHunter()}onKeyDown=e=>{this.sound.unlock();const t=e.key.toLowerCase();if(e.key==="Escape"&&this.dialogue.isOpen()){this.closeDialogueAndSpeech();return}if(this.dialogue.isOpen()&&t>="1"&&t<="8"){const n=Number(t)-1;this.handleDialogueOption(n);return}if((t==="f"||e.key==="Enter")&&!this.dialogue.isOpen()){if(this.state.isNearWildHunter()&&this.state.isNearWoodWomanLodge()){const n=this.state.getPlayerPosition(),i=this.state.getWildHunterPosition(),r=this.state.getWoodWomanLodgePosition(),o=Math.hypot(n.x-i.x,n.z-i.z);Math.hypot(n.x-r.x,n.z-r.z)<=o?this.initiateTalkToWoodWomanLodge():this.initiateTalkToWildHunter()}else if(this.state.isNearWildHunter())this.initiateTalkToWildHunter();else if(this.state.isNearWoodWomanLodge())this.initiateTalkToWoodWomanLodge();else if(this.state.isNearDevil())this.initiateTalkToDevil();else if(this.state.isNearWoodWoman())this.initiateTalkToWoodWoman();else if(this.state.isNearGiant())this.initiateTalkToGiant();else if(this.state.isNearNixie())this.initiateTalkToNixie();else if(this.state.isNearGreyMan())this.initiateTalkToGreyMan();else if(this.state.isNearChest())this.initiateToggleChest();else if(this.state.isNearNpc())this.initiateTalkToNpc();else{const n=this.state.getSelectedPath();n?.id===6&&this.state.getPlayerPosition().x<-8?this.initiateTalkToWildHunter():n?.id===5&&this.state.getPlayerPosition().z>8?this.initiateTalkToDevil():n?.id===4&&this.state.getPlayerPosition().z>8?this.initiateTalkToWoodWoman():n?.id===3&&this.state.getPlayerPosition().x>8?this.initiateTalkToGiant():n?.id===2&&this.state.getPlayerPosition().x>8?this.initiateTalkToNixie():n?.id===1&&this.state.getPlayerPosition().z<-8?this.initiateTalkToGreyMan():this.initiateTalkToNpc()}return}if(this.pressedKeys.add(t),!this.dialogue.isOpen()&&this.state.isOnClearing()&&t>="1"&&t<="7"){const n=Number(t);this.clearPendingActions(),this.state.setTargetToPathEntrance(n)}};onKeyUp=e=>{this.pressedKeys.delete(e.key.toLowerCase())};onPointerDown=e=>{this.sound.unlock(),this.isPointerDown=!0,this.isDraggingCamera=!1,this.pointerDownButton=e.button,this.pointerStartX=e.clientX,this.pointerStartY=e.clientY,this.lastPointerX=e.clientX,this.lastPointerY=e.clientY};onPointerMove=e=>{if(this.isPointerDown){if((Math.hypot(e.clientX-this.pointerStartX,e.clientY-this.pointerStartY)>5||this.pointerDownButton===2||this.pointerDownButton===1)&&(this.isDraggingCamera=!0),this.isDraggingCamera){const i=e.clientX-this.lastPointerX,r=e.clientY-this.lastPointerY;this.scene.rotateCamera(-i*.007,r*.005),this.canvas.style.cursor="grabbing"}this.lastPointerX=e.clientX,this.lastPointerY=e.clientY;return}const t=this.scene.raycastFromMouse(e.clientX,e.clientY);if(!t){this.scene.setHoveredPathId(null),this.scene.setNpcHovered(!1),this.scene.setGreyManHovered(!1),this.scene.setNixieHovered(!1),this.scene.setGiantHovered(!1),this.scene.setWoodWomanHovered(!1),this.scene.setDevilHovered(!1),this.scene.setWildHunterHovered(!1),this.scene.setWoodWomanLodgeHovered(!1),this.scene.setChestHovered(!1),this.canvas.style.cursor="grab";return}this.scene.setHoveredPathId(t.kind==="sign"||t.kind==="path"?t.pathId:null),this.scene.setNpcHovered(t.kind==="npc"),this.scene.setGreyManHovered(t.kind==="grey_man"||t.kind==="cave"),this.scene.setNixieHovered(t.kind==="nixie"||t.kind==="pond"),this.scene.setGiantHovered(t.kind==="giant"||t.kind==="weir"),this.scene.setWoodWomanHovered(t.kind==="wood_woman"||t.kind==="lumber_camp"),this.scene.setDevilHovered(t.kind==="devil"||t.kind==="hell_chasm"),this.scene.setWildHunterHovered(t.kind==="wild_hunter"||t.kind==="hunting_lodge"),this.scene.setWoodWomanLodgeHovered(t.kind==="wood_woman_lodge"||t.kind==="herb_garden"),this.scene.setChestHovered(t.kind==="chest"),this.canvas.style.cursor=t.kind==="ground"?"default":"pointer"};onPointerUp=e=>{if(!this.isPointerDown)return;const t=this.isDraggingCamera,n=this.pointerDownButton;if(this.isPointerDown=!1,this.isDraggingCamera=!1,this.canvas.style.cursor="default",!t&&n===0){const i=this.scene.raycastFromMouse(e.clientX,e.clientY);if(!i)return;if(i.kind==="npc"){this.initiateTalkToNpc();return}if(i.kind==="grey_man"||i.kind==="cave"){this.initiateTalkToGreyMan();return}if(i.kind==="nixie"||i.kind==="pond"){this.initiateTalkToNixie();return}if(i.kind==="giant"||i.kind==="weir"){this.initiateTalkToGiant();return}if(i.kind==="wood_woman"||i.kind==="lumber_camp"){this.initiateTalkToWoodWoman();return}if(i.kind==="devil"||i.kind==="hell_chasm"){this.initiateTalkToDevil();return}if(i.kind==="wild_hunter"||i.kind==="hunting_lodge"){this.initiateTalkToWildHunter();return}if(i.kind==="wood_woman_lodge"||i.kind==="herb_garden"){this.initiateTalkToWoodWomanLodge();return}if(i.kind==="chest"){this.initiateToggleChest();return}this.clearPendingActions(),this.closeDialogueAndSpeech(),i.kind==="sign"?this.state.setTargetToPathEntrance(i.pathId):i.kind==="path"?(this.state.selectPath(i.pathId),this.state.setTargetPosition(i.point.x,i.point.z)):i.kind==="hut"?this.state.setTargetToHut():i.kind==="signpost"?this.state.setTargetToSignpost():i.kind==="ground"&&this.state.setTargetPosition(i.point.x,i.point.z)}};onWheel=e=>{e.preventDefault(),this.scene.zoomCamera(e.deltaY*.01)};onContextMenu=e=>{e.preventDefault()};handleInput(e){const t=6.5*e;let n=0,i=0;(this.pressedKeys.has("w")||this.pressedKeys.has("arrowup"))&&(n+=1),(this.pressedKeys.has("s")||this.pressedKeys.has("arrowdown"))&&(n-=1),(this.pressedKeys.has("a")||this.pressedKeys.has("arrowleft"))&&(i-=1),(this.pressedKeys.has("d")||this.pressedKeys.has("arrowright"))&&(i+=1),this.pressedKeys.has("q")&&this.scene.rotateCamera(-1.6*e),this.pressedKeys.has("e")&&this.scene.rotateCamera(1.6*e);const r=this.state.getPlayerPosition();if(n!==0||i!==0){this.clearPendingActions(),this.state.clearTargetPosition();const c=Math.hypot(n,i),l=n/c,h=i/c,d=this.scene.getCameraOrbitAngle(),u=(-Math.sin(d)*l+Math.cos(d)*h)*t,f=(-Math.cos(d)*l-Math.sin(d)*h)*t;this.state.movePlayer(u,f),!this.state.isNearNpc()&&!this.state.isNearGreyMan()&&!this.state.isNearNixie()&&!this.state.isNearGiant()&&!this.state.isNearWoodWoman()&&!this.state.isNearDevil()&&!this.state.isNearWildHunter()&&!this.state.isNearWoodWomanLodge()&&this.dialogue.isOpen()&&this.closeDialogueAndSpeech()}else this.state.updateAutoWalk(e),this.pendingTalkToNpc&&this.state.isNearNpc()&&(this.pendingTalkToNpc=!1,this.state.clearTargetPosition(),this.openDialogueNode("root")),this.pendingTalkToGreyMan&&this.state.isNearGreyMan()&&(this.pendingTalkToGreyMan=!1,this.state.clearTargetPosition(),this.openDialogueNode("grey_root")),this.pendingTalkToNixie&&this.state.isNearNixie()&&(this.pendingTalkToNixie=!1,this.state.clearTargetPosition(),this.openDialogueNode("nixie_root")),this.pendingTalkToGiant&&this.state.isNearGiant()&&(this.pendingTalkToGiant=!1,this.state.clearTargetPosition(),this.openDialogueNode("giant_root")),this.pendingTalkToWoodWoman&&this.state.isNearWoodWoman()&&(this.pendingTalkToWoodWoman=!1,this.state.clearTargetPosition(),this.openDialogueNode("wood_woman_root")),this.pendingTalkToDevil&&this.state.isNearDevil()&&(this.pendingTalkToDevil=!1,this.state.clearTargetPosition(),this.openDialogueNode("devil_root")),this.pendingTalkToWildHunter&&this.state.isNearWildHunter()&&(this.pendingTalkToWildHunter=!1,this.state.clearTargetPosition(),this.openDialogueNode("hunter_root")),this.pendingTalkToWoodWomanLodge&&this.state.isNearWoodWomanLodge()&&(this.pendingTalkToWoodWomanLodge=!1,this.state.clearTargetPosition(),this.openDialogueNode("wood_lodge_root")),this.pendingToggleChest&&this.state.isNearChest()&&(this.pendingToggleChest=!1,this.state.clearTargetPosition(),this.toggleChestWithSound());const o=this.state.getPlayerPosition(),a=Math.hypot(o.x-r.x,o.z-r.z);a>.004?(this.stepDistanceAccumulator+=a,this.stepDistanceAccumulator>=1.45&&(this.stepDistanceAccumulator-=1.45,this.sound.playFootstep())):this.stepDistanceAccumulator=1.15}loop=e=>{const t=Math.min((e-this.lastTime)/1e3,.1);this.lastTime=e,this.handleInput(t),this.sound.updateAmbientBirds(t,this.dialogue.isOpen());const n=this.state.getActivePointOfInterest(),i=this.state.getSelectedPath(),r=i?i.id:null;this.scene.update(this.state.getPlayerPosition(),r,this.state.getTargetPosition(),t,this.dialogue.isOpen(),this.state.isChestOpen()),this.hud.update(n,r,this.dialogue.getCurrentNode(),this.state.isChestOpen(),this.state.isOnClearing()),this.animationFrameId=requestAnimationFrame(this.loop)};dispose(){cancelAnimationFrame(this.animationFrameId),this.speech.stop(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),this.canvas.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("pointermove",this.onPointerMove),this.canvas.removeEventListener("pointerup",this.onPointerUp),this.canvas.removeEventListener("wheel",this.onWheel),this.canvas.removeEventListener("contextmenu",this.onContextMenu),this.scene.dispose()}}const Ih=document.querySelector("#game-canvas"),Lh=document.querySelector("#ui-root");if(!Ih||!Lh)throw new Error("Canvas oder UI-Container wurden im DOM nicht gefunden.");const fx=new ux(Ih,Lh);fx.start();
