chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "get_token_count") {
        chrome.storage.local.get("tokenCount", function(data) {
            sendResponse({ tokenCount: data.tokenCount || 0 });
        });
        return true;
    }
});