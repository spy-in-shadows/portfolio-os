# ⬡ Portfolio OS

> **An interactive, OS-themed developer portfolio with a cyberpunk terminal aesthetic.**  
> Built entirely with vanilla HTML5, CSS3, and ES6+ JavaScript — zero dependencies.

![Portfolio OS](assets/screenshots/cosmic-chronicles.png)

---

## 🖥️ Live Demo

🔗 **[spy-in-shadows.github.io/portfolio-os](https://spy-in-shadows.github.io/portfolio-os)**

---

## ✨ Features

### 🚀 Boot Sequence Loader
The page opens with a simulated OS boot screen — a stream of terminal-style messages (`[OK] Mounting /Projects/dev/sda1...`) that fade out before revealing the main interface.

### ⌨️ Terminal Hero & Typing Effect
The hero section mimics a real terminal. Commands like `whoami` and `ls -la /interests` are typed out character-by-character, with responses appearing sequentially — all driven by a custom `typeWriter()` engine with no libraries.

### 🧠 Neural Network Canvas Background
An animated particle system renders behind the hero section, drawing connections between "neurons" based on proximity. The network is fully interactive — lines pulse toward your mouse cursor in real time.

### 🗂️ OS File Explorer + Draggable Windows
Four desktop-style folder icons (`Projects`, `Skills`, `About`, `Contact`) open draggable, focusable OS windows — complete with macOS-style traffic-light close/min/max buttons and z-index stacking when focused.

### 💻 VS Code–Style Project Cards
Each project is rendered as a VS Code editor card with:
- A real **screenshot** preview (with emoji fallback)
- A **live syntax-highlighted code snippet** from the actual project
- A **toggle button** that flips between screenshot and code views
- Tech stack tag badges and a direct GitHub link

### ⚡ Glitch Name Header
`KRISHNA VERMA` is rendered with a CSS-only glitch animation — using `::before` and `::after` pseudo-elements as shifted cyan/magenta ghost layers that randomly desync on keyframes.

### 🕵️ Codename Tag
`// alias: spy-in-shadows` appears below the name in cyan with a subtle terminal-flicker animation.

### ⌘ Command Palette
Press `⌘K` (Mac) or `Ctrl+K` (Win/Linux) to open a VS Code–inspired command palette. Supports fuzzy search across all commands, keyboard navigation (`↑`/`↓`/`Enter`), and one-key shortcuts (`P`, `S`, `A`, `C`, `R`).

### 🔢 Binary Hover Effect
Hovering over folder names triggers a binary scramble animation before the text resolves back — a pure CSS/JS micro-interaction.

### 🕐 Live Clock
A live clock runs in the bottom taskbar, updating every second.

### 📄 Resume
The `⬇ Resume` button in the topbar (and `R` in the command palette) opens the resume PDF in a new tab.

---

## 📁 Project Structure

```
portfolio-os/
├── index.html          # Single-page HTML shell — all markup
├── script.js           # All JS logic (1 400+ lines, zero deps)
├── style.css           # All styles (CSS custom properties + animations)
└── assets/
    ├── resume.pdf          # Resume (opened by the Resume button)
    └── screenshots/        # Project screenshot images
        ├── ai-portfolio-risk-analyzer.jpeg
        ├── ai-galactic-engine.png
        ├── cosmic-chronicles.png
        ├── balancesheet.png
        ├── galerie_d'art.png
        └── sci-fi-form.png
```

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Structure  | HTML5 (semantic, single-page)     |
| Styling    | Vanilla CSS3 (custom properties, keyframes, grid, clamp) |
| Logic      | ES6+ JavaScript (zero libraries)  |
| Animation  | CSS keyframes + `requestAnimationFrame` canvas loop |
| Fonts      | Google Fonts — JetBrains Mono     |
| Hosting    | GitHub Pages                      |

---

## 🗂️ Projects Showcased

| Project | Stack | Link |
|---------|-------|------|
| Stock Portfolio Risk Analyzer | JavaScript · Finance · Charts | [GitHub](https://github.com/spy-in-shadows/Stock-Portfolio-Risk-Analyzer) |
| AI Galactic Intelligence Engine | Python · Three.js · ML · NLP | [GitHub](https://github.com/spy-in-shadows/ai-galactic-intelligence-engine) |
| Cosmic Chronicles | HTML · CSS · JS · Animation | [Live](https://spy-in-shadows.github.io/Comsic_Chronicles/) |
| balanceShEEt | JavaScript · Charts · Finance | [GitHub](https://github.com/spy-in-shadows/balanceShEEt) |
| Art Gallery Virtual Tour | JavaScript · 3D · WebGL | [GitHub](https://github.com/spy-in-shadows/Art-Gallery-Virtual-Tour) |
| sci_fi_form | HTML · CSS · JS · UI/UX | [GitHub](https://github.com/spy-in-shadows/sci_fi_form) |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `P` | Open Projects window |
| `S` | Open Skills window |
| `A` | Open About window |
| `C` | Open Contact window |
| `R` | Open Resume PDF |
| `X` | Close all windows |
| `Esc` | Close command palette |

---

## 🚀 Running Locally

No build step required — it's pure HTML/CSS/JS.

```bash
git clone https://github.com/spy-in-shadows/portfolio-os.git
cd portfolio-os

# Open directly in browser
open index.html

# Or serve with any static server
npx serve .
# → http://localhost:3000
```

---

## 🔧 Customisation

All content is centralised at the top of `script.js` for easy editing:

```js
// ── Edit your projects ──
const PROJECTS = [ ... ];

// ── Edit your skills ──
const SKILLS = [ ... ];

// ── Edit your about info ──
const ABOUT = { ... };

// ── Edit your contact links ──
const CONTACTS = [ ... ];
```

To add a new project:
1. Add an entry to `PROJECTS` in `script.js`
2. Drop a screenshot in `assets/screenshots/` and set the `screenshot` field
3. That's it — the card renders automatically

---

## 📜 License

MIT © [Krishna Verma](https://github.com/spy-in-shadows)

---

<div align="center">
  <sub>Built with 🖤 and way too much CSS by <strong>spy-in-shadows</strong></sub>
</div>
