import { When, Then, Given } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/world";
import logger from "../support/logger";

When("I login with valid credentials", async function (this: ICustomWorld) {
  logger.info("Step: Logging in with valid credentials");
  await this.welcomePage.clickStartTesting();
  await this.loginPage.login(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
  logger.info(`User "${process.env.USERNAME}" logged in successfully`);
});

When("I login with invalid credentials", async function (this: ICustomWorld) {
  logger.info("Step: Attempting login with invalid credentials");
  await this.welcomePage.clickStartTesting();
  await this.loginPage.login("fakeUserName", "fakeUserName");
  logger.info("Login attempted with invalid credentials");
});

Then("I should see an error message on the login page", async function (this: ICustomWorld) {
  logger.info("Step: Verifying login error message");
  await this.loginPage.verifyLoginErrorMessage();
});

Then("I should see a welcome message with my username", async function (this: ICustomWorld) {
  logger.info("Step: Verifying welcome message with username");
  await this.booksListPage.verifyWelcomeMessage();
});

Given("I am on the welcome page", { timeout: 240000 }, async function (this: ICustomWorld) {
  logger.info(`Step: Navigating to Welcome page: ${process.env.BASE_URL}`);
  await this.welcomePage.open(process.env.BASE_URL!);
});