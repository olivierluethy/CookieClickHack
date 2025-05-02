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
Warum das alles, ist doch nur ein Cookie Klicker.
Für mich ist die erarbeitung einer Lösung für eine saubere Erarbeitung von diesem Cheat fand ich sehr spannend und aufregend. Dabei hatte ich sehr viele ganz unterschiedliche ansätz, wobei sich die unterschiedlichen Ansätze an ganz unterschiedlichen Vorteilen als auch Nachteilen sich daraus herausresultieren.

Mir schwebten dabei folgende Gedankengänge wie sich dieses Tool in bezug auf die Effizienz sich dahingegend widmen kann:

Zum einen habe ich mir so gedacht, dass man bei einem relativ hohen Cookie-Startwert das Problem durch den Kauf von eher etwas teureren Elementen einkaufen lässt, so dass von Anfang an viele Cookies im Hintergrund generiert werden. Dies hängt aber natürlich stark davon ab, mit welchem Cookie Startwert man beginnt. Um sich natürlich an die Effizienz besser anpassen zu können, sollte der Cookie Startwert möglichst hoch sein, also beginnend mit 100000. Die Idee, sich auf teurere Elemente zu konzentrieren, kann natürlich sehr vorteilhaft sein, da man schon am Anfang viele teure Elemente kaufen kann, die dazu beitragen, dass schneller mehr neue Cookies im Hintergrund erzeugt werden, damit sich der Wert schnell genug wieder auf einen ausreichend hohen Wert für möglichst teurere Elemente annähert. Die Hintergrundlogik ist dabei zusätzlich, dass möglichst teure Elemente gekauft werden und wenn man sich diese nicht mehr leisten kann, dann geht man zwar zum weniger teuren Element über, aber wenn man vergleicht, ist wieder etwas Zeit vergangen und in dieser Zeit haben sich wieder neue oder besser gesagt sich wieder eventuell genügend neue Cookies angesammelt, dann wird vor dem Kauf doch noch ein Vergleich angestellt, ob sich das teurere Element nicht plötzlich doch wieder lohnen würde und dann wird meistens auch das teurere Element gekauft. Denn je höher der Cookie-Startwert, je mehr teurere Elemente, je mehr im Hintergrund produziert werden und je unterschiedlicher dann die Cookie-Generierung während des Vergleichs mit dem günstigeren Wert sein kann, desto schneller rechnet sich der Kauf für ein teureres Element.

Dieser Hintergrundmechanismus verhält sich schlechter bzw. ungeeigneter, wenn der Startwert des Cookies auf 1000 gesetzt ist. Denn damit kann man am Anfang nur den Cursor, Grandma oder Factory kaufen. Aber an die Mitte vom billigsten bis zum teuersten kommt man leider kaum, oder wenn dann erst nach ganz langer Zeit und dabei werden natürlich im Hintergrund ganz viele Ressourcen benötigt, die aber nicht so richtig sauber gebraucht werden und viele Ressourcen dann jeweils für die Katz sind. Außerdem, wenn man vor dem Kauf schaut, ob man sich irgendwie doch noch ein etwas teureres Element kaufen kann, obwohl die Wahrscheinlichkeit dafür sehr gering ist, weil man ja gerade am Anfang nur mit sehr wenigen Cookies umgehen können muss und wenn man sich die teureren Elemente nicht gleich am Anfang kaufen kann, warum sollte man sich dann auf die teureren konzentrieren? Das macht irgendwie keinen Sinn. Aber wenn man es sich irgendwie leisten kann, zu warten und diese kostbare Ressource zu verbrauchen, dann mag der Plan an sich noch funktionieren, aber effizient ist es nicht.

Wenn man den Algorithmus nicht auf den Kauf von eher teureren Elementen fokussieren würde, dann würde man den jeweiligen Vergleich vor dem Kauf, der ja darauf abzielt, ob man das teurere Element in der Zwischenzeit nicht doch noch kaufen könnte, worauf sich der Algorithmus bei den eher teureren Kaufentscheidungen natürlich fokussiert, dann müsste man genau diesen Teil herausnehmen, damit das nicht passiert. Allerdings wäre dann ein großer Nachteil, dass, wenn sich die Käufe auf die eher teureren Elemente im Laufe der Zeit häufen und man den Algorithmus nicht dahingehend verbessert, er dann wieder anfängt, ineffizient zu arbeiten, weil dann in der Zwischenzeit durch den Vergleich vor dem Verkauf für ein teureres Element die Wahrscheinlichkeit steigen würde, dass man sich das teurere Element dann doch wieder leisten kann und man hätte damit Ressourcen sparen können, die man so nicht gut einsetzt. Denn dann würde sich der Algorithmus so verhalten, dass er, sobald man vom billigsten zum etwas teureren geht, sich das Teurere dann nicht mehr leisten kann, oder etwas höher, dass er sich dann viel schneller wieder dem möglichst billigsten Verkauf widmet und sich dann wieder langsamer von vorne hocharbeiten muss, obwohl er sich vielleicht stattdessen die teureren Elemente wieder schneller leisten könnte, sich stattdessen aber wieder langsam hocharbeitet.

Das gleiche gilt aber auch umgekehrt, dass wenn man einen hohen Startwert Cookie setzt, der Algorithmus sich aber nicht darauf konzentriert, möglichst teurere Elemente zu kaufen, dann kauft man dann viel schneller zu günstige Elemente, obwohl man sich für den Preis auch etwas mehr in die teurere Richtung konzentrieren könnte, um dann schneller zu mehr zu kommen, anstatt langsam zu etwas zu kommen. Denn dann würde sich der Algorithmus so verhalten, dass er zwar von etwas weiter oben startet, aber sehr schnell wieder in die Tiefe sinkt und dort auch länger hängen bleibt, damit er sich wieder der Mitte annähert.

Durch die beibehaltung von diesem Algorithmus, egal der Startwert wenig oder hoch ist, der einzige negative Punkt ist, dass wenn der Startwert niedrig ist, er etwas länger braucht um hochzukommen, aber sobald er sich teurere Elemente leisten kann, weisst er sich dem effizient zu nutzen machen.

Wenn man diesen Algorithmus nicht beibehält, eignet er sich nur für niedrigere Werte, aber sobald höhere Werte hinzukommen, hört es auf und es ist ein langsames Hochfahren und ein sehr schnelles Herunterfahren, was über einen längeren Zeitraum von der Leistung her nicht wirklich halten kann.

Denn es kommt nicht nur darauf an, den Mittelwert schnell zu erreichen, sondern ihn auch zu halten und tendenziell zu erhöhen. Denn es ist nicht nur wichtig, den Mittelwert schneller zu erreichen, sondern ihn auch konstant und effizient zu halten. Der zusätzliche Algorithmus deckt zumindest einen Punkt ab, und das ist das Erreichen des Mittelwertes in der schnellstmöglichen Zeit, was natürlich das höchste Kriterium ist, das er erreicht.

Dazu passt am besten der Spruch aus dem Buch **The Mythical Man-Month**:
„Neun Frauen können in einem Monat kein Kind gebären.“ - Das heißt, nur weil es 9 Frauen gibt, können sie nicht schneller ein Kind gebären. Weniger ist mehr und so ist es auch bei diesem Projekt, mehr ineffiziente Elemente sind nicht gut, aber weniger effiziente Elemente sind wesentlich auch im Hinblick auf das Ziel dieser Mission und das schnellere Erreichen des Mittelwertes und auch dessen Effizienz.

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
