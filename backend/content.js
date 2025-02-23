console.log('🟢 Token Tracker: Initial script load');

let totalTokens = 0;

function getActiveInputBox() {
    // Try multiple possible selectors
    const selectors = [
        'textarea[placeholder="Ask anything"]',
        'textarea[placeholder="Message ChatGPT..."]',
        'textarea#prompt-textarea',
        // Add more potential selectors
        'textarea[data-id="root"]'
    ];
    
    for (let selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`✅ Found input with selector: ${selector}`);
            return element;
        }
    }
    
    console.error('❌ No matching textarea found. Available textareas:', 
        Array.from(document.querySelectorAll('textarea')).map(el => ({
            placeholder: el.placeholder,
            id: el.id,
            class: el.className
        }))
    );
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
    console.log('Attempting to track input...');
    let chatInput = getActiveInputBox();
   
    if (!chatInput) {
        console.error("❌ ChatGPT elements not found!");
        return;
    }

    console.log("✅ ChatGPT Token Tracker: Elements found");

    // Handle Enter key with more debug info
    function detectInput(event) {
        console.log('🎮 Key pressed:', event.key);
        if (event.key === "Enter" && !event.shiftKey) {
            console.log('⌨️ Enter key detected!');
            event.preventDefault(); // Prevent default only on Enter
            handleMessageSent();
        }
    }

    // Remove old listener if exists and add new one
    chatInput.removeEventListener("keydown", detectInput);
    chatInput.addEventListener("keydown", detectInput);
    console.log('✅ Keydown listener attached');

    // Handle button click
    document.removeEventListener('click', handleButtonClick); // Remove old listener
    document.addEventListener('click', handleButtonClick);
    console.log('✅ Click listener attached');

    function handleButtonClick(e) {
        const button = e.target.closest('button');
        if (button) {
            console.log('👆 Button clicked:', {
                text: button.textContent,
                testid: button.getAttribute('data-testid'),
                class: button.className,
                ariaLabel: button.getAttribute('aria-label')
            });
            
            // Updated button detection
            if (button.getAttribute('data-testid')?.includes('send') ||
                button.className?.includes('send') ||
                button.getAttribute('aria-label')?.toLowerCase()?.includes('send message') ||
                button.textContent?.toLowerCase()?.includes('send')) {
                console.log('🎯 Send button detected!');
                handleMessageSent();
            }
        }
    }

    function handleMessageSent() {
        console.log('🎯 Message sent detected!');
        let chatInput = getActiveInputBox(); // Get fresh reference
        
        if (!chatInput) {
            console.error('❌ Lost reference to input box!');
            return;
        }
        
        setTimeout(() => {
            let userMessage = chatInput.value.trim();
            totalTokens += 10;
            
            console.log('------------------------');
            console.log('✨ NEW MESSAGE DETECTED ✨');
            console.log(`📝 Message: "${userMessage}"`);
            console.log(`🔢 Tokens: ${totalTokens}`);
            console.log('------------------------');
            
            // Calculate energy metrics
            const energyPerToken = 0.0002;
            const currentEnergy = totalTokens * energyPerToken;
            const dailyTotal = currentEnergy * 2;
            const weeklyAverage = currentEnergy / 5;
            const carbonFootprint = currentEnergy * 0.5;

            // Update storage and trigger React update
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
                // Show visual indicator
                const display = document.createElement('div');
                display.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #4CAF50;
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    z-index: 9999;
                    font-family: system-ui;
                    font-size: 14px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                `;
                display.textContent = `Tokens Updated: ${totalTokens}`;
                document.body.appendChild(display);
                setTimeout(() => display.remove(), 2000);
                
                // Re-initialize tracking after a delay to catch the new input box
                setTimeout(() => {
                    console.log('🔄 Re-initializing input tracking...');
                    trackUserInput();
                }, 1000);
            });
        }, 100);
    }
}

// Initialize everything
function initialize() {
    console.log('🟡 Token Tracker: Starting initialization...');
    chrome.storage.local.get('tokenCount', (data) => {
        totalTokens = data.tokenCount || 0;
        console.log('🔵 Token Tracker: Got initial count:', totalTokens);
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