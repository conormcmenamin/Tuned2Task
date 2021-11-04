/*
let sampleVar = document.getElementById("sampleID");    //inject var into html id

chrome.storage.sync.get("sampleID", ({ sampleVar }) => {

});

// When the button is clicked, inject script
setFunctionSample.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setFunctionSample,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setFunctionSample() {
    chrome.storage.sync.get("sampleID", ({ sampleVar }) => {
        document.body.style.setFunctionSample = sampleVar;
    });
}*/
