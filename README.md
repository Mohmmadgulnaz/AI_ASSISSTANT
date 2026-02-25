 # 🧪 AI-Powered Support Assistant

## 📌 Project Description

This project is a full-stack AI-Powered Support Assistant built using React.js, Node.js, SQLite and OpenAI LLM.

Users can interact with an AI chatbot through a React-based UI.  
The chatbot answers user queries strictly based on the provided product documentation (`docs.json`).

It maintains session-wise conversation context and stores all messages in a SQLite database.

## 🧠 Tech Stack Used

| Layer      | Technology       |
|------------|------------------|
| Frontend   | React.js (Vite)  |
| Backend    | Node.js (Express)|
| Database   | SQLite           |
| LLM        | OpenAI GPT-4o-mini |

---

## 📂 Project Structure
│
├── backend
│ ├── routes
│ │ └── chat.js
│ ├── db.js
│ ├── docs.json
│ ├── index.js
│ └── .env
│
├── frontend
│ ├── src
│ │ ├── App.jsx
│ │ ├── Chat.jsx
│ │ └── main.jsx
│ └── vite.config.js
│
├── outputs
│ └── screenshots
│
└── README.md


---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

1. Navigate to backend folder:
cd backend

2. Install dependencies:npm install

3. Create a `.env` file inside backend:OPENAI_KEY=your_openai_api_key_here

4. Run backend server:node index.js

---

### 🔹 Frontend Setup

1. Navigate to frontend folder:cd frontend

2. Install dependencies:npm install

3. Run frontend:npm run dev

4. Open browser:http://localhost:5173

---

## 🔗 API Endpoints

### ✅ POST `/api/chat`

Handles user chat requests and generates AI responses based on documentation.

#### Request Body:
```json
{
"sessionId": "abc123",
"message": "How can I reset my password?"
}
Response:{
  "reply": "Users can reset password from Settings > Security.",
  "tokensUsed": 123
}

✅ GET /api/conversations/:sessionId

Fetches all messages (user + assistant) for a session in chronological order.

✅ GET /api/sessions

Returns all active session IDs with last updated timestamp.

🗄️ SQLite Database Schema
📌 sessions Table
Column	Type
id	TEXT
created_at	DATETIME
updated_at	DATETIME
