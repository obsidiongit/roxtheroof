/* ==============================================
   ROXY — Rox the Roof Virtual Assistant
   Self-contained chat widget. Drop chatbot.js
   onto any page alongside chatbot.css.
   ============================================== */

(function () {
    'use strict';

    // ---- KNOWLEDGE BASE ----
    const KB = {
        greeting: [
            "Hi there! 👋 I'm <strong>Roxy</strong>, your Rox the Roof assistant. I can help with service questions, estimates, or connecting you with our team. What brings you in today?",
        ],

        // Each intent: keywords[] + response text + optional chips[]
        intents: [
            {
                id: 'estimate',
                keywords: ['estimate', 'quote', 'price', 'cost', 'how much', 'pricing', 'free', 'bid', 'charge'],
                response: "Great news — all our estimates are completely <strong>free and no-obligation</strong>! 🎉<br><br>The fastest way to get one is to give us a call:<br><strong><a href='tel:3086511030'>308-651-1030</a></strong><br><br>Or send us an email and we'll follow up within 24 hours:<br><a href='mailto:roxtheroof@gmail.com'>roxtheroof@gmail.com</a>",
                chips: ['Book a Call', 'Our Services', 'Service Area'],
            },
            {
                id: 'call',
                keywords: ['call', 'phone', 'book', 'schedule', 'appointment', 'talk', 'speak', 'contact', 'reach'],
                response: "Absolutely! You can reach us directly at:<br><br>📞 <strong><a href='tel:3086511030'>308-651-1030</a></strong><br><br>We're usually available Monday–Saturday. Give us a ring and we'll get you set up with a free on-site estimate!",
                chips: ['Get a Free Estimate', 'Our Services', 'Email Instead'],
            },
            {
                id: 'email',
                keywords: ['email', 'mail', 'message', 'write', 'send', 'inbox'],
                response: "You can email us anytime at:<br><br>📧 <strong><a href='mailto:roxtheroof@gmail.com'>roxtheroof@gmail.com</a></strong><br><br>We respond within 24 hours. If it's urgent, a call is the fastest: <a href='tel:3086511030'>308-651-1030</a>.",
                chips: ['Book a Call', 'Get a Free Estimate'],
            },
            {
                id: 'services',
                keywords: ['service', 'services', 'offer', 'do you do', 'what do', 'work', 'type', 'options', 'available'],
                response: "We offer a wide range of services: 🏠<br><br>• <strong>Residential & Commercial Roofing</strong><br>• <strong>Asphalt Shingles & Metal Roofing</strong><br>• <strong>Seamless Gutters</strong><br>• <strong>Fascia & Soffit</strong><br>• <strong>Window Installation</strong><br>• <strong>Interior Remodeling</strong><br><br>All with free estimates and no pressure!",
                chips: ['Get a Free Estimate', 'Roofing', 'Gutters', 'Windows', 'Remodeling'],
            },
            {
                id: 'roofing',
                keywords: ['roof', 'roofing', 'shingle', 'shingles', 'metal roof', 'residential', 'commercial', 'storm', 'damage', 'repair', 'leak', 'replace'],
                response: "Roofing is our specialty! ⛺<br><br>We handle everything from <strong>storm damage repairs</strong> to <strong>full roof replacements</strong> — for both homes and businesses. We work with:<br><br>• Asphalt shingles (3-tab, architectural, designer)<br>• Metal roofing (40–70 year lifespan!)<br>• Flat/low-slope commercial systems<br><br>Call us for a free on-site look: <a href='tel:3086511030'>308-651-1030</a>",
                chips: ['Get a Free Estimate', 'Book a Call', 'Other Services'],
            },
            {
                id: 'gutters',
                keywords: ['gutter', 'gutters', 'seamless', 'drainage', 'water', 'downspout'],
                response: "We install custom <strong>seamless gutters</strong> fabricated right on-site for a perfect fit! 💧<br><br>Seamless gutters eliminate the leak-prone joints of standard gutters and keep water away from your foundation. We can match color to your home's exterior too.",
                chips: ['Get a Free Estimate', 'Book a Call', 'Other Services'],
            },
            {
                id: 'windows',
                keywords: ['window', 'windows', 'glass', 'energy', 'insulation', 'pane'],
                response: "We install <strong>energy-efficient replacement windows</strong> that can noticeably cut your heating and cooling costs! 🪟<br><br>We handle the full job — from removing old windows to finishing the trim. Many customers see a real difference in comfort and utility bills.",
                chips: ['Get a Free Estimate', 'Book a Call', 'Other Services'],
            },
            {
                id: 'remodeling',
                keywords: ['remodel', 'remodeling', 'interior', 'kitchen', 'bathroom', 'bath', 'flooring', 'drywall', 'painting', 'renovation'],
                response: "Yes — we do <strong>interior remodeling</strong> too! 🔨<br><br>Kitchens, bathrooms, flooring, drywall and more. We bring the same craftsmanship indoors. Our clients are routinely surprised at the quality. Want to chat through what you have in mind?",
                chips: ['Book a Call', 'Get a Free Estimate'],
            },
            {
                id: 'location',
                keywords: ['location', 'area', 'serve', 'where', 'lexington', 'nebraska', 'ne', 'near', 'nearby', 'kearney', 'cozad', 'gothenburg'],
                response: "We're based in <strong>Lexington, Nebraska</strong> and serve the surrounding Central Nebraska area, including: 📍<br><br>Cozad · Gothenburg · Kearney · Holdrege · Minden · Hastings · Grand Island<br><br>Not sure if you're in our service area? Just ask — we'll let you know!",
                chips: ['Get a Free Estimate', 'Book a Call'],
            },
            {
                id: 'about',
                keywords: ['who', 'about', 'company', 'owner', 'women', 'woman', 'latin', 'latino', 'hispanic', 'owned', 'business', 'founded', 'started'],
                response: "Rox the Roof is a <strong>woman-owned, Latin-owned</strong> roofing company in Lexington, NE — and we're proud of it! 🌟<br><br>We built this business from the ground up by treating every customer's home as if it were our own. Quality, honesty, and community are at the heart of everything we do.",
                chips: ['Our Services', 'Get a Free Estimate'],
            },
            {
                id: 'hours',
                keywords: ['hours', 'open', 'available', 'time', 'days', 'weekend', 'saturday', 'sunday'],
                response: "We typically work <strong>Monday through Saturday</strong>. The best way to reach us quickly is by phone:<br><br>📞 <a href='tel:3086511030'>308-651-1030</a><br><br>For non-urgent inquiries you can email anytime at <a href='mailto:roxtheroof@gmail.com'>roxtheroof@gmail.com</a> and we'll respond within 24 hours.",
                chips: ['Book a Call', 'Get a Free Estimate'],
            },
            {
                id: 'insurance',
                keywords: ['insurance', 'insured', 'claim', 'hail', 'adjuster', 'coverage', 'licensed'],
                response: "Great question! We work with homeowners on <strong>storm damage insurance claims</strong> regularly. We can assess the damage and help document it for your adjuster. 📋<br><br>Give us a call and we'll walk you through the process: <a href='tel:3086511030'>308-651-1030</a>",
                chips: ['Book a Call', 'Get a Free Estimate'],
            },
            {
                id: 'thankyou',
                keywords: ['thank', 'thanks', 'perfect', 'great', 'awesome', 'helpful', 'appreciate'],
                response: "You're so welcome! 😊 We're here whenever you need us. Don't hesitate to reach out — and give us a call at <a href='tel:3086511030'>308-651-1030</a> when you're ready to get started!",
                chips: ['Get a Free Estimate', 'Other Questions'],
            },
            {
                id: 'hello',
                keywords: ['hi', 'hello', 'hey', 'howdy', 'hola', 'sup', 'good morning', 'good afternoon'],
                response: "Hey there! 👋 Great to hear from you. I'm Roxy, here to help with anything Rox the Roof. What can I help you with today?",
                chips: ['Get a Free Estimate', 'Our Services', 'Book a Call', 'Service Area'],
            },
        ],

        fallback: [
            "That's a great question! For the most accurate answer, our team would love to chat with you directly. 😊<br><br>📞 <strong><a href='tel:3086511030'>308-651-1030</a></strong><br>📧 <a href='mailto:roxtheroof@gmail.com'>roxtheroof@gmail.com</a>",
            "I want to make sure you get the right answer on that — our team can help! Give us a call at <a href='tel:3086511030'>308-651-1030</a> or shoot us an email.",
            "Hmm, let me make sure you get the best help for that one. The quickest route is a call to our team: <a href='tel:3086511030'>308-651-1030</a> 📞",
        ],
    };

    // Chip → intent mapping
    const CHIP_INTENTS = {
        'Get a Free Estimate': 'estimate',
        'Book a Call': 'call',
        'Our Services': 'services',
        'Service Area': 'location',
        'Roofing': 'roofing',
        'Gutters': 'gutters',
        'Windows': 'windows',
        'Remodeling': 'remodeling',
        'Email Instead': 'email',
        'Other Services': 'services',
        'Other Questions': null,
    };

    // ---- STATE ----
    let isOpen = false;
    let greetingDismissed = false;
    let fallbackIndex = 0;
    let messageCount = 0;

    // ---- BUILD DOM ----
    function buildWidget() {
        // Inject CSS link
        if (!document.querySelector('link[data-roxy]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'chatbot.css';
            link.setAttribute('data-roxy', '1');
            document.head.appendChild(link);
        }

        const launcher = document.createElement('div');
        launcher.id = 'roxy-chat-launcher';
        launcher.innerHTML = `
      <!-- Greeting Bubble -->
      <div id="roxy-greeting-bubble">
        👋 Hi! Need a <strong>free roofing estimate?</strong>
        <span id="roxy-greeting-close">✕</span>
      </div>

      <!-- Toggle Button -->
      <button id="roxy-toggle-btn" aria-label="Open chat with Roxy">
        <div id="roxy-badge">1</div>
        <svg class="roxy-icon-chat" viewBox="0 0 24 24" fill="none" stroke="white"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="26" height="26">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        <svg class="roxy-icon-close" viewBox="0 0 24 24" fill="none" stroke="white"
          stroke-width="2.5" stroke-linecap="round" width="22" height="22">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <!-- Chat Window -->
      <div id="roxy-chat-window" role="dialog" aria-label="Chat with Roxy">
        <div id="roxy-header">
          <div id="roxy-avatar">🏠</div>
          <div id="roxy-header-info">
            <div id="roxy-header-name">Roxy · Rox the Roof</div>
            <div id="roxy-header-status">Online · Typically replies instantly</div>
          </div>
        </div>
        <div id="roxy-messages"></div>
        <div id="roxy-quick-replies"></div>
        <div id="roxy-input-bar">
          <input id="roxy-input" type="text" placeholder="Type a message…" autocomplete="off" maxlength="300">
          <button id="roxy-send-btn" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div id="roxy-footer">Powered by Rox the Roof ·
          <a href="tel:3086511030" style="color:inherit;">308-651-1030</a>
        </div>
      </div>
    `;

        document.body.appendChild(launcher);

        // Wire up events
        document.getElementById('roxy-toggle-btn').addEventListener('click', toggleChat);
        document.getElementById('roxy-greeting-bubble').addEventListener('click', (e) => {
            if (e.target.id === 'roxy-greeting-close') {
                dismissGreeting();
            } else {
                openChat();
            }
        });
        document.getElementById('roxy-send-btn').addEventListener('click', handleSend);
        document.getElementById('roxy-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Show greeting after 2.5 seconds if not opened
        setTimeout(() => {
            if (!isOpen && !greetingDismissed) {
                document.getElementById('roxy-greeting-bubble').style.display = 'block';
            }
        }, 2500);
    }

    // ---- OPEN / CLOSE ----
    function toggleChat() {
        if (isOpen) closeChat(); else openChat();
    }

    function openChat() {
        isOpen = true;
        dismissGreeting();
        document.getElementById('roxy-toggle-btn').classList.add('is-open');
        document.getElementById('roxy-chat-window').classList.add('is-open');
        document.getElementById('roxy-badge').classList.add('hidden');

        // Send greeting if first open
        if (messageCount === 0) {
            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addBotMessage(KB.greeting[0], [
                        'Get a Free Estimate', 'Our Services', 'Book a Call', 'Service Area',
                    ]);
                }, 900);
            }, 200);
        }

        // Focus input
        setTimeout(() => document.getElementById('roxy-input').focus(), 400);
    }

    function closeChat() {
        isOpen = false;
        document.getElementById('roxy-toggle-btn').classList.remove('is-open');
        document.getElementById('roxy-chat-window').classList.remove('is-open');
    }

    function dismissGreeting() {
        greetingDismissed = true;
        const el = document.getElementById('roxy-greeting-bubble');
        if (el) el.style.display = 'none';
    }

    // ---- MESSAGES ----
    function addBotMessage(html, chips) {
        messageCount++;
        const msgs = document.getElementById('roxy-messages');

        const wrap = document.createElement('div');
        wrap.className = 'roxy-msg bot';
        wrap.innerHTML = `
      <div class="roxy-msg-avatar">🏠</div>
      <div class="roxy-bubble">${html}</div>
    `;
        msgs.appendChild(wrap);
        scrollMsgs();
        renderChips(chips || []);

        // Suggest call after 3rd bot message
        if (messageCount === 3) {
            setTimeout(() => {
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addBotMessage(
                        "By the way — the fastest way to get sorted is a quick call with our team! 📞 <a href='tel:3086511030'><strong>308-651-1030</strong></a>",
                        []
                    );
                }, 1200);
            }, 1200);
        }
    }

    function addUserMessage(text) {
        const msgs = document.getElementById('roxy-messages');
        const wrap = document.createElement('div');
        wrap.className = 'roxy-msg user';
        wrap.innerHTML = `<div class="roxy-bubble">${escapeHtml(text)}</div>`;
        msgs.appendChild(wrap);
        scrollMsgs();
        clearChips();
    }

    function scrollMsgs() {
        const msgs = document.getElementById('roxy-messages');
        setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
    }

    // ---- TYPING INDICATOR ----
    function showTyping() {
        const msgs = document.getElementById('roxy-messages');
        const t = document.createElement('div');
        t.id = 'roxy-typing';
        t.className = 'roxy-msg bot';
        t.innerHTML = `
      <div class="roxy-msg-avatar">🏠</div>
      <div id="roxy-typing-bubble">
        <span class="roxy-dot"></span>
        <span class="roxy-dot"></span>
        <span class="roxy-dot"></span>
      </div>
    `;
        msgs.appendChild(t);
        scrollMsgs();
    }

    function removeTyping() {
        const t = document.getElementById('roxy-typing');
        if (t) t.remove();
    }

    // ---- QUICK REPLY CHIPS ----
    function renderChips(chips) {
        const qr = document.getElementById('roxy-quick-replies');
        qr.innerHTML = '';
        chips.forEach(label => {
            const btn = document.createElement('button');
            btn.className = 'roxy-chip';
            btn.textContent = label;
            btn.addEventListener('click', () => handleChip(label));
            qr.appendChild(btn);
        });
    }

    function clearChips() {
        document.getElementById('roxy-quick-replies').innerHTML = '';
    }

    function handleChip(label) {
        addUserMessage(label);
        const intentId = CHIP_INTENTS[label];
        const delay = 600 + Math.random() * 500;
        showTyping();
        setTimeout(() => {
            removeTyping();
            if (intentId) {
                const intent = KB.intents.find(i => i.id === intentId);
                if (intent) {
                    addBotMessage(intent.response, intent.chips);
                } else {
                    sendFallback();
                }
            } else {
                addBotMessage(
                    "Of course! Feel free to type your question — I'm here to help. 😊",
                    ['Get a Free Estimate', 'Book a Call', 'Our Services']
                );
            }
        }, delay);
    }

    // ---- SEND / RESPOND ----
    function handleSend() {
        const input = document.getElementById('roxy-input');
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        addUserMessage(text);

        const delay = 700 + Math.random() * 600;
        showTyping();
        setTimeout(() => {
            removeTyping();
            const intent = matchIntent(text.toLowerCase());
            if (intent) {
                addBotMessage(intent.response, intent.chips);
            } else {
                sendFallback();
            }
        }, delay);
    }

    function matchIntent(text) {
        for (const intent of KB.intents) {
            for (const kw of intent.keywords) {
                if (text.includes(kw)) return intent;
            }
        }
        return null;
    }

    function sendFallback() {
        const msg = KB.fallback[fallbackIndex % KB.fallback.length];
        fallbackIndex++;
        addBotMessage(msg, ['Get a Free Estimate', 'Book a Call', 'Our Services']);
    }

    // ---- UTIL ----
    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ---- INIT ----
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildWidget);
    } else {
        buildWidget();
    }
})();
