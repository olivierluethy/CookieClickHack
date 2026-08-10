/* Works for: https://orteil.dashnet.org/cookieclicker/ */

Game.heavenlyChips = 1e+200;

// Click every "enabled crate upgrade" inside a container. The same crate +
// upgrade + enabled filter is used for the toggle, tech and upgrade panels, so
// it lives here once instead of being copy-pasted three times.
function clickEnabledCrates(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (const el of container.children) {
    if (
      el.classList.contains("crate") &&
      el.classList.contains("upgrade") &&
      el.classList.contains("enabled")
    ) {
      el.click();
    }
  }
}

// Main injector loop: pin cookies to Infinity and click every purchasable
// upgrade and product once per tick.
setInterval(() => {
  // Set cookies to infinity
  if (typeof Game !== "undefined") {
    Game.cookies = Infinity;
  }

  // Toggle, tech and upgrade panels: click all enabled crate upgrades
  clickEnabledCrates("toggleUpgrades");
  clickEnabledCrates("techUpgrades");
  clickEnabledCrates("upgrades");

  // Automatically buy products
  const productsContainer = document.getElementById("products");

  if (productsContainer) {
    const products = Array.from(productsContainer.children);

    // One-time special click on the first product's specific child element,
    // guarded by the .selected class so it only fires while not yet selected.
    const targetElement = products[0]?.children[4];

    if (targetElement && !targetElement.classList.contains("selected")) {
      targetElement.click();
    }

    // Click all valid products
    for (const product of products) {
      if (
        product.classList.contains("product") &&
        product.classList.contains("unlocked") &&
        product.classList.contains("enabled") &&
        !product.classList.contains("disabled")
      ) {
        product.click();
      }
    }
  }
}, 50); // Fast interval

// Recurring clickers — registered ONCE (not inside the fast loop, which used to
// spawn a fresh trio of intervals every 50 ms). Each timer re-resolves its
// target on every fire, so it starts working as soon as the element exists.

/* On each row push level up */
setInterval(() => {
  const rows = document.getElementById("rows");
  if (!rows) return;
  Array.from(rows.children).forEach((child) => {
    const productButtons = child.querySelector(".productButtons");
    if (productButtons && productButtons.firstElementChild) {
      productButtons.firstElementChild.click();
    }
  });
}, 1000); // Click every 1000 milliseconds (1 second)

// Click the big cookie
setInterval(() => {
  document.getElementById("bigCookie")?.click();
}, 50); // Clicks every 50 milliseconds

// Click the cookie-level control
setInterval(() => {
  const cookieLevel =
    document.getElementById("sectionLeftExtra")?.children[0]?.children[0];
  if (cookieLevel) {
    cookieLevel.click();
  }
}, 50); // Clicks every 50 milliseconds

/* -------------------------------------------------------------------------- */

/* Für diese Webseite: https://orteil.dashnet.org/experiments/cookie/ */
let Cookies = 1000; // Starting cookie amount (set to 1000 for low start testing)
const INTERVAL_MS = 100; // Purchase interval (100 ms)
let totalCpS = 0; // Total Cookies per Second
const LOW_START_THRESHOLD = 1000; // Threshold for low start strategy
const CPS_SWITCH_THRESHOLD = 10; // CpS threshold to switch to systematic strategy
let lastUpdateTime = Date.now(); // Track time for CpS generation

// Object to track purchases and costs (only relevant items)
let purchaseTracker = {
  Cursor: { count: 0, costs: [], totalCost: 0 },
  Grandma: { count: 0, costs: [], totalCost: 0 },
  Factory: { count: 0, costs: [], totalCost: 0 },
  Mine: { count: 0, costs: [], totalCost: 0 },
  Shipment: { count: 0, costs: [], totalCost: 0 },
  "Alchemy lab": { count: 0, costs: [], totalCost: 0 },
  Portal: { count: 0, costs: [], totalCost: 0 },
  "Time machine": { count: 0, costs: [], totalCost: 0 },
};

// Purchase order (ascending initial costs)
const purchaseOrder = [
  "Cursor",
  "Grandma",
  "Factory",
  "Mine",
  "Shipment",
  "Alchemy lab",
  "Portal",
  "Time machine",
];

// CpS values per item
const cpsValues = {
  Cursor: 0.1,
  Grandma: 1,
  Factory: 260,
  Mine: 47,
  Shipment: 260000,
  "Alchemy lab": 1600000,
  Portal: 12000000,
  "Time machine": 100000000,
};

// Single source of truth for how each item's cost sequence is built. The same
// item -> generator mapping used to be copy-pasted as an eight-case switch in
// Buy(), forecastCookies() and getItemCost(); they now all go through
// buildSequence(). Each entry takes the desired sequence length and returns the
// full cost sequence.
const sequenceConfig = {
  Cursor: (count) => generateSequence(15, count),
  Grandma: (count) => generateAdvancedSequence(100, 11, count),
  Factory: (count) => generateSequenceWithGrowingDifference(500, 50, count),
  Mine: (count) => generateGrowingDifferenceSequence(2000, 200, 20, count),
  Shipment: (count) =>
    generateSequenceWithGrowingDifferences(7000, 701, 70, count),
  "Alchemy lab": (count) =>
    generateIncreasingDifferenceSequence(50000, 5001, 500, count),
  Portal: (count) => generateMultiplicativeSequence(1000000, 1.1, count),
  "Time machine": (count) =>
    generateIncreasingDifferenceSequence(123456789, 12345679, 1234568, count),
};

