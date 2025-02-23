console.log('🟢 Token Tracker: Initial script load');

let totalTokens = 0;

// Wrap everything in a try-catch to handle context invalidation
try {
    function getActiveInputBox() {
        return document.querySelector('textarea[placeholder="Message ChatGPT..."]') ||
               document.querySelector('textarea#prompt-textarea');
    }

    function handleMessageSent() {
        try {
            console.log('📨 Message sent detected!');
            totalTokens += 10;
            
            console.log('------------------------');
            console.log('✨ NEW MESSAGE PROCESSED ✨');
            console.log(`🔢 New total tokens: ${totalTokens}`);
            console.log('------------------------');
            
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
                console.log("✅ Storage updated:", totalTokens);
                // Re-initialize after storage update
                setTimeout(initialize, 100);
            });
        } catch (error) {
            console.error('Error in handleMessageSent:', error);
            // Try to recover
            initialize();
        }
    }

    function setupListeners() {
        try {
            console.log('👀 Setting up listeners...');
            
            // Handle button clicks
            document.addEventListener('click', (e) => {
                try {
                    const button = e.target.closest('button');
                    if (button && (
                        button.getAttribute('data-testid')?.includes('send') ||
                        button.getAttribute('aria-label')?.includes('send')
                    )) {
                        handleMessageSent();
                    }
                } catch (error) {
                    console.error('Error in click handler:', error);
                }
            });

            // Handle Enter key
            document.addEventListener('keydown', (e) => {
                try {
                    if (e.key === 'Enter' && !e.shiftKey && getActiveInputBox()) {
                        handleMessageSent();
                    }
                } catch (error) {
                    console.error('Error in keydown handler:', error);
                }
            });

            console.log('✅ Listeners set up');
        } catch (error) {
            console.error('Error in setupListeners:', error);
        }
    }

    function initialize() {
        try {
            console.log('🎬 Starting initialization...');
            chrome.storage.local.get('tokenCount', (data) => {
                totalTokens = data.tokenCount || 0;
                console.log('📥 Initial token count:', totalTokens);
                setupListeners();
            });
        } catch (error) {
            console.error('Error in initialize:', error);
            // Try again after a delay
            setTimeout(initialize, 1000);
        }
    }

    // Initialize on load
    initialize();

    // Re-initialize on visibility changes
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('🔄 Page visible, reinitializing...');
            initialize();
        }
    });

    // Periodic check
    setInterval(() => {
        try {
            const input = getActiveInputBox();
            if (input) {
                setupListeners();
            }
        } catch (error) {
            console.error('Error in periodic check:', error);
        }
    }, 2000);

} catch (error) {
    console.error('Fatal error in content script:', error);
}