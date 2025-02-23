document.addEventListener('DOMContentLoaded', function() {
    function updateDisplay() {
        chrome.storage.local.get('tokenCount', function(data) {
            document.getElementById('tokenCount').textContent = data.tokenCount || 0;
        });
    }

    // Update when popup opens
    updateDisplay();

    // Update when storage changes
    chrome.storage.onChanged.addListener(function(changes) {
        if (changes.tokenCount) {
            updateDisplay();
        }
    });
});