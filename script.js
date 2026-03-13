/**
 * ================================================================
 * PORTFOLIO OS — script.js
 * Author  : Krishna Verma
 * Theme   : Cyberpunk Developer Terminal
 * Stack   : Vanilla HTML5 · CSS3 · ES6+ JavaScript
 *
 * FEATURES IMPLEMENTED
 * 1.  Boot Sequence Loader
 * 2.  Terminal Hero Typing Effect
 * 3.  Neural Network Canvas Background
 * 4.  OS File Explorer + Draggable Windows
 * 5.  VS Code Style Project Cards (screenshot ↔ code toggle)
 * 6.  Glitch Header  (CSS only — see style.css)
 * 7.  Neon Hover     (CSS only — see style.css)
 * 8.  Command Palette (Ctrl + K)
 * 9.  Binary Hover Text
 * 10. Live Clock
 * ================================================================
 */

"use strict";

/* ================================================================
   DATA — Projects, Skills, About, Contacts
   Centralised here for easy editing.
================================================================ */

/** @type {Array<{title, desc, tags, emoji, file, code, link}>} */
const PROJECTS = [
  {
    title: "Stock-Portfolio-Risk-Analyzer",
    desc: "A full-featured stock portfolio risk analysis dashboard. Fetches live market data, calculates risk metrics (VaR, Sharpe, Beta), and visualises portfolio performance with interactive charts.",
    tags: ["JavaScript", "Finance", "Charts", "Risk"],
    emoji: "📊",
    file: "risk_analyzer.js",
    link: "https://github.com/spy-in-shadows/Stock-Portfolio-Risk-Analyzer",
    code: `// Stock Portfolio Risk Analyzer
// Value at Risk (VaR) calculation — Historical Simulation method

function calculateVaR(returns, confidenceLevel = 0.95) {
  // Step 1: Sort daily returns in ascending order
  const sorted = [...returns].sort((a, b) => a - b);

  // Step 2: Find the index at the (1 - confidence) percentile
  // e.g. for 95% confidence: look at the bottom 5% of returns
  const index = Math.floor((1 - confidenceLevel) * sorted.length);

  // Step 3: The VaR is the loss at that cutoff point
  const var95 = sorted[index];

  return {
    var95: (var95 * 100).toFixed(2) + '%',
    interpretation: 'With 95% confidence, max 1-day loss will not exceed ' +
                    Math.abs(var95 * 100).toFixed(2) + '%'
  };
}

// Sharpe Ratio = (Portfolio Return - Risk Free Rate) / Std Deviation
function sharpeRatio(returns, riskFreeRate = 0.06 / 252) {
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((s, r) =>
    s + Math.pow(r - mean, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  return ((mean - riskFreeRate) / stdDev * Math.sqrt(252)).toFixed(3);
}`
  },
  {
    title: "AI Galactic Intelligence Engine",
    desc: "AI-powered 3D Galactic Intelligence System built with Three.js, ML, NLP and Graph Intelligence. Visualises cosmic data relationships in an immersive 3D environment.",
    tags: ["Python", "Three.js", "ML", "NLP", "3D"],
    emoji: "🌌",
    file: "galactic_engine.py",
    link: "https://github.com/spy-in-shadows/ai-galactic-intelligence-engine",
    code: `# AI Galactic Intelligence Engine
# Graph-based knowledge representation of cosmic entities

import numpy as np

class GalacticGraph:
    """Represents cosmic entities as nodes in a knowledge graph."""

    def __init__(self):
        self.nodes = {}   # entity_id -> { name, type, embeddings }
        self.edges = []   # (src_id, dst_id, relation, weight)

    def add_entity(self, entity_id, name, entity_type, features):
        """Add a cosmic entity (star, galaxy, black hole) as a node."""
        # Generate a 128-dim embedding from raw astronomical features
        embedding = self._encode_features(features)
        self.nodes[entity_id] = {
            'name': name, 'type': entity_type,
            'embedding': embedding
        }

    def _encode_features(self, features):
        """Map raw features to fixed-size embedding via random projection."""
        W = np.random.randn(len(features), 128) / np.sqrt(128)
        return np.tanh(np.array(features) @ W)

    def find_similar(self, entity_id, top_k=5):
        """Cosine similarity search across all graph nodes."""
        query = self.nodes[entity_id]['embedding']
        scores = {}
        for nid, node in self.nodes.items():
            if nid == entity_id: continue
            dot   = np.dot(query, node['embedding'])
            norms = np.linalg.norm(query) * np.linalg.norm(node['embedding'])
            scores[nid] = dot / (norms + 1e-8)
        return sorted(scores, key=scores.get, reverse=True)[:top_k]`
  },
  {
    title: "Comsic Chronicles",
    desc: "An immersive space-themed interactive web experience with rich animations, cosmic storytelling, and a stunning visual journey through the universe.",
    tags: ["HTML", "CSS", "JavaScript", "Animation"],
    emoji: "🚀",
    file: "cosmic_chronicles.js",
    link: "https://spy-in-shadows.github.io/Comsic_Chronicles/",
    code: `// Cosmic Chronicles — Parallax starfield engine
// Creates a multi-layer depth illusion with canvas particles

const LAYERS = [
  { count: 200, speed: 0.1, size: 0.8, opacity: 0.5 },  // distant stars
  { count: 100, speed: 0.3, size: 1.4, opacity: 0.7 },  // mid stars
  { count:  40, speed: 0.7, size: 2.2, opacity: 1.0 },  // near stars
];

function initStarfield(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Generate stars for each depth layer
  const stars = LAYERS.flatMap(layer =>
    Array.from({ length: layer.count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size:    layer.size,
      speed:   layer.speed,
      opacity: layer.opacity,
    }))
  );

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 10, 0.15)';  // trailing fade
    ctx.fillRect(0, 0, W, H);

    stars.forEach(star => {
      star.y += star.speed;           // move downward (warp effect)
      if (star.y > H) star.y = 0;    // wrap around to top

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + star.opacity + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}`
  },
  {
    title: "balanceShEEt",
    desc: "A business analyst app that creates interactive charts and forecasts financial data. Helps users visualise balance sheets, P&L statements, and predict future trends.",
    tags: ["JavaScript", "Charts", "Finance", "Data"],
    emoji: "💹",
    file: "balance_sheet.js",
    link: "https://github.com/spy-in-shadows/balanceShEEt",
    code: `// balanceShEEt — Linear regression forecasting engine
// Predicts future values from historical financial data

function linearRegression(xVals, yVals) {
  const n  = xVals.length;
  const sx = xVals.reduce((a, b) => a + b, 0);
  const sy = yVals.reduce((a, b) => a + b, 0);

  // Sum of products and sum of squares
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) {
    sxy += xVals[i] * yVals[i];
    sxx += xVals[i] * xVals[i];
  }

  // Slope (m) and intercept (b) via least squares formula
  const m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const b = (sy - m * sx) / n;

  return {
    slope:     m,
    intercept: b,
    // Predict the value at any future quarter x
    predict:   (x) => m * x + b,
    // R-squared goodness-of-fit score
    r2: (() => {
      const yMean = sy / n;
      const ssTot = yVals.reduce((s, y) => s + (y - yMean) ** 2, 0);
      const ssRes = yVals.reduce((s, y, i) =>
        s + (y - (m * xVals[i] + b)) ** 2, 0);
      return (1 - ssRes / ssTot).toFixed(4);
    })()
  };
}`
  },
  {
    title: "Art Gallery Virtual Tour",
    desc: "An immersive 3D virtual art gallery experience. Walk through curated exhibition rooms, interact with artworks, and enjoy a museum-quality tour from any browser.",
    tags: ["JavaScript", "3D", "WebGL", "Interactive"],
    emoji: "�️",
    file: "gallery_tour.js",
    link: "https://github.com/spy-in-shadows/Art-Gallery-Virtual-Tour",
    code: `// Art Gallery Virtual Tour — Room collision detection
// Prevents the camera from walking through gallery walls

class GalleryRoom {
  constructor(bounds) {
    // bounds: { minX, maxX, minZ, maxZ } defining room walls
    this.bounds = bounds;
    this.artworks = [];   // placed artwork objects in this room
  }

  // Check if a proposed camera position is inside the room
  isInsideRoom(x, z, margin = 0.5) {
    const b = this.bounds;
    return (
      x > b.minX + margin &&
      x < b.maxX - margin &&
      z > b.minZ + margin &&
      z < b.maxZ - margin
    );
  }

  // Clamp camera position to stay within walls
  clampPosition(x, z, margin = 0.5) {
    const b = this.bounds;
    return {
      x: Math.max(b.minX + margin, Math.min(b.maxX - margin, x)),
      z: Math.max(b.minZ + margin, Math.min(b.maxZ - margin, z)),
    };
  }

  // Raycast to check if user clicked on an artwork
  getClickedArtwork(ray) {
    return this.artworks.find(art => art.intersectsRay(ray)) || null;
  }
}`
  },
  {
    title: "sci_fi_form",
    desc: "A sleek, futuristic HTML form that is as modern and sci-fi as your imagination. Features glowing inputs, animated validation, and a cyberpunk aesthetic.",
    tags: ["HTML", "CSS", "JavaScript", "UI/UX"],
    emoji: "🛸",
    file: "sci_fi_form.js",
    link: "https://github.com/spy-in-shadows/sci_fi_form",
    code: `// sci_fi_form — Real-time animated field validation
// Each field shows live feedback with neon glow states

const VALIDATORS = {
  name:  { regex: /^[A-Za-z\s]{2,}$/,  msg: 'Full name required'         },
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Invalid email'     },
  code:  { regex: /^[A-Z0-9]{6,10}$/,  msg: '6-10 chars, uppercase only' },
};

function validateField(fieldName, value) {
  const rule = VALIDATORS[fieldName];
  if (!rule) return { valid: true };

  const isValid = rule.regex.test(value.trim());
  return { valid: isValid, message: isValid ? '✓ Looks good' : '✗ ' + rule.msg };
}

// Apply glowing border based on validation state
function applyGlowState(inputEl, state) {
  inputEl.classList.remove('glow-valid', 'glow-invalid', 'glow-idle');

  if (state === 'valid')   inputEl.classList.add('glow-valid');
  if (state === 'invalid') inputEl.classList.add('glow-invalid');
  if (state === 'idle')    inputEl.classList.add('glow-idle');
}

// Wire up live validation on every input in the form
document.querySelectorAll('.sci-fi-input').forEach(input => {
  input.addEventListener('input', () => {
    const result = validateField(input.name, input.value);
    applyGlowState(input, input.value ? (result.valid ? 'valid' : 'invalid') : 'idle');
  });
});`
  }
];

