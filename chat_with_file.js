// AI Chat Functionality with File Upload and Deepseek API
(function() {
    console.log('Chat with file upload script loading...');

    // Global variables
    let csvData = [];
    let documents = [];
    let df = {};
    let idf = {};
    let deepseekApiKey = 'sk-98b0f1e99d4b48c2bf977e1cee18adf9';

    // Initialize chat when DOM is ready
    function initChat() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendButton');
        const chatMessages = document.getElementById('chatMessages');
        const typingIndicator = document.getElementById('typingIndicator');
        const aiChatContainer = document.querySelector('.ai-chat-container');
        const fileInput = document.getElementById('fileInput');
        const fileLabel = document.querySelector('.file-upload-label');

        console.log('Chat elements found:', {
            chatInput: !!chatInput,
            sendButton: !!sendButton,
            chatMessages: !!chatMessages,
            typingIndicator: !!typingIndicator,
            aiChatContainer: !!aiChatContainer,
            fileInput: !!fileInput,
            fileLabel: !!fileLabel
        });

        if (!chatInput || !sendButton || !chatMessages) {
            console.error('Chat elements not found');
            return;
        }

        // Show chat container immediately
        if (aiChatContainer) {
            aiChatContainer.style.opacity = '1';
            aiChatContainer.style.transform = 'translateY(0');
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

        // Tokenize function for TF-IDF
        function tokenize(text) {
            return text.toLowerCase().match(/\b[\w\u4e00-\u9fff]+\b/g) || [];
        }

        // Build TF-IDF index
        function buildIndex(rows) {
            documents = [];
            df = {};

            for (let i = 0; i < rows.length; i++) {
                const text = JSON.stringify(rows[i]);
                const tokens = tokenize(text);
                documents.push({ text, tokens });

                const unique = new Set(tokens);
                for (const token of unique) {
                    if (!df[token]) df[token] = 0;
                    df[token]++;
                }
            }

            const N = documents.length;
            idf = {};
            for (const token in df) {
                idf[token] = Math.log(N / (df[token] + 1));
            }
        }

        // Calculate TF-IDF score
        function tfidfScore(queryTokens, docTokens) {
            const tf = {};
            for (const t of docTokens) {
                tf[t] = (tf[t] || 0) + 1;
            }
            const score = queryTokens.reduce((acc, t) => {
                if (idf[t]) acc += (tf[t] || 0) * idf[t];
                return acc;
            }, 0);
            return score;
        }

        // Handle file upload
        if (fileInput) {
            fileInput.addEventListener('change', async function(e) {
                const file = e.target.files[0];
                if (!file) return;

                if (!file.name.toLowerCase().endsWith('.csv')) {
                    addMessage('Please upload a CSV file.', false);
                    return;
                }

                try {
                    // Show loading message
                    addMessage(`Processing file: ${file.name}...`, false);

                    // Read and parse CSV
                    const text = await file.text();

                    // Parse CSV using simple method
                    const lines = text.split('\n').filter(line => line.trim());
                    const headers = lines[0].split(',').map(h => h.trim());
                    const rows = [];

                    for (let i = 1; i < lines.length; i++) {
                        const values = lines[i].split(',').map(v => v.trim());
                        const row = {};
                        headers.forEach((header, index) => {
                            row[header] = values[index] || '';
                        });
                        rows.push(row);
                    }

                    csvData = rows;
                    buildIndex(rows);

                    // Show success message with file info
                    addMessage(`✅ CSV file loaded successfully!<br>
📊 **File:** ${file.name}<br>
📈 **Records:** ${rows.length} rows<br>
📋 **Columns:** ${headers.join(', ')}<br><br>
You can now ask questions about this data. For example:<br>
• "What is the average salary?"<br>
• "Who is the oldest person?"<br>
• "Show me all engineers"`, false);

                    // Update file label
                    if (fileLabel) {
                        fileLabel.textContent = `📄 ${file.name}`;
                        fileLabel.style.color = 'var(--success)';
                    }

                } catch (error) {
                    console.error('Error parsing CSV:', error);
                    addMessage('❌ Error parsing CSV file. Please check the file format.', false);
                }
            });
        }

        // Function to send message to AI
        async function sendMessageToAI(message) {
            console.log('Sending to AI:', message);

            try {
                showTypingIndicator();

                let context = '';

                // If CSV data is loaded, use TF-IDF to find relevant context
                if (documents.length > 0) {
                    const qTokens = tokenize(message);

                    const ranked = documents
                        .map(doc => ({
                            ...doc,
                            score: tfidfScore(qTokens, doc.tokens)
                        }))
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3);

                    context = ranked.map(r => r.text).join('\n');
                }

                // Prepare messages for Deepseek API
                const apiMessages = [
                    { role: "system", content: "You are a helpful AI assistant. If CSV data is provided, use it to answer questions accurately." }
                ];

                if (context) {
                    apiMessages.push({
                        role: "user",
                        content: `Here is the relevant CSV data context:\n${context}\n\nBased on this data, please answer the following question: ${message}`
                    });
                } else {
                    apiMessages.push({
                        role: "user",
                        content: message
                    });
                }

                const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${deepseekApiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "deepseek-chat",
                        messages: apiMessages,
                        temperature: 0.7,
                        max_tokens: 2000
                    })
                });

                console.log('API response status:', response.status);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('API response data:', data);
                hideTypingIndicator();

                // Add AI response to chat
                if (data.choices && data.choices[0] && data.choices[0].message) {
                    addMessage(data.choices[0].message.content, false);
                } else {
                    addMessage('Sorry, I received an invalid response from the AI.', false);
                }

            } catch (error) {
                console.error('Error:', error);
                hideTypingIndicator();
                addMessage(`❌ Error: ${error.message}. Please check your API key and try again.`, false);
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