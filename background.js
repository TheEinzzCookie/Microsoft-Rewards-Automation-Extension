chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes("bing.com")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: performAutomaticCheckAndClick
        }).catch((error) => {
            console.error("Error executing script:", error);
        });
    }
});

function performAutomaticCheckAndClick() {
    const xpaths = [];

    // Generate XPaths for questionOptionChoice from 00 to 150
    for (let i = 0; i <= 150; i++) {
        const tens = Math.floor(i / 10);
        const ones = i % 10;
        const xpath = `//*[@id="questionOptionChoice${tens}${ones}"]/div`;
        xpaths.push(xpath);
    }

    // Check each XPath for the button and click the first one found
    for (const xpath of xpaths) {
        const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            button.click();
            console.log(`Clicked button: ${xpath}`);
            return; // Exit after clicking the first found button
        }
    }

    console.error("No buttons found. Please check the structure of the page or if the element exists.");
}