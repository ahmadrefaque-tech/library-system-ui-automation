import { When, Then, Given } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/world";
import logger from "../support/logger";

When("I update the book title to {string}", async function (this: ICustomWorld, newTitle: string) {
  if (!this.currentBook) throw new Error("No currentBook in context");

  logger.info(`Step: Updating book title from "${this.currentBook.title}" to "${newTitle}"`);

  await this.booksListPage.clickEditForBook(this.currentBook.title);
  this.currentBook.title = newTitle;
  await this.updateBooksPage.updateTitle(newTitle);
  await this.updateBooksPage.saveChanges();

  logger.info(`Book title updated to "${newTitle}" and saved`);
});

When("I update the book price to {string}", async function (this: ICustomWorld, newPrice: string) {
  if (!this.currentBook) throw new Error("No currentBook in context");

  logger.info(`Step: Updating price for "${this.currentBook.title}" to "${newPrice}"`);

  await this.booksListPage.clickEditForBook(this.currentBook.title);
  this.currentBook.price = newPrice;
  await this.updateBooksPage.updatePrice(newPrice);
  await this.updateBooksPage.saveChanges();

  logger.info(`Book price updated to "${newPrice}" and saved`);
});

Then("the book should show the updated title and price in the catalog", async function (this: ICustomWorld) {
  if (!this.currentBook) throw new Error("No currentBook in context");

  logger.info(`Step: Verifying updated book "${this.currentBook.title}" with price "${this.currentBook.price}" in catalog`);

  await this.booksListPage.verifyBookPresent(this.currentBook);

  logger.info("Verified book shows updated title and price in catalog");
});
