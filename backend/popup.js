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

// Listen for storage changes and update React component
chrome.storage.onChanged.addListener((changes) => {
    if (changes.tokenCount) {
        const newTokens = changes.tokenCount.newValue;
        // Calculate energy values (example conversion rates)
        const energyPerToken = 0.0002; // Change energy per token
        const currentEnergy = newTokens * energyPerToken;
        
        // Update React component through window.updateEnergy
        if (window.updateEnergy) {
            window.updateEnergy({
                tokens: newTokens,
                // energy calculation
                currentPrompt: currentEnergy,
                dailyTotal: currentEnergy * 2, 
                weeklyAverage: currentEnergy / 5 
            });
        }
    }
});

// Initial load of token count
chrome.storage.local.get(['tokenCount'], (result) => {
    const tokens = result.tokenCount || 0;
    const energyPerToken = 0.0002;
    const energy = tokens * energyPerToken;
    
    if (window.updateEnergy) {
        window.updateEnergy({
            tokens: tokens,
            currentPrompt: energy,
            dailyTotal: energy * 2,
            weeklyAverage: energy / 5
        });
    }
});