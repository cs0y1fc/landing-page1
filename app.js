document.addEventListener('DOMContentLoaded', () => {
  
  // --- GLOBAL STATE ---
  let currentLanguage = 'en'; // English by default
  let currentTheme = 'light'; // Light theme by default
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- LANGUAGE DICTIONARY ---
  const translations = {
    en: {
      "nav-cta": "Let's Talk",
      "hero-tag": "Full-Stack Developer | Python & SQL",
      "hero-title": "Crafting High-Performance Web Apps with <span class='grad-text'>Advanced AI</span>",
      "hero-desc": "I am Ignasi Gimeno. A Full-Stack Engineer specialized in developing high-speed web platforms, integrating neural agents, and building robust Python backend pipelines with SQL databases.",
      "btn-chat": "Chat with AI",
      "btn-projects": "Try Terminal",
      "stat-proj-lbl": "Projects Done",
      "stat-exp-lbl": "Years Exp.",
      "stat-success-lbl": "Success Rate",
      "sec-skills-title": "Core Skills",
      "skill-py-sql": "Python & SQL Integration",
      "skill-fs": "Full-Stack Dev (Next.js/Node)",
      "skill-ai": "LLMs & VectorDBs Integration",
      "sec-projects-title": "Highlighted Projects",
      "p1-desc": "Enterprise RAG (Retrieval-Augmented Generation) application connecting Python FastAPI with PostgreSQL to manage chat histories and documents.",
      "p2-desc": "Multi-model AI SaaS console built on Next.js, managing OpenAI and Gemini APIs, with analytics stored in PostgreSQL.",
      "p3-desc": "Predictive e-commerce recommendation system utilizing Python services integrated with caching layers and SQL queries.",
      "sec-chatbot-title": "Ignasi AI Assistant",
      "chat-placeholder": "Ask me about Ignasi...",
      "sug-proj": "Projects",
      "sug-stack": "Tech Stack",
      "sug-contact": "Contact Info",
      "sug-hire": "Hire Me",
      "sec-terminal-title": "Interactive Terminal",
      "term-welcome": "Ignasi Gimeno Command Terminal (v2.0.0-stable)\nType 'help' to list available commands (e.g. 'skills', 'about', 'clear').",
      "term-prompt-placeholder": "type command...",
      "chat-status": "Online & Ready",
      "about-desc": "Specialized in Python, SQL & AI Integrations."
    },
    es: {
      "nav-cta": "Hablemos",
      "hero-tag": "Desarrollador Full-Stack | Python & SQL",
      "hero-title": "Creando Webs de Alto Rendimiento con <span class='grad-text'>IA Avanzada</span>",
      "hero-desc": "Soy Ignasi Gimeno. Ingeniero Full-Stack especializado en el desarrollo de plataformas web rápidas, integración de agentes neuronales y construcción de pipelines robustos en Python con bases de datos SQL.",
      "btn-chat": "Chatear con IA",
      "btn-projects": "Prueba la Terminal",
      "stat-proj-lbl": "Proyectos",
      "stat-exp-lbl": "Años Exp.",
      "stat-success-lbl": "Tasa de Éxito",
      "sec-skills-title": "Habilidades Clave",
      "skill-py-sql": "Integración Python & SQL",
      "skill-fs": "Desarrollo Full-Stack (Next/Node)",
      "skill-ai": "Integración de LLMs y VectorDBs",
      "sec-projects-title": "Proyectos Destacados",
      "p1-desc": "Aplicación empresarial RAG (Generación Aumentada por Recuperación) que conecta Python FastAPI con PostgreSQL para historiales y analíticas.",
      "p2-desc": "Consola SaaS multi-modelo en Next.js, administrando APIs de OpenAI y Gemini, con logs y analíticas en PostgreSQL.",
      "p3-desc": "Recomendador inteligente de e-commerce que emplea servicios de sincronización Python y consultas avanzadas SQL.",
      "sec-chatbot-title": "Asistente Virtual de Ignasi",
      "chat-placeholder": "Pregúntame sobre Ignasi...",
      "sug-proj": "Proyectos",
      "sug-stack": "Tecnologías",
      "sug-contact": "Contacto",
      "sug-hire": "Contratar",
      "sec-terminal-title": "Terminal Interactiva",
      "term-welcome": "Terminal de Comandos de Ignasi Gimeno (v2.0.0-stable)\nEscribe 'help' para listar los comandos (ej. 'skills', 'about', 'clear').",
      "term-prompt-placeholder": "escribe un comando...",
      "chat-status": "En línea y listo",
      "about-desc": "Especializado en Python, SQL e integración de IA."
    },
    ca: {
      "nav-cta": "Parlem",
      "hero-tag": "Desenvolupador Full-Stack | Python & SQL",
      "hero-title": "Creant Webs d'Alt Rendiment amb <span class='grad-text'>IA Avançada</span>",
      "hero-desc": "Sóc l'Ignasi Gimeno. Enginyer Full-Stack especialitzat en el desenvolupament de plataformes web ràpides, la integració d'agents neuronals i la construcció de pipelines robustos en Python amb bases de dades SQL.",
      "btn-chat": "Xateja amb la IA",
      "btn-projects": "Prova el Terminal",
      "stat-proj-lbl": "Projectes",
      "stat-exp-lbl": "Anys d'Exp.",
      "stat-success-lbl": "Taxa d'Èxit",
      "sec-skills-title": "Habilitats Clau",
      "skill-py-sql": "Integració Python & SQL",
      "skill-fs": "Desenvolupament Full-Stack (Next/Node)",
      "skill-ai": "Integració de LLMs i VectorDBs",
      "sec-projects-title": "Projectes Destacats",
      "p1-desc": "Aplicació empresarial RAG (Generació Augmentada per Recuperació) que connecta Python FastAPI amb PostgreSQL per a historials i analítiques.",
      "p2-desc": "Consola SaaS multimodel en Next.js que gestiona les APIs d'OpenAI i Gemini, amb registres i analítiques a PostgreSQL.",
      "p3-desc": "Recomanador intel·ligent d'e-commerce que utilitza serveis de sincronització en Python i consultes SQL avançades.",
      "sec-chatbot-title": "Assistent Virtual de l'Ignasi",
      "chat-placeholder": "Pregunta'm sobre l'Ignasi...",
      "sug-proj": "Projectes",
      "sug-stack": "Tecnologies",
      "sug-contact": "Contacte",
      "sug-hire": "Contractar",
      "sec-terminal-title": "Terminal Interactiu",
      "term-welcome": "Terminal d'Ordres de l'Ignasi Gimeno (v2.0.0-stable)\nEscriu 'help' per llistar les ordres disponibles (p. ex. 'skills', 'about', 'clear').",
      "term-prompt-placeholder": "escriu una ordre...",
      "chat-status": "En línia i a punt",
      "about-desc": "Especialitzat en Python, SQL i integració d'IA."
    }
  };

  // --- INTERACTIVE PARTICLE CANVAS ---
  const canvas = document.getElementById('particle-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const colors = ['#1e3a8a', '#2563eb', '#3b82f6'];

    let mouse = {
      x: null,
      y: null,
      radius: 150
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce on boundaries
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

        // Mouse attraction/repulsion
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            // Slight attraction physics
            this.x += dx * 0.01;
            this.y += dy * 0.01;
          }
        }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 11000);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    initParticles();

    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            opacityValue = 1 - distance / 110;
            // Line color is derived from CSS theme variables dynamically
            const lineOpacity = opacityValue * (currentTheme === 'dark' ? 0.15 : 0.1);
            ctx.strokeStyle = currentTheme === 'dark'
              ? `rgba(96, 165, 250, ${lineOpacity})`
              : `rgba(30, 58, 138, ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', initParticles);
  }

  // --- PERSPECTIVE 3D CARD TILT ---
  const cards = document.querySelectorAll('.dash-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Rotate angle limits
      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // internal depth movement
      const innerLayers = card.querySelectorAll('.layer-3d');
      innerLayers.forEach(layer => {
        layer.style.transform = 'translateZ(30px)';
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      const innerLayers = card.querySelectorAll('.layer-3d');
      innerLayers.forEach(layer => {
        layer.style.transform = 'translateZ(0px)';
      });
    });

    // Cleanup entrance animation so 3D tilt works without conflict
    card.addEventListener('animationend', (e) => {
      if (e.animationName === 'cardEntrance') {
        card.style.animation = 'none';
        card.style.transition = 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.15s ease-out';
      }
    });
  });

  // --- THEME SELECTOR SWITCH ---
  const themeBtn = document.getElementById('theme-toggle-btn');
  
  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }

  // Initial Load Theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // --- HERO TITLE WORD-BY-WORD REVEAL ANIMATION ---
  function animateHeroTitle() {
    const h1 = document.querySelector('.card-hero h1');
    if (!h1) return;
    
    const titleHTML = translations[currentLanguage]['hero-title'];
    if (!titleHTML) return;
    
    // Set raw translated HTML first
    h1.innerHTML = titleHTML;
    
    // Split text nodes into word spans, preserving HTML tags
    const segments = h1.innerHTML.split(/(<[^>]+>)/);
    let wordIndex = 0;
    let result = '';
    
    segments.forEach(segment => {
      if (segment.startsWith('<') && segment.endsWith('>')) {
        result += segment;
      } else {
        const words = segment.split(/(\s+)/);
        words.forEach(word => {
          if (word.trim()) {
            result += `<span class="word-reveal" style="animation-delay: ${0.15 + wordIndex * 0.04}s">${word}</span>`;
            wordIndex++;
          } else {
            result += word;
          }
        });
      }
    });
    
    h1.innerHTML = result;
  }

  // --- LANGUAGE INTERRUPTER SWITCH ---
  const langToggle = document.getElementById('lang-toggle-slider');
  
  function translatePage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang][key]) {
        // Handle placeholders and regular texts
        if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
          element.setAttribute('placeholder', translations[lang][key]);
        } else {
          element.innerHTML = translations[lang][key];
        }
      }
    });

    // Update active tab visual selection
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (langToggle) {
      langToggle.classList.remove('es', 'ca');
      if (lang !== 'en') {
        langToggle.classList.add(lang);
      }
    }

    // Re-animate hero title with word reveal
    animateHeroTitle();
  }

  // Language buttons handling
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      translatePage(btn.dataset.lang);
    });
  });

  // Initial translation trigger
  translatePage('en');

  // --- SKILLS PROGRESS TRIGGER ---
  const skillFills = document.querySelectorAll('.skill-fill');
  setTimeout(() => {
    skillFills.forEach(fill => {
      const targetWidth = fill.parentElement.previousElementSibling.querySelector('.skill-val').textContent;
      fill.style.width = targetWidth;
    });
  }, 400);

  // --- STATS COUNTER ANIMATION ---
  function animateCounters() {
    const statNums = document.querySelectorAll('.stat-num');
    statNums.forEach(stat => {
      const text = stat.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;
      
      const target = parseInt(match[1]);
      const suffix = text.replace(/\d+/, '');
      let startTime = null;
      const duration = 1200;
      
      function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quart for satisfying deceleration
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(target * eased);
        stat.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }
  if (!prefersReducedMotion) {
    setTimeout(animateCounters, 300);
  }

  // --- BILINGUAL TERMINAL SIMULATOR ---
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  const terminalDict = {
    en: {
      help: `Available commands:
  - <span class="term-prompt">about</span>     : Background info on Ignasi.
  - <span class="term-prompt">skills</span>    : Detailed technology stack.
  - <span class="term-prompt">projects</span>  : Key software projects built.
  - <span class="term-prompt">contact</span>   : Network links and email.
  - <span class="term-prompt">clear</span>     : Wipe console screen.
  - <span class="term-prompt">secret</span>    : Trigger Special Easter Egg.`,
      
      about: `Hello, I'm <span class="grad-text" style="font-weight:700">Ignasi Gimeno</span>.
Full-Stack Engineer with focus on Python backends, SQL rel databases, and LLMs integration.
I orchestrate advanced server structures and build sleek client dashboards.`,
      
      skills: `Technology Stack:
  [Backend/DB] : Python (FastAPI/Django), SQL (PostgreSQL, MySQL), Redis
  [Frontend]   : React, Next.js, TypeScript, CSS3 & TailwindCSS
  [AI Engine]  : OpenAI APIs, Gemini API, LangChain, Pinecone DB
  [DevOps]     : Docker, AWS, Git/CI-CD, Vercel`,
      
      projects: `Featured Projects:
  1. <span class="term-prompt">DocuMind AI</span> - Python FastAPI + PGSQL RAG engine.
  2. <span class="term-prompt">SaaS Chat Hub</span> - Next.js Multi-model OpenAI/Gemini portal.
  3. <span class="term-prompt">NeuroMarket</span> - Predictive recommendations with Python & Redis.`,
      
      contact: `Socials & Contact details:
  - Email    : <span class="term-prompt">ignasi.gimeno.dev@gmail.com</span>
  - GitHub   : github.com/ignasi-gimeno-dev
  - LinkedIn : linkedin.com/in/ignasi-gimeno-dev`,
      
      error: `Command not found: "{cmd}". Type <span class="term-prompt">help</span> for a list of valid commands.`
    },
    es: {
      help: `Comandos válidos:
  - <span class="term-prompt">about</span>     : Información biográfica de Ignasi.
  - <span class="term-prompt">skills</span>    : Stack de tecnologías detallado.
  - <span class="term-prompt">projects</span>  : Listado de proyectos de software.
  - <span class="term-prompt">contact</span>   : Correo y redes sociales.
  - <span class="term-prompt">clear</span>     : Limpiar consola.
  - <span class="term-prompt">secret</span>    : Activar Huevo de Pascua.`,
      
      about: `Hola, soy <span class="grad-text" style="font-weight:700">Ignasi Gimeno</span>.
Ingeniero Full-Stack orientado a la integración de Python, bases de datos SQL relacionales y agentes de IA.
Diseño infraestructuras back-end robustas y vistas web sofisticadas.`,
      
      skills: `Stack de Tecnologías:
  [Backend/BD] : Python (FastAPI/Django), SQL (PostgreSQL, MySQL), Redis
  [Frontend]   : React, Next.js, TypeScript, CSS3 & TailwindCSS
  [Motor IA]   : APIs de OpenAI, Gemini API, LangChain, VectorDB Pinecone
  [DevOps]     : Docker, AWS, Control Git/CI-CD, Vercel`,
      
      projects: `Proyectos Destacados:
  1. <span class="term-prompt">DocuMind AI</span> - RAG en Python FastAPI + base PostgreSQL.
  2. <span class="term-prompt">SaaS Chat Hub</span> - Next.js Multi-model OpenAI/Gemini portal.
  3. <span class="term-prompt">NeuroMarket</span> - Recomendador inteligente en Python y caché Redis.`,
      
      contact: `Enlaces y contacto:
  - Correo   : <span class="term-prompt">ignasi.gimeno.dev@gmail.com</span>
  - GitHub   : github.com/ignasi-gimeno-dev
  - LinkedIn : linkedin.com/in/ignasi-gimeno-dev`,
      
      error: `Comando no reconocido: "{cmd}". Escribe <span class="term-prompt">help</span> para consultar el listado.`
    },
    ca: {
      help: `Ordres disponibles:
  - <span class="term-prompt">about</span>     : Informació biogràfica de l'Ignasi.
  - <span class="term-prompt">skills</span>    : Stack de tecnologies detallat.
  - <span class="term-prompt">projects</span>  : Llistat de projectes de programari.
  - <span class="term-prompt">contact</span>   : Correu i xarxes socials.
  - <span class="term-prompt">clear</span>     : Netejar la consola.
  - <span class="term-prompt">secret</span>    : Activar l'ou de Pasqua.`,

      about: `Hola, sóc l'<span class="grad-text" style="font-weight:700">Ignasi Gimeno</span>.
Enginyer Full-Stack orientat a la integració de Python, bases de dades SQL relacionals i agents d'IA.
Dissenyo infraestructures back-end robustes i interfícies web sofisticades.`,

      skills: `Stack de Tecnologies:
  [Backend/BD] : Python (FastAPI/Django), SQL (PostgreSQL, MySQL), Redis
  [Frontend]   : React, Next.js, TypeScript, CSS3 & TailwindCSS
  [Motor IA]   : APIs d'OpenAI, Gemini API, LangChain, VectorDB Pinecone
  [DevOps]     : Docker, AWS, Git/CI-CD, Vercel`,

      projects: `Projectes Destacats:
  1. <span class="term-prompt">DocuMind AI</span> - Motor RAG amb Python FastAPI + base PostgreSQL.
  2. <span class="term-prompt">SaaS Chat Hub</span> - Portal multimodel OpenAI/Gemini en Next.js.
  3. <span class="term-prompt">NeuroMarket</span> - Recomanador intel·ligent en Python i memòria cau Redis.`,

      contact: `Enllaços i contacte:
  - Correu   : <span class="term-prompt">ignasi.gimeno.dev@gmail.com</span>
  - GitHub   : github.com/ignasi-gimeno-dev
  - LinkedIn : linkedin.com/in/ignasi-gimeno-dev`,

      error: `Ordre no reconeguda: "{cmd}". Escriu <span class="term-prompt">help</span> per consultar el llistat.`
    }
  };

  const secretArt = `  _                               _ 
 (_)_ _  _ _  __ _ ___ _   __ _  | |
 | | ' \\| ' \\/ _\` (_-<| | / _\` | |_|
 |_|_||_|_||_\\__,_/__/|_| \\__, | (_)
                          |___/      
Interactive portal updated to Ignasi Gimeno! Fully responsive.`;

  if (terminalInput && terminalBody) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        // Render command prompt
        const promptLine = document.createElement('div');
        promptLine.className = 'term-line';
        promptLine.innerHTML = `<span class="term-prompt">guest@ignasi:~$</span> ${value}`;
        terminalBody.appendChild(promptLine);

        if (value === 'clear') {
          terminalBody.innerHTML = '';
        } else if (value === '') {
          // Empty
        } else if (value === 'secret') {
          const res = document.createElement('div');
          res.className = 'term-line';
          res.style.color = '#d946ef';
          res.innerHTML = `<pre>${secretArt}</pre>`;
          terminalBody.appendChild(res);
        } else if (terminalDict[currentLanguage][value]) {
          const res = document.createElement('div');
          res.className = 'term-line';
          res.innerHTML = terminalDict[currentLanguage][value];
          terminalBody.appendChild(res);
        } else {
          const res = document.createElement('div');
          res.className = 'term-line';
          res.style.color = '#ef4444';
          const errMsg = terminalDict[currentLanguage].error.replace('{cmd}', value);
          res.innerHTML = errMsg;
          terminalBody.appendChild(res);
        }

        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });

    // Focus on click
    terminalBody.parentElement.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  // --- BILINGUAL AI CHATBOT SIMULATION ---
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatSugContainer = document.querySelector('.chat-suggestions');

  const botResponses = {
    en: {
      hola: "Hello! I am Ignasi's virtual clone. I can answer questions about his Full-Stack profile, Python + SQL systems, and AI integrations. What would you like to know?",
      projects: "Ignasi has built several complex systems:<br>• <strong>DocuMind AI</strong>: A RAG setup using Python and PGSQL databases.<br>• <strong>SaaS AI Hub</strong>: Multi-LLM chat console integrated with Stripe and PostgreSQL.<br>• <strong>NeuroMarket</strong>: E-commerce recommended pipelines built on Python services.",
      stack: "Ignasi's core technology suite:<br>• <strong>Languages & DB:</strong> Python (FastAPI/Django), SQL (PostgreSQL, MySQL), Redis.<br>• <strong>Frontend:</strong> React, Next.js, TypeScript, TailwindCSS.<br>• <strong>AI Solutions:</strong> LangChain, VectorDBs, OpenAI and Gemini APIs.",
      contact: "You can reach Ignasi at:<br>• <strong>Email:</strong> ignasi.gimeno.dev@gmail.com<br>• <strong>LinkedIn:</strong> linkedin.com/in/ignasi-gimeno-dev<br>• <strong>GitHub:</strong> github.com/ignasi-gimeno-dev",
      hire: "Great! Ignasi is available for freelance jobs, remote full-time positions, or custom integration consulting. Drop him an email: <strong>ignasi.gimeno.dev@gmail.com</strong>.",
      fallback: "Interesting! Ignasi is highly skilled in Python scripts and SQL indexing, alongside React architectures. Ask me something else or click one of the suggested buttons."
    },
    es: {
      hola: "¡Hola! Soy el clon virtual de Ignasi. Puedo responder dudas sobre su perfil Full-Stack, arquitecturas Python + SQL y proyectos de IA. ¿En qué te puedo ayudar?",
      projects: "Ignasi ha desarrollado proyectos de alta gama:<br>• <strong>DocuMind AI</strong>: Motor RAG con FastAPI de Python y base PostgreSQL.<br>• <strong>SaaS AI Hub</strong>: Consola multi-modelo en Next.js con histórico de logs SQL.<br>• <strong>NeuroMarket</strong>: Sistema de recomendaciones en Python y bases de datos.",
      stack: "El arsenal tecnológico de Ignasi:<br>• <strong>Lenguajes y BD:</strong> Python (FastAPI), bases SQL (PostgreSQL), Redis.<br>• <strong>Frontend:</strong> React, Next.js, TypeScript y TailwindCSS.<br>• <strong>IA Integración:</strong> LangChain, bases de vectores, APIs de OpenAI y Gemini.",
      contact: "Puedes contactar con Ignasi en:<br>• <strong>Correo:</strong> ignasi.gimeno.dev@gmail.com<br>• <strong>LinkedIn:</strong> linkedin.com/in/ignasi-gimeno-dev<br>• <strong>GitHub:</strong> github.com/ignasi-gimeno-dev",
      hire: "¡Genial! Ignasi está disponible para incorporarse a proyectos remotos, roles a tiempo completo o asesoría técnica. Escríbele a: <strong>ignasi.gimeno.dev@gmail.com</strong>.",
      fallback: "¡Excelente! Ignasi destaca en la programación con Python, consultas SQL estructuradas y creación de interfaces en React. Pregúntame más detalles o pulsa los botones de sugerencia."
    },
    ca: {
      hola: "Hola! Sóc el clon virtual de l'Ignasi. Puc respondre dubtes sobre el seu perfil Full-Stack, arquitectures Python + SQL i projectes d'IA. En què et puc ajudar?",
      projects: "L'Ignasi ha desenvolupat projectes d'alta gamma:<br>• <strong>DocuMind AI</strong>: Motor RAG amb FastAPI de Python i base PostgreSQL.<br>• <strong>SaaS AI Hub</strong>: Consola multimodel en Next.js amb històric de registres SQL.<br>• <strong>NeuroMarket</strong>: Sistema de recomanacions en Python i bases de dades.",
      stack: "L'arsenal tecnològic de l'Ignasi:<br>• <strong>Llenguatges i BD:</strong> Python (FastAPI), bases SQL (PostgreSQL), Redis.<br>• <strong>Frontend:</strong> React, Next.js, TypeScript i TailwindCSS.<br>• <strong>Integració d'IA:</strong> LangChain, bases de vectors, APIs d'OpenAI i Gemini.",
      contact: "Pots contactar amb l'Ignasi a:<br>• <strong>Correu:</strong> ignasi.gimeno.dev@gmail.com<br>• <strong>LinkedIn:</strong> linkedin.com/in/ignasi-gimeno-dev<br>• <strong>GitHub:</strong> github.com/ignasi-gimeno-dev",
      hire: "Genial! L'Ignasi està disponible per incorporar-se a projectes remots, rols a temps complet o assessoria tècnica. Escriu-li a: <strong>ignasi.gimeno.dev@gmail.com</strong>.",
      fallback: "Excel·lent! L'Ignasi destaca en la programació amb Python, consultes SQL estructurades i creació d'interfícies en React. Pregunta'm més detalls o prem els botons de suggeriment."
    }
  };

  function getBotReply(userText) {
    const text = userText.toLowerCase().trim();
    const lang = currentLanguage;

    if (text.includes('hola') || text.includes('hello') || text.includes('hi')) {
      return botResponses[lang].hola;
    }
    if (text.includes('project') || text.includes('proyecto') || text.includes('projecte') || text.includes('work') || text.includes('trabajos') || text.includes('treballs')) {
      return botResponses[lang].projects;
    }
    if (text.includes('stack') || text.includes('tech') || text.includes('tecnolog') || text.includes('skill') || text.includes('habilidad')) {
      return botResponses[lang].stack;
    }
    if (text.includes('contacto') || text.includes('contact') || text.includes('email') || text.includes('correo')) {
      return botResponses[lang].contact;
    }
    if (text.includes('hire') || text.includes('contrat') || text.includes('contract') || text.includes('empleo') || text.includes('feina') || text.includes('freelance')) {
      return botResponses[lang].hire;
    }
    return botResponses[lang].fallback;
  }

  function appendChatMessage(sender, text) {
    if (!chatBody) return;
    const msg = document.createElement('div');
    msg.className = `chat-msg msg-${sender}`;
    msg.innerHTML = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
    return msg;
  }

  function showBotTyping() {
    if (!chatBody) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-msg msg-bot typing-bubble-wrapper';
    bubble.innerHTML = `
      <div class="typing-bubble">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
    return bubble;
  }

  function handleChatSubmit(text) {
    if (!text.trim()) return;
    
    appendChatMessage('user', text);
    const typing = showBotTyping();

    // Random typewriter response delay
    const delay = 400 + Math.random() * 400;
    setTimeout(() => {
      if (typing) typing.remove();
      const reply = getBotReply(text);
      appendChatMessage('bot', reply);
    }, delay);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => {
      const text = chatInput.value;
      if (text.trim()) {
        handleChatSubmit(text);
        chatInput.value = '';
      }
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = chatInput.value;
        if (text.trim()) {
          handleChatSubmit(text);
          chatInput.value = '';
        }
      }
    });
  }

  // Handle Quick suggestion clicks
  if (chatSugContainer) {
    chatSugContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('sug-btn')) {
        const text = e.target.textContent;
        handleChatSubmit(text);
      }
    });
  }

  // Welcome Bot trigger
  if (chatBody) {
    setTimeout(() => {
      appendChatMessage('bot', botResponses[currentLanguage].hola);
    }, 600);
  }
});
