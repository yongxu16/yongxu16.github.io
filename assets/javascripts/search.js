---
layout: null
---
/*
# Lib:          Simple-Jekyll-Search
# Description:  A JavaScript library to add search functionality to any Jekyll blog.
# Url:          https://github.com/christian-fei
# --------------------------------------------------------------------
*/
!function t(e,r,n){function i(u,a){if(!r[u]){if(!e[u]){var c="function"==typeof require&&require;if(!a&&c)return c(u,!0);if(o)return o(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=r[u]={exports:{}};e[u][0].call(s.exports,function(t){var r=e[u][1][t];return i(r?r:t)},s,s.exports,t,e,r,n)}return r[u].exports}for(var o="function"==typeof require&&require,u=0;u<n.length;u++)i(n[u]);return i}({1:[function(t,e,r){"use strict";function n(t,e){var r=e.length,n=t.length;if(n>r)return!1;if(n===r)return t===e;t:for(var i=0,o=0;i<n;i++){for(var u=t.charCodeAt(i);o<r;)if(e.charCodeAt(o++)===u)continue t;return!1}return!0}e.exports=n},{}],2:[function(t,e,r){"use strict";function n(t,e){var r=o();r.open("GET",t,!0),r.onreadystatechange=i(r,e),r.send()}function i(t,e){return function(){if(4===t.readyState&&200===t.status)try{e(null,JSON.parse(t.responseText))}catch(r){e(r,null)}}}function o(){return window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")}e.exports={load:n}},{}],3:[function(t,e,r){"use strict";e.exports=function n(t){function e(t){return!!t&&(void 0!==t.required&&t.required instanceof Array)}if(!e(t))throw new Error("-- OptionsValidator: required options missing");if(!(this instanceof n))return new n(t);var r=t.required;this.getRequiredOptions=function(){return r},this.validate=function(t){var e=[];return r.forEach(function(r){void 0===t[r]&&e.push(r)}),e}}},{}],4:[function(t,e,r){"use strict";function n(t){return u(t)?c(t):a(t)?s(t):void 0}function i(){return S.length=0,S}function o(){return S}function u(t){return!!t&&"[object Object]"===Object.prototype.toString.call(t)}function a(t){return!!t&&"[object Array]"===Object.prototype.toString.call(t)}function c(t){return S.push(t),S}function s(t){for(var e=[],r=0;r<t.length;r++)u(t[r])&&e.push(c(t[r]));return e}function f(t){return t?p(S,t,g.searchStrategy,g):[]}function l(t){g=t||{},g.fuzzy=t.fuzzy||!1,g.limit=t.limit||10,g.searchStrategy=t.fuzzy?m:y}function p(t,e,r,n){for(var i=[],o=0;o<t.length&&i.length<n.limit;o++){var u=h(t[o],e,r,n);u&&i.push(u)}return i}function h(t,e,r,n){for(var i in t)if(!d(t[i],n.exclude)&&r.matches(t[i],e))return t}function d(t,e){var r=!1;e=e||[];for(var n=0;n<e.length;n++){var i=e[n];!r&&new RegExp(t).test(i)&&(r=!0)}return r}e.exports={put:n,clear:i,get:o,search:f,setOptions:l};var m=t("./SearchStrategies/FuzzySearchStrategy"),y=t("./SearchStrategies/LiteralSearchStrategy"),S=[],g={};g.fuzzy=!1,g.limit=10,g.searchStrategy=g.fuzzy?m:y},{"./SearchStrategies/FuzzySearchStrategy":5,"./SearchStrategies/LiteralSearchStrategy":6}],5:[function(t,e,r){"use strict";function n(){this.matches=function(t,e){return i(e,t)}}var i=t("fuzzysearch");e.exports=new n},{fuzzysearch:1}],6:[function(t,e,r){"use strict";function n(){this.matches=function(t,e){return"string"==typeof t&&(t=t.trim(),t.toLowerCase().indexOf(e.toLowerCase())>=0)}}e.exports=new n},{}],7:[function(t,e,r){"use strict";function n(t){o.pattern=t.pattern||o.pattern,o.template=t.template||o.template,"function"==typeof t.middleware&&(o.middleware=t.middleware)}function i(t){return o.template.replace(o.pattern,function(e,r){var n=o.middleware(r,t[r],o.template);return void 0!==n?n:t[r]||e})}e.exports={compile:i,setOptions:n};var o={};o.pattern=/\{(.*?)\}/g,o.template="",o.middleware=function(){}},{}],8:[function(t,e,r){!function(e,r,n){"use strict";function i(t){y.put(t),c()}function o(t){S.load(t,function(e,r){e&&p("failed to get JSON ("+t+")"),i(r)})}function u(){h.resultsContainer.innerHTML=""}function a(t){h.resultsContainer.innerHTML+=t}function c(){h.searchInput.addEventListener("keyup",function(t){var e=t.which;if(l(e)){u();var r=t.target.value;f(r)&&s(y.search(r))}})}function s(t){if(0===t.length)return a(h.noResultsText);for(var e=0;e<t.length;e++)a(m.compile(t[e]))}function f(t){return t&&t.length>0}function l(t){return[13,16,20,37,38,39,40,91].indexOf(t)===-1}function p(t){throw new Error("SimpleJekyllSearch --- "+t)}var h={searchInput:null,resultsContainer:null,json:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',templateMiddleware:function(){},noResultsText:"No results found",limit:10,fuzzy:!1,exclude:[]},d=["searchInput","resultsContainer","json"],m=t("./Templater"),y=t("./Repository"),S=t("./JSONLoader"),g=t("./OptionsValidator")({required:d}),v=t("./utils");e.SimpleJekyllSearch=function(t){var e=g.validate(t);e.length>0&&p("You must specify the following required options: "+d),h=v.merge(h,t),m.setOptions({template:h.searchResultTemplate,middleware:h.templateMiddleware}),y.setOptions({fuzzy:h.fuzzy,limit:h.limit}),v.isJSON(h.json)?i(h.json):o(h.json)},e.SimpleJekyllSearch.init=e.SimpleJekyllSearch,"function"==typeof e.SimpleJekyllSearchInit&&e.SimpleJekyllSearchInit.call(this,e.SimpleJekyllSearch)}(window,document)},{"./JSONLoader":2,"./OptionsValidator":3,"./Repository":4,"./Templater":7,"./utils":9}],9:[function(t,e,r){"use strict";function n(t,e){var r={};for(var n in t)r[n]=t[n],void 0!==e[n]&&(r[n]=e[n]);return r}function i(t){try{return!!(t instanceof Object&&JSON.parse(JSON.stringify(t)))}catch(e){return!1}}e.exports={merge:n,isJSON:i}},{}]},{},[8]);

/* Include Data Base*/
{% include dbase/dbase %}

/* Initialize jekyll search element.*/
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('searchResult'),
  json: '{{ "/assets/json/search.json" | prepend: site.baseurl | prepend: site.url }}',
  noResultsText:'{{ dbase.website.strings.search.input.notfound }}',
  limit:10,
  fuzzy:!1
});
