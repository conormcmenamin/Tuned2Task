(()=>{"use strict";var e={991:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(c,r){function i(e){try{s(o.next(e))}catch(e){r(e)}}function a(e){try{s(o.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?c(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,a)}s((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const c=n(623);!function(){o(this,void 0,void 0,(function*(){let e=chrome.tabs.query({active:!0,currentWindow:!0},(function([e]){console.log(e)}));return console.log(e),e}))}(),chrome.runtime.onInstalled.addListener((function(){chrome.declarativeContent.onPageChanged.removeRules(void 0,(function(){chrome.declarativeContent.onPageChanged.addRules([{conditions:[new chrome.declarativeContent.PageStateMatcher({})],actions:[new chrome.declarativeContent.ShowPageAction]}])})),chrome.contextMenus.create({id:c.CONTEXT_MENU_ITEM,title:c.CONTEXT_MENU_ITEM_TEXT,contexts:["selection"]})})),chrome.contextMenus.onClicked.addListener((function(e){e.menuItemId===c.CONTEXT_MENU_ITEM&&chrome.tabs.create({url:`${c.WEB_PLAYER_URL}/search/${e.selectionText}`})}))},623:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TIME_OUT=t.HOUR_IN_SECOND=t.STORAGE_KEY=t.CONTEXT_MENU_ITEM_TEXT=t.CONTEXT_MENU_ITEM=t.API_URL=t.WEB_PLAYER_URL=void 0,t.WEB_PLAYER_URL="https://open.spotify.com",t.API_URL="https://api.spotify.com",t.CONTEXT_MENU_ITEM="spotify-extension-search-on-spotify",t.CONTEXT_MENU_ITEM_TEXT='Search Spotify for "%s"',t.STORAGE_KEY="storage",t.HOUR_IN_SECOND=3600,t.TIME_OUT=1e3}},t={};!function n(o){if(t[o])return t[o].exports;var c=t[o]={exports:{}};return e[o].call(c.exports,c,c.exports,n),c.exports}(991)})();