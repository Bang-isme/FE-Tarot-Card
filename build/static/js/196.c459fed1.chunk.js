(self.webpackChunkclient=self.webpackChunkclient||[]).push([[196],{270:(t,e,r)=>{"use strict";r.d(e,{A:()=>m});var s=r(5043),a=r(5173),i=r.n(a),n=r(3003),l=r(6903),o=r(531),c=r(579);const d=(0,s.memo)((t=>{let{type:e,selected:r,onClick:s,icon:a,description:i}=t;return(0,c.jsx)("div",{className:"p-4 rounded-lg cursor-pointer transition-all duration-300 \n    "+(r?"bg-gradient-to-r from-[#9370db] to-[#8a2be2] shadow-lg transform scale-[1.02]":"bg-white/5 backdrop-blur-sm border border-purple-900/20 hover:bg-white/10"),onClick:()=>s(e.id),children:(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)("div",{className:"w-12 h-12 rounded-full bg-[#2a1045] flex items-center justify-center mr-4",children:(0,c.jsx)("span",{className:"text-2xl",children:a})}),(0,c.jsxs)("div",{children:[(0,c.jsx)("h3",{className:"text-lg font-medium text-white mb-1 tracking-vn-tight",children:e.name}),(0,c.jsx)("p",{className:"text-sm text-gray-300 tracking-vn-tight",children:i})]})]})})})),h=(0,s.memo)((t=>{let{onStart:e,readingTypes:r=[],isLoading:a=!1}=t;const i=(0,n.wA)(),[d,h]=(0,s.useState)("three-card"),[m,u]=(0,s.useState)(""),[g,x]=(0,s.useState)(!1),[p,b]=(0,s.useState)(""),v=r.length>0?r:[{id:"three-card",name:"Tr\u1ea3i b\xe0i 3 l\xe1",cards:3,description:"Qu\xe1 kh\u1ee9, hi\u1ec7n t\u1ea1i v\xe0 t\u01b0\u01a1ng lai"},{id:"celtic-cross",name:"Celtic Cross",cards:10,description:"Ph\xe2n t\xedch chi ti\u1ebft t\xecnh hu\u1ed1ng"},{id:"love",name:"T\xecnh y\xeau",cards:5,description:"T\u1eadp trung v\xe0o t\xecnh y\xeau v\xe0 m\u1ed1i quan h\u1ec7"},{id:"career",name:"S\u1ef1 nghi\u1ec7p",cards:5,description:"T\u1eadp trung v\xe0o c\xf4ng vi\u1ec7c v\xe0 s\u1ef1 nghi\u1ec7p"}];return(0,c.jsx)(o.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"w-full max-w-2xl mx-auto",children:(0,c.jsxs)("form",{onSubmit:t=>{if(t.preventDefault(),!d)return void b("Vui l\xf2ng ch\u1ecdn lo\u1ea1i tr\u1ea3i b\xe0i");b("");const r=v.find((t=>t.id===d));if(!r)return void b("Lo\u1ea1i tr\u1ea3i b\xe0i kh\xf4ng h\u1ee3p l\u1ec7");const s={readingType:d,question:m.trim(),numCards:r.cards||3};try{i((0,l.AK)(s)),e&&e(s)}catch(p){console.error("L\u1ed7i khi th\u1ef1c hi\u1ec7n tr\u1ea3i b\xe0i:",p),b("C\xf3 l\u1ed7i x\u1ea3y ra khi th\u1ef1c hi\u1ec7n tr\u1ea3i b\xe0i. Vui l\xf2ng th\u1eed l\u1ea1i sau.")}},className:"bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 shadow-lg",children:[(0,c.jsxs)("div",{className:"mb-6",children:[(0,c.jsx)("h2",{className:"text-2xl font-bold mb-2 text-white tracking-tight",children:"Tr\u1ea3i B\xe0i Tarot"}),(0,c.jsx)("p",{className:"text-gray-300 tracking-tight",children:"H\xe3y \u0111\u1eb7t m\u1ed9t c\xe2u h\u1ecfi c\u1ee5 th\u1ec3 ho\u1eb7c ch\u1ecdn tr\u1ea3i b\xe0i ngay \u0111\u1ec3 nh\u1eadn th\xf4ng \u0111i\u1ec7p"})]}),p&&(0,c.jsx)("div",{className:"bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 mb-6",children:(0,c.jsx)("p",{className:"text-white tracking-vn-tight",children:p})}),(0,c.jsxs)("div",{className:"mb-6",children:[(0,c.jsx)("label",{className:"block text-white font-medium mb-3 tracking-tight",children:"Ch\u1ecdn lo\u1ea1i tr\u1ea3i b\xe0i"}),(0,c.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:v.map((t=>(0,c.jsx)("div",{onClick:()=>h(t.id),className:`\n                  cursor-pointer p-3 rounded-lg border transition-all duration-200\n                  ${d===t.id?"bg-[#9370db]/20 border-[#9370db] shadow-md":"bg-white/5 border-purple-900/20 hover:bg-white/10"}\n                `,children:(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)("div",{className:"w-4 h-4 rounded-full mr-2 border "+(d===t.id?"bg-[#9370db] border-[#9370db]":"bg-transparent border-white/50"),children:d===t.id&&(0,c.jsx)("div",{className:"w-full h-full rounded-full bg-white scale-50"})}),(0,c.jsxs)("div",{children:[(0,c.jsx)("p",{className:"text-white font-medium tracking-tight",children:t.name}),(0,c.jsx)("p",{className:"text-xs text-gray-300 tracking-tight",children:t.description})]})]})},t.id)))})]}),(0,c.jsx)("div",{className:"mb-6",children:(0,c.jsxs)("button",{type:"button",onClick:()=>{if(!d)return void b("Vui l\xf2ng ch\u1ecdn lo\u1ea1i tr\u1ea3i b\xe0i");b("");const t=v.find((t=>t.id===d));if(!t)return void b("Lo\u1ea1i tr\u1ea3i b\xe0i kh\xf4ng h\u1ee3p l\u1ec7");const r={readingType:d,numCards:t.cards||3};try{i((0,l.AK)(r)),e&&e(r)}catch(p){console.error("L\u1ed7i khi th\u1ef1c hi\u1ec7n tr\u1ea3i b\xe0i:",p),b("C\xf3 l\u1ed7i x\u1ea3y ra khi th\u1ef1c hi\u1ec7n tr\u1ea3i b\xe0i. Vui l\xf2ng th\u1eed l\u1ea1i sau.")}},disabled:a,className:"flex items-center text-[#9370db] hover:text-[#8a2be2] transition-colors",children:[(0,c.jsx)("span",{className:"mr-2",children:a?"\u0110ang x\u1eed l\xfd...":"Tr\u1ea3i B\xe0i Ngay"}),(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 transition-transform duration-300 "+(a?"animate-spin":""),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})})]})}),(0,c.jsx)("div",{className:"mb-6",children:(0,c.jsxs)("button",{type:"button",onClick:()=>x(!g),className:"flex items-center text-[#9370db] hover:text-[#8a2be2] transition-colors",children:[(0,c.jsx)("span",{className:"mr-2",children:g?"\u1ea8n c\xe2u h\u1ecfi":"\u0110\u1eb7t c\xe2u h\u1ecfi cho tr\u1ea3i b\xe0i"}),(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 transition-transform duration-300 "+(g?"rotate-180":""),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]})}),g&&(0,c.jsxs)(o.P.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},className:"mb-6",children:[(0,c.jsx)("label",{htmlFor:"question",className:"block text-white font-medium mb-2 tracking-tight",children:"C\xe2u h\u1ecfi c\u1ee7a b\u1ea1n"}),(0,c.jsx)("textarea",{id:"question",value:m,onChange:t=>u(t.target.value),placeholder:"Nh\u1eadp c\xe2u h\u1ecfi b\u1ea1n mu\u1ed1n t\xecm hi\u1ec3u...",className:"w-full p-3 bg-white/10 border border-purple-900/30 rounded-lg text-white placeholder-white/50 focus:ring-[#9370db] focus:border-[#9370db] focus:outline-none transition-colors",rows:3}),(0,c.jsx)("p",{className:"mt-2 text-sm text-gray-400 tracking-tight",children:'G\u1ee3i \xfd: "T\xecnh y\xeau c\u1ee7a t\xf4i s\u1ebd ph\xe1t tri\u1ec3n nh\u01b0 th\u1ebf n\xe0o?", "T\xf4i n\xean l\xe0m g\xec v\u1edbi c\xf4ng vi\u1ec7c hi\u1ec7n t\u1ea1i?"'})]}),(0,c.jsx)("div",{className:"flex flex-wrap gap-3",children:g&&(0,c.jsx)("button",{type:"submit",disabled:!m.trim()||a,className:`\n                px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all\n                ${m.trim()?"bg-white text-[#2a1045] hover:bg-gray-100":"bg-white/20 text-white/50 cursor-not-allowed"}\n              `,children:a?"\u0110ang x\u1eed l\xfd...":"B\u1eaft \u0110\u1ea7u V\u1edbi C\xe2u H\u1ecfi"})}),(0,c.jsx)("div",{className:"mt-4 text-xs text-gray-400 tracking-tight",children:"* L\u01b0u \xfd: C\xe1c l\xe1 b\xe0i Tarot mang t\xednh bi\u1ec3u t\u01b0\u1ee3ng v\xe0 g\u1ee3i \xfd. H\xe3y suy ng\u1eabm \xfd ngh\u0129a c\u1ee7a ch\xfang trong ng\u1eef c\u1ea3nh cu\u1ed9c s\u1ed1ng c\u1ee7a b\u1ea1n."})]})})}));d.propTypes={type:i().shape({id:i().string.isRequired,name:i().string.isRequired}).isRequired,selected:i().bool.isRequired,onClick:i().func.isRequired,icon:i().string.isRequired,description:i().string};const m=h},1497:(t,e,r)=>{"use strict";var s=r(3218);function a(){}function i(){}i.resetWarningCache=a,t.exports=function(){function t(t,e,r,a,i,n){if(n!==s){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function e(){return t}t.isRequired=t;var r={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:i,resetWarningCache:a};return r.PropTypes=r,r}},3218:t=>{"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},5173:(t,e,r)=>{t.exports=r(1497)()},8196:(t,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>u});var s=r(5043),a=r(3003),i=r(6903),n=r(270),l=r(6462),o=r(531),c=r(579);const d=(0,s.memo)((t=>{let{card:e={},isRevealed:r=!1,onCardClick:a,isSelectable:i=!1,isSelected:n=!1,size:l="medium",position:d=""}=t;const[h,m]=(0,s.useState)(!1),[u,g]=(0,s.useState)(!1),[x,p]=(0,s.useState)(!1);(0,s.useEffect)((()=>{e&&void 0!==e.isReversed?g(e.isReversed):g(Math.random()<.2)}),[e]),(0,s.useEffect)((()=>{if(r){const t=setTimeout((()=>{m(!0)}),300);return()=>clearTimeout(t)}m(!1)}),[r]);const b={small:"w-24 h-36",medium:"w-32 h-48",large:"w-40 h-60"};if(!e)return(0,c.jsx)("div",{className:`absolute ${d} transition-transform duration-300`,style:{transform:"translate(-50%, -50%)"},children:(0,c.jsx)("div",{className:"bg-gray-800 rounded-lg shadow-lg overflow-hidden "+("small"===l?"w-24 h-36":"medium"===l?"w-32 h-48":"w-40 h-60")})});return(0,c.jsx)("div",{className:`absolute ${d} transition-transform duration-300`,style:{transform:"translate(-50%, -50%)"},children:(0,c.jsxs)(o.P.div,{className:`relative ${b[l]||b.medium} cursor-pointer perspective-500`,initial:"hidden",animate:r?"visible":"hidden",variants:{hidden:{rotateY:0},visible:{rotateY:180,transition:{duration:.5,ease:"easeInOut"}}},onClick:()=>{i&&a&&a(e)},style:{transformStyle:"preserve-3d"},children:[(0,c.jsx)(o.P.div,{className:"absolute inset-0 backface-hidden rounded-lg shadow-lg overflow-hidden",variants:{hidden:{opacity:1},visible:{opacity:0,transition:{duration:.25,delay:.25}}},children:(0,c.jsx)("img",{src:"/images/tarot-card-back.jpg",alt:"Card Back",className:"w-full h-full object-cover object-center",onError:t=>{t.target.src="https://placehold.co/600x900/2a1045/9370db?text=Tarot"}})}),(0,c.jsx)(o.P.div,{className:"absolute inset-0 backface-hidden rounded-lg shadow-lg overflow-hidden rotateY-180",variants:{hidden:{opacity:0},visible:{opacity:1,transition:{duration:.25,delay:.25}}},children:(0,c.jsxs)("div",{className:"w-full h-full relative "+(e.isReversed?"rotate-180":""),children:[(0,c.jsx)("img",{src:e.imageUrl||"https://placehold.co/600x900/2a1045/9370db?text=Tarot",alt:e.name||"Tarot Card",className:"w-full h-full object-cover object-center",onError:t=>{t.target.src="https://placehold.co/600x900/2a1045/9370db?text=Tarot"}}),(0,c.jsx)("div",{className:"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-2",children:(0,c.jsxs)("p",{className:"text-white text-center text-xs md:text-sm font-medium truncate",children:[e.name||"Tarot Card",e.isReversed&&" (Reversed)"]})})]})})]})})})),h=(0,s.memo)((t=>{let{reading:e={},interpretation:r="",isLoading:a=!1,onSave:i,onShareClick:n}=t;const[o,h]=(0,s.useState)(!1),[m,u]=(0,s.useState)(0),[g,x]=(0,s.useState)(null);if((0,s.useEffect)((()=>{if(e&&e.cards&&Array.isArray(e.cards)&&e.cards.length>0){const t=setInterval((()=>{u((r=>{const s=r+1;return s>=e.cards.length?(clearInterval(t),h(!0),e.cards.length):s}))}),1e3);return()=>clearInterval(t)}h(!0)}),[e]),!e||e.cards&&Array.isArray(e.cards)&&0===e.cards.length)return(0,c.jsxs)("div",{className:"bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 md:p-8 text-center",children:[(0,c.jsx)("p",{className:"text-gray-300 tracking-vn-tight",children:"Kh\xf4ng c\xf3 k\u1ebft qu\u1ea3 \u0111\u1ec3 hi\u1ec3n th\u1ecb."}),(0,c.jsx)(l.N_,{to:"/tarot-readings",className:"mt-6 inline-block bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight",children:"Xem b\xf3i m\u1edbi"})]});const p=(()=>{const t=e.readingType||"general",r=e.cards&&Array.isArray(e.cards)?e.cards.length:0;switch(t){case"three-card":return["left-5 top-1/2 -translate-y-1/2","left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2","right-5 top-1/2 -translate-y-1/2"];case"celtic-cross":return["left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2","left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90","left-1/2 bottom-10 -translate-x-1/2","left-1/2 top-10 -translate-x-1/2","left-20 top-1/2 -translate-y-1/2","right-20 top-1/2 -translate-y-1/2","right-5 bottom-20","right-5 bottom-80","right-5 top-80","right-5 top-20"];case"love":case"career":return["left-5 top-1/2 -translate-y-1/2","left-1/4 top-1/2 -translate-y-1/2","left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2","left-3/4 top-1/2 -translate-y-1/2","right-5 top-1/2 -translate-y-1/2"];default:const t=[];for(let e=0;e<r;e++){const s=e/r*2*Math.PI,a=50+40*Math.cos(s),i=50+40*Math.sin(s);t.push(`left-[${a}%] top-[${i}%] -translate-x-1/2 -translate-y-1/2`)}return t}})(),b=new Date(e.createdAt||Date.now()).toLocaleDateString("vi-VN",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"});let v=[];if(r)try{if("string"===typeof r&&""!==r.trim())try{v=JSON.parse(r).sections||[]}catch(f){v=[{title:"Gi\u1ea3i th\xedch t\u1ed5ng quan",content:r}]}else r.sections?v=r.sections:r.interpretation&&r.interpretation.sections&&(v=r.interpretation.sections)}catch(f){v=[{title:"Gi\u1ea3i th\xedch t\u1ed5ng quan",content:"Kh\xf4ng th\u1ec3 hi\u1ec3n th\u1ecb n\u1ed9i dung gi\u1ea3i th\xedch."}]}else e.cards&&Array.isArray(e.cards)&&(v=e.cards.map(((t,e)=>({title:`L\xe1 b\xe0i ${e+1}: ${t.name||"Kh\xf4ng t\xean"}`,content:t.meaning||"Kh\xf4ng c\xf3 th\xf4ng tin chi ti\u1ebft."}))));0===v.length&&(v=[{title:"Gi\u1ea3i th\xedch t\u1ed5ng quan",content:"H\xe3y suy ng\u1eabm v\u1ec1 l\xe1 b\xe0i n\xe0y v\xe0 t\xecm ra \xfd ngh\u0129a ph\xf9 h\u1ee3p v\u1edbi t\xecnh hu\u1ed1ng c\u1ee7a b\u1ea1n."}]);return(0,c.jsxs)("div",{className:"bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 md:p-8",children:[(0,c.jsxs)("div",{className:"mb-8",children:[(0,c.jsx)("h2",{className:"text-2xl font-bold text-white mb-2 tracking-vn-tight",children:"daily"===e.readingType?"Tarot H\xe0ng Ng\xe0y":`Tr\u1ea3i b\xe0i ${e.readingType||"Tarot"}`}),(0,c.jsxs)("div",{className:"flex flex-wrap items-center text-gray-300 text-sm tracking-vn-tight",children:[(0,c.jsx)("div",{className:"mr-4 mb-2",children:b}),e.question&&(0,c.jsx)("div",{className:"mr-4 mb-2 px-2 py-1 bg-[#9370db]/20 rounded-full",children:e.question.length>50?`${e.question.substring(0,50)}...`:e.question}),(0,c.jsxs)("div",{className:"flex items-center",children:[(0,c.jsx)("span",{className:"w-2 h-2 bg-green-500 rounded-full mr-2"}),(0,c.jsx)("span",{children:"Ho\xe0n th\xe0nh"})]})]})]}),e.cards&&Array.isArray(e.cards)&&e.cards.length>0&&(0,c.jsxs)("div",{className:"relative h-[400px] md:h-[500px] mb-10 bg-gradient-to-br from-[#2a1045]/50 to-[#3a1c5a]/50 rounded-xl overflow-hidden",children:[e.cards.map(((t,e)=>!t||e>=p.length?null:(0,c.jsx)(d,{card:t,isRevealed:e<m,size:"medium",position:p[e]||""},t.id||e))),a&&(0,c.jsx)("div",{className:"absolute inset-0 flex items-center justify-center bg-[#0f051d]/70 backdrop-blur-sm",children:(0,c.jsxs)("div",{className:"flex flex-col items-center",children:[(0,c.jsxs)("svg",{className:"animate-spin h-10 w-10 text-[#9370db] mb-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,c.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,c.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),(0,c.jsx)("p",{className:"text-white tracking-vn-tight",children:"\u0110ang gi\u1ea3i m\xe3 n\u0103ng l\u01b0\u1ee3ng t\u1eeb c\xe1c l\xe1 b\xe0i..."})]})})]}),(o||!e.cards||0===e.cards.length)&&!a&&(0,c.jsxs)("div",{className:"mb-8",children:[(0,c.jsx)("h3",{className:"text-xl font-bold text-white mb-4 tracking-vn-tight",children:"Gi\u1ea3i Th\xedch"}),(0,c.jsx)("div",{className:"space-y-4",children:v.map(((t,e)=>(0,c.jsxs)("div",{className:"bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-lg overflow-hidden",children:[(0,c.jsxs)("button",{className:"w-full px-4 py-3 flex justify-between items-center text-left text-white font-medium tracking-vn-tight",onClick:()=>(t=>{x(g===t?null:t)})(e),children:[(0,c.jsx)("span",{children:t.title||`Ph\u1ea7n ${e+1}`}),(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 transform transition-transform "+(g===e?"rotate-180":""),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),g===e&&(0,c.jsx)("div",{className:"px-4 py-3 border-t border-purple-900/20 text-gray-300 tracking-vn-tight leading-vn",children:(0,c.jsx)("p",{children:t.content||"Kh\xf4ng c\xf3 n\u1ed9i dung"})})]},e)))}),r&&r.interpretation&&r.interpretation.conclusion&&(0,c.jsx)("div",{className:"mt-6 p-4 bg-[#9370db]/10 rounded-lg",children:(0,c.jsxs)("p",{className:"text-gray-300 tracking-vn-tight italic",children:['"',r.interpretation.conclusion,'"']})})]}),(0,c.jsxs)("div",{className:"flex flex-wrap gap-3 justify-center md:justify-between",children:[(0,c.jsxs)("div",{className:"flex gap-3",children:[i&&(0,c.jsxs)("button",{onClick:i,className:"bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight flex items-center",children:[(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"})}),"L\u01b0u k\u1ebft qu\u1ea3"]}),n&&(0,c.jsxs)("button",{onClick:n,className:"bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight flex items-center",children:[(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"})}),"Chia s\u1ebb"]})]}),(0,c.jsx)(l.N_,{to:"/tarot-readings",className:"bg-gradient-to-r from-[#9370db] to-[#8a2be2] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow tracking-vn-tight",children:"Xem b\xf3i m\u1edbi"})]})]})})),m=(0,s.memo)((t=>{let{readingType:e="three-card",cards:r=[],isRevealing:a=!1,revealCount:i=0}=t;const[n,l]=(0,s.useState)(0),[o,h]=(0,s.useState)(0),[m,u]=(0,s.useState)(!1);(0,s.useEffect)((()=>{if(r&&r.length>0){const t=setInterval((()=>{l((e=>e<r.length?e+1:(clearInterval(t),u(!0),e)))}),300);return()=>clearInterval(t)}}),[r]),(0,s.useEffect)((()=>{h(i)}),[i]);const g=(()=>{switch(e){case"three-card":return{container:"h-[300px] md:h-[350px]",positions:["left-[15%] top-1/2 -translate-y-1/2","left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2","right-[15%] top-1/2 -translate-y-1/2"],labels:["Qu\xe1 kh\u1ee9","Hi\u1ec7n t\u1ea1i","T\u01b0\u01a1ng lai"]};case"celtic-cross":return{container:"h-[500px] md:h-[550px]",positions:["left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2","left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90","left-1/2 bottom-[10%] -translate-x-1/2","left-1/2 top-[10%] -translate-x-1/2","left-[15%] top-1/2 -translate-y-1/2","right-[15%] top-1/2 -translate-y-1/2","right-[5%] bottom-[20%]","right-[5%] bottom-[60%]","right-[5%] top-[60%]","right-[5%] top-[20%]"],labels:["Hi\u1ec7n t\u1ea1i","Th\xe1ch th\u1ee9c","N\u1ec1n t\u1ea3ng","Qu\xe1 kh\u1ee9","\u1ea2nh h\u01b0\u1edfng s\u1eafp t\u1edbi","T\u01b0\u01a1ng lai","B\u1ea3n th\xe2n","M\xf4i tr\u01b0\u1eddng","Hy v\u1ecdng/S\u1ee3 h\xe3i","K\u1ebft qu\u1ea3"]};case"love":return{container:"h-[350px] md:h-[400px]",positions:["left-[10%] top-1/2 -translate-y-1/2","left-[30%] top-1/2 -translate-y-1/2","left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2","right-[30%] top-1/2 -translate-y-1/2","right-[10%] top-1/2 -translate-y-1/2"],labels:["B\u1ea1n","C\u1ea3m x\xfac c\u1ee7a b\u1ea1n","M\u1ed1i quan h\u1ec7","C\u1ea3m x\xfac c\u1ee7a h\u1ecd","Ng\u01b0\u1eddi \u1ea5y"]};case"career":return{container:"h-[350px] md:h-[400px]",positions:["left-[10%] top-1/2 -translate-y-1/2","left-[30%] top-1/2 -translate-y-1/2","left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2","right-[30%] top-1/2 -translate-y-1/2","right-[10%] top-1/2 -translate-y-1/2"],labels:["Hi\u1ec7n t\u1ea1i","Th\xe1ch th\u1ee9c","L\u1eddi khuy\xean","Ti\u1ec1m n\u0103ng","K\u1ebft qu\u1ea3"]};default:const t=[],e=[];if(r&&r.length>0)for(let s=0;s<r.length;s++){const a=s/r.length*2*Math.PI,i=r.length<=5?35:40,n=50+i*Math.cos(a),l=50+i*Math.sin(a);t.push(`left-[${n}%] top-[${l}%] -translate-x-1/2 -translate-y-1/2`),e.push(`L\xe1 ${s+1}`)}return{container:"h-[400px] md:h-[450px]",positions:t,labels:e}}})();return r&&0!==r.length?(0,c.jsxs)("div",{className:`relative ${g.container} bg-gradient-to-br from-[#2a1045]/30 to-[#3a1c5a]/30 rounded-xl overflow-hidden mb-10`,children:[(0,c.jsx)("div",{className:"absolute inset-0 bg-[url('/src/assets/images/tarot-pattern.png')] bg-repeat opacity-5"}),(0,c.jsx)("div",{className:"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#9370db]/20 rounded-full filter blur-3xl"}),r&&r.map(((t,r)=>!t||r>=(g.positions?g.positions.length:0)||r>=n?null:(0,c.jsxs)("div",{className:"absolute z-10",children:[(0,c.jsx)(d,{card:t,isRevealed:a&&r<o,size:"medium",position:g.positions[r]||""}),m&&g.labels&&g.labels[r]&&(0,c.jsx)("div",{className:"absolute "+("celtic-cross"===e&&1===r?"left-1/2 -translate-x-1/2 -bottom-10":"left-1/2 -translate-x-1/2 -top-8"),children:(0,c.jsx)("div",{className:"px-2 py-1 bg-[#9370db]/20 backdrop-blur-sm rounded-full",children:(0,c.jsx)("span",{className:"text-xs text-white opacity-80 tracking-vn-tight",children:g.labels[r]||`L\xe1 ${r+1}`})})})]},t.id||`card-${r}`))),(!m||a&&r&&o<r.length)&&(0,c.jsx)("div",{className:"absolute inset-0 flex items-center justify-center bg-[#0f051d]/50 backdrop-blur-sm z-20",children:(0,c.jsx)("div",{className:"text-center",children:m?(0,c.jsx)("p",{className:"text-white tracking-vn-tight",children:"L\u1eadt t\u1eebng l\xe1 b\xe0i \u0111\u1ec3 xem k\u1ebft qu\u1ea3..."}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:"w-12 h-12 mx-auto mb-4 rounded-full border-4 border-[#9370db] border-t-transparent animate-spin"}),(0,c.jsx)("p",{className:"text-white tracking-vn-tight",children:"\u0110ang tr\u1ea3i b\xe0i..."})]})})}),(0,c.jsx)("div",{className:"absolute left-5 top-5 w-10 h-10 text-2xl animate-float opacity-30",children:"\u2728"}),(0,c.jsx)("div",{className:"absolute right-10 bottom-10 w-8 h-8 text-xl animate-float opacity-30 animation-delay-1000",children:"\ud83c\udf19"}),(0,c.jsx)("div",{className:"absolute right-5 top-1/4 w-8 h-8 text-xl animate-float opacity-30 animation-delay-2000",children:"\u2b50"}),(0,c.jsx)("div",{className:"absolute left-10 bottom-1/4 w-6 h-6 text-lg animate-float opacity-30 animation-delay-3000",children:"\u2728"})]}):(0,c.jsx)("div",{className:"h-[300px] md:h-[350px] bg-gradient-to-br from-[#2a1045]/30 to-[#3a1c5a]/30 rounded-xl flex items-center justify-center",children:(0,c.jsxs)("div",{className:"text-center",children:[(0,c.jsx)("div",{className:"w-12 h-12 mx-auto mb-4 rounded-full border-4 border-[#9370db] border-t-transparent animate-spin"}),(0,c.jsx)("p",{className:"text-white tracking-vn-tight",children:"\u0110ang chu\u1ea9n b\u1ecb b\xe0i..."})]})})})),u=(0,s.memo)((()=>{const t=(0,a.wA)(),{cards:e,selectedCards:r,currentReading:l,interpretation:o,loading:d,error:u}=(0,a.d4)((t=>t.tarot)),[g,x]=(0,s.useState)(!1),[p,b]=(0,s.useState)("form"),[v,f]=(0,s.useState)(0),[y,j]=(0,s.useState)(null);(0,s.useEffect)((()=>{e&&0!==e.length||t((0,i.T7)())}),[t,e]);const w=(0,s.useCallback)((e=>{e&&(x(!0),b("cards"),j(e),f(0),t((0,i.E4)()),t((0,i.AK)(e)).then((()=>{setTimeout((()=>{e&&e.numCards&&N(e.numCards)}),1500)})))}),[t]),N=(0,s.useCallback)((e=>{if(!e||e<=0)return;let r=0;const s=setInterval((()=>{r+=1,f(r),r>=e&&(clearInterval(s),setTimeout((()=>{b("result"),!o&&l&&l.cards&&t((0,i.Zq)({cards:l.cards,question:l.question||"",readingType:l.readingType||"general"}))}),2e3))}),1200);return()=>clearInterval(s)}),[t,l,o]),k=(0,s.useCallback)((()=>{alert("\u0110\xe3 l\u01b0u k\u1ebft qu\u1ea3 th\xe0nh c\xf4ng!")}),[]),C=(0,s.useCallback)((()=>{alert("Ch\u1ee9c n\u0103ng chia s\u1ebb \u0111ang \u0111\u01b0\u1ee3c ph\xe1t tri\u1ec3n!")}),[]),T=(0,s.useCallback)((()=>{x(!1),b("form"),f(0),j(null),t((0,i.E4)())}),[t]);let S;return"form"===p?S=(0,c.jsx)(n.A,{onStart:w,isLoading:d}):"cards"===p?S=(0,c.jsxs)("div",{className:"space-y-6",children:[(0,c.jsxs)("div",{className:"bg-white/5 backdrop-blur-sm border border-purple-900/20 rounded-xl p-6 md:p-8 text-center",children:[(0,c.jsx)("h2",{className:"text-2xl font-bold text-white mb-4 tracking-vn-tight",children:"\u0110ang tr\u1ea3i b\xe0i Tarot"}),l&&l.question&&(0,c.jsx)("div",{className:"my-4 p-4 bg-[#9370db]/10 rounded-lg",children:(0,c.jsxs)("p",{className:"text-gray-300 tracking-vn-tight italic",children:['"',l.question,'"']})}),l&&l.cards&&Array.isArray(l.cards)&&l.cards.length>0&&(0,c.jsx)(m,{readingType:(null===y||void 0===y?void 0:y.readingType)||"three-card",cards:l.cards,isRevealing:!0,revealCount:v}),(!l||!l.cards||!Array.isArray(l.cards)||0===l.cards.length)&&(0,c.jsxs)("div",{className:"animate-pulse space-y-4",children:[(0,c.jsx)("p",{className:"text-gray-300 tracking-vn-tight",children:"Xin vui l\xf2ng ch\u1edd trong gi\xe2y l\xe1t"}),(0,c.jsx)("div",{className:"w-20 h-20 rounded-full bg-[#9370db]/30 mx-auto flex items-center justify-center",children:(0,c.jsx)("div",{className:"w-12 h-12 rounded-full bg-[#9370db] animate-ping"})})]})]}),(0,c.jsx)("div",{className:"text-center",children:(0,c.jsxs)("button",{onClick:T,className:"bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight inline-flex items-center",children:[(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}),"H\u1ee7y tr\u1ea3i b\xe0i"]})})]}):"result"===p&&(S=(0,c.jsx)(h,{reading:l||{},interpretation:o||"",isLoading:d,onSave:k,onShareClick:C})),(0,c.jsxs)("div",{children:[u&&(0,c.jsx)("div",{className:"bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-4 mb-6",children:(0,c.jsx)("p",{className:"text-white tracking-vn-tight",children:u})}),S,g&&"result"===p&&(0,c.jsx)("div",{className:"mt-8 text-center",children:(0,c.jsxs)("button",{onClick:T,className:"bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors tracking-vn-tight inline-flex items-center",children:[(0,c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 mr-2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,c.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),"Tr\u1ea3i b\xe0i m\u1edbi"]})})]})}))}}]);
//# sourceMappingURL=196.c459fed1.chunk.js.map