/// <reference types="chrome"/>

import { CONTEXT_MENU_ITEM, WEB_PLAYER_URL, CONTEXT_MENU_ITEM_TEXT } from '../../lib/constants';


chrome.runtime.onInstalled.addListener(function () {
  // Make extension work on all pages
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  // Create right click menu
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ITEM,
    title: CONTEXT_MENU_ITEM_TEXT,
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === CONTEXT_MENU_ITEM) {
    chrome.tabs.create({
      url: `${WEB_PLAYER_URL}/search/${info.selectionText}`,
    });
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(tabId);
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

