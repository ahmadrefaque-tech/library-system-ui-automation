import { When, Then } from "@cucumber/cucumber";
import { ICustomWorld } from "../support/world";
import logger from "../support/logger";

When("I delete the book", async function (this: ICustomWorld) {
  if (!this.currentBook) throw new Error("No currentBook in context");

  logger.info(`Step: Deleting book "${this.currentBook.title}" from catalog`);
  this.initialCount = await this.booksListPage.getTotalBooksCount();
  logger.info(`Current total after deletion: ${this.initialCount}`);

  await this.booksListPage.clickDeleteForBook(this.currentBook.title);
  logger.info(`Book "${this.currentBook.title}" deletion triggered`);
});

Then("the book should not appear in the catalog", async function (this: ICustomWorld) {
  if (!this.currentBook) throw new Error("No currentBook in context");

  logger.info(`Step: Verify book "${this.currentBook.title}" is not present in catalog`);
  await this.booksListPage.verifyBookNotPresent(this.currentBook);
});
