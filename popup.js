let sampleVar = document.getElementById("sampleID")

chrome.storage.sync.get("sampleID", ({ sampleVar }) => {       //Items in the sync storage area are synced using Chrome Sync. In this case the color variable is fetched
    sampleFunction.style.backgroundColor = sampleVar;
});

// When the button is clicked, inject setSampleFunction into current page
sampleFunction.addEventListener("click", async () => {     //adds a click event listener to the button, which triggers a programmatically injected content script(response to events or on specific occasions)
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });     //Gets current open tab

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setSampleFunction,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setSampleFunction() {
    chrome.storage.sync.get("sampleID", ({ sampleVar }) => {

    });
}