/// <reference types="chrome"/>
import { CONTEXT_MENU_ITEM, WEB_PLAYER_URL, CONTEXT_MENU_ITEM_TEXT } from '../lib/constants';



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

