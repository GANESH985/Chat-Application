import express from 'express';
import cors from 'cors';
import {
  sessions,
  conversationHistory,
  generateNewSessionId,
  getRandomMockResponse
} from './mockData.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/sessions', (req, res) => {
  res.json({ sessions });
});

app.get('/api/new-chat', (req, res) => {
  const newSessionId = generateNewSessionId();
  const newSession = {
    id: newSessionId,
    title: 'New Chat',
    timestamp: new Date().toISOString()
  };
  sessions.unshift(newSession);
  conversationHistory[newSessionId] = [];

  res.json({ sessionId: newSessionId });
});

app.get('/api/session/:id', (req, res) => {
  const { id } = req.params;
  const history = conversationHistory[id] || [];
  res.json({ sessionId: id, history });
});

app.post('/api/chat/:id', (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  if (!conversationHistory[id]) {
    conversationHistory[id] = [];
  }

  const userMessage = {
    id: `msg-${Date.now()}-user`,
    role: 'user',
    content: question,
    timestamp: new Date().toISOString()
  };

  conversationHistory[id].push(userMessage);

  const mockResponse = getRandomMockResponse();
  const assistantMessage = {
    id: `msg-${Date.now()}-assistant`,
    role: 'assistant',
    content: mockResponse.description,
    tableData: mockResponse.tableData,
    timestamp: new Date().toISOString()
  };

  conversationHistory[id].push(assistantMessage);

  const sessionIndex = sessions.findIndex(s => s.id === id);
  if (sessionIndex !== -1 && sessions[sessionIndex].title === 'New Chat') {
    sessions[sessionIndex].title = question.substring(0, 50) + (question.length > 50 ? '...' : '');
  }

  res.json({ message: assistantMessage });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
