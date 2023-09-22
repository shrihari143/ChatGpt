import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = { text: prompt, type: 'user' };
    setChatMessages([...chatMessages, userMessage]);

    axios
      .post('http://localhost:7000/chat', { prompt })
      .then((res) => {
        const botMessage = { text: res.data, type: 'bot' };
        setResponse(res.data);
        setChatMessages([...chatMessages, botMessage]);
      })
      .catch((err) => console.log(err));

    // Clear the input field after sending the message
    setPrompt('');
  };

  return (
    <div className="container">
      <div className="welcome">Welcome to MeetUniversity Machine Round 2</div>
      <div className="chat-window">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="prompt">Ask the question</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="abcde">
          <button type="submit">Submit Now</button>
        </div>
      </form>
    </div>
  );
}

export default App;
