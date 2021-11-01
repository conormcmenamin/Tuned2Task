let color = '#A9A9A9';  //sets block scoped color variable for background color, value = dark grey

chrome.runtime.onInstalled.addListener(() => {   //chrome.runtime - API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle.
                                                        //Chrome event listener (onInstalled) runs when the extension is first installed, Chrome or Extension updated to new version
    chrome.storage.sync.set({ color });                 //chrome.storage - API to store, retrieve, and track changes to user data.
                                                        //By setting value with storage API it will allow multiple extension components to access that value and update it
    console.log('Default background color set to Dark Grey', `color: ${color}`);      //Writes to the console text and color value
});