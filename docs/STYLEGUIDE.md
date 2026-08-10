# Style Guide — CookieClickHack

This project ships no application UI of its own: the tool runs in the browser
developer console and its only surfaces are **(1)** the `README.md`
documentation and **(2)** the `console.*` output the script emits while it runs.
This guide captures the presentation conventions already present in the repo so
that every later change — the README rewrite, the embedded diagrams, and the
inline code comments — looks like it was always part of the product.

> **Applicable case:** *No on-screen application UI.* Per the working
> agreement, this file therefore documents the **documentation-presentation
> conventions** and the **console-output conventions**, plus the Mermaid theme
> chosen for the rewritten README.

---

## 1. Document structure

- **Centered hero block** at the top of the README, wrapped in
  `<div align="center">`: a shields.io badge, an `<h1>` with the 🍪 emoji and the
  project name, a one-line italic tagline in `<em>`, and a representative image.
- **Horizontal rules** (`---`) separate every major section. Keep them.
- **Section headings** are `##` (H2) and **always lead with a single emoji**,
  followed by a space and Title Case text. The established set:

  | Emoji | Section            |
  | :---: | ------------------ |
  |  🚀   | About the Project  |
  |  🧠   | Design & Reasoning |
  |  ✨   | Features           |
  |  🛠️   | Setup              |
  |  💻   | Code Example       |

  Reuse an existing emoji when a section matches; introduce a new emoji only for
  a genuinely new section, and keep one emoji per heading.
- **Sub-sections** use `###` (H3), no emoji required.
- Author's original reasoning and any newly-added complementary notes are kept
  visually distinct with a light structural cue — an **"Additional
  observations"** `###` sub-section — never by rewording or diluting the
  original claim.

## 2. Typography & emphasis

- Body copy is plain Markdown prose, one idea per paragraph.
- **Bold** (`**…**`) for key terms and named strategies on first mention.
- *Italic* (`*…*`) for the tagline and for cited titles (e.g. *The Mythical
  Man-Month*).
- Inline `code` for identifiers, DOM ids, CSS classes, and numeric literals
  (`Game.cookies`, `#upgrades`, `crate`, `1e200`).
- Block quotes (`>`) for cited aphorisms and for callouts.

## 3. Badges & imagery

- Badges use **shields.io**, `style=for-the-badge`, project palette **orange**
  (`color=orange`), with a relevant `logo=`. Example:
  `https://img.shields.io/badge/Cookie%20Clicker-Hack-orange?style=for-the-badge&logo=cookiecutter`
- The hero image is centered and width-constrained (`width="200"`).
- Accent colour of the product is **cookie orange** (`#E8A33D` family). Use it
  for badges and as the Mermaid accent (see §5).

## 4. Code blocks

- Fenced blocks are always language-tagged: ```` ```javascript ````.
- **Every fence must be closed** — the original final example was left unclosed;
  the rewrite fixes this.
- Code samples in the README are copies of real functions from
  `cookie-hack.js`, formatted with **2-space indentation** and semicolons,
  matching the source file exactly.

## 5. Mermaid diagrams

Diagrams are written as native ```` ```mermaid ```` fenced blocks so GitHub
renders them without any external image files or services.

- **Theme:** rely on GitHub's default Mermaid theme (it adapts to light/dark
  automatically). Do **not** hard-code node colours that would clash in dark
  mode; where an accent is wanted, use Mermaid `classDef` with the cookie-orange
  fill `#E8A33D` and a dark stroke `#7A4E1E`, applied sparingly to the one or
  two nodes that carry the key idea.
- **Placement:** each diagram sits **next to the prose it illustrates**, never
  collected in a single block.
- **Direction:** flowcharts use `flowchart TD` (top-down) for architecture and
  `flowchart LR` (left-right) for pipelines; the main-loop walkthrough uses a
  `sequenceDiagram`; relationships use a `graph`/`flowchart` dependency view.
- **Labels:** short, Title Case or code-ish, no trailing punctuation.

## 6. Console-output conventions (script surface)

The running script logs to the browser console. The established conventions,
preserved by the refactor:

- Human-readable status lines via `console.log`, e.g.
  `Kauf von ${item} für ${cost} Cookies erfolgreich …`.
- Tabular purchase summaries via `console.table` (`showPurchaseTable`).
- **Log strings are treated as an observable interface**: the behaviour-
  preserving refactor keeps every existing log message and table intact so the
  console output a user sees does not change.

## 7. Spacing & formatting rules

- One blank line between block elements; no trailing whitespace.
- Lists use `-` bullets; ordered steps use `1.`, `2.`, …
- Wrap prose at a natural width; do not hard-wrap mid-sentence in ways that
  fight Markdown rendering.
