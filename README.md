<div align="center">
  <img src="https://img.shields.io/badge/Cookie%20Clicker-Hack-orange?style=for-the-badge&logo=cookiecutter" alt="Project Badge">
  <h1>🍪 CookieClickHack</h1>
  <p><em>A smart automation script for the legendary Cookie Clicker game.</em></p>

  <img src="https://i.imgur.com/54k4z5I.jpeg" alt="Cookie Clicker" width="200">
</div>

---

## 🚀 About the Project

**CookieClickHack** is a browser automation snippet designed for the classic [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) game. It simulates infinite cookies and auto-buys upgrades and products—helping you reach Cookie God status without breaking a sweat.

Perfect for developers who want to tinker or for anyone who just wants to skip the grind.

---

## ✨ Features

- 🍪 Sets cookies to `Infinity` continuously
- 🛒 Automatically buys available upgrades and products
- 🚫 Ignores items with price "Infinity"
- 🎯 Optionally targets specific product slots
- ⚙️ Customizable click interval

---

## 🛠️ Setup

1. Open [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/).
2. Open your browser's developer console (F12 or right-click → Inspect → Console).
3. Paste the full script and hit **Enter**.

---

## 💻 Code Example

```javascript
setInterval(() => {
  Game.cookies = Infinity;

  // Upgrade logic
  const upgradesContainer = document.getElementById("upgrades");
  if (upgradesContainer) {
    Array.from(upgradesContainer.children).forEach(upgrade => {
      if (
        upgrade.classList.contains("crate") &&
        upgrade.classList.contains("upgrade") &&
        upgrade.classList.contains("enabled")
      ) {
        upgrade.click();
      }
    });
  }

  // Product logic
  const productsContainer = document.getElementById("products");
  if (productsContainer) {
    Array.from(productsContainer.children).forEach(product => {
      const priceText = product.querySelector("span.price")?.textContent?.trim();
      if (
        product.classList.contains("product") &&
        product.classList.contains("unlocked") &&
        product.classList.contains("enabled") &&
        priceText !== "Infinity"
      ) {
        product.click();
      }
    });
  }
}, 500);
