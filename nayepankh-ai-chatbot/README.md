# 🕊️ NayePankh Foundation — AI Chatbot

An AI-powered chatbot built for **NayePankh Foundation**, one of India's largest student-led NGOs. This project was built as part of the **AI Internship at Internship Studio**.

---

## 🌐 Live Demo

Open `index.html` in your browser after adding your API key (see setup below).

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 AI Chatbot | Powered by Anthropic Claude API (claude-sonnet-4-6) |
| 🧠 Memory | Tracks topics discussed and user interests across session |
| 🔄 Multi-step Workflow | Visualizes the full AI pipeline: Input → Memory → API → Response |
| 📋 NGO Knowledge Base | System prompt contains full NayePankh context |
| ⚡ Real-time Responses | Typing indicator and smooth message animations |
| 📱 Responsive Design | Works on mobile and desktop |

---

## 🏗️ Project Structure

```
nayepankh-ai-chatbot/
├── index.html          # Main HTML page (hero, layout, chat UI)
├── css/
│   └── style.css       # All styles (responsive, themed in NayePankh green)
├── js/
│   ├── chat.js         # Core chat engine + Anthropic API integration
│   └── memory.js       # Session memory module
└── README.md           # This file
```

---

## 🚀 Setup & Usage

### Step 1: Get an API Key
1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Create an API key

### Step 2: Add Your API Key
Open `js/chat.js` and replace:
```js
API_KEY: 'YOUR_ANTHROPIC_API_KEY_HERE',
```
with your actual key:
```js
API_KEY: 'sk-ant-xxxxxxxxxxxxxxxxxx',
```

> ⚠️ **Security Note:** Never expose your API key in a public GitHub repo. For production, use a backend server (Node.js, Python Flask, etc.) to proxy API calls.

### Step 3: Open in Browser
Simply open `index.html` in any modern browser — no build step needed.

---

## 💬 What Can You Ask?

- *"How can I volunteer with NayePankh?"*
- *"How do I donate and is it tax-exempt?"*
- *"What educational programs do you run?"*
- *"Tell me about the food distribution drive"*
- *"What is NayePankh doing for women's hygiene?"*
- *"How can I apply for an internship?"*

---

## 🏛️ About NayePankh Foundation

- UP Government registered NGO (Indian Society Act, 1860)
- Affiliated with NITI Aayog
- 80G & 12A registered — **donations are tax-exempt**
- Helped **2 lakh+ (200,000+)** underprivileged people
- Trained **30,000+ interns**
- Programs: food distribution, sanitary pads, free education, clothes donation
- 📧 contact@nayepankh.com | 📞 +91-8318500748 | 🌐 [nayepankh.com](https://nayepankh.com)

---

## 🤖 How the AI Works

```
User types message
       ↓
Memory module reads session context (topics, interests)
       ↓
Context appended to NayePankh system prompt
       ↓
Claude API call with full conversation history
       ↓
Memory updated with new topics/interests
       ↓
Response streamed back to user
```

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no frameworks)
- **AI:** Anthropic Claude API (`claude-sonnet-4-6`)
- **Fonts:** Google Fonts — Inter
- **Memory:** In-session JS state (no external database)

---

## 📄 License

Built for educational/internship purposes. NayePankh Foundation is a registered NGO — support their work at [nayepankh.com](https://nayepankh.com).
