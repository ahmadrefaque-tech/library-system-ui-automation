import { Locator, Page, expect } from "@playwright/test";
import logger from "../support/logger";

export class BasePage {
  constructor(protected page: Page) {}

  async click(locator: string) {
    logger.info(`Clicking element: ${locator}`);
    await this.page.locator(locator).click({ timeout: 5000 });
    logger.info(`Clicked element: ${locator}`);
  }

  async selectDropdownByLabel(selector: string, label: string): Promise<void> {
    logger.info(`Selecting option "${label}" from dropdown: ${selector}`);
    await this.page.locator(selector).selectOption({ label });
    logger.info(`Selected option "${label}"`);
  }

  async fillInput(selector: string, value: string, delay = 0): Promise<void> {
    const input = this.page.locator(selector);
    logger.info(`Filling input: ${selector} with value: "${value}" (delay: ${delay})`);
    await this.waitForVisible(selector);
    await input.fill("");
    if (delay > 0) {
        await input.pressSequentially(value, { delay });
    } else {
        await input.fill(value);
    }
    logger.info(`Input filled: ${selector}`);
  }

  async assertEqual(actual: any, expected: any, message?: string): Promise<void> {
    logger.info(`Asserting equality: actual=[${actual}], expected=[${expected}]`);
    await expect(actual).toBe(expected);
    logger.info(
      message ??
        `Assertion passed: expected [${expected}] and received [${actual}]`
    );
  }

  async assertVisible(locator: Locator, message?: string, timeout = 5000) {
    const currentUrl = this.page.url();
    logger.info(`Waiting for element to be visible: ${locator}`);
    try {
      await expect(locator).toBeVisible({ timeout });
      logger.info(`Element is visible: ${locator}`);
    } catch (err) {
      logger.error(
        message ??
          `Element not visible.\nCurrent URL: ${currentUrl}\nLocator: ${locator}`
      );
      throw err;
    }
  }

  async assertNotVisible(locator: Locator, message?: string, timeout = 2000) {
    const currentUrl = this.page.url();
    logger.info(`Waiting for element to be NOT visible: ${locator}`);
    try {
      await expect(locator).toHaveCount(0, { timeout });
      logger.info(`Element not visible as expected: ${locator}`);
    } catch (err) {
      logger.error(
        message ??
          `Element unexpectedly visible.\nCurrent URL: ${currentUrl}\nLocator: ${locator}`
      );
      throw err;
    }
  }

  async waitForVisible(locator: string) {
    logger.info(`Waiting for element to be visible: ${locator}`);
    await expect(this.page.locator(locator)).toBeVisible({ timeout: 5000 });
    logger.info(`Element became visible: ${locator}`);
  }

  async getText(locator: string): Promise<string> {
    await this.waitForVisible(locator);
    const text = (await this.page.locator(locator).innerText()).trim();
    logger.info(`Text from ${locator}: "${text}"`);
    return text;
  }

  async getCount(locator: string): Promise<number> {
    const count = await this.page.locator(locator).count();
    logger.info(`Count for ${locator}: ${count}`);
    return count;
  }

  getLocator(css: string): Locator {
    logger.info(`Getting locator for: ${css}`);
    return this.page.locator(css);
  }

  async verifyText(locator: string, expected: string) {
    logger.info(`Verifying text for ${locator}, expecting "${expected}"`);
    await expect(this.page.locator(locator)).toHaveText(expected, { timeout: 5000 });
    logger.info(`Verified text for ${locator}: "${expected}"`);
  }
}
