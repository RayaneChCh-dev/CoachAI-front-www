import { useState, useEffect } from 'react';
import { Message } from '../types';
import { endpoints } from '../config/api';

export function useChatMessages(coachId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Initial greeting message from the coach
    setMessages([
      {
        id: '1',
        content: 'Hello! How can I help you today?',
        sender: 'coach',
        timestamp: new Date().toISOString(),
      },
    ]);
  }, [coachId]);

  const sendMessage = async (content: string) => {
    const authToken = localStorage.getItem('authToken');
    console.log('Sending message:', authToken);
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(endpoints.chat.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          coachId,
          message: content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch coach response');
      }

      const data = await response.json();
      const coachMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.ai_response,
        sender: 'coach',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, coachMessage]);
    } catch (error) {
      console.error('Error fetching coach response:', error);
    }
  };

  return { messages, sendMessage };
}
