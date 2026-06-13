/**
 * chat.js — Core Chat Engine
 * NayePankh Foundation AI Chatbot
 *
 * Handles:
 *  - Message sending and rendering
 *  - Anthropic Claude API calls
 *  - Conversation history management
 *  - Workflow step animation
 *  - Quick reply shortcuts
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const CONFIG = {
  API_URL: 'https://api.groq.com/openai/v1/chat/completions',
  MODEL: 'llama-3.3-70b-versatile',
  MAX_TOKENS: 1000,
  API_KEY: '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',
};

// ─── SYSTEM PROMPT ───────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the official AI assistant for NayePankh Foundation, one of India's largest student-led NGOs.

== ABOUT NAYEPANKH FOUNDATION ==
- Registered under Indian Society Act, 1860 (UP Government registered)
- Affiliated with NITI Aayog
- 80G and 12A registered NGO — donations are tax-exempt under Indian Income Tax Act
- Featured in The Pioneer, Dainik Jagran, Hindustan newspapers
- Has helped over 2 lakh (200,000) underprivileged people across India
- Has trained and supported over 30,000 interns from across the country
- Contact: contact@nayepankh.com | +91-8318500748 | nayepankh.com
- Based in Kanpur, Uttar Pradesh, India

== KEY PROGRAMS ==
1. Food Distribution — distributes free meals to underprivileged communities and stray animals
2. Sanitary Pad Campaign — provides free sanitary pads and creates women's hygiene awareness
3. Clothes Donation — distributes free clothes to those in need
4. Free Education — tutoring and educational support for underprivileged children
5. COVID Relief — founded during COVID-19 to provide essential support; later expanded

== VOLUNTEERING ==
- Anyone can volunteer by visiting nayepankh.com or contacting via email/phone
- Internship opportunities are available for students on platforms like Internshala
- Interns get a certificate and practical NGO experience

== DONATIONS ==
- Donations are tax-exempt under Section 80G of the Income Tax Act
- Donate at nayepankh.com or contact the team directly

== YOUR ROLE ==
- Be warm, friendly, and conversational
- Occasionally use Hindi words naturally (Namaste, Dhanyavaad, Ji, Bilkul)
- Keep responses concise — 3 to 5 sentences unless the topic requires more detail
- Always guide users toward action (volunteer, donate, contact)
- If you do not know something specific, say so honestly and suggest contacting nayepankh.com`;

// ─── STATE ───────────────────────────────────────────────────────────────────

let conversationHistory = [];
let isLoading = false;

// ─── WORKFLOW ANIMATION ───────────────────────────────────────────────────────

function setWorkflowStep(step) {
  [1, 2, 3, 4].forEach(i => {
    const el = document.getElementById(`wf-${i}`);
    if (el) el.classList.toggle('active', i === step);
  });
}

// ─── MESSAGE RENDERING ───────────────────────────────────────────────────────

function appendMessage(role, text) {
  const container = document.getElementById('messages');
  const wrapper = document.createElement('div');
  wrapper.className = `msg ${role}`;

  if (role === 'bot') {
    const avatar = document.createElement('div');
    avatar.className = 'bot-avatar';
    avatar.textContent = '🕊️';
    wrapper.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = formatText(text);
  wrapper.appendChild(bubble);

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

function formatText(text) {
  // Convert **bold** markdown, newlines
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

// ─── API CALL ─────────────────────────────────────────────────────────────────

async function callClaudeAPI(userMessage) {
  const memoryContext = Memory.getContext();

  const response = await fetch(CONFIG.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + CONFIG.API_KEY,
    },
    body: JSON.stringify({
      model: CONFIG.MODEL,
      max_tokens: CONFIG.MAX_TOKENS,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT + memoryContext },
        ...conversationHistory
      ]
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Sorry, no response received.';
}
// ─── SEND MESSAGE ─────────────────────────────────────────────────────────────

async function sendMessage() {
  if (isLoading) return;

  const input = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const typingEl = document.getElementById('typing');

  const text = input.value.trim();
  if (!text) return;

  // Clear input
  input.value = '';
  isLoading = true;
  sendBtn.disabled = true;

  // Step 1: User Input
  setWorkflowStep(1);
  appendMessage('user', text);

  // Step 2: Memory
  setWorkflowStep(2);
  Memory.update(text);
  conversationHistory.push({ role: 'user', content: text });

  // Show typing
  typingEl.classList.remove('hidden');
  document.getElementById('messages').scrollTop = 99999;

  try {
    // Step 3: API Call
    setWorkflowStep(3);
    const reply = await callClaudeAPI(text);

    // Step 4: Response
    setWorkflowStep(4);
    typingEl.classList.add('hidden');

    conversationHistory.push({ role: 'assistant', content: reply });
    appendMessage('bot', reply);

  } catch (error) {
    typingEl.classList.add('hidden');
    setWorkflowStep(1);

    let errorMsg = 'Sorry, there was an error connecting to the AI. ';
    if (error.message.includes('401') || error.message.includes('API key')) {
      errorMsg += 'Please check your API key in js/chat.js and replace YOUR_ANTHROPIC_API_KEY_HERE with a valid key.';
    } else if (error.message.includes('Failed to fetch')) {
      errorMsg += 'Please check your internet connection.';
    } else {
      errorMsg += error.message;
    }

    appendMessage('bot', errorMsg);
    console.error('Claude API Error:', error);
  }

  isLoading = false;
  sendBtn.disabled = false;
  input.focus();
}

// ─── QUICK SEND ──────────────────────────────────────────────────────────────

function sendQuick(text) {
  document.getElementById('user-input').value = text;
  sendMessage();
}

// ─── INIT ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('user-input').focus();
});
