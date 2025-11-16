import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import TableResponse from './TableResponse';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [likedMessages, setLikedMessages] = useState(new Set());
  const [dislikedMessages, setDislikedMessages] = useState(new Set());
  const { sessionId } = useParams();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      fetchSessionHistory();
    }
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSessionHistory = async () => {
    try {
      const response = await fetch(`https://chat-application-t4cg.onrender.com/api/session/${sessionId}`);
      const data = await response.json();
      setMessages(data.history);
    } catch (error) {
      console.error('Error fetching session history:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    const userMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`https://chat-application-t4cg.onrender.com/api/chat/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: input })
      });

      const data = await response.json();
      setMessages((prev) => [...prev, data.message]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (messageId) => {
    setLikedMessages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
        dislikedMessages.delete(messageId);
      }
      return newSet;
    });
    setDislikedMessages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(messageId);
      return newSet;
    });
  };

  const handleDislike = (messageId) => {
    setDislikedMessages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
        likedMessages.delete(messageId);
      }
      return newSet;
    });
    setLikedMessages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(messageId);
      return newSet;
    });
  };

  if (!sessionId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Chat
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Start a new conversation or select an existing session from the sidebar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-2xl px-4 py-3'
                    : 'w-full'
                }`}
              >
                {message.role === 'user' ? (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <p className="text-gray-900 dark:text-gray-100 mb-4 leading-relaxed">
                      {message.content}
                    </p>
                    {message.tableData && <TableResponse data={message.tableData} />}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleLike(message.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          likedMessages.has(message.id)
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}
                        aria-label="Like response"
                      >
                        <ThumbsUp size={16} />
                      </button>
                      <button
                        onClick={() => handleDislike(message.id)}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          dislikedMessages.has(message.id)
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}
                        aria-label="Dislike response"
                      >
                        <ThumbsDown size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl transition-colors duration-200 flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
