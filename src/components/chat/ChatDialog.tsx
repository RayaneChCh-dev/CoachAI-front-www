import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { Coach } from '../../types';
import { ChatMessage } from './ChatMessage';
import { useChatMessages } from '../../hooks/useChatMessages';

interface ChatDialogProps {
  coach: Coach;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDialog({ coach, isOpen, onClose }: ChatDialogProps) {
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useChatMessages(coach.id);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={coach.image_url}
              alt={coach.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="text-gray-200 font-semibold">{coach.name}</h3>
              <p className="text-gray-400 text-sm">{coach.profession}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}