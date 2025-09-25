import { When, Then } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/world";
import logger from "../support/logger";
import { DataTable } from "@cucumber/cucumber";

When("I navigate to the Add a New Book page", async function (this: ICustomWorld) {
  logger.info("Step: I navigate to the Add a New Book page");
  await this.booksListPage.clickAddBookButton();
  await this.addBooksPage.verifyAddBookPageDisplay();
});

When("I add a new book with title {string} characters", async function (this: ICustomWorld, titleLength: string) {
  logger.info(`Step: I add a new book with title length = ${titleLength}`);
  this.currentBook = await this.addBooksPage.addNewBook(titleLength);
  logger.info(`New book created: ${JSON.stringify(this.currentBook)}`);
});

When("I record the current total count of books", async function (this: ICustomWorld) {
  this.initialCount = await this.booksListPage.getTotalBooksCount();
});

Then("the total count of books should increase by 1", async function (this: ICustomWorld) {
  logger.info("Step: Verify book count increased by 1");
  await this.booksListPage.verifyBooksCountIncreased(this.initialCount!);
});

Then("the new book should be visible in the catalog with correct details", async function (this: ICustomWorld) {
  logger.info(`Step: Verify new book is visible in catalog: ${this.currentBook?.title}`);
  await this.booksListPage.verifyBookPresent(this.currentBook!);
});

When("I click the Add Book button", async function (this: ICustomWorld) {
  logger.info("Step: I click the Add Book button");
  await this.addBooksPage.clickAddBookButton();
  logger.info("Add Book button clicked");
});

Then("I should see the following validation errors:", async function (this: ICustomWorld, dataTable: DataTable) {
  logger.info("Step: Verify validation error messages");
  await this.addBooksPage.verifyEmptyFieldErrors(dataTable);
  logger.info("Validation errors matched expected values");
});

Then("I should see the validation message {string}", async function (this: ICustomWorld, expectedError: string) {
  logger.info(`Step: Verify title validation message = "${expectedError}"`);
  await this.addBooksPage.verifyTitleLengthErrorMessage(expectedError);
  logger.info("Validation message verified");
});

Then("I should see an error message summary", async function (this: ICustomWorld) {
  logger.info("Step: Verify error message summary is displayed");
  await this.addBooksPage.verifySummaryErrorMessages();
  logger.info("Error message summary verified");
});

Then("the total count of books should decrease by 1", async function (this: ICustomWorld) {
  logger.info("Step: Verify book count decreased by 1");
  await this.booksListPage.verifyBooksCountDecreased(this.initialCount!);
  logger.info("Book count decreased as expected");
});