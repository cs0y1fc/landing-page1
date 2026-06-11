document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- INTERACTIVE TERMINAL ---
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  const commands = {
    help: `Comandos disponibles:
  - <span class="terminal-prompt">about</span>     : Breve descripción de mi perfil.
  - <span class="terminal-prompt">skills</span>    : Listado detallado de stack tecnológico.
  - <span class="terminal-prompt">projects</span>  : Proyectos destacados en desarrollo.
  - <span class="terminal-prompt">contact</span>   : Información de contacto y redes.
  - <span class="terminal-prompt">clear</span>     : Limpiar la pantalla de la terminal.
  - <span class="terminal-prompt">secret</span>    : Revela un huevo de pascua especial.`,
    
    about: `Hola, soy <span class="grad-text" style="font-weight:600">Ignasi Gimeno</span>.
Desarrollador Full-Stack con pasión por integrar soluciones de Inteligencia Artificial (LLMs, NLP, RAG, y agentes autónomos) en aplicaciones web del mundo real. 
Especialista en la <u>integración de Python con bases de datos SQL relacionales</u> para procesamiento analítico de datos.`,
    
    skills: `Mi Stack Tecnológico:
  [Frontend] : React, Next.js, Vue, TailwindCSS, TypeScript
  [Backend]  : Node.js, Express, <u>Python + SQL (PostgreSQL) Integration</u>, Redis
  [AI/ML]    : OpenAI API, Gemini API, LangChain, RAG Vector Databases (Pinecone/Chroma)
  [DevOps]   : Docker, Vercel, AWS, Git & GitHub CI/CD`,
    
    projects: `Proyectos Destacados:
  1. <span class="terminal-prompt">ChatBot AI Multiservicio</span> - Asistente SaaS multi-modelo.
  2. <span class="terminal-prompt">DocuMind AI</span> - Sistema RAG para chatear con PDFs e informes financieros.
  3. <span class="terminal-prompt">NeuroMarket</span> - E-commerce con recomendador inteligente de productos.`,
    
    contact: `Contacto & Enlaces:
  - Email    : <span class="terminal-prompt">ignasi.gimeno.dev@gmail.com</span>
  - GitHub   : github.com/ignasi-gimeno-dev
  - LinkedIn : linkedin.com/in/ignasi-gimeno-dev
  - Estado   : Disponible para proyectos freelance y roles full-time.`,
    
    secret: ` █████╗ ███╗   ██╗████████╗██╗ ██████╗ ██████╗  █████╗ ██╗   ██╗██╗████████╗██╗   ██╗
██╔══██╗████╗  ██║╚══██╔══╝██║██╔════╝ ██╔══██╗██╔══██╗██║   ██║██║╚══██╔══╝╚██╗ ██╔╝
███████║██╔██╗ ██║   ██║   ██║██║  ███╗██████╔╝███████║██║   ██║██║   ██║    ╚████╔╝ 
██╔══██║██║╚██╗██║   ██║   ██║██║   ██║██╔══██╗██╔══██║╚██╗ ██╔╝██║   ██║     ╚██╔╝  
██║  ██║██║ ╚████║   ██║   ██║╚██████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║   ██║      ██║   
╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝   ╚═╝      ╚═╝   
                                                                                 
¡Has descubierto la fuerza antigravedad! El desarrollo web no tiene límites cuando usas IA.`
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inputVal = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        // Print original command line
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.innerHTML = `<span class="terminal-prompt">guest@portfolio:~$</span> ${inputVal}`;
        terminalBody.appendChild(cmdLine);

        // Process Command
        if (inputVal === 'clear') {
          // Keep only the welcome instructions or start completely fresh
          terminalBody.innerHTML = '';
        } else if (inputVal === '') {
          // Empty input, do nothing
        } else if (commands[inputVal]) {
          const responseLine = document.createElement('div');
          responseLine.className = 'terminal-line';
          responseLine.innerHTML = commands[inputVal];
          terminalBody.appendChild(responseLine);
        } else {
          const responseLine = document.createElement('div');
          responseLine.className = 'terminal-line';
          responseLine.style.color = '#ef4444';
          responseLine.innerHTML = `Comando no reconocido: "${inputVal}". Escribe <span class="terminal-prompt">help</span> para ver la lista de comandos.`;
          terminalBody.appendChild(responseLine);
        }

        // Scroll terminal to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });

    // Autofocus terminal input when clicking on terminal body
    terminalBody.parentElement.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  // --- SIMULATED AI CHATBOT ---
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send-btn');
  const quickRepliesContainer = document.querySelector('.quick-replies');

  // AI Knowledge Base
  const aiResponses = {
    hola: "¡Hola! Soy el asistente virtual de Ignasi. Estoy especializado en responder preguntas sobre su carrera y habilidades. ¿De qué te gustaría hablar hoy?",
    presentacion: "¡Hola! Soy el asistente virtual de Ignasi. Estoy aquí para contarte sobre su stack de Full-stack, sus integraciones con Inteligencia Artificial, sus proyectos anteriores o cómo puedes contactarlo. ¿En qué puedo ayudarte?",
    proyectos: "Ignasi ha trabajado en diversos proyectos de IA y desarrollo web. Destacan: <br>• <strong>DocuMind AI</strong> (RAG que procesa PDFs con backend Python e <u>integración SQL relacional</u> para historiales).<br>• <strong>SaaS Chat AI Hub</strong> (Una plataforma multi-modelo en Next.js con base de datos PostgreSQL).<br>• <strong>NeuroMarket</strong> (E-commerce inteligente con recomendador predictivo en Python y Redis).<br>¿Te gustaría ver alguno en detalle?",
    stack: "El stack principal de Ignasi incluye:<br>• <strong>Frontend:</strong> React, Next.js, TypeScript y TailwindCSS para interfaces ultrarrápidas.<br>• <strong>Backend & BD:</strong> Node.js, y una fuerte <u>integración de Python con bases de datos SQL (PostgreSQL)</u>.<br>• <strong>IA Integración:</strong> LangChain, VectorDBs (Pinecone, Chroma), APIs de OpenAI y Gemini.<br>Es un stack moderno y enfocado en analítica y automatizaciones.",
    contacto: "Puedes contactar a Ignasi mediante el formulario al final de la página o directamente a través de:<br>• <strong>Email:</strong> ignasi.gimeno.dev@gmail.com<br>• <strong>LinkedIn:</strong> linkedin.com/in/ignasi-gimeno-dev<br>Escríbele y te responderá en menos de 24 horas.",
    contratar: "¡Excelente decisión! Ignasi está disponible para integrarse a equipos en modal remoto, proyectos freelance exigentes o consultoría en IA y bases de datos. Puedes enviarle un mensaje en el formulario o escribirle a: <strong>ignasi.gimeno.dev@gmail.com</strong>.",
    defecto: "Entiendo. Ignasi tiene experiencia en la <u>integración de Python con SQL</u>, desarrollo con LLMs y optimización de bases de datos vectoriales. Si tienes una consulta específica, cuéntame o selecciona una de las respuestas rápidas."
  };

  function getAIMessage(text) {
    const cleanText = text.toLowerCase().trim();
    if (cleanText.includes('hola') || cleanText.includes('buenos') || cleanText.includes('buenas')) {
      return aiResponses.hola;
    }
    if (cleanText.includes('proyecto') || cleanText.includes('portafolio') || cleanText.includes('trabajos')) {
      return aiResponses.proyectos;
    }
    if (cleanText.includes('stack') || cleanText.includes('tecnolog') || cleanText.includes('lenguaje') || cleanText.includes('habilidad')) {
      return aiResponses.stack;
    }
    if (cleanText.includes('contacto') || cleanText.includes('email') || cleanText.includes('correo') || cleanText.includes('redes')) {
      return aiResponses.contacto;
    }
    if (cleanText.includes('contratar') || cleanText.includes('empleo') || cleanText.includes('trabajar') || cleanText.includes('freelance')) {
      return aiResponses.contratar;
    }
    return aiResponses.defecto;
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message message-${sender}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    msgDiv.innerHTML = `
      <div class="message-content">${text}</div>
      <div class="message-meta">${time}</div>
    `;
    
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return msgDiv;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message message-ai typing-indicator-container';
    typingDiv.innerHTML = `
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typingDiv;
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    
    // User message
    appendMessage('user', text);
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    // Simulate AI response delay (800ms - 1500ms)
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      typingIndicator.remove();
      const aiReply = getAIMessage(text);
      appendMessage('ai', aiReply);
    }, delay);
  }

  // Send message on button click
  if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
      const text = chatInput.value;
      if (text.trim()) {
        handleUserMessage(text);
        chatInput.value = '';
      }
    });

    // Send message on Enter key
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = chatInput.value;
        if (text.trim()) {
          handleUserMessage(text);
          chatInput.value = '';
        }
      }
    });
  }

  // Handle Quick Replies click
  if (quickRepliesContainer) {
    quickRepliesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('qr-btn')) {
        const queryText = e.target.textContent;
        handleUserMessage(queryText);
      }
    });
  }

  // Initial welcome message from AI
  if (chatBody) {
    setTimeout(() => {
      appendMessage('ai', aiResponses.presentacion);
    }, 1000);
  }


  // --- PROJECT FILTERING ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // --- SKILLS INTERSECTION OBSERVER ANIMATION ---
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsSection = document.getElementById('skills');

  if (skillBars.length > 0 && skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const percentage = bar.parentElement.previousElementSibling.querySelector('.skill-val').textContent;
            bar.style.width = percentage;
          });
          // Unobserve after animating once
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(skillsSection);
  }


  // --- CONTACT FORM SUBMISSION MOCK ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple HTML validation passes, we simulate server sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      formStatus.style.display = 'none';

      // Simulate network request delay (1.5 seconds)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        formStatus.className = 'form-status success';
        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Ignasi se pondrá en contacto contigo muy pronto.';
        formStatus.style.display = 'block';

        contactForm.reset();
      }, 1500);
    });
  }
});
