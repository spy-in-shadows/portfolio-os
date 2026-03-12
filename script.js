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

/** @type {Array<{title, desc, tags, emoji, file, code}>} */
const PROJECTS = [
  {
    title: "NeuralVision",
    desc: "Real-time object detection system built with Python & OpenCV. Uses custom-trained YOLO model for edge deployment on Raspberry Pi.",
    tags: ["Python", "OpenCV", "YOLO", "AI"],
    emoji: "🤖",
    file: "neural_vision.py",
    code: `# NeuralVision — Object Detection Pipeline
import cv2
import numpy as np

def load_model(weights_path):
    """Load YOLO model from disk."""
    net = cv2.dnn.readNet(weights_path)
    net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
    return net

def detect_objects(frame, net, threshold=0.5):
    """Run forward pass and extract bounding boxes."""
    blob = cv2.dnn.blobFromImage(
        frame, 1/255.0, (416, 416),
        swapRB=True, crop=False
    )
    net.setInput(blob)
    outputs = net.forward()

    boxes, confidences = [], []
    for detection in outputs:
        score = detection[5:]
        class_id = np.argmax(score)
        confidence = score[class_id]
        if confidence > threshold:
            cx, cy, w, h = (detection[0:4] * np.array([
                frame.shape[1], frame.shape[0],
                frame.shape[1], frame.shape[0]
            ])).astype(int)
            boxes.append([cx - w//2, cy - h//2, w, h])
            confidences.append(float(confidence))
    return boxes, confidences`
  },
  {
    title: "AlgoTrader",
    desc: "Algorithmic stock trading bot using reinforcement learning. Backtested on 5 years of NSE data with Sharpe ratio > 1.8.",
    tags: ["Python", "RL", "Finance", "ML"],
    emoji: "📈",
    file: "algo_trader.py",
    code: `# AlgoTrader — RL-based Trading Agent
import numpy as np

class TradingEnv:
    """Custom OpenAI Gym-style environment for stock trading."""
    def __init__(self, prices, initial_balance=100000):
        self.prices = prices
        self.balance = initial_balance
        self.position = 0   # shares held
        self.step_idx = 0

    def reset(self):
        self.balance = 100000
        self.position = 0
        self.step_idx = 0
        return self._get_state()

    def _get_state(self):
        """Return a feature vector for the RL agent."""
        window = self.prices[max(0, self.step_idx-10):self.step_idx+1]
        returns = np.diff(window) / window[:-1]
        return np.array([
            self.balance / 100000,
            self.position,
            *returns[-5:]          # last 5 daily returns
        ])

    def step(self, action):
        """action: 0=hold, 1=buy, 2=sell"""
        price = self.prices[self.step_idx]
        reward = 0
        if action == 1 and self.balance >= price:
            self.position += 1
            self.balance  -= price
        elif action == 2 and self.position > 0:
            self.position -= 1
            self.balance  += price
            reward = price - self.prices[self.step_idx - 1]
        self.step_idx += 1
        done = self.step_idx >= len(self.prices) - 1
        return self._get_state(), reward, done`
  },
  {
    title: "LingualAI",
    desc: "Multi-language translator using Transformer architecture from scratch. Trained on parallel corpora for English ↔ Hindi.",
    tags: ["Python", "Transformers", "NLP", "Deep Learning"],
    emoji: "🌐",
    file: "lingual_ai.js",
    code: `// LingualAI — Attention is All You Need (simplified)
// Scaled Dot-Product Attention

function scaledDotAttention(Q, K, V, dk) {
  // Step 1: Compute raw scores  Q · K^T
  const scores = matMul(Q, transpose(K));

  // Step 2: Scale by sqrt(dk) to prevent vanishing gradients
  const scaled = scores.map(row =>
    row.map(val => val / Math.sqrt(dk))
  );

  // Step 3: Softmax across the key dimension
  const weights = scaled.map(row => softmax(row));

  // Step 4: Weighted sum of values
  return matMul(weights, V);
}

function softmax(arr) {
  const max = Math.max(...arr);          // numerical stability trick
  const exps = arr.map(x => Math.exp(x - max));
  const sum  = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}`
  },
  {
    title: "SortViz",
    desc: "Interactive sorting algorithm visualiser with step-by-step animation. Supports Merge, Quick, Heap and Radix sort.",
    tags: ["JavaScript", "Canvas", "Algorithms", "DSA"],
    emoji: "🔢",
    file: "sort_viz.js",
    code: `// SortViz — Merge Sort with Generator for step-by-step viz
// Using JS Generators lets us pause/resume the sort

function* mergeSort(arr, l = 0, r = arr.length - 1) {
  if (l >= r) return;

  const mid = Math.floor((l + r) / 2);

  // Recursively sort both halves
  yield* mergeSort(arr, l, mid);
  yield* mergeSort(arr, mid + 1, r);

  // Merge the sorted halves
  yield* merge(arr, l, mid, r);
}

function* merge(arr, l, mid, r) {
  const left  = arr.slice(l, mid + 1);
  const right = arr.slice(mid + 1, r + 1);
  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    // Highlight comparison — yield so renderer can draw
    yield { comparing: [l + i, mid + 1 + j] };

    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    yield { arr: [...arr] };      // yield updated array state
  }
  // Copy remaining elements
  while (i < left.length) { arr[k++] = left[i++]; yield { arr: [...arr] }; }
  while (j < right.length) { arr[k++] = right[j++]; yield { arr: [...arr] }; }
}`
  }
];

/** @type {Array<{category, skills: Array<{name, level}>}>} */
const SKILLS = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "C++", level: 70 },
      { name: "SQL", level: 65 },
    ]
  },
  {
    category: "AI / ML",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "Deep Learning", level: 80 },
      { name: "Computer Vision", level: 75 },
      { name: "NLP", level: 72 },
    ]
  },
  {
    category: "Tools & Frameworks",
    skills: [
      { name: "TensorFlow", level: 78 },
      { name: "PyTorch", level: 75 },
      { name: "Git / GitHub", level: 88 },
      { name: "Linux / Bash", level: 82 },
    ]
  }
];

const ABOUT = {
  name: "Krishna Verma",
  role: "BTech CSE (AI & ML) · 1st Year",
  bio: `Hello! I'm Krishna — a first-year BTech student specialising in AI & ML at a premier engineering college. I am passionate about building intelligent systems that solve real-world problems using machine learning, computer vision, and data-driven algorithms.`,
  education: "B.Tech Computer Science & Engineering (AI & ML), 2024 – 2028",
  interests: "Neural Networks · Reinforcement Learning · Computer Vision · Competitive Programming · Open Source",
  quote: `"The best way to predict the future is to invent it." — Alan Kay`
};

const CONTACTS = [
  { icon: "✉️", label: "Email", value: "krishna.verma@email.com", href: "mailto:krishna.verma@email.com" },
  { icon: "🐙", label: "GitHub", value: "github.com/krishnaverma", href: "https://github.com" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/krishnaverma", href: "https://linkedin.com" },
  { icon: "🐦", label: "Twitter", value: "@krishna_codes", href: "https://twitter.com" },
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
    body.appendChild(catEl);
  });

  // Animate bars after a short delay (allows layout to settle)
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
