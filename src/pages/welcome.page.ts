import { Page, expect } from "playwright/test";
import logger from "../support/logger";
import { BasePage } from "./BasePage";

export class WelcomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private startTestingBtn = "text=Start Testing";

  async open(url: string) {
    logger.info(`Navigating to URL: ${url}`);
    await this.page.goto(url, { waitUntil: "domcontentloaded" });

    const start = Date.now();
    await this.waitForWelcomePage();
    const duration = (Date.now() - start) / 1000;

    logger.info(`Start Testing" button appeared after ${duration}s`);
  }

  async clickStartTesting() {
    logger.info("Clicking 'Start Testing' button...");
    await this.click(this.startTestingBtn);
    logger.info("Clicked 'Start Testing' button");
  }

  async waitForWelcomePage() {
    logger.info("Waiting for 'Start Testing' button to be visible (up to 4 minutes)...");
    try {
      await expect(this.page.locator(this.startTestingBtn)).toBeVisible({ timeout: 240000 });
      logger.info("Welcome page loaded successfully, 'Start Testing' button is visible.");
    } catch (error) {
      logger.error("Failed to load welcome page within 4 minutes.");
      throw new Error(`Failed to load welcome page within 4 minutes. Last error: ${error}`);
    }
  }
}
