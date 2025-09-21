// AI Chat Functionality with Mock Responses
(function() {
    console.log('Chat script loading...');

    // Initialize chat when DOM is ready
    function initChat() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendButton');
        const chatMessages = document.getElementById('chatMessages');
        const typingIndicator = document.getElementById('typingIndicator');
        const aiChatContainer = document.querySelector('.ai-chat-container');

        console.log('Chat elements found:', {
            chatInput: !!chatInput,
            sendButton: !!sendButton,
            chatMessages: !!chatMessages,
            typingIndicator: !!typingIndicator,
            aiChatContainer: !!aiChatContainer
        });

        if (!chatInput || !sendButton || !chatMessages) {
            console.error('Chat elements not found');
            return;
        }

        // Show chat container immediately
        if (aiChatContainer) {
            aiChatContainer.style.opacity = '1';
            aiChatContainer.style.transform = 'translateY(0)';
            aiChatContainer.style.display = 'flex';
            console.log('Chat container shown');
        }

        // Function to add message to chat
        function addMessage(content, isUser = false) {
            console.log('Adding message:', content, isUser);
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;

            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.innerHTML = content;

            messageDiv.appendChild(messageContent);
            chatMessages.appendChild(messageDiv);

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Function to show typing indicator
        function showTypingIndicator() {
            if (typingIndicator) {
                typingIndicator.style.display = 'flex';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }

        // Function to hide typing indicator
        function hideTypingIndicator() {
            if (typingIndicator) {
                typingIndicator.style.display = 'none';
            }
        }

        // Mock AI responses for demonstration
        const mockResponses = [
            "I understand your question about aerospace engines. Based on my analysis, engine health monitoring is crucial for aviation safety.",
            "Regarding RUL prediction, I can tell you that it involves analyzing sensor data to forecast when an engine might need maintenance.",
            "Anomaly detection in aviation engines typically involves monitoring parameters like temperature, vibration, and pressure readings.",
            "That's an interesting question! Engine monitoring systems use advanced machine learning algorithms to detect potential issues before they become critical.",
            "I'd be happy to help with that! Aerospace engine maintenance has evolved significantly with the introduction of predictive analytics.",
            "Great question! The key to effective engine health management is continuous monitoring and early detection of deviations from normal operation."
        ];

        // Function to send message to AI (with mock response)
        async function sendMessageToAI(message) {
            console.log('Sending to AI:', message);

            try {
                showTypingIndicator();

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

                hideTypingIndicator();

                // Get a random mock response
                const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
                addMessage(response, false);

            } catch (error) {
                console.error('Error:', error);
                hideTypingIndicator();
                addMessage('Sorry, I\'m having trouble connecting right now. Please try again later.', false);
            }
        }

        // Function to handle sending message
        function handleSendMessage() {
            console.log('handleSendMessage called');
            const message = chatInput.value.trim();
            console.log('Message to send:', message);

            if (message) {
                // Add user message to chat
                addMessage(message, true);

                // Clear input
                chatInput.value = '';
                if (sendButton) {
                    sendButton.disabled = true;
                }

                // Send to AI
                sendMessageToAI(message);
            }
        }

        // Event listeners
        console.log('Adding event listeners...');

        if (sendButton) {
            console.log('Attaching click listener to send button');
            sendButton.addEventListener('click', function(e) {
                console.log('Send button clicked!');
                e.preventDefault();
                handleSendMessage();
            });
        }

        if (chatInput) {
            console.log('Attaching listeners to chat input');
            chatInput.addEventListener('keypress', function(e) {
                console.log('Key pressed:', e.key);
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                }
            });

            // Enable/disable send button based on input
            chatInput.addEventListener('input', function() {
                console.log('Input event, value:', this.value);
                if (sendButton) {
                    sendButton.disabled = !this.value.trim();
                }
            });

            // Initial state
            if (sendButton) {
                sendButton.disabled = true;
            }
        }

        console.log('Chat initialized successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }
})();