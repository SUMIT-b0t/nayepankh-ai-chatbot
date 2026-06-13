/**
 * memory.js — Session Memory Module
 * NayePankh Foundation AI Chatbot
 *
 * Tracks topics discussed, user interests, and message history
 * across the current session to provide context-aware responses.
 */

const Memory = (() => {
  const state = {
    topics: [],
    interests: [],
    messageCount: 0,
    sessionStart: new Date().toISOString(),
    profile: null,
  };

  // Topic keyword map
  const topicMap = [
    { keywords: ['volunteer', 'join', 'help us', 'contribute'], label: 'Volunteering' },
    { keywords: ['donat', 'fund', 'money', 'support', 'give', 'payment'], label: 'Donations' },
    { keywords: ['educat', 'tutor', 'school', 'stud', 'learn', 'teach'], label: 'Education' },
    { keywords: ['food', 'hunger', 'feed', 'meal', 'bhookha', 'distribute'], label: 'Food Distribution' },
    { keywords: ['sanitary', 'pad', 'hygiene', 'women', 'menstrual', 'period'], label: "Women's Hygiene" },
    { keywords: ['intern', 'training', 'certificate', 'nayepankh intern'], label: 'Internship' },
    { keywords: ['animal', 'stray', 'dog', 'cow', 'pet'], label: 'Animal Welfare' },
    { keywords: ['covid', 'pandemic', 'corona', 'relief'], label: 'COVID Relief' },
    { keywords: ['register', '80g', 'tax', 'exemption', 'niti', 'govt'], label: 'NGO Registration & Tax' },
    { keywords: ['contact', 'email', 'phone', 'website', 'address'], label: 'Contact Info' },
  ];

  function extractTopics(message) {
    const lower = message.toLowerCase();
    topicMap.forEach(({ keywords, label }) => {
      if (keywords.some(kw => lower.includes(kw))) {
        if (!state.topics.includes(label)) {
          state.topics.push(label);
        }
        if (!state.interests.includes(label) && state.topics.filter(t => t === label).length >= 1) {
          if (!state.interests.includes(label)) state.interests.push(label);
        }
      }
    });
  }

  function buildProfile() {
    if (state.messageCount >= 2) {
      state.profile = `Active user — ${state.messageCount} messages sent. Interested in: ${
        state.interests.length > 0 ? state.interests.join(', ') : 'General Information'
      }.`;
    }
  }

  function update(userMessage) {
    state.messageCount++;
    extractTopics(userMessage);
    buildProfile();
    renderMemoryPanel();
  }

  function renderMemoryPanel() {
    const emptyEl = document.getElementById('mem-empty');
    const topicsEl = document.getElementById('mem-topics');
    const profileEl = document.getElementById('mem-profile');

    if (state.topics.length > 0) {
      emptyEl.classList.add('hidden');
      topicsEl.classList.remove('hidden');
      topicsEl.innerHTML = state.topics
        .slice(-8)
        .map(t => `<span class="mem-tag">${t}</span>`)
        .join('');
    }

    if (state.profile) {
      profileEl.classList.remove('hidden');
      profileEl.textContent = state.profile;
    }
  }

  function getContext() {
    if (state.topics.length === 0) return '';
    return `\n[User has previously asked about: ${state.topics.join(', ')}]`;
  }

  return { update, getContext, getState: () => ({ ...state }) };
})();