// Build an item's cost sequence of the given length, or null for unknown items.
function buildSequence(item, count) {
  const factory = sequenceConfig[item];
  return factory ? factory(count) : null;
}

// Update total CpS
function updateCpS() {
  totalCpS = 0;
  for (let item in purchaseTracker) {
    totalCpS += purchaseTracker[item].count * cpsValues[item];
  }
  console.log(`Gesamt-CpS aktualisiert: ${totalCpS} Cookies pro Sekunde`);
}

// Display purchase table
function showPurchaseTable() {
  const tableData = {};
  for (let item in purchaseTracker) {
    tableData[item] = { Käufe: purchaseTracker[item].count };
  }
  console.log("Kaufübersicht:");
  console.table(tableData);
}

// Trigger a purchase
function Buy(item) {
  // Determine cost based on item (see sequenceConfig)
  if (!sequenceConfig[item]) {
    console.log("Unbekanntes Item:", item);
    return false;
  }
  const sequence = buildSequence(item, purchaseTracker[item].count + 2);
  const cost = sequence[purchaseTracker[item].count + 1];

  // Check if enough cookies are available
  if (Cookies >= cost) {
    Cookies -= cost;
    purchaseTracker[item].count++;
    purchaseTracker[item].costs.push(cost);
    purchaseTracker[item].totalCost += cost;

    // Simulate click on the corresponding HTML element
    const elementId = `buy${item.replace(/\s/g, "")}`; // Fix for spaces in IDs
    const element = document.getElementById(elementId);
    if (element) {
      element.click();
      console.log(
        `Kauf von ${item} für ${cost} Cookies erfolgreich (Klick auf ${elementId}). Verbleibende Cookies: ${Cookies}`
      );
      updateCpS();
      showPurchaseTable();
      return true;
    } else {
      console.log(`Fehler: Element mit ID ${elementId} nicht gefunden.`);
      // Undo purchase if click fails
      Cookies += cost;
      purchaseTracker[item].count--;
      purchaseTracker[item].costs.pop();
      purchaseTracker[item].totalCost -= cost;
      return false;
    }
  } else {
    console.log(
      `Nicht genug Cookies für ${item}. Benötigt: ${cost}, Verfügbar: ${Cookies}`
    );
    return false;
  }
}

// Forecast future costs
function forecastCookies(item, additionalPurchases) {
  if (!sequenceConfig[item]) {
    console.log("Unbekanntes Item:", item);
    return;
  }
  let totalFutureCost = 0;
  let currentCount = purchaseTracker[item].count;
  const sequence = buildSequence(item, currentCount + additionalPurchases + 1);

  for (let i = currentCount + 1; i <= currentCount + additionalPurchases; i++) {
    totalFutureCost += sequence[i];
  }

  console.log(
    `Prognose für ${additionalPurchases} weitere Käufe von ${item}: ${totalFutureCost} Cookies`
  );
  console.log(
    `Aktuelle Cookies: ${Cookies}. Cookies reichen für ${Math.floor(
      Cookies / (totalFutureCost / additionalPurchases)
    )} weitere Käufe.`
  );
  return totalFutureCost;
}

// Display current status
function showStatus() {
  console.log(`Aktuelle Cookies: ${Cookies}`);
  console.log(`Gesamt-CpS: ${totalCpS} Cookies pro Sekunde`);
  console.log("Kaufstatistik:");
  for (let item in purchaseTracker) {
    console.log(
      `${item}: ${purchaseTracker[item].count} Käufe, Gesamtkosten: ${purchaseTracker[item].totalCost} Cookies`
    );
  }
  showPurchaseTable();
  updateCpS();
}

// Calculate cost of an item
function getItemCost(item) {
  if (!sequenceConfig[item]) return Infinity;
  const sequence = buildSequence(item, purchaseTracker[item].count + 2);
  return sequence[purchaseTracker[item].count + 1];
}

// Update cookies based on CpS and elapsed time
function updateCookies() {
  const currentTime = Date.now();
  const elapsedSeconds = (currentTime - lastUpdateTime) / 1000;
  Cookies += totalCpS * elapsedSeconds;
  lastUpdateTime = currentTime;
  console.log(
    `Cookies aktualisiert: +${
      totalCpS * elapsedSeconds
    }, Aktuelle Cookies: ${Cookies}`
  );
}

