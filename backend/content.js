console.log('🚀 Token Tracker: Script loaded');

let totalTokens = 0;
let clickHandler = null;  // Store reference to click handler

function getActiveInputBox() {
    const input = document.querySelector('textarea[placeholder="Ask anything"]');
    console.log('🔍 Looking for input box:', input ? 'Found' : 'Not found');
    return input;
}

function getSendButton() {
    console.log('🔍 Looking for send button...');
    const allButtons = Array.from(document.querySelectorAll('button'));
    const button = allButtons.find(button => 
        button.getAttribute('data-testid')?.includes('send-button') ||
        button.id?.includes('send-button')
    );
    console.log('🔘 Send button:', button ? 'Found' : 'Not found');
    return button;
}

function trackUserInput() {
    console.log('👀 Attempting to track input...');
    let chatInput = getActiveInputBox();
   
    if (!chatInput) {
        console.error("❌ ChatGPT elements not found! Retrying in 1s...");
        setTimeout(trackUserInput, 1000);
        return;
    }

    console.log("✅ ChatGPT Token Tracker: Elements found and ready");

    // Handle Enter key
    chatInput.removeEventListener("keydown", detectInput);
    chatInput.addEventListener("keydown", detectInput);
    console.log('⌨️ Enter key handler attached');

    // Remove old click handler if it exists
    if (clickHandler) {
        document.removeEventListener('click', clickHandler);
        console.log('🗑️ Old click handler removed');
    }

    // Create new click handler
    clickHandler = function(e) {
        const button = e.target.closest('button');
        if (button && (
            button.getAttribute('data-testid')?.includes('send-button') ||
            button.id?.includes('send-button')
        )) {
            console.log('🖱️ Send button clicked');
            handleMessageSent();
        }
    };

    // Add new click handler
    document.addEventListener('click', clickHandler);
    console.log('🖱️ New click handler attached');

    function detectInput(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            console.log('⌨️ Enter key pressed');
            handleMessageSent();
        }
    }

    function handleMessageSent() {
        console.log('📨 Message sent detected!');
        setTimeout(() => {
            totalTokens += 10;
            
            console.log('------------------------');
            console.log('✨ NEW MESSAGE PROCESSED ✨');
            console.log(`🔢 New total tokens: ${totalTokens}`);
            console.log('------------------------');
            
            console.log('💾 Updating storage...');
            chrome.storage.local.set({ 
                tokenCount: totalTokens,
                energyStats: {
                    tokens: totalTokens,
                    currentPrompt: totalTokens * 0.0002,
                    dailyTotal: totalTokens * 0.0004,
                    weeklyAverage: totalTokens * 0.00004,
                    carbonFootprint: totalTokens * 0.0001
                }
            }, () => {
                console.log("✅ Storage updated successfully:", totalTokens);
                console.log("📊 Energy stats updated");
            });
        }, 100);
    }
}

// Initialize everything
function initialize() {
    console.log('🎬 Starting initialization...');
    chrome.storage.local.get('tokenCount', (data) => {
        totalTokens = data.tokenCount || 0;
        console.log('📥 Loaded initial token count:', totalTokens);
        console.log('🔄 Starting input tracking...');
        trackUserInput();
    });
}

// Try to initialize when DOM is ready
if (document.readyState === 'loading') {
    console.log('⏳ Waiting for DOM...');
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    console.log('🏃 DOM ready, initializing now...');
    initialize();
}

// Also try again after a delay to catch dynamic updates
console.log('⏰ Setting up delayed initialization...');
setTimeout(() => {
    console.log('🔄 Running delayed initialization...');
    initialize();
}, 2000);