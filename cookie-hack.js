/* Works for: https://orteil.dashnet.org/cookieclicker/ */

Game.heavenlyChips = 1e+200

setInterval(() => {
  // Set cookies to infinity
  if (typeof Game !== "undefined") {
    Game.cookies = Infinity;
  }

  // Toggle-Upgrades click
  const toggleUpgrades = document.getElementById("toggleUpgrades");
  if (toggleUpgrades) {
    const toggleItems = Array.from(toggleUpgrades.children);
    for (const toggle of toggleItems) {
      if (
        toggle.classList.contains("crate") &&
        toggle.classList.contains("upgrade") &&
        toggle.classList.contains("enabled")
      ) {
        toggle.click();
      }
    }
  }

  // Tech-Upgrades click
  const techUpgrades = document.getElementById("techUpgrades");
  if (techUpgrades) {
    const techItems = Array.from(techUpgrades.children);
    for (const item of techItems) {
      if (
        item.classList.contains("crate") &&
        item.classList.contains("upgrade") &&
        item.classList.contains("enabled")
      ) {
        item.click();
      }
    }
  }

  // Automatically buy upgrades
  const upgradesContainer = document.getElementById("upgrades");
  if (upgradesContainer) {
    const upgrades = Array.from(upgradesContainer.children);
    for (const upgrade of upgrades) {
      if (
        upgrade.classList.contains("crate") &&
        upgrade.classList.contains("upgrade") &&
        upgrade.classList.contains("enabled")
      ) {
        upgrade.click();
      }
    }
  }

  // Automatically buy products
  const productsContainer = document.getElementById("products");

  if (productsContainer) {
    const products = Array.from(productsContainer.children);

    // One-time special click on the first product's specific child element
    const firstProduct = products[0];
    const targetElement = firstProduct?.children[4];

    if (targetElement && !targetElement.classList.contains("selected")) {
      targetElement.click();
      firstProductClicked = true;
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
  /* On each row push level up */
  const rows = document.getElementById("rows");

  if (rows) {
    setInterval(() => {
      Array.from(rows.children).forEach((child) => {
        const productButtons = child.querySelector(".productButtons");
        if (productButtons && productButtons.firstElementChild) {
          productButtons.firstElementChild.click();
        }
      });
    }, 1000); // Click every 1000 milliseconds (1 second)
  }

  const bigCookie = document.getElementById("bigCookie");

  if (bigCookie) {
    setInterval(() => {
      bigCookie.click();
    }, 50); // Clicks every 50 milliseconds
  }

  const cookieLevel =
    document.getElementById("sectionLeftExtra").children[0].children[0];
  if (cookieLevel) {
    setInterval(() => {
      cookieLevel.click();
    }, 50); // Clicks every 50 milliseconds
  }
}, 50); // Fast interval

/* -------------------------------------------------------------------------- */

/* Für diese Webseite: https://orteil.dashnet.org/experiments/cookie/ */
let Cookies = 1000; // Starting cookie amount
const INTERVAL_MS = 100; // Purchase interval (100 ms)
let totalCpS = 0; // Total Cookies per Second

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

// CpS values per item (as provided)
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
  let cost;
  let sequence;

  // Determine cost based on item
  switch (item) {
    case "Cursor":
      sequence = generateSequence(15, purchaseTracker[item].count + 2);
      cost = sequence[purchaseTracker[item].count + 1];
      break;
    case "Grandma":
      sequence = generateAdvancedSequence(
        100,
        11,
        purchaseTracker[item].count + 2
      );
      cost = sequence[purchaseTracker[item].count + 1];
      break;
    case "Factory":
      sequence = generateSequenceWithGrowingDifference(
        500,
        50,
        purchaseTracker[item].count + 2
      );
      cost = sequence[purchaseTracker[item].count + 1];
      break;
    case "Mine":
      sequence = generateGrowingDifferenceSequence(
        2000,
        200,
        20,
        purchaseTracker[item].count + 2
      );
      cost = sequence[purchaseTracker[item].count + 1];
      break;
    case "Shipment":
      sequence = generateSequenceWithGrowingDifferences(
        7000,
        701,
        70,
        purchaseTracker[item].count + 2
      );
      cost = sequence[purchaseTracker[item].count + 1];
      break;
    case "Alchemy lab":
      sequence = generateIncreasingDifferenceSequence(
        50000,
        5001,
        500,
        purchaseTracker[item].count + 2
      );
      cost = sequence[purchaseTracker[item].count + 1];
      break;
    case "Portal":
      sequence = generateMultiplicativeSequence(
        1000000,
        1.1,
        purchaseTracker[item].count + 2
      );
      cost = sequence[purchaseTracker[item].count + 1];
      break;
    case "Time machine":
      sequence = generateIncreasingDifferenceSequence(
        123456789,
        12345679,
        1234568,
        purchaseTracker[item].count + 2
      );
      cost = sequence[purchaseTracker[item].count + 1];
      break;
    default:
      console.log("Unbekanntes Item:", item);
      return false;
  }

  // Check if enough cookies are available
  if (Cookies >= cost) {
    Cookies -= cost;
    purchaseTracker[item].count++;
    purchaseTracker[item].costs.push(cost);
    purchaseTracker[item].totalCost += cost;

    // Simulate click on the corresponding HTML element
    const elementId = `buy${item}`;
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
  let sequence;
  let totalFutureCost = 0;
  let currentCount = purchaseTracker[item].count;

  switch (item) {
    case "Cursor":
      sequence = generateSequence(15, currentCount + additionalPurchases + 1);
      break;
    case "Grandma":
      sequence = generateAdvancedSequence(
        100,
        11,
        currentCount + additionalPurchases + 1
      );
      break;
    case "Factory":
      sequence = generateSequenceWithGrowingDifference(
        500,
        50,
        currentCount + additionalPurchases + 1
      );
      break;
    case "Mine":
      sequence = generateGrowingDifferenceSequence(
        2000,
        200,
        20,
        currentCount + additionalPurchases + 1
      );
      break;
    case "Shipment":
      sequence = generateSequenceWithGrowingDifferences(
        7000,
        701,
        70,
        currentCount + additionalPurchases + 1
      );
      break;
    case "Alchemy lab":
      sequence = generateIncreasingDifferenceSequence(
        50000,
        5001,
        500,
        currentCount + additionalPurchases + 1
      );
      break;
    case "Portal":
      sequence = generateMultiplicativeSequence(
        1000000,
        1.1,
        currentCount + additionalPurchases + 1
      );
      break;
    case "Time machine":
      sequence = generateIncreasingDifferenceSequence(
        123456789,
        12345679,
        1234568,
        currentCount + additionalPurchases + 1
      );
      break;
    default:
      console.log("Unbekanntes Item:", item);
      return;
  }

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
  let sequence;
  switch (item) {
    case "Cursor":
      sequence = generateSequence(15, purchaseTracker[item].count + 2);
      break;
    case "Grandma":
      sequence = generateAdvancedSequence(
        100,
        11,
        purchaseTracker[item].count + 2
      );
      break;
    case "Factory":
      sequence = generateSequenceWithGrowingDifference(
        500,
        50,
        purchaseTracker[item].count + 2
      );
      break;
    case "Mine":
      sequence = generateGrowingDifferenceSequence(
        2000,
        200,
        20,
        purchaseTracker[item].count + 2
      );
      break;
    case "Shipment":
      sequence = generateSequenceWithGrowingDifferences(
        7000,
        701,
        70,
        purchaseTracker[item].count + 2
      );
      break;
    case "Alchemy lab":
      sequence = generateIncreasingDifferenceSequence(
        50000,
        5001,
        500,
        purchaseTracker[item].count + 2
      );
      break;
    case "Portal":
      sequence = generateMultiplicativeSequence(
        1000000,
        1.1,
        purchaseTracker[item].count + 2
      );
      break;
    case "Time machine":
      sequence = generateIncreasingDifferenceSequence(
        123456789,
        12345679,
        1234568,
        purchaseTracker[item].count + 2
      );
      break;
    default:
      return Infinity;
  }
  return sequence[purchaseTracker[item].count + 1];
}

// Systematic purchase logic
function systematicPurchase() {
  // Add cookies based on CpS
  Cookies += totalCpS * (INTERVAL_MS / 1000);
  console.log(`Cookies hinzugefügt: ${totalCpS * (INTERVAL_MS / 1000)}, Aktuelle Cookies: ${Cookies}`);

  let purchased = false;

  // Start with the most expensive item
  for (let i = purchaseOrder.length - 1; i >= 0; i--) {
    const item = purchaseOrder[i];
    console.log(`Versuche Kauf von ${item}...`);

    // Attempt purchase
    if (Buy(item)) {
      purchased = true;
      break; // Exit loop after a successful purchase
    }
  }

  // If no purchase was possible, wait for more cookies
  if (!purchased) {
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

function generateSequenceWithGrowingDifference(start, initialDiff, count) {
  let sequence = [start];
  let current = start;
  let diff = initialDiff;
  let increment = 5;

  for (let i = 1; i < count; i++) {
    current += diff;
    sequence.push(current);
    diff += increment;
  }
  return sequence;
}

function generateGrowingDifferenceSequence(
  start,
  initialDiff,
  increment,
  count
) {
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

function generateSequenceWithGrowingDifferences(
  start,
  initialDiff,
  increment,
  count
) {
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

function generateIncreasingDifferenceSequence(
  start,
  initialDiff,
  increment,
  count
) {
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
setInterval(systematicPurchase, INTERVAL_MS);

// Initial status
showStatus();