/** @type {Array<{category, skills: Array<{name, level}>}>} */
const SKILLS = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "C++", level: 70 },
    ]
  },
  {
    category: "Problem Solving",
    // `links` array renders as clickable profile cards, not progress bars
    links: [
      {
        platform: "Codeforces",
        icon: "⚔️",
        handle: "spy_in_shadows",
        url: "https://codeforces.com/profile/spy_in_shadows"
      },
      {
        platform: "CodeChef",
        icon: "👨‍🍳",
        handle: "spy_in_shadows",
        url: "https://www.codechef.com/users/spy_in_shadows"
      },
      {
        platform: "LeetCode",
        icon: "🧩",
        handle: "spy_in_shadows",
        url: "https://leetcode.com/u/spy_in_shadows/"
      },
      {
        platform: "AtCoder",
        icon: "🎯",
        handle: "spy_in_shadows",
        url: "https://atcoder.jp/users/spy_in_shadows"
      },
    ]
  },
  {
    category: "Tools & Frameworks",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "Linux / Bash", level: 82 },
    ]
  }
];

const ABOUT = {
  name: "Krishna Verma",
  role: "BTech CSE (AI & ML) · 1st Year",
  bio: `Hello! I'm Krishna — a first-year BTech student specialising in AI & ML at a premier engineering college. I am passionate about building intelligent systems that solve real-world problems using machine learning, computer vision, and data-driven algorithms.`,
  education: "B.Tech CSE (AI & ML), 2025 – 2029 @NST-ADYPU",
  interests: "Competitive Programming · Problem Solving · Open Source · AI & ML",
  quote: `"The best way to predict the future is to invent it." — Alan Kay`
};

