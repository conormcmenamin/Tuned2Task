
//import * as tf from './tf.min.js';
const CONTEXT_MENU_ITEM = 'spotify-extension-search-on-spotify';
const CONTEXT_MENU_ITEM_TEXT = 'Search Spotify for "%s"';
const WEB_PLAYER_URL = 'https://open.spotify.com';


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





chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    try {
        chrome.tabs.query({active:true}, function (tab) {
            // chrome.runtime.sendMessage(tab.id, {action: "getSource"}, function(source) { //inject content script js file to web scrape HTML from web page
            //     console.log("HTML "+source);
            // });


            chrome.scripting.executeScript(null, { file: "tf.min.js" }, function() { //attempt to compile tensorflow min js file 
              console.log('loaded')
            });
        });
    }
    catch (ex) {
        console.log(ex);
    }
  });
  
  chrome.tabs.onActivated.addListener(async function (activeInfo){ //when active tab changes fire this method with the tabs info in activeInfo argument
    setTimeout(()=>{
      chrome.tabs.get(activeInfo.tabId, (tab) => { //TODO: CHANGE MUSIC TYPE HERE
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
  

async function getPrediction(url){
    const model = await tf.loadLayersModel('model.json');
  }

























