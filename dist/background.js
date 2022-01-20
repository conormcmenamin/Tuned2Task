(()=>{"use strict";var e={991:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(c,i){function r(e){try{s(n.next(e))}catch(e){i(e)}}function a(e){try{s(n.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?c(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(r,a)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const c=o(623);chrome.runtime.onInstalled.addListener((function(){chrome.declarativeContent.onPageChanged.removeRules(void 0,(function(){chrome.declarativeContent.onPageChanged.addRules([{conditions:[new chrome.declarativeContent.PageStateMatcher({})],actions:[new chrome.declarativeContent.ShowPageAction]}])})),chrome.contextMenus.create({id:c.CONTEXT_MENU_ITEM,title:c.CONTEXT_MENU_ITEM_TEXT,contexts:["selection"]})})),chrome.contextMenus.onClicked.addListener((function(e){e.menuItemId===c.CONTEXT_MENU_ITEM&&chrome.tabs.create({url:`${c.WEB_PLAYER_URL}/search/${e.selectionText}`})})),chrome.tabs.onUpdated.addListener((function(e,t,o){console.log(e)})),chrome.tabs.onActivated.addListener((function(e){return n(this,void 0,void 0,(function*(){setTimeout((()=>{chrome.tabs.get(e.tabId,(e=>{console.log(e),console.log("responseTab")}))}),100),function(){n(this,void 0,void 0,(function*(){var e=yield chrome.tabs.query({active:!0,currentWindow:!0},(function(e){console.log("data: "+e.toString())}));console.log("result: "+e)}))}()}))}))},623:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.TIME_OUT=t.HOUR_IN_SECOND=t.STORAGE_KEY=t.CONTEXT_MENU_ITEM_TEXT=t.CONTEXT_MENU_ITEM=t.API_URL=t.WEB_PLAYER_URL=void 0,t.WEB_PLAYER_URL="https://open.spotify.com",t.API_URL="https://api.spotify.com",t.CONTEXT_MENU_ITEM="spotify-extension-search-on-spotify",t.CONTEXT_MENU_ITEM_TEXT='Search Spotify for "%s"',t.STORAGE_KEY="storage",t.HOUR_IN_SECOND=3600,t.TIME_OUT=1e3}},t={};!function o(n){if(t[n])return t[n].exports;var c=t[n]={exports:{}};return e[n].call(c.exports,c,c.exports,o),c.exports}(991)})();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    try {
        chrome.tabs.query({active:true}, function (tab) {
            chrome.runtime.sendMessage(tab.id, {action: "getSource"}, function(source) {
                console.log("HTML "+source);
            });
        });
    }
    catch (ex) {
        console.log(ex);
    }
  });
  
  chrome.tabs.onActivated.addListener(async function (activeInfo){
    setTimeout(()=>{
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        console.log(tab);
        console.log("responseTab" );
        
  
      });} , 100);
  
        getCurrentTab();
  
        // chrome.pageCapture.saveAsMHTML(
        //   details: object,
        //   callback: function,
        // );
  
    
  });
  
  async function getCurrentTab(){
    var queryOptions = { active: true, currentWindow: true };
    var res= await chrome.tabs.query(queryOptions,function(data){
      console.log('data: ' +data.toString());
    });
    console.log('result: '+res);
  }
  
  // async function getCurrentTab() {
  //   let queryOptions = { active: true, currentWindow: true };
  //   let [tab] = await chrome.tabs.query(queryOptions);
  //   return tab;
  // }

  