const CONTACTS = [
  { icon: "✉️", label: "Email", value: "krishnaias1289@gmail.com", href: "mailto:krishnaias1289@gmail.com" },
  { icon: "🐙", label: "GitHub", value: "github.com/spy-in-shadows", href: "https://github.com/spy-in-shadows" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/krishna-verma-2025-2029-cse", href: "https://www.linkedin.com/in/krishna-verma-2025-2029-cse/" },
  { icon: "🐦", label: "Twitter/X", value: "@ItsMeKrishnaV", href: "https://x.com/ItsMeKrishnaV" },
];

/* ================================================================
   FEATURE 1 — BOOT SEQUENCE LOADER
   Algorithm:
     1. Create an array of boot message strings
     2. Loop through array with an increasing delay (index × delay)
     3. Append each line as a DOM element
     4. After all lines are shown (+800ms), fade out loader
     5. Remove loader from DOM after fade transition completes
================================================================ */

/** Messages shown during the simulated boot sequence */
const BOOT_MESSAGES = [
  "[BIOS] POST check complete...",
  "[OK]   Loading GRUB bootloader...",
  "[OK]   Mounting /dev/sda1 → Portfolio OS",
  "[OK]   Initialising Kernel v6.1.0-ai...",
  "[OK]   Loading AI_ML_Modules...",
  "[OK]   Starting neural-interface.service...",
  "[OK]   Mounting /Projects/dev/sda1...",
  "[OK]   Establishing encrypted connection...",
  "[OK]   Calibrating NeuralCanvas renderer...",
  "[OK]   Loading personality_matrix.json...",
  "[OK]   Compiling syntax_highlighter.wasm...",
  "[OK]   Mounting /Skills → OK",
  "[OK]   Mounting /About  → OK",
  "[OK]   Mounting /Contact → OK",
  "[DONE] All systems operational.",
  "[DONE] Starting Portfolio OS..."
];

/**
 * Runs the boot sequence animation.
 * Uses setTimeout with incrementing delays to stagger each line.
 * After the last line, waits 800ms then fades out the loader.
 */
function runBootSequence() {
  const loader = document.getElementById("boot-loader");
  const msgBox = document.getElementById("boot-messages");
  const cursor = document.getElementById("boot-cursor");

  const LINE_DELAY = 130;   // ms between each boot message line

  // Loop through every message and schedule its DOM insertion
  BOOT_MESSAGES.forEach(function (msg, index) {
    setTimeout(function () {
      // Create a new paragraph element for this line
      const line = document.createElement("p");
      line.classList.add("boot-line");
      line.textContent = msg;
      msgBox.appendChild(line);

      // Auto-scroll to show the latest line
      msgBox.scrollTop = msgBox.scrollHeight;
    }, index * LINE_DELAY);
  });

  // Calculate total time for all lines to appear
  const totalBootTime = BOOT_MESSAGES.length * LINE_DELAY + 800;

  // After all lines, fade out and remove the loader
  setTimeout(function () {
    cursor.style.display = "none";           // hide cursor
    loader.classList.add("fade-out");        // trigger CSS opacity transition

    // Wait for fade transition (800ms in CSS), then fully remove
    setTimeout(function () {
      loader.remove();
      // Reveal the main application
      document.getElementById("app").classList.remove("hidden");
      // Start all other features
      initApp();
    }, 900);
  }, totalBootTime);
}

/* ================================================================
   FEATURE 2 — TERMINAL HERO TYPING EFFECT
   Algorithm:
     1. Take a target string
     2. Use setTimeout loop: print one character at a time
     3. Each cycle: str.substring(0, currentIndex + 1)
     4. After full string typed → call onComplete callback
================================================================ */

/**
 * Types a string character-by-character into a DOM element.
 *
 * @param {HTMLElement} el          - Element to type into
 * @param {string}      text        - String to type
 * @param {number}      speed       - Delay in ms between each character
 * @param {Function}    onComplete  - Callback when typing is done
 */
function typeWriter(el, text, speed, onComplete) {
  let charIndex = 0;    // current character position

  function typeNextChar() {
    if (charIndex < text.length) {
      // Add one more character using substring
      el.textContent = text.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeNextChar, speed);   // schedule next character
    } else {
      // All characters typed — trigger callback
      if (typeof onComplete === "function") onComplete();
    }
  }

  typeNextChar();   // kick off the recursive typing chain
}

