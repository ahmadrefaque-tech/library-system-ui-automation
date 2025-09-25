# Library UI Automation Framework

UI automation framework for the **Books Inventory Application** built with **Playwright + TypeScript + Cucumber (BDD)**.  

This framework follows the **Page Object Model (POM)** design, integrates with **Cucumber reports**, and supports **cross-browser execution**.

---

## Features
- Playwright for fast, reliable UI automation  
- TypeScript for type safety and maintainability  
- Cucumber (Gherkin) for BDD-style scenarios  
- Page Object Model for clean, reusable code  
- Logging with Winston → outputs to `test.log`  
- HTML & JSON reports after execution  
- Cross-browser support: Chromium, Firefox, WebKit  
- Configurable run: headless or headed  

---

## Prerequisites
- Node.js (v18+ recommended)  
- npm (comes with Node)  

---

## Instructions

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd library-system-ui-automation

2. **Install dependencies**
   ```bash
   npm install
   npx playwright install

3. **Run all tests in chromium by default unless cucumber.js and .env are updated**
   ```bash
   npm test

4. **Configure environment if want to run in different browser and headless mode**
   ```bash
   Navigate to .env to switch browsers or toggle headless mode.
   Example: BROWSER=firefox and HEADLESS=true will run in Firefox headless mode.

5. **Reports**
   ```bash
   location: reports/cucumber-report.html

6. **Log**
   ```bash
   location: logs/test.log
