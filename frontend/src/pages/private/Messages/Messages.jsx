import React, { useState } from 'react';
import './Messages.css';
import Picker from 'emoji-picker-react';

// Avatars
const avatars = {
  Lawyer3: 'https://cdn-icons-png.flaticon.com/512/1995/1995550.png',
  Lawyer2: 'https://cdn-icons-png.flaticon.com/512/1995/1995520.png',
  Lawyer1: 'https://cdn-icons-png.flaticon.com/512/2922/2922506.png',
  You: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
};

// Icons
const icons = {
  doc: 'https://cdn-icons-png.flaticon.com/512/337/337946.png',
  img: 'https://cdn-icons-png.flaticon.com/512/685/685655.png',
  mic: 'https://cdn-icons-png.flaticon.com/512/727/727245.png',
  video: 'https://cdn-icons-png.flaticon.com/512/327/327779.png',
  emoji: 'https://cdn-icons-png.flaticon.com/512/742/742751.png',
};

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Lawyer3', text: 'Hi! Can you tell me about the design requirement document?', time: '15 Aug' },
    { id: 2, sender: 'You', text: 'Sure, check the attached file.', time: '15 Aug', attachment: 'design.docx' },
    { id: 3, sender: 'Lawyer3', text: 'Looks good! Any updates?', time: 'Today' },
    { id: 4, sender: 'You', text: 'Yes, I’ve updated the design.', time: 'Today' },
    { id: 5, sender: 'Lawyer3', text: 'Can you share the latest version?', time: 'Today' },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const chatUsers = ['Lawyer3', 'Lawyer2', 'Lawyer1'];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, sender: 'You', text: inputMessage, time: 'Now' },
    ]);
    setInputMessage('');
  };

  const handleEmojiClick = (event, emojiObject) => {
    setInputMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="message-container">
      {/* Chat List */}
      <div className="chat-list">
        {chatUsers.map(user => (
          <div key={user} className={`chat-item ${messages.some(m => m.sender === user) ? 'active' : ''}`}>
            <img src={avatars[user]} alt={user} className="chat-avatar" />
            <div className="chat-info">
              <span className="chat-name">{user}</span>
              <span className="chat-last-msg">
                {messages.find(m => m.sender === user)?.text.slice(0, 20) + '...'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {/* Header */}
        <div className="chat-header">
          <img src={avatars['Lawyer3']} alt="Lawyer" className="header-avatar" />
          <div className="header-info">
            <span className="header-name">Lawyer</span>
            <span className="header-status">Last seen: Today 2:30 PM</span>
          </div>
          <div className="header-actions">
            <img src={icons.video} alt="Video Call" title="Video Call" />
            <img src={icons.mic} alt="Voice Call" title="Voice Call" />
          </div>
        </div>

        {/* Messages */}
        <div className="message-list">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
              <img src={avatars[msg.sender] || avatars['You']} alt={msg.sender} className="message-avatar" />
              <div className="message-content">
                <span className="sender">{msg.sender}</span>
                <p className="text">{msg.text}</p>
                {msg.attachment && (
                  <div className="attachment">
                    <img src={icons.doc} alt="Attachment" />
                    <span>{msg.attachment}</span>
                  </div>
                )}
                <span className="time">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form className="message-input" onSubmit={handleSend}>
          <div className="input-icons">
            <img src={icons.img} alt="Image" title="Send Image" />
            <img src={icons.doc} alt="Document" title="Send Document" />
            <img
              src={icons.emoji}
              alt="Emoji"
              title="Emoji"
              onClick={() => setShowEmojiPicker(prev => !prev)}
            />
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        {showEmojiPicker && (
          <div className="emoji-picker">
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
