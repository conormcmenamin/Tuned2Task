(()=>{"use strict";var t={874:function(t,e,n){var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(i,c){function r(t){try{u(o.next(t))}catch(t){c(t)}}function s(t){try{u(o.throw(t))}catch(t){c(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,s)}u((o=o.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.App=void 0;const i=n(561);e.App=class{constructor(){this.token=null,this.track=null}render(){return o(this,void 0,void 0,(function*(){this.token=yield i.getAccessToken(),this.isLoggedIn()||function(t){const e=document.getElementById("spotify-login-notification"),n=document.getElementById("spotify-player");n.style.display="none",e.style.display="flex"}()}))}isLoggedIn(){return this.token.isAnonymous}}},623:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.CONTEXT_MENU_ITEM_TEXT=e.CONTEXT_MENU_ITEM=e.API_URL=e.WEB_PLAYER_URL=void 0,e.WEB_PLAYER_URL="https://open.spotify.com",e.API_URL="https://api.spotify.com",e.CONTEXT_MENU_ITEM="spotify-extension-search-on-spotify",e.CONTEXT_MENU_ITEM_TEXT='Search Spotify for "%s"'},561:function(t,e,n){var o=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(i,c){function r(t){try{u(o.next(t))}catch(t){c(t)}}function s(t){try{u(o.throw(t))}catch(t){c(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,s)}u((o=o.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.getTrack=e.getAccessToken=void 0;const i=n(623);e.getAccessToken=function(){return o(this,void 0,void 0,(function*(){let t={clientId:null,accessToken:null,accessTokenExpirationTime:null,isAnonymous:null};try{const e=`${i.WEB_PLAYER_URL}/get_access_token`,n=yield fetch(e);t=yield n.json()}catch(t){}return t}))},e.getTrack=function(t){return o(this,void 0,void 0,(function*(){const e=`${i.API_URL}/v1/me/player?additional_types=track`;try{const n=yield fetch(e,{headers:{Authorization:`Bearer ${t}`}});return yield n.json()}catch(t){return!1}}))}},975:(t,e,n)=>{(new(n(874).App)).render()}},e={};!function n(o){if(e[o])return e[o].exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,n),i.exports}(975)})();