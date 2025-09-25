import {
  Before,
  After,
  AfterStep,
  Status
} from "@cucumber/cucumber";

import { chromium, firefox, webkit, Browser } from "playwright";
import { ICustomWorld } from "./world";
import { LoginPage } from "../pages/login.page";
import { WelcomePage } from "../pages/welcome.page";
import { BooksListPage } from "../pages/books-list.page";
import { AddBooksPage } from "../pages/add-books.page";
import { UpdateBooksPage } from "../pages/update-books.page";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import logger from "./logger";

dotenv.config();

let browser: Browser;

Before(async function (this: ICustomWorld, scenario) {
  const browserType = process.env.BROWSER || "firefox";
  const headless = process.env.HEADLESS !== "false";

  logger.info(`Launching browser [${browserType}] | Headless: ${headless}`);

  const launchers: Record<string, typeof chromium> = {
    chromium,
    firefox,
    webkit,
  };

  const browserLauncher = launchers[browserType];
  if (!browserLauncher) {
    throw new Error(
      `Invalid browser type "${browserType}". Use chromium | firefox | webkit`
    );
  }

  browser = await browserLauncher.launch({ headless });
  this.browser = browser;
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  this.welcomePage = new WelcomePage(this.page);
  this.loginPage = new LoginPage(this.page);
  this.booksListPage = new BooksListPage(this.page);
  this.addBooksPage = new AddBooksPage(this.page);
  this.updateBooksPage = new UpdateBooksPage(this.page);

  logger.info(`Starting Scenario: "${scenario.pickle.name}"`);
});

AfterStep(async function ({ result }) {
  if (result?.status === Status.FAILED && this.page && !this.page.isClosed()) {
    try {
      const screenshotDir = path.join("reports", "screenshots");
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filePath = path.join(screenshotDir, `FAILED_${timestamp}.png`);

      const buffer = await this.page.screenshot({ path: filePath, fullPage: true });
      await this.attach(buffer, "image/png");
      logger.error(`Step failed – screenshot saved: ${filePath}`);
    } catch (err) {
      logger.error(`Screenshot capture failed: ${err}`);
    }
  }
});

After(async function (this: ICustomWorld, scenario) {
  logger.info(`Finished Scenario: "${scenario.pickle.name}"`);

  try {
    if (this.page && !this.page.isClosed()) {
      await this.page.close();
      logger.info("Page closed.");
    }
    await this.context?.close();
    logger.info("Browser context closed.");
    await this.browser?.close();
    logger.info("Browser closed.");
  } catch (err) {
    logger.warn(`Error during cleanup: ${err}`);
  }
});
