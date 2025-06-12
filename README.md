# Investigating the Edge – Edge-Detection Attack Lab 🔎

An interactive web playground that lets you **probe, break, and visualise classic
edge-detection algorithms (Sobel, Canny, Laplacian, Roberts)** under a variety of
adversarial attacks.
Built as the final project for _COMP_SCI 396 — Communicating Computer Science_
(Northwestern CS), the lab pairs a hands-on simulation console with blog-style
explainers that bridge theory and real-world AI-safety concerns.

<p align="center">
  <img src="docs/screenshot_simulation.png" width="800" alt="Simulation console screenshot">
</p>

---

## ✨ Key Features

| Area                      | What you’ll find                                                                                                                                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Landing & On-boarding** | Animated ASCII background, modal-driven story line, object / edge-map quizzes that set the narrative.                                                                                                                                                                                        |
| **Simulation Console**    | • Four data sources (progressive, Sobel-targeted, Canny-targeted, full “effective” sims)<br>• Live config panels for image, detector, attack and lighting<br>• Animated result grid (clean / attacked / edge maps)<br>• Auto-loaded metrics (edge-density drop, contour loss, fragmentation) |
| **Blog Section**          | Markdown-style posts rendered in Next.js: _What is Computer Vision?_, _Why Safety Matters_, _Technical Deep Dive_.                                                                                                                                                                           |
| **UI / UX**               | Next.js 14 App Router, Tailwind CSS (utility + shadcn/ui), Framer-Motion micro-animations, Radix Sheet + Navigation-Menu for mobile ergonomics.                                                                                                                                              |
| **Visual Flair**          | Custom `ASCIIBoxRenderer` pumping 60 FPS background art without WebGL.                                                                                                                                                                                                                       |

---

## 🏗 Tech Stack

| Layer       | Choice                                      | Why                                                              |
| ----------- | ------------------------------------------- | ---------------------------------------------------------------- |
| Framework   | **Next.js 14 + App Router**                 | File-based routing; hybrid SSG/SSR; built-in image optimisation. |
| Language    | **TypeScript 5**                            | Compile-time safety across React + Node.                         |
| Styling     | **Tailwind CSS**, CSS variables             | Rapid theming; dark-mode via custom properties.                  |
| Animation   | **Framer Motion**                           | Declarative keyframes + layout animations.                       |
| Headless UI | **Radix UI** components via shadcn/ui       | Accessible primitives for sheet & nav menus.                     |
| State       | Local React state + hooks (`useWindowSize`) | No global store needed.                                          |

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/your-org/edge-lab.git
cd edge-lab
pnpm install          # or npm / yarn

# 2. Run the dev server
pnpm dev              # http://localhost:3000

# 3. Build for production
pnpm build && pnpm start
```

No environment variables are required; all assets live under `public/images`.

---

## 📂 Important Directories

```
app/
├─ components/           # Re-usable UI & animation pieces
│  ├─ landing/           # ASCII background, overlay hero, sections
│  ├─ simulation/        # Config panels, metrics, image grid, modals
│  └─ navigation/        # Header, mobile sheet menu
├─ about/                # Blog posts (MDX-like React pages)
├─ simulation/           # /simulation route wrapper
├─ contants/             # Static nav & blog metadata
hooks/                   # Custom React hooks (e.g., useWindowSize)
lib/                     # Utility helpers + ASCII renderer
public/images/           # Pre-generated PNGs + JSON metrics
```

> **Tip:** If you want to regenerate attack artefacts, check the standalone
> Python repo (`edge-attack-backend`) referenced in the blog deep-dive.

---

## 🖼 Image / Metric Conventions

- **Progressive attacks**
  `images/progressive_attacks/{source}-{detector}-{level}-{clean|pert|edges-*}.png`

- **Targeted (Sobel/Canny)**
  `images/{targeted|canny_targeted}_attacks/{source}_{attack}.png`

- **Effective sims**
  `images/effective_simulation_results/sim_{detector}_{attack}_{strength}_*.png`

Each group ships with a matching `*_results.json` for quick metric lookup.

---

## 🛠 Development Notes

- **Type-safety first** – All props/interfaces live alongside their components.
- **Framer-Motion** – Prefer `whileHover`/`whileTap` for micro-UX; memoise large
  layouts with `layout` prop.
- **Radix Sheet** – Mobile nav slides in from the right (`components/ui/sheet.tsx`).
- **ASCII Renderer** – Pure Canvas 2D; tweak `charWidth`, `charHeight`, or the
  `message` string in `lib/ascii-renderer.ts`.

---

## 🤝 Contributing

1. **Fork** the repo & create your branch: `git checkout -b feature/your-feature`
2. **Commit** your changes with clear messages.
3. **Open a Pull Request** – please describe _why_ the change is needed.
4. The maintainers will review, run `pnpm lint`, and merge.

---

## 📜 Licence

Released under the **MIT License**.
© 2025 Ethan Pineda and contributors.

---

### Acknowledgements

- COMP_SCI 396 teaching staff for project guidance.
- OpenCV & NumPy communities for the original edge-detection codebase.
- Radix UI & shadcn/ui for keeping accessibility painless.

> _“Find every weakness now, so the self-driving car never does.”_ 🚗💥