// Purchase strategy for low start values (prioritize cheap items)
function lowStartPurchase() {
  let purchased = false;

  // Start with the cheapest item
  for (let i = 0; i < purchaseOrder.length; i++) {
    const item = purchaseOrder[i];
    console.log(`Versuche Kauf von ${item} (niedriger Startwert)...`);

    // Attempt purchase
    if (Buy(item)) {
      purchased = true;
      lastUpdateTime = Date.now(); // Reset time after purchase
      break; // Exit loop after a successful purchase
    }
  }

  // If no purchase was possible, update cookies and wait
  if (!purchased) {
    updateCookies();
    console.log(
      `Keine Käufe möglich mit ${Cookies} Cookies. Warte auf neue Cookies...`
    );
  }

  // Forecast for the cheapest item
  const cheapestItem = purchaseOrder[0];
  forecastCookies(cheapestItem, 5);

  // Show table after each cycle
  showPurchaseTable();
}

// Systematic purchase logic with dynamic check for more expensive items
function systematicPurchase() {
  let purchased = false;

  // Start with the most expensive item
  for (let i = purchaseOrder.length - 1; i >= 0; i--) {
    const item = purchaseOrder[i];
    console.log(`Versuche Kauf von ${item}...`);

    // Attempt purchase
    if (Buy(item)) {
      purchased = true;
      lastUpdateTime = Date.now(); // Reset time after purchase
      break; // Exit loop after a successful purchase
    } else {
      // Check if a more expensive item is affordable after waiting
      for (let j = purchaseOrder.length - 1; j > i; j--) {
        const moreExpensiveItem = purchaseOrder[j];
        if (Cookies >= getItemCost(moreExpensiveItem)) {
          console.log(
            `Teureres Item ${moreExpensiveItem} ist jetzt erschwinglich!`
          );
          if (Buy(moreExpensiveItem)) {
            purchased = true;
            lastUpdateTime = Date.now(); // Reset time after purchase
            break;
          }
        }
      }
      if (purchased) break; // Exit outer loop if a purchase was made
    }
  }

  // If no purchase was possible, update cookies and wait
  if (!purchased) {
    updateCookies();
    console.log(
      `Keine Käufe möglich mit ${Cookies} Cookies. Warte auf neue Cookies...`
    );
  }

  // Forecast for the most expensive item
  const mostExpensiveItem = purchaseOrder[purchaseOrder.length - 1];
  forecastCookies(mostExpensiveItem, 5);

  // Show table after each cycle
  showPurchaseTable();
}

// Main purchase loop (decides which strategy to use)
function mainPurchaseLoop() {
  if (Cookies <= LOW_START_THRESHOLD && totalCpS < CPS_SWITCH_THRESHOLD) {
    console.log("Verwende Strategie für niedrigen Startwert...");
    lowStartPurchase();
  } else {
    console.log("Verwende systematische Strategie...");
    systematicPurchase();
  }
}

// Sequence generation functions
function generateSequence(start, count) {
  let sequence = [start];
  let current = start;
  let diff = 2;
  let repeat = 0;
  let repeatLimit = 3;

  for (let i = 1; i < count; i++) {
    current += diff;
    sequence.push(current);
    repeat++;
    if ((diff < 4 && repeat >= 3) || (diff >= 4 && repeat >= 2)) {
      diff++;
      repeat = 0;
    }
  }
  return sequence;
}

function generateAdvancedSequence(start, initialDiff, count) {
  let sequence = [start];
  let current = start;
  let diff = initialDiff;
  let diffSwitchPoint = 5;

  for (let i = 1; i < count; i++) {
    current += diff;
    sequence.push(current);
    if (i < diffSwitchPoint) {
      diff += 1;
    } else {
      diff += 2;
    }
  }
  return sequence;
}

// Core linear-growing-difference sequence: start, then each step adds `diff`,
// and `diff` itself grows by a fixed `increment`. Four generators below were
// byte-for-byte copies of this algorithm; they are now thin wrappers so every
// existing call site and numeric output stays identical.
function linearDiffSequence(start, initialDiff, increment, count) {
  let sequence = [start];
  let current = start;
  let diff = initialDiff;

  for (let i = 1; i < count; i++) {
    current += diff;
    sequence.push(current);
    diff += increment;
  }
  return sequence;
}

function generateSequenceWithGrowingDifference(start, initialDiff, count) {
  return linearDiffSequence(start, initialDiff, 5, count);
}

function generateGrowingDifferenceSequence(
  start,
  initialDiff,
  increment,
  count
) {
  return linearDiffSequence(start, initialDiff, increment, count);
}

function generateSequenceWithGrowingDifferences(
  start,
  initialDiff,
  increment,
  count
) {
  return linearDiffSequence(start, initialDiff, increment, count);
}

function generateIncreasingDifferenceSequence(
  start,
  initialDiff,
  increment,
  count
) {
  return linearDiffSequence(start, initialDiff, increment, count);
}

function generateMultiplicativeSequence(start, factor, count) {
  let sequence = [start];
  let current = start;

  for (let i = 1; i < count; i++) {
    current = Math.round(current * factor);
    sequence.push(current);
  }
  return sequence;
}

// Start the endless interval
setInterval(mainPurchaseLoop, INTERVAL_MS);

// Initial status
showStatus();