/**
 * Runs the full terminal hero typing sequence.
 * Each line appears sequentially using callbacks (no Promises needed).
 */
function runTerminalTyping() {
  // Grab all the DOM elements we'll be typing into
  const cmdEl1 = document.getElementById("type-command-1");
  const cursor1 = document.getElementById("cursor-1");
  const resp1 = document.getElementById("response-block-1");
  const resp1a = document.getElementById("response-1a");
  const resp1b = document.getElementById("response-1b");
  const resp1c = document.getElementById("response-1c");

  const cmdLine2 = document.getElementById("cmd-line-2");
  const cmdEl2 = document.getElementById("type-command-2");
  const cursor2 = document.getElementById("cursor-2");
  const resp2 = document.getElementById("response-block-2");
  const resp2a = document.getElementById("response-2a");
  const resp2b = document.getElementById("response-2b");

  // Step 1: Type "whoami" command
  typeWriter(cmdEl1, "whoami", 80, function () {
    cursor1.style.display = "none";   // stop blinking cursor after typing

    // Step 2: Show response lines after short pause
    setTimeout(function () {
      resp1.classList.remove("hidden");
      typeWriter(resp1a, "Krishna Verma", 35, function () {
        typeWriter(resp1b, "BTech CSE (AI & ML) · 1st Year", 35, function () {
          typeWriter(resp1c, "AI Engineer | Problem Solver | Builder", 35, function () {

            // Step 3: Show second command line after pause
            setTimeout(function () {
              cmdLine2.classList.remove("hidden");
              typeWriter(cmdEl2, "ls -la /interests", 80, function () {
                cursor2.style.display = "none";

                setTimeout(function () {
                  resp2.classList.remove("hidden");
                  typeWriter(resp2a, "Neural Networks · Machine Learning · Computer Vision", 25, function () {
                    typeWriter(resp2b, "Algorithms · Open Source · Building Cool Things", 25, null);
                  });
                }, 300);
              });
            }, 500);
          });
        });
      });
    }, 300);
  });
}

/* ================================================================
   FEATURE 3 — NEURAL NETWORK CANVAS BACKGROUND
   Algorithm:
     1. Generate N particles (neurons), each with { x, y, vx, vy }
     2. Every frame (requestAnimationFrame):
        a. Move each particle by its velocity
        b. Bounce off canvas edges (reverse velocity component)
        c. For every pair of particles, compute Euclidean distance
        d. If distance < MAX_DIST: draw a line with alpha ∝ distance
        e. If mouse is within MAX_DIST of a particle: bright line to cursor
     3. Draw each particle as a glowing circle
================================================================ */

/** Holds mouse position for interaction */
const mouse = { x: -9999, y: -9999 };

/** Neural network settings */
const NN_CONFIG = {
  particleCount: 80,    // number of neurons
  maxDist: 120,   // max px to draw connection line
  radius: 2.5,   // neuron circle radius
  speed: 0.5,   // max velocity component
  lineWidth: 0.6,   // connection line width
  mouseRadius: 140,   // mouse attraction radius
};

/**
 * Creates a single particle with random position and velocity.
 * @param {number} w - Canvas width
 * @param {number} h - Canvas height
 * @returns {{ x, y, vx, vy }}
 */
function createParticle(w, h) {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * NN_CONFIG.speed * 2,  // range: -speed to +speed
    vy: (Math.random() - 0.5) * NN_CONFIG.speed * 2,
  };
}

/**
 * Computes Euclidean distance between two 2D points.
 * Formula: sqrt( (x2-x1)^2 + (y2-y1)^2 )
 * @returns {number}
 */
