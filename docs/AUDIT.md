# Audit — CookieClickHack

Working checklist for the two deliverables: the README rewrite and the
behaviour-preserving performance refactor. Part A is the **claim inventory** —
every original assertion and reasoning step the author makes, so nothing is lost
in translation. Part B is the **redundancy / performance findings** in the code.

---

## Part A — Author's claim & reasoning inventory (must all survive the rewrite)

From the German passages in `README.md` (L18–38). Faithful summary; the rewrite
translates these in full and preserves each one.

1. **Motivation.** "Why bother, it's only a cookie clicker?" — the appeal was the
   *engineering* of a clean solution to the cheat. Many different approaches were
   tried, each with its own advantages and disadvantages.
2. **High-start-value thesis.** With a relatively high starting cookie count, buy
   the **more expensive items early** so that a large background cookies-per-second
   (CpS) is generated from the outset. Recommended high start ≈ **100000**.
3. **Why expensive-first compounds.** Buying expensive items early makes new
   cookies accrue faster in the background, so the balance climbs back to a level
   that affords the next expensive item sooner.
4. **The "re-check before dropping down" mechanism.** The core logic buys the most
   expensive affordable item; when it can no longer afford it, it steps down to a
   cheaper one — **but** because time has passed and CpS has accrued more cookies
   in the meantime, it **re-compares before committing** whether the more
   expensive item has *just* become affordable again, and usually buys the
   expensive one after all.
5. **The higher the start value, the stronger this effect.** More start cookies →
   more expensive items owned → more background production → the more the balance
   can diverge upward during the comparison window → the faster an expensive
   purchase pays for itself.
6. **Why low start (1000) is a poor fit for this mechanism.** With a 1000 start you
   can only afford Cursor / Grandma / Factory at first. You barely reach the
   *middle* of the cheap→expensive range, or only after a very long time, and in
   the meantime lots of background resources are spent without being used cleanly —
   much of it wasted.
7. **The re-check is near-pointless at a low start.** Checking whether a slightly
   more expensive item is affordable is nearly futile when you have very few
   cookies; if you can't afford the expensive items early, focusing on them makes
   little sense. It *can* still work if you can afford to wait and spend that
   precious resource — but it is not efficient.
8. **If you removed the expensive-focus, you'd have to remove the re-check too.**
   The pre-purchase comparison exists specifically to catch "could I afford the
   expensive item after waiting?" If you don't focus on expensive items, you must
   strip that comparison out or it misfires.
9. **…but removing it creates a worse failure mode over time.** As purchases pile
   up toward the expensive end without that improvement, the algorithm turns
   inefficient again: the comparison window would increasingly make the expensive
   item affordable, so cutting it wastes resources that could have been used well.
   Without it, the moment it can't afford the step-up it rushes back to the
   **cheapest** purchase and has to slowly climb again — even though it could
   instead re-afford the expensive items sooner.
10. **The symmetric failure (high start, no expensive-focus).** With a high start
    but no focus on expensive items, you buy cheap items far too quickly, when for
    the same spend you could lean more expensive and reach *more* faster instead of
    reaching *little* slowly. Such an algorithm starts high but sinks quickly into
    the depths and lingers there before crawling back to the middle.
11. **Keeping this algorithm regardless of start value — the one downside.** With
    the algorithm kept for both low and high starts, the *only* negative is that a
    low start takes a bit longer to climb; but as soon as it can afford expensive
    items it puts them to efficient use.
12. **Not keeping the algorithm.** If you drop it, it suits only lower values; once
    higher values appear it stops working — a slow ramp-up and a very fast
    ramp-down that cannot sustain performance over a longer horizon.
13. **The real objective is more than reaching the mean fast.** It's not only about
    reaching the mean (midpoint) quickly, but **holding it and tending to raise
    it** — reaching it fast *and* keeping it constant and efficient. The extra
    algorithm covers at least one point fully: reaching the mean in the shortest
    possible time, which is the highest criterion it meets.
14. **The Mythical Man-Month aphorism.** *"Nine women can't make a baby in one
    month."* More workers don't birth a child faster. **Less is more**: more
    inefficient elements is not good; fewer, efficient elements serve the mission's
    goal — reaching the mean faster *and* sustaining its efficiency.

