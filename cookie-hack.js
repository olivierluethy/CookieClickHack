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

/* Für diese Webseite: https://orteil.dashnet.org/experiments/cookie/ */ 
// Buy Cursor
// Start am 15 Cookies
function generateSequence(start, count) {
    let sequence = [start];
    let current = start;
    let diff = 2;
    let repeat = 0;
    let repeatLimit = 3; // wie oft dieselbe Differenz benutzt wird

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

console.log(generateSequence(15, 30)); // 30 Zahlen ab 15

// Aufruf der Funktion mittels: Buy('Cursor')

// Buy Grandma
// Start ab 100 Cookies
function generateAdvancedSequence(start, initialDiff, count) {
    let sequence = [start];
    let current = start;
    let diff = initialDiff;
    let diffIncrement = 1; // Start mit +1 Zuwachs
    let diffSwitchPoint = 5; // Nach 5 Schritten auf +2 Zuwachs wechseln

    for (let i = 1; i < count; i++) {
        current += diff;
        sequence.push(current);

        // Unterschied erhöhen
        if (i < diffSwitchPoint) {
            diff += 1;
        } else {
            diff += 2;
        }
    }

    return sequence;
}

console.log(generateAdvancedSequence(100, 11, 25)); // Start bei 100, erste Differenz 11, 25 Zahlen

// Aufruf der Funktion mittels: Buy('Grandma')

// Buy Factory
// Start ab 500 Cookies
function generateSequenceWithGrowingDifference(start, initialDiff, count) {
    let sequence = [start];
    let current = start;
    let diff = initialDiff;  // Startdifferenz
    let increment = 5;  // Differenzsteigerung jedes Mal (z. B. um 5 wachsen)

    for (let i = 1; i < count; i++) {
        current += diff;
        sequence.push(current);

        // Steigere die Differenz nach jedem Schritt
        diff += increment;
    }

    return sequence;
}

console.log(generateSequenceWithGrowingDifference(500, 50, 25)); // Start bei 500, erste Differenz 50, 25 Zahlen

// Aufruf der Funktion mittels: Buy('Factory')

// Buy Mine
// Start ab 2000 Cookies
function generateGrowingDifferenceSequence(start, initialDiff, increment, count) {
    let sequence = [start];
    let current = start;
    let diff = initialDiff; // Startdifferenz

    for (let i = 1; i < count; i++) {
        current += diff;
        sequence.push(current);

        // Steigere die Differenz nach jedem Schritt
        diff += increment;
    }

    return sequence;
}

console.log(generateGrowingDifferenceSequence(2000, 200, 20, 25)); // Start bei 2000, Differenz 200, Zuwachs +20, 25 Zahlen

// Aufruf der Funktion mittels: Buy('Mine')

// Buy Shipment
// Start ab 7000 Cookies
function generateSequenceWithGrowingDifferences(start, initialDiff, increment, count) {
    let sequence = [start];
    let current = start;
    let diff = initialDiff; // Startdifferenz

    for (let i = 1; i < count; i++) {
        current += diff;
        sequence.push(current);

        // Steigere die Differenz nach jedem Schritt
        diff += increment;
    }

    return sequence;
}

console.log(generateSequenceWithGrowingDifferences(7000, 701, 70, 20)); // Start bei 7000, Differenz 701, Zuwachs +70, 20 Zahlen

// Aufruf der Funktion mittels: Buy('Shipment')

// Buy Alchemy lab
// Start ab 50000 Cookies
function generateIncreasingDifferenceSequence(start, initialDiff, increment, count) {
    let sequence = [start];
    let current = start;
    let diff = initialDiff; // Startdifferenz

    for (let i = 1; i < count; i++) {
        current += diff;
        sequence.push(current);

        // Steigere die Differenz nach jedem Schritt
        diff += increment;
    }

    return sequence;
}

console.log(generateIncreasingDifferenceSequence(50000, 5001, 500, 20)); // Start bei 50000, Differenz 5001, Zuwachs +500, 20 Zahlen

// Aufruf der Funktion mittels: Buy('Alchemy lab')

// Buy Portal
// Start ab 1000000 Cookies
function generateMultiplicativeSequence(start, factor, count) {
    let sequence = [start];
    let current = start;

    for (let i = 1; i < count; i++) {
        current = Math.round(current * factor); // Multipliziere mit dem Faktor (hier etwa 1.1)
        sequence.push(current);
    }

    return sequence;
}

console.log(generateMultiplicativeSequence(1000000, 1.1, 20)); // Start bei 1.000.000, Wachstumsfaktor 1.1, 20 Zahlen

// Aufruf der Funktion mittels: Buy('Portal')

// Buy Time machine
// Start ab 123456789 Cookies
function generateIncreasingDifferenceSequence(start, initialDiff, increment, count) {
    let sequence = [start];
    let current = start;
    let diff = initialDiff; // Startdifferenz

    for (let i = 1; i < count; i++) {
        current += diff;
        sequence.push(current);

        // Steigere die Differenz nach jedem Schritt
        diff += increment;
    }

    return sequence;
}

console.log(generateIncreasingDifferenceSequence(123456789, 12345679, 1234568, 20)); // Start bei 123456789, Differenz 12345679, Zuwachs +1234568, 20 Zahlen

// Aufruf der Funktion mittels: Buy('Time machine')

// Buy Elder Pledge
// Start bei 666666
function generateGrowingDifferenceSequence(start, initialDiff, increment, count) {
    let sequence = [start];
    let current = start;
    let diff = initialDiff; // Startdifferenz

    for (let i = 1; i < count; i++) {
        current += diff;
        sequence.push(current);

        // Steigere die Differenz nach jedem Schritt
        diff += increment;
    }

    return sequence;
}

console.log(generateGrowingDifferenceSequence(666666, 140001, 17000, 20)); // Start bei 666666, Differenz 140001, Zuwachs +17000, 20 Zahlen

// Aufruf der Funktion mittels: Buy('Elder Pledge')
