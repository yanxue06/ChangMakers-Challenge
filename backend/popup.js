document.addEventListener('DOMContentLoaded', function() {
    function updateDisplay() {
        chrome.storage.local.get(['tokenCount', 'energyStats'], function(data) {
            if (window.updateEnergy && data.energyStats) {
                window.updateEnergy(data.energyStats);
            }
        });
    }

    // Update when popup opens
    updateDisplay();

    // Update when storage changes
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.energyStats) {
            updateDisplay();
        }
    });
});