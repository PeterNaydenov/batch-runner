function n(){const n=new Map;function e(e){const{name:t,source:o,job:r}=e;return"string"==typeof t&&("function"==typeof o&&("function"==typeof r&&(n.set(t,{name:t,source:o,job:r}),!0)))}return{define:e,run:function(t,...o){if("string"!=typeof t){const{name:n}=t;e(t),t=n}const r=n.get(t);if(null==r)return[];const{source:f,job:u}=r,i=Symbol("end___"),s=[];let c=f();c.length||(c=[c]);for(let[n,e]of c.entries()){let t=u({item:e,i:n,END:i},...o);if(t===i)break;s.push(t)}return s}}}export{n as default};