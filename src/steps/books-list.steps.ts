import { When, Then } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/world";
import logger from "../support/logger";

Then("I should see a Logout button", async function (this: ICustomWorld) {
  logger.info("Step: Verify Logout button is visible");
  await this.booksListPage.verifyLogoutButtonVisible();
});

Then("the book count should match the number of books in the catalog", async function (this: ICustomWorld) {
  logger.info("Step: Verify book count matches catalog row count");
  await this.booksListPage.verifyBookCountMatchesCatalog();
});

When("I click the Logout button", async function (this: ICustomWorld) {
  logger.info("Step: Click the Logout button");
  await this.booksListPage.clickLogout();
});

Then("I should navigate to the login page", async function (this: ICustomWorld) {
  logger.info("Step: Verify navigation to login page");
  await this.loginPage.verifyLoginPageDisplayed();
});
