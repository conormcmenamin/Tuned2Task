(()=>{"use strict";var t={874:function(t,e,n){var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(o,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function a(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.App=void 0;const o=n(623),r=n(177),s=n(561);function a(t){const e=document.getElementById("spotify-login-notification"),n=document.getElementById("spotify-player");switch(t){case"spotify-player-box":n.style.display="flex",e.style.display="none";break;case"please-login-box":n.style.display="none",e.style.display="flex"}}e.App=class{constructor(){this.token=null,this.track=null}render(){return i(this,void 0,void 0,(function*(){this.token=yield s.getAccessToken(),console.log(this.isLoggedIn()),this.isLoggedIn()?yield this.showPlayerUI():a("please-login-box")}))}showPlayerUI(){return i(this,void 0,void 0,(function*(){a("spotify-player-box");const t=r.Cache.retrieve(o.STORAGE_KEY);var e,n;this.track=yield this.getTrack(t),console.log("track:"+this.track),s.isUpdateStorage(t,this.track)?r.Cache.storeWithKey(o.STORAGE_KEY,this.track):this.track?this.track=t:this.track=Object.assign(Object.assign({},t),{isPlaying:!1}),this.displayTrackInfo(),this.startTimer(),e=document.getElementById("play"),n=document.getElementById("pause"),console.log("pause/play: play"),e.style.display="none",n.style.display="flex"}))}isLoggedIn(){return!this.token.isAnonymous}getTrack(t){return i(this,void 0,void 0,(function*(){let e,n=yield s.getRecentPlayback(this.token.accessToken);switch(n?n.item||(e="no-song-playing"):e=t?"cache":"nothing",e){case"nothing":case"no-song-playing":n=yield s.getRecentlyPlayedTrack(this.token.accessToken);break;case"cache":n=t}return n=s.parse(n),n}))}displayTrackInfo(){return i(this,void 0,void 0,(function*(){const t=this.track,e=document.getElementById("title"),n=document.getElementById("artist"),i=document.getElementById("cover-photo-wrapper"),{title:o,artist:r,coverPhoto:s,trackUrl:a}=t;if(console.log("song title: "+o),o&&(e.textContent=o,e.setAttribute("title",o),e.setAttribute("href",a),e.setAttribute("target","_blank"),e.style.textDecoration="none",e.style.fontWeight="bold"),r&&(n.textContent=r.name,n.setAttribute("title",r.name),n.setAttribute("href",r.url),n.setAttribute("target","_blank"),n.style.textDecoration="none",n.style.fontStyle="italic"),s){const t=document.createElement("img");t.setAttribute("src",s),t.setAttribute("id","cover-photo"),t.setAttribute("class","mini-spotify-right-panel mini-spotify-cover-photo"),t.setAttribute("title",`${o} - ${r.name}`),t.setAttribute("alt",`${o} - ${r.name}`),document.getElementById("cover-photo")&&i.removeChild(document.getElementById("cover-photo")),i.append(t)}console.log(o,r)}))}startTimer(){if(!this.track)return;const t=this.track.durationMs,e=this.track.progressMs||0,n=setTimeout((()=>i(this,void 0,void 0,(function*(){yield this.showPlayerUI(),clearTimeout(n)}))),t-e)}},document.addEventListener("click",(function(){}))},177:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Cache=void 0,e.Cache=class{static retrieve(t){let e;try{e=JSON.parse(localStorage.getItem(t))}catch(t){e=void 0}return console.log("stored:"+e),e}static storeWithKey(t,e){localStorage.setItem(t,JSON.stringify(e))}}},623:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.HOUR_IN_SECOND=e.STORAGE_KEY=e.CONTEXT_MENU_ITEM_TEXT=e.CONTEXT_MENU_ITEM=e.API_URL=e.WEB_PLAYER_URL=void 0,e.WEB_PLAYER_URL="https://open.spotify.com",e.API_URL="https://api.spotify.com",e.CONTEXT_MENU_ITEM="spotify-extension-search-on-spotify",e.CONTEXT_MENU_ITEM_TEXT='Search Spotify for "%s"',e.STORAGE_KEY="storage",e.HOUR_IN_SECOND=3600},561:function(t,e,n){var i=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(o,r){function s(t){try{c(i.next(t))}catch(t){r(t)}}function a(t){try{c(i.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}c((i=i.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.parse=e.isUpdateStorage=e.getRecentlyPlayedTrack=e.getRecentPlayback=e.getAccessToken=void 0;const o=n(623);e.getAccessToken=function(){return i(this,void 0,void 0,(function*(){let t={clientId:null,accessToken:null,accessTokenExpirationTime:null,isAnonymous:null};try{const e=`${o.WEB_PLAYER_URL}/get_access_token`,n=yield fetch(e);t=yield n.json()}catch(t){}return t}))},e.getRecentPlayback=function(t){return i(this,void 0,void 0,(function*(){const e=`${o.API_URL}/v1/me/player?additional_types=track`;try{const n=yield fetch(e,{headers:{Authorization:`Bearer ${t}`}}),i=yield n.json();return console.log(i),i}catch(t){return!1}}))},e.getRecentlyPlayedTrack=function(t){return i(this,void 0,void 0,(function*(){const e=`${o.API_URL}/v1/me/player/recently-played`;try{const n=yield fetch(e,{headers:{Authorization:`Bearer ${t}`}});let i=yield n.json();if(i&&i.items.length){const{track:t,context:e}=i.items[0];return{item:t,context:e}}return}catch(t){return}}))},e.isUpdateStorage=function(t,e){return!!(!t||e&&e.title!==t.title||e&&e.isPlaying!==t.isPlaying||e&&e.uri!==t.uri||e&&e.uri===t.uri&&e.progressMs!==t.progressMs||e&&e.uri===t.uri&&e.isSave!==t.isSave||e&&e.uri===t.uri&&e.repeatState!==t.repeatState)},e.parse=function(t){if(!t||t&&!t.item)return;const{is_playing:e,progress_ms:n,repeat_state:i,item:{name:o,artists:r,album:{images:s},uri:a,id:c,duration_ms:l,external_urls:{spotify:u}}}=t;let y="",d="";(null==r?void 0:r.length)&&(y=r[0].name,d=r[0].external_urls.spotify);const h=(null==s?void 0:s.length)?s[1].url:"";let p;if(t.context){const{type:e,href:n,external_urls:i,uri:o}=t.context;p={type:e,href:n,uri:o,externalUrls:i}}return{title:o,artist:{name:y,url:d},repeatState:i,isPlaying:e,coverPhoto:h,uri:a,progressMs:n,context:p,durationMs:l,trackUrl:u,id:c}}},975:(t,e,n)=>{(new(n(874).App)).render()}},e={};!function n(i){if(e[i])return e[i].exports;var o=e[i]={exports:{}};return t[i].call(o.exports,o,o.exports,n),o.exports}(975)})();