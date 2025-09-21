// AI Chat Functionality with Enhanced CSV parsing
(function() {
    console.log('Enhanced chat script loading...');

    // Global variables
    let csvData = [];
    let documents = [];
    let df = {};
    let idf = {};
    let deepseekApiKey = 'sk-98b0f1e99d4b48c2bf977e1cee18adf9';

    // Initialize chat when DOM is ready
    function initChat() {
        console.log('Initializing enhanced chat...');

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
            aiChatContainer.style.transform = 'translateY(0)';
            aiChatContainer.style.display = 'flex';
        }

        // Function to add message to chat
        function addMessage(content, isUser = false) {
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

        // Tokenize function (same as reference.html)
        function tokenize(text) {
            return text.toLowerCase().match(/\b[\w\u4e00-\u9fff]+\b/g) || [];
        }

        // Build TF-IDF index (same as reference.html)
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
            for (const token in df) {
                idf[token] = Math.log(N / (df[token] + 1));
            }
        }

        // Calculate TF-IDF score (same as reference.html)
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

        // Simple CSV parser (mimicking reference.html logic)
        function parseCSVSimple(text) {
            const lines = text.split('\n');
            const result = [];

            // Get headers
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;

                const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
                const row = {};

                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });

                result.push(row);
            }

            return result;
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
                    addMessage(`📁 Processing file: ${file.name}...`, false);

                    // Read file
                    const text = await file.text();
                    console.log('File content length:', text.length);

                    // Try using PapaParse if available, otherwise use simple parser
                    let rows;

                    if (window.Papa) {
                        console.log('Using PapaParse');
                        const parsed = Papa.parse(text, { header: true });
                        rows = parsed.data.filter(r => Object.keys(r).length > 0 && Object.values(r).some(v => v.trim()));
                    } else {
                        console.log('Using simple CSV parser');
                        rows = parseCSVSimple(text);
                    }

                    console.log('Parsed rows:', rows.length);
                    console.log('First row:', rows[0]);

                    if (rows.length === 0) {
                        addMessage('❌ No data found in the CSV file.', false);
                        return;
                    }

                    csvData = rows;
                    buildIndex(rows);

                    // Show detailed success message
                    const headers = Object.keys(rows[0]);
                    const sampleData = rows.slice(0, 3).map(row =>
                        Object.entries(row)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(' | ')
                    ).join('<br>');

                    addMessage(`✅ CSV file loaded successfully!<br><br>
📊 **File Details:**<br>
• Name: ${file.name}<br>
• Records: ${rows.length} rows<br>
• Columns: ${headers.length}<br>
• Headers: ${headers.join(', ')}<br><br>
📋 **Sample Data:**<br>
${sampleData}<br><br>
💡 **You can now ask questions like:**<br>
• What is the average salary?<br>
• Who works in Engineering?<br>
• Show me employees over 30<br>
• Who has the most experience?`, false);

                    // Update file label with animation
                    if (fileLabel) {
                        fileLabel.textContent = `📄 ${file.name}`;
                        fileLabel.classList.add('success');
                        setTimeout(() => fileLabel.classList.remove('success'), 600);
                    }

                } catch (error) {
                    console.error('Error parsing CSV:', error);
                    addMessage(`❌ Error parsing CSV: ${error.message}<br><br>Please ensure your file is a valid CSV with headers.`, false);
                }
            });
        }

        // Function to send message to AI
        async function sendMessageToAI(message) {
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
                    { role: "system", content: "You are a helpful AI assistant that analyzes CSV data. When data is provided, be specific and reference actual values from the data." }
                ];

                if (context) {
                    apiMessages.push({
                        role: "user",
                        content: `Based on the following CSV data context, please answer the question:\n\nContext:\n${context}\n\nQuestion: ${message}\n\nPlease provide a specific answer based on the data.`
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
                        temperature: 0.3,
                        max_tokens: 2000
                    })
                });

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();
                hideTypingIndicator();

                if (data.choices && data.choices[0] && data.choices[0].message) {
                    addMessage(data.choices[0].message.content, false);
                } else {
                    addMessage('Sorry, I received an invalid response.', false);
                }

            } catch (error) {
                console.error('Error:', error);
                hideTypingIndicator();
                addMessage(`❌ Error: ${error.message}`, false);
            }
        }

        // Function to handle sending message
        function handleSendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatInput.value = '';
                sendButton.disabled = true;
                sendMessageToAI(message);
            }
        }

        // Event listeners
        if (sendButton) {
            sendButton.addEventListener('click', (e) => {
                e.preventDefault();
                handleSendMessage();
            });
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                }
            });

            chatInput.addEventListener('input', () => {
                sendButton.disabled = !chatInput.value.trim();
            });

            sendButton.disabled = true;
        }

        console.log('Enhanced chat initialized');
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }
})();