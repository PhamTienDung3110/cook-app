import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o', // Sử dụng mô hình GPT-4
                    messages: [{ role: 'user', content: prompt }], // Sử dụng định dạng tin nhắn cho mô hình trò chuyện
                    max_tokens: 150,
                    n: 1,
                    stop: null,
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer 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`,
                    },
                }
            );
            setResponse(res.data.choices[0].text.trim());
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here"
                />
                <button type="submit">Generate</button>
            </form>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default ChatGPTComponent;
