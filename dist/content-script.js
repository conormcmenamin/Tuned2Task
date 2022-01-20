function ping(){
    chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if(chrome.runtime.lastError) {
        setTimeout(ping, 1000);
      } 
    else{
        if (request.action == "getSource") {
            console.log(document.getElementsByTagName('button'))
            callback({"title": document.getElementsByTagName('html')[0]});
        }
    }
   
});
}