function dist(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Initialises and starts the neural network canvas animation.
 */
function initNeuralCanvas() {
  const canvas = document.getElementById("neural-canvas");
  const ctx = canvas.getContext("2d");

  /** Resize canvas to fill its parent section */
  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Generate initial set of particles
  let particles = Array.from({ length: NN_CONFIG.particleCount }, () =>
    createParticle(canvas.width, canvas.height)
  );

  /**
   * Main animation loop — called by requestAnimationFrame ~60fps.
   * This is a pure function of time: clear → update → draw.
   */
  function animationLoop() {
    const W = canvas.width;
    const H = canvas.height;

    // --- CLEAR the canvas each frame ---
    ctx.clearRect(0, 0, W, H);

    // --- UPDATE each particle position ---
    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off left/right edges: flip horizontal velocity
      if (p.x < 0 || p.x > W) p.vx *= -1;

      // Bounce off top/bottom edges: flip vertical velocity
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Keep particle strictly within bounds
      p.x = Math.max(0, Math.min(W, p.x));
      p.y = Math.max(0, Math.min(H, p.y));
    });

    // --- DRAW connections between nearby particles ---
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);

        if (d < NN_CONFIG.maxDist) {
          // Alpha inversely proportional to distance: closer = more opaque
          const alpha = 1 - (d / NN_CONFIG.maxDist);

          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 255, 159, ${alpha * 0.4})`;
          ctx.lineWidth = NN_CONFIG.lineWidth;
          ctx.stroke();
        }
      }

      // --- DRAW mouse connections (interactive feature) ---
      const dMouse = dist(particles[i].x, particles[i].y, mouse.x, mouse.y);
      if (dMouse < NN_CONFIG.mouseRadius) {
        const alpha = 1 - (dMouse / NN_CONFIG.mouseRadius);
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(255, 0, 255, ${alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // --- DRAW each particle (neuron) as a glowing circle ---
    particles.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, NN_CONFIG.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 159, 0.85)";
      ctx.fill();

      // Soft glow using a second, larger semi-transparent circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, NN_CONFIG.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 159, 0.05)";
      ctx.fill();
    });

    // Schedule the next frame — this is the animation loop
    requestAnimationFrame(animationLoop);
  }

  animationLoop();   // start the loop
}

// Track mouse position relative to the window for canvas interaction
document.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

/* ================================================================
   FEATURE 4 — OS FILE EXPLORER + DRAGGABLE WINDOWS
   Algorithm (dragging):
     1. On mousedown on title bar: record offset of cursor within window
     2. On mousemove: set window.left = cursor.x − offsetX
                              window.top  = cursor.y − offsetY
     3. On mouseup: stop tracking
================================================================ */

/** Tracks which window is currently being dragged */
let dragging = {
  el: null,   // the .os-window element
  offsetX: 0,
  offsetY: 0,
};

/**
 * Opens or focuses a named window.
 * @param {string} windowId - e.g. "projects", "skills"
 */
function openWindow(windowId) {
  const win = document.getElementById("window-" + windowId);
  if (!win) return;

  win.classList.remove("hidden");
  bringToFront(win);
  addTaskbarEntry(windowId);

  // Populate content if not already done
  populateWindow(windowId);
}

/**
 * Closes (hides) a window and removes its taskbar entry.
 * @param {string} windowId
 */
function closeWindow(windowId) {
  const win = document.getElementById("window-" + windowId);
  if (win) win.classList.add("hidden");
  removeTaskbarEntry(windowId);
}

/** Makes a window the top-most by setting a high z-index */
let zCounter = 500;
function bringToFront(winEl) {
  zCounter++;
  winEl.style.zIndex = zCounter;
  // Remove focused class from all windows, add to this one
  document.querySelectorAll(".os-window").forEach(w => w.classList.remove("focused"));
  winEl.classList.add("focused");
}

/**
 * Sets up drag behaviour on a window via its title bar.
 * @param {HTMLElement} win      - The .os-window element
 * @param {HTMLElement} titlebar - The title bar to drag from
 */
function makeDraggable(win, titlebar) {
  titlebar.addEventListener("mousedown", function (e) {
    // Don't drag when clicking the control buttons
    if (e.target.classList.contains("win-btn")) return;

    bringToFront(win);

    dragging.el = win;
    // offsetX = how far from the window's left edge the cursor is
    dragging.offsetX = e.clientX - win.getBoundingClientRect().left;
    dragging.offsetY = e.clientY - win.getBoundingClientRect().top;

    e.preventDefault();   // prevent text selection while dragging
  });
}

// Global mousemove: update dragging window position
document.addEventListener("mousemove", function (e) {
  if (!dragging.el) return;

  // Windows use fixed positioning, so set left/top directly
  dragging.el.style.left = (e.clientX - dragging.offsetX) + "px";
  dragging.el.style.top = (e.clientY - dragging.offsetY) + "px";
  dragging.el.style.transform = "none";   // disable the CSS centering transform
});

// Global mouseup: stop dragging
document.addEventListener("mouseup", function () {
  dragging.el = null;
});

/**
 * Wires up all folder clicks and window close buttons.
 */
function initWindowSystem() {
  // FOLDER clicks → open corresponding window
  document.querySelectorAll(".folder").forEach(function (folder) {
    const windowId = folder.getAttribute("data-window");

    folder.addEventListener("click", function () { openWindow(windowId); });
    folder.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") openWindow(windowId);
    });
  });

  // CLOSE buttons → close window
  document.querySelectorAll(".btn-close").forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeWindow(btn.getAttribute("data-window"));
    });
  });

  // Make each window draggable via its title bar
  ["projects", "skills", "about", "contact"].forEach(function (id) {
    const win = document.getElementById("window-" + id);
    const titlebar = document.getElementById("titlebar-" + id);
    if (win && titlebar) makeDraggable(win, titlebar);

    // Click anywhere on window to bring it to front
    if (win) {
      win.addEventListener("mousedown", function () { bringToFront(win); });
    }
  });
}

/* ================================================================
   FEATURE 5 — VS CODE PROJECT CARDS (screenshot ↔ code toggle)
   Builds project cards and injects them into #projects-body.
   Each card has:
     • VS Code title bar (3 coloured dots)
     • Screenshot view (emoji placeholder)
     • Code snippet view (with lightweight syntax highlighting)
     • Toggle button that flips between the two views
================================================================ */

/**
 * Applies simple syntax highlighting by wrapping known patterns
 * in <span> elements with CSS token classes.
 * This is a lightweight regex-based approach, not a full parser.
 *
 * @param {string} code - Raw code string
 * @returns {string} HTML string with highlighted spans
 */
function highlightCode(code) {
  // Step 1: Escape HTML special characters FIRST to prevent XSS
  // and avoid regex matches on HTML entity names.
  code = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Step 2: Highlight strings BEFORE comments so quoted # chars
  // inside strings are not treated as comment starts.
  code = code.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    '<span class="token-string">$1</span>');

  // Step 3: Python-style comments (# at start of token, not inside entities)
  // Use word boundary / line start approach to avoid matching &amp; etc.
  code = code.replace(/((?:^|\s)(#[^\n]*))/gm, function (match, p1, p2) {
    return p1.replace(p2, '<span class="token-comment">' + p2 + '</span>');
  });

  // Step 4: JS-style // comments
  code = code.replace(/(\/\/[^\n]*)/g, '<span class="token-comment">$1</span>');

  // Step 5: Keywords
  code = code.replace(
    /\b(function|return|if|else|while|for|let|const|var|class|import|from|of|new|this|true|false|null|undefined|def|as|in|and|or|not|yield|async|await)\b/g,
    '<span class="token-keyword">$1</span>'
  );

  // Step 6: Numbers
  code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>');

  // Step 7: Function calls (word followed by open paren)
  code = code.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g,
    '<span class="token-function">$1</span>');

  return code;
}

/**
 * Builds a project card DOM element.
 * @param {Object} project - A project data object from PROJECTS array
 * @returns {HTMLElement}
 */
function buildProjectCard(project) {
  const card = document.createElement("div");
  card.classList.add("project-card");

  // --- Title bar (VS Code style) ---
  const titlebar = document.createElement("div");
  titlebar.classList.add("card-titlebar");
  titlebar.innerHTML = `
    <span class="card-dot dot-r"></span>
    <span class="card-dot dot-y"></span>
    <span class="card-dot dot-g"></span>
    <span class="card-filename">${project.file}</span>
    <button class="card-toggle-btn neon-btn" aria-label="Toggle code view">⬡ Toggle</button>
  `;

  // --- Screenshot (placeholder with emoji) ---
  const screenshotView = document.createElement("div");
  screenshotView.classList.add("card-screenshot-view");
  screenshotView.innerHTML = `
    <div class="card-screenshot-placeholder">${project.emoji}</div>
  `;

  // --- Code view ---
  const codeView = document.createElement("div");
  codeView.classList.add("card-code-view");
  codeView.innerHTML = `<pre><code>${highlightCode(project.code)}</code></pre>`;

  // --- Info footer ---
  const info = document.createElement("div");
  info.classList.add("card-info");
  info.innerHTML = `
    <div class="card-title">${project.title}</div>
    <div class="card-desc">${project.desc}</div>
    <div class="card-tags">
      ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
    </div>
    ${project.link
      ? `<a class="card-github-link neon-btn" href="${project.link}" target="_blank" rel="noopener noreferrer">⬡ View on GitHub</a>`
      : ""}
  `;


  card.appendChild(titlebar);
  card.appendChild(screenshotView);
  card.appendChild(codeView);
  card.appendChild(info);

  // --- TOGGLE logic: clicking the button switches between views ---
  const toggleBtn = titlebar.querySelector(".card-toggle-btn");
  let showingCode = false;

  toggleBtn.addEventListener("click", function () {
    showingCode = !showingCode;

    if (showingCode) {
      screenshotView.classList.add("hidden-view");
      codeView.classList.add("active");
      toggleBtn.textContent = "⬡ Preview";
    } else {
      screenshotView.classList.remove("hidden-view");
      codeView.classList.remove("active");
      toggleBtn.textContent = "⬡ Toggle";
    }
  });

  return card;
}

/* ================================================================
   CONTENT POPULATION
   Called once per window when it is first opened.
================================================================ */

/** Track which windows have already been populated */
const populated = {};

/**
 * Fills a window's body with the appropriate content.
 * @param {string} windowId
 */
function populateWindow(windowId) {
  if (populated[windowId]) return;   // don't re-render
  populated[windowId] = true;

  if (windowId === "projects") populateProjects();
  if (windowId === "skills") populateSkills();
  if (windowId === "about") populateAbout();
  if (windowId === "contact") populateContact();
}

/** Renders all project cards into the Projects window */
function populateProjects() {
  const body = document.getElementById("projects-body");
  body.innerHTML = "";
  PROJECTS.forEach(function (proj) {
    body.appendChild(buildProjectCard(proj));
  });
}

/** Renders skill categories with animated progress bars */
function populateSkills() {
  const body = document.getElementById("skills-body");
  body.innerHTML = "";

  SKILLS.forEach(function (cat) {
    const catEl = document.createElement("div");
    catEl.classList.add("skill-category");
    catEl.innerHTML = `<div class="skill-category-title">${cat.category}</div>`;

    // ── Branch A: categories with a `links` array → profile link cards ──
    if (cat.links) {
      const grid = document.createElement("div");
      grid.classList.add("cp-profile-grid");

      cat.links.forEach(function (link) {
        // Each platform is an anchor that opens in a new tab
        const card = document.createElement("a");
        card.classList.add("cp-profile-card");
        card.href = link.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.innerHTML = `
          <span class="cp-platform-icon">${link.icon}</span>
          <div class="cp-platform-info">
            <span class="cp-platform-name">${link.platform}</span>
            <span class="cp-platform-handle">@${link.handle}</span>
          </div>
          <span class="cp-arrow">→</span>
        `;
        grid.appendChild(card);
      });

      catEl.appendChild(grid);

      // ── Branch B: categories with a `skills` array → progress bars ──
    } else if (cat.skills) {
      const list = document.createElement("div");
      list.classList.add("skill-list");

      cat.skills.forEach(function (skill) {
        const item = document.createElement("div");
        item.classList.add("skill-item");
        item.innerHTML = `
          <span class="skill-name">${skill.name}</span>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" data-level="${skill.level}"></div>
          </div>
          <span class="skill-percent">${skill.level}%</span>
        `;
        list.appendChild(item);
      });

      catEl.appendChild(list);
    }

    body.appendChild(catEl);
  });

  // Animate progress bars after layout settles
  requestAnimationFrame(function () {
    setTimeout(function () {
      document.querySelectorAll(".skill-bar-fill").forEach(function (bar) {
        bar.style.width = bar.getAttribute("data-level") + "%";
      });
    }, 100);
  });
}

/** Renders the About section */
function populateAbout() {
  const body = document.getElementById("about-body");
  body.innerHTML = `
    <div class="about-header">
      <div class="about-avatar">👨‍💻</div>
      <div>
        <div class="about-name">${ABOUT.name}</div>
        <div class="about-role">${ABOUT.role}</div>
      </div>
    </div>
    <div class="about-section">
      <div class="about-section-title">Biography</div>
      <p>${ABOUT.bio}</p>
    </div>
    <div class="about-section">
      <div class="about-section-title">Education</div>
      <p>${ABOUT.education}</p>
    </div>
    <div class="about-section">
      <div class="about-section-title">Interests</div>
      <p>${ABOUT.interests}</p>
    </div>
    <div class="about-section">
      <div class="about-section-title">Quote</div>
      <p>${ABOUT.quote}</p>
    </div>
  `;
}

/** Renders the Contact section */
function populateContact() {
  const body = document.getElementById("contact-body");
  body.innerHTML = CONTACTS.map(function (c) {
    return `
      <a class="contact-item" href="${c.href}" target="_blank" rel="noopener noreferrer">
        <span class="contact-icon">${c.icon}</span>
        <div>
          <div class="contact-label">${c.label}</div>
          <div class="contact-value">${c.value}</div>
        </div>
      </a>
    `;
  }).join("");
}

/* ================================================================
   TASKBAR — Show open windows in the bottom taskbar
================================================================ */

/**
 * Adds a window button to the taskbar.
 * @param {string} id - Window ID (e.g. "projects")
 */
function addTaskbarEntry(id) {
  // Avoid duplicate entries
  if (document.getElementById("tb-" + id)) return;

  const bar = document.getElementById("taskbar-items");
  const btn = document.createElement("button");
  btn.id = "tb-" + id;
  btn.className = "taskbar-window-btn active-window";
  btn.textContent = "📁 " + id.charAt(0).toUpperCase() + id.slice(1);

  btn.addEventListener("click", function () {
    const win = document.getElementById("window-" + id);
    if (win && win.classList.contains("hidden")) {
      win.classList.remove("hidden");
    }
    bringToFront(win);
  });

  bar.appendChild(btn);
}

/**
 * Removes a window's taskbar button.
 * @param {string} id
 */
function removeTaskbarEntry(id) {
  const btn = document.getElementById("tb-" + id);
  if (btn) btn.remove();
}

/* ================================================================
   LIVE CLOCK
================================================================ */
function updateClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}

/* ================================================================
   FEATURE 8 — COMMAND PALETTE (Ctrl + K)
   Algorithm:
     1. Listen for Ctrl + K keydown
     2. Show the palette overlay and focus the input
     3. On each keyup in input: filter COMMANDS array by label
     4. Re-render the list of filtered results
     5. On Enter or click: execute the command's action function
     6. Track active item index for keyboard arrow navigation
================================================================ */

/** All available commands */
const COMMANDS = [
  { icon: "📁", label: "Projects", shortcut: "P", action: function () { openWindow("projects"); } },
  { icon: "⚡", label: "Skills", shortcut: "S", action: function () { openWindow("skills"); } },
  { icon: "👋", label: "About", shortcut: "A", action: function () { openWindow("about"); } },
  { icon: "✉️", label: "Contact", shortcut: "C", action: function () { openWindow("contact"); } },
  { icon: "⬇", label: "Resume", shortcut: "R", action: function () { alert("📄 Resume download would open here!"); } },
  {
    icon: "🔄", label: "Close All", shortcut: "X", action: function () {
      ["projects", "skills", "about", "contact"].forEach(closeWindow);
    }
  },
];

let cpActiveIndex = 0;   // currently highlighted command index

/**
 * Renders the filtered list of commands into the palette's <ul>.
 * @param {Array} filtered - Subset of COMMANDS to display
 */
function renderCommandList(filtered) {
  const list = document.getElementById("cp-results");
  list.innerHTML = "";
  cpActiveIndex = 0;

  if (filtered.length === 0) {
    list.innerHTML = `<li class="cp-item" style="color:var(--text-dim)">No commands found</li>`;
    return;
  }

  filtered.forEach(function (cmd, idx) {
    const li = document.createElement("li");
    li.classList.add("cp-item");
    if (idx === 0) li.classList.add("active");   // highlight first item
    li.innerHTML = `
      <span class="cp-item-icon">${cmd.icon}</span>
      <span class="cp-item-label">${cmd.label}</span>
      <span class="cp-item-shortcut">${cmd.shortcut}</span>
    `;
    // Click executes the command and closes palette
    li.addEventListener("click", function () {
      cmd.action();
      closePalette();
    });
    list.appendChild(li);
  });
}

function openPalette() {
  const overlay = document.getElementById("command-palette-overlay");
  const input = document.getElementById("cp-input");
  overlay.classList.remove("hidden");
  input.value = "";
  input.focus();
  renderCommandList(COMMANDS);   // show all commands initially
}

function closePalette() {
  document.getElementById("command-palette-overlay").classList.add("hidden");
}

function initCommandPalette() {
  const overlay = document.getElementById("command-palette-overlay");
  const input = document.getElementById("cp-input");

  // Ctrl + K → open palette
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();    // stop browser default (focus address bar)
      openPalette();
    }
    if (e.key === "Escape") closePalette();
  });

  // Click outside palette panel → close
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePalette();
  });

  // Filter commands as user types
  input.addEventListener("input", function () {
    const query = input.value.toLowerCase().trim();
    const filtered = COMMANDS.filter(cmd =>
      cmd.label.toLowerCase().includes(query)
    );
    renderCommandList(filtered);
  });

  // Keyboard navigation inside palette
  input.addEventListener("keydown", function (e) {
    const items = document.querySelectorAll(".cp-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      items[cpActiveIndex].classList.remove("active");
      cpActiveIndex = (cpActiveIndex + 1) % items.length;
      items[cpActiveIndex].classList.add("active");
      items[cpActiveIndex].scrollIntoView({ block: "nearest" });
      e.preventDefault();
    }

    if (e.key === "ArrowUp") {
      items[cpActiveIndex].classList.remove("active");
      cpActiveIndex = (cpActiveIndex - 1 + items.length) % items.length;
      items[cpActiveIndex].classList.add("active");
      items[cpActiveIndex].scrollIntoView({ block: "nearest" });
      e.preventDefault();
    }

    if (e.key === "Enter") {
      items[cpActiveIndex].click();   // trigger the click handler
    }
  });
}

/* ================================================================
   FEATURE 9 — BINARY HOVER TEXT
   Algorithm:
     1. Scan specified elements for target keywords
     2. Wrap each keyword in a <span class="binary-word">
     3. On mouseenter: convert text to binary (charCodeAt → toString(2))
     4. On mouseleave: restore original text
     5. Each character code is padded to 8 bits with padStart(8,"0")
================================================================ */

/** Words to convert to binary when hovered */
const BINARY_WORDS = ["AI", "ML", "JavaScript", "Algorithms", "Neural", "Deep", "Python"];

/**
 * Converts a string to its binary representation.
 * Each character → ASCII code → 8-bit binary string
 *
 * Example: "AI" → "01000001 01001001"
 *
 * @param {string} str
 * @returns {string}
 */
function toBinary(str) {
  return str
    .split("")                                       // ["A", "I"]
    .map(char => char.charCodeAt(0)                  // [65, 73]
      .toString(2)                    // ["1000001", "1001001"]
      .padStart(8, "0"))              // ["01000001", "01001001"]
    .join(" ");                                      // "01000001 01001001"
}

/**
 * Wraps every occurrence of the target words in the given element
 * with a <span class="binary-word"> that toggles on hover.
 * @param {HTMLElement} container
 */
function applyBinaryHover(container) {
  // Walk all TEXT nodes (not element nodes) inside the container
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,   // only text nodes
    null
  );

  const nodesToProcess = [];
  while (walker.nextNode()) {
    nodesToProcess.push(walker.currentNode);
  }

  nodesToProcess.forEach(function (textNode) {
    const text = textNode.nodeValue;

    // Build a regex that matches any of our target words (word boundary)
    const pattern = new RegExp("\\b(" + BINARY_WORDS.join("|") + ")\\b", "g");

    if (!pattern.test(text)) return;   // skip if no match in this node
    pattern.lastIndex = 0;             // reset regex state after test()

    // Create a temporary container to hold new HTML
    const temp = document.createElement("span");
    temp.innerHTML = text.replace(pattern, function (match) {
      return `<span class="binary-word" data-original="${match}">${match}</span>`;
    });

    // Replace the old text node with the new span containing sub-spans
    textNode.parentNode.replaceChild(temp, textNode);
  });

  // Attach hover listeners to the newly created .binary-word spans
  container.querySelectorAll(".binary-word").forEach(function (span) {
    const original = span.getAttribute("data-original");
    const binary = toBinary(original);

    span.addEventListener("mouseenter", function () {
      span.textContent = binary;
    });

    span.addEventListener("mouseleave", function () {
      span.textContent = original;
    });
  });
}

/* ================================================================
   APP INIT — called after boot sequence completes
================================================================ */
function initApp() {
  // Start live clock
  updateClock();
  setInterval(updateClock, 1000);

  // Start neural network canvas
  initNeuralCanvas();

  // Start terminal typing effect
  setTimeout(runTerminalTyping, 400);

  // Set up folder click → window system
  initWindowSystem();

  // Set up command palette (Ctrl + K)
  initCommandPalette();

  // Apply binary hover to response lines (where the keywords appear)
  // We wait a moment so the typewriter has time to populate them
  setTimeout(function () {
    const respLines = document.querySelectorAll(".response-line");
    respLines.forEach(applyBinaryHover);
  }, 6000);   // 6s gives typing sequence time to finish

  // Resume button
  document.getElementById("resume-btn").addEventListener("click", function () {
    alert("📄 Resume download would open here!\nAdd your PDF link to the CONTACTS array.");
  });
}

/* ================================================================
   ENTRY POINT — everything starts here
================================================================ */
document.addEventListener("DOMContentLoaded", function () {
  runBootSequence();
});
