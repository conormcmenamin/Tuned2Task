chrome.extension.onMessage.addListener(function(request, sender, callback) {
    if(chrome.runtime.lastError) {
        setTimeout(ping, 1000);
      } 
    else{
        if (request.action == "getSource") {
            callback(document.getElementsByTagName('title').innerHTML);
        }
    }
   
});