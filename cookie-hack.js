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
