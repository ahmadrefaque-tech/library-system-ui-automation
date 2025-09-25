import { Page } from "@playwright/test";
import logger from "../support/logger";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private usernameInput = "#username";
  private passwordInput = "#password";
  private loginButton = "button[aria-label='Submit login']";
  private loginErrorMessage = "h3[class='font-bold']";

  async login(username: string, password: string) {
    logger.info(`Attempting login with username: "${username}"`);
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.click(this.loginButton);
    logger.info("Login button clicked");
  }

  async verifyLoginErrorMessage(): Promise<void> {
    logger.info("Verifying login error message");
    await this.verifyText(
      this.loginErrorMessage,
      "There is a problem with your submission"
    );
    logger.info("Verified login error message");
  }

  async verifyLoginPageDisplayed() {
    const currentUrl = this.page.url();
    logger.info(`Verifying login page is displayed (Current URL: ${currentUrl})`);
    await this.assertVisible(
      this.getLocator(this.loginButton),
      "Bug: Login button not visible after logout."
    );
    logger.info("Login page is displayed");
  }
}