Structural claims / features the README also asserts (L126–179):
- Sets cookies to `Infinity` continuously.
- Automatically buys available upgrades and products.
- Ignores items priced `Infinity`.
- Optionally targets specific product slots.
- Customizable click interval.

These map directly onto the two purchase strategies in code —
`systematicPurchase()` (expensive-first + re-check) and `lowStartPurchase()`
(cheapest-first) — selected by `mainPurchaseLoop()`.

---

## Part B — Redundancy & performance findings (refactor targets)

Behaviour-preserving. "Observable behaviour" = the same DOM clicks, same game
outcomes, same console log strings and tables.

### Script 1 — live Cookie Clicker loop (`cookie-hack.js` L1–112)

- **B1 — Runaway nested `setInterval`s (critical).** The main loop runs every
  50 ms, and *inside* it registers three more intervals every tick: `#rows`
  level-ups (1000 ms), `#bigCookie` clicks (50 ms), and `cookieLevel` clicks
  (50 ms). Each 50 ms tick spawns a fresh trio, so intervals accumulate without
  bound — after one minute, ~3600 overlapping timers. **Fix:** register these
  three recurring clickers **once**, outside the main loop. Intended observable
  behaviour (bigCookie clicked ~every 50 ms, rows ~every 1 s, cookieLevel ~every
  50 ms) is preserved; only the unbounded timer accumulation is removed.
  *Decision logged: treated as redundant repeated work, not intended behaviour.*
- **B2 — Duplicated "enabled crate upgrade" scan (×3).** The identical
  `classList.contains("crate") && …("upgrade") && …("enabled")` filter-and-click
  is copy-pasted for `#toggleUpgrades`, `#techUpgrades`, and `#upgrades`.
  **Fix:** one `clickEnabledCrates(containerId)` helper called three times.
- **B3 — Dead global `firstProductClicked`.** Line 68 assigns an undeclared
  global that is never read; the one-time click is actually guarded by the
  `.selected` class check, not this flag. **Fix:** remove the dead assignment;
  keep the `.selected`-guarded click exactly as is.
- **B4 — Repeated `document.getElementById` per tick.** Each container id is
  re-queried every 50 ms. Low-risk to leave, but the helper in B2 centralises the
  lookups; the three one-time clicker targets (B1) are looked up once.
- **B5 — `Game.heavenlyChips = 1e200` (L3).** Set once at load, outside the loop.
  Correct as-is; keep.

### Script 2 — experiments-sandbox simulation (`cookie-hack.js` L116–681)

- **B6 — Triplicated item→sequence `switch` (×3).** The same eight-case switch
  that maps an item to its sequence-generator call appears in `Buy()`,
  `forecastCookies()`, and `getItemCost()`. **Fix:** one table-driven
  `buildSequence(item, count)` helper (a config object of
  `{ generator, args }` per item); all three callers delegate to it. Identical
  numeric outputs.
- **B7 — Four identical sequence generators.**
  `generateGrowingDifferenceSequence`, `generateSequenceWithGrowingDifferences`,
  and `generateIncreasingDifferenceSequence` are byte-for-byte the same
  `(start, initialDiff, increment, count)` linear-growing-difference algorithm;
  `generateSequenceWithGrowingDifference` is the same with `increment` fixed at
  `5`. **Fix:** one core `linearDiffSequence(start, initialDiff, increment,
  count)`; keep the named functions as thin wrappers so every existing call site
  and output is unchanged.
- **B8 — Distinct generators kept.** `generateSequence` (Cursor, 15-based),
  `generateAdvancedSequence` (Grandma), and `generateMultiplicativeSequence`
  (Portal, ×1.1) are genuinely different and are left as-is.
- **B9 — Sequences rebuilt from scratch each call.** Every `Buy`/`getItemCost`
  rebuilds an O(n) array to read a single index. Noted; not changed in this pass
  to keep outputs provably identical (memoisation would be the next step).

### Cross-cutting

- **B10 — Unclosed code fence in README** (final example block). Fixed in the
  rewrite.
- **B11 — Mixed German/English** across README prose, code comments, and console
  logs. README prose is fully translated. **Console log strings are left in
  German on purpose** (B-section rule: log output is observable and preserved).
