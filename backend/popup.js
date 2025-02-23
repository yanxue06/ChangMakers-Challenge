document.addEventListener('DOMContentLoaded', function() {
    function updateDisplay() {
        chrome.storage.local.get(['tokenCount', 'energyStats'], function(data) {
            if (window.updateEnergy && data.energyStats) {
                window.updateEnergy({
                    tokens: data.energyStats.tokens,
                    currentPrompt: data.energyStats.currentPrompt,
                    dailyTotal: data.energyStats.dailyTotal,
                    weeklyAverage: data.energyStats.weeklyAverage,
                    carbonFootprint: data.energyStats.carbonFootprint
                });
            }
        });
    }

    // Update when popup opens
    updateDisplay();

    // Update when storage changes
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.energyStats || changes.tokenCount) {
            updateDisplay();
        }
    });

    // Poll for updates every second
    setInterval(updateDisplay, 1000);
});