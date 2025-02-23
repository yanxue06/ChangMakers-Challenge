console.log('🟢 Token Tracker: Initial script load');

let totalTokens = 0;
let isInitialized = false;

function getActiveInputBox() {
    const selectors = [
        'textarea[placeholder="Ask anything"]',
        'textarea[placeholder="Message ChatGPT..."]',
        'textarea#prompt-textarea'
    ];
    
    for (let selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
            console.log('✅ Found input with selector:', selector);
            return element;
        }
    }
    console.log('❌ No input box found');
    return null;
}

function getSendButton() {
    // Try multiple possible selectors for the send button
    const buttonSelectors = [
        'button[data-testid*="send"]',
        'button[class*="send"]',
        'button[aria-label*="Send"]',
        'button[aria-label*="send"]',
        'button.send-button',
        'button[type="submit"]'
    ];

    for (let selector of buttonSelectors) {
        const button = document.querySelector(selector);
        if (button) {
            console.log(`✅ Found send button with selector: ${selector}`);
            return button;
        }
    }

    console.error('❌ No send button found. Available buttons:', 
        Array.from(document.querySelectorAll('button')).map(btn => ({
            text: btn.textContent,
            testid: btn.getAttribute('data-testid'),
            class: btn.className,
            ariaLabel: btn.getAttribute('aria-label')
        }))
    );
    return null;
}

function trackUserInput() {
    console.log('👀 Attempting to track input...');
    let chatInput = getActiveInputBox();
   
    if (!chatInput) {
        console.error("❌ ChatGPT elements not found!");
        if (!isInitialized) {
            console.log('🔄 Retrying in 1s...');
            setTimeout(trackUserInput, 1000);
        }
        return;
    }

    console.log("✅ ChatGPT Token Tracker: Elements found");
    isInitialized = true;

    function detectInput(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            console.log('⌨️ Enter key detected!');
            handleMessageSent();
        }
    }

    function handleButtonClick(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        if (button.getAttribute('data-testid')?.includes('send') ||
            button.getAttribute('aria-label')?.toLowerCase()?.includes('send')) {
            console.log('🎯 Send button detected!');
            handleMessageSent();
        }
    }

    // Remove old listeners if they exist
    chatInput.removeEventListener("keydown", detectInput);
    document.removeEventListener('click', handleButtonClick);

    // Add new listeners
    chatInput.addEventListener("keydown", detectInput);
    document.addEventListener('click', handleButtonClick);
    
    console.log('✅ All listeners attached successfully');
}

function handleMessageSent() {
    console.log('📨 Message sent detected!');
    let chatInput = getActiveInputBox();
    
    if (!chatInput) {
        console.error('❌ Lost reference to input box!');
        return;
    }
    
    // // Get message content before it's cleared
    // let userMessage = chatInput.value.trim();
    
    // Update stats
    totalTokens += 10;
    
    console.log('------------------------');
    console.log('✨ NEW MESSAGE PROCESSED ✨');
    console.log(`🔢 Tokens: ${totalTokens}`);
    console.log('------------------------');
    
    // Calculate and update stats
    const energyPerToken = 0.0002;
    const currentEnergy = totalTokens * energyPerToken;
    const dailyTotal = currentEnergy * 2;
    const weeklyAverage = currentEnergy / 5;
    const carbonFootprint = currentEnergy * 0.5;

    chrome.storage.local.set({ 
        tokenCount: totalTokens,
        energyStats: {
            tokens: totalTokens,
            currentPrompt: currentEnergy,
            dailyTotal: dailyTotal,
            weeklyAverage: weeklyAverage,
            carbonFootprint: carbonFootprint
        }
    }, () => {
        console.log("✅ Storage updated successfully:", totalTokens);
        console.log("📊 Energy stats updated");
        
        // Important: Re-initialize tracking immediately
        console.log('🔄 Re-initializing input tracking...');
        trackUserInput();
    });
}

// Initialize when script loads
function initialize() {
    console.log('🟡 Token Tracker: Starting initialization...');
    chrome.storage.local.get('tokenCount', (data) => {
        totalTokens = data.tokenCount || 0;
        console.log('🔵 Token Tracker: Got initial count:', totalTokens);
        trackUserInput();
    });
}

// Initialize immediately and after a delay
initialize();
setTimeout(initialize, 2000);

// Also initialize on navigation changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('🔄 Page became visible, reinitializing...');
        initialize();
    }
});