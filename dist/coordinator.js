!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("Coordinator",[],n):"object"==typeof exports?exports.Coordinator=n():e.Coordinator=n()}(this,function(){"use strict";var e={},n=function(n){return e[n]||[]},t=function(n,t){return!(!t instanceof Array)&&void(e[n]=t)},r=function(n){return"undefined"!=typeof e[n]},o=function(n){r(n)&&delete e[n]},f=function(n,t,o){var f=arguments.length;return!(f<2)&&("string"==typeof n&&"function"==typeof t&&("undefined"==typeof o&&(o=null),r(n)||(e[n]=[]),e[n].push({fn:t,scp:o})))},u=function(e,t){if(!r(e))return!1;for(var o=n(e),f=0;f<o.length;f++)"undefined"==typeof t?o[f].fn.apply(o[f].scp):o[f].fn.apply(o[f].scp,[t]);return!0},i=function(e,o,f){var u=arguments.length;if(u<2)return!1;if("string"!=typeof e||"function"!=typeof o)return!1;if("undefined"==typeof f&&(f=null),r(e)){for(var i,s=[],c=n(e),p=0;p<c.length;p++)i=c[p],i.fn==o&&i.scp==f||s.push(i);t(e,s)}return!0};return{subscribe:f,unsubscribe:i,broadcast:u,_getSubscribers:n,_setSubscribers:t,_deRegisterEvent:o}});