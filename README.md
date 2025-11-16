# Simplified Chat Application

A responsive, single-page chat application with a React frontend and Node.js/Express backend that simulates a conversational interface similar to ChatGPT.

## Features

- **Two-pane interface**: Collapsible sidebar with main chat view
- **Session management**: Each conversation has a unique ID in the URL
- **Session history**: View past conversations from the sidebar
- **Structured data responses**: Displays tabular data in a clean table format
- **Light/Dark theme toggle**: Complete theme switching
- **Response feedback**: Like/dislike functionality for each response
- **Responsive design**: Works on mobile, tablet, and desktop

## Tech Stack

### Frontend
- React (JavaScript)
- React Router DOM (routing)
- TailwindCSS (styling)
- Lucide React (icons)
- Vite (build tool)

### Backend
- Node.js
- Express
- CORS

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)

### Installation & Running

#### 1. Install Frontend Dependencies
```bash
npm install
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 3. Start Both Servers

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend Development Server:**
```bash
npm run dev
```
Frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Building for Production

To build the frontend for production:
```bash
npm run build
```

## Project Structure

```
.
├── backend/
│   ├── server.js           # Express server with API endpoints
│   ├── mockData.js         # Mock JSON data
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Left panel with sessions
│   │   ├── ChatWindow.jsx      # Main chat interface
│   │   ├── TableResponse.jsx   # Structured data table
│   │   └── ThemeToggle.jsx     # Theme switcher
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
└── package.json
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sessions` | GET | Returns list of all sessions |
| `/api/new-chat` | GET | Creates and returns new session ID |
| `/api/session/:id` | GET | Returns conversation history for a session |
| `/api/chat/:id` | POST | Accepts question, returns structured response |

## Usage

1. **Start a new chat**: Click "New Chat" button in the sidebar
2. **Ask a question**: Type your message and press Enter or click Send
3. **View structured data**: Responses include tables with relevant data
4. **Give feedback**: Click thumbs up or down on any response
5. **Switch themes**: Click the sun/moon icon in the top right
6. **View past sessions**: Click any session in the sidebar to load its history
7. **Toggle sidebar**: On mobile, use the menu button to show/hide sidebar

## Features Breakdown

### Session Management
- Each new chat generates a unique session ID
- Session ID is visible in the URL (`/chat/session-xxx`)
- All messages in a session are preserved
- Session titles auto-update based on the first question

### Theme Toggle
- Switches between light and dark modes
- Preference saved to localStorage
- Affects entire application (background, text, borders, etc.)

### Responsive Design
- Desktop: Sidebar always visible
- Tablet/Mobile: Collapsible sidebar with hamburger menu
- Optimized layouts for all screen sizes

### Structured Data Display
- API responses include tabular data
- Clean, sortable table layout
- Responsive table with horizontal scroll on mobile

## Mock Data

The backend serves static JSON data simulating:
- Product analysis
- Sales data
- Customer feedback
- Performance metrics
- Inventory levels
- Traffic analytics

No database required - all data is in-memory.
