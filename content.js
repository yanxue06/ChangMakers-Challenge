console.log('Token Tracker: Script loaded');

let totalTokens = 0;

function getActiveInputBox() {
    return document.querySelector('textarea[placeholder="Ask anything"]');
}

function getSendButton() {
    // Look for any button that contains 'send-button' in its data-testid
    const allButtons = Array.from(document.querySelectorAll('button'));
    return allButtons.find(button => 
        button.getAttribute('data-testid')?.includes('send-button') ||
        button.id?.includes('send-button')
    );
}

function trackUserInput() {
    console.log('Attempting to track input...');
    let chatInput = getActiveInputBox();
   
    if (!chatInput) {
        console.error("❌ ChatGPT elements not found!");
        return;
    }

    console.log("✅ ChatGPT Token Tracker: Elements found");

    // Handle Enter key
    chatInput.removeEventListener("keydown", detectInput);
    chatInput.addEventListener("keydown", detectInput);

    // Handle all forms of message sending
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button');
        if (button && (
            button.getAttribute('data-testid')?.includes('send-button') ||
            button.id?.includes('send-button')
        )) {
            handleMessageSent();
        }
    });

    function detectInput(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            handleMessageSent();
        }
    }

    function handleMessageSent() {
        console.log('Message sent detected!');
        setTimeout(() => {
            let userMessage = chatInput.value.trim();
            totalTokens += 3;
            
            console.log(`📝 Message detected: "${userMessage}"`);
            console.log(`🔢 New total tokens: ${totalTokens}`);
            chrome.storage.local.set({ tokenCount: totalTokens }, () => {
                console.log("Storage updated:", totalTokens);
            });
            
        }, 100);
    }
}

// Initialize everything
function initialize() {
    console.log('Starting initialization...');
    chrome.storage.local.get('tokenCount', (data) => {
        totalTokens = data.tokenCount || 0;
        console.log('Initial token count:', totalTokens);
        trackUserInput();
    });
}

// Try to initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Also try again after a delay to catch dynamic updates
setTimeout(initialize, 2